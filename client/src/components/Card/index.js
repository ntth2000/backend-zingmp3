import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import TippyHeadless from "@tippyjs/react/headless";
import PropTypes from "prop-types";

import "./Card.scss";

import Icon from "~/components/Icon";
import ArtistName from "~/components//ArtistName";
import { CardMenu } from "~/components/Menus";
import useToast from "~/components/Toast";
const Card = ({
  data,
  showArtists = true,
  showDesc = false,
  showDate = false,
  showIcon = true,
  showSpotlight = false,
}) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const aliasName = data.link.split("/")[2];
  const handleToggleLikeBtn = () => {
    setLike((prev) => !prev);
    if (like) {
      toast("Đã xóa playlist khỏi thư viện");
    } else {
      toast("Đã thêm playlist vào thư viện");
    }
  };
  return (
    data && (
      <div className="card">
        <div className="card-thumb zoom-in">
          <img
            onClick={() => {
              navigate(`/album/${aliasName}/${data.encodeId}`);
            }}
            src={data.thumbnailM || data.thumbnail}
            alt={data?.title}
            className="card-img zoom-in-img"
          />
          <div className="card-actions">
            {showIcon && (
              <Icon
                hover="bright"
                className="card-action"
                placement="top"
                content="Thêm vào thư viện"
                size={30}
                iconSize={20}
                onClick={handleToggleLikeBtn}
              >
                {like ? (
                  <i className="ic-like-full"></i>
                ) : (
                  <i className="ic-like"></i>
                )}
              </Icon>
            )}
            <button className="is-hover-dark card-action play">
              <i className="ic-play-circle-outline"></i>
            </button>
            {showIcon && (
              <TippyHeadless
                trigger="click"
                placement="right-start"
                appendTo={() => document.body}
                interactive={true}
                hideOnClick={true}
                render={(attrs) => (
                  <div className="box" tabIndex="-1" {...attrs}>
                    <CardMenu />
                  </div>
                )}
              >
                <Icon
                  hover="bright"
                  className="card-action"
                  placement="top"
                  content="Khác"
                  size={30}
                  iconSize={20}
                >
                  <i className="ic-more"></i>
                </Icon>
              </TippyHeadless>
            )}
          </div>
        </div>

        <div className="card-title title">
          <Link
            to={`/album/${aliasName}/${data.encodeId}`}
            className="card-link link"
          >
            {data.title}
          </Link>
        </div>
        {showDate && (
          <p className="card-date">
            {data.releaseDate.substr(data.releaseDate.length - 4)}
          </p>
        )}
        {showArtists && (
          <p className="card-artists">
            {data.artists ? (
              data.artists.map((artist, index) => {
                if (index < 3) {
                  return (
                    <>
                      <ArtistName
                        artist={artist}
                        showSpotlight={showSpotlight}
                      />
                      {index < 2 &&
                        data.artists.length > 1 &&
                        data.artists.length > index + 1 &&
                        ", "}
                      {index === 2 && data.artists.length > 3 && ",..."}
                    </>
                  );
                }
              })
            ) : (
              <span>{data.artistsNames}</span>
            )}
          </p>
        )}
        {showDesc && <p className="card-desc">{data.sortDescription}</p>}
      </div>
    )
  );
};
Card.propTypes = {
  data: PropTypes.object.isRequired,
  showArtists: PropTypes.bool,
  showDesc: PropTypes.bool,
  showDate: PropTypes.bool,
  showIcon: PropTypes.bool,
  showSpotlight: PropTypes.bool,
};
export default Card;
