import { sendEmail } from "../utils/sendEmail";

const ContactUs = () => {
  return (
    <section id="contact" className="px-4 md:px-6 lg:px-20 py-12 bg-white">
      <h2 className="text-5xl font-semibold text-gray-800 mb-8 font-dm">
        Let's <span className="text-[#EB662B]">Talk!</span>
      </h2>
      <div className="w-full mx-auto flex flex-col lg:flex-row items-center gap-5">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
          <div className="bg-[#FFF1EB] p-8 rounded-3xl">
            <h3 className="text-2xl font-bold font-sansita mb-6 text-gray-800">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full text-[#EB662B] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+92 300 8680747</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full text-[#EB662B] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">skymatetravels@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3 rounded-full text-[#EB662B] shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600 max-w-xs">
                    9MQC+4FX, Noor Mahal Rd, adjacent Faysal Bank, Officer
                    Colony, Bahawalpur
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Have a Question?{" "}
            <span className="text-[#EB662B]">Let’s Talk Travel</span>
          </h2>
          <p className="text-gray-600 mb-6">
            A warm and inviting title that fits perfectly with travel services.
          </p>{" "}
          <form className="space-y-4" onSubmit={sendEmail}>
            {/* FormSubmit honeypot field to prevent spam */}
            <input type="text" name="_honey" style={{ display: "none" }} />

            {/* Disable captcha */}
            <input type="hidden" name="_captcha" value="false" />

            {/* Form subject */}
            <input
              type="hidden"
              name="_subject"
              value="New Contact Form Inquiry"
            />

            {/* Redirect URL after submission - comment out if not needed */}
            {/* <input type="hidden" name="_next" value="https://your-website.com/thank-you" /> */}

            {/* Time */}
            <input
              type="hidden"
              name="time"
              value={new Date().toLocaleString()}
            />

            <input
              type="text"
              name="name"
              placeholder="Name *"
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB662B]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB662B]"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone No"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB662B]"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#EB662B]"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#DD5471] hover:bg-[#DD5471]/80 text-white py-3 rounded-md font-semibold transition cursor-pointer"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
