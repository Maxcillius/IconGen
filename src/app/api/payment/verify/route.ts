// /app/api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/db/db";

export async function POST(req: NextRequest) {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return NextResponse.json({
                success: 0,
                msg: "Missing payment info"
            },
            {
                status: 400

            });
        }

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({
                success: 0,
                msg: "Invalid signature"
            },
            {
                status: 400
            });
        }

        const order = await db.order.findUnique({
            where: {
                orderId: razorpay_order_id.order_id,
            }
        })

        if(!order) {
            return NextResponse.json({
                success: 0,
                msg: "Order not found"
            })
        }

        if(order.status === "completed") {
            return NextResponse.json({
                success: 1,
                msg: 'Already processed' 
            });
        }

        await db.order.update({
            where: {
                orderId: razorpay_order_id
            },
            data: {
                paymentId: razorpay_payment_id,
                status: "completed",
            },
        })

        await db.account.update({
            where: {
                id: order.id
            },
            data: {
                credits: { increment: order.amount === 1459 ? 250 : order.amount === 959 ? 120 : order.amount === 459 ? 50 : 0 }
            }
        })

        return NextResponse.json({
            success: 1,
            msg: "Payment verified successfully"
        });
    } catch (err) {
        console.error("Verification error:", err);
        return NextResponse.json({
            success: 0,
            msg: "Server error"
        },
            {
                status: 500
            });
    }
}
