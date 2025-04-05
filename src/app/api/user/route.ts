import { NextResponse } from "next/server"
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "@/db/db";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if(!session?.user) {
            return NextResponse.json({
                success: 0,
                msg: "Unauthorized"
            },
            {
                status: 401
            })
        }
        const userData = await db.account.findFirst({
            where: {
                userId: session.user.id
            }
        })
        if(!userData) {
            return NextResponse.json({
                success: 0,
                msg: "User not found"
            },
            {
                status: 404
            })
        }
        return NextResponse.json({
            credits: userData?.credits,
            subscription: userData?.subscription
        })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: 0,
            msg: "Error while fetching data"
        },
        {
            status: 500
        }
    )
    }
}