import React, { useState, useEffect, useRef } from 'react';
import Storage from '@aws-amplify/storage';
import Auth from '@aws-amplify/auth';
import marked from 'marked';
import DOMPurify from 'dompurify';

import exports from '../config/exports';

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

const onSubmit = (e: React.FormEvent<HTMLFormElement>, setState: Function) => {
  e.preventDefault();
  const { value } = e.currentTarget.elements.markdown;
  if (value) {
    Storage.put('home-page.md', value, {
      customPrefix: { public: 'markdown/' },
      contentType: 'text/markdown',
    }).then(() => {
      fetch(exports.netlify.buildHook, { method: 'POST' });
      setState((state: State) => ({ ...state, edit: false }));
    });
  }
};

const componentDidMount = (
  textareaElement: HTMLTextAreaElement | null,
  setState: Function,
) => {
  Storage.get('home-page.md', {
    customPrefix: { public: 'markdown/' },
    download: true,
  }).then(response => {
    const body = response.Body.toString();
    const input = DOMPurify.sanitize(marked(body));
    if (textareaElement) textareaElement.value = body;
    setState((state: State) => ({ ...state, input }));
  });
  Auth.currentSession()
    .then(session => {
      const groups = session.getIdToken().payload['cognito:groups'];
      const admin = Boolean(groups && groups.includes('Admin'));
      setState((state: State) => ({ ...state, admin }));
    })
    .catch(() => {});
};

const IndexPage = () => {
  const [state, setState] = useState({ input: '', edit: false, admin: false });
  const textareaElement = useRef<HTMLTextAreaElement>(null);
  useEffect(() => componentDidMount(textareaElement.current, setState), []);
  const isHidden = state.admin && state.edit ? '' : ' is-hidden';
  const isHiddenEdit = state.admin && !state.edit ? '' : ' is-hidden';
  return (
    <form onSubmit={e => onSubmit(e, setState)}>
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
            className="textarea has-fixed-size field-maps-sticky-textarea"
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
