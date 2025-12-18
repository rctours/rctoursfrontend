import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { HiCheck } from "react-icons/hi";
import { FiCheck } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";



// --- Utility Component: CarImageGallery (Embedded for multiple images) ---
const CarImageGallery = ({ images, carName }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-72 bg-primary-200 flex items-center justify-center rounded-xl-lg shadow aspect-[4/3] object-center text-gray-500">
        No Image Available
      </div>
    );
  }

  const STRAPI_URL = "";


  // Get the main image URL (use full URL directly, no BASE_URL prepend)
  const mainImageUrl = images[mainImageIndex]?.url
  ? `${STRAPI_URL}${images[mainImageIndex].url}`
  : null;

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  return (
    <div>
      {/* Main Image */}
      <div className="mb-4">
        {mainImageUrl ? (
          <img
            src={mainImageUrl}
            alt={`${carName} - View ${mainImageIndex + 1}`}
            className="rounded-xl-lg w-full h-auto object-cover shadow aspect-[4/3] object-center"
            onError={(e) => {
              e.target.src = '/path/to/placeholder-image.jpg'; // Replace with your placeholder
            }}
          />
        ) : (
          <div className="w-full h-72 bg-primary-200 flex items-center justify-center rounded-xl-lg text-gray-500">
            Image Failed to Load
          </div>
        )}
      </div>

      {/* Thumbnails (only if more than 1 image) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => {
            const thumbnailUrl = image.formats?.thumbnail?.url
  ? `${STRAPI_URL}${image.formats.thumbnail.url}`
  : `${STRAPI_URL}${image.url}`;
 // Use thumbnail if available, else full image
            return (
              <div
                key={image.id}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-xl-lg cursor-pointer transition-all aspect-square ${index === mainImageIndex ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={thumbnailUrl}
                  alt={`${carName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl-lg"
                  onError={(e) => {
                    e.target.src = '/path/to/placeholder-thumbnail.jpg'; // Replace with your placeholder
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
// -------------------------------------------------------------------------

const CarDetails = () => {
  const { documentId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `/api/cars/${documentId}?populate=*`;

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(API_URL);
        setCar(response.data.data);
      } catch (err) {
        console.error("Error fetching car details:", err);
        setError("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [documentId]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">{error}</div>
    );

  if (!car) return null;



  // Access images array directly (no attributes nesting)
  const images = car.images || [];

  return (
    <div className="py-10 bg-zinc-100 min-h-screen">
      <div className="mx-auto px-6 max-w-8xl bg-zinc-50 rounded-xl-lg shadow-lg p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Image Section (Now with Gallery) */}
        <div className="col-span-1">
          <Link
            to="/cars"
            className="inline-block mb-4 bg-primary-200 rounded-xl-2xl px-2 font-semibold text-blue-600 hover:underline mt-10 text-sm"
          >
            ← Back to Cars
          </Link>

          {/* Image Gallery */}
          <CarImageGallery images={images} carName={car.carName} />
        </div>

        {/* Main Details */}
        <div className="col-span-2 flex mt-15 flex-col">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 capitalize">
            {car.carName}
          </h2>

          <div className="space-y-2 bg-primary-50 p-4 rounded-xl text-gray-700">
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Type:</strong> {car.carType}</p>
            <p><strong>Model Year:</strong> {car.modelYear}</p>
            <p><strong>Mileage:</strong> {car.mileage} km/l</p>
            <p><strong>Fuel:</strong> {car.fuelType}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Registration Number:</strong> {car.registrationNumber}</p>
          </div>

          {/* Rental Details */}
          {car.rentalDetails && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Rental Details</h3>
              <p>Price per day: ₹{car.rentalDetails.pricePerDay}</p>
              <p>Price per hour: ₹{car.rentalDetails.pricePerHour}</p>
              <p>Minimum Booking Hours: {car.rentalDetails.minimumBookingHours}</p>
              <p>Available: {car.rentalDetails.available ? "Yes" : "No"}</p>
            </section>
          )}

          {/* Features */}
          {car.features && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl-xl">
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                {Object.entries(car.features).map(
                  ([feature, val]) =>
                    val === true || typeof val === "number" ? (
                      <li key={feature} className="capitalize flex items-center gap-2">
                        <FiCheck className="text-green-600 text-lg" />
                        {feature.replace(/([A-Z])/g, " $1")}
                      </li>
                    ) : null
                )}
              </ul>
            </section>
          )}

          {/* Documents */}
          {car.documents && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl-xl">
              <h3 className="text-xl font-semibold mb-2">Documents</h3>
              <ul className="grid grid-cols-2 gap-2 text-gray-700">
                {Object.entries(car.documents).map(
                  ([doc, val]) =>
                    val ? (
                      <li
                        key={doc}
                        className="capitalize flex items-center gap-2"
                      >
                        <HiCheck className="text-green-600 text-lg" />
                        {doc.replace(/([A-Z])/g, " $1")}
                      </li>

                    ) : null
                )}
              </ul>
            </section>
          )}

          {/* Rental Policy */}
          {car.rentalPolicy && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Rental Policy</h3>
              <p>Security Deposit: ₹{car.rentalPolicy.securityDeposit}</p>
              <p>Late Return Charges per Hour: ₹{car.rentalPolicy.lateReturnChargesPerHour}</p>
              <p>Driver Age Limit: {car.rentalPolicy.driverAgeLimit} years</p>
              <p>License Requirement: {car.rentalPolicy.licenseRequirement}</p>
              <p>Fuel Policy: {car.rentalPolicy.fuelPolicy}</p>
            </section>
          )}

          {/* Availability */}
          {car.availability && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Availability</h3>
              <p>Available From: {new Date(car.availability.availableFrom).toLocaleDateString()}</p>
              <p>Status: {car.availability.isAvailable ? "Available" : "Not Available"}</p>
            </section>
          )}

          {/* Reviews */}
          {car.reviews && car.reviews.length > 0 && (
            <section className="mt-8 bg-primary-50 p-4 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-4 max-h-60 overflow-auto">
                {car.reviews.map(({ id, name, rating, comment }) => (
                  <div key={id} className="border-b pb-2">
                    <p className="font-semibold">{name}</p>
                    <p>Rating: {"⭐".repeat(rating)}</p>
                    <p className="italic">{comment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
