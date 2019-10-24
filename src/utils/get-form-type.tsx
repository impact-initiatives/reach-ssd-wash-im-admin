import React from 'react';

interface Props {
  value: string;
  label: string;
  options: SelectTagOption[];
}

interface SingleProps extends Props {
  defaultValue?: string;
}

interface MultipleProps extends Props {
  defaultValue?: string[];
}

const mapSingleOptions = (
  { value, label, title }: SelectTagOption,
  parentName: string,
  defaultValue?: string,
) => (
  <div className="column is-one-quarter" key={value}>
    <label className="radio" title={title}>
      <input
        type="radio"
        name={parentName}
        value={value}
        defaultChecked={defaultValue === value}
        required
      />{' '}
      {label}
    </label>
  </div>
);

const mapMultipleOptions = (
  { value, label, title }: SelectTagOption,
  parentName: string,
  defaultValue?: string[],
) => (
  <div className="column is-one-quarter" key={value}>
    <label className="checkbox" title={title}>
      <input
        type="checkbox"
        name={parentName}
        value={value}
        defaultChecked={defaultValue && defaultValue.includes(value)}
      />{' '}
      {label}
    </label>
  </div>
);

export const SelectOne = ({
  value,
  label,
  options,
  defaultValue,
}: SingleProps) => (
  <div className="field">
    <label className="label" htmlFor={value}>
      <span>{label}</span>
      <span className="has-text-danger"> *</span>
    </label>
    <div className="columns is-gapless is-multiline box">
      {options.map(option => mapSingleOptions(option, value, defaultValue))}
    </div>
  </div>
);

export const SelectMultiple = ({
  value,
  label,
  options,
  defaultValue,
}: MultipleProps) => (
  <div className="field" key={value}>
    <label className="label" htmlFor={value}>
      <span>{label}</span>
    </label>
    <div className="columns is-gapless is-multiline box">
      {options.map(option => mapMultipleOptions(option, value, defaultValue))}
    </div>
  </div>
);
