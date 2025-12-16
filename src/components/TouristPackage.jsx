import React, { useState } from "react";
import TouristPackages from "../data/TouristPackages.json";

const colors = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-green-500 via-teal-500 to-blue-500",
  "from-purple-500 via-indigo-500 to-blue-500",
  "from-yellow-500 via-orange-500 to-red-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
  "from-pink-500 via-purple-500 to-indigo-500",
];

const TouristPackage = () => {
  const [showAll, setShowAll] = useState(false);

  // On mobile, show only 2 initially
  const isMobile = window.innerWidth < 1024; // Tailwind lg breakpoint
  const packagesToShow = isMobile && !showAll ? TouristPackages.slice(0, 2) : TouristPackages;

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 font-sans">
      <h1 className="text-4xl sm:text-4xl font-extrabold text-center p-8 text-text-heading">
        India Tourist & Pilgrimage Packages
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {packagesToShow.map((regionData, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${colors[index % colors.length]} shadow-lg rounded-xl p-6 text-white hover:shadow-2xl transition-shadow duration-500`}
            aria-label={`${regionData.region} tourist package`}
          >
            <h2 className="text-2xl font-bold mb-3 tracking-wide drop-shadow-lg">
              {regionData.region}
            </h2>

            <p className="font-semibold mb-5 drop-shadow-md">{regionData.type}</p>

            <ul className="space-y-3">
              {regionData.places.map((place, i) => (
                <li
                  key={i}
                  className="border border-white/50 rounded-md px-4 py-2 bg-accent-100 text-black hover:bg-white/10 transition-colors cursor-pointer drop-shadow-md"
                >
                  {place}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button for Mobile */}
      {isMobile && TouristPackages.length > 2 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-colors duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Bottom Contact Section */}
      <section className="text-center pt-10 mt-5 max-w-2xl mx-auto">
        <a
          href="tel:+919172271464"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-colors duration-300"
        >
          Contact for More information
        </a>
      </section>
    </div>
  );
};

export default TouristPackage;
