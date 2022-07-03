import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Media from "~/components/Media";
const Song = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/user/${user?._id}/recentSongs`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleDelete = (songEncodeId) => {
    axios
      .put(
        `http://localhost:8800/api/user/${user?._id}/recentSongs`,
        { songId: songEncodeId, action: "delete" },
        {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        const newData = data.filter((item) => item.encodeId !== songEncodeId);
        setData(newData);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="history-library-song">
      {data.length > 0 && (
        <ul className="list">
          {data?.map((item, index) => {
            return (
              <Media
                showBorderBottom
                showAlbum
                showDuration
                index={index}
                item={item}
                showDelete
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      )}
      {!data.length && (
        <div className="no-content background">
          <div
            className="no-content-img song"
            style={{
              backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/music-icon.cfa4aa91.svg')`,
            }}
          />
          <p className="no-content-desc">Không có bài hát nghe gần đây</p>
        </div>
      )}
    </div>
  );
};

export default Song;
