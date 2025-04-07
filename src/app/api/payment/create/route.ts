import authOptions from '@/lib/auth';
import razorpayClient from '@/lib/razorpay';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

type OrderData = {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({
            success: 0,
            msg: 'Not Authorized'
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
    const { amount, receipt } = await req.json()
    const currency = 'USD'
    if (!amount) {
        return NextResponse.json({
            success: 0,
            msg: 'Amount is required'
        },
        {
            status: 400
        })
    }
    if (!receipt) {
        return NextResponse.json({
            error: 'Receipt is required'
        },
        {
            status: 400
        })
    }

    try {
        const options = {
            amount: amount * 100,
            currency,
            receipt,
        }

        const order = await razorpayClient.orders.create(options);
        console.log(order)
        if(!order) {
            return NextResponse.json({
                success: 0,
                msg: 'Order creation failed'
            },
            {
                status: 500
            })
        }
        await db.order.create({
            data: {
                id: account.id,
                orderId: order.id,
                amount: order.amount as number,
                currency: order.currency,
                status: "pending",
                email: session.user.email,
                name: session.user.name,
            }
        })
        return NextResponse.json({
            success: 1,
            order: order as OrderData
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json({
            success: 0,
            msg: 'Error creating order'
        },
        {
            status: 500
        })
    }
}