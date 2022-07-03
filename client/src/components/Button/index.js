import clsx from "clsx";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Button.scss";
const Button = ({
  //primary, outline,
  type = "",
  size = "",
  uppercase = true,
  title,
  to,
  href,
  hover,
  background,
  disabled = false,
  onClick = () => {},
  iconLeft,
  iconRight,
  className,
  children,
  ...passProps
}) => {
  const props = {
    onClick,
    ...passProps,
  };
  let Component = "button";
  if (to) {
    props.to = to;
    Component = Link;
  }
  if (href) {
    props.href = href;
    Component = "a";
  }
  const classes = clsx(
    "button",
    type,
    size,
    uppercase && "uppercase",
    !disabled && hover && `hover-${hover}`,
    background && `bg-${background}`,
    disabled && "disabled",
    className
  );
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }
  return (
    <Component className={classes} {...props}>
      {iconLeft && <span className="button-icon">{iconLeft}</span>}
      {children && <span className="button-title">{children}</span>}
      {iconRight && <span className="button-icon">{iconRight}</span>}
    </Component>
  );
};
Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  uppercase: PropTypes.bool,
  title: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  hover: PropTypes.string,
  background: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  iconLeft: PropTypes.node,
  iconRight: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
};
export default Button;
