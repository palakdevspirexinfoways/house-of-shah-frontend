import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--white)] pt-32 pb-24 font-outfit">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-blue)] mb-12 uppercase tracking-wider text-center md:text-left">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <section>
              <p>
                At House of Shah ("HOS", "we", "our", or "us"), we value your privacy and are committed to protecting any personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard information obtained through our website.
              </p>
              <p className="mt-2">
                By using our website, you agree to the practices described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Information We Collect</h2>
              <p className="mb-2">
                We may collect the following information when you interact with our website:
              </p>
              <p className="font-semibold mt-4 mb-2">Personal Information</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Name</li>
                <li>Company Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Country/Location</li>
                <li>Business Details provided through inquiry or registration forms</li>
              </ul>
              
              <p className="font-semibold mb-2">Technical Information</p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>IP Address</li>
                <li>Browser Type</li>
                <li>Device Information</li>
                <li>Website Usage Data</li>
                <li>Cookies and Similar Technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">How We Use Your Information</h2>
              <p className="mb-2">
                We may use the information collected to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>Provide access to our collections and catalogue</li>
                <li>Respond to inquiries and business requests</li>
                <li>Process and manage orders</li>
                <li>Communicate regarding products, services, and quotations</li>
                <li>Maintain security and prevent unauthorized access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Registration and Account Access</h2>
              <p className="mb-2">
                Certain areas of the website may require registration before access is granted.
              </p>
              <p>
                By registering, you agree to provide accurate and up-to-date information. House of Shah reserves the right to approve, restrict, or revoke access at its discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Cookies</h2>
              <p className="mb-2">
                Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve website performance.
              </p>
              <p>
                Users may choose to disable cookies through their browser settings; however, certain website features may not function properly as a result.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Information Sharing</h2>
              <p className="mb-2">
                House of Shah does not sell, rent, or trade personal information to third parties.
              </p>
              <p className="mb-2">
                Information may be shared only when necessary with:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>Logistics and shipping partners</li>
                <li>Technology and website service providers</li>
                <li>Government or regulatory authorities when required by law</li>
              </ul>
              <p>
                Such disclosures shall be limited to the extent reasonably necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">International Users</h2>
              <p className="mb-2">
                As House of Shah serves customers both within India and internationally, your information may be processed and stored in accordance with applicable laws and regulations.
              </p>
              <p>
                By providing your information, you consent to such processing where required.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Changes to this Privacy Policy</h2>
              <p className="mb-2">
                House of Shah reserves the right to update or modify this Privacy Policy at any time.
              </p>
              <p>
                Continued use of the website following such updates constitutes acceptance of the revised Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Contact Us</h2>
              <p className="mb-2">
                For any questions regarding this Privacy Policy or the handling of your information, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <p className="font-bold text-[var(--primary-blue)] mb-1">House of Shah</p>
                <p>Rajkot, Gujarat, India</p>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Email:</span> 
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Phone:</span> 
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
