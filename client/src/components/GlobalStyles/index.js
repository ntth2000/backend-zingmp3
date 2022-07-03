import PropTypes from "prop-types";
import "./GlobalStyles.scss";
import "./grid.scss";
import "~/assets/icons/ZingIcon.css";
const GlobalStyles = ({ children }) => {
  return children;
};
GlobalStyles.propTypes = { children: PropTypes.node.isRequired };
export default GlobalStyles;
