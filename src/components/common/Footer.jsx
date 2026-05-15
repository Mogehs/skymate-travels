import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";


const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine brand based on path
  const isFlySmart = currentPath.includes("/fly-smart");
  const isSafarAir = currentPath.includes("/safar-air");

  const [contactData, setContactData] = useState({
    skymate: {
      phone: "+92 300 8680747",
      email: "skymatetravels@gmail.com",
      address: "9MQC+4FX, Noor Mahal Rd, adjacent Faysal Bank, Officer Colony, Bahawalpur"
    },
    flysmart: {
      phone: "+92 300 6501006",
      email: "flysmartmux@gmail.com",
      address: "9MQC+4FX, Noor Mahal Rd, adjacent Faysal Bank, Officer Colony, Bahawalpur"
    },
    safarair: {
      phone: "+92 300 8680747",
      email: "safarairmux@gmail.com",
      address: "9MQC+4FX, Noor Mahal Rd, adjacent Faysal Bank, Officer Colony, Bahawalpur"
    }
  });

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const docRef = doc(db, 'settings', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Merge with defaults to ensure all fields exist
          setContactData(prev => ({
            skymate: { ...prev.skymate, ...data.skymate },
            flysmart: { ...prev.flysmart, ...data.flysmart },
            safarair: { ...prev.safarair, ...data.safarair }
          }));
        }
      } catch (error) {
        console.error('Error fetching footer contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  // Define social links for each brand
  const socialLinks = {
    skymate: {
      facebook: "https://www.facebook.com/SkymatePakistan",
      instagram: "https://www.instagram.com/skymateholidays/",
      tiktok: "https://www.tiktok.com/@skymatetravel?_r=1&_t=ZS-93TizQVnt7H",
    },
    flysmart: {
      facebook: "https://www.facebook.com/profile.php?id=61577827414133",
      instagram: "https://www.instagram.com/skyroointernational/",
    },
    safarair: {
      facebook: "https://www.facebook.com/profile.php?id=61575907543606",
      instagram: "https://www.instagram.com/safarairmux/",
    },
  };

  // Select current links
  let currentLinks = socialLinks.skymate;
  if (isFlySmart) currentLinks = socialLinks.flysmart;
  if (isSafarAir) currentLinks = socialLinks.safarair;

  return (
    <footer className="bg-[#fff2ed] text-gray-800 w-full md:w-[98%] mx-auto rounded-2xl py-12 mt-10 mb-4 px-4 lg:px-20 shadow-sm">
      <div className="max-w-7xl mx-auto">
        {/* Top Section with Logo and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10 border-b border-orange-100 pb-8 gap-8">
          <div className="text-center lg:text-left">
            <img
              src="/skymate-logo.png"
              alt="Logo"
              className="w-16 h-16 object-contain mx-auto lg:mx-0 mb-3"
            />
            <p className="text-sm text-gray-600 max-w-sm font-dm leading-relaxed">
              We make your travel dreams come true with personalized experiences
              and unforgettable adventures.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <h3 className="font-semibold mb-3 font-sansita text-lg text-center lg:text-left">
              Stay Updated
            </h3>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 border font-dm border-gray-200 rounded-l-md w-full lg:w-64 focus:outline-none focus:ring-1 focus:ring-orange-300 text-sm"
              />
              <button
                type="submit"
                className="bg-[#EB662B] hover:bg-orange-600 transition-colors text-white px-5 py-2.5 rounded-r-md font-dm font-medium text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Global Contact Hub - Professional Box Layout */}
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-dm">
            {/* Skymate HQ */}
            <div className="bg-white/50 p-5 rounded-xl border border-orange-100 hover:border-[#EB662B]/30 transition-all shadow-sm">
              <div className="h-8 mb-4">
                <img src="/skymate-logo.png" alt="Skymate" className="h-full object-contain" />
              </div>
              <div className="space-y-3 text-xs text-gray-600">
                <a href={`tel:${contactData.skymate.phone}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors">
                  <Phone size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.skymate.phone}</span>
                </a>
                <a href={`mailto:${contactData.skymate.email}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors truncate">
                  <Mail size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.skymate.email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#EB662B] mt-0.5 shrink-0" />
                  <span className="leading-relaxed text-gray-500 line-clamp-2">{contactData.skymate.address}</span>
                </div>
              </div>
            </div>

            {/* Fly Smart */}
            <div className="bg-white/50 p-5 rounded-xl border border-orange-100 hover:border-[#EB662B]/30 transition-all shadow-sm">
              <div className="h-8 mb-4">
                <img src="/fly-smart-logo.png" alt="Fly Smart" className="h-full object-contain" />
              </div>
              <div className="space-y-3 text-xs text-gray-600">
                <a href={`tel:${contactData.flysmart.phone}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors">
                  <Phone size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.flysmart.phone}</span>
                </a>
                <a href={`mailto:${contactData.flysmart.email}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors truncate">
                  <Mail size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.flysmart.email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#EB662B] mt-0.5 shrink-0" />
                  <span className="leading-relaxed text-gray-500 line-clamp-2">{contactData.flysmart.address}</span>
                </div>
              </div>
            </div>

            {/* Safar Air */}
            <div className="bg-white/50 p-5 rounded-xl border border-orange-100 hover:border-[#EB662B]/30 transition-all shadow-sm">
              <div className="h-8 mb-4">
                <img src="/safar-air-logo.png" alt="Safar Air" className="h-full object-contain" />
              </div>
              <div className="space-y-3 text-xs text-gray-600">
                <a href={`tel:${contactData.safarair.phone}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors">
                  <Phone size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.safarair.phone}</span>
                </a>
                <a href={`mailto:${contactData.safarair.email}`} className="flex items-center gap-2 hover:text-[#EB662B] transition-colors truncate">
                  <Mail size={14} className="text-[#EB662B] shrink-0" />
                  <span className="font-medium">{contactData.safarair.email}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-[#EB662B] mt-0.5 shrink-0" />
                  <span className="leading-relaxed text-gray-500 line-clamp-2">{contactData.safarair.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Links Section - Ecosystem & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-orange-100/60 mb-10">
          {/* Column 1: About Group */}
          <div className="lg:col-span-1">
            <h4 className="font-sansita font-bold text-gray-800 mb-4 text-base">The Skymate Group</h4>
            <p className="text-xs text-gray-500 leading-relaxed font-dm">
              <span className="font-bold text-[#EB662B]">Skymate Travels & Holidays</span> is the parent anchor for both Fly Smart and Safar Air, ensuring a unified standard of excellence across all travel logistics.
            </p>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="font-sansita font-bold text-gray-800 mb-4 text-base">Our Ecosystem</h4>
            <ul className="space-y-2 font-dm text-xs">
              <li>
                <a href="/fly-smart" className="text-gray-600 hover:text-[#EB662B] transition-colors font-semibold">Fly Smart</a>
                <p className="text-[10px] text-gray-400">Boutique Flight Concierge</p>
              </li>
              <li>
                <a href="/safar-air" className="text-gray-600 hover:text-[#EB662B] transition-colors font-semibold">Safar Air</a>
                <p className="text-[10px] text-gray-400">International Air Logistics</p>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Support */}
          <div>
            <h4 className="font-sansita font-bold text-gray-800 mb-4 text-base">Quick Support</h4>
            <ul className="space-y-2 font-dm text-xs text-gray-600">
              <li className="hover:text-[#EB662B] cursor-pointer flex items-center gap-2">
                <span className="text-orange-300">▹</span> Travel Help Center
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer flex items-center gap-2">
                <span className="text-orange-300">▹</span> Booking Guidelines
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer flex items-center gap-2">
                <span className="text-orange-300">▹</span> Visa Support
              </li>
              <li className="hover:text-[#EB662B] cursor-pointer flex items-center gap-2">
                <span className="text-orange-300">▹</span> Corporate Accounts
              </li>
            </ul>
          </div>

          {/* Column 4: Social Connect */}
          <div className="flex flex-col items-center lg:items-end">
            <h4 className="font-sansita font-bold text-gray-800 mb-4 text-base">Connect With Us</h4>
            <div className="flex space-x-3">
              {currentLinks.facebook && (
                <a href={currentLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#EB662B] transition-all text-[#EB662B] hover:text-white p-2 rounded-lg shadow-sm border border-orange-100">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                </a>
              )}
              {currentLinks.tiktok && (
                <a href={currentLinks.tiktok} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#EB662B] transition-all text-[#EB662B] hover:text-white p-2 rounded-lg shadow-sm border border-orange-100">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.65-1.62-1.12-1.04 2.88.38 6.57-1.74 8.71-2.9 2.93-8.85 1.77-9.59-2.34-.69-3.83 2.84-7.48 6.74-6.85.2.04.4.1.6.15v4.11a2.6 2.6 0 0 0-1.28-.35c-1.03.07-1.92.83-2.07 1.85-.18 1.25.73 2.5 1.95 2.67 1.25.18 2.5-.73 2.67-1.95.06-.4.07-.81.02-1.21l-.01-12.69z"></path></svg>
                </a>
              )}
              {currentLinks.instagram && (
                <a href={currentLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-[#EB662B] transition-all text-[#EB662B] hover:text-white p-2 rounded-lg shadow-sm border border-orange-100">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-orange-100/60">
          <p className="text-xs text-gray-500 font-dm">
            © {new Date().getFullYear()} Skymate Travels & Holidays. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-400 mt-2 font-dm uppercase tracking-widest">
            A Skymate Travels & Holidays Group Initiative
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
