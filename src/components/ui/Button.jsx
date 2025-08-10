import React from "react";
import clsx from "clsx";

export function Button({ className, ...props }) {
  return (
    <button
      className={clsx(
        "w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-secondary-custom bg-primary-custom hover:bg-accent-custom focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-custom transition duration-200 ease-in-out transform hover:scale-105",
        className
      )}
      {...props}
    />
  );
}
