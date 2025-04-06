export const dynamic = "force-dynamic";

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
        const user = await db.account.findFirst({
            where: {
                userId: session.user.id
            }
        })
        if(!user) {
            return NextResponse.json({
                success: 0,
                msg: "No account found"
            },
            {
                status: 404
            })
        }
        return NextResponse.json({
            success: 1,
            credits: user?.credits,
        })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: 0,
            msg: "Error while fetching icons"
        },
        {
            status: 500
        }
    )
    }
}