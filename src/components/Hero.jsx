import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Car } from "lucide-react";


const Hero = () => {
  return (
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
          Premium <span className="text-purple-700">Car Rentals</span> in Nagpur
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
          Explore Nagpur in style with our reliable and affordable car rental services.
          From short trips to weekend getaways — we’ve got your ride covered.
        </p>

        {/* ✅ Key Highlights */}
<ul className="flex flex-col sm:flex-row justify-between px-10 gap-4 mb-10 text-sm sm:text-base text-gray-100 bg-accent-500/10 backdrop-blur-md  rounded-xl p-2 shadow-inner">
          <li className="flex   gap-2">
            <span className="text-purple-400 font-bold">✓</span>Professional Drivers
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">✓</span> Pickup across Nagpur
          </li>
          <li className="flex items-center gap-2">
            <span className="text-purple-400 font-bold">✓</span> 24/7 roadside assistance
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
        <MessageCircle className="w-5 h-5" />
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
      <div className="absolute bottom-8 animate-bounce text-white">
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
  );
};

export default Hero;
