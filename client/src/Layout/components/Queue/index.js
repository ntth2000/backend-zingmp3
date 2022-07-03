import { useState, useEffect } from "react";
import axios from "axios";
import TippyHeadless from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { Link } from "react-router-dom";

import "./Queue.scss";

import PopperWrapper from "~/components/Popper";
import Icon from "~/components/Icon";
import Media from "~/components/Media";
import { fetchAlbum } from "~/apiServices/albumServices";
import { queueActions } from "~/stores/queueSlice";
import { AddPlaylistMenu } from "~/components/Menus";

const Queue = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    currentPlaylistId,
    currentIndex,
    idList,
    items,
    currentSongId,
    clickPlaylistBtn,
  } = useSelector((state) => state.queue);
  const { showQueue } = useSelector((state) => state.ui);
  const [playlistTitle, setPlaylistTitle] = useState();
  const [albumLink, setAlbumLink] = useState("/");
  useEffect(() => {
    if (currentPlaylistId) {
      const fetchQueue = async () => {
        const result = await fetchAlbum(currentPlaylistId);
        result.title && setPlaylistTitle(result.title);
        const filteredVIPsongs = result.song.items.filter(
          (item) => item.streamingStatus !== 2
        );

        const itemsObj = {};
        const originalList = [];
        filteredVIPsongs.map((item) => {
          itemsObj[item.encodeId] = item;
          originalList.push(item.encodeId);
        });
        dispatch(queueActions.updateItems(itemsObj));
        dispatch(queueActions.updateOriginalList(originalList));
        const aliasName = result.link.split("/")[2];
        setAlbumLink(`/album/${aliasName}/${currentPlaylistId}`);
        if (clickPlaylistBtn) {
          dispatch(queueActions.updateClickPlaylistBtn(false));
        }
      };
      fetchQueue();

      {
        !!user &&
          axios
            .put(
              `http://localhost:8800/api/user/${user._id}/recentPlaylists`,
              { playlistId: currentPlaylistId, action: "add" },
              {
                headers: {
                  token: `Bearer ${user.accessToken}`,
                },
              }
            )
            .then((res) => res.data)
            .catch((error) => console.log(error));
      }
    }
  }, [currentPlaylistId, clickPlaylistBtn]);

  return (
    <aside className={clsx("queue", showQueue && "show")}>
      <header className="queue-header">
        <div className="tabs">
          <span className="tab active">Danh sách phát</span>
          <span className="tab">Nghe gần đây</span>
        </div>
        <div className="queue-clock">
          <Icon
            background
            placement="bottom"
            content="Hẹn giờ dừng phát nhạc"
            size={32}
            iconSize={16}
          >
            <i className="ic-20-Clock"></i>
          </Icon>
        </div>
        <TippyHeadless
          placement="bottom-end"
          trigger="click"
          offset={[0, -10]}
          interactive={true}
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <ul className="menu-list">
                  <li className="menu-item">
                    <i className="menu-icon ic-delete"></i>
                    Xóa danh sách phát
                  </li>
                  <li className="menu-item">
                    <i className="menu-icon ic-download"></i>
                    Tải danh sách phát
                  </li>
                  <TippyHeadless
                    placement="left-start"
                    interactive={true}
                    offset={[-30, -10]}
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        <AddPlaylistMenu />
                      </div>
                    )}
                  >
                    <li className="menu-item">
                      <i className="menu-icon ic-16-Add"></i>
                      Thêm vào playlist
                      <i className="menu-icon-more ic-go-right"></i>
                    </li>
                  </TippyHeadless>
                </ul>
              </PopperWrapper>
            </div>
          )}
        >
          <Icon
            background
            size={32}
            iconSize={16}
            placement="bottom"
            content="Khác"
            className="queue-more"
          >
            <i className="ic-more"></i>
          </Icon>
        </TippyHeadless>
      </header>
      <div className="queue-list bright-scrollbar">
        {idList?.map((item, index) => (
          <div key={item}>
            <Media
              item={items[item]}
              index={index}
              currentIndex={currentIndex}
              showPopper={false}
              playlistId={currentPlaylistId}
            />
            {item === currentSongId &&
              playlistTitle &&
              index < idList.length - 1 && (
                <div className="queue-separation">
                  <h4 className="queue-separation-heading">Tiếp theo</h4>
                  {currentPlaylistId && (
                    <p className="queue-separation-desc">
                      Từ playlist
                      <Link to={albumLink} className="queue-separation-title">
                        {playlistTitle}
                      </Link>
                    </p>
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Queue;
