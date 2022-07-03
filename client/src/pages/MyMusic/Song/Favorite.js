import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Media from "~/components/Media";
import Button from "~/components/Button";
const Favorite = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/user/${user?._id}/favoriteSongs`, {
        headers: {
          token: `Bearer ${user?.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, [user?._id, user?.accessToken]);
  return (
    <>
      {data.length !== 0 ? (
        <div className="playlist">
          <div className="playlist-header">
            <div className="playlist-left">
              <span className="playlist-heading">Bài hát</span>
            </div>
            <div className="playlist-center">
              <span className="playlist-heading">Album</span>
            </div>
            <div className="playlist-right">
              <span className="playlist-heading">Thời gian</span>
            </div>
          </div>

          <ul className="list">
            {data?.map((item, index) => {
              return (
                <Media
                  showBorderBottom
                  showAlbum
                  showDuration
                  index={index}
                  item={item}
                  mediaPlaylistId={data.encodeId || null}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="no-content">
          <div className="no-content-img empty-song" />
          <p className="no-content-desc">
            Chưa có bài hát yêu thích trong thư viện cá nhân
          </p>
        </div>
      )}
    </>
  );
};

export default Favorite;
