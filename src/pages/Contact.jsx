import React, { useState } from "react";
import axios from "axios";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react"; // Added Send icon

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // POST form data to the specified API endpoint
      await axios.post("http://localhost:1337/api/contact-form", {
        data: formData, // Assuming Strapi expects data wrapped in 'data' object
      });
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Reset form on success
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-screen  px-4 sm:px-6 lg:px-8 py-30 bg-primary-50 dark:bg-white">
      <div className="bg-white dark:bg-primary-700  pt-10 rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12 lg:p-16">
        {/* Section Title and Subtitle */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Have Questions?
          </p>
          <h2 className="text-4xl font-extrabold  text-gray-900 dark:text-white mt-2">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            We're here to help! Send us a message or find our contact details below.
          </p>
        </div>

        {/* Layout: Contact Info (Left) and Form (Right) - Enhanced for Tablet/Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8 bg-primary-50 dark:bg-primary-500 p-4 rounded-2xl shadow-inner">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white border-b pb-4 mb-4 border-gray-200 dark:border-gray-600">
              Our Details
            </h3>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300 p-3 rounded-xl flex-shrink-0 mt-1">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Office Location</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Dhande Niwas, New Narsala Road, Beldar Nagar, Dighori - Nagpur 440034
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300 p-3 rounded-xl flex-shrink-0 mt-1">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h4>
                <a
                  href="mailto:rctoursandtravels01@gmail.com"
                  className="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-500 dark:hover:text-gray-300 transition"
                >
                  rctoursandtravels01@gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300 p-3 rounded-xl flex-shrink-0 mt-1">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h4>
                <a href="tel:+919172271464" className="text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition">
                  +91 91722 71464
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300 p-3 rounded-xl flex-shrink-0 mt-1">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Working Hours</h4>
                <p className="text-gray-600 dark:text-gray-400 font-medium">24 Hours / 7 Days a Week</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Send Us a Quick Message
            </h3>
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              {/* Input Fields */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-500 text-gray-900 dark:text-white rounded-lg p-3.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-500 text-gray-900 dark:text-white rounded-lg p-3.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Tell us how we can help..."
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-primary-500 text-gray-900 dark:text-white rounded-lg p-3.5 shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150"
                ></textarea>
              </div>

              {/* Status Messages */}
              {success && (
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-primary-700 dark:text-green-400" role="alert">
                  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2Zm1.846-5.41a1 1 0 0 1-1.414 1.414L10 9.414l-2.43 2.43a1 1 0 0 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0l3 3Z"/>
                  </svg>
                  <span className="sr-only">Success</span>
                  <div>
                    <span className="font-medium">Success!</span> Message sent successfully! We'll be in touch soon.
                  </div>
                </div>
              )}
              {error && (
                <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-primary-700 dark:text-red-400" role="alert">
                  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0v5Z"/>
                  </svg>
                  <span className="sr-only">Error</span>
                  <div>
                    <span className="font-medium">Error!</span> {error}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-primary-300 hover:bg-primary-500 text-white font-semibold py-3.5 rounded-lg shadow-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;