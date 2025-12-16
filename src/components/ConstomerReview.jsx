import React, { useState } from "react";
import { Star, Car} from "lucide-react";

const reviews = [
  {
    name: "Yash Lipte",
    location: "Nagpur, India",
    avatar: "Y",
    rating: 5,
    comment:
      "RC car rental service made my trip so easy. Pickup was fast, the staff was friendly, and the car was immaculate. No hidden fees and a smooth return process. Highly recommended!",
  },
  {
    name: "Bhavesh Rathod",
    location: "Nagpur, India",
    avatar: "B",
    rating: 5,
    comment:
      "I travel a lot in cabs, and this was one of my best experiences in Nagpur. Clean car, polite driver, and very well-maintained vehicle.",
  },
  {
    name: "PRASHANT DUBEY",
    location: "Nagpur, India",
    avatar: "P",
    rating: 4,
    comment:
      "Overall ride was good, the driver was polite and the car was clean. Good service.",
  },
  {
    name: "Sathi Wagh",
    location: "Nagpur, India",
    avatar: "S",
    rating: 5,
    comment:
      "Excellent service! Driver was polite and drove safely. Overall a very comfortable experience.",
  },
  {
    name: "Rani Jadhav",
    location: "Nagpur, India",
    avatar: "R",
    rating: 5,
    comment:
      "Unforgettable experience for me and my family. The team was professional, friendly, and very responsible. Great value for money!",
  },
  {
    name: "Deev Shah",
    location: "Nagpur, India",
    avatar: "D",
    rating: 4,
    comment: "Good service. Happy with the overall experience.",
  },
  {
    name: "Ashutosh Rathod",
    location: "Nagpur, India",
    avatar: "A",
    rating: 4,
    comment:
      "Good experience traveling with RC Rental. Smooth and hassle-free trip.",
  },
];


const CustomerReviews = () => {
  // ➤ FIX: Hooks must be inside component
  const [showAll, setShowAll] = useState(false);

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={
              i < rating
                ? "text-amber-500 fill-amber-500"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-lime-200">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-sub mb-2">
          Trusted by Travelers
        </h2>
        <h2 className="text-4xl font-extrabold mb-4 text-text-heading">
          What Our Customers Say
        </h2>

        <p className="text-text-sub text-lg max-w-3xl mx-auto">
          Discover how travelers like you enjoyed unforgettable experiences with RC Tours & Travels.
        </p>

        {/* Rating */}
        <div className="mt-6 flex justify-center items-center space-x-2">
          <span className="text-4xl font-bold text-text-heading">
            {averageRating}
          </span>

          <div className="flex flex-col items-start">
            {renderStars(Math.round(averageRating))}
            <span className="text-sm text-gray-500">
              Based on {reviews.length} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 rounded-2xl gap-8 max-w-7xl mx-auto px-6">
        {visibleReviews.map((review, index) => (
          <div
            key={index}
            className="bg-primary-50 rounded-xl border border-gray-200 p-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center mb-4">

              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <Car size={26} className="text-primary-700" />
              </div>

              <div className="ml-4 text-left">
                <h3 className="text-lg font-bold text-gray-900">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>

            {/* Comment */}
            <p className="text-gray-700 mb-6 italic leading-relaxed flex-grow">
              “{review.comment}”
            </p>

            {/* Rating */}
            {renderStars(review.rating)}
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-8 py-3 bg-primary-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-primary-800 transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto mt-20 p-10 bg-primary-700 shadow-2xl rounded-2xl border border-dark-purple/20">
        <div className="text-center">
          <h3 className="text-3xl font-extrabold text-text-primary mb-3">
            Inspire the Next Adventure
          </h3>

          <p className="text-gray-50 mb-8 max-w-xl mx-auto">
            Share your journey and help future travelers choose confidently.
          </p>

          <a
            href="https://www.google.com/search?q=Rccarrentalservicesnagpur+Reviews#lrd=0x3bd4b92e0020f893:0xfc2371be796f54bd,3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-10 py-4 bg-primary-50 text-text-heading font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-dark-purple/90 transition transform hover:scale-[1.02]">
              Share Your Experience on Google
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
