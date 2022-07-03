import React, { useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SideBar from "./components/Sidebar";
import Queue from "./components/Queue";
import Header from "./components/Header";
import Player from "./components/Player";
import "./Layout.scss";

const Layout = ({ children }) => {
  const { currentSongId } = useSelector((state) => state.queue);
  const { theme, textMode } = useSelector((state) => state.ui);

  useEffect(() => {
    const header = document.querySelector("header.header");
    const layoutContent = document.querySelector(".layout-content");
    layoutContent.onscroll = (e) => {
      header.classList.toggle("scrolling", e.target.scrollTop > 0);
    };
  }, []);

  const html = document.querySelector("html");

  useEffect(() => {
    html.classList.add(textMode);
    return () => {
      html.classList.remove(textMode);
    };
  }, [textMode]);

  useEffect(() => {
    html.classList.add(theme);
    return () => {
      html.classList.remove(theme);
    };
  }, [theme]);

  return (
    <div className={clsx("layout", !currentSongId && "full-height")}>
      <SideBar />
      <Queue />
      <div className="layout-container">
        <Header />
        <div className="layout-content bright-scrollbar">{children}</div>
      </div>
      {!!currentSongId && <Player />}
      <div className="toast-list"></div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
