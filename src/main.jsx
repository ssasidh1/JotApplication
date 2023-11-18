import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <UserProvider>
      <App />
      </UserProvider>
  </HashRouter>
    
  
);