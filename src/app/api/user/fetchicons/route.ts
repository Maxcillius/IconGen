export const dynamic = "force-dynamic";

import { NextResponse } from "next/server"
import db from "@/db/db";
import authOptions from "@/lib/auth";
import { getServerSession } from "next-auth";

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
        const account = await db.account.findFirst({
            where: {
                userId: session.user.id
            }
        })
        if(!account) {
            return NextResponse.json({
                success: 0,
                msg: "No Account found"
            })
        }
        const icons = await db.icons.findMany({
            where: {
                id: account.id
            }
        })
        let urls: {key: string, url: string}[] = []
        if(icons) {
            urls = icons.map((icon) => {
                return {
                    key: icon.name,
                    url: icon.avatarKey
                }
            })
        }
        return NextResponse.json({
            success: 1,
            contents: urls,
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