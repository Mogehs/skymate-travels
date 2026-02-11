import { sendEmail } from "../../utils/sendEmailSafarAir";
import { contact } from "../../assets/safar-air/index.js";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <section
      id="contact"
      className="px-4 md:px-6 lg:px-20 py-20 bg-gradient-to-br from-white via-blue-50/30 to-amber-50/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-full mb-4">
            <MessageSquare className="text-[#1E40AF] w-4 h-4" />
            <span className="text-sm text-[#1E40AF] font-semibold tracking-wide uppercase">
              Get in Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E3A8A] mb-4 font-playfair">
            Let's{" "}
            <span className="bg-gradient-to-r from-[#1E40AF] to-[#F59E0B] bg-clip-text text-transparent">
              Connect!
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Start your journey with us today. Our travel experts are ready to
            help you plan your perfect adventure.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="w-full lg:w-5/12 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/10 to-[#F59E0B]/10 rounded-[40px] blur-3xl"></div>

              {/* Main image container */}
              <div className="relative bg-gradient-to-br from-blue-100 via-blue-50 to-amber-100 rounded-[40px] p-8 shadow-2xl">
                <img
                  src={contact}
                  alt="Travel Experience"
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#F59E0B] to-[#FCD34D] rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300">
              <div className="flex items-start gap-4 mb-8">
                <div className="p-4 bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] rounded-2xl shadow-lg">
                  <MessageSquare className="text-white w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1E3A8A] font-playfair mb-2">
                    Have a Question?
                  </h3>
                  <p className="text-gray-600 text-base">
                    Fill out the form below and our travel experts will get back
                    to you shortly.
                  </p>
                </div>
              </div>
              <form className="space-y-6" onSubmit={sendEmail}>
                <input type="text" name="_honey" style={{ display: "none" }} />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Form Inquiry - Safar Air"
                />
                <input
                  type="hidden"
                  name="time"
                  value={new Date().toLocaleString()}
                />

                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    required
                    className="w-full border-2 border-blue-100 rounded-xl p-4 pl-4 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all hover:border-blue-200"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E40AF] w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    className="w-full border-2 border-blue-100 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all hover:border-blue-200"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1E40AF] w-5 h-5" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="w-full border-2 border-blue-100 rounded-xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all hover:border-blue-200"
                  />
                </div>

                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={6}
                  className="w-full border-2 border-blue-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent transition-all resize-none hover:border-blue-200"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] bg-size-200 bg-pos-0 hover:bg-pos-100 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl premium-button group"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all" />
                </button>
              </form>

              {/* Additional info */}
              <div className="mt-8 pt-6 border-t border-blue-100">
                <p className="text-sm text-gray-500 text-center">
                  🔒 Your information is secure and will never be shared with
                  third parties
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
