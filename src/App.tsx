import React from 'react';
import './App.css';
import { DOMMessage, DOMMessageResponse } from './types';

function App() {
  const [title, setTitle] = React.useState('');
  const [headlines, setHeadlines] = React.useState<string[]>([]);

  React.useEffect(() => {
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs && chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        { type: 'GET_DOM' } as DOMMessage,
        (response: DOMMessageResponse) => {
          setTitle(response.title);
          setHeadlines(response.headlines);
        });
    });
  });

  return (
    <div className="App">
      <h1>Chrome Extension built with React!</h1>

      <ul className="MyForm">
        <li className="validation">
          <div className="validationField">
            <span className="validationFieldTitle">Title</span>
            <span className={`validationFieldStatus ${title.length < 30 || title.length > 65 ? 'error' : 'ok'}`}>
              {title.length} Characters
            </span>
          </div>
          <div className="validationFieldValue">
            {title}
          </div>
        </li>

        <li className="validation">
          <div className="validationField">
            <span className="validationFieldTitle">Main Heading</span>
            <span className={`validationFieldStatus ${headlines.length !== 1 ? 'error' : 'ok'}`}>
              {headlines.length}
            </span>
          </div>
          <div className="validationFieldValue">
            <ul>
              {headlines.map((headline, index) => (<li key={index}>{headline}</li>))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;