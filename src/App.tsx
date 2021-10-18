import useClippy from 'use-clippy';
import React, { useCallback, useRef, useState } from 'react';
import { useEmail } from './useEmail';
import './App.css';

export function App() {
  const [email, setEmail] = useEmail();
  const [timestamp, setTimestamp] = useState(Date.now());
  const [showNotif, setShowNotif] = useState(false);
  const [, setClipboard] = useClippy();
  
  const emailRef = useRef('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const onChangeEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const onClickGenerateTimestamp = useCallback(() => {
    setTimestamp(Date.now());
    
    setTimeout(() => {
      setClipboard(emailRef.current);
    }, 10);
    setShowNotif(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }
    
    timer.current = setTimeout(() => {
      setShowNotif(false);
    }, 5000);
  }, [setClipboard]);

  const timestampWithPrefix = email.includes('+')
    ? `-${timestamp}`
    : `+${timestamp}`;
  const generetedEmail = email.replace(
    /(.*?)@(.*?)/,
    `$1${timestampWithPrefix}@$2`
  );

  emailRef.current = generetedEmail;

  return (
    <div className="App">
      <header className="App-header">
        <input value={email} onChange={onChangeEmail} placeholder="email" />
        <div
          style={{ paddingTop: 40 }}
          onClick={onClickGenerateTimestamp}
          className="generated-email"
        >
          <code>
            <pre>{generetedEmail}</pre>
          </code>
        </div>
        <div className={`notif ${showNotif ? 'visible' : ''}`}>Copied !</div>
      </header>
    </div>
  );
}
