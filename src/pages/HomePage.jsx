import React from "react";
import Hero from "../components/Hero";
import PopularTourTypes from "../components/Popular";
import WhyChooseUs from "../components/Choose";
import Achievements from "../components/Achievements";
import Umrah from "../components/Umrah";
import MostSearched from "../components/MostSearched";
import BestDeals from "../components/BestDeals";
import CuratedPackages from "../components/CuratedPackages";
import DestinationHighlights from "../components/Destination";
import Testimonials from "../components/Testimonials";
import Destinations from "../components/Destinations";
import Map from "../components/Map";
import AboutUs from "../components/About";

const HomePage = ({ openGlobalModal }) => {
  return (
    <>
      <Hero openGlobalModal={openGlobalModal} />
      {/* <PopularTourTypes /> */}
      <AboutUs />
      <WhyChooseUs />
      <Achievements />
      <Umrah openGlobalModal={openGlobalModal} brand="skymate" />
      <MostSearched openGlobalModal={openGlobalModal} brand="skymate" />
      <BestDeals brand="skymate" />
      <CuratedPackages openGlobalModal={openGlobalModal} brand="skymate" />
      <DestinationHighlights brand="skymate" />
      <Testimonials brand="skymate" />
      <Destinations brand="skymate" />
      <Map />
    </>
  );
};

export default HomePage;
