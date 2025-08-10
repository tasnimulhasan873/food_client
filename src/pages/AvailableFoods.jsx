import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PulsingDotLoader from "../components/PulsingDotLoader";

const fetchFoods = async (sortOrder) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const res = await axios.get(`${baseUrl}/available-foods?sort=${sortOrder}`);
  return res.data;
};

const AvailableFoods = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: foods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableFoods", sortOrder],
    queryFn: () => fetchFoods(sortOrder),
    keepPreviousData: true,
  });

  // Use useMemo instead of useEffect to prevent infinite re-renders
  const filteredFoods = useMemo(() => {
    if (searchTerm.trim() === "") {
      return foods;
    } else {
      return foods.filter(
        (food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, foods]);

  const handleViewDetails = (id) => {
    navigate(`/food-details/${id}`);
  };

  // Replace the loading paragraph with the PulsingDotLoader component
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-custom">
        <PulsingDotLoader />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-red-600 font-semibold text-lg">
        Failed to load foods. Please try again later.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto bg-custom min-h-screen text-custom">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-custom">
        Available Foods
      </h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by food name or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-accent-custom bg-white text-custom px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-custom focus:border-primary-custom w-full md:w-1/3 transition duration-150 ease-in-out placeholder-gray-400"
        />

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label className="text-custom font-medium">Sort by Expiration:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-accent-custom bg-white text-custom px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-custom focus:border-primary-custom transition duration-150 ease-in-out"
          >
            <option value="asc">Soonest Expiring</option>
            <option value="desc">Latest Expiring</option>
          </select>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.length === 0 ? (
          <p className="text-center col-span-full text-custom text-lg py-10">
            No foods found matching your criteria.
          </p>
        ) : (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              className="bg-white border border-accent-custom p-6 rounded-xl shadow-lg flex flex-col hover:shadow-2xl hover:shadow-primary-custom/20 transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover rounded-lg mb-4 border border-accent-custom"
              />
              <h3 className="text-xl font-bold text-primary-custom mb-2">
                {food.name}
              </h3>
              <p className="text-custom text-sm mb-1">
                Quantity:{" "}
                <span className="font-medium text-accent-custom">
                  {food.quantity}
                </span>
              </p>
              <p className="text-custom text-sm mb-1">
                Location:{" "}
                <span className="font-medium text-accent-custom">
                  {food.pickupLocation}
                </span>
              </p>
              <p className="text-custom text-sm">
                Expires:{" "}
                <span className="font-medium text-accent-custom">
                  {new Date(food.expireDateTime).toLocaleString()}
                </span>
              </p>
              {food.additionalNotes && (
                <p className="text-custom/70 mt-3 text-sm italic border-t border-accent-custom pt-3">
                  Notes: {food.additionalNotes}
                </p>
              )}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleViewDetails(food._id)}
                  className="w-full py-2.5 px-4 bg-primary-custom hover:bg-accent-custom text-secondary-custom font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
