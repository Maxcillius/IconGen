import razorpayClient from '@/lib/razorpay';
import { NextRequest, NextResponse } from 'next/server';

type OrderData = {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
}

export async function POST(req: NextRequest) {
    const { amount, receipt } = await req.json()
    const currency = 'USD'
    if (!amount) {
        return NextResponse.json({
            error: 'Amount is required'
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
        if(!order) {
            return NextResponse.json({
                error: 'Order creation failed'
            },
            {
                status: 500
            })
        }
        return NextResponse.json({
            success: 1,
            info: order as OrderData
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json({
            error: 'Error creating order'
        },
        {
            status: 500
        })
    }
}