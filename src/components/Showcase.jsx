import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaClock,
  FaThumbsUp,
  FaUserTie,
  FaStar,
  FaUsers
} from "react-icons/fa";

const verifiedBadges = [
  { label: "Safe Drive Certified", icon: FaShieldAlt },
  { label: "100% On-Time Guarantee", icon: FaClock },
  { label: "Top Rated Service", icon: FaThumbsUp },
  { label: "Verified Drivers", icon: FaUserTie }
];

const specialServices = [
  { title: "GPS Tracking", desc: "Live ride monitoring for safety." },
  { title: "Road Side Assistance", desc: "Help anytime during travel." },
  { title: "On-Time Pickup", desc: "We value your time." },
  { title: "Certified Drivers", desc: "Trained & verified chauffeurs." }
];

const TouristShowcase = () => {
  const [count, setCount] = useState(0);

  // 🔢 Animated Counter
  useEffect(() => {
    let start = 0;
    const end = 1000;
    const interval = setInterval(() => {
      start += 5;
      setCount(start);
      if (start >= end) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-zinc-200">
      <div className="max-w-6xl mx-auto px-6 py-12 font-sans space-y-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-4">
            Explore Top Tourist Places in India
          </h1>
          <p className="mb-6 max-w-2xl mx-auto">
            Discover India’s most popular destinations with safe, on-time, and trusted travel service.
          </p>

         

          <Link
            to="/cars"
            className="inline-block px-8 py-3 bg-purple-900 text-white font-semibold rounded-lg hover:bg-purple-800 transition"
          >
            Search Cars Now
          </Link>
        </div>

        {/* Verified Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verified & Trusted Service
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verifiedBadges.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition"
                >
                  <Icon className="text-purple-900 text-3xl" />
                  <span className="font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Our Special Services Support
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {specialServices.map((service, i) => (
              <div key={i} className="bg-white shadow-md p-5 rounded-lg hover:shadow-xl transition">
                <h3 className="text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
          
        </section>

        {/* Reviews */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Customer Google Reviews</h2>
          <div className="inline-flex items-center gap-2 bg-blue-200 px-6 py-3 rounded-full shadow-md">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-600" />
            ))}
            <span className="font-bold ml-2">4.9 / 5</span>
          </div>
           {/* ⭐ Happy Customers */}
          <div className="flex justify-center my-6">
            <div className="bg-yellow-100 text-primary-900 px-6 py-3 rounded-full shadow-lg font-bold text-lg flex items-center gap-2 animate-pulsse">
              <FaUsers />
              {count}+ Happy Customers
            </div>
          </div>
        </section>

       {/* Office Location */}
<section className="bg-white rounded-2xl p-6 shadow-md text-center max-w-4xl mx-auto">
  <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 text-gray-900 tracking-wide">
    Our Office Location
  </h2>

  <div className="w-16 h-1 bg-red-700 mx-auto mb-4 rounded-full"></div>

  <p className="text-gray-700 font-medium leading-relaxed">
    Dhande Nivas,<br />
    New Narsala Road, Beldar Nagar,<br />
    Dighori – Nagpur <span className="font-semibold">440034</span>
  </p>

  <p className="mt-4 text-sm text-gray-500">
    Visit our office for bookings, inquiries, and travel assistance.
  </p>
</section>


      </div>
    </section>
  );
};

export default TouristShowcase;
