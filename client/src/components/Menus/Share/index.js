import React from "react";
import "../Menus.scss";
import PopperWrapper from "~/components/Popper";
const Share = () => {
  return (
    <PopperWrapper>
      <ul className="menu-list share-menu">
        <li className="menu-item">
          <i className="menu-icon ic-svg-fb"></i> Facebook
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-svg-zalo"></i> Zalo
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-code"></i> Mã nhúng
        </li>
      </ul>
    </PopperWrapper>
  );
};

export default Share;
