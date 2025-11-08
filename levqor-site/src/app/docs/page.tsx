export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Documentation</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Levqor! This guide will help you get started with building powerful automation workflows.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Quick Start</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Sign up for a free account</li>
              <li>Connect your first integration</li>
              <li>Create your first workflow</li>
              <li>Test and deploy</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
            <p className="text-gray-600 mb-4">
              Integrate Levqor into your applications using our REST API.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h4 className="font-mono text-sm font-bold text-gray-900 mb-2">Base URL</h4>
              <code className="text-blue-600">https://api.levqor.ai/api/v1</code>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Authentication</h3>
            <p className="text-gray-600 mb-4">
              All API requests require an API key passed in the <code className="bg-gray-100 px-2 py-1 rounded">X-Api-Key</code> header.
            </p>
            
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm">
{`curl https://api.levqor.ai/api/v1/intake \\
  -H "X-Api-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{"workflow_id": "wf_123", "data": {}}'`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Endpoints</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h4 className="font-mono text-sm font-bold text-gray-900">POST /api/v1/intake</h4>
                <p className="text-gray-600 mt-2">Submit a new job to the queue</p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h4 className="font-mono text-sm font-bold text-gray-900">GET /api/v1/status/:job_id</h4>
                <p className="text-gray-600 mt-2">Check the status of a job</p>
              </div>

              <div className="border-l-4 border-purple-600 pl-4">
                <h4 className="font-mono text-sm font-bold text-gray-900">GET /health</h4>
                <p className="text-gray-600 mt-2">Health check endpoint</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Support</h2>
            <p className="text-gray-600">
              Need help? Contact our support team or check the{' '}
              <a href="https://api.levqor.ai/status" className="text-blue-600 hover:underline">system status</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
