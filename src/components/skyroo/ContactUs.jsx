import React, { useState } from "react";

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);

    fetch("https://formsubmit.co/ajax/skyroointernational@gmail.com", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: true,
          message: "Your message has been sent successfully!",
        });
        e.target.reset();
        setTimeout(() => {
          setFormStatus({
            submitted: false,
            success: false,
            message: "",
          });
        }, 5000);
      })
      .catch((error) => {
        setIsSubmitting(false);
        setFormStatus({
          submitted: true,
          success: false,
          message: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <section
      id="contact"
      className="py-0 bg-white font-dm border-t border-slate-100"
    >
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Map Section - Sharp, Full Height */}
        <div className="w-full lg:w-1/2 min-h-[400px] lg:min-h-auto relative bg-slate-100">
          <iframe
            title="Skymate Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.324838426097!2d71.6917!3d29.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzQ0LjIiTiA3McKwNDEnMzAuMSJF!5e0!3m2!1sen!2s!4v1645432123456!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>

        {/* Form Section - Sharp, Minimalist */}
        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-lg mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-sansita leading-tight">
              Let's <span className="text-sky-accent">Talk</span>
            </h2>

            <div className="mb-8 text-base text-slate-600">
              <p className="mb-2">
                Have a question or ready to plan your journey?
              </p>
              <p className="font-medium text-slate-900">
                Phone:{" "}
                <a
                  href="tel:+923006501006"
                  className="text-sky-accent hover:underline decoration-sky-accent/30 underline-offset-4"
                >
                  +92 300 6501006
                </a>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {formStatus.submitted && (
                <div
                  className={`p-4 text-sm font-medium ${
                    formStatus.success
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              {/* Hidden Fields */}
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value="New Contact Form Inquiry"
              />
              <input
                type="hidden"
                name="time"
                value={new Date().toLocaleString()}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                  className="w-full border-b border-slate-300 bg-transparent text-slate-900 placeholder-slate-400 py-3 focus:outline-none focus:border-sky-accent transition-colors rounded-none"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full border-b border-slate-300 bg-transparent text-slate-900 placeholder-slate-400 py-3 focus:outline-none focus:border-sky-accent transition-colors rounded-none"
                />
              </div>

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full border-b border-slate-300 bg-transparent text-slate-900 placeholder-slate-400 py-3 focus:outline-none focus:border-sky-accent transition-colors rounded-none"
              />

              <textarea
                name="message"
                placeholder="Tell us about your plans..."
                rows={4}
                className="w-full border-b border-slate-300 bg-transparent text-slate-900 placeholder-slate-400 py-3 focus:outline-none focus:border-sky-accent transition-colors resize-none rounded-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[var(--sky-accent)] hover:bg-sky-600 text-white py-4 font-semibold tracking-wide uppercase transition-all duration-300 rounded-none mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
