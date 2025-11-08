export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using Levqor, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Description</h2>
            <p>
              Levqor provides an automation platform that allows users to create, manage, and execute workflows. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Creation</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 18 years old to use our service</li>
              <li>One person or entity may not maintain multiple free accounts</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Account Security</h3>
            <p>
              You are responsible for all activity under your account. Notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit malware or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Abuse, harass, or harm other users</li>
              <li>Use the service for cryptocurrency mining</li>
              <li>Resell or redistribute our service without permission</li>
              <li>Exceed rate limits or abuse API endpoints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Billing and Payments</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Pricing</h3>
            <p>
              Current pricing is available on our pricing page. We reserve the right to modify pricing with 30 days notice to existing customers.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Payment Terms</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Subscriptions are billed monthly or annually in advance</li>
              <li>All fees are non-refundable except as required by law</li>
              <li>Failed payments may result in service suspension</li>
              <li>You are responsible for all applicable taxes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Limits</h2>
            <p>
              Usage limits apply based on your subscription plan:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Workflow execution limits per month</li>
              <li>API request rate limits</li>
              <li>Storage and data retention limits</li>
              <li>Team member limits</li>
            </ul>
            <p className="mt-4">
              Exceeding limits may result in additional charges or service throttling.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are owned by Levqor and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Level Agreement</h2>
            <p>
              We strive for 99.9% uptime for paid plans. Service credits may be available for extended outages as outlined in our SLA documentation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
            <p className="mt-4">
              You may cancel your account at any time from your account settings. Cancellation takes effect at the end of your current billing period.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Levqor shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of material changes via email or through the service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:legal@levqor.ai" className="text-blue-600 hover:underline">
                legal@levqor.ai
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
