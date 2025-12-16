import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-800 p-8">
      <h1 className="text-5xl font-extrabold mb-6 tracking-wide">Oops! Something went wrong.</h1>
      <p className="text-lg max-w-md text-center mb-6">
        We encountered an unexpected error. Please try refreshing the page or come back later.
      </p>
      <button
        onClick={handleRetry}
        className="bg-red-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-800 transition focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        Back 
      </button>
    </div>
  );
};

export default ErrorPage;
