import React, { useState } from 'react';

const LeadModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDates: '',
    travelers: '',
    start: '',
    requests: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error on change
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    // if (!formData.email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit Indian phone number.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');
    try {
      // Simulate API call (replace with real endpoint, e.g., fetch to your backend)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Mock delay
      console.log('Lead Information:', formData);
      setSubmitMessage('Thank you! We\'ll contact you soon with personalized recommendations.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        destination: '',
        travelDates: '',
        start: '',
        travelers: '',
        requests: ''
      });
      setTimeout(() => onClose(), 3000); // Auto-close after success
    } catch (error) {
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex justify-end items-start pt-4 pr-4 z-[100000]" 
      onClick={onClose}
    >
      <div
        className={`bg-white/90 rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundImage: "url('/formBg.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-primary-700 hover:text-primary-500 text-3xl font-bold"
          onClick={onClose}
          aria-label="Close Modal"
        >
          ×
        </button>

        {/* Header with Icon */}
        <div className="bg-gradient-to-t from-primary-500 to-primary-700 text-white p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold">Unlock Exclusive Pricing</h2>
          </div>
          <p className="mt-2 text-sm">Discover amazing destinations like Mumbai, Pune, Goa, and more. Fill in your details for personalized recommendations!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-3 bg-white/50 space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.name ? 'border-rose-600' : 'border-primary-300'}`}
              placeholder="Enter your full name"
              required
            />
            {errors.name && <p className="text-rose-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
              Email 
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? 'border-rose-600' : 'border-primary-300'}`}
              placeholder="your.email@example.com"
              required
            />
            {errors.email && <p className="text-rose-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
              Phone Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 border border-r-0 border-primary-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                +91
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.phone ? 'border-rose-600' : 'border-primary-300'}`}
                placeholder="9876543210"
                required
              />
            </div>
            {errors.phone && <p className="text-rose-600 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* 2-Column Grid for Destination, Travel Dates, Travelers,  */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-primary-700 mb-1">
                Preferred Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select a destination</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Goa">Goa</option>
                <option value="Nashik">Nashik</option>
                <option value="Aurangabad">Aurangabad</option>
                <option value="Other">Other (specify in requests)</option>
              </select>
            </div>
            <div>
              <label htmlFor="start" className="block text-sm font-medium text-primary-700 mb-1">
                Start From
              </label>
               <input
                type="text"
                id="start"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Nagpur"
              />
            </div>

            {/* Travel Dates */}
            <div>
              <label htmlFor="travelDates" className="block text-sm font-medium text-primary-700 mb-1">
                Preferred Travel Dates
              </label>
              <input
                type="text"
                id="travelDates"
                name="travelDates"
                value={formData.travelDates}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., June 2024"
              />
            </div>

            {/* Travelers */}
            <div>
              <label htmlFor="travelers" className="block text-sm font-medium text-primary-700 mb-1">
                Number of Travelers
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., 2"
              />
            </div>
          </div>

          {/* Requests */}
          <div>
            <label htmlFor="requests" className="block text-sm font-medium text-primary-700 mb-1">
              Special Requests
            </label>
            <textarea
              id="requests"
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Any preferences, like family-friendly or adventure trips?"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${
              isSubmitting
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {/* Submit Message */}
          {submitMessage && (
            <p className={`text-center text-sm mt-2 ${submitMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
              {submitMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LeadModal;
