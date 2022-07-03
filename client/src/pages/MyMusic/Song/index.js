import { Routes, Route } from "react-router-dom";
import Favorite from "./Favorite";
import Upload from "./Upload";

const Song = () => {
  return (
    <Routes>
      <Route path="favorite" element={<Favorite />} />
      <Route path="upload" element={<Upload />} />
    </Routes>
  );
};

export default Song;
