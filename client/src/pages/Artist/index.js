import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, useParams } from "react-router-dom";
import "./Artist.scss";

import { fetchArtist } from "~/apiServices/artistServices";
import Button from "~/components/Button";
import Media from "~/components/Media";
import useModal from "~/components/Modal";
import { ArtistLoader } from "~/components/PageLoader/Page";
import useFormatFollowers from "~/hooks/useFormatFollowers";
import Album from "./Album";
import Biography from "./Biography";
import Event from "./Event";
import Home from "./Home";
import MV from "./MV";
import Single from "./Single";
import Song from "./Song";

const Artist = () => {
  const { Modal, show } = useModal();
  const { name } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const followers = useFormatFollowers(data?.follow);
  function getSectionData(sectionName, originalData) {
    const result = originalData.sections.filter(
      (item) => item.title === sectionName
    );
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const result = await fetchArtist(name);
      setData(result);
      setIsLoading(false);
      console.log(result);
      const title = document.querySelector("title");
      title.innerText = `${result.name} - Zing MP3 Official Account`;
    };
    fetchApi();
  }, [name]);

  useEffect(() => {
    const layout = document.querySelector(".layout-content");
    layout.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [name]);

  return (
    <div className="artist">
      {data && !isLoading && (
        <>
          <header className="artist-header">
            <div className="row">
              <div className="col l-7 m-7 c-12">
                <div className="artist-header-left">
                  <h2 className="artist-title title">{data?.name}</h2>
                  {data.sortBiography && (
                    <p className="artist-bio">
                      {data?.sortBiography}
                      <button className="artist-bio-more" onClick={show}>
                        ...Xem thêm
                      </button>
                      <Modal>
                        <Biography
                          biography={data?.biography}
                          thumbnailM={data?.thumbnailM}
                          name={data?.name}
                        />
                      </Modal>
                    </p>
                  )}
                  <div className="artist-actions">
                    <Button
                      hover="dark"
                      type="primary"
                      size="large"
                      iconLeft={<i className="ic-play"></i>}
                    >
                      Phát nhạc
                    </Button>
                    <Button hover="dark" type="primary" size="large">
                      Quan tâm
                      <span className="artist-header-dot is-circle"></span>
                      {followers}
                    </Button>
                    {data?.topAlbum && (
                      <Media item={data?.topAlbum} desc="Mới nhất" showDate />
                    )}
                  </div>
                </div>
              </div>
              <div className="col l-5 m-5 c-0">
                <div className="artist-header-right">
                  <img
                    src={data?.thumbnailM}
                    alt={data?.name}
                    className="artist-thumb is-circle"
                  />
                </div>
              </div>
            </div>
          </header>
          <div className="artist-navbar">
            <ul className="tabs">
              <li>
                <NavLink className="tab" to={``} end>
                  Tổng quan
                </NavLink>
              </li>

              <li>
                <NavLink className="tab" to={`event`}>
                  Sự kiện
                </NavLink>
              </li>

              <li>
                <NavLink className="tab" to={`bai-hat`}>
                  Bài hát
                </NavLink>
              </li>

              <li>
                <NavLink className="tab" to={`single`}>
                  Single &amp; Ep
                </NavLink>
              </li>

              <li>
                <NavLink className="tab" to={`album`}>
                  Album
                </NavLink>
              </li>

              <li>
                <NavLink className="tab" to={`video`}>
                  MV
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="artist-main">
            {data.sections && (
              <Routes>
                <Route path="/*" element={<Home data={data} />} />
                <Route path="/event" element={<Event />} />
                <Route
                  path="single"
                  element={
                    <Single data={getSectionData("Single & EP", data)} />
                  }
                />
                <Route
                  path="bai-hat"
                  element={
                    <Song data={getSectionData("Bài hát nổi bật", data)} />
                  }
                />

                <Route
                  path="album"
                  element={<Album data={getSectionData("Album", data)} />}
                />

                <Route
                  path="video"
                  element={<MV data={getSectionData("MV", data)} />}
                />
              </Routes>
            )}
            {!data.sections && (
              <div className="no-content background">
                <div
                  className="no-content-img"
                  style={{
                    backgroundImage:
                      "url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.30/static/media/music-icon.cfa4aa91.svg)",
                  }}
                />
                <p className="no-content-desc">Không có dữ liệu để hiển thị</p>
              </div>
            )}
          </div>
        </>
      )}
      {!data && isLoading && <ArtistLoader />}
    </div>
  );
};

export default Artist;
