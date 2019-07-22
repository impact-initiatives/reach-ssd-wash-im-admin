import React from 'react';

import SelectMultiple from './select-multiple';

interface Props {
  name: string;
  value: Select | SelectGrouped;
  state: State;
  setState: Function;
  data: LabeledData[];
}

interface Filter {
  [key: string]: string[];
}

interface State {
  filters: Filter;
  edges: LabeledData[];
}

const makeArray = (value: LabeledDataProp) =>
  Array.isArray(value) ? value : [value];

const applyFilter = (edges: LabeledData[], filters: Filter) => {
  const filterEntries = Object.entries(filters);
  return edges.filter(edge =>
    filterEntries.every(([key, value]) => {
      const edgeValues = makeArray(edge[key]);
      return edgeValues.some(v =>
        typeof v !== 'string' && typeof v !== 'number'
          ? value.includes(v.value)
          : false,
      );
    }),
  );
};

const filter = (
  selectElement: HTMLSelectElement,
  type: string,
  state: State,
  setState: Function,
  data: LabeledData[],
) => {
  const options = [];
  for (const option of Array.from(selectElement.selectedOptions))
    options.push(option.value);
  const { [type]: oldOptions, ...otherFilters } = state.filters;
  const filters = options.length
    ? { ...otherFilters, [type]: options }
    : otherFilters;
  const filteredEdges = applyFilter(data, filters);
  setState(() => ({ edges: filteredEdges, filters }));
};

const TableFilter = ({ name, value, state, setState, data }: Props) => (
  <div className="field" key={name}>
    <label className="label" htmlFor={name}>
      {value.label}
    </label>
    <div className="control">
      <SelectMultiple
        name={name}
        value={value}
        onChangeFunc={filter}
        onChangeArgs={[name, state, setState, data]}
      />
    </div>
  </div>
);

export default TableFilter;
