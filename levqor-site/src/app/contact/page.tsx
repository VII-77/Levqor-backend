export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            We're here to help. Reach out to our team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Email Support</h3>
                <p className="text-gray-600">Get help from our team</p>
              </div>
            </div>
            <a href="mailto:support@levqor.ai" className="text-blue-600 hover:underline font-medium">
              support@levqor.ai
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Documentation</h3>
                <p className="text-gray-600">Find answers quickly</p>
              </div>
            </div>
            <a href="/docs" className="text-blue-600 hover:underline font-medium">
              View Documentation
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Enterprise Sales</h3>
                <p className="text-gray-600">Custom solutions</p>
              </div>
            </div>
            <a href="mailto:sales@levqor.ai" className="text-blue-600 hover:underline font-medium">
              sales@levqor.ai
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">System Status</h3>
                <p className="text-gray-600">Check uptime</p>
              </div>
            </div>
            <a href="https://api.levqor.ai/status" className="text-blue-600 hover:underline font-medium">
              View Status
            </a>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Office Hours</h2>
          <p className="text-gray-700 mb-2">Monday - Friday: 9:00 AM - 6:00 PM PST</p>
          <p className="text-gray-600">We typically respond within 24 hours on business days</p>
        </div>
      </div>
    </div>
  );
}
