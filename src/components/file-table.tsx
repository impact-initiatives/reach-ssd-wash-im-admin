/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { FaTable, FaFilter } from 'react-icons/fa';

import Table from './table';
import TableFilter from './table-filter';
import schema, { typeLookup } from '../config/schema';
import { tableHeader, tableBody } from '../config/table-public';

interface Props {
  data: LabeledData[];
}

const onChangeTab = (setTab: Function, table: boolean, filter: boolean) =>
  setTab({ table, filter });

const dataUpdated = (data, setState) => {
  setState(state => ({ ...state, edges: data }));
};

const FileTable = ({ data }: Props) => {
  const [state, setState] = useState({ edges: data, filters: {} });
  const [tab, setTab] = useState({ table: true, filter: false });
  useEffect(() => dataUpdated(data, setState), [data]);
  return (
    <div>
      <div className="tabs is-centered is-toggle is-toggle-rounded">
        <ul>
          <li
            className={tab.table ? 'is-active' : ''}
            onClick={() => onChangeTab(setTab, true, false)}
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
            onClick={() => onChangeTab(setTab, false, true)}
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
      <div className={!tab.filter ? 'is-hidden' : 'container is-tablet'}>
        {Object.entries(typeLookup).map(([key, value]) => {
          switch (value) {
            case 'selectOne':
              return (
                <TableFilter
                  key={key}
                  name={key}
                  value={schema.selectOne[key]}
                  state={state}
                  setState={setState}
                  data={data}
                />
              );
            case 'selectMultiple':
              return (
                <TableFilter
                  key={key}
                  name={key}
                  value={schema.selectMultiple[key]}
                  state={state}
                  setState={setState}
                  data={data}
                />
              );
            case 'selectMultipleGrouped':
              return (
                <TableFilter
                  key={key}
                  name={key}
                  value={schema.selectMultipleGrouped[key]}
                  state={state}
                  setState={setState}
                  data={data}
                />
              );
            default:
              return null;
          }
        })}
        <br />
        <div className="buttons is-right">
          <button
            className="button is-link is-rounded"
            onClick={() => onChangeTab(setTab, true, false)}
          >
            Apply filters
          </button>
        </div>
      </div>
      <Table
        className={!tab.table ? 'is-hidden' : ''}
        data={state.edges}
        tableHeader={tableHeader}
        tableBody={tableBody}
      />
    </div>
  );
};

export default FileTable;
