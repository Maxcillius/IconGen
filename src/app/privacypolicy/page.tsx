import { Shield, Mail, Globe, ChevronDown } from 'lucide-react';

export default function PrivacyPolicy() {

  return (
    <>
      <div className='h-16 w-full'>

      </div>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Header */}
        <header className="bg-gray-800 py-6 sticky top-0 z-10 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-400" />
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
              </div>
              <p className="text-gray-400">Effective Date: March 14, 2024</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <section className="prose prose-invert">
              <p className="text-xl text-gray-300">
                We respect your privacy and are committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
              </p>
            </section>

            {/* Information Collection */}
            <section id="information" className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Information We Collect</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-semibold">Information You Provide</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Account information (name, email, password)</li>
                  <li>Payment information (processed securely via third-party providers)</li>
                  <li>User-generated content and preferences</li>
                </ul>
              </div>
            </section>

            {/* Usage */}
            <section id="usage" className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">How We Use Your Information</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>To provide and improve our services</li>
                  <li>To personalize your experience</li>
                  <li>To process payments and manage subscriptions</li>
                  <li>To communicate important updates</li>
                  <li>To analyze usage patterns and improve performance</li>
                </ul>
              </div>
            </section>

            {/* Sharing */}
            <section id="sharing" className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Information Sharing</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">
                  We do not sell your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Service providers (hosting, analytics, payment processing)</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="space-y-4">
              <h2 className="text-2xl font-bold text-blue-400">Data Security</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-300">
                  We implement industry-standard security measures to protect your data, including:
                </p>
                <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                  <li>Encryption in transit and at rest</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data centers</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-lg p-6 mt-8">
              <h2 className="text-xl font-bold mb-4">Contact Us</h2>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:support@yourdomain.com" className="hover:text-blue-400">
                    support@yourdomain.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <a href="https://yourdomain.com" className="hover:text-blue-400">
                    yourdomain.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}