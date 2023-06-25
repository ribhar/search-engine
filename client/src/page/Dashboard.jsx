import React, { useEffect, useState } from "react";
import Cards from "../component/Cards";
import style from "../Css/Dashboard.module.css";
import Tabular from "../component/Tabular";
import { getData } from "../utils/api";
import SearchandSort from "../component/SearchandSort";
import Pagination from "../component/Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const [data, setData] = useState();
  const [page, setPage] = useState(parseInt(urlParams.get("page")) || 1);
  const [limit, setLimit] = useState(parseInt(urlParams.get("limit")) || 6);
  const [searchTerm, setSearchTerm] = useState(urlParams.get("searchTerm") || "");
  const [sortBy, setSortBy] = useState(urlParams.get("sortBy") || "");

  useEffect(() => {
    getData(page, limit, searchTerm, sortBy, setData);
  }, [page, limit, searchTerm, sortBy]);

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
      <div className={style.heading}>
        <h1>Feed</h1>
      </div>
      <div className={style.searchSortContainer}>
        <SearchandSort setSearchTerm={setSearchTerm} setSortBy={setSortBy} sortBy={sortBy}></SearchandSort>
      </div>
      <div className={style.container}>
        {data?.body.data.results.map((el, i) => {
          return <Cards key={i} {...el}></Cards>;
        })}
      </div>
      <div className={style.paginationContainer}>
        <Pagination page={page} setPage={setPage} data={data}></Pagination>
      </div>
      <div>
        <Tabular data={data}></Tabular>
      </div>
    </div>
  );
};

export default Dashboard;
