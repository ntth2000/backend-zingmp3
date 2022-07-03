import React from "react";
import "./Artist.scss";
const Biography = ({ name, biography, thumbnailM }) => {
  let splited = biography.split("\n<br>");

  return (
    <div className="biography">
      <div className="biography-top">
        <div
          className="biography-top-bg"
          style={{ backgroundImage: `url(${thumbnailM})` }}
        ></div>
        <img
          src={thumbnailM}
          alt={name}
          className="biography-thumbnail is-circle"
        />
        <h4 className="biography-title title">{name}</h4>
      </div>
      <p className="biography-content dark-scrollbar">
        {splited.length > 0
          ? splited.map((paragraphy) => {
              return (
                <>
                  {paragraphy}
                  <br />
                </>
              );
            })
          : biography}
      </p>
    </div>
  );
};

export default Biography;
