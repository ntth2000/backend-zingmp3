import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import routesConfig from "~/configs/routes";

import "./SideBar.scss";
import {
  LogoDark,
  LogoLight,
  MyHistory,
  MyPlaylist,
  MySong,
} from "~/assets/icons";
import Icon from "~/components/Icon";
import useModal from "~/components/Modal";
import LoginAndRegister from "~/components/LoginAndRegister";
import useToast from "~/components/Toast";
import { uiActions } from "~/stores/uiSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const { showMobileSidebar } = useSelector((state) => state.ui);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { Modal: LoginAndRegisterModal, show: showLoginAndRegister } =
    useModal();
  const handleClickMyMusic = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showLoginAndRegister();
    }
  };
  const toast = useToast();
  const handleDysfunctionalNavLink = () => {
    toast();
  };

  useEffect(() => {
    setIsExpanded(showMobileSidebar);
  }, [showMobileSidebar]);
  return (
    <aside
      className={clsx(
        "sidebar",
        isExpanded && "expand",
        showMobileSidebar && "show-mobile-sidebar"
      )}
    >
      {!isLoggedIn && (
        <LoginAndRegisterModal>
          <LoginAndRegister />
        </LoginAndRegisterModal>
      )}
      <Link to={routesConfig.home} className="sidebar-logo"></Link>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li
            onClick={() => {
              if (isExpanded) setIsExpanded(false);
              dispatch(uiActions.hideMobileSidebar());
            }}
          >
            <NavLink
              to={routesConfig.favoriteSong}
              className="sidebar-nav-link"
              onClick={handleClickMyMusic}
            >
              <i className="sidebar-nav-icon ic-24-LibraryTab"></i>
              <span className="sidebar-nav-text">Cá Nhân</span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              if (isExpanded) setIsExpanded(false);
              dispatch(uiActions.hideMobileSidebar());
            }}
          >
            <NavLink to={routesConfig.home} className="sidebar-nav-link">
              <i className="sidebar-nav-icon ic-24-HomeTab"></i>
              <span className="sidebar-nav-text">Khám phá</span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              if (isExpanded) setIsExpanded(false);
              dispatch(uiActions.hideMobileSidebar());
            }}
          >
            <NavLink to={routesConfig.zingchart} className="sidebar-nav-link">
              <i className="sidebar-nav-icon ic-24-ChartTab"></i>
              <span className="sidebar-nav-text">#zingchart</span>
            </NavLink>
          </li>
          <li
            onClick={() => {
              if (isExpanded) setIsExpanded(false);
              dispatch(uiActions.hideMobileSidebar());
            }}
          >
            <div
              onClick={handleDysfunctionalNavLink}
              // to="/radio"
              className="sidebar-nav-link"
            >
              <i className="sidebar-nav-icon ic-24-RadioTab"></i>
              <span className="sidebar-nav-text">Radio</span>
            </div>
          </li>
          <li
            onClick={() => {
              if (isExpanded) setIsExpanded(false);
              dispatch(uiActions.hideMobileSidebar());
            }}
          >
            <div
              onClick={handleDysfunctionalNavLink}
              //  to="/follow"
              className="sidebar-nav-link"
            >
              <i className="sidebar-nav-icon ic-24-FeedTab"></i>
              <span className="sidebar-nav-text">Theo dõi</span>
            </div>
          </li>
        </ul>
      </nav>
      <div className="sidebar-separator"></div>
      <div className="sidebar-scroll bright-scrollbar">
        <nav className="sidebar-nav">
          <ul className="sidebar-nav-list">
            <li
              onClick={() => {
                if (isExpanded) setIsExpanded(false);
              }}
            >
              <NavLink
                to={routesConfig.newRelease}
                className="sidebar-nav-link"
              >
                <i className="sidebar-nav-icon ic-24-NewReleaseTab"></i>
                <span className="sidebar-nav-text">Nhạc mới</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                if (isExpanded) setIsExpanded(false);
              }}
            >
              <div
                onClick={handleDysfunctionalNavLink}
                //  to="/genre"
                className="sidebar-nav-link"
              >
                <i className="sidebar-nav-icon ic-24-GenreTab"></i>
                <span className="sidebar-nav-text">Thể loại</span>
              </div>
            </li>
            <li
              onClick={() => {
                if (isExpanded) setIsExpanded(false);
              }}
            >
              <NavLink to={routesConfig.top100} className="sidebar-nav-link">
                <i className="sidebar-nav-icon ic-24-Top100Tab"></i>
                <span className="sidebar-nav-text">Top 100</span>
              </NavLink>
            </li>
            <li
              onClick={() => {
                if (isExpanded) setIsExpanded(false);
              }}
            >
              <div
                onClick={handleDysfunctionalNavLink}
                // to="/mv"
                className="sidebar-nav-link"
              >
                <i className="sidebar-nav-icon ic-24-MVTab"></i>
                <span className="sidebar-nav-text">MV</span>
              </div>
            </li>
          </ul>
        </nav>
        <div className="sidebar-banner">
          <p className="sidebar-banner-text">
            Nghe nhạc không quảng cáo cùng kho nhạc VIP
          </p>
          <button className="sidebar-banner-btn is-hover-dark">
            Nâng cấp VIP
          </button>
        </div>
        {isLoggedIn && (
          <div className="sidebar-library">
            <div className="sidebar-library-header">
              <h3 className="sidebar-library-heading">Thư viện</h3>
              <Icon
                placement="top"
                content="Chỉnh sửa"
                iconSize={16}
                size={26}
                hover="bright"
                className={"sidebar-library-editor"}
              >
                <i className="ic-edit"></i>
              </Icon>
            </div>

            <ul className="sidebar-library-list nav-list">
              <li className="sidebar-library-item">
                <Link
                  to={routesConfig.favoriteSong}
                  className="sidebar-nav-link"
                >
                  <span className="sidebar-nav-icon">
                    <MySong />
                  </span>
                  <span className="sidebar-nav-text">Bài hát</span>
                </Link>
              </li>
              <li className="sidebar-library-item">
                <Link
                  to={routesConfig.myMusicAlbum}
                  className="sidebar-nav-link"
                >
                  <span className="sidebar-nav-icon">
                    <MyPlaylist />
                  </span>
                  <span className="sidebar-nav-text">Playlist</span>
                </Link>
              </li>
              <li className="sidebar-library-item">
                <Link
                  to={routesConfig.historyPlaylist}
                  className="sidebar-nav-link"
                >
                  <span className="sidebar-nav-icon">
                    <MyHistory />
                  </span>
                  <span className="sidebar-nav-text">Gần đây</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="sidebar-bottom">
        <div className="sidebar-create-playlist hide-on-tablet-mobile">
          <i className="sidebar-create-playlist-icon ic-add"></i>
          Tạo playlist mới
        </div>
        <button
          className="sidebar-expand hide-on-pc is-circle is-hover-dark"
          onClick={() => {
            setIsExpanded((prev) => !prev);
            if (showMobileSidebar) {
              dispatch(uiActions.toggleMobileSidebar());
            }
          }}
        >
          {isExpanded ? (
            <i className="ic-go-left"></i>
          ) : (
            <i className="ic-go-right"></i>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
