import clsx from "clsx";
import PropTypes from "prop-types";
import "./Popper.scss";
const PopperWrapper = ({ children, className, ...props }) => {
  return (
    <div className={clsx("popper-wrapper", className)} {...props}>
      {children}
    </div>
  );
};
PopperWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PopperWrapper;
