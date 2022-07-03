import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TippyHeadless from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import "./ArtistName.scss";

import Button from "~/components/Button";
import Card from "~/components/Card";
import PopperWrapper from "../Popper";
import useFormatFollowers from "~/hooks/useFormatFollowers";

const ArtistName = forwardRef(({ artist, showSpotlight = false }, ref) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const handleClick = () => {
    navigate(`/nghe-si/${artist.alias}`);
  };
  const handleHover = () => {
    axios
      .get(`http://localhost:8800/api/card-info/${artist.id}`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };
  const followers = useFormatFollowers(data?.totalFollow);
  return (
    <TippyHeadless
      placement="top-start"
      interactive={true}
      appendTo={() => document.body}
      offset={[0, 3]}
      render={(attrs) =>
        data && (
          <PopperWrapper className={"media-hover"}>
            <div className="artist-popper">
              <header className="artist-popper-header">
                <Link
                  to={`/nghe-si/${artist.alias}`}
                  className="artist-popper-thumb"
                >
                  <img
                    src={artist.thumbnail}
                    className="is-circle artist-popper-img"
                  />
                </Link>
                <div className="artist-popper-text">
                  <h4 className="artist-popper-title">
                    <Link
                      to={`/nghe-si/${artist.alias}`}
                      className="artist-popper-link"
                    >
                      {artist.name}
                    </Link>
                  </h4>
                  <p className="artist-popper-follow">{followers} quan tâm</p>
                </div>

                <div className="artist-popper-action">
                  <Button
                    type="primary"
                    hover="dark"
                    iconLeft={<i className="ic-addfriend"></i>}
                  >
                    Quan tâm
                  </Button>
                </div>
              </header>
              {data?.sortBiography && (
                <p className="artist-popper-bio">{data?.sortBiography}</p>
              )}
              {data?.album && (
                <div className="section">
                  <header className="section-header">
                    <h4 className="section-title title">Mới nhất</h4>
                  </header>
                  <div className="section-content">
                    <div className="row p-16">
                      {data?.album?.map(
                        (item, index) =>
                          index < 4 && (
                            <div className="col p-16 l-3 m-3 c-3">
                              <div className="artist-popper-item" key={index}>
                                <Card
                                  showDate
                                  showDesc={false}
                                  showArtists={false}
                                  data={item}
                                  showIcon={false}
                                />
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </PopperWrapper>
        )
      }
    >
      <span
        ref={ref}
        onClick={handleClick}
        className="artist-name-comp"
        onMouseEnter={handleHover}
      >
        {artist.name}
        {showSpotlight && artist.spotlight && <>&#9733;</>}
      </span>
    </TippyHeadless>
  );
});
ArtistName.propTypes = {
  artist: PropTypes.object.isRequired,
  showSpotlight: PropTypes.bool,
};
export default ArtistName;
