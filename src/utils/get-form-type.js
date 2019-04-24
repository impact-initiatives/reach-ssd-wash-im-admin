import React from 'react';
import { FaUpload } from 'react-icons/fa';

import SelectMultiple from '../components/select-multiple';

const onChange = e => {
  if (e.target.files.length) {
    e.currentTarget.parentNode.lastChild.innerHTML = e.target.files[0].name;
  }
};

const getFormType = (key, value) => {
  switch (value.type) {
    case 'upload':
      return (
        <div className="field" key={key}>
          <label className="label" htmlFor={key}>
            {value.label}
          </label>
          <div className="control">
            <div className="file has-name is-fullwidth">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name={key}
                  required={value.required}
                  aria-required={value.required}
                  onChange={onChange}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FaUpload />
                  </span>
                  <span className="file-label">Choose a file…</span>
                </span>
                <span className="file-name">No file chosen</span>
              </label>
            </div>
          </div>
        </div>
      );
    case 'input':
      return (
        <div className="field" key={key}>
          <label className="label" htmlFor={key}>
            {value.label}
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              name={key}
              id={key}
              placeholder={value.label}
              required={value.required}
              aria-required={value.required}
            />
          </div>
        </div>
      );
    case 'select-one':
      return (
        <div className="field" key={key}>
          <label className="label" htmlFor={key}>
            {value.label}
          </label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                required={value.required}
                aria-required={value.required}
                name={key}
                id={key}
                defaultValue=""
              >
                <option value="" disabled>
                  Select one
                </option>
                {Object.entries(value.options).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      );
    case 'select-multiple':
      return (
        <div className="field" key={key}>
          <label className="label" htmlFor={key}>
            {value.label}
          </label>
          <div className="control">
            <SelectMultiple name={key} value={value} />
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default getFormType;
