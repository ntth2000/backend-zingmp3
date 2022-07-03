import Button from "~/components/Button";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Header.scss";

import { ThemeIcon } from "~/assets/icons";
import Icon from "~/components/Icon";
import PopperWrapper from "~/components/Popper";
import Theme from "~/components/Themes";
import useModal from "~/components/Modal";
import LoginAndRegister from "~/components/LoginAndRegister";
import { authActions } from "~/stores/authSlice";
import { uiActions } from "~/stores/uiSlice";
import Search from "../Search";

const SETTING_MENU = [
  {
    icon: <i className="ic-20-Block"></i>,
    title: "Danh sách chặn",
  },
  {
    icon: <i className="ic-20-quaility"></i>,
    title: "Chất lượng nhạc",
    hasChild: true,
  },
  {
    icon: <i className="ic-20-Play-Outline"></i>,
    title: "Giao diện",
    hasChild: true,
  },
  {
    separation: true,
    icon: <i className="ic-20-info"></i>,
    title: "Giới thiệu",
  },
  {
    icon: <i className="ic-20-Report"></i>,
    title: "Góp ý",
  },
  {
    icon: <i className="icon ic-20-Call"></i>,
    title: "Liên hệ",
  },
  { icon: <i className="icon ic-20-Ads"></i>, title: "Quảng cáo" },
  {
    icon: <i className="ic-20-Dieukhoan"></i>,
    title: "Thỏa thuận sử dụng",
  },
  {
    icon: <i className="ic-24-Privacy"></i>,
    title: "Chính sách bảo mật",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { textMode, theme } = useSelector((state) => state.ui);
  const html = document.querySelector("html");
  const handleCloseThemeModal = () => {
    dispatch(uiActions.setPreviewMode(null));
    html.classList.add(textMode);

    dispatch(uiActions.setPreviewTheme(null));
    html.classList.add(theme);
  };
  const {
    Modal: ThemeModal,
    show: showTheme,
    hide: hideTheme,
  } = useModal({}, true, handleCloseThemeModal);
  const {
    Modal: LoginAndRegisterModal,
    show: showLoginAndRegister,
    hide: hideLoginAndRegister,
  } = useModal();

  const isLoggedIn = !!user;

  const handleLogOut = () => {
    dispatch(authActions.logout());
    hideLoginAndRegister();
  };
  const handleToggleMobileSidebar = () => {
    dispatch(uiActions.toggleMobileSidebar());
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <header className="header">
      <ThemeModal>
        <Theme hide={hideTheme} showLoginAndRegister={showLoginAndRegister} />
      </ThemeModal>
      {!user && (
        <LoginAndRegisterModal>
          <LoginAndRegister />
        </LoginAndRegisterModal>
      )}

      <div className="header-left">
        <div
          className="hover-dark hide-on-pc hide-on-tablet header-sidebar-slider is-hover-dark"
          onClick={handleToggleMobileSidebar}
        >
          <i className="ic-sort"></i>
        </div>
        <Button
          background
          className="header-arrow back hide-on-mobile"
          onClick={handleGoBack}
          disabled={location.key === "default"}
        >
          <i className="ic-back"></i>
        </Button>
        <Button
          className="header-arrow forward hide-on-mobile"
          onClick={handleGoForward}
        >
          <i className="ic-forward"></i>
        </Button>

        <Search />
      </div>
      <div className="header-right">
        <Icon
          background
          size={40}
          placement="bottom"
          content={"Chủ đề"}
          iconSize={20}
          className="header-action themes"
          onClick={showTheme}
        >
          <ThemeIcon />
        </Icon>
        <Icon
          background
          size={40}
          placement="bottom"
          iconSize={20}
          className="header-action hide-on-mobile"
          content="Nâng cấp VIP"
        >
          <i className="ic-20-VIP-2"></i>
        </Icon>
        <label
          htmlFor="song-upload"
          className="header-action hide-on-tablet-mobile"
        >
          <Icon
            background
            size={40}
            placement="bottom"
            iconSize={20}
            content="Tải lên"
          >
            <i className="ic-upload"></i>
          </Icon>
        </label>
        <TippyHeadless
          placement="bottom-end"
          trigger="click"
          interactive={true}
          render={(attrs) => (
            <div className="header-setting-list" tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <ul className="menu-list">
                  <li className="menu-item">
                    <i className="menu-icon ic-20-Block"></i>
                    Danh sách chặn
                  </li>
                  <TippyHeadless
                    placement="left-start"
                    hideOnClick={false}
                    interactive={true}
                    offset={[-8, -6]}
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                          <ul className="menu-list quality-list">
                            <li className="menu-item active">
                              <h4 className="quality-heading">
                                SQ
                                <span className="quality-heading-dot"></span>
                                128
                              </h4>
                              <span className="quality-desc">
                                Giảm sử dụng dữ liệu cho các kết nối chậm hơn
                              </span>
                              <i className="quality-icon ic-check"></i>
                            </li>
                            <li className="menu-item">
                              <h4 className="quality-heading">
                                HQ
                                <span className="quality-heading-dot"></span>
                                320
                              </h4>
                              <span className="quality-desc">
                                Kết hợp tốt nhất giữa việc sử dụng dữ liệu và
                                chất lượng âm thanh
                              </span>
                              <i className="quality-icon ic-check"></i>
                            </li>
                          </ul>
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <li className="menu-item">
                      <i className="menu-icon ic-20-quaility"></i>
                      Chất lượng nhạc
                      <i className="menu-icon-more ic-go-right"></i>
                    </li>
                  </TippyHeadless>
                  <TippyHeadless
                    placement="left-start"
                    hideOnClick={false}
                    interactive={true}
                    offset={[-8, -6]}
                    render={(attrs) => (
                      <div className="box" tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                          <ul className="menu-list player-setting">
                            <li className="menu-item">
                              <span className="menu-text">
                                Luôn phát nhạc toàn màn hình
                              </span>
                              <input type="checkbox" id="switch-1" hidden />
                              <label
                                className="switch-box"
                                htmlFor="switch-1"
                              ></label>
                            </li>
                            <li className="menu-item">
                              <span className="menu-text">Hiệu ứng</span>
                              <input type="checkbox" id="switch-2" hidden />
                              <label
                                className="switch-box"
                                htmlFor="switch-2"
                              ></label>
                            </li>
                          </ul>
                        </PopperWrapper>
                      </div>
                    )}
                  >
                    <li className="menu-item">
                      <i className="menu-icon ic-20-Play-Outline"></i>
                      Giao diện
                      <i className="menu-icon-more ic-go-right"></i>
                    </li>
                  </TippyHeadless>
                  <div className="menu-separation"></div>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-20-info"></i>
                    Giới thiệu
                  </li>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-20-Report"></i>
                    Góp ý
                  </li>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-20-Call"></i>
                    Liên hệ
                  </li>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-20-Ads"></i>
                    Quảng cáo
                  </li>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-20-Dieukhoan"></i>
                    Thỏa thuận sử dụng
                  </li>
                  <li className="menu-item bottom">
                    <i className="menu-icon ic-24-Privacy"></i>
                    Chính sách bảo mật
                  </li>
                </ul>
              </PopperWrapper>
            </div>
          )}
        >
          <Icon
            background
            placement="bottom"
            content="Cài đặt"
            size={40}
            iconSize={20}
            className="header-action hide-on-mobile"
          >
            <i className="ic-settings"></i>
          </Icon>
        </TippyHeadless>
        {isLoggedIn && (
          <TippyHeadless
            placement="bottom-end"
            trigger="click"
            interactive={true}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs}>
                <PopperWrapper>
                  <ul className="menu-list padding">
                    <li className="menu-item">
                      <i className="menu-icon ic-20-VIP-2"></i>
                      Nâng cấp VIP
                    </li>
                    <li className="menu-item">
                      <i className="menu-icon ic-20-VIP"></i>
                      Mua code VIP
                    </li>
                    <div className="menu-separation"></div>
                    <li className="menu-item" onClick={handleLogOut}>
                      <i className="menu-icon ic-log-out"></i>
                      Đăng xuất
                    </li>
                  </ul>
                </PopperWrapper>
              </div>
            )}
          >
            <button
              className={clsx(
                "header-avatar",
                "header-action",
                "is-circle",
                "is-hover-dark",
                isLoggedIn && "loggedIn"
              )}
              style={{
                backgroundImage: `url(${
                  user.avatar || "https://avatar.talk.zdn.vn/default"
                })`,
              }}
            ></button>
          </TippyHeadless>
        )}
        {!isLoggedIn && (
          <button
            className={clsx(
              "header-avatar",
              "header-action",
              "is-circle",
              "is-hover-dark",
              !isLoggedIn && "notLoggedIn"
            )}
            onClick={showLoginAndRegister}
            style={{
              backgroundImage: `url(https://avatar.talk.zdn.vn/default)`,
            }}
          ></button>
        )}
      </div>
    </header>
  );
};

export default Header;
