import React, { useState, useEffect } from 'react';

const MOBILE_REG_EXP = /Mobile|iP(hone|od|ad)|Android/i;

const onMouseDownSelect = (e, state, setState) => {
  if (state.isMobile) return;
  e.preventDefault();
  e.persist();
  const selectNode = e.currentTarget;
  const { scrollTop } = selectNode;
  if (state.modalActive) e.target.selected = !e.target.selected;
  selectNode.focus();
  setState({ ...state, modalActive: true });
  setTimeout(() => {
    selectNode.scrollTop = scrollTop;
    selectNode.dispatchEvent(new Event('change', { bubbles: true }));
  }, 0);
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
          <option key={key1} value={key1}>
            {value1}
          </option>
        ))}
      </optgroup>
    ) : (
      <option key={key} value={key}>
        {value}
      </option>
    ),
  );

const onChangeSelect = (e, state, setState) => {
  const selectedOptions = [];
  for (const option of e.target.selectedOptions) selectedOptions.push(option);
  setState({ ...state, selectedOptions });
};

const onClickDelete = (e, option, state, setState, selectElement) => {
  e.persist();
  for (const currentOption of selectElement.selectedOptions) {
    if (option === currentOption) {
      currentOption.selected = false;
      const newOptions = state.selectedOptions.filter(item => item !== option);
      setState({ ...state, selectedOptions: newOptions });
      setTimeout(() => (selectElement.scrollTop = 0), 0);
    }
  }
};

const onClickModal = (e, state, setState) => {
  setState({ ...state, modalActive: false });
};

const componentDidMount = (state, setState) => {
  const isMobile = MOBILE_REG_EXP.test(navigator.userAgent);
  setState({ ...state, isMobile });
};

const SelectMultiple = ({ name, value, onChangeFunc, onChangeArgs }) => {
  const [state, setState] = useState({
    selectedOptions: [],
    modalActive: false,
    isMobile: null,
  });
  useEffect(() => componentDidMount(state, setState), []);
  const optionsLength = Math.min(getOptionsLength(value.options), 12);
  const activeClass = state.modalActive ? ' is-active' : '';
  const mobileClass = state.isMobile ? ' ua-mobile' : '';
  return (
    <a className="box">
      <div className={`modal${activeClass}${mobileClass}`}>
        <div
          className="modal-background"
          onMouseDown={e => onClickModal(e, state, setState)}
        />
        <div className="modal-card">
          <div className="select is-multiple is-fullwidth">
            <select
              multiple
              required={value.required}
              size={optionsLength}
              name={name}
              id={name}
              onMouseDown={e => onMouseDownSelect(e, state, setState)}
              onChange={e => {
                onChangeSelect(e, state, setState);
                onChangeFunc(e.target, ...onChangeArgs);
              }}
            >
              {getOptions(value.options)}
            </select>
          </div>
          <footer className="modal-card-foot">
            <button
              className="button is-link is-rounded"
              onClick={e => onClickModal(e, state, setState)}
            >
              Ok
            </button>
          </footer>
        </div>
      </div>
      {state.selectedOptions.length ? (
        <div className="field is-grouped is-grouped-multiline">
          {state.selectedOptions.map(option => (
            <div className="control" key={option.value}>
              {state.isMobile ? (
                <span className="tag is-link is-medium">{option.label}</span>
              ) : (
                <div className="tags has-addons">
                  <span className="tag is-link is-medium">{option.label}</span>
                  <button
                    className="button is-shadowless tag is-delete is-medium"
                    onClick={e => {
                      onClickDelete(
                        e,
                        option,
                        state,
                        setState,
                        e.target.parentNode.parentNode.parentNode.parentNode
                          .firstChild.lastChild.firstChild.firstChild,
                      );
                      onChangeFunc(
                        e.target.parentNode.parentNode.parentNode.parentNode
                          .firstChild.lastChild.firstChild.firstChild,
                        ...onChangeArgs,
                      );
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="content has-text-grey-light">Select multiple</div>
      )}
    </a>
  );
};

export default SelectMultiple;
