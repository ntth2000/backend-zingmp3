import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import TippyHeadless from "@tippyjs/react/headless";
import PropTypes from "prop-types";

import ArtistName from "~/components/ArtistName";
import Icon from "~/components/Icon";
import images from "~/assets/images";
import useToast from "~/components/Toast";

import "./Media.scss";
import { playerActions } from "~/stores/playerSlice";
import { queueActions } from "~/stores/queueSlice";
import { Link, useNavigate } from "react-router-dom";
import { MediaMenu } from "~/components/Menus";
const Media = ({
  item,
  index,
  playlistId,
  showAlbum = false,
  showDuration = false,
  showBorderBottom = false,
  showOrdinal = false,
  desc = "",
  showDate = false,
  showExplore = false,
  showSpotlight = false,
  showDelete = false,
  handleDelete = () => {},
}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isVIP = item.streamingStatus === 2;
  const [like, setLike] = useState(false);
  const { currentSongId, currentPlaylistId, idList } = useSelector(
    (state) => state.queue
  );

  const { isPlaying, fetchingStatus } = useSelector((state) => state.player);

  const duration = item
    ? `${Math.floor(item?.duration / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(item?.duration % 60)
        .toString()
        .padStart(2, "0")}`
    : 120;

  const mediaClasses = clsx(
    "media",
    showAlbum && "show-album",
    showDuration && "show-duration",
    showBorderBottom && "show-border-bottom",
    item?.encodeId === currentSongId && "active",
    isVIP ? "vip" : ""
  );
  const ordinal = index + 1;
  const albumLink = item?.album?.link
    ? `/album/${item.album.link.split("/")[2]}/${item.album.encodeId}`
    : "";

  const handleClick = () => {
    if (isVIP) {
      toast("Chỉ dành cho tài khoản VIP");
    } else {
      if (
        playlistId !== currentPlaylistId ||
        !idList.includes(item?.encodeId)
      ) {
        dispatch(queueActions.updatePlaylistId(playlistId || null));
        if (currentPlaylistId === null) {
          dispatch(queueActions.updateOriginalList([item?.encodeId]));
          dispatch(queueActions.updateItems({ [item.encodeId]: item }));
        }
        dispatch(playerActions.pauseMusic());
        dispatch(queueActions.updateCurrentSong(item?.encodeId));
        dispatch(playerActions.setAutoplay(true));
      } else {
        if (item?.encodeId === currentSongId) {
          dispatch(playerActions.toggleMusic());
        } else {
          dispatch(playerActions.pauseMusic());
          dispatch(queueActions.updateCurrentSong(item?.encodeId));
          dispatch(playerActions.setAutoplay(true));
        }
      }
    }
  };

  const handleToggleLikeBtn = () => {
    setLike((prev) => !prev);
    if (like) {
      toast("Đã xóa bài hát khỏi thư viện");
    } else {
      toast("Đã thêm bài hát vào thư viện");
    }
  };

  return (
    <div className={mediaClasses}>
      <div className="media-left">
        {showOrdinal && (
          <>
            <span className={`media-ordinal ordinal-${ordinal}`}>
              {ordinal}
            </span>
            <span className="media-ordinal-separator"></span>
          </>
        )}
        <div className="media-img" onClick={handleClick}>
          <img
            src={item?.thumbnail}
            alt={item?.title}
            className="media-thumbnail"
          />
          {item?.encodeId === currentSongId && isPlaying ? (
            <img className="media-icon" src={images.playingGif} />
          ) : (
            <i className="media-icon ic-play"></i>
          )}
        </div>
        <div className="media-info">
          {desc && <p className="media-desc">{desc}</p>}
          <h4 className="media-name">
            {item?.title}
            {isVIP && (
              <img
                className="media-vip"
                src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.24/static/media/vip-label.3dd6ac7e.svg"
                alt="VIP"
              />
            )}
          </h4>
          <div className="media-singers">
            {item?.artists ? (
              item?.artists.map((artist, index) => (
                <span key={index}>
                  <ArtistName artist={artist} showSpotlight={showSpotlight} />
                  {index < item?.artists.length - 1 ? ", " : ""}
                </span>
              ))
            ) : (
              <span>{item?.artistsNames ? item?.artistsNames : ""}</span>
            )}
          </div>
          {showExplore && (
            <div className="media-explore">
              <p className="media-explore-ordinal">#{index + 1}</p>
              {item?.album && (
                <p className="media-explore-date">{item?.album.releaseDate}</p>
              )}
            </div>
          )}
          {showDate && (
            <p className="media-release-date">{item?.releaseDate}</p>
          )}
        </div>
      </div>

      <div className="media-center hide-on-mobile">
        <Link to={albumLink} className="media-album">
          {item ? item?.album?.title : ""}
        </Link>
      </div>

      <div className="media-right">
        <div className="media-actions">
          <Icon
            placement="top"
            content={like ? "Xoá khỏi thư viện" : "Thêm vào thư viện"}
            size={32}
            iconSize={16}
            hover="bright"
            space={7}
            onClick={handleToggleLikeBtn}
          >
            {like ? (
              <i className="ic-like-full"></i>
            ) : (
              <i className="ic-like"></i>
            )}
          </Icon>

          <TippyHeadless
            trigger="click"
            placement="left"
            appendTo={() => document.body}
            interactive={true}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <MediaMenu item={item} />
              </div>
            )}
          >
            <Icon
              size={32}
              iconSize={16}
              hover="bright"
              placement="top"
              content="Xem thêm"
              space={7}
            >
              <i className="ic-more"></i>
            </Icon>
          </TippyHeadless>
          {showDelete && (
            <Icon
              size={32}
              iconSize={16}
              hover="bright"
              placement="top"
              content="Xóa"
              space={7}
              onClick={() => handleDelete(item.encodeId)}
            >
              <i className="ic-close"></i>
            </Icon>
          )}
        </div>
        <div className="media-duration">{duration}</div>
      </div>
    </div>
  );
};

Media.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number,
  playlistId: PropTypes.string,
  showAlbum: PropTypes.bool,
  showDuration: PropTypes.bool,
  showBorderBottom: PropTypes.bool,
  showOrdinal: PropTypes.bool,
  desc: PropTypes.string,
  showDate: PropTypes.bool,
  showExplore: PropTypes.bool,
  showSpotlight: PropTypes.bool,
  showDelete: PropTypes.bool,
  handleDelete: PropTypes.func,
};
export default Media;
