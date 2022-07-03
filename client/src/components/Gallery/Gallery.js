import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./Gallery.scss";

import useModal from "~/components/Modal";
import SongModal from "./SongModal";
const Gallery = ({ items, delay = 5000 }) => {
  const navigate = useNavigate();
  const { Modal, show, hide } = useModal({}, false);
  const [modalItem, setModalItem] = useState();

  useEffect(function () {
    const gallery = document.querySelector(".gallery");
    const buttons = gallery.querySelectorAll(".gallery .arrow");
    const galleryItems = gallery.querySelectorAll(".gallery-item");
    let names = ["prev", "current", "next", "last", "first", "add"];
    if (galleryItems.length > 6) {
      for (let i = 0; i < galleryItems.length - 6; i++) {
        names.push("add");
      }
    }

    galleryItems.forEach((item, index) => {
      item.classList.add(names[index]);
    });
    let intervalId = createInterval();
    buttons.forEach((btn) => {
      btn.onclick = () => {
        clearInterval(intervalId);
        run(btn.dataset.id);
        intervalId = createInterval();
      };
    });

    function createInterval() {
      const id = setInterval(() => {
        run();
      }, [delay]);
      return id;
    }

    function run(delta = "1") {
      let newNames;
      if (delta === "1") {
        newNames = [...names.slice(-1), ...names.slice(0, -1)];
      }
      if (delta === "-1") {
        const [first, ...rest] = names;
        newNames = [...rest, first];
      }
      for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].classList.remove(names[i]);
        galleryItems[i].classList.add(newNames[i]);
      }
      names = [...newNames];
    }

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleClick = (item) => {
    if (item.type === 4) {
      const navigateLink = `/album/${item.link.split("/")[2]}/${item.encodeId}`;
      navigate(navigateLink);
    }
    if (item.type === 1) {
      setModalItem(item.encodeId);
      show();
    }
  };
  return (
    <>
      <div className="gallery">
        <span className="arrow is-circle is-hover-dark" id="prev" data-id="-1">
          <i className="ic-go-left"></i>
        </span>
        <span className="arrow is-circle is-hover-dark" id="next" data-id="1">
          <i className="ic-go-right"></i>
        </span>
        <ul className="gallery-container">
          {items?.map((item) => (
            <li className={`gallery-item`} key={item.encodeId}>
              <div
                onClick={() => handleClick(item)}
                className="banner"
                style={{
                  backgroundImage: `url(${item.banner})`,
                }}
              ></div>
            </li>
          ))}
        </ul>
      </div>
      <Modal>
        {modalItem && <SongModal hide={hide} encodeId={modalItem} />}
      </Modal>
    </>
  );
};

Gallery.propTypes = {
  items: PropTypes.array.isRequired,
  delay: PropTypes.number,
};
export default Gallery;
