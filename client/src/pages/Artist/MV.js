import React from "react";
import { VideoIcon } from "~/assets/icons";
import MvCard from "~/components/MvCard";

const MV = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="no-content background">
        <div
          className="no-content-img"
          style={{
            backgroundImage:
              "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/video-icon.09654360.svg)",
          }}
        />
        <p className="no-content-desc">Danh sách video trống</p>
      </div>
    );
  } else {
    return (
      <div className="row">
        {data.items.map((item, index) => {
          return (
            <div className="col p-28 l-4 m-6 c-12" key={index}>
              <MvCard data={item} />
            </div>
          );
        })}
      </div>
    );
  }
};

export default MV;
