import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const CarCard = ({ car }) => {
  const imageUrl = car.images?.length > 0 ? car.images[0] : null;

  // 📲 WhatsApp message with car details
  const whatsappMessage = encodeURIComponent(
    `Hi, I want to book this car in Nagpur.

Car Name: ${car.carName}
Brand: ${car.brand}
Type: ${car.carType}
Model Year: ${car.modelYear}
Seating Capacity: ${car.seatingCapacity}
Transmission: ${car.transmission}

Pickup:
Drop:
Date & Time:`
  );

  return (
    <Link
      to={`/cars/${car.documentId}`}
      className="block bg-purple-100 rounded-xl shadow-md hover:shadow-lg transition p-1"
    >
      <div className="flex flex-col justify-between h-full">

        {/* 🚗 Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={car.carName}
            className="sm:h-30 md:h-45 lg:h-48 w-full object-cover rounded-md mb-4"
          />
        ) : (
          <div className="h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        {/* ℹ️ Car Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2 capitalize text-gray-800">
            {car.carName}
          </h3>
          <p className="text-gray-600 mb-1">Brand: {car.brand}</p>
          <p className="text-gray-600 mb-1">
            {car.carType} • {car.modelYear}
          </p>
          <p className="text-gray-600 mb-1">
            {car.seatingCapacity} seats • {car.transmission}
          </p>
        </div>

        {/* 🔘 Action Buttons */}
        <div className="mt-5 flex gap-2">

          {/* 📞 Call Button */}
          <a
            href="tel:+919172271464"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-400 text-black font-medium py-2 rounded-lg transition"
          >
            <Phone size={20} />
            
          </a>

          {/* 🟢 WhatsApp Button */}
          <a
            href={`https://wa.me/919172271464?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-500 text-white font-medium py-2 rounded-lg transition"
          >
            <FaWhatsapp size={20} />
            
          </a>

          {/* 🔍 View Details */}
          <div className="flex-1 bg-primary-700 hover:bg-primary-500 text-white font-semibold py-2 rounded-lg text-center transition">
            Car Details
          </div>
        </div>

      </div>
    </Link>
  );
};

export default CarCard;
