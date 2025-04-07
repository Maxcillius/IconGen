import { Mail, CreditCard, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function RefundPolicy() {
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
                <CreditCard className="w-8 h-8 text-blue-400" />
                <h1 className="text-2xl font-bold">Refund Policy</h1>
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
                At IconGen, we're committed to delivering high-quality icon generation services powered by advanced technology. 
                Each time you generate an icon, our system utilizes significant computational resources.
                </p>
            </section>

            {/* Main Policy */}
            <section className="bg-gray-800 rounded-lg p-8 space-y-6">
                <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                    Because of the nature of how our service works—and the immediate value delivered upon use—we are 
                    unfortunately unable to offer refunds for purchases or subscription charges.
                </p>
                </div>
                
                <div className="flex items-start space-x-3">
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-gray-300">
                    We deeply regret that we cannot accommodate refund requests, and we understand this may be disappointing. 
                    Our decision is rooted in the high infrastructure costs associated with processing and generating icons, 
                    especially when powered by resource-intensive AI models.
                </p>
                </div>
            </section>

            {/* No Refunds Policy */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-400">No Refunds Policy</h2>
                <div className="bg-gray-800 rounded-lg p-6">
                <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">All purchases are final. This includes one-time icon packs, credits, and subscription fees.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">No partial refunds are issued for unused subscription time or unused generation credits.</span>
                    </li>
                    <li className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">No refunds are granted due to user error (e.g., wrong input, wrong style selection, etc.).</span>
                    </li>
                </ul>
                </div>
            </section>

            {/* Transparency and Support */}
            <section className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-400">Transparency and Support</h2>
                <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">
                    We strive to be as transparent as possible before you make a purchase. We encourage you to explore 
                    any available free previews, trials, or demos before committing.
                    </p>
                </div>
                
                <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">
                    If you encounter a technical issue or something doesn't seem right, we absolutely want to help. 
                    While we do not issue refunds, our team is happy to look into any problems you experience and 
                    work toward a fair resolution whenever possible.
                    </p>
                </div>
                </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-800 rounded-lg p-6 mt-8">
                <h2 className="text-xl font-bold mb-4">Need Help?</h2>
                <p className="text-gray-300 mb-4">
                Please reach out to us with any concerns—we're here to help.
                </p>
                <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <a href="mailto:support@yourdomain.com" className="hover:text-blue-400">
                    support@yourdomain.com
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