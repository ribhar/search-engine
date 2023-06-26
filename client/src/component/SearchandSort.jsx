import React, { useState } from "react";
import style from "../Css/Search.module.css";

const SearchandSort = ({ setSearchTerm, setSortBy, sortBy }) => {
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.search_container}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className={style.search_input}
        />
        <button className={style.search_button} onClick={()=>setSearchTerm(search)}>Search</button>
      </div>

      <select
        value={sortBy}
        className={style.sortby_input}
        onChange={handleSortBy}
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="datelastedited">Modified At</option>
      </select>
    </div>
  );
};

export default SearchandSort;
