import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Search.scss";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("q");

  const searchInputRef = useRef();
  const [searchInput, setSearchInput] = useState(searchText || "");

  useEffect(() => {
    setSearchInput(searchText || "");
  }, [searchText]);
  const handleClearInput = () => {
    setSearchInput("");
    searchInputRef.current.focus();
  };
  const handleEnterKey = (e) => {
    if (e.which === 13 && !!searchInput) {
      navigate(`/tim-kiem/tat-ca?q=${encodeURIComponent(searchInput)}`);
    }
  };
  const handleSearch = () => {
    if (!!searchInput) {
      navigate(`/tim-kiem/tat-ca?q=${encodeURIComponent(searchInput)}`);
    }
  };
  return (
    <div className="header-search">
      <button className="header-search-icon" onClick={handleSearch}>
        <i className="ic-search"></i>
      </button>

      <input
        value={searchInput}
        onInput={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => handleEnterKey(e)}
        spellCheck={false}
        type="text"
        ref={searchInputRef}
        className="header-search-input"
        placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
      />
      {!!searchInput && (
        <button className="header-search-clear" onClick={handleClearInput}>
          <i className="ic-close"></i>
        </button>
      )}
    </div>
  );
};

export default Search;
