import React, { useState } from "react";
import style from "../Css/Search.module.css";

// SearchandSort component
const SearchandSort = ({ setSearchTerm, setSortBy, sortBy }) => {
  // State for the search input value
  const [search, setSearch] = useState("");

  // Handle search input change
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Handle sort by select change
  const handleSortBy = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.search_container}>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className={style.search_input}
        />

        {/* Search button */}
        <button className={style.search_button} onClick={() => setSearchTerm(search)}>
          Search
        </button>
      </div>

      {/* Sort by select */}
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
