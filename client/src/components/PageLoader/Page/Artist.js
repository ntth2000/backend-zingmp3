import React from "react";
import Media from "../Component/Media";
import { Card } from "../Component";
import { ListLoader } from "../Component";
const ArtistLoader = () => {
  return (
    <div>
      <header className="artist-header">
        <div className="row">
          <div className="col l-7 m-7 c-12">
            <div className="artist-header-left">
              <div className="artist-title big-title loader half-width mb-10"></div>
              <div className="artist-bio">
                <div className="full-width mb-10 loader subtitle"></div>
                <div className="full-width mb-10 loader subtitle"></div>
                <div className="full-width mb-10 loader subtitle"></div>
              </div>
              <div className="artist-actions">
                <div className="big-title quarter-width button loader"></div>
                <div className="big-title quarter-width button loader"></div>
              </div>
              <Media />
            </div>
          </div>
          <div className="col l-5 m-5 c-0">
            <div className="artist-header-right">
              <div className="artist-thumb icon loader"></div>
            </div>
          </div>
        </div>
      </header>
      <div className="artist-navbar">
        <div className="tabs half-width big-title loader"></div>
      </div>
      <section className="section popular-songs">
        <header className="section-header">
          <div className="quarter-width loader big-title"></div>
        </header>
        <div className="section-content">
          <div className="thumbnail-animation">
            <div className="thumbnail-list">
              <div className="loader thumbnail-item"></div>
              <div className="loader thumbnail-item second"></div>
              <div className="loader thumbnail-item first"></div>
            </div>
          </div>
          <div className="list bright-scrollbar">
            <ListLoader />
          </div>
        </div>
      </section>
      <section className="section">
        <header className="section-header">
          <div className="quarter-width loader big-title"></div>
        </header>
        <div className="section-content">
          <div className="row p-28">
            <div className="col p-28 l-2-4 m-4 c-6">
              <Card />
            </div>
            <div className="col p-28 l-2-4 m-4 c-6">
              <Card />
            </div>
            <div className="col p-28 l-2-4 m-4 c-0">
              <Card />
            </div>
            <div className="col p-28 l-2-4 m-0 c-0">
              <Card />
            </div>
            <div className="col p-28 l-2-4 m-0 c-0">
              <Card />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistLoader;
