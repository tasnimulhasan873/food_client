import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthC";
import Swal from "sweetalert2";
import PulsingDotLoader from "../components/PulsingDotLoader";

const Login = () => {
  const { loginUser, googleSignin } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true);
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire("Success!", "You have successfully logged in.", "success");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire("Error!", error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    setLoading(true);
    googleSignin()
      .then((result) => {
        console.log(result.user);
        Swal.fire(
          "Success!",
          "You have successfully logged in with Google.",
          "success"
        );
        navigate("/");
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-custom flex items-center justify-center px-4">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <PulsingDotLoader />
        </div>
      )}
      <div className="w-full max-w-md bg-secondary-custom border border-accent-custom rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-primary-custom mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-custom">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-custom">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border border-accent-custom bg-white text-custom rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-custom placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-custom hover:bg-accent-custom text-secondary-custom font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-accent-custom" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-secondary-custom px-2 text-custom">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-accent-custom text-custom bg-secondary-custom font-medium py-2 rounded-lg flex items-center justify-center hover:bg-accent-custom/10 transition duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
            <path
              fill="#4285f4"
              d="M533.5 278.4c0-17.7-1.6-35.1-4.7-51.8H272v98.1h146.9c-6.4 34.7-25.5 64.1-54.5 83.7v69.4h87.7c51.3-47.3 81.4-117.1 81.4-199.4z"
            />
            <path
              fill="#34a853"
              d="M272 544.3c73.7 0 135.5-24.5 180.6-66.6l-87.7-69.4c-24.4 16.4-55.4 25.9-92.9 25.9-71.4 0-132-48.1-153.7-112.9H27.1v70.9C71.5 482.9 165.9 544.3 272 544.3z"
            />
            <path
              fill="#fbbc04"
              d="M118.3 321.3c-10.4-30.5-10.4-63.8 0-94.3V156.1H27.1c-34.6 68.8-34.6 150.5 0 219.3l91.2-54.1z"
            />
            <path
              fill="#ea4335"
              d="M272 107.7c39.9 0 75.8 13.7 104.2 40.7l78.1-78.1C407.5 24.5 345.7 0 272 0 165.9 0 71.5 61.4 27.1 156.1l91.2 70.9C140 155.8 200.6 107.7 272 107.7z"
            />
          </svg>
          Continue with Google
        </button>

        <p className="text-sm text-center mt-6 text-custom">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-custom font-semibold hover:underline hover:text-accent-custom"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
