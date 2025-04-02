import { NextResponse } from "next/server";
// import { auth } from "@/utils/firebaseClient"
// import db from "@/db/db";
import { cookies } from "next/headers";
// import admin from "@/utils/firebaseAdmin";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionTokenCookie = cookieStore.get("sessionKey")
        const sessionToken = sessionTokenCookie?.value
        if(!sessionToken) {
            return NextResponse.json({
                success: 1,
                msg: "No session token found"
            })
        }
        cookieStore.delete("sessionKey")
        return NextResponse.json({
            success: 1,
            msg: "Successfully signed out",
        })
    } catch(error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to signed out"
        },
        {
            status: 500
        })
    }
}