import React from 'react';
import { Link } from "react-router-dom";
import { FaSearch, FaCar, FaClipboardCheck, FaSmile } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react'; // Using lucide-react for the arrow visual

const steps = [
    {
        icon: <FaSearch className="text-4xl text-dark-purple" />, // Use accent color
        title: 'Search Your Dream Car',
        desc: 'Browse our wide selection of vehicles and use smart filters to find the one perfect for your journey.',
        stepNumber: 1,
    },
    {
        icon: <FaClipboardCheck className="text-4xl text-dark-purple" />, // Use accent color
        title: 'Book Instantly Online',
        desc: 'Select your dates and locations, then confirm your booking securely and instantly through our platform.',
        stepNumber: 2,
    },
    {
        icon: <FaCar className="text-4xl text-dark-purple" />, // Use accent color
        title: 'Pick Up & Drive Free',
        desc: 'Collect your sanitized car at the nearest location and start your trip with complete flexibility and freedom.',
        stepNumber: 3,
    },
    {
        icon: <FaSmile className="text-4xl text-dark-purple" />, // Use accent color
        title: 'Easy Return Process',
        desc: 'Return the car at your specified destination or original location at your convenience.',
        stepNumber: 4,
    },
];

const HowItWorks = () => (
    <section id="how-it-works" className="py-24 bg-fuchsia-100"> {/* Changed background to white for contrast, increased padding */}
        <div className="container mx-auto px-6 max-w-7xl text-center">
            {/* Header Section */}
            <h4 className="text-text-sub text-base tracking-widest uppercase font-semibold mb-3">
                Easy & Transparent Process
            </h4>
            <h2 className="text-4xl font-extrabold mb-16 text-text-heading">
                Rent a Car in 4 Simple Steps
            </h2>

            {/* Steps Grid with Visual Flow Indicators */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Flow Line (Visible on larger screens) */}
                <div className="hidden lg:block absolute inset-0 my-auto h-0.5 bg-gray-200"></div>

                {steps.map(({ icon, title, desc, stepNumber }) => (
                    <div
                        key={title}
                        className="relative z-10 p-5 pt-10 rounded-xl bg-blue-200 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        {/* Step Number Circle */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-primary-700 shadow-lg ring-4 ring-primary-500">
                            <span className="text-xl font-bold text-text-light">{stepNumber}</span>
                        </div>

                        {/* Icon */}
                        <div className="mb-4 pt-4 flex justify-center">{icon}</div>

                        {/* Content */}
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
                        <p className="text-gray-600 px-2">{desc}</p>

                        {/* Arrow Indicator (Hidden on last step and large screens) */}
                        {stepNumber < steps.length && (
                            <div className="lg:hidden absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                                <ArrowRight className="w-6 h-6 text-gray-300" />
                            </div>
                        )}

                        {/* Arrow Indicator (Visible between cards on large screens) */}
                        {stepNumber < steps.length && (
                            <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-0">
                                <ArrowRight className="w-10 h-10 text-dark-purple/50" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Final CTA/Next Step */}
           <div className="mt-16">
    <Link
        to="/cars" // Use 'to' instead of 'href' for React Router
        className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-text-light bg-primary-700 rounded-full shadow-2xl hover:bg-dark-purple/90 transition-colors duration-300 transform hover:scale-[1.02]"
    >
        Start Your Search Now
    </Link>
</div>

        </div>
    </section>
);

export default HowItWorks;