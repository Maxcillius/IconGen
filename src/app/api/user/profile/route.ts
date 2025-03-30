import { cookies } from "next/headers";
import db from "@/db/db"
import { NextResponse } from "next/server";
import admin from "@/utils/firebaseAdmin";

export async function GET() {
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
    try {
        const userData = await db.user.findFirst({
            where: {
                userId: decodedToken.uid
            }
        })
        const accountData = await db.account.findFirst({
            where: {
                uid: decodedToken.uid
            }
        })
        return NextResponse.json({
            success: 1,
            msg: {
                email: userData?.email,
                username: userData?.username,
                firstname: userData?.firstname,
                middlename: userData?.middlename,
                lastname: userData?.lastname,
                credits: accountData?.credits,
                uid: decodedToken.uid,
                subscription: accountData?.subscription
            }
        })
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to fetch userdata"
        })
    }
}