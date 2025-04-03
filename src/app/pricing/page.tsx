import React from 'react';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div>
      <div className="h-16 w-full"></div>
      <section className="py-10 bg-gradient-to-b from-[#1A1E23] to-[#0F2133] sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl text-white font-bold lg:text-6xl sm:text-5xl">We got a plan for you!</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-400">Choose a flexible monthly or yearly subscription. Easy cancellation whenever you need - simple and straightforward.</p>
          </div>

          {/* Desktop View */}
          <div className="hidden mt-16 lg:block overflow-x-auto">
            <div className="min-w-max">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-8 pr-4"></th>
                    {[
                      { name: 'Free', price: '0' },
                      { name: 'Basic', price: '4.59' },
                      { name: 'Popular', price: '9.59', highlight: true },
                      { name: 'Enterprise', price: '14.59' }
                    ].map((plan, index) => (
                      <th key={index} className={`px-4 py-8 text-center ${plan.highlight ? 'bg-gray-700 rounded-t-xl' : ''}`}>
                        <span className={`text-base font-medium ${plan.highlight ? 'px-4 py-2 text-white bg-blue-600 rounded-full' : 'text-blue-600'}`}>
                          {plan.name}
                        </span>
                        <div className="flex flex-row justify-center mt-6 text-6xl font-bold text-white">
                          ${plan.price.split('.')[0]}
                          {plan.price.includes('.') && <p className="text-xl self-end py-1">.{plan.price.split('.')[1]}</p>}
                        </div>
                        <p className={`mt-2 text-base font-normal ${plan.highlight ? 'text-gray-200' : 'text-slate-400'}`}>Per month</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Tokens', values: ['01 /day', '50', '120', 'Unlimited'] },
                    { feature: 'Save icons', values: ['-', '15', '40', 'Unlimited'] },
                    { feature: 'Dimension', values: ['Small', 'Small\nMedium', 'All', 'All'] },
                    { feature: 'Model', values: ['v2', 'v2\nv3', 'v2\nv3', 'v2\nv3'] },
                    { feature: 'Styles', values: ['-', true, true, true] },
                    { feature: 'Server speed', values: ['-', '-', true, true] }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="py-4 pr-4 font-medium border-b border-gray-400 text-white">{row.feature}</td>
                      {row.values.map((value, i) => (
                        <td key={i} className={`px-4 py-4 text-center ${i === 2 ? 'bg-gray-700 text-white' : 'text-white'} border-b ${i === 2 ? 'border-white' : 'border-gray-400'}`}>
                          {typeof value === 'boolean' ? (
                            value ? <Check className="w-5 h-5 mx-auto" /> : '-'
                          ) : (
                            value.includes('\n') ? value.split('\n').map((line, j) => (
                              <React.Fragment key={j}>
                                {line}
                                {j < value.split('\n').length - 1 && <br />}
                              </React.Fragment>
                            )) : value
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-6 pr-4"></td>
                    {[false, false, true, false].map((isHighlighted, index) => (
                      <td key={index} className={`px-4 py-6 text-center ${isHighlighted ? 'bg-orange-600 rounded-b-xl' : ''}`}>
                        <a
                          href="#"
                          className={`inline-flex items-center font-semibold ${isHighlighted ? 'text-white' : 'text-blue-600 hover:text-blue-700'}`}
                        >
                          Get Started
                          <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="mt-12 space-y-8 lg:hidden">
            {[
              { name: 'Free', price: '0', features: { 'Tokens': '01/day', 'Save icons': '-', 'Dimension': 'Small', 'Model': 'v2', 'Styles': false, 'Server speed': false } },
              { name: 'Basic', price: '4.59', features: { 'Tokens': '50', 'Save icons': '15', 'Dimension': 'Small, Medium', 'Model': 'v2, v3', 'Styles': true, 'Server speed': false } },
              { name: 'Popular', price: '9.59', highlight: true, features: { 'Tokens': '120', 'Save icons': '40', 'Dimension': 'All', 'Model': 'v2, v3', 'Styles': true, 'Server speed': true } },
              { name: 'Enterprise', price: '14.59', features: { 'Tokens': 'Unlimited', 'Save icons': 'Unlimited', 'Dimension': 'All', 'Model': 'v2, v3', 'Styles': true, 'Server speed': true } }
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg ${plan.highlight ? 'bg-gray-700 ring-2 ring-blue-600' : 'bg-gray-800'} p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="ml-1 text-slate-400">/month</span>
                    </div>
                  </div>
                  {plan.highlight && (
                    <span className="inline-flex px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-4">
                  {Object.entries(plan.features).map(([feature, value], i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <span className="w-40 flex-shrink-0">{feature}:</span>
                      {typeof value === 'boolean' ? (
                        value ? <Check className="w-5 h-5 text-blue-500" /> : <span className="text-slate-500">-</span>
                      ) : (
                        <span className="text-white">{value}</span>
                      )}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`mt-8 block w-full px-4 py-3 text-center font-semibold rounded-lg ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } transition duration-200`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}