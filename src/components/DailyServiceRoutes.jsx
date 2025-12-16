import React, { useState } from "react";
import { Helmet } from "react-helmet";
import RoutesData from "../data/RoutesData.json";

const backgroundGradients = [
  "from-pink-500 via-red-500 to-yellow-500",
  "from-green-500 via-teal-500 to-blue-500",
  "from-purple-500 via-indigo-500 to-blue-500",
  "from-yellow-500 via-orange-500 to-red-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
  "from-pink-500 via-purple-500 to-indigo-500",
];

const DailyServiceRoutes = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const groupedRoutes = RoutesData.reduce((acc, route) => {
    acc[route.category] = acc[route.category] || [];
    acc[route.category].push(route);
    return acc;
  }, {});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      <Helmet>
        <title>Car Rental Service in Nagpur</title>
        <meta name="description" content="Daily car services from Nagpur" />
      </Helmet>

      {/* Top Intro Section */}
      <section className=" mt-5 text-center bg-primary-700 text-white rounded-lg p-8 mb-10 shadow-lg">
        <h1 className="text-4xl font-extrabold mb-3">Car & Cab Services from Nagpur</h1>
        <p className="text-sm mb-6 max-w-xl mx-auto">
          Safe, comfortable and affordable rides to major cities, temples, tourist spots, and airports.
        </p>
        <button className="px-6 py-3 bg-primary-50 text-purple-950 font-bold rounded hover:bg-primary-100 shadow-md transition-colors duration-500">
          Contact us for more information
        </button>
      </section>

      {/* Categories Section */}
      <section className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 mb-10">
        {Object.entries(groupedRoutes).map(([category, routeList], idx) => {
          const isExpanded = expandedCategories[category];
          const displayList = isExpanded ? routeList : routeList.slice(0, 4);

          return (
            <div
              key={category}
              className={`bg-gradient-to-r ${backgroundGradients[idx % backgroundGradients.length]} shadow-lg rounded-xl p-6 text-white hover:shadow-2xl transition-shadow duration-500`}
              aria-label={`${category} routes`}
            >
              <h2 className="text-2xl font-bold mb-6 tracking-wide drop-shadow-lg border-b-2 border-white pb-2">
                {category}
              </h2>

              <div className="flex flex-col space-y-3">
                {displayList.map((route) => (
                  <div
                    key={route.name}
                    className="flex items-center bg-accent-100 text-black justify-between border border-white/50 rounded-md px-4 py-3 hover:bg-white/20 transition-colors cursor-pointer drop-shadow-md font-semibold"
                  >
                    <span className="text-sm  sm:text-base">Nagpur to {route.name}</span>
                    <span className="text-yellow-300 font-extrabold text-xl">→</span>
                  </div>
                ))}
              </div>

              {/* Show More Button */}
              {routeList.length > 4 && (
                <button
                  onClick={() => toggleCategory(category)}
                  className="mt-4 w-full text-rose-600 bg-white rounded-2xl font-semibold hover:underline"
                >
                  {isExpanded ? "Show Less" : `Show More (${routeList.length - 4} more)`}
                </button>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DailyServiceRoutes;
