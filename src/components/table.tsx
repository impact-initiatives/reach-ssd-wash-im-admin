import React, { useState } from 'react';

import { tableHeader, tableBody } from '../config/table-admin';
import TablePagination from './table-pagination';

interface Props {
  data: LabeledData[];
}

const PER_PAGE = 20;

const Table = ({ data }: Props) => {
  const [state, setState] = useState({ page: 1 });
  const start = PER_PAGE * (state.page - 1);
  const end = PER_PAGE + start;
  const pageData = data.slice(start, end);
  const pageCount = Math.ceil(data.length / PER_PAGE);
  return (
    <div>
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
      <TablePagination
        state={state}
        setState={setState}
        pageCount={pageCount}
      />
    </div>
  );
};

export default Table;
