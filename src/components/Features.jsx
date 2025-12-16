import React from 'react';
import { FaCar, FaStar, FaClipboardCheck, FaCheckCircle, FaShieldAlt, FaClock, FaHeadset, FaDollarSign, FaBolt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Wide Selection',
    desc: 'Choose from 100+ latest-model cars.',
    Icon: FaCar,
  },
  {
    title: '100% Compliance',
    desc: 'Fully insured and RTO-cleared cars.',
    Icon: FaClipboardCheck,
  },
  {
    title: '99% Trip Success',
    desc: 'Guaranteed availability & timely service.',
    Icon: FaCheckCircle,
  },
  {
    title: 'Safe Drop',
    desc: 'Secure drop-off at your location.',
    Icon: FaShieldAlt,
  },
  {
    title: 'Easy Booking',
    desc: 'Fast, simple, stress-free booking.',
    Icon: FaClock,
  },
  {
    title: 'Instant Confirmation',
    desc: 'Get confirmed in seconds.',
    Icon: FaBolt,
  },
  {
    title: '24/7 Support',
    desc: 'Round-the-clock assistance.',
    Icon: FaHeadset,
  },
  {
    title: 'Transparent Pricing',
    desc: 'Clear rates with no hidden fees.',
    Icon: FaDollarSign,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const Features = () => {
  const averageRating = 4.8;
  const totalRatings = 5200;

  return (
    <section id="services" className="py-24 bg-indigo-100">
      <div className="container mx-auto px-6 max-w-7xl text-center">
        
        {/* Section Header */}
        <h3 className="text-sm font-semibold uppercase tracking-widest text-text-sub mb-3">
          Your Journey, Our Commitment
        </h3>
        <h2 className="text-4xl font-extrabold mb-4 text-text-heading">
          Why Choose Our Service?
        </h2>
        <p className="mb-12 max-w-3xl mx-auto text-text-sub text-lg">
          What makes our rental service standout for smart travelers.
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center mb-16 space-x-3 p-4 bg-indigo-700 rounded-xl shadow-md border border-dark-purple/20 max-w-xs mx-auto">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={20} className="fill-amber-500" />
            ))}
          </div>
          <span className="text-xl font-bold text-gray-900">{averageRating}</span>
          <span className="text-sm font-semibold text-white">
            ({totalRatings.toLocaleString()} reviews on google)
          </span>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 bg-primary-700 p-2 rounded-bl-4xl border-gray-900 border-1 rounded-tr-4xl">

          {features.map(({ title, desc, Icon }, index) => (
            <motion.div
              key={title}
              className="bg-primary-50 p-2 rounded-bl-4xl border-gray-900 border-1 rounded-tr-4xl shadow-xl border-t-4 border-dark-purple/50 hover:border-dark-purple transition-all duration-500 cursor-default group flex flex-col items-center text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={index}
              variants={cardVariants}
            >
              <div className="p-2 mb-2 rounded-full bg-dark-purple/10 transition-colors duration-300 group-hover:bg-dark-purple/20">
                <Icon className="text-4xl text-dark-purple" />
              </div>

              <h4 className="text-xl font-bold mb-3 text-gray-900">{title}</h4>
              <p className="text-gray-700 justify-between leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-16 inline-flex items-center px-12 py-4 bg-primary-700 text-text-light rounded-full text-xl font-bold shadow-2xl hover:bg-dark-purple/90 transition-all duration-300 transform hover:scale-[1.03] focus:ring-4 focus:ring-dark-purple/50"
          onClick={() => (window.location.href = '/cars')}
        >
          Browse Our Cars
        </button>
      </div>
    </section>
  );
};

export default Features;
