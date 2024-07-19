import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './components/Header';
import { BrowserRouter } from 'react-router-dom';


function App()
{
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);