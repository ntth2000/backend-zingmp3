import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";
import clsx from "clsx";
import TippyHeadless from "@tippyjs/react/headless";

import "./Album.scss";
import ArtistName from "~/components/ArtistName";
import Button from "~/components/Button";
import images from "~/assets/images";
import MySwiper from "~/components/MySwiper";
import Icon from "~/components/Icon";
import ArtistCard from "~/components/ArtistCard";
import Card from "~/components/Card";
import Media from "~/components/Media";
import { CardMenu } from "~/components/Menus";
import { fetchAlbum, fetchSectionBottom } from "~/apiServices/albumServices";

import { playerActions } from "~/stores/playerSlice";
import { queueActions } from "~/stores/queueSlice";
import useFormatFollowers from "~/hooks/useFormatFollowers";
import AlbumLoader from "~/components/PageLoader/Page/Album";

const Album = () => {
  const dispatch = useDispatch();
  const { isPlaying } = useSelector((state) => state.player);
  const { currentPlaylistId } = useSelector((state) => state.queue);
  const [like, setLike] = useState(false);
  const { albumId } = useParams();
  const [data, setData] = useState();
  const [sectionBottom, setSectionBottom] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const layout = document.querySelector(".layout-content");
    layout.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [albumId]);
  useEffect(() => {
    const fetchAlbumDetail = async () => {
      setIsLoading(true);
      const result = await fetchAlbum(albumId);

      setData(result);
      const title = document.querySelector("title");
      title.innerText = `${result.title}`;
    };

    const fetchBottom = async () => {
      const result = await fetchSectionBottom(albumId);
      setSectionBottom(result);
      setIsLoading(false);
    };

    fetchAlbumDetail();
    fetchBottom();
  }, [albumId]);

  const handleClick = () => {
    if (albumId === currentPlaylistId) {
      dispatch(playerActions.toggleMusic());
    } else {
      dispatch(playerActions.pauseMusic());
      dispatch(queueActions.updateClickPlaylistBtn(true));
      dispatch(queueActions.updatePlaylistId(albumId));
      dispatch(playerActions.setAutoplay(true));
    }
  };

  const likes = useFormatFollowers(data?.like);
  return (
    <div className="album">
      {!data && isLoading && <AlbumLoader />}
      {data && (
        <>
          <div className="album-detail">
            <div className="album-info">
              <div
                className={clsx(
                  "media",
                  albumId === currentPlaylistId && isPlaying && "active"
                )}
              >
                <div className="media-img zoom-in" onClick={handleClick}>
                  <img
                    src={data?.thumbnailM}
                    alt={data?.title}
                    className="media-thumbnail zoom-in-img"
                  />
                  {isPlaying && albumId === currentPlaylistId ? (
                    <span className="media-icon-wrapper is-circle">
                      <img src={images.playingGif} className={"media-icon"} />
                    </span>
                  ) : (
                    <i className="ic-play-circle-outline media-icon"></i>
                  )}
                </div>
                <div className="media-content">
                  <div className="media-info">
                    <h4 className="media-name">{data?.title}</h4>
                    <p className="media-update-time">{"15/05/2022"}</p>
                    <div className="media-singers">
                      {data?.artists ? (
                        data?.artists.map((artist, index) => (
                          <span key={index}>
                            <ArtistName artist={artist} />
                            {index < data?.artists.length - 1 ? ", " : ""}
                          </span>
                        ))
                      ) : (
                        <span>
                          {data?.artistsNames ? data?.artistsNames : ""}
                        </span>
                      )}
                    </div>
                    <p className="media-likes">{likes} người yêu thích</p>
                  </div>
                  <div className="album-actions">
                    <Button
                      type="primary"
                      size="large"
                      className="album-btn"
                      onClick={handleClick}
                      iconLeft={
                        albumId === currentPlaylistId && isPlaying ? (
                          <i className="ic-pause"></i>
                        ) : (
                          <i className="ic-play"></i>
                        )
                      }
                    >
                      {albumId === currentPlaylistId && isPlaying && "Tạm dừng"}
                      {albumId === currentPlaylistId &&
                        !isPlaying &&
                        "Tiếp tục phát"}
                      {albumId !== currentPlaylistId && "Phát ngẫu nhiên"}
                    </Button>
                    <div className="media-actions">
                      <Icon
                        placement="top"
                        content={
                          like ? "Xoá khỏi thư viện" : "Thêm vào thư viện"
                        }
                        size={35}
                        iconSize={16}
                        background
                        space={10}
                        onClick={() => {
                          setLike((prev) => !prev);
                        }}
                      >
                        {like ? (
                          <i className="ic-like-full"></i>
                        ) : (
                          <i className="ic-like"></i>
                        )}
                      </Icon>
                      <TippyHeadless
                        trigger="click"
                        placement="right-start"
                        appendTo={() => document.body}
                        interactive={true}
                        hideOnClick={true}
                        render={(attrs) => (
                          <div className="box" tabIndex="-1" {...attrs}>
                            <CardMenu />
                          </div>
                        )}
                      >
                        <Icon
                          size={35}
                          iconSize={16}
                          background
                          placement="top"
                          content="Xem thêm"
                          space={10}
                        >
                          <i className="ic-more"></i>
                        </Icon>
                      </TippyHeadless>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="album-songs">
              {data?.description && (
                <p className="album-desc hide-on-tablet-mobile">
                  Lời tựa
                  <span className="album-desc-content">
                    {data?.description}
                  </span>
                </p>
              )}
              <div className="album-songs-content">
                <div className="playlist">
                  <div className="playlist-header">
                    <div className="playlist-left">
                      <span className="playlist-heading">Bài hát</span>
                    </div>
                    <div className="playlist-center hide-on-mobile">
                      <span className="playlist-heading">Album</span>
                    </div>
                    <div className="playlist-right">
                      <span className="playlist-heading">Thời gian</span>
                    </div>
                  </div>

                  <ul className="list">
                    {data?.song.items.map((item) => {
                      return (
                        <Media
                          showBorderBottom
                          showAlbum
                          showDuration
                          item={item}
                          playlistId={data?.encodeId}
                          key={item.encodeId}
                        />
                      );
                    })}
                  </ul>
                </div>
                <p className="album-song-number">
                  {data?.song.items.length} bài hát
                </p>
              </div>
            </div>
          </div>
          {sectionBottom && (
            <div className="section-bottom">
              {sectionBottom?.map((section, index) => {
                return (
                  section.items && (
                    <div className="section" key={index}>
                      <header className="section-header">
                        <h3 className="section-title title">{section.title}</h3>
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
                          navigation={true}
                          className={`album-section-bottom-${index}`}
                          showDefaultNavigation={false}
                        >
                          {section.sectionType === "playlistOfArtist" && (
                            <SwiperSlide>
                              <ArtistCard
                                item={section.sectionValue}
                                showButton={false}
                                showFollow={false}
                              />
                            </SwiperSlide>
                          )}
                          {section.items.map((item, index) => (
                            <SwiperSlide key={index}>
                              {section.sectionType === "artist" && (
                                <ArtistCard item={item} />
                              )}
                              {["playlist", "playlistOfArtist"].includes(
                                section.sectionType
                              ) && (
                                <Card
                                  key={item.encodeId}
                                  data={item}
                                  showDesc={false}
                                  showArtists={!section.itemType}
                                  showDate={section.itemType}
                                />
                              )}
                            </SwiperSlide>
                          ))}
                        </MySwiper>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Album;
