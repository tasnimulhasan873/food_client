import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthC";
import axios from "axios";

import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { Label } from "../components/ui/label";
import PulsingDotLoader from "../components/PulsingDotLoader";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [expireDateTime, setExpireDateTime] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [status, setStatus] = useState("available");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to add food.");
      navigate("/login");
      return;
    }

    const newFood = {
      name: foodName,
      image: foodImage,
      quantity: Number(quantity),
      pickupLocation,
      expireDateTime,
      additionalNotes,
      donor: {
        name: user.displayName || "Anonymous",
        email: user.email,
        image: user.photoURL || "",
      },
      status,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const res = await axios.post(`${baseUrl}/foods`, newFood);
      console.log("Food saved:", res.data);
      navigate("/available-foods");
    } catch (error) {
      console.error("Error saving food:", error);
      alert("Error adding food. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-custom flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PulsingDotLoader />
        </div>
      )}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-accent-custom">
        <div className="p-8 sm:p-10">
          <h2 className="text-center text-4xl font-bold text-primary-custom mb-8 tracking-tight">
            Share Your Surplus Food
          </h2>
          <p className="text-center text-lg text-custom mb-10">
            Help reduce food waste by adding your excess food items here.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Name */}
            <div>
              <Label htmlFor="foodName">Food Name</Label>
              <Input
                id="foodName"
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
                placeholder="e.g., Freshly Baked Bread"
              />
            </div>

            {/* Food Image URL */}
            <div>
              <Label htmlFor="foodImage">Food Image URL</Label>
              <Input
                id="foodImage"
                type="url"
                value={foodImage}
                onChange={(e) => setFoodImage(e.target.value)}
                required
                placeholder="e.g., https://example.com/bread.jpg"
              />
            </div>

            {/* Food Quantity */}
            <div>
              <Label htmlFor="quantity">Food Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="e.g., 5 servings or 1 dozen"
              />
            </div>

            {/* Pickup Location */}
            <div>
              <Label htmlFor="pickupLocation">Pickup Location</Label>
              <Input
                id="pickupLocation"
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
                placeholder="e.g., 123 Main St, City, State"
              />
            </div>

            {/* Expiration Date/Time */}
            <div>
              <Label htmlFor="expireDateTime">Expiration Date/Time</Label>
              <Input
                id="expireDateTime"
                type="datetime-local"
                value={expireDateTime}
                onChange={(e) => setExpireDateTime(e.target.value)}
                required
              />
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="additionalNotes">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                rows={4}
                placeholder="e.g., Contains nuts, best consumed within 24 hours, etc."
              />
            </div>

            {/* Food Status */}
            <div>
              <Label htmlFor="status">Food Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-accent-custom rounded-lg shadow-sm focus:ring-primary-custom focus:border-primary-custom text-custom transition duration-150 ease-in-out bg-white"
              >
                <option value="available">Available</option>
              </select>
            </div>

            {/* Donor Info */}
            <div className="bg-white border border-accent-custom p-5 rounded-xl text-custom shadow-inner">
              <p className="text-lg font-semibold mb-2 text-primary-custom">
                Your Donor Information:
              </p>
              <div className="flex items-center space-x-4">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Donor"
                    className="w-16 h-16 rounded-full border-2 border-primary-custom object-cover"
                  />
                )}
                <div>
                  <p className="text-custom font-medium">
                    <span className="font-bold text-accent-custom">Name:</span>{" "}
                    {user?.displayName || "Anonymous"}
                  </p>
                  <p className="text-custom text-sm">
                    <span className="font-bold text-accent-custom">Email:</span>{" "}
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit">Add Food for Sharing</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
