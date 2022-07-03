import React from "react";
import Button from "~/components/Button";
const Upload = () => {
  return (
    <div className="no-content">
      <div className="no-content-img upload-song" />
      <p className="no-content-desc">
        Chưa có bài hát tải lên trong thư viện các nhân
      </p>
      <Button size="large" type="primary" hover="dark">
        Tải lên ngay
      </Button>
    </div>
  );
};

export default Upload;
