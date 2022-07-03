import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import images from "~/assets/images";
import "./History.scss";
import Song from "./Song";
import Playlist from "./Playlist";

const History = () => {
  return (
    <div className="history">
      <header className="history-header">
        <h3 className="history-title">Phát gần đây</h3>
        <ul className="history-links">
          <NavLink to={`song`} className="my-music-header-link">
            Bài hát
          </NavLink>

          <NavLink to={`playlist`} className="my-music-header-link">
            Playlist
          </NavLink>
          <NavLink to={`mv`} className="my-music-header-link">
            MV
          </NavLink>
          <NavLink to={`podcast`} className="my-music-header-link">
            Podcast
          </NavLink>
        </ul>
      </header>
      <Routes>
        <Route path="song" element={<Song />} />
        <Route path="playlist" element={<Playlist />} />

        <Route
          path="mv"
          element={
            <div className="no-content background">
              <div
                className="no-content-img"
                style={{
                  backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/video-icon.09654360.svg')`,
                }}
              />
              <p className="no-content-desc">Không có MV nghe gần đây</p>
            </div>
          }
        />
        <Route
          path="podcast"
          element={
            <div className="no-content background">
              <div
                className="no-content-img"
                style={{
                  backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/dics-music-icon.3925fc01.svg')`,
                }}
              />
              <p className="no-content-desc">Không có Podcast nghe gần đây</p>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default History;
