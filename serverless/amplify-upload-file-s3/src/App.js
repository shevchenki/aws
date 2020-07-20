import React from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { I18n } from "aws-amplify";
import vocabularies from "./i18n/vocabularies";

I18n.putVocabularies(vocabularies);
I18n.setLanguage("ja");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App);