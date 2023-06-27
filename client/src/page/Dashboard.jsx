import React, { useEffect, useState } from "react";
import Cards from "../component/Cards";
import style from "../Css/Dashboard.module.css";
import Tabular from "../component/Tabular";
import { getData } from "../utils/api";
import SearchandSort from "../component/SearchandSort";
import Pagination from "../component/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Get the current location and navigation functions from react-router-dom
  const location = useLocation();
  const navigate = useNavigate();

  // Extract URL parameters using URLSearchParams
  const urlParams = new URLSearchParams(location.search);

  // State variables
  const [data, setData] = useState(); // Data from API
  const [page, setPage] = useState(parseInt(urlParams.get("page")) || 1); // Current page number, defaulting to 1 or URL parameter
  const [limit, setLimit] = useState(parseInt(urlParams.get("limit")) || 6); // Items per page, defaulting to 6 or URL parameter
  const [searchTerm, setSearchTerm] = useState(urlParams.get("searchTerm") || ""); // Search term, defaulting to empty string or URL parameter
  const [sortBy, setSortBy] = useState(urlParams.get("sortBy") || ""); // Sort by criteria, defaulting to empty string or URL parameter

  // Fetch data from API when the page, limit, search term, or sort by criteria changes
  useEffect(() => {
    getData(page, limit, searchTerm, sortBy, setData);
  }, [page, limit, searchTerm, sortBy]);

  // Update the URL with the API parameters when they change
  useEffect(() => {
    // Update the URL with the API parameters
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);
    params.append("searchTerm", searchTerm);
    params.append("sortBy", sortBy);

    navigate(`?${params.toString()}`);
  }, [page, limit, searchTerm, sortBy, navigate]);

  console.log(data, "datares");

  return (
    <div>
      {/* Heading */}
      <div className={style.heading}>
        <h1>Feed</h1>
      </div>

      {/* Search and Sort Component */}
      <div className={style.searchSortContainer}>
        <SearchandSort setSearchTerm={setSearchTerm} setSortBy={setSortBy} sortBy={sortBy}></SearchandSort>
      </div>

      {/* Cards Component */}
      <div className={style.container}>
        {data?.body.data.results.map((el, i) => {
          return <Cards key={i} {...el}></Cards>;
        })}
      </div>

      {/* Pagination Component */}
      <div className={style.paginationContainer}>
        <Pagination page={page} setPage={setPage} data={data}></Pagination>
      </div>

      {/* Tabular Component */}
      <div>
        <Tabular data={data}></Tabular>
      </div>
    </div>
  );
};

export default Dashboard;
