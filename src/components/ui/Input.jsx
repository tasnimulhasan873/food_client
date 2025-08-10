import React from "react";
import clsx from "clsx";

export const inputClass =
  "w-full px-4 py-2 border border-accent bg-base-100 dark:bg-neutral rounded-lg shadow-sm focus:ring-primary focus:border-primary text-base-content placeholder-gray-400 transition duration-150 ease-in-out";

export function Input({ className, ...props }) {
  return <input className={clsx(inputClass, className)} {...props} />;
}
