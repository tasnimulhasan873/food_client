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
      <div className="min-h-screen flex items-center justify-center main-content-txt bg-base-100">
        <PulsingDotLoader />
      </div>
    );

  if (error)
    return (
      <p className="text-center mt-10 text-error font-semibold text-lg">
        Failed to load foods. Please try again later.
      </p>
    );

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto main-content min-h-screen main-content-txt">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary main-content-txt">
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
          className="border border-accent bg-base-100 main-content-txt px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full md:w-1/3 transition duration-150 ease-in-out placeholder-gray-400"
        />

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <label className="main-content-txt font-medium">
            Sort by Expiration:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-accent bg-base-100 main-content-txt px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out"
          >
            <option value="asc">Soonest Expiring</option>
            <option value="desc">Latest Expiring</option>
          </select>
        </div>
      </div>

      {/* Foods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.length === 0 ? (
          <p className="text-center col-span-full main-content-txt text-lg py-10">
            No foods found matching your criteria.
          </p>
        ) : (
          filteredFoods.map((food) => (
            <div
              key={food._id}
              className="bg-primary border border-accent p-6 rounded-xl shadow-xl flex flex-col hover:shadow-2xl hover:shadow-accent/20 transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              <img
                src={food.image}
                alt={food.name}
                className="h-48 w-full object-cover rounded-lg mb-4 border border-accent"
              />
              <h3 className="text-2xl font-extrabold text-secondary mb-2 drop-shadow-sm">
                {food.name}
              </h3>
              <div className="space-y-1 mb-2">
                <p className="text-base-100 text-sm">
                  <span className="font-semibold text-accent">Quantity:</span>{" "}
                  {food.quantity}
                </p>
                <p className="text-base-100 text-sm">
                  <span className="font-semibold text-accent">Location:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-base-100 text-sm">
                  <span className="font-semibold text-accent">Expires:</span>{" "}
                  {new Date(food.expireDateTime).toLocaleString()}
                </p>
              </div>
              {food.additionalNotes && (
                <p className="text-base-100/80 mt-3 text-xs italic border-t border-accent pt-3">
                  <span className="font-semibold text-accent">Notes:</span>{" "}
                  {food.additionalNotes}
                </p>
              )}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => handleViewDetails(food._id)}
                  className="w-full py-2.5 px-4 bg-accent hover:bg-secondary text-base-100 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
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
