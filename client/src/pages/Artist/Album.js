import React from "react";
import { DiscMusicIcon } from "~/assets/icons";
import Card from "~/components/Card";

const Album = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="no-content background">
        <div
          className="no-content-img"
          style={{
            backgroundImage:
              "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/dics-music-icon.3925fc01.svg)",
          }}
        />
        <p className="no-content-desc">Danh sách album trống</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {data.items.map((item, index) => {
          return (
            <div className="col p-28 l-2-4 m-3 c-6" key={index}>
              <Card
                data={item}
                showDesc={false}
                showArtists={!data.itemType}
                showDate={data.itemType}
              />
            </div>
          );
        })}
      </div>
    );
  }
};

export default Album;
