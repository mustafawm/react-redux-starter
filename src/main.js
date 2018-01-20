import React from 'react';
import { render } from 'react-dom';
// import Perf from 'react-addons-perf';
import App from 'App';

// window.Perf = Perf;
// Perf.start();
// stop(); and printWasted(); in console later to check performance

const renderApp = () => {
  render(<App />, document.getElementById('react-app-container'));
};

renderApp(); // initial render

// HMR -- when App changes, rerender the whole thing
if ( module.hot ) {
  module.hot.accept(App, () => {
    renderApp();
  });
}
