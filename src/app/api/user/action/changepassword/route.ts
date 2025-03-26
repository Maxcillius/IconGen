import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET as string

export async function POST(req: NextRequest) {
    const cookieStore = await cookies();
    let sessionTokenCookie = cookieStore.get("next-auth.session-token")
    let sessionToken = sessionTokenCookie?.value

    const decoded = await decode({
        token: sessionToken,
        secret: secret
    })

    if(!decoded) {
        return NextResponse.json({
            success: 0,
            msg: "Unauthorized"
        },
        {
            status: 401
        })
    }

    const { newPassword } = await req.json();

    try {
        await db.user.update({
            where: {
                email: decoded.email as string
            },
            data: {
                password: newPassword
            }
        })

        return NextResponse.json({
            success: 1,
            msg: "Successfully changed password"
        })
    } catch(error) {
        return NextResponse.json({
            success: 0,
            msg: "Failed to change password"
        })
    }
}