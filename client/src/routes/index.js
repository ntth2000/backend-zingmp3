import routesConfig from "~/configs/routes";
//pages
import Explore from "~/pages/Explore";
import Top100 from "~/pages/Top100";
import ZingChart from "~/pages/ZingChart";
import Album from "~/pages/Album";
import MyMusic from "~/pages/MyMusic";
import NewReleases from "~/pages/NewRelease";
import Artist from "~/pages/Artist";
import Search from "~/pages/Search";

export const publicRoutes = [
  { path: routesConfig.home, component: Explore, end: true },
  { path: routesConfig.top100, component: Top100 },
  { path: routesConfig.zingchart, component: ZingChart },
  { path: routesConfig.newRelease, component: NewReleases },
  { path: routesConfig.album, component: Album },
  { path: routesConfig.artist, component: Artist },
  {
    path: routesConfig.search,
    component: Search,
  },
];
export const privateRoutes = [
  {
    path: routesConfig.myMusic,
    component: MyMusic,
    redirect: routesConfig.favoriteSong,
  },
];
