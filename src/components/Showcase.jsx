import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaClock, FaThumbsUp, FaUserTie, FaStar } from "react-icons/fa";

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
  return (
    <section className="bg-zinc-200">

    <div className="max-w-6xl mx-auto px-6 py-12  font-sans space-y-12">

      {/* Header & CTA */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-4xl font-extrabold text-text-heading mb-4">
          Explore Top Tourist Places in India
        </h1>
        <p className="text-text-sub mb-6 max-w-2xl mx-auto">
          Discover India’s most popular destinations with safe, on-time, and trusted travel service.
        </p>
        <Link
          to="/cars"
          className="inline-block px-8 py-3 bg-purple-900 text-white font-semibold rounded-lg hover:bg-purple-800 transition"
        >
           Search Cars Now
        </Link>
      </div>

      {/* Verified & Trusted Badges */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Verified & Trusted Service</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {verifiedBadges.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition"
              >
                <Icon className="text-purple-900 text-3xl" />
                <span className="font-semibold text-gray-800">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Special Services */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Our Special Services Support</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {specialServices.map((service, i) => (
            <div key={i} className="bg-white shadow-md p-5 rounded-lg hover:shadow-xl transition">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Google Review Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Customer Google Reviews</h2>
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="bg-yellow-100 px-6 py-3 rounded-full shadow-md flex items-center gap-2 max-w-xs mx-auto">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-600" />
            ))}
            <span className="font-bold text-gray-800 ml-2">4.9 / 5</span>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-white rounded-2xl p-4">
        <h2 className="text-3xl font-extrabold mb-4 text-red-800 text-center">Office Location: </h2>
        <ul className="text-2xl  max-w-3xl mx-auto space-y-3 text-green-600 font-bold text-center">
          <li>Dhande Nivas, New Narsala Road, Beldar Nagar, Dighori - Nagpur 440034</li>
        </ul>
      </section>

    </div>
    </section>
  );
};

export default TouristShowcase;
