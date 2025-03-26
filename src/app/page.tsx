'use client'

import React, { useState, useEffect } from 'react';
import { XIcon as Icons, Palette, Wand2, Zap, Code2, ArrowRight, CheckCircle2, Sparkles, Image, Download } from 'lucide-react';
import Link from 'next/link';

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <span className="text-indigo-500">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function App() {
  return (
    // <></>
    <>
      <div className="h-16 w-full"></div>
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <header className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <Icons className="h-16 w-16 text-indigo-500" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Transform Your Ideas into{' '}
                <TypewriterText text="Beautiful Icons" />
              </h1>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Create stunning, customizable icons in seconds with our AI-powered platform.
                Perfect for designers, developers, and creators.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href={"/home"} className="px-8 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center gap-2">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="bg-slate-700 p-8 rounded-xl">
                <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                  <Wand2 className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Generation</h3>
                <p className="text-slate-300">Transform text descriptions into pixel-perfect icons using our advanced AI technology.</p>
              </div>
              <div className="bg-slate-700 p-8 rounded-xl">
                <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                  <Palette className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Customizable Styles</h3>
                <p className="text-slate-300">Adjust colors, sizes, and styles to match your brand's unique identity.</p>
              </div>
              <div className="bg-slate-700 p-8 rounded-xl">
                <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                  <Code2 className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Developer Friendly</h3>
                <p className="text-slate-300">Export icons in multiple formats with ready-to-use code snippets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Sparkles className="h-12 w-12 text-indigo-500" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Create Icons That Stand Out</h2>
              <p className="text-xl text-slate-400">Explore what you can create with our platform</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="group relative bg-slate-800 rounded-xl overflow-hidden">
                  <div className="aspect-square bg-slate-700 flex items-center justify-center">
                    {index % 3 === 0 && <Image className="h-24 w-24 text-indigo-500" />}
                    {index % 3 === 1 && <Download className="h-24 w-24 text-indigo-500" />}
                    {index % 3 === 2 && <Zap className="h-24 w-24 text-indigo-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <Zap className="h-12 w-12 text-indigo-500" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Icons?</h2>
            <p className="text-xl text-slate-400 mb-8">
              Join thousands of creators who trust our platform for their icon needs.
            </p>
            <Link href={"/home"} className="px-8 py-3 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 transition flex items-center gap-2 mx-auto">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}