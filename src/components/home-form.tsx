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

const onChange = (e: React.FormEvent, setState: Function) => {
  e.persist();
  const input = DOMPurify.sanitize(marked(e.target.value));
  setState(() => ({ input }));
};

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const { value } = e.currentTarget.elements.markdown;
  if (value) {
    Storage.put('home-page.md', value, {
      customPrefix: { public: 'home/' },
      contentType: 'text/markdown',
    }).then(() =>
      fetch(exports.netlify.buildHook, { method: 'POST' }).then(() =>
        window.location.reload(),
      ),
    );
  }
};

const componentDidMount = (
  textareaElement: HTMLTextAreaElement | null,
  setState: Function,
) => {
  Storage.get('home-page.md', {
    customPrefix: { public: 'home/' },
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
  const [state, setState] = useState({ input: '', admin: false });
  const textareaElement = useRef<HTMLTextAreaElement>(null);
  useEffect(() => componentDidMount(textareaElement.current, setState), []);
  const isHidden = state.admin ? '' : ' is-hidden';
  return (
    <form onSubmit={onSubmit}>
      <div className={`field${isHidden}`}>
        <button className="button">Save Content</button>
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
