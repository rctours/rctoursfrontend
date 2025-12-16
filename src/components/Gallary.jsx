import React, { useState, useEffect } from "react";
import CircularGallery from "./CircularGallary";

function Gallery() {
  const [bend, setBend] = useState(3); // Default: Desktop

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setBend(1); // Mobile
      } else if (window.innerWidth <= 1024) {
        setBend(2); // Tablet
      } else {
        setBend(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white pt-10 px-4 sm:px-8 lg:px-16">
      
      {/* ⭐ Section Header */}
      <div className="text-center rounded-2xl bg-accent-100 p-8 mb-10 animate-fadeIn">
        <span className="text-text-sub font-semibold tracking-wide uppercase text-sm">
          Explore Our Fleet
        </span>

        <h1 className="text-4xl sm:text-4xl font-extrabold text-text-heading mt-2 drop-shadow">
          Our Car Gallery
        </h1>

        <p className="text-base sm:text-lg text-text-sub max-w-3xl mx-auto mt-4 leading-relaxed">
          Step into our world of stylish, comfortable, and well-maintained cars.
          Browse through our elegant circular gallery to discover the perfect ride
          for your next journey.
        </p>
      </div>

      {/* 🌀 Circular Gallery Container */}
      <div className="relative flex justify-center items-center
                      h-[60vh] sm:h-[65vh] md:h-[80vh] lg:h-[85vh]
                      min-h-[450px] max-h-[950px]
                      px-2 animate-fadeInSlow">

        <CircularGallery
          bend={bend}
          textColor="#2b0032"
          borderRadius={0.03}
          scrollEase={0.06}
        />
      </div>
    </section>
  );
}

export default Gallery;
