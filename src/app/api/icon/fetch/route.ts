export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import s3 from "@/utils/s3"
import { cookies } from "next/headers"
import admin from "@/utils/firebaseAdmin"

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionTokenCookie = cookieStore.get("sessionKey")
        const sessionToken = sessionTokenCookie?.value
        if(!sessionToken) {
            return NextResponse.json({
                success: 0,
                msg: "No session token found"
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
        const command = new ListObjectsV2Command({
            Bucket: process.env.BUCKET_NAME,
            Prefix: `userIcons/${decodedToken.uid}/`
        })
        const response = await s3.send(command)
        // console.log(response)
        // Check does it return empty array when no objects are there
        if(!response.Contents) return NextResponse.json({
            success: 1,
            contents: []
        })
        const urls = await Promise.all(response.Contents.map(async (obj) => {
            const getobjectCommnad = new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: obj.Key
            })
            const url = await getSignedUrl(s3, getobjectCommnad, { expiresIn: 3600 })
            return {
                key: obj.Key,
                url: url
            }
        }))
        return NextResponse.json({
            success: 1,
            contents: urls
        })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: 0,
            msg: "Error while fetching icons"
        },
        {
            status: 500
        })
    }
}