import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthC";
import PulsingDotLoader from "../components/PulsingDotLoader";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true); // Start loading before fetching
      try {
        const res = await axios.get(
          `http://localhost:3000/requested-foods?email=${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Failed to load food requests:", err);
        // Optionally, add a user-friendly error message here
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    if (user?.email) {
      fetchRequests();
    }
  }, [user?.email]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 main-content min-h-screen main-content-txt">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary main-content-txt">
        My Food Requests
      </h2>

      {loading ? (
        <PulsingDotLoader />
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-base-100 rounded-2xl shadow-lg border border-accent px-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-primary mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-2xl font-semibold text-primary mb-2">
            No Food Requests Found
          </p>
          <p className="text-lg main-content-txt max-w-md mx-auto">
            It looks like you haven't requested any food yet. Explore the
            available foods and make your first request!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl border border-accent">
          <table className="min-w-full table-auto divide-y divide-accent main-content-txt">
            <thead className="bg-secondary text-base-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-2xl">
                  Food Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Donor Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Pickup Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Expire Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-2xl">
                  Request Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent">
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-primary/10 transition duration-150 ease-in-out text-secondary"
                >
                  <td className="px-6 py-4 text-lg font-medium text-primary">
                    {req.name}
                  </td>
                  <td className="px-6 py-4 text-lg">
                    {req.donor?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-lg">{req.pickupLocation}</td>
                  <td className="px-6 py-4 text-lg text-error font-medium">
                    {new Date(req.expireDateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-lg">
                    {new Date(req.requestDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-lg max-w-xs overflow-hidden text-ellipsis">
                    {req.requestNote || "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequest;
