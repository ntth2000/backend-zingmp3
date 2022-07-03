import PropTypes from "prop-types";
import "./Theme.scss";
import { theme_data } from "./themeData";
import ThemeItem from "./ThemeItem";
const Theme = ({ hide, showLoginAndRegister }) => {
  return (
    <div className="theme grid">
      <h1 className="theme-title title">Giao diện</h1>
      <div className="theme-container dark-scrollbar">
        <div className="theme-main">
          {theme_data.map((theme_data, index) => (
            <div className="theme-group" key={index}>
              <h3 className="theme-group-title title">{theme_data.name}</h3>
              <div className="row p-16">
                {theme_data.items.map((theme) => (
                  <div className="col p-16 l-2 m-4 c-6" key={theme.id}>
                    <ThemeItem
                      data={theme}
                      hideThemeModal={hide}
                      showLoginAndRegister={showLoginAndRegister}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
Theme.propTypes = {
  hide: PropTypes.func,
  showLoginAndRegister: PropTypes.func,
};

export default Theme;
