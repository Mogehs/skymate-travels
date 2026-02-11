import React from "react";
import { Link } from "react-router-dom";
import { Compass, Globe, Award, Sparkles } from "lucide-react";
import AboutUs from "../components/About";
import WhyChooseUs from "../components/Choose";
import Achievements from "../components/Achievements";
import aboutHero from "../assets/images/about-hero.jpg";
import ourValuesBegin from "../assets/images/our-values-begin.jpg";
import ourValuesBegin2 from "../assets/images/our-values-begin-2.jpg";
import bgWallpaper from "../assets/images/bg-wallpaper.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${aboutHero})` }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60"></div>

        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-sansita mb-6 leading-tight drop-shadow-2xl">
            About Us
          </h1>
          <p className="text-xl md:text-3xl font-dm opacity-95 font-light leading-relaxed drop-shadow-lg">
            Award-winning creators of
            <br />
            <span className="font-semibold">remarkable travel experiences</span>
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20 py-6">
        <nav className="text-sm text-gray-600 font-dm">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">About Us</span>
        </nav>
      </div>

      {/* What We're About Section */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-sansita text-gray-900 mb-6">
            What We're About
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-dm text-gray-800 leading-relaxed mb-6">
              We're a team of people in the{" "}
              <span className="text-orange-500 font-semibold">
                know about travel
              </span>
            </p>
            <p className="text-lg md:text-xl text-gray-600 font-dm leading-relaxed">
              And we're on a mission to create remarkable experiences that
              thoughtfully connect our clients to the world and inspire them to
              explore it with curiosity, humility and a sense of wonder.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-gradient-to-br from-gray-50 to-orange-50/30 py-20">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold font-sansita text-gray-900 mb-6">
                It Began With A Feeling
              </h3>
              <p className="text-lg text-gray-700 font-dm leading-relaxed mb-4">
                SkyMate was founded by a group of passionate travelers who
                wanted to sweep aside the prevailing current of 'package' trips
                and same-same vacations.
              </p>
              <p className="text-lg text-gray-700 font-dm leading-relaxed mb-4">
                Since then, we've become award-winning curators of tailor-made
                travel experiences – all crafted with inspirational engineering
                and an incomparable attention to detail.
              </p>
              <p className="text-lg text-orange-600 font-dm leading-relaxed font-semibold">
                For us, the most important thing has always been: how do you
                want to feel? The rest is in the detail.
              </p>
            </div>
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
              {/* First Portrait - Lower Right (Larger) */}
              <div className="absolute bottom-0 right-0 w-72 h-96 md:w-80 md:h-[450px] lg:w-96 lg:h-[550px] overflow-hidden shadow-2xl z-10">
                <img
                  src={ourValuesBegin2}
                  alt="Traveler exploring"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 to-transparent"></div>
              </div>

              {/* Second Portrait - Upper Left (Overlapping) */}
              <div className="absolute top-0 left-0 w-64 h-80 md:w-72 md:h-96 lg:w-80 lg:h-[450px] overflow-hidden shadow-2xl z-20">
                <img
                  src={ourValuesBegin}
                  alt="Happy traveler"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-48 md:h-48 bg-orange-400/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-20 left-20 w-24 h-24 md:w-32 md:h-32 bg-orange-500/30 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose Section */}

      {/* Our Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-sansita mb-6">
              Our Values
            </h2>
            <p className="text-lg text-gray-300 font-dm max-w-3xl mx-auto">
              These three things keep us on course – whatever we do, and
              wherever in the world we find ourselves
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Be Curious */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-sansita">Be</h3>
                <h3 className="text-3xl font-bold font-sansita text-orange-400">
                  Curious
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-dm mb-3 uppercase tracking-wider">
                Ours is a wide, wild world
              </p>
              <p className="text-gray-200 font-dm leading-relaxed">
                We like to ask questions. How can this be better? Where next?
                What's genuinely possible, and what do our clients really want?
                We love questions – and we love innovators.
              </p>
            </div>

            {/* Be Thoughtful */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-sansita">Be</h3>
                <h3 className="text-3xl font-bold font-sansita text-orange-400">
                  Thoughtful
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-dm mb-3 uppercase tracking-wider">
                Because thinking is caring
              </p>
              <p className="text-gray-200 font-dm leading-relaxed">
                Good things come to those who think. And, in our world, to think
                is to care. Not only for our clients, but for each other – and
                the planet that we share.
              </p>
            </div>

            {/* Be Humble */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-sansita">Be</h3>
                <h3 className="text-3xl font-bold font-sansita text-orange-400">
                  Humble
                </h3>
              </div>
              <p className="text-sm text-gray-400 font-dm mb-3 uppercase tracking-wider">
                Let others do the talking
              </p>
              <p className="text-gray-200 font-dm leading-relaxed">
                We don't get carried away. We don't get caught up in the hype.
                We're calmly confident in what we do; graceful under pressure,
                proud but never arrogant about our achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Existing Components */}
      <AboutUs />
      <WhyChooseUs />
      <Achievements />

      {/* Final CTA Section */}
      <section
        className="py-20 w-full md:w-[98%] mx-auto rounded-2xl relative flex items-center justify-center overflow-hidden mb-8"
        style={{
          backgroundImage: `url(${bgWallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-sansita text-white mb-6">
            Your World. Your Trips.
          </h2>
          <p className="text-xl text-white/90 font-dm max-w-3xl mx-auto mb-8 leading-relaxed">
            Like a perfectly tailored suit, each trip we plan is different; just
            as each traveller is different. We're here to help you experience
            the world on your terms.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-semibold font-dm text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            <Sparkles size={20} />
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
