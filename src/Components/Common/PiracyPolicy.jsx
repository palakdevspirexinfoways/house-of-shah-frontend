import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const PiracyPolicy = () => {
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
            Piracy Policy
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Copyright & Design Protection</h2>
              <p className="mb-2">
                All content displayed on the House of Shah website, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Jewellery designs</li>
                <li>Product images and renders</li>
                <li>CAD drawings and concepts</li>
                <li>Videos and marketing materials</li>
                <li>Logos, branding assets, and graphics</li>
                <li>Website content and written material</li>
              </ul>
              <p className="mb-2">
                is the intellectual property of House of Shah unless otherwise stated and is protected under applicable copyright, trademark, design, and intellectual property laws.
              </p>
              <p>
                Unauthorized reproduction, distribution, modification, publication, commercial use, or duplication of any content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Design Piracy</h2>
              <p className="mb-2">
                House of Shah invests significant time, expertise, and resources into the development of original jewellery designs and collections.
              </p>
              <p>
                The unauthorized copying, replication, manufacturing, sale, distribution, or commercial use of House of Shah designs, product concepts, CAD files, or visual references without prior written authorization may constitute intellectual property infringement and may result in legal action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Unauthorized Use of Images & Content</h2>
              <p className="mb-2">
                The use, reproduction, downloading, editing, publication, or redistribution of any House of Shah images, videos, catalogue content, or marketing materials without written permission is prohibited.
              </p>
              <p className="mb-2">
                This includes use on:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>Websites</li>
                <li>E-commerce platforms</li>
                <li>Social media platforms</li>
                <li>Digital advertisements</li>
                <li>Printed catalogues and promotional materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Website Access & Catalogue Protection</h2>
              <p className="mb-2">
                Access to certain sections of the House of Shah website may be restricted to registered users.
              </p>
              <p className="mb-2">
                Any attempt to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>Copy catalogue data</li>
                <li>Download protected content without authorization</li>
                <li>Extract product information through automated tools</li>
                <li>Scrape website content</li>
                <li>Reproduce collections for commercial purposes</li>
              </ul>
              <p className="mb-2">
                is strictly prohibited.
              </p>
              <p>
                House of Shah reserves the right to suspend or terminate access to users found violating these provisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Reporting Violations</h2>
              <p className="mb-2">
                If you become aware of any unauthorized use, copying, distribution, or infringement of House of Shah intellectual property, please notify us at:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
                <p className="font-bold text-[var(--primary-blue)] mb-1">House of Shah</p>
                <p>Rajkot, Gujarat, India</p>
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Email : houseofshahexports@gmail.com
</span> 
                </p>
                <p className="mt-1 text-gray-700">
                  <span className="font-semibold">Phone : +91 9510806869</span> 
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Enforcement</h2>
              <p>
                House of Shah reserves all rights to pursue appropriate legal remedies against any individual, business, or entity involved in the unauthorized use or infringement of its intellectual property, designs, content, or proprietary materials.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PiracyPolicy;
