import React from "react";
import "../Menus.scss";
import PopperWrapper from "~/components/Popper";
import TippyHeadless from "@tippyjs/react/headless";
import ShareMenu from "../Share";
const Card = () => {
  return (
    <PopperWrapper>
      <ul className="menu-list card-menu">
        <li className="menu-item">
          <i className="menu-icon ic-add-play-now"></i> Thêm vào danh sách phát
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-comment"></i> Bình luận
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-download"></i> Tải xuống
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-link"></i> Sao chép link
        </li>
        <TippyHeadless
          placement="right-end"
          interactive={true}
          offset={[0, -10]}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <ShareMenu />
            </div>
          )}
        >
          <li className="menu-item">
            <i className="menu-icon ic-share"></i> Chia sẻ
            <i className="menu-icon-more ic-go-right"></i>
          </li>
        </TippyHeadless>
      </ul>
    </PopperWrapper>
  );
};

export default Card;
