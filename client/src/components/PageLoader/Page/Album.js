import React from "react";
import Icon from "~/components/Icon";
import { ListLoader } from "../Component";

const AlbumLoader = () => {
  return (
    <div>
      <div className="album-detail">
        <div className="album-info">
          <div className="media">
            <div className="media-img loader mb-10"></div>
            <div className="media-content">
              <div className="media-info">
                <div className="mb-10 media-name loader half-width title"></div>
                <div className="mb-10 loader quarter-width subtitle"></div>
                <div className="mb-10 loader half-width subtitle"></div>
              </div>
              <div className="album-actions">
                <div className="media-actions">
                  <Icon size={35} className="loader" />
                  <Icon size={35} className="loader" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="album-songs">
          <div className="album-desc loader full-width title"></div>
          <ListLoader />
        </div>
      </div>
    </div>
  );
};

export default AlbumLoader;
