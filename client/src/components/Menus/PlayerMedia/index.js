import PropTypes from "prop-types";
import TippyHeadless from "@tippyjs/react/headless";

import "../Menus.scss";
import PopperWrapper from "~/components/Popper";
import ShareMenu from "../Share";
import AddPlaylist from "../AddPlaylist";
const PlayerMedia = ({ item }) => {
  return (
    <PopperWrapper>
      <ul className="menu-list media-menu">
        <div className="media-left">
          <div className="media-img">
            <img
              src={item?.thumbnail}
              alt={item?.title}
              className="media-thumbnail"
            />
          </div>
          <div className="media-info">
            <h4 className="media-name">{item?.title}</h4>
            <div className="media-singers">
              {item?.artists ? (
                item?.artists.map((artist, index) => (
                  <span key={index}>
                    <span className="artist-name-comp">{artist.name}</span>
                    {index < item?.artists.length - 1 ? ", " : ""}
                  </span>
                ))
              ) : (
                <span>{item?.artistsNames ? item?.artistsNames : ""}</span>
              )}
            </div>
          </div>
        </div>
        <div className="menu-options">
          <div className="menu-option">
            <i className="menu-icon ic-download"></i>
            Tải xuống
          </div>
          <div className="menu-option">
            <i className="menu-icon ic-16-Lyric"></i>
            Lời bài hát
          </div>
          <div className="menu-option">
            <i className="menu-icon ic-denial"></i>
            Chặn
          </div>
        </div>

        <TippyHeadless
          placement="left"
          interactive={true}
          offset={[0, -10]}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <AddPlaylist />
            </div>
          )}
        >
          <li className="menu-item">
            <i className="menu-icon ic-add-play-now"></i> Thêm vào playlist
            <i className="menu-icon-more ic-go-right"></i>
          </li>
        </TippyHeadless>
        <li className="menu-item">
          <i className="menu-icon ic-radio"></i> Phát Radio của bài hát
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-karaoke"></i> Phát cùng lời bài hát
        </li>
        <li className="menu-item">
          <i className="menu-icon ic-comment"></i> Bình luận
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
PlayerMedia.propTypes = {
  item: PropTypes.object.isRequired,
};
export default PlayerMedia;
