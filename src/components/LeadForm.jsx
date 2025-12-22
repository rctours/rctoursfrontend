import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaCommentDots,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowUp,
  FaAngleDoubleUp,
  FaAngleDoubleDown,
  FaCross,
  FaWindowClose
} from "react-icons/fa";

const LeadFormWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const timeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    destination: "",
    date: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

 useEffect(() => {
  const timer = setTimeout(() => {
    const submitted = localStorage.getItem("formSubmitted") === "true";
    console.log(submitted);

    setHasSubmitted(submitted);

    if (!submitted) {
      setIsOpen(true);
    }
  }, 60000); // ⏱ 1 minute delay

  return () => clearTimeout(timer); // cleanup
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // PHONE VALIDATION
  const validatePhoneNumber = (number) => {
    if (!number) return "Phone number is required";

    if (number.startsWith("+") || number.startsWith("91")) {
      return "Enter number WITHOUT ISD code (only 10 digits)";
    }

    if (!/^[0-9]{10}$/.test(number)) {
      return "Phone number must be exactly 10 digits";
    }

    return "";
  };

  // SUBMIT API USING AXIOS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) {
      setErrors({ phoneNumber: phoneError });
      return;
    }

    setErrors({ phoneNumber: "" });
    setLoading(true);
    setSuccessMessage("");

    const payload = {
      data: {
        name: formData.name,
        phoneNumber: Number(formData.phoneNumber),
        message: formData.message,
        destination: formData.destination,
        date: formData.date
      }
    };

   try {
  const res = await axios.post(
    "/api/messages",
    // "http://localhost:1337/api/messages",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  setSuccessMessage("Message sent successfully!");

  // Clear fields
  setFormData({
    name: "",
    phoneNumber: "",
    destination: "",
    date: "",
    message: ""
  });

  // Set submitted flag
  localStorage.setItem('formSubmitted', 'true');
  setHasSubmitted(true);

  // Clear any pending timeout
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  // Hide message AND close modal after 4 seconds
  timeoutRef.current = setTimeout(() => {
    setSuccessMessage("");
    setIsOpen(false);   // <— now closes after 4 seconds
  }, 4000);

} catch (error) {
  console.error("API Error:", error);

  if (error.response?.data?.error?.message) {
    alert("Error: " + error.response.data.error.message);
  } else {
    alert("Something went wrong, please try again.");
  }
} finally {
  setLoading(false);
}

  };

  return (
    <div className="fixed bottom-13 right-4 sm:right-2 z-50 flex flex-col items-center font-sans">

      <div
        className={`
          relative transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
          shadow-2xl overflow-hidden border border-white/40 backdrop-blur-xl
          ${isOpen
            ? "w-[320px] h-[500px] rounded-2xl backdrop-blur-2xl bg-primary-700/50"
            : "md:h-10 h-10 sm:h-10 w-40 md:w-40 hover:w-80 hover:ml-3 hover:items-end rounded-full bg-gradient-to-r from-primary-700 to-primary-500 cursor-pointer group"
          }
        `}
      >

        {/* Collapsed Button */}
        <button
          onClick={() => setIsOpen(true)}
          className={`
            absolute inset-0 flex items-center h-full w-full 
            ${isOpen ? "opacity-0 invisible" : "opacity-100 visible"}
            transition-all duration-500
          `}
        >
          <img
            src="/earth.avif"
            alt="chat"
            className="w-10 h-10 sm:w-10 sm:h-10 md:w-10 md:h-10 rounded-4xl object-cover transition-all duration-500 group-hover:translate-x-[-2px]"
          />
          <span className="ml-0 text-white font-semibold sm:text-sm md:text-md whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity duration-500 font-bold px-1">
            Tour Enquiry
          </span>
          <FaAngleDoubleUp className="text-white text-2xl ml-auto font-bold pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Expanded Form */}
        <div
          className={`flex flex-col h-full w-full transition-opacity duration-500 ${isOpen ? "opacity-100 visible delay-100" : "opacity-0 invisible"
            }`}
        >

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-linear-to-t from-purple-900 to-primary-700 text-white shadow-md shrink-0">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-purple-200 text-lg" />
              <h3 className="font-bold text-xl tracking-wide">Tour Enquiry</h3>
            </div>


            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
                // If not submitted, reopen after 40 seconds
                if (!hasSubmitted) {
                  timeoutRef.current = setTimeout(() => {
                    if (!hasSubmitted) {
                      setIsOpen(true);
                    }
                  }, 60000);
                }
              }}
              className="text-rose-500/80 hover:text-red-300 transition-transform duration-200 p-1"
            >
              <FaWindowClose size={28} />
            </button>
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
            <form className="space-y-2" onSubmit={handleSubmit}>

              {/* Name */}
              <InputField
                label="Full Name"
                icon={<FaUser />}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              {/* Phone Number */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-50 uppercase tracking-wider mb-1 ml-1">
                  Phone Number (without +91)
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-gray-400">
                    <FaPhone />
                  </div>

                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="10-digit number"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      handleChange(e);
                      setErrors({ phoneNumber: "" });
                    }}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border
                      ${errors.phoneNumber ? "border-red-500" : "border-gray-200"}
                      focus:border-purple-500 focus:ring-2 focus:ring-purple-200
                      outline-none transition-all font-medium text-gray-700
                      placeholder-gray-400 text-sm
                    `}
                    required
                  />
                </div>

                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Destination */}
              <InputField
                label="Destination"
                icon={<FaMapMarkerAlt />}
                type="text"
                name="destination"
                placeholder="Where to? (e.g. Mumbai)"
                value={formData.destination}
                onChange={handleChange}
              />

              {/* Date */}
              <InputField
                label="Travel Date"
                icon={<FaCalendarAlt />}
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-gray-50 uppercase tracking-wider mb-1 ml-1">
                  Special Requests
                </label>
                <textarea
                  name="message"
                  placeholder="Any specific requirements?"
                  className="w-full px-4 py-3 h-24 bg-gray-50 rounded-xl border border-gray-200 
                  focus:border-purple-500 focus:ring-2 focus:ring-purple-200 
                  outline-none transition-all resize-none font-medium text-gray-700 text-sm"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group w-full bg-gradient-to-r from-purple-600 to-indigo-600 
                text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-500/30 
                hover:shadow-purple-500/50 transform hover:-translate-y-0.5 
                transition-all duration-200 flex items-center justify-center gap-2
                ${loading && "opacity-60 cursor-not-allowed"}
                `}
              >
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <FaPaperPlane className="animate-ping" size={14} />
                  </>
                ) : (
                  <>
                    <span>Send Request</span>
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform" size={14} />
                  </>
                )}
              </button>

              {/* Success Message */}
              {successMessage && (
                <p className="text-green-400 text-sm text-center font-semibold mt-2">
                  {successMessage}
                </p>
              )}

            </form>

            <p className="text-center text-xs text-gray-300 mt-4">
              We typically reply within 2 hours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({ label, icon, type = "text", ...props }) => (
  <div className="group">
    <label className="block text-xs font-bold text-gray-50 uppercase tracking-wider mb-1 ml-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-4 top-3.5 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200
        focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none 
        transition-all font-medium text-gray-700 placeholder-gray-400 text-sm"
        {...props}
      />
    </div>
  </div>
);

export default LeadFormWidget;
