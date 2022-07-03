import React from "react";
import { Routes, Route } from "react-router-dom";
import Button from "~/components/Button";

const Podcast = () => {
  return (
    <>
      <Routes>
        <Route
          path="new-episode"
          element={
            <div className="no-content">
              <div className="no-content-img new-episode" />
              <p className="no-content-desc">Không có tập mới</p>
            </div>
          }
        />
        <Route
          path="saved-episode"
          element={
            <div className="no-content">
              <div className="no-content-img saved-episode" />
              <p className="no-content-desc">Không có tập đã lưu</p>
            </div>
          }
        />
        <Route
          path="followed-program"
          element={
            <div className="no-content">
              <div className="no-content-img followed-program" />
              <p className="no-content-desc">
                Không có podcast trong thư viện cá nhân
              </p>
              <Button type="primary" hover="dark" size="large">
                Tải lên ngay
              </Button>
            </div>
          }
        />
      </Routes>
    </>
  );
};

export default Podcast;
