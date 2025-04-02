import { cookies } from "next/headers";
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import admin from "@/utils/firebaseAdmin";

export async function POST(req: NextRequest) {
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
    const newData = await req.json()
    const { firstname, username, email } = newData
    console.log(firstname, username, email)
    if(!firstname || !username || !email) {
        return NextResponse.json({
            success: 0,
            msg: "Please fill all fields"
        },
        {
            status: 422
        })
    }
    try {
        await db.user.update({
            where: {
                email: email
            },
            data: {
                firstname: firstname,
                username: username
            }
        })
        return NextResponse.json({
            success: 1,
            msg: "Successfully update profile"
        })
    } catch(error) {
        return NextResponse.json({
            success: 0,
            msg: "Failed to update profile"
        },
        {
            status: 500
        })
    }
}