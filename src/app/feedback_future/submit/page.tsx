'use client'

import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setPopupState } from '@/state/popup/popup';

export default function Feeback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: session, status } = useSession()
  const setVisibility = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    if (!session) {
      setVisibility(setPopupState())
      return
    }
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                Share Your Thoughts
              </h1>
              <p className="text-gray-400 mt-2">We value your feedback</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-colors duration-200 resize-none"
                  placeholder="What's on your mind?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-sky-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-sky-600 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>Submit Feedback</span>
                <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center bg-gray-800 p-8 rounded-lg border border-gray-700">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-400">Your feedback has been submitted successfully.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 text-gray-400 hover:text-white flex items-center justify-center space-x-2 mx-auto transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go back</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}