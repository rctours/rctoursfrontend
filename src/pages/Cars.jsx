import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";

// Simple Skeleton Loader Component (for better UX during loading)
const SkeletonLoader = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

// Filter Section Sub-Component (for modularity)
const FilterSection = ({
  search,
  setSearch,
  filterCarType,
  setFilterCarType,
  sort,
  setSort,
  onClearFilters,
  isSearching,
}) => (
  <div className="bg-primary-300 p-2 rounded-lg shadow-md mb-4">

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search cars by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-3 border bg-purple-50 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition"
          aria-label="Search cars"
        />
        <span className="absolute left-3 top-3 heroicon-outline-search text-gray-700"></span>
        {isSearching && (
          <span className="absolute right-3 top-3 animate-spin heroicon-outline-refresh text-gray-700"></span>
        )}
      </div>

      {/* Car Type Filter */}
     <select
  value={filterCarType}
  onChange={(e) => setFilterCarType(e.target.value)}
  className="w-full px-4 py-3 border bg-purple-50 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition"
  title="Filter by car type"
  aria-label="Filter by car type"
>
  <option value="">All Car Types</option>
  <option value="Mini Bus">Mini Bus</option>
  <option value="Minivan">Minivan</option>
  <option value="MPV">MPV</option>
  <option value="Sedan">Sedan</option>
  <option value="SUV">SUV</option>
  <option value="SUV/MPV">SUV/MPV</option>
  <option value="Traveller">Traveller</option>
  <option value="Compact">Compact</option>
  <option value="Crossover">Crossover</option>
  <option value="Electric">Electric</option>
  <option value="Hatchback">Hatchback</option>
  <option value="Hybrid">Hybrid</option>
  <option value="Luxury">Luxury</option>
  <option value="Van">Van</option>
  <option value="Wagon">Wagon</option>
</select>


      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full px-4 py-3 border bg-purple-50 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary-700 focus:border-primary-700 transition"
        title="Sort cars"
        aria-label="Sort cars"
      >
        <option value="carName:asc">Name (A–Z)</option>
        <option value="carName:desc">Name (Z–A)</option>
        <option value="modelYear:desc">Newest First</option>
        <option value="modelYear:asc">Oldest First</option>
      </select>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full px-4 py-3 bg-gray-200 text-red-700 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition transform hover:scale-105"
        aria-label="Clear all filters"
      >
        <span className="heroicon-outline-x mr-2"></span> Clear Filters
      </button>
    </div>
  </div>
);

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [totalPages, setTotalPages] = useState(1);
  const [totalCars, setTotalCars] = useState(0); // For showing count

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false); // For search feedback

  const [sort, setSort] = useState("carName:asc");
  const [filterCarType, setFilterCarType] = useState("");

  const API_URL = "/api/cars";
  // const API_URL = "http://localhost:1337/api/cars";

  // Debounce Search Input with Feedback
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Cars
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        queryParams.append("pagination[page]", page);
        queryParams.append("pagination[pageSize]", pageSize);
        queryParams.append("populate", "*");

        if (debouncedSearch) {
          queryParams.append("filters[carName][$containsi]", debouncedSearch);
        }

        if (filterCarType) {
          queryParams.append("filters[carType]", filterCarType);
        }

        if (sort) {
          queryParams.append("sort", sort);
        }

        const { data } = await axios.get(`${API_URL}?${queryParams.toString()}`);
 
        const STRAPI_URL = "http://72.61.240.241:1337";

        // Map Car Objects (unchanged, but ensured images are handled)
        const mappedCars = data.data.map((item) => ({
          id: item.id,
          documentId: item.documentId,
          carName: item.carName,
          brand: item.brand,
          modelYear: item.modelYear,
          carType: item.carType,
          fuelType: item.fuelType,
          transmission: item.transmission,
          seatingCapacity: item.seatingCapacity,
          images: item.images
  ? item.images.map((img) => `${STRAPI_URL}${img.url}`)
  : [],
        }));

        setCars(mappedCars);
        setTotalPages(data.meta.pagination.pageCount);
        setTotalCars(data.meta.pagination.total);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load cars. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, debouncedSearch, sort, filterCarType]);

  // Clear Filters Handler
  const handleClearFilters = () => {
    setSearch("");
    setFilterCarType("");
    setSort("carName:asc");
    setPage(1);
  };

  // Pagination Helpers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Render Pagination Buttons (with ellipsis for large counts)
  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          1
        </button>
      );
      if (start > 2) pages.push(<span key="start-ellipsis" className="px-2">...</span>);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded transition ${i === page
            ? "bg-primary-700 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push(<span key="end-ellipsis" className="px-2">...</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <section className="min-h-screen bg-accent-50 pt-20 -gray-50 py-10">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mt-6 text-gray-900">
          Available Cars
        </h2>

        {/* Filters Section */}
        <FilterSection
          search={search}
          setSearch={setSearch}
          filterCarType={filterCarType}
          setFilterCarType={setFilterCarType}
          sort={sort}
          setSort={setSort}
          onClearFilters={handleClearFilters}
          isSearching={isSearching}
        />

        {/* Results Count */}
        {!loading && !error && (
          <p className="text-gray-600 mb-6 text-center">
            Showing {cars.length} of {totalCars} cars
          </p>
        )}

        {/* Loading State */}
        {loading && <SkeletonLoader />}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-500 font-semibold mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-500 transition transform hover:scale-105"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && cars.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-700 text-lg mb-4">No cars found matching your criteria.</p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-500 transition transform hover:scale-105"
            >
              Clear Filters & Try Again
            </button>
          </div>
        )}

        {/* Car Grid */}
        {!loading && !error && cars.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-12">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-2 flex-wrap" role="navigation" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 rounded bg-primary-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition transform hover:scale-105"
              aria-label="Previous page"
            >
              Previous
            </button>
            {renderPagination()}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 rounded bg-primary-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-500 transition transform hover:scale-105"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CarList;
