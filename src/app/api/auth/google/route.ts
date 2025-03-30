import { NextRequest, NextResponse } from "next/server";
import db from "@/db/db";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    const { email, uid, accessToken, refreshToken } = await req.json()
    try {
        const isExist = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if(!isExist) {
            await db.$transaction(async (prisma) => {
                await prisma.account.create({
                    data: {
                        uid: uid
                    }
                })
                await prisma.token.create({
                    data: {
                        userId: uid,
                        refreshToken: refreshToken,
                        accessToken: accessToken,
                    },
                })
                await prisma.user.create({
                    data: {
                        email: email,
                        username: "FrostyByte",
                        userId: uid,
                        firstname: email.split("@")[0],
                    },
                })
            })
        } else {
            await db.token.update({
                where: {
                    userId: uid
                },
                data: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        }
        const cookieStore = await cookies()
        cookieStore.set({
            name: "sessionKey",
            value: accessToken,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 30 // 1 month
        })
        return NextResponse.json({
            success: 1,
            msg: "Authentication successful",
            token: accessToken
        })        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: 0,
            msg: "Failed to signup"
        })
    }
}