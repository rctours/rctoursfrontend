import React from "react";
import { FaUsers, FaGasPump, FaPhone, FaCogs } from "react-icons/fa";

const PopularCars = () => {
  const cars = [
    {
      name: "Innova Crysta",
      price: "₹2500/day",
      image: "/Cars/crysta.webp",
      seats: "7 Seater",
      fuel: "Diesel",
      transmission: "Manual",
    },
    {
      name: "Toyota Rumion",
      price: "₹2200/day",
      image: "/Cars/rumion.webp",
      seats: "7 Seater",
      fuel: "Petrol",
      transmission: "Manual",
    },
    {
      name: "Ertiga",
      price: "₹1800/day",
      image: "/Cars/ertiga.webp",
      seats: "7 Seater",
      fuel: "Petrol",
      transmission: "Manual",
    },
    {
      name: "Swift Dezire",
      price: "₹1400/day",
      image: "/Cars/dzire.webp",
      seats: "5 Seater",
      fuel: "Diesel",
      transmission: "Manual",
    },
  ];

  return (
    <section id="cars" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ---- Top Heading ---- */}
        <h2 className="text-text-sub font-semibold text-center text-lg mb-2">
          Our Top Picks for Your Journey
        </h2>

        <h3 className="text-4xl font-extrabold text-center mb-4 text-text-heading">
          Popular Cars
        </h3>

        <p className="text-center text-text-sub max-w-2xl mx-auto mb-14">
          Choose from our most booked and loved cars — perfect for family trips, business rides,
          and weekend getaways. Reliable, comfortable, and budget-friendly.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="h-65 w-full p-1 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 bg-zinc-200 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {car.name}
                </h4>

                <a href="tel:+919172271464">
                  <p className="text-indigo-600 text-lg font-semibold mb-4 flex items-center gap-2 cursor-pointer">
                    <span><FaPhone /></span>
                    <span>Request Price Details</span>
                  </p>
                </a>



                {/* Features */}
                <div className="flex justify-between text-gray-700 text-sm font-semibold">
                  <div className="flex items-center gap-1">
                    <FaUsers /> {car.seats}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaGasPump /> {car.fuel}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCogs /> {car.transmission}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCars;
