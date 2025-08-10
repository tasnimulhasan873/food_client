import React from "react";
import clsx from "clsx";

export const textareaClass =
  "w-full px-4 py-2 border border-accent-custom bg-white rounded-lg shadow-sm focus:ring-primary-custom focus:border-primary-custom text-custom placeholder-gray-400 transition duration-150 ease-in-out";

export function Textarea({ className, ...props }) {
  return <textarea className={clsx(textareaClass, className)} {...props} />;
}
