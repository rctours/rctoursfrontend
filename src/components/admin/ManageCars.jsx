import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Car, 
  Fuel, 
  Settings, 
  Search, 
  Loader2 
} from "lucide-react";

const API_URL = "https://radiant-comfort-67707de096.strapiapp.com/api/cars";

const ManageCars = () => {
  // State
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form State
  const initialFormState = {
    carName: "",
    brand: "",
    modelYear: new Date().getFullYear(),
    color: "",
    registrationNumber: "",
    fuelType: "Petrol",
    transmission: "Manual",
    seatingCapacity: 5,
    carType: "Sedan",
    mileage: "",
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null); // Uses documentId for Strapi v5

  const token = localStorage.getItem("authToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch Cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setCars(response.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
      alert("Failed to load cars.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Open Modal (Add vs Edit)
  const openModal = (car = null) => {
    if (car) {
      setFormData({
        carName: car.carName,
        brand: car.brand,
        modelYear: car.modelYear,
        color: car.color,
        registrationNumber: car.registrationNumber || "",
        fuelType: car.fuelType,
        transmission: car.transmission,
        seatingCapacity: car.seatingCapacity,
        carType: car.carType,
        mileage: car.mileage,
      });
      setEditingId(car.documentId);
    } else {
      setFormData(initialFormState);
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  // Submit Form (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = { data: formData };

    try {
      if (editingId) {
        // Update existing car
        await axios.put(`${API_URL}/${editingId}`, payload, config);
      } else {
        // Create new car
        await axios.post(API_URL, payload, config);
      }
      await fetchCars();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving car:", error);
      alert("Failed to save car details. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Car
  const handleDelete = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`${API_URL}/${documentId}`, config);
        setCars(cars.filter((car) => car.documentId !== documentId));
      } catch (error) {
        console.error("Error deleting car:", error);
        alert("Failed to delete car.");
      }
    }
  };

  // Filter Logic
  const filteredCars = cars.filter(car => 
    car.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (car.registrationNumber && car.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Fleet</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove vehicles from your inventory.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add New Car
        </button>
      </div>

      {/* Search & Stats */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, brand, or reg number..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Total Vehicles: <span className="text-gray-900">{cars.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center p-20 text-gray-500">
            No cars found. Add one to get started!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                  <th className="px-6 py-4">Car Details</th>
                  <th className="px-6 py-4">Specs</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Registration</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{car.brand} {car.carName}</p>
                          <p className="text-xs text-gray-500">{car.modelYear} • {car.color}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Fuel className="w-3 h-3" /> {car.fuelType}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Settings className="w-3 h-3" /> {car.transmission}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {car.carType}
                      </span>
                      <div className="mt-1 text-xs text-gray-500">{car.seatingCapacity} Seats</div>
                    </td>
                    <td className="px-6 py-4">
                      {car.registrationNumber ? (
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200">
                          {car.registrationNumber}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openModal(car)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(car.documentId)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Edit Vehicle" : "Add New Vehicle"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto">
              <form id="carForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Basic Info */}
                <div className="col-span-full">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">Basic Information</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Brand</label>
                  <input required name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="e.g. Toyota" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Car Name</label>
                  <input required name="carName" value={formData.carName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. Innova Crysta" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Type</label>
                  <select name="carType" value={formData.carType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Traveller">Traveller</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Registration No.</label>
                  <input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="MH-12-AB-1234" />
                </div>

                {/* Specs */}
                <div className="col-span-full mt-2">
                   <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">Specifications</h3>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Fuel Type</label>
                  <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white">
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Transmission</label>
                  <select name="transmission" value={formData.transmission} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white">
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Year</label>
                    <input type="number" name="modelYear" value={formData.modelYear} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Seats</label>
                    <input type="number" name="seatingCapacity" value={formData.seatingCapacity} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Color</label>
                    <input name="color" value={formData.color} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none" placeholder="Red" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mileage</label>
                    <input name="mileage" value={formData.mileage} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-lg outline-none" placeholder="18 kmpl" />
                    </div>
                </div>

              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition font-medium"
                type="button"
              >
                Cancel
              </button>
              <button 
                form="carForm"
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium disabled:opacity-70"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Update Car" : "Add Car"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCars;