import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsCondition = () => {
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
            Terms & Conditions
          </h1>

          <div className="space-y-8 text-gray-700 leading-relaxed text-sm md:text-base">
            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Introduction</h2>
              <p>
                Welcome to House of Shah ("HOS", "we", "our", or "us"). By accessing this website, submitting inquiries, requesting quotations, placing orders, or engaging our manufacturing services, you agree to be bound by these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Nature of Business</h2>
              <p className="mb-2">
                House of Shah is a manufacturer of 925 sterling silver jewellery catering to brands, retailers, wholesalers, distributors, and private label clients in India and internationally.
              </p>
              <p>
                The products displayed on this website are intended for reference and business inquiry purposes. Product availability, customization options, pricing, and minimum order quantities may vary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Product Specifications</h2>
              <p className="mb-2">
                All jewellery manufactured by House of Shah is produced using 925 sterling silver.
              </p>
              <p className="mb-2">
                As our products are manufactured through a combination of advanced technology and skilled but manual craftsmanship, minor variations in:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>weight</li>
                <li>finish</li>
                <li>plating tone</li>
                <li>stone setting</li>
                <li>dimensions</li>
              </ul>
              <p>
                may occur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Quotations & Orders</h2>
              <p className="mb-2">
                All quotations issued by House of Shah are subject to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>material costs</li>
                <li>production requirements</li>
                <li>order quantities</li>
                <li>customization requests</li>
                <li>applicable taxes and duties</li>
              </ul>
              <p>
                An order shall be considered confirmed only upon written acceptance and receipt of the agreed advance payment, where applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Manufacturing Timelines</h2>
              <p className="mb-2">
                Production timelines communicated by House of Shah are estimates and may vary due to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>order volume</li>
                <li>customization requirements</li>
                <li>raw material availability</li>
                <li>logistics constraints</li>
                <li>circumstances beyond reasonable control</li>
              </ul>
              <p>
                We shall make reasonable efforts to meet agreed timelines but shall not be liable for delays arising from such circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Pricing & Payment</h2>
              <p className="mb-2">
                All pricing shall be communicated separately through quotations or purchase agreements.
              </p>
              <p className="mb-2">
                Unless otherwise agreed:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>applicable taxes shall be additional</li>
                <li>international duties, customs charges, and import fees shall be borne by the buyer</li>
                <li>payment terms shall be specified in the relevant quotation or invoice</li>
              </ul>
              <p>
                House of Shah reserves the right to suspend production or shipment in the event of delayed payments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Shipping & Delivery</h2>
              <p className="mb-2">
                We ship both within India and internationally.
              </p>
              <p className="mb-2">
                Delivery timelines are estimates only and may be affected by:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>courier operations</li>
                <li>customs clearance procedures</li>
                <li>local regulations</li>
                <li>force majeure events</li>
              </ul>
              <p>
                Risk and responsibility for the goods shall transfer in accordance with the agreed shipping terms communicated during the order process.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Returns, Cancellations & Modifications</h2>
              <p className="mb-2">
                As the majority of products are manufactured to order, customized, or produced specifically for business clients:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>confirmed orders cannot be cancelled once production has commenced</li>
                <li>custom-manufactured products are generally not eligible for return or exchange</li>
                <li>any concerns regarding defects or discrepancies must be reported within 7 days of receipt</li>
              </ul>
              <p>
                Claims shall be reviewed on a case-by-case basis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Intellectual Property</h2>
              <p className="mb-2">
                All content appearing on this website, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-2">
                <li>jewellery designs</li>
                <li>photographs</li>
                <li>product renders</li>
                <li>graphics</li>
                <li>logos</li>
                <li>branding materials</li>
                <li>written content</li>
              </ul>
              <p className="mb-2">
                are the property of House of Shah unless otherwise stated.
              </p>
              <p>
                Unauthorized reproduction, distribution, or commercial use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Website Content</h2>
              <p className="mb-2">
                While we strive to ensure accuracy, House of Shah does not warrant that all website content, product descriptions, images, specifications, or technical information will always be complete, current, or error-free.
              </p>
              <p>
                We reserve the right to modify website content without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Limitation of Liability</h2>
              <p>
                House of Shah shall not be liable for any indirect, incidental, consequential, or business losses arising from the use of this website, delays in production or shipment, or any circumstances beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Governing Law</h2>
              <p>
                These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from these Terms & Conditions shall be subject to the exclusive jurisdiction of the courts of Rajkot, Gujarat, India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--primary-blue)] mb-4 uppercase tracking-wide">Contact Information</h2>
              <p className="mb-2">
                For any questions regarding these Terms & Conditions, please contact:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsCondition;
