import React, { useState, useEffect, useRef } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { useQuery, useMutation } from '@apollo/react-hooks';
import jwtDecode from 'jwt-decode';

import { GET_HOME_PAGE, UPDATE_HOME_PAGE } from '../config/graphql';
import { getToken } from '../utils/wrap-root-element';

interface State {
  input: string;
  admin: boolean;
}

const onClick = (setState: Function, edit: boolean) => {
  setState((state: State) => ({ ...state, edit }));
};

const onChange = (e: React.FormEvent, setState: Function) => {
  e.persist();
  const input = DOMPurify.sanitize(marked(e.target.value));
  setState((state: State) => ({ ...state, input }));
};

const onSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  setState: Function,
  updateHomePage: Function,
) => {
  e.preventDefault();
  const { value } = e.currentTarget.elements.markdown;
  if (value) {
    updateHomePage({ variables: { markdown: value } });
    setState((state: State) => ({ ...state, edit: false }));
  }
};

const updateMarkdown = (
  textareaElement: HTMLTextAreaElement | null,
  setState: Function,
  data: any,
) => {
  if (data) {
    const body = data.getHomePage.markdown;
    const input = DOMPurify.sanitize(marked(body));
    if (textareaElement) textareaElement.value = body;
    setState((state: State) => ({ ...state, input }));
  }
};

const componentDidMount = (setState: Function) => {
  getToken
    .then(token => {
      const admin = Boolean(
        token && jwtDecode(token).permissions.includes('admin'),
      );
      setState((state: State) => ({ ...state, admin }));
    })
    .catch(() => setState((state: State) => ({ ...state, admin: false })));
};

const IndexPage = () => {
  const { data } = useQuery(GET_HOME_PAGE);
  const [updateHomePage] = useMutation(UPDATE_HOME_PAGE);
  const [state, setState] = useState({ input: '', edit: false, admin: false });
  const textareaElement = useRef<HTMLTextAreaElement>(null);
  useEffect(() => updateMarkdown(textareaElement.current, setState, data), [
    data,
  ]);
  useEffect(() => componentDidMount(setState), []);
  const isHidden = state.admin && state.edit ? '' : ' is-hidden';
  const isHiddenEdit = state.admin && !state.edit ? '' : ' is-hidden';
  return (
    <form onSubmit={e => onSubmit(e, setState, updateHomePage)}>
      <div className={`field buttons${isHidden}`}>
        <button
          className="button is-rounded is-link"
          type="button"
          onClick={() => onClick(setState, false)}
        >
          Cancel Edits
        </button>
        <button className="button is-rounded is-primary">Save Content</button>
      </div>
      <div className={`field${isHiddenEdit}`}>
        <button
          className="button is-rounded is-link"
          type="button"
          onClick={() => onClick(setState, true)}
        >
          Edit Content
        </button>
      </div>
      <div className="columns is-desktop">
        <div className={`column${isHidden}`}>
          <textarea
            className="textarea has-fixed-size impact-cms-sticky-textarea"
            name="markdown"
            ref={textareaElement}
            onChange={e => onChange(e, setState)}
          />
        </div>
        <div className="column">
          <div
            dangerouslySetInnerHTML={{ __html: state.input }}
            className="content"
          />
        </div>
      </div>
    </form>
  );
};

export default IndexPage;
