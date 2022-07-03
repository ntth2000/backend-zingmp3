import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Button from "~/components/Button";
import ArtistName from "../ArtistName";
const SongModal = ({ encodeId, hide }) => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8800/api/song/" + encodeId)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [encodeId]);
  return (
    <>
      {data && (
        <div className="gallery-modal">
          <p>
            Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay
            thế.
          </p>

          <div className="zoom-in gallery-modal-thumbnail">
            <img
              src={data.thumbnailM}
              alt={data.title}
              className="zoom-in-img"
            />
          </div>
          <h4 className="gallery-modal-title">{data.title}</h4>
          <p className="gallery-modal-artists">
            {data.artists.map((artist, index) => (
              <span key={index}>
                <span>{artist.name}</span>
                {index < data.artists.length - 1 && ", "}
              </span>
            ))}
          </p>

          <div className="gallery-modal-actions">
            <Button
              type="primary"
              size="large"
              iconLeft={<i className="ic-play"></i>}
              hover="dark"
              className={"gallery-modal-btn"}
            >
              Phát bài hát
            </Button>

            <Button
              className={"gallery-modal-btn"}
              type="black-white"
              size="large"
              hover="dark"
            >
              Thêm vào danh sách phát
            </Button>

            <Button
              hover="dark"
              onClick={hide}
              size="large"
              className={"gallery-modal-btn"}
            >
              Bỏ qua
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
SongModal.propTypes = {
  encodeId: PropTypes.string,
  hide: PropTypes.func,
};
export default SongModal;
