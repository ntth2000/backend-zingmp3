import "./Partner.scss";

const Partner = () => {
  const partners = {
    title: "Đối tác âm nhạc",
    items: [
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/Kakao-M.png",
      "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png",
    ],
  };
  return (
    <div className="partner grid">
      <h3 className="title partner-title">Đối tác âm nhạc</h3>
      <div className="row">
        {partners.items.map((item, index) => (
          <div key={index} className="col l-2-4 m-3 c-3">
            <div className="partner-item">
              <img src={item} alt="Partner" className="partner-logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partner;
