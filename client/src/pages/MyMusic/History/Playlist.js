import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import Card from "~/components/Card";
import MySwiper from "~/components/MySwiper";
import images from "~/assets/images";
const Song = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/user/${user?._id}/recentPlaylists`, {
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="history-library-playlist">
      {data?.length > 0 && (
        <div className="row">
          {data?.map((item) => {
            return (
              !!item && (
                <div className="col l-2-4 m-4 c-6" key={item.encodeId}>
                  <Card
                    data={item}
                    showDesc={false}
                    showArtists={true}
                    showDate={false}
                  />
                </div>
              )
            );
          })}
        </div>
      )}
      {!data.length && (
        <div className="no-content background">
          <div
            className="no-content-img"
            style={{
              backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/dics-music-icon.3925fc01.svg')`,
            }}
          />
          <p className="no-content-desc">Không có Podcast nghe gần đây</p>
        </div>
      )}
    </div>
  );
};

export default Song;
