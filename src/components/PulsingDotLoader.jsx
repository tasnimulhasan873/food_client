import React from "react";

const PulsingDotLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-transparent">
      {/* Main Circle Loader */}
      <div className="relative">
        <div
          className="w-16 h-16 border-4 rounded-full animate-spin"
          style={{ borderColor: "#EB012A33", borderTopColor: "#EB012A" }}
        ></div>
      </div>

      {/* Pulsing White Dots */}
      <div className="flex space-x-3 mt-6 mb-4">
        <div
          className="w-3 h-3 rounded-full shadow-lg animate-pulse"
          style={{
            backgroundColor: "#FFFFFF",
            animationDelay: "0ms",
            animationDuration: "1.5s",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full shadow-lg animate-pulse"
          style={{
            backgroundColor: "#FFFFFF",
            animationDelay: "500ms",
            animationDuration: "1.5s",
          }}
        ></div>
        <div
          className="w-3 h-3 rounded-full shadow-lg animate-pulse"
          style={{
            backgroundColor: "#FFFFFF",
            animationDelay: "1000ms",
            animationDuration: "1.5s",
          }}
        ></div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <p
          className="text-xl font-semibold drop-shadow-lg"
          style={{ color: "#FFFFFF" }}
        >
          Loading...
        </p>
        <p className="text-sm drop-shadow" style={{ color: "#FFFFFFCC" }}>
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
};

export default PulsingDotLoader;
