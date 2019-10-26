import React from 'react';

import TablePaginationShort from './table-pagination-short';
import TablePaginationLong from './table-pagination-long';

interface Props {
  page: number;
  setPage: Function;
  pageCount: number;
}

const SHORT_LIST_PAGE_COUNT = 6;

const TablePagination = ({ page, setPage, pageCount }: Props) => (
  <nav className="pagination is-rounded is-centered" role="navigation">
    <button
      className="button pagination-previous"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Previous
    </button>
    <button
      className="button pagination-next"
      disabled={page === pageCount}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
    {pageCount <= SHORT_LIST_PAGE_COUNT ? (
      <TablePaginationShort
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      />
    ) : (
      <TablePaginationLong
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      />
    )}
  </nav>
);

export default TablePagination;
