import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import MySwiper from "~/components/MySwiper";
import Media from "~/components/Media";
import DiscoverButton from "~/components/DiscoverBtn";
import ArtistCard from "~/components/ArtistCard";
import Card from "~/components/Card";
import MvCard from "~/components/MvCard";
const Home = ({ data }) => {
  const [animationActive, setAnimationActive] = useState({
    first: 1,
    second: 0,
  });

  const animationLength = data?.sections[0].items.length;

  useEffect(() => {
    setInterval(() => {
      setAnimationActive((prev) => {
        if (prev.first === animationLength - 1) {
          return {
            first: 0,
            second: animationLength - 1,
          };
        } else if (prev.second === animationLength - 1) {
          return {
            first: 1,
            second: 0,
          };
        } else {
          return {
            first: prev.first + 1,
            second: prev.second + 1,
          };
        }
      });
    }, 3000);
  }, []);
  return (
    <>
      {data && data?.sections[0].sectionType === "song" && (
        <div className="section popular-songs">
          <div className="section-header">
            <h2 className="section-title title">{data?.sections[0].title}</h2>
          </div>
          <div className="section-content">
            <div className="thumbnail-animation hide-on-tablet-mobile">
              <ul className="thumbnail-list">
                {data?.sections[0].items.map((item, index) => {
                  return (
                    <li
                      className={clsx(
                        "thumbnail-item",
                        index === animationActive.second && "second",
                        index === animationActive.first && "first"
                      )}
                      key={index}
                    >
                      <img
                        src={item.thumbnailM}
                        alt={item.title}
                        className="thumbnail-img"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul className="list bright-scrollbar">
              {data?.sections[0]?.items.map((item, index) => {
                return (
                  <li className="list-item" key={index}>
                    <Media
                      showDuration
                      index={index}
                      showBorderBottom
                      item={item}
                      showAlbum
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {data &&
        data?.sections.map((section, index) => {
          return (
            section?.sectionType !== "song" &&
            !!section?.items && (
              <div className="section" key={index}>
                <header className="section-header">
                  <h3 className="section-title title">{section?.title}</h3>
                  {section?.sectionType !== "artist" &&
                    section?.items.length > 5 && (
                      <DiscoverButton to={`${section?.link}`} />
                    )}
                </header>
                <div className="section-content">
                  <MySwiper
                    breakpoints={
                      section?.sectionType === "video"
                        ? {
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
                          }
                        : {
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
                          }
                    }
                    navigation={false}
                    className={`explore-${section?.sectionId}`}
                  >
                    {section?.items?.map((item, index) => (
                      <SwiperSlide key={index}>
                        {section?.sectionType === "artist" && (
                          <ArtistCard item={item} />
                        )}
                        {section?.sectionType === "video" && (
                          <MvCard data={item} />
                        )}
                        {section?.sectionType === "playlist" && (
                          <Card
                            data={item}
                            showDesc={false}
                            showArtists={!section?.itemType}
                            showDate={section?.itemType}
                            showSpotlight={true}
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
    </>
  );
};

export default Home;
