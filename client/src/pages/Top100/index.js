import React, { useEffect, useState } from "react";

import Card from "~/components/Card";
import { Top100 as Top100Icon } from "~/assets/icons";
import { fetchPageData } from "~/apiServices/pageDataServices";

import "./Top100.scss";
import { Top100Loader } from "~/components/PageLoader/Page";
const Top100 = () => {
  const title = document.querySelector("title");
  title.innerText = "Top 100 | Tuyển tập nhạc hay chọn lọc";
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await fetchPageData("top100");
      setData(result);
    };
    fetchApi();
  }, []);

  return (
    <div className="top100">
      <div className="top100-icon hide-on-mobile">
        <Top100Icon />
      </div>
      {data ? (
        data.map((playlist, index) => (
          <div className="section" key={index}>
            <header className="section-header">
              <h3 className="section-title title">{playlist.title}</h3>
            </header>
            <div className="row">
              {playlist.items.map((item, index) => (
                <div className="col l-2-4 m-3 c-6" key={index}>
                  <Card data={item} />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Top100Loader />
      )}
    </div>
  );
};

export default Top100;
