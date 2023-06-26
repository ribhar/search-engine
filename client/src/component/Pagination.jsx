
// export default Pagination;

import React from 'react';
import style from "../Css/Pagination.module.css";

function Pagination({ page, setPage, data }) {
  const totalPages = data?.body?.data?.totalPages || 0;

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className={style.Pagination_container}>
      {page > 1 && (
        <button
          className={style.pagination_buttonprevious}
          onClick={handlePreviousClick}
        >
          Previous
        </button>
      )}
      {page < totalPages && totalPages > 0 && (
        <button
          className={style.pagination_buttonnext}
          onClick={handleNextClick}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
