import React from "react";

const Card = ({
  image,
  title,
  description,
  onSeeMore,
  buttonText = "See more",
}) => {
  return (
    <div className="bg-custom text-custom rounded-xl shadow-lg overflow-hidden border border-accent-custom flex flex-col h-full w-full max-w-xs mx-auto min-h-[420px]">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover border-b border-accent-custom"
      />
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <h3 className="text-2xl font-bold text-primary-custom line-clamp-1">
          {title}
        </h3>
        <p className="text-custom/70 text-base line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <button
            onClick={onSeeMore}
            className="w-full bg-primary-custom hover:bg-accent-custom text-black font-semibold px-5 py-3 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-primary-custom focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
