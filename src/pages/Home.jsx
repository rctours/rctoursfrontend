import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CustomerReviews from '../components/ConstomerReview';
import CarRental from '../components/CarRental';
import FAQSection from '../components/FreAskedQ';
import ScrollCarousel from '../components/City';
import HowItWorks from '../components/HowItWorks';
import { Helmet } from "react-helmet";
import CircularGallery from '../components/CircularGallary';
import Gallary from '../components/Gallary';
import VideoGallery from '../components/VideoGallary';
import DailyServiceRoutes from '../components/DailyServiceRoutes';
import PopularCars from '../components/PopularCars';
import TouristPackage from '../components/TouristPackage';
import TouristShowcase from '../components/Showcase';
import GlobalImpact from '../components/GloableImpact';

function Home() {
  return (
    <>

      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>RCTours | Explore the World with Us</title>
        <meta
          name="description"
          content="Book car rentals, read travel blogs, and explore hidden destinations with RCTours."
        />
        <meta
          name="keywords"
          content="car rental, tours, travel, blogs, RCTours, destinations, vacation, India"
        />
        <meta property="og:title" content="RCTours | Explore the World with Us" />
        <meta
          property="og:description"
          content="Book car rentals and explore the best destinations with RCTours."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RCTours" />
      </Helmet>

      {/* ✅ Page Sections */}
      <Hero />
      <TouristShowcase />
      <CarRental />
      <Gallary />
      <DailyServiceRoutes />
      <TouristPackage />
      <VideoGallery />
      <HowItWorks />
      <GlobalImpact />
      <ScrollCarousel />
      <Features />
      <PopularCars />
      <CustomerReviews />
      <FAQSection />
    </>
  );
}

export default Home;
