import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import Button from "~/components/Button";
import Media from "~/components/Media";
import { fetchPageData } from "~/apiServices/pageDataServices";

import "./ZingChart.scss";
import { ListLoader as ZingChartLoader } from "~/components/PageLoader/Component";
const ZingChart = () => {
  const title = document.querySelector("title");
  title.innerText =
    "#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại";
  const [data, setData] = useState();
  const [showTop100, setShowTop100] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchPageData("zing-chart");
      setData(result);
    };
    fetchApi();
  }, []);
  return (
    <div className="zing-chart">
      <div className="section">
        <div className={clsx("zing-chart-top100", showTop100 && "show-all")}>
          <div className="zing-chart-header">
            <h2 className="zing-chart-title title">#zingchart</h2>
            <Button
              type="primary"
              size="large"
              className={"title-play-btn"}
              hover="dark"
              iconLeft={<i className="ic-play"></i>}
            ></Button>
          </div>
          {!data && <ZingChartLoader />}
          {data && (
            <ul className="list">
              {data.RTChart.items.map((item, index) => {
                return (
                  <Media
                    key={index}
                    showBorderBottom
                    showAlbum
                    showOrdinal
                    showDuration
                    index={index}
                    item={item}
                    mediaPlaylistId={data.RTChart.playlistId}
                  />
                );
              })}
            </ul>
          )}
          {data && !showTop100 && (
            <div
              className="section-btn"
              onClick={() => {
                setShowTop100(true);
              }}
            >
              <Button
                uppercase={false}
                type="current-color-outline"
                size="large"
                hover="bg-bright"
              >
                Xem top 100
              </Button>
            </div>
          )}
        </div>
      </div>
      {data && (
        <div className="section">
          <div className="zing-chart-week">
            <div className="zing-chart-header">
              <h2 className="zing-chart-title title">Bảng xếp hạng tuần</h2>
            </div>
            <div className="row">
              <div className="col l-4 m-12 c-12">
                <div className="zing-chart-week-box">
                  <header className="zing-chart-header">
                    <h3 className="zing-chart-title title">
                      <Link className="zing-chart-link" to="">
                        Việt Nam
                      </Link>
                    </h3>
                    <Button
                      type="primary"
                      size="large"
                      className={"title-play-btn"}
                      hover="dark"
                      iconLeft={<i className="ic-play"></i>}
                    ></Button>
                  </header>

                  <div className="list">
                    {data.weekChart.vn.items.map((item, index) => {
                      return (
                        index < 5 && (
                          <Media
                            key={index}
                            showDuration
                            index={index}
                            item={item}
                            mediaPlaylistId={data.weekChart.vn.playlistId}
                            showOrdinal={true}
                          />
                        )
                      );
                    })}
                  </div>
                  <div className="section-btn">
                    <Button
                      uppercase={false}
                      type="current-color-outline"
                      size="large"
                      hover="bg-bright"
                    >
                      Xem tất cả
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col p-28 l-4 m-12 c-12">
                <div className="zing-chart-week-box">
                  <header className="zing-chart-header">
                    <h3 className="zing-chart-title title">
                      <Link className="zing-chart-link" to="">
                        US-UK
                      </Link>
                    </h3>
                    <Button
                      type="primary"
                      size="large"
                      className={"title-play-btn"}
                      hover="dark"
                      iconLeft={<i className="ic-play"></i>}
                    ></Button>
                  </header>

                  <div className="list">
                    {data.weekChart.us.items.map((item, index) => {
                      return (
                        index < 5 && (
                          <Media
                            key={index}
                            showDuration
                            index={index}
                            item={item}
                            mediaPlaylistId={data.weekChart.us.playlistId}
                            showOrdinal={true}
                          />
                        )
                      );
                    })}
                  </div>

                  <div className="section-btn">
                    <Button
                      uppercase={false}
                      type="current-color-outline"
                      size="large"
                      hover="bg-bright"
                    >
                      Xem tất cả
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col p-28 l-4 m-12 c-12">
                <div className="zing-chart-week-box">
                  <header className="zing-chart-header">
                    <h3 className="zing-chart-title title">
                      <Link className="zing-chart-link" to="">
                        K-Pop
                      </Link>
                    </h3>
                    <Button
                      type="primary"
                      size="large"
                      className={"title-play-btn"}
                      hover="dark"
                      iconLeft={<i className="ic-play"></i>}
                    ></Button>
                  </header>

                  <div className="list">
                    {data.weekChart.korea.items.map((item, index) => {
                      return (
                        index < 5 && (
                          <Media
                            key={index}
                            showDuration
                            index={index}
                            item={item}
                            mediaPlaylistId={data.weekChart.korea.playlistId}
                            showOrdinal={true}
                          />
                        )
                      );
                    })}
                  </div>

                  <div className="section-btn">
                    <Button
                      uppercase={false}
                      type="current-color-outline"
                      size="large"
                      hover="bg-bright"
                    >
                      Xem tất cả
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZingChart;
