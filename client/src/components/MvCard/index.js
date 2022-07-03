import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ArtistName from "~/components/ArtistName";
import "./MvCard.scss";
const MvCard = ({ data }) => {
  const duration = `${Math.floor(data.duration / 60)
    .toString()
    .padStart(2, "0")}:${Math.floor(data.duration % 60)
    .toString()
    .padStart(2, "0")}`;
  return (
    <div className="mv-card">
      <div className="mv-card-thumb zoom-in">
        <img src={data.thumbnailM} alt="" className="zoom-in-img mv-card-img" />
        <span className="mv-card-action is-hover-dark is-circle">
          <i className="ic-play-circle-outline"></i>
        </span>
        <span className="mv-card-duration">{duration}</span>
      </div>
      <div className="mv-card-info">
        <Link to={`/nghe-si/${data.artist.alias}`} className="mv-card-link">
          <img
            className="mv-card-artist-thumb is-circle"
            src={data.artist.thumbnail}
          />
        </Link>
        <div className="mv-card-text">
          <h4 className="mv-card-title">
            <Link to="" className="mv-card-link">
              {data.title}
            </Link>
          </h4>
          <p className="mv-card-artists">
            {data.artists.map((artist, index) => (
              <>
                <ArtistName artist={artist} key={index} />
                {index < data.artists.length - 1 && ", "}
              </>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
MvCard.propTypes = {
  data: PropTypes.object.isRequired,
};
export default MvCard;
