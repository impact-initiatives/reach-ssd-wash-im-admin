import React from 'react';

interface Props {
  page: number;
  setPage: Function;
  pageCount: number;
}

const TablePaginationShort = ({ page, setPage, pageCount }: Props) => (
  <ul className="pagination-list">
    {Array.from(new Array(pageCount)).map((_, index) => (
      <li key={index}>
        <button
          className={`button pagination-link${
            index + 1 === page ? ' is-current' : ''
          }`}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      </li>
    ))}
  </ul>
);

export default TablePaginationShort;
