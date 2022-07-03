import React from "react";
import { Card } from "../Component";

const ExploreLoader = () => {
  return (
    <div>
      <section className="section">
        <div className="row p-28">
          <div className="col p-28 l-4 m-6 c-6">
            <div
              className="loader"
              style={{
                aspectRatio: "16/9",
              }}
            ></div>
          </div>
          <div className="col p-28 l-4 m-6 c-6">
            <div
              className="loader"
              style={{
                aspectRatio: "16/9",
              }}
            ></div>
          </div>
          <div className="col p-28 l-4 m-0 c-0">
            <div
              className="loader"
              style={{
                aspectRatio: "16/9",
              }}
            ></div>
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

export default ExploreLoader;
