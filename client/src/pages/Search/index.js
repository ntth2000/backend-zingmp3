import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

import "./Search.scss";

import ArtistCard from "~/components/ArtistCard";
import DiscoverButton from "~/components/DiscoverBtn";
import MvCard from "~/components/MvCard";
import MySwiper from "~/components/MySwiper";
import { SwiperSlide } from "swiper/react";
import Card from "~/components/Card";
import Media from "~/components/Media";
import { SearchLoader } from "~/components/PageLoader/Page";
const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    console.log("search is loading?", isLoading);
    axios
      .get("http://localhost:8800/api/search", {
        params: { q: searchText },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
    console.log("search is loading?", isLoading);
    setIsLoading(false);
  }, [searchText]);
  return (
    <div className="search">
      <header className="search-header">
        <h2 className="search-title title hide-on-tablet-mobile">
          Kết quả tìm kiếm
        </h2>
        <nav className="search-nav">
          <ul className="search-links">
            <NavLink className="search-link" to={location.search}>
              Tất cả
            </NavLink>
            <p className="search-link">Bài hát</p>
            <p className="search-link">Playlist/album</p>
            <p className="search-link">Nghệ sĩ/OA</p>
            <p className="search-link">MV</p>
          </ul>
        </nav>
      </header>

      {isLoading && !data && (
        <div>
          aa {console.log("search loading")}
          <SearchLoader />
        </div>
      )}

      {data && (
        <>
          {!data ||
            (!data?.counter.song &&
              !data?.counter.video &&
              !data?.counter.playlist &&
              !data?.counter.artist && (
                <div className="no-content background">
                  <div
                    className="no-content-img song"
                    style={{
                      backgroundImage: `url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.31/static/media/dics-music-icon.3925fc01.svg')`,
                    }}
                  />
                  <p className="no-content-desc">
                    Không có kết quả được tìm thấy
                  </p>
                </div>
              ))}
          {!!data && (
            <div className="search-main">
              {!!data?.songs && (
                <section className="section song">
                  <header className="section-header">
                    <h3 className="section-title title">Bài hát</h3>
                    <DiscoverButton to={location.search} />
                  </header>
                  <div className="section-content">
                    {data?.songs.map((item) => (
                      <Media
                        key={item.encodeId}
                        item={item}
                        showDesc={false}
                        showAlbum={true}
                        showBorderBottom={true}
                        showDuration={true}
                      />
                    ))}
                  </div>
                </section>
              )}
              {!!data?.playlists && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">Playlist/Album</h3>
                    <DiscoverButton to={location.search} />
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
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 28,
                        },
                      }}
                      navigation={false}
                      className={`search-playlist`}
                    >
                      {data?.playlists?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <Card data={item} showDesc={false} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
              {!!data.videos && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">MV</h3>
                    <DiscoverButton to={location.search} />
                  </header>
                  <div className="section-content">
                    <MySwiper
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
                      navigation={false}
                      className={`search-video`}
                    >
                      {data.videos.map((item, index) => (
                        <SwiperSlide key={index}>
                          <MvCard data={item} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
              {!!data.artists && (
                <section className="section">
                  <header className="section-header">
                    <h3 className="section-title title">Nghệ Sĩ/OA</h3>
                    <DiscoverButton to={location.search} />
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
                          slidesPerView: 4,
                          slidesPerGroup: 4,
                          spaceBetween: 24,
                        },
                        1024: {
                          slidesPerView: 5,
                          slidesPerGroup: 5,
                          spaceBetween: 28,
                        },
                      }}
                      navigation={false}
                      className={`search-artist`}
                    >
                      {data?.artists?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <ArtistCard item={item} />
                        </SwiperSlide>
                      ))}
                    </MySwiper>
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Search;
