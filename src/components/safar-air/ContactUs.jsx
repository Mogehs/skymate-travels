import React, { useState } from "react";
import { sendEmail } from "../../utils/sendEmailSafarAir";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendEmail(e);
      // Feedback is handled by the sendEmail utility or basic browser alerts usually in this setup
      // but we can add minor state feedback if needed.
    } catch (err) {
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-white font-dm border-t border-slate-100 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row min-h-[600px] max-w-[1440px] mx-auto border-x border-slate-50">
        {/* Map Section - Sharp, Full Height */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-auto relative bg-slate-50">
          <iframe
            title="Safar Air Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.324838426097!2d71.6917!3d29.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzQ0LjIiTiA3McKwNDEnMzAuMSJF!5e0!3m2!1sen!2s!4v1645432123456!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
        </div>

        {/* Form Section - Sharp, Minimalist */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-white border-l border-slate-50">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-100 rounded-full mb-8 text-[#1E40AF]">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                Contact Desk
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 font-sansita leading-tight">
              Begin Your <br />
              <span className="text-[#F59E0B]">New Chapter</span>
            </h2>

            <div className="mb-12 space-y-4 text-sm text-slate-500 font-light">
              <p className="flex items-center gap-3">
                <Phone size={14} className="text-[#1E40AF]" />
                <span className="font-medium text-slate-900">Desk:</span> +92
                300 6501006
              </p>
              <p className="flex items-center gap-3">
                <Mail size={14} className="text-[#1E40AF]" />
                <span className="font-medium text-slate-900">Email:</span>{" "}
                safarairintl@gmail.com
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="Safar Air - Premium Inquiry"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full border-b border-slate-200 bg-transparent text-slate-900 placeholder-slate-300 py-3 focus:outline-none focus:border-[#1E40AF] transition-colors rounded-none font-dm text-sm"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1E40AF] transition-all duration-300 group-focus-within:w-full"></div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="w-full border-b border-slate-200 bg-transparent text-slate-900 placeholder-slate-300 py-3 focus:outline-none focus:border-[#1E40AF] transition-colors rounded-none font-dm text-sm"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1E40AF] transition-all duration-300 group-focus-within:w-full"></div>
                </div>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="phone"
                  placeholder="Contact Number"
                  className="w-full border-b border-slate-200 bg-transparent text-slate-900 placeholder-slate-300 py-3 focus:outline-none focus:border-[#1E40AF] transition-colors rounded-none font-dm text-sm"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1E40AF] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <div className="relative group">
                <textarea
                  name="message"
                  placeholder="How can we curate your journey?"
                  rows={3}
                  className="w-full border-b border-slate-200 bg-transparent text-slate-900 placeholder-slate-300 py-3 focus:outline-none focus:border-[#1E40AF] transition-colors resize-none rounded-none font-dm text-sm"
                ></textarea>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1E40AF] transition-all duration-300 group-focus-within:w-full"></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 bg-slate-900 hover:bg-[#1E40AF] text-white px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 rounded-none shadow-xl shadow-slate-100 disabled:opacity-50"
              >
                <span>
                  {isSubmitting ? "Orchestrating..." : "Submit Inquiry"}
                </span>
                <Send
                  size={14}
                  className={`transition-transform duration-500 ${isSubmitting ? "" : "group-hover:translate-x-1"}`}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
