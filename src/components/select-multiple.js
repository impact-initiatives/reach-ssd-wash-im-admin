import React, { useState } from 'react';

const onMouseDownSelect = (e, selectNode) => {
  if (!e.shiftKey && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    e.persist();
    const { scrollTop } = selectNode;
    e.target.selected = !e.target.selected;
    selectNode.focus();
    selectNode.dispatchEvent(new Event('change', { bubbles: true }));
    setTimeout(() => (selectNode.scrollTop = scrollTop), 0);
  }
};

const getOptionsLength = options =>
  Object.values(options).reduce((acc, cur) => {
    return typeof cur === 'object'
      ? acc + Object.values(cur).reduce(acc1 => acc1 + 1, 0)
      : acc + 1;
  }, 0);

const getOptions = options =>
  Object.entries(options).map(([key, value]) =>
    typeof value === 'object' ? (
      <optgroup key={key} label={key}>
        {Object.entries(value).map(([key1, value1]) => (
          <option
            key={key1}
            onMouseDown={e =>
              onMouseDownSelect(e, e.target.parentNode.parentNode)
            }
            value={key1}
          >
            {value1}
          </option>
        ))}
      </optgroup>
    ) : (
      <option
        key={key}
        onMouseDown={e => onMouseDownSelect(e, e.target.parentNode)}
        value={key}
      >
        {value}
      </option>
    ),
  );

const onChange = (e, state, setState) => {
  const selectedOptions = [];
  for (const option of e.target.selectedOptions) {
    selectedOptions.push(option);
  }
  setState({ ...state, selectedOptions });
};

const onClickDelete = (e, option, state, setState) => {
  e.persist();
  const selectElement =
    e.target.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild
      .firstChild;
  for (const currentOption of selectElement.selectedOptions) {
    if (option === currentOption) {
      currentOption.selected = false;
      const newOptions = state.selectedOptions.filter(item => item !== option);
      setState({ ...state, selectedOptions: newOptions });
      setTimeout(() => (selectElement.scrollTop = 0), 0);
    }
  }
};

const onFocus = (e, length) => (e.target.size = length);

const onBlur = e => {
  e.target.scrollTop = 0;
  e.target.size = 1;
};

const SelectMultiple = ({ name, value }) => {
  const [state, setState] = useState({ select: null, selectedOptions: [] });
  const optionsLength = Math.min(getOptionsLength(value.options), 8);
  return (
    <div>
      <div className="field">
        <div className="select is-multiple is-fullwidth">
          <select
            multiple
            required={value.required}
            size={1}
            name={name}
            onBlur={onBlur}
            onFocus={e => onFocus(e, optionsLength)}
            onChange={e => onChange(e, state, setState)}
          >
            {getOptions(value.options)}
          </select>
        </div>
      </div>
      <div className="field is-grouped is-grouped-multiline">
        {state.selectedOptions.map(option => (
          <div className="control" key={option.value}>
            <div className="tags has-addons">
              <span className="tag is-primary is-medium">{option.label}</span>
              <a
                className="tag is-delete is-medium"
                onClick={e => onClickDelete(e, option, state, setState)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectMultiple;
