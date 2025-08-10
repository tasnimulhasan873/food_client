import React from "react";

const Card = ({
  image,
  title,
  description,
  onSeeMore,
  buttonText = "See more",
}) => {
  return (
    <div className="bg-primary text-secondary rounded-xl shadow-lg overflow-hidden border border-accent flex flex-col h-full w-full max-w-xs mx-auto min-h-[420px]">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-cover border-b border-accent"
      />
      <div className="p-6 flex flex-col flex-grow space-y-3">
        <h3 className="text-2xl font-bold text-secondary line-clamp-1">
          {title}
        </h3>
        <p className="text-secondary/80 text-base line-clamp-3 flex-grow">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <button
            onClick={onSeeMore}
            className="w-full bg-accent hover:bg-secondary text-base-100 font-semibold px-5 py-3 rounded-lg transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
