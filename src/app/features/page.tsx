import React from 'react';
import { Check, Image, Layers, Palette } from 'lucide-react';

function FeatureCard({ title, features }: { title: string; features: { name: string; tokens: number }[] }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700 hover:border-purple-500 transition-all">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center justify-between text-gray-300">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-purple-500" />
              <span>{feature.name}</span>
            </div>
            <span className="font-semibold">{feature.tokens} token{feature.tokens > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Features() {
  const features = {
    quality: [
      { name: 'Standard Quality', tokens: 1 },
      { name: 'HD Quality', tokens: 2 },
    ],
    dimensions: [
      { name: 'Small Size', tokens: 1 },
      { name: 'Medium Size', tokens: 1 },
      { name: 'Large Size', tokens: 2 },
    ],
    icons: [
      { name: '1 Icon', tokens: 1 },
      { name: '3 Icons', tokens: 1 },
      { name: '10 Icons', tokens: 2 },
    ],
    models: [
      { name: 'DALL-E 2', tokens: 1 },
      { name: 'DALL-E 3', tokens: 2 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Features & Pricing
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the perfect combination of features for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <FeatureCard title="Quality Options" features={features.quality} />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <FeatureCard title="Dimensions" features={features.dimensions} />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <FeatureCard title="Icons Package" features={features.icons} />
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <FeatureCard title="AI Models" features={features.models} />
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex gap-8 items-center justify-center bg-gray-800 rounded-full px-8 py-4">
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              <span className="text-gray-300">Quality Options</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-500" />
              <span className="text-gray-300">Multiple Dimensions</span>
            </div>
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5 text-purple-500" />
              <span className="text-gray-300">Advanced AI Models</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}