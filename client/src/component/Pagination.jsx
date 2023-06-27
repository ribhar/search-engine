import React from 'react';
import style from "../Css/Pagination.module.css";

// Pagination component
function Pagination({ page, setPage, data }) {
  // Get the total number of pages from the data object
  const totalPages = data?.body?.data?.totalPages || 0;

  // Handle click event for the previous button
  const handlePreviousClick = () => {
    // Decrease the page number if it's greater than 1
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle click event for the next button
  const handleNextClick = () => {
    // Increase the page number if it's less than the total number of pages
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className={style.Pagination_container}>
      {/* Render the previous button if page is greater than 1 */}
      {page > 1 && (
        <button
          className={style.pagination_buttonprevious}
          onClick={handlePreviousClick}
        >
          Previous
        </button>
      )}

      {/* Render the next button if page is less than total pages */}
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
