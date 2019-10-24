/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { FaTable, FaFilter } from 'react-icons/fa';

import Table from './table';
import TableFilter from './table-filter';
import { tableHeader, tableBody } from '../config/table-public';

interface Props {
  data: LabeledData[];
}

const FilterBar = ({ tab, setTab }) => (
  <div className="tabs is-centered is-toggle is-toggle-rounded">
    <ul>
      <li
        className={tab.table ? 'is-active' : ''}
        onClick={() => setTab({ table: true, filter: false })}
      >
        <a>
          <span className="icon is-small">
            <FaTable />
          </span>
          <span>Table</span>
        </a>
      </li>
      <li
        className={tab.filter ? 'is-active' : ''}
        onClick={() => setTab({ table: false, filter: true })}
      >
        <a>
          <span className="icon is-small">
            <FaFilter />
          </span>
          <span>Filters</span>
        </a>
      </li>
    </ul>
  </div>
);

const FileTable = ({ data }: Props) => {
  const [state, setState] = useState({ edges: data, filters: {} });
  const [tab, setTab] = useState({ table: true, filter: false });
  const [page, setPage] = useState(1);
  useEffect(() => setState(state => ({ ...state, edges: data })), [data]);
  return (
    <div>
      <FilterBar tab={tab} setTab={setTab} />
      <TableFilter
        className={!tab.filter ? 'is-hidden' : 'container is-tablet'}
        setState={setState}
        setTab={setTab}
        setPage={setPage}
        data={data}
      />
      <Table
        className={!tab.table ? 'is-hidden' : ''}
        data={state.edges}
        tableHeader={tableHeader}
        tableBody={tableBody}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default FileTable;
