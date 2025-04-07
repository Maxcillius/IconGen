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
        const account = await db.account.findFirst({
            where: {
                userId: session.user.id
            }
        })
        if(!account) {
            return NextResponse.json({
                success: 0,
                msg: "No account found"
            },
            {
                status: 404
            })
        }
        const orders = await db.order.findMany({
            where: {
                id: account.id
            }
        })
        // console.log(orders)
        if(!orders) {
            return NextResponse.json({
                success: 0,
                msg: "No orders found"
            })
        }

        return NextResponse.json({
            success: 1,
            orders: orders.map((order) => {
                return {
                    id: order.orderId,
                    amount: order.amount,
                    status: order.status,
                    date: order.createdAt.toLocaleDateString()
                }
            })
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