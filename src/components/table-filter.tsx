import React from 'react';

import { SelectMultiple } from '../utils/get-form-type';
import { AdminField } from '../utils/get-form-defaults';
import { schemaTags } from '../config/schema';

interface Filter {
  [key: string]: string[];
}

interface Props {
  className: string;
  setState: Function;
  setTab: Function;
  setPage: Function;
  data: LabeledData[];
}

const makeArray = (value: LabeledDataProp) =>
  Array.isArray(value) ? value : [value];

const applyFilter = (data: LabeledData[], filters: Filter) => {
  const filterEntries = Object.entries(filters);
  return data.filter(item =>
    filterEntries.every(([key, value]) => {
      const edgeValues = makeArray(item[key]);
      return edgeValues.some(v =>
        typeof v !== 'string' && typeof v !== 'number'
          ? value.includes(v.value)
          : false,
      );
    }),
  );
};

const handleSubmit = (e, data, setState, setTab, setPage) => {
  e.preventDefault();
  const values = {};
  for (const [key, value] of new FormData(e.currentTarget).entries()) {
    values[key] = values[key] ? [...values[key], value] : [value];
  }
  const filteredEdges = applyFilter(data, values);
  setState(() => ({ edges: filteredEdges }));
  setTab({ table: true, filter: false });
  setPage(1);
};

const TableFilter = ({ className, setState, setTab, setPage, data }: Props) => (
  <form
    className={className}
    onSubmit={e => handleSubmit(e, data, setState, setTab, setPage)}
  >
    {schemaTags.map(({ value, label, options }) => (
      <SelectMultiple
        key={value}
        value={value}
        label={label}
        options={options}
      />
    ))}
    <AdminField />
    <br />
    <div className="field is-grouped is-grouped-right">
      <div className="control">
        <button className="button is-link is-rounded">Apply</button>
      </div>
    </div>
  </form>
);

export default TableFilter;
