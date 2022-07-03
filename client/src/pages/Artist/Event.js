import React from "react";
import { EventIcon } from "~/assets/icons";

const Event = () => {
  return (
    <div className="no-content background">
      <div
        className="no-content-img"
        style={{
          backgroundImage:
            "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/event-icon.e8657db9.svg)",
        }}
      />
      <p className="no-content-desc">Danh sách sự kiện trống</p>
    </div>
  );
};

export default Event;
