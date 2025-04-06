'use client'

import { useState } from 'react';
import Script from 'next/script';


declare global {
    interface Window {
        Razorpay: any;
    }
}

interface RazorpayPaymentProps {
    amount: number;
    name: string;
    email: string;
    contact: string;
    onSuccess?: (data: RazorpaySuccessResponse) => void;
    onFailure?: (error: RazorpayFailureResponse) => void;
}


interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayFailureResponse {
    error: {
        code: string;
        description: string;
        source: string;
        step: string;
        reason: string;
    };
}

interface OrderResponse {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: string;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({amount, name, email, contact, onSuccess, onFailure}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handlePayment() {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/createorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount,
                    receipt: `receipt_${Date.now()}`,
                }),
            })
            const data = await response.json()
            console.log(data)
            if (data.success === 0) {
                throw new Error(data.msg)   
            }
            const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: data.info.amount,
                currency: data.info.currency,
                name: 'IconGen',
                description: 'Payment for your service',
                order_id: data.info.id,
                prefill: {name, email, contact},
                notes: {
                    address: 'Your Company Address',
                },
                theme: {
                    color: '#3399cc',
                },
                handler: function (response: RazorpaySuccessResponse) {
                    setPaymentSuccess(true);
                    verifyPayment(response);
                    if (onSuccess) {
                        onSuccess(response);
                    }
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            paymentObject.on('payment.failed', function (response: RazorpayFailureResponse) {
                setError(`Payment failed: ${response.error.description}`);

                if (onFailure) {
                    onFailure(response);
                }
            })
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
            setError(errorMessage)
        } finally {
            setIsLoading(false);
        }
    }

    async function verifyPayment(paymentData: RazorpaySuccessResponse): Promise<void> {
        try {
            const response = await fetch('/api/verifyPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.msg);
            }
            console.log('Payment verified successfully');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error verifying payment';
            console.error(errorMessage);
        }
    }

    return (
        <div className="razorpay-container">
            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="lazyOnload"
            />

            {error && <div className="error-message">{error}</div>}

            {paymentSuccess ? (
                <div className="success-message">
                    <h3>Payment Successful!</h3>
                    <p>Thank you for your payment.</p>
                </div>
            ) : (
                <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors"
                >
                    {isLoading ? 'Processing...' : `Pay \$${amount}`}
                </button>
            )}

            <style jsx>{`
        .razorpay-container {
          margin: 20px 0;
        }
        .payment-button {
          background-color: #3399cc;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .payment-button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .error-message {
          color: red;
          margin-bottom: 10px;
        }
        .success-message {
          color: green;
          padding: 15px;
          border: 1px solid green;
          border-radius: 4px;
          margin-bottom: 10px;
        }
      `}</style>
        </div>
    );
};

export default RazorpayPayment;