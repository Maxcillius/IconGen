'use client'

import { useState } from 'react';
import { Package2, User, Lock, Zap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import RazorpayPayment from '@/components/razorPay';
import { setPopupState } from "@/state/popup/popup";
import AuthPopup from '@/components/Authpopup';

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

  const { data: session, status } = useSession()
  const setVisibility = useDispatch()

  const [selectedPackage, setSelectedPackage] = useState({
    name: "Pro",
    price: 9.59,
    tokens: 120,
    // billing: "Monthly"
  })


  const packages = [
    {
      name: "Basic",
      price: 4.59,
      tokens: 50,
      // billing: "Monthly",
      // features: [
      //   "Basic features access",
      //   "Styles Unlocked",
      //   "50 Tokens/Month"
      // ]
    },
    {
      name: "Pro",
      price: 9.59,
      tokens: 120,
      // billing: "Monthly",
      // features: [
      //   "All Basic features",
      //   "Create variations",
      //   "Generate 3 Icons at once",
      //   "120 Tokens/Month",
      //   "HD available"
      // ],
      popular: true
    },
    {
      name: "God",
      price: 14.59,
      tokens: 250,
    //   billing: "Monthly",
    //   features: [
    //     "All Pro features",
    //     "Generate 10 Icons at once",
    //     "Unlimited Tokens/Month",
    //   ]
    }
  ];

  // const plans = [
  //   {
  //     name: "Basic Plan",
  //     price: 4.59,
  //     billing: "Monthly",
  //     features: [
  //       "Basic features access",
  //       "Styles Unlocked",
  //       "50 Tokens/Month"
  //     ]
  //   },
  //   {
  //     name: "Pro Plan",
  //     price: 9.59,
  //     billing: "Monthly",
  //     features: [
  //       "All Basic features",
  //       "Create variations",
  //       "Generate 3 Icons at once",
  //       "120 Tokens/Month",
  //       "HD available"
  //     ],
  //     popular: true
  //   },
  //   {
  //     name: "Enterprise Plan",
  //     price: 14.59,
  //     billing: "Monthly",
  //     features: [
  //       "All Pro features",
  //       "Generate 10 Icons at once",
  //       "Unlimited Tokens/Month",
  //     ]
  //   }
  // ];

  const transaction = () => {
    if(!session || !session.user) {
      setVisibility(setPopupState())
    }
    if (!name || !email || !phone || !street || !apartment || !city || !state || !zipcode) {
      setEmpty(true)
      setTimeout(() => {
        setEmpty(false)
      }, 3000)
      return
    }
  }

  return (
    <>
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
                  {packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className={`relative group ${
                        selectedPackage.name === pkg.name
                          ? 'bg-gradient-to-b from-blue-600/90 to-blue-800/90 ring-2 ring-blue-400'
                          : 'bg-gray-800/50 hover:bg-gray-800/80'
                      } rounded-2xl p-8 cursor-pointer transition-all duration-300 backdrop-blur-sm`}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-400 to-blue-400 text-white font-medium text-sm px-4 py-1 rounded-full shadow-lg">
                          Best Value
                        </div>
                      )}

                      <div className="text-center mb-8">
                        {/* <div className="mb-4 flex justify-center">{pkg.icon}</div> */}
                        <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="text-2xl font-bold">{pkg.tokens}</span>
                          <span className="text-gray-400">tokens</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-4xl font-bold">${pkg.price}</span>
                          {/* <span className="text-gray-400 text-lg">one-time</span> */}
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))} */}
                      </div>

                      <button
                        className={`w-full mt-8 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                          selectedPackage.name === pkg.name
                            ? 'bg-white text-blue-600 hover:bg-gray-100 shadow-xl shadow-blue-500/20'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                        }`}
                      >
                        {selectedPackage.name === pkg.name ? 'Selected Package' : 'Buy Now'}
                      </button>
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className={`${empty && email.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Apartment, suite, etc.</label>
                          <input
                            onChange={(e) => setApartment(e.target.value)}
                            type="text"
                            className={`${empty && apartment.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input
                              onChange={(e) => setCity(e.target.value)}
                              type="text"
                              className={`${empty && city.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">State</label>
                            <input
                              onChange={(e) => setState(e.target.value)}
                              type="text"
                              className={`${empty && state.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">ZIP Code</label>
                          <input
                            onChange={(e) => setZipcode(e.target.value)}
                            type="text"
                            className={`${empty && zipcode.length === 0 ? "border-red-500 border-2" : ""} w-full bg-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
                      <span className="font-medium">{selectedPackage.name}</span>
                      {/* <span className="text-blue-400">{selectedPlan.billing}</span> */}
                    </div>
                    <p className="text-sm text-gray-400 mb-4">
                      {selectedPackage.name === "Basic Plan"
                        ? "Perfect for getting started"
                        : selectedPackage.name === "Pro Plan"
                          ? "Unlimited access to all premium features"
                          : "Tailored solutions for large organizations"}
                    </p>
                    <div className="flex justify-between items-center text-lg">
                      <span>Subtotal</span>
                      <span>${selectedPackage.price.toFixed(2)}</span>
                    </div>
                  </div>
                  {
                    (!session || !session.user || !name || !email || !phone || !street || !apartment || !city || !state || !zipcode) &&
                    <button onClick={() => { transaction() }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                          Complete Payment
                    </button>
                  }
                  {
                    session && session.user && (name && email && phone && street && apartment && city && state && zipcode) &&
                    <RazorpayPayment
                      amount={selectedPackage.price}
                      name={name}
                      email={email}
                      contact={phone}
                      onSuccess={(data) => console.log('Payment successful:', data)}
                      onFailure={(error) => console.error('Payment failed:', error)}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}