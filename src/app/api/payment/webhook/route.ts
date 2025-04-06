import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import db from "@/db/db";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature");
        if (!signature) {
            return NextResponse.json({
                success: 0,
                msg: "Missing signature"
            },
                {
                    status: 400
                })
        }
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!).update(rawBody).digest("hex");

        const isValid = crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        )

        if (!isValid) {
            return NextResponse.json({
                success: 0,
                msg: "Invalid signature"
            },
                {
                    status: 401
                });
        }

        const event = JSON.parse(rawBody);

        if (event.event === "payment.captured") {
            const payment = event.payload.payment.entity;
            try {
                const order = await db.order.findUnique({
                    where: {
                        orderId: payment.order_id,
                    }
                });

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
                        orderId: payment.order_id
                    },
                    data: {
                        status: "completed"
                    }
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
                    msg: "Payment successful",
                });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return NextResponse.json({
                    success: 0,
                    msg: "Database update failed"
                },
                {
                    status: 500
                }
                );
            }
        } else if (event.event === "payment.failed") {
            const payment = event.payload.payment.entity;
            try {
                const order = await db.order.update({
                    where: {
                        orderId: payment.order_id,
                    },
                    data: {
                        paymentId: payment.id,
                        status: "failed",
                    },
                });

                return NextResponse.json({
                    success: 1,
                    msg: "Payment failed",
                });
            } catch (dbError) {
                console.error("Database error:", dbError);
                return NextResponse.json({
                    success: 0,
                    msg: "Database update failed"
                },
                    {
                        status: 500
                    }
                );
            }
        } else {
            console.warn("Unhandled event type:", event.event);
        }


        return new NextResponse('Webhook received', { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json(
            {
                success: 0,
                msg: "Something went wrong"
            },
            {
                status: 500
            }
        );
    }
}