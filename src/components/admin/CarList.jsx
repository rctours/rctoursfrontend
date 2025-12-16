import React from 'react';
import { Car } from 'lucide-react';

const CarListCard = ({ cars = [] }) => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Car className="h-6 w-6 mr-3 text-indigo-600" />
        Latest Car Listings
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {cars?.slice(0, 5).map(car => {
              const model = car?.attributes?.model || "Unknown Model";
              const price = car?.attributes?.price || null;
              const status = car?.attributes?.status || "Pending";

              return (
                <tr key={car?.id || Math.random()}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {price ? `₹${price.toLocaleString()}` : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>
    </section>
  );
};

export default CarListCard;
