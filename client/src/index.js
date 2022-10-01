import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MemoContext, MemosProvider } from './components/container/Context/MemoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MemosProvider>
      <App />
    </MemosProvider>
  </React.StrictMode>
);