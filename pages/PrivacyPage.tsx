import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="text-sm text-slate-500 mb-8">Last Updated: March 15, 2026</p>

        <h3>1. Introduction</h3>
        <p>
          Welcome to Aixly directory. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
        </p>

        <h3>2. Information We Collect</h3>
        <p>
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
        </p>
        <ul>
          <li><strong>Identity Data:</strong> includes username or similar identifier.</li>
          <li><strong>Contact Data:</strong> includes email address (when submitting tools or signing up for newsletters).</li>
          <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
          <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
        </ul>

        <h3>3. How We Use Your Data</h3>
        <p>
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
        </p>
        <ul>
          <li>To process and review your tool submissions.</li>
          <li>To send you our newsletter (if subscribed).</li>
          <li>To improve our website through analytics.</li>
        </ul>

        <h3>4. Cookies</h3>
        <p>
          You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
        </p>

        <h3>5. Third-Party Links</h3>
        <p>
          This website includes links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
        </p>

        <h3>6. Contact Us</h3>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@aixlydirectory.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;