import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useRedirect from "~/hooks/useRedirect";
import "./MyMusic.scss";
import Button from "~/components/Button";
import Podcast from "./Podcast";
import Mv from "./Mv";
import History from "./History";
import Album from "./Album";
import Song from "./Song";
const MyMusic = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = document.querySelector("title");
  title.innerText =
    "Nhạc cá nhân | Xem bài hát, album, MV đang hot nhất hiện tại";
  const Redirect = useRedirect();
  return (
    <div className="my-music">
      <Routes>
        <Route path="history/*" element={<History />} />
        <Route
          path="*"
          element={
            <>
              <header className="section-header">
                <h2 className="section-title">Thư viện</h2>
                <Button
                  type="primary"
                  size="large"
                  className={"title-play-btn"}
                  hover="dark"
                >
                  <i className="ic-play"></i>
                </Button>
              </header>
              <div className="section-content">
                <div className="my-music-navbar">
                  <NavLink
                    to="song"
                    className="my-music-header-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/my-music/song/favorite");
                    }}
                  >
                    Bài hát
                  </NavLink>
                  <NavLink to="podcast" className="my-music-header-link">
                    Podcast
                  </NavLink>
                  <NavLink to="album" className="my-music-header-link">
                    Album
                  </NavLink>
                  <NavLink to="mv" className="my-music-header-link">
                    MV
                  </NavLink>
                </div>

                <Routes>
                  <Route
                    path={`song/*`}
                    element={
                      <div className="my-music-header-options">
                        <NavLink
                          className={({ isActive }) =>
                            "my-music-header-option button uppercase" +
                            (isActive ? " active primary" : " outline")
                          }
                          to="/my-music/song/favorite"
                        >
                          Yêu thích
                        </NavLink>
                        <NavLink
                          className={({ isActive }) =>
                            "my-music-header-option button uppercase" +
                            (isActive ? " active primary" : " outline")
                          }
                          to="/my-music/song/upload"
                        >
                          Đã tải lên
                        </NavLink>
                      </div>
                    }
                  />

                  <Route
                    path={`podcast/*`}
                    element={
                      <div className="my-music-header-options">
                        <NavLink
                          className={({ isActive }) =>
                            "my-music-header-option button uppercase" +
                            (isActive ? " active primary" : " outline")
                          }
                          to="/my-music/podcast/new-episode"
                        >
                          Tập mới
                        </NavLink>
                        <NavLink
                          className={({ isActive }) =>
                            "my-music-header-option button uppercase" +
                            (isActive ? " active primary" : " outline")
                          }
                          to="/my-music/podcast/saved-episode"
                        >
                          Tập đã lưu
                        </NavLink>

                        <NavLink
                          className={({ isActive }) =>
                            "my-music-header-option button uppercase" +
                            (isActive ? " active primary" : " outline")
                          }
                          to="/my-music/podcast/followed-program"
                        >
                          Chương trình
                        </NavLink>
                      </div>
                    }
                  />
                </Routes>
              </div>
              <Routes>
                <Route path="song/*" element={<Song />} />
                <Route path={"podcast/*"} element={<Podcast />} />
                <Route
                  path={"podcast"}
                  element={<Redirect to="/my-music/podcast/new-episode" />}
                />
                <Route path={"mv"} element={<Mv />} />
                <Route path={"album"} element={<Album />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default MyMusic;
