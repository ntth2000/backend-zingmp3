import React, { useState, useEffect } from "react";

import Media from "~/components/Media";
import Button from "~/components/Button";
import { fetchPageData } from "~/apiServices/pageDataServices";

import "./NewReleases.scss";
import { ListLoader as NewReleaseLoader } from "~/components/PageLoader/Component";

const NewReleases = () => {
  const title = document.querySelector("title");
  title.innerText = "#zingchart tuần, #zingchart Zing - Bài hát";
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      setIsLoading(true);
      const result = await fetchPageData("new-releases");
      setData(result);
      setIsLoading(false);
    };
    fetchApi();
  }, []);

  return (
    <div className="new-release">
      <div className="new-release-header">
        <h2 className="new-release-title title">Mới phát hành</h2>
        <Button
          type="primary"
          size="large"
          className={"title-play-btn"}
          hover="dark"
          iconLeft={<i class="ic-play"></i>}
        ></Button>
      </div>
      {data && !isLoading && (
        <ul className="list">
          {data.items.map((item, index) => {
            return (
              <Media
                key={item.encodeId}
                showBorderBottom
                showAlbum
                showOrdinal
                showDuration
                index={index}
                item={item}
                playlistId={data.encodeId}
              />
            );
          })}
        </ul>
      )}
      {isLoading && <NewReleaseLoader />}
    </div>
  );
};

export default NewReleases;
