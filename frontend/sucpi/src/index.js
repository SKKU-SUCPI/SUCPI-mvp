import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from './Student/components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './Student/components/Sidebar/Sidebar';
import { Home } from './Student/pages/Home';

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);