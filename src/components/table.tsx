import React from 'react';

import TablePagination from './table-pagination';

interface Props {
  className: string;
  data: LabeledData[];
  tableHeader: any;
  tableBody: any;
  page: number;
  setPage: Function;
}

const PER_PAGE = 20;

const Table = ({
  className,
  data,
  tableHeader,
  tableBody,
  page,
  setPage,
}: Props) => {
  const start = PER_PAGE * (page - 1);
  const end = PER_PAGE + start;
  const pageData = data.slice(start, end);
  const pageCount = Math.ceil(data.length / PER_PAGE);
  return (
    <div className={className}>
      <div className="field" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
        <table className="table is-fullwidth is-hoverable is-striped">
          <thead>
            <tr>
              {tableHeader.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{tableBody(pageData)}</tbody>
        </table>
      </div>
      <TablePagination page={page} setPage={setPage} pageCount={pageCount} />
    </div>
  );
};

export default Table;
