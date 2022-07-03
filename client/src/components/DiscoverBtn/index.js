import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./DiscoverBtn.scss";
const DiscoverButton = ({ to = "/" }) => {
  return (
    <Link to={to} className="discover-btn">
      Tất cả
      <span className="discover-icon">
        <i className="ic-go-right"></i>
      </span>
    </Link>
  );
};
DiscoverButton.propTypes = {
  to: PropTypes.string,
};
export default DiscoverButton;
