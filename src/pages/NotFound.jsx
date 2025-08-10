import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-4">
      <div className="text-center bg-base-100 dark:bg-neutral p-10 md:p-16 rounded-3xl shadow-2xl border border-accent/30 max-w-lg w-full animate-scaleIn">
        <div className="flex flex-col items-center mb-6">
          <svg
            className="w-24 h-24 text-primary mb-2 animate-bounce"
            fill="none"
            viewBox="0 0 48 48"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M24 4v4m0 32v4m16-16h4M4 24H0m34.627-10.627l2.828-2.828M10.545 37.455l-2.828 2.828M37.455 37.455l2.828 2.828M10.545 10.545l-2.828-2.828"
            />
            <circle
              cx="24"
              cy="24"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <h1 className="text-7xl font-extrabold text-primary mb-2">404</h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
          Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-base-content/70 mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist, was moved, or is
          temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-primary hover:bg-accent text-secondary font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
