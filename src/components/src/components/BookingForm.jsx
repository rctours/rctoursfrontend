import React from "react";

function BookingForm() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Book Your Ride
      </h2>

      <div className="flex gap-2 mb-4 justify-center">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Outstation
        </button>

        <button className="bg-gray-200 px-4 py-2 rounded">
          Local
        </button>

        <button className="bg-gray-200 px-4 py-2 rounded">
          Airport
        </button>
      </div>

      <input
        type="text"
        placeholder="Pickup Location"
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="text"
        placeholder="Destination"
        className="w-full border p-3 rounded mb-3"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="date"
          className="border p-3 rounded"
        />

        <input
          type="time"
          className="border p-3 rounded"
        />
      </div>

      <button className="w-full bg-green-600 text-white py-3 rounded mt-4">
        Proceed For Booking
      </button>
    </div>
  );
}

export default BookingForm;
