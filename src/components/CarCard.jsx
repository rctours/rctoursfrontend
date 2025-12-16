import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  const imageUrl = car.images?.length > 0 ? car.images[0] : null;

  return (
    <Link
      to={`/cars/${car.documentId}`}
      className="block bg-purple-100 rounded-xl shadow-md hover:shadow-lg transition p-1"
    >
      <div className="flex flex-col justify-between">

        {/* Image */}
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

        {/* Car Info */}
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

        {/* Button (optional – looks like a button but not needed for click) */}
        <div className="mt-5 w-full bg-primary-700 hover:bg-primary-500 text-white font-medium py-2 rounded-lg text-center transition">
          View Car Details
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
