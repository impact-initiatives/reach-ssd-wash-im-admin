import React from 'react';

interface Props {
  page: number;
  setPage: Function;
  pageCount: number;
}

const TablePaginationLong = ({ page, setPage, pageCount }: Props) => {
  const firstButton = Math.min(Math.max(2, page - 1), pageCount - 3);
  const secondButton = Math.min(Math.max(3, page), pageCount - 2);
  const thirdButton = Math.min(Math.max(4, page + 1), pageCount - 1);
  const isCurrentFirst = page === 1 ? ' is-current' : '';
  const isCurrentSet1 = page === 2 ? ' is-current' : '';
  const isCurrentSet2 = page >= 3 && page <= pageCount - 2 ? ' is-current' : '';
  const isCurrentSet3 = page === pageCount - 1 ? ' is-current' : '';
  const isCurrentLast = page === pageCount ? ' is-current' : '';
  return (
    <ul className="pagination-list">
      <li>
        <button
          className={`button pagination-link${isCurrentFirst}`}
          onClick={() => setPage(1)}
        >
          1
        </button>
      </li>
      {page >= 4 ? (
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      ) : null}
      <li>
        <button
          className={`button pagination-link${isCurrentSet1}`}
          onClick={() => setPage(firstButton)}
        >
          {firstButton}
        </button>
      </li>
      <li>
        <button
          className={`button pagination-link${isCurrentSet2}`}
          onClick={() => setPage(secondButton)}
        >
          {secondButton}
        </button>
      </li>
      <li>
        <button
          className={`button pagination-link${isCurrentSet3}`}
          onClick={() => setPage(thirdButton)}
        >
          {thirdButton}
        </button>
      </li>
      {page + 3 <= pageCount ? (
        <li>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
      ) : null}
      <li>
        <button
          className={`button pagination-link${isCurrentLast}`}
          onClick={() => setPage(pageCount)}
        >
          {pageCount}
        </button>
      </li>
    </ul>
  );
};

export default TablePaginationLong;
