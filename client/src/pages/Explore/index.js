import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import clsx from "clsx";

import Partner from "~/components/Partners";
import Card from "~/components/Card";
import DiscoverButton from "~/components/DiscoverBtn";
import Button from "~/components/Button";
import MySwiper from "~/components/MySwiper";
import Media from "~/components/Media";
import Gallery from "~/components/Gallery/Gallery";
import useModal from "~/components/Modal";

import { fetchPageData } from "~/apiServices/pageDataServices";

import "./Explore.scss";
import ExploreLoader from "~/components/PageLoader/Page/Explore";

const Explore = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoadding] = useState(false);
  const title = document.querySelector("title");
  title.innerText =
    "Zing MP3 | Nghe tải nhạc chất lượng cao trên desktop, mobile và TV";
  const { Modal, show: showModal } = useModal();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      setIsLoadding(true);
      const result = await fetchPageData("home");
      setData(result);
      setIsLoadding(false);
    };
    fetchApi();
  }, []);

  return (
    <div className="explore">
      {isLoading && !data && <ExploreLoader />}

      {data && (
        <>
          <div className="section">
            {<Gallery items={data?.banner?.items} />}
          </div>

          {data?.playlists?.map((playlist, index) => (
            <div className="section" key={index}>
              <header className="section-header">
                <h3 className="section-title title">{playlist.title}</h3>
              </header>
              <div className="section-content">
                <MySwiper
                  navigation={false}
                  className={`explore-${playlist.sectionId}`}
                >
                  {playlist.items.map((item, index) => (
                    <SwiperSlide key={index}>
                      <Card
                        data={item}
                        showDesc={playlist.showDesc}
                        showArtists={playlist.showArtists}
                      />
                    </SwiperSlide>
                  ))}
                </MySwiper>
              </div>
            </div>
          ))}
          <div className="section explore-zingchart">
            <div className="explore-zingchart-wrapper">
              <header className="section-header">
                <h3 className="section-title title">
                  <Link to="/zing-chart">#zingchart</Link>
                  <Button
                    type="primary"
                    size="large"
                    className={"title-play-btn"}
                    hover="dark"
                  >
                    <i className="ic-play"></i>
                  </Button>
                </h3>
              </header>
              <div className="section-content">
                <ul className="list">
                  {data?.zingchart?.items.map((item, index) => {
                    return (
                      <li className="list-item" key={index}>
                        <Media
                          showOrdinal
                          showDuration
                          index={index}
                          item={item}
                          playlistId={data.zingchart.playlistId}
                        />
                      </li>
                    );
                  })}
                </ul>
                <div className="section-btn">
                  <Button
                    to="/zing-chart"
                    uppercase={false}
                    type="white-outline"
                    size="large"
                    hover="bg-bright"
                  >
                    Xem thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-content">
              <div className="row">
                {data?.weeklychart?.items.map((item, index) => (
                  <div className="col m-4 l-4 c-4" key={index}>
                    <Link to="" className="explore-weekly zoom-in">
                      <img
                        src={item.banner}
                        alt={item.name}
                        className="zoom-in-img"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section-content">
              <MySwiper
                className="explore-singers"
                breakpoints={{
                  375: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 20,
                  },
                  740: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 7,
                    slidesPerGroup: 7,
                    spaceBetween: 28,
                  },
                }}
                navigation={true}
                autoplay={{
                  delay: 1000 * 10,
                }}
              >
                {data?.singers.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={`/nghe-si/${item.singerId || item.singerName}`}
                      className="explore-singer"
                    >
                      <img
                        className="explore-singer-img"
                        src={item.img}
                        alt={item.singerName}
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </MySwiper>
            </div>
          </div>
          <div className="section explore-top100">
            <header className="section-header">
              <h3 className="section-title title">{data?.top100.title}</h3>
              <DiscoverButton to="/" />
            </header>
            <div className="section-content">
              <MySwiper
                breakpoints={{
                  375: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                  },
                  740: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 28,
                  },
                }}
                navigation={false}
                className={`explore-${data?.top100.sectionId}`}
              >
                {data?.top100.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Card
                      data={item}
                      showDesc={data?.top100.showDesc}
                      showArtists={data?.top100.showArtists}
                    />
                  </SwiperSlide>
                ))}
              </MySwiper>
            </div>
          </div>
          <div className="section">
            <header className="section-header">
              <h3 className="section-title title">Mới phát hành</h3>
              <DiscoverButton to="/moi-phat-hanh" />
            </header>
            <div className="section-content">
              <MySwiper
                className={"explore-new-release"}
                autoplay={{ delay: 1000 * 10 }}
                navigation={false}
                loop={true}
                breakpoints={{
                  375: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  740: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 28,
                  },
                }}
              >
                {data?.newReleases.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="explore-new-release-item">
                      <div
                        onClick={() => {
                          navigate("/moi-phat-hanh");
                        }}
                        className="explore-new-release-link"
                      >
                        <Media
                          item={item}
                          index={index}
                          showExplore
                          playlistId={item.album.encodeId}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <div className="explore-new-release-item">
                    <Link
                      to="/moi-phat-hanh"
                      className="explore-new-release-link view-all"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                </SwiperSlide>
              </MySwiper>
            </div>
          </div>
          <div className="section">
            <header className="section-header">
              <h3 className="section-title title">
                {data?.zingChoiceArtists.title}
              </h3>
            </header>
            <div className="section-content">
              <MySwiper
                breakpoints={{
                  375: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20,
                  },
                  740: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 28,
                  },
                }}
                navigation={false}
                autoplay={{ delay: 1000 * 20 }}
                loop={true}
                className={`explore-${data?.zingChoiceArtists.sectionId}`}
              >
                {data?.zingChoiceArtists.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      to={item.link.slice(0, -5)}
                      className="explore-zc-card zoom-in"
                    >
                      <div className="explore-zc-card-wrapper">
                        <img
                          src={item.thumbnail}
                          alt={item.artistsNames}
                          className="explore-zc-card-thumb zoom-in-img"
                        />
                      </div>
                      <div className="explore-zc-card-info">
                        <i className="ic-play is-hover-dark explore-zc-card-action play is-circle"></i>
                        <h3 className="explore-zc-card-name">
                          {item.artistsNames}
                        </h3>
                        <div className="explore-zc-card-images">
                          <div className="row p-10">
                            {item.song.items.map(
                              (item, index) =>
                                index < 4 && (
                                  <div
                                    className="col l-3 m-3 c-3 p-10"
                                    key={item.encodeId}
                                  >
                                    <img
                                      src={item.thumbnail}
                                      alt=""
                                      className="explore-zc-card-image"
                                    />
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </MySwiper>
            </div>
          </div>
          <div className="section explore-partners">
            <header className="section-header">
              <h3 className="section-title title" onClick={showModal}>
                {data?.partners.title}
              </h3>
            </header>
            <div className="section__content">
              <div className="row">
                {data?.partners.items.map((item, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "col",
                      "l-1-5",
                      "m-3",
                      "c-3",
                      index === 8 && "l-o-4-5 m-o-3 c-o-3"
                    )}
                  >
                    <div className="partner-item">
                      <img className="partner-logo" src={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Modal>
              <Partner />
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
