import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link } from "react-router-dom";
import { forwardRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import "./Icon.scss";
const defaultFn = () => {};
const Icon = forwardRef(
  (
    {
      hover,
      background = false,
      placement,
      visible,
      content,
      hideOnClick,
      size,
      iconSize,
      space = 7,
      to,
      href,
      disabled = false,
      className,
      onClick = defaultFn,
      children,
      ...passProps
    },
    ref
  ) => {
    let Component = "div";
    const props = {
      onClick,
      ...passProps,
      ref: ref,
    };
    if (to) {
      props.to = to;
      Component = Link;
    }
    if (href) {
      props.href = href;
      Component = "a";
    }
    if (disabled) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith("on") && typeof props[key] === "function") {
          delete props[key];
        }
      });
    }
    const tippyParams = {
      placement,
      content,
      visible,
    };

    if (hideOnClick) {
      tippyParams = { ...tippyParams, hideOnClick };
    }
    return (
      <div
        className="icon-wrapper"
        style={{
          "--size": `${size}px`,
          "--icon-size": `${iconSize}px`,
          "--space": `${space}px`,
        }}
      >
        <Tippy {...tippyParams}>
          <Component
            {...props}
            className={clsx(
              "icon",
              className,
              hover && `hover-${hover}`,
              disabled && "disabled",
              background && "bg-bright"
            )}
          >
            {children}
          </Component>
        </Tippy>
      </div>
    );
  }
);
Icon.propTypes = {
  hover: PropTypes.string,
  background: PropTypes.bool,
  placement: PropTypes.string,
  visible: PropTypes.bool,
  content: PropTypes.string,
  hideOnClick: PropTypes.bool,
  size: PropTypes.number,
  iconSize: PropTypes.number,
  space: PropTypes.number,
  to: PropTypes.string,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Icon;
