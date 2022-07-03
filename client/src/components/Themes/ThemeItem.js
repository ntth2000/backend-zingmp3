import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "~/stores/uiSlice";
import Button from "../Button";

const ThemeItem = ({ data, hideThemeModal, showLoginAndRegister }) => {
  const html = document.querySelector("html");
  const { theme, textMode, previewTheme, previewMode } = useSelector(
    (state) => state.ui
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleSettingTheme = () => {
    if (isLoggedIn) {
      if (textMode !== data.textMode) {
        dispatch(uiActions.setTextMode(data.textMode));
      }
      if (theme !== data.id) {
        dispatch(uiActions.setTheme(data.id));
        hideThemeModal();
      }
      previewTheme !== null && dispatch(uiActions.setPreviewTheme(null));
      previewMode !== null && dispatch(uiActions.setPreviewMode(null));
    } else {
      showLoginAndRegister();
    }
  };
  const handleThemePreview = () => {
    if (theme !== data.id) {
      html.classList.remove(theme);
      dispatch(uiActions.setPreviewTheme(data.id));
    }
    if (textMode !== data.textMode) {
      dispatch(uiActions.setPreviewMode(data.textMode));
      html.classList.remove(textMode);
    }
  };
  useEffect(() => {
    {
      !!previewTheme && html.classList.add(previewTheme);
    }
    return () => {
      html.classList.remove(previewTheme);
    };
  }, [previewTheme]);
  useEffect(() => {
    {
      !!previewMode && html.classList.add(previewMode);
    }
    return () => {
      html.classList.remove(previewMode);
    };
  }, [previewMode]);

  return (
    <div className={clsx("theme-item", data.id === theme && "active")}>
      <div className="theme-thumbnail zoom-in">
        <img
          src={data.thumbnail}
          alt={data.themeName}
          className="theme-img zoom-in-img"
        />
        {theme === data.id && (
          <span className="theme-item-active-icon is-circle">
            <i className="ic-check"></i>
          </span>
        )}
        <div className="theme-actions">
          <div className="theme-action">
            <Button
              type="primary"
              size="small"
              hover="dark"
              onClick={handleSettingTheme}
            >
              Áp dụng
            </Button>
          </div>
          <div className="theme-action">
            <Button
              type="outline"
              size="small"
              hover="dark"
              onClick={handleThemePreview}
            >
              Xem trước
            </Button>
          </div>
        </div>
      </div>
      <p className="theme-name">{data.themeName}</p>
    </div>
  );
};

export default ThemeItem;
