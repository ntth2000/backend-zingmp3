import React from "react";
import Media from "~/components/Media";

const Song = ({ data }) => {
  return (
    <>
      {data && data.items ? (
        <section className="section">
          <header className="section-header">
            <h3 className="section-title">Danh sách bài hát</h3>
          </header>
          <div className="section-content">
            {data.items.map((item) => (
              <Media
                item={item}
                key={item.encodeId}
                showAlbum
                showBorderBottom
              />
            ))}
          </div>
        </section>
      ) : (
        <div className="no-content background">
          <div
            className="no-content-img song"
            style={{
              backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.31/static/media/dics-music-icon.3925fc01.svg')`,
            }}
          />
          <p className="no-content-desc">Không có bài hát</p>
        </div>
      )}
    </>
  );
};

export default Song;
