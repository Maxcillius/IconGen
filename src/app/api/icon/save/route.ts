import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import path from "path"
import fs from "fs"
import s3 from "@/utils/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { cookies } from "next/headers"
import os from "os"
import admin from "@/utils/firebaseAdmin"

export async function POST(req: NextRequest) {
    const { url } = await req.json()
    const cookieStore = await cookies();
    const sessionTokenCookie = cookieStore.get("sessionKey")
    const sessionToken = sessionTokenCookie?.value
    if(!sessionToken) {
        return NextResponse.json({
            success: 0,
            msg: "No session token found"
        },
        {
            status: 401
        })
    }

    const decodedToken = await admin.auth().verifySessionCookie(sessionToken)
    if(!decodedToken) {
        return NextResponse.json({
            success: 0,
            msg: "Unauthorized"
        },
        {
            status: 401
        })
    }

    if(!url) {
        return NextResponse.json(
            {
                success: 0,
                msg: "URL not given"
            },
            {
                status: 404
            }
        )
    }

    try {
        const fileName = `${decodedToken.uid}-${Date.now().toString()}.png`
        const dir = path.join(`/home/${os.userInfo().username}/`, fileName)
        
        const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream"
        });
        
        await new Promise<void>((resolve, reject) => {
            const writeStream = fs.createWriteStream(dir);
            response.data.pipe(writeStream);
            
            writeStream.on("finish", () => {
                resolve();
            });
            
            writeStream.on("error", (err) => {
                reject(err);
            });
            
            response.data.on("error", (err: Error) => {
                reject(err);
            });
        });
        
        const uniqueKey = `${Date.now()}-${path.basename(dir)}`
        const fileContent = await fs.promises.readFile(dir)
        
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME as string,
            Key: `userIcons/${decodedToken.uid}/${uniqueKey}`,
            Body: fileContent
        });
        
        // console.log("saving");
        await s3.send(command)
        // console.log("Done")
        
        await fs.promises.unlink(dir);
        
        return NextResponse.json({
            success: 1,
            msg: "Successfully saved the image"
        });
        
        } catch (err) {
            console.log(err)
            return NextResponse.json({
                success: 0,
                msg: "Error while saving image"
            }, {
                status: 500
            });
        }
}