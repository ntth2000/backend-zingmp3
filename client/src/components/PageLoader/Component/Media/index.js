import React from "react";
import Icon from "~/components/Icon";
import "~/components/PageLoader/PageLoader.scss";
const Media = () => {
  return (
    <div className="media-loader">
      <div className="media-left">
        <div className="media-img loader"></div>
      </div>
      <div className="media-center">
        <div className="half-width title loader mb-10"></div>
        <div className="half-width subtitle loader"></div>
      </div>
      <div className="media-right">
        <Icon className="loader" size={32} />
        <Icon className="loader" size={32} />
        <Icon className="loader" size={32} />
      </div>
    </div>
  );
};

export default Media;
