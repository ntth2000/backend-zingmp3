import clsx from "clsx";
import PropTypes from "prop-types";
import "./Playlist.scss";
import Media from "~/components/Media";

const Playlist = ({ className = "", list, playlistEncodeId }) => {
  return (
    <div className={clsx("playlist", className)}>
      <div className="playlist-header">
        <div className="playlist-left">
          <span className="playlist-heading">Bài hát</span>
        </div>
        <div className="playlist-center">
          <span className="playlist-heading">Album</span>
        </div>
        <div className="playlist-right">
          <span className="playlist-heading">Thời gian</span>
        </div>
      </div>

      <ul className="playlist-list">
        {list.map((item, index) => {
          return (
            <Media
              showBorderBottom
              showAlbum
              showDuration
              index={index}
              item={item}
              mediaPlaylistId={playlistEncodeId}
              showOrdinal
            />
          );
        })}
      </ul>
    </div>
  );
};
Playlist.propTypes = {
  className: PropTypes.string,
  list: PropTypes.array.isRequired,
  playlistEncodeId: PropTypes.string,
};
export default Playlist;
