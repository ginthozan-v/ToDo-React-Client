import React from "react";

function CompletedCard({ id, title }) {
  return (
    <div className="bg-red-100 py-1 px-4 line-through font-OpenSans text-sm font-light text-red-600 rounded-lg ">
      {title}
    </div>
  );
}

export default CompletedCard;
