'use client'

import { useState } from 'react';
import { Package2, User, Lock, Check } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import RazorpayPayment from '@/components/razorPay';

export default function Checkout() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [empty, setEmpty] = useState(false)

  const { status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/")
    }
  })

  const [selectedPlan, setSelectedPlan] = useState({
    name: "Pro Plan",
    price: 9.59,
    billing: "Monthly"
  });

  const plans = [
    {
      name: "Basic Plan",
      price: 4.59,
      billing: "Monthly",
      features: [
        "Basic features access",
        "Styles Unlocked",
        "50 Tokens/Month"
      ]
    },
    {
      name: "Pro Plan",
      price: 9.59,
      billing: "Monthly",
      features: [
        "All Basic features",
        "Create variations",
        "Generate 3 Icons at once",
        "120 Tokens/Month",
        "HD available"
      ],
      popular: true
    },
    {
      name: "Enterprise Plan",
      price: 14.59,
      billing: "Monthly",
      features: [
        "All Pro features",
        "Generate 10 Icons at once",
        "Unlimited Tokens/Month",
      ]
    }
  ];

  const transaction = () => {
    if (!name || !email || !phone || !street || !apartment || !city || !state || !zipcode) {
      setEmpty(true)
      setTimeout(() => {
        setEmpty(false)
      }, 3000)
      return
    }
  }

  return (
    <div>
      <div className='h-16 w-full'></div>
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Plan Selection and Billing Details */}
            <div className="flex-grow">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Checkout</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Lock className="w-4 h-4" />
                    Secure Checkout
                  </div>
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative ${selectedPlan.name === plan.name
                        ? 'bg-blue-600/50 ring-2 ring-blue-500'
                        : 'bg-gray-800 hover:bg-gray-800/80'
                        } rounded-xl p-6 cursor-pointer transition-all`}
                      onClick={() => setSelectedPlan(plan)}
                    >
                      {plan.popular && (
                        <div className="absolute top-4 right-4 bg-green-400 text-black text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-xl">{plan.name}</span>
                        <span className="text-blue-400">{plan.billing}</span>
                      </div>
                      <div className="text-2xl font-bold mb-4">
                        ${plan.price}
                        <span className="text-sm font-normal text-gray-400">
                          /{plan.billing === 'Monthly' ? 'mo' : 'year'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-400" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Billing Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className={`${empty && name.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className={`${empty && email.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <input
                          onChange={(e) => {
                            const phoneValue = e.target.value;
                            if (/^\+?[1-9]\d{0,14}$/.test(phoneValue) || phoneValue === "") {
                              setPhone(phoneValue);
                            }
                          }}
                          value={phone}
                          type="tel"
                          maxLength={10}
                          className={`${empty && phone.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Package2 className="w-5 h-5" />
                      Billing Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <input
                          onChange={(e) => setStreet(e.target.value)}
                          type="text"
                          className={`${empty && street.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="123 Main St"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Apartment, suite, etc.</label>
                        <input
                          onChange={(e) => setApartment(e.target.value)}
                          type="text"
                          className={`${empty && apartment.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="Apt 4B"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            className={`${empty && city.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State</label>
                          <input
                            onChange={(e) => setState(e.target.value)}
                            type="text"
                            className={`${empty && state.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            placeholder="NY"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <input
                          onChange={(e) => setZipcode(e.target.value)}
                          type="text"
                          className={`${empty && zipcode.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Order Summary */}
            <div className="w-full lg:w-[400px] bg-gray-800 rounded-xl p-8 h-fit sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{selectedPlan.name}</span>
                    <span className="text-blue-400">{selectedPlan.billing}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    {selectedPlan.name === "Basic Plan"
                      ? "Perfect for getting started"
                      : selectedPlan.name === "Pro Plan"
                        ? "Unlimited access to all premium features"
                        : "Tailored solutions for large organizations"}
                  </p>
                  <div className="flex justify-between items-center text-lg">
                    <span>Subtotal</span>
                    <span>${selectedPlan.price.toFixed(2)}</span>
                  </div>
                </div>
                <RazorpayPayment
                  amount={selectedPlan.price}
                  name={name}
                  email={email}
                  contact={phone}
                  onSuccess={(data) => console.log('Payment successful:', data)}
                  onFailure={(error) => console.error('Payment failed:', error)}
                />
                {/* <button onClick={() => { transaction() }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Complete Purchase
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}