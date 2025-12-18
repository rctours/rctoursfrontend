import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { Link } from "react-router-dom";


// --- Utility Component: CarImageGallery ---
/**
 * Displays all images for the car in a gallery format.
 * Allows clicking thumbnails to change the main image.
 * @param {array} images - The array of image objects.
 * @param {string} carName - The name of the car.
 */
const CarImageGallery = ({ images, carName }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
        No Image Available
      </div>
    );
  }

  const STRAPI_URL = "";


  const getImageUrl = (image) =>
  image.formats?.medium?.url
    ? `${STRAPI_URL}${image.formats.medium.url}`
    : `${STRAPI_URL}${image.url}`;

const getThumbnailUrl = (image) =>
  image.formats?.thumbnail?.url
    ? `${STRAPI_URL}${image.formats.thumbnail.url}`
    : `${STRAPI_URL}${STRAPI_URL}${image.url}`;

  const mainImage = images[mainImageIndex];

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  return (
    <div className="mb-4">
      {/* Main Image */}
      <div className="flex-shrink-0 mb-2 h-48">
        <img
          src={getImageUrl(mainImage)}
          alt={`${carName} - Main View ${mainImageIndex + 1}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto p-1">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-16 h-16 border-2 rounded-md overflow-hidden cursor-pointer transition duration-150 ${index === mainImageIndex
                  ? 'border-primary-700 ring-2 ring-indigo-300'
                  : 'border-gray-300 hover:border-indigo-400'
                }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={getThumbnailUrl(image)}
                alt={`${carName} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: CarCard ---
/**
 * Displays an individual car's core details and images.
 * @param {object} car - The individual car data object.
 */
const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden transition duration-300 hover:shadow-2xl border border-gray-100">
      <div className="p-1 flex flex-col h-full">
        {/* Image Gallery */}
        <CarImageGallery images={car.images} carName={`${car.brand} ${car.carName}`} />

        {/* Car Name and Brand */}
        <h3 className="text-xl font-bold text-gray-900 mb-1 capitalize">
          {car.brand} {car.carName}
        </h3>
        <p className="text-gray-600 mb-2">
          {car.carType} - Model Year: {car.modelYear}
        </p>

        {/* Essential Car Details */}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-y-2 gap-x-1 text-sm mb-2 border-t pt-2">

  <div className="flex gap-x-2">
    <span className="font-bold text-gray-700">Fuel Type:</span>
    <span className="text-gray-900 font-semibold">{car.fuelType}</span>
  </div>

  <div className="flex gap-x-2">
    <span className="font-bold text-gray-700">Seating:</span>
    <span className="text-gray-900 font-semibold">{car.seatingCapacity}</span>
  </div>

  <div className="flex gap-x-2">
    <span className="font-bold text-gray-700">Color:</span>
    <span className="text-gray-900 font-semibold">{car.color}</span>
  </div>

  <div className="flex gap-x-2">
    <span className="font-bold text-gray-700">Transmission:</span>
    <span className="text-gray-900">{car.transmission}</span>
  </div>

</div>


        <div className="mt-auto pt-4 border-t border-gray-200">
          <Link to={`/cars/${car.documentId}`}>
            <button className="w-full bg-primary-700 text-white py-2 rounded-lg font-semibold hover:bg-primary-500 transition duration-150">
              View Car Details
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

// --- Main Component: CarRental ---
/**
 * Fetches car data from the API and renders the list of car cards with expand and navigation feature.
 */
const CarRental = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  const API_URL = '/api/cars?populate=*';

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(API_URL);
        setCars(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching car data:", err);
        setError('Failed to fetch car data. Please check the API.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div className="text-center p-8 text-xl font-medium"><Loader /></div>;
  }

  if (error) {
    return <div className="text-center p-8 text-xl text-red-600 font-medium">Error: {error}</div>;
  }

  if (cars.length === 0) {
    return <div className="text-center p-8 text-xl font-medium">No cars available for rent at the moment.</div>;
  }

  return (
    <div className="p-2 bg-gray-50 pt-20 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-text-heading mb-10">
        Explore the world with our cars
      </h2>
      <p className="text-center text-text-sub max-w-xl mx-auto mb-12">
        Choose from our wide range of affordable, reliable, and luxurious cars for every journey.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-w-6xl mx-auto">
        {cars.slice(0, visibleCount).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
      <div className="flex justify-center my-8 space-x-3">
        {visibleCount === 4 && cars.length > 4 && (
          <button
            onClick={() => setVisibleCount(10)}
            className="bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition duration-150"
          >
            Show More Cars
          </button>
        )}
        {visibleCount === 10 && cars.length > 10 && (
          <button
            onClick={() => navigate('/cars')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-150"
          >
            More Cars
          </button>
        )}
      </div>
    </div>
  );
};

export default CarRental;
