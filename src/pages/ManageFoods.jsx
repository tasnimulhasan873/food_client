import { useContext, useEffect, useState } from "react";
import axiosSecure from "../axiosSecure";
import { AuthContext } from "../context/AuthC";
import PulsingDotLoader from "../components/PulsingDotLoader";

const ManageFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/manage-foods?email=${user.email}`)
        .then((res) => {
          setFoods(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching foods:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user?.email]);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    if (isNaN(date)) return dateTimeStr;
    return date.toLocaleString();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      foodName: form.foodName.value,
      foodQuantity: form.foodQuantity.value,
      pickupLocation: form.pickupLocation.value,
      expiredDateTime: form.expiredDateTime.value,
      additionalNotes: form.additionalNotes.value,
    };

    try {
      const response = await axiosSecure.put(
        `/manage-foods/${editingFood._id}`,
        updatedFood
      );

      if (response.data.modifiedCount > 0) {
        alert("Food updated successfully");

        const updatedFoods = foods.map((food) =>
          food._id === editingFood._id ? { ...food, ...updatedFood } : food
        );
        setFoods(updatedFoods);
        setEditingFood(null);
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const response = await axiosSecure.delete(`/manage-foods/${id}`);

      if (response.data.deletedCount > 0) {
        alert("Food deleted successfully");
        setFoods(foods.filter((food) => food._id !== id));
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="p-4 text-custom min-h-screen bg-custom">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary-custom">
        Manage My Foods
      </h2>

      {loading ? (
        <PulsingDotLoader />
      ) : foods.length === 0 ? (
        <p className="text-custom text-center text-lg">
          No foods available to manage.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-accent-custom">
          <table className="table w-full border text-sm md:text-base">
            <thead>
              <tr className="bg-secondary-custom text-primary-custom">
                <th>#</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, idx) => (
                <tr
                  key={food._id}
                  className="border-b hover:bg-custom/50 text-custom"
                >
                  <td>{idx + 1}</td>
                  <td className="font-semibold text-primary-custom">
                    {food.foodName}
                  </td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.pickupLocation}</td>
                  <td>{formatDateTime(food.expiredDateTime)}</td>
                  <td>{food.additionalNotes}</td>
                  <td>
                    <button
                      onClick={() => setEditingFood(food)}
                      className="bg-primary-custom hover:bg-accent-custom text-secondary-custom px-3 py-1 rounded mr-2 text-sm font-medium transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingFood && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white border border-accent-custom text-custom p-6 rounded-xl w-[90%] max-w-md shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary-custom text-center">
              Edit Food
            </h3>

            <input
              type="text"
              name="foodName"
              defaultValue={editingFood.foodName}
              className="w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400 mb-4"
              placeholder="Food Name"
              required
            />

            <input
              type="text"
              name="foodQuantity"
              defaultValue={editingFood.foodQuantity}
              className="w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400 mb-4"
              placeholder="Quantity"
              required
            />

            <input
              type="text"
              name="pickupLocation"
              defaultValue={editingFood.pickupLocation}
              className="w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400 mb-4"
              placeholder="Pickup Location"
              required
            />

            <input
              type="datetime-local"
              name="expiredDateTime"
              defaultValue={editingFood.expiredDateTime}
              className="w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400 mb-4"
              required
            />

            <textarea
              name="additionalNotes"
              defaultValue={editingFood.additionalNotes}
              className="w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400 mb-6"
              placeholder="Additional Notes"
              rows="3"
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingFood(null)}
                className="px-4 py-2 border border-accent-custom text-custom bg-white rounded-lg hover:bg-custom transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-custom hover:bg-accent-custom text-secondary-custom rounded-lg transition duration-200 font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageFoods;
