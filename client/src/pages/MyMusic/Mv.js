import React from "react";
import Button from "~/components/Button";
const Mv = () => {
  return (
    <div className="no-content">
      <div className="no-content-img mv" />
      <p className="no-content-desc">Chưa có MV nào trong thư viện cá nhân</p>
      <Button type="primary" size="large" hover="dark">
        Khám phá ngay
      </Button>
    </div>
  );
};

export default Mv;
