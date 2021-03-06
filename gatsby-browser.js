import { navigate } from 'gatsby';

import wrapRootElement from './src/utils/wrap-root-element';
import './src/styles/styles.sass';

const ELEMENT_ID = 'gatsby-browser-service-worker-notification';

const addProgressBar = () => {
  if (!document.getElementById(ELEMENT_ID)) {
    const elem = document.createElement('progress');
    elem.id = ELEMENT_ID;
    elem.className = 'progress is-small is-primary is-fixed-top';
    document.body.prepend(elem);
  }
};

const removeProgressBar = () => document.getElementById(ELEMENT_ID).remove();

if (
  process.env.NODE_ENV === 'production' &&
  !navigator.serviceWorker.controller
) {
  addProgressBar();
}

export const onServiceWorkerActive = () => removeProgressBar();

export const onServiceWorkerUpdateFound = () => addProgressBar();

export const onServiceWorkerUpdateReady = () =>
  navigate(window.location.pathname);

export { wrapRootElement };
