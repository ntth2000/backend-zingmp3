import clsx from "clsx";
import PropTypes from "prop-types";
import "./ArtistCard.scss";
import Button from "~/components/Button";
import ArtistName from "~/components/ArtistName";
import useFormatFollowers from "~/hooks/useFormatFollowers";
const ArtistCard = ({ item, showButton = true, showFollow = true }) => {
  const followers = useFormatFollowers(item?.totalFollow);
  return (
    <div className="artist-card">
      <div className="artist-card-thumb is-circle zoom-in">
        <img
          src={item?.thumbnailM || item?.thumbnail}
          alt={item?.name}
          className="zoom-in-img artist-card-img"
        />
        <button className="artist-card-icon is-circle is-hover-dark">
          <i className="ic-shuffle"></i>
        </button>
      </div>
      <h4 className="artist-card-name">
        <ArtistName artist={item} />
      </h4>
      {showFollow && (
        <div
          className={clsx("artist-card-follow", !item?.totalFollow && "hidden")}
        >
          {followers} quan tâm
        </div>
      )}
      {showButton && (
        <div className="artist-card-actions">
          <Button
            type="primary"
            hover="dark"
            iconLeft={<i className="ic-addfriend"></i>}
          >
            Quan tâm
          </Button>
        </div>
      )}
    </div>
  );
};
ArtistCard.propTypes = {
  item: PropTypes.object.isRequired,
  showButton: PropTypes.bool,
  showFollow: PropTypes.bool,
};
export default ArtistCard;
