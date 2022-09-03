import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function StockPagination({ pageData, setPage }) {
  return (
    <div className="flex justify-center mb-6">
      <Pagination
        count={pageData.pagination.lastPage}
        color="secondary"
        page={pageData.pagination.currentPage}
        showFirstButton
        showLastButton
        onChange={(e, page) => {
          // console.log(page);
          setPage(page);
        }}
      />
    </div>
  );
}
