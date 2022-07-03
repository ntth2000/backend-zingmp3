import React from "react";
import "~/components/PageLoader/PageLoader.scss";
const Card = () => {
  return (
    <div>
      <div className="loader square"></div>
      <div className="loader full-width title mb-10"></div>
      <div className="loader half-width subtitle"></div>
    </div>
  );
};

export default Card;
