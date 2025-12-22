import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Car } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from "react-helmet";


const Hero = () => {
  return (
<>
      <Helmet>
        <title>Reliable Taxi Service in Nagpur | RC Tours and Travels</title>
        <meta
          name="description"
          content="Book professional taxi with driver in Nagpur. Local, outstation & airport taxi service. Clean cars, experienced drivers & instant booking. Call 9172271464."
        />
        <meta
          name="keywords"
          content="Nagpur taxi, airport taxi Nagpur, outstation taxi, car with driver Nagpur, RC Tours and Travels"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Reliable Taxi Service in Nagpur" />
        <meta property="og:description" content="Book professional taxi with driver in Nagpur. Local, outstation & airport taxi service." />
        <meta property="og:image" content="/HeroImage.jpg" />
        <meta property="og:url" content="https://rctoursandtravels.in" />
        <meta property="og:type" content="website" />
      </Helmet>


    <section
      id="home"
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: "url('/HeroImage.jpg')", // 🔹 Replace with your Nagpur road/city image
      }}
    >
      {/* 🌓 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div>

      {/* 🚘 Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 pt-25 max-w-5xl text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          Reliable <span className="text-purple-700">Taxi Service</span> in Nagpur <br />
          <span className="text-amber-400 text-2xl sm:text-3xl md:text-4xl">
            Call for Instant Booking
          </span>
        </h1>


        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Local, Outstation & Airport Taxi from Nagpur <br />
          <span className="text-gray-300">
            Clean Cars • Experienced Drivers • Best Price Guaranteed
          </span>
        </p>

        <p className="sr-only">
          Taxi service in Nagpur, cab booking Nagpur, airport taxi Nagpur, outstation taxi Nagpur
        </p>


        {/* ✅ Key Highlights */}
        <ul className="flex flex-col sm:flex-row justify-between px-8 gap-4 mb-5 text-xl font-semibold sm:text-base text-purple-200 bg-accent-500/10 backdrop-blur-md  rounded-xl p-2 shadow-inner">
          <li className="flex   gap-2">
            <span className="text-purple-400 font-bold">✓</span>Local Nagpur
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">✓</span> Outstation
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">✓</span> Corporate taxi
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">✓</span> Wedding
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center mt-6">
          {/* 🟢 WhatsApp Button */}
          <a
            href="https://wa.me/919172271464?text=Hi!%20I%20want%20to%20book%20a%20car%20in%20Nagpur."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold bg-green-600 hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span>Book on WhatsApp</span>
          </a>

          {/* 📞 Call Button */}
          <a
            href="tel:+919172271464"
            className="flex items-center gap-2 px-8 py-3 rounded-full border bg-amber-500 border-yellow-400 text-yellow-950 font-bold hover:bg-yellow-400 hover:text-black transition-transform transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span>Call For Booking</span>
          </a>

          {/* 🚗 View Cars */}
          <Link
            to="/cars"
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-blue-400 bg-teal-500 text-blue-950 font-bold hover:bg-blue-400 hover:text-black transition-transform transform hover:scale-105 shadow-lg"
          >
            <Car className="w-5 h-5" />
            <span>View Cars</span>
          </Link>
        </div>
      </div>

      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-0 animate-bounce text-white">
        <svg
          className="mx-auto w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
        <p className="text-xs mt-2 tracking-wide">Scroll to explore</p>
      </div>
    </section>
</>
  );
};

export default Hero;
