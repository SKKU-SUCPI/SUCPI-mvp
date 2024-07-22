import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'
import { Header } from './Student/components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './Student/components/Sidebar/Sidebar';
import { Home } from './Student/pages/Home';
import { GlobalChallenge } from './Student/pages/global-challenge/GlobalChallenge';
import { ICTVolunteer } from './Student/pages/ict-volunteer/ICTVolunteer';
import { KoreaChallenge } from './Student/pages/korea-challenge/KoreaChallenge';
import { Profile } from './Student/pages/profile/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='global-challenge' element={<GlobalChallenge />} />
            <Route path='ict-volunteer' element={<ICTVolunteer /> } />
            <Route path='korea-challenge' element={<KoreaChallenge /> } />
            <Route path='profile' element={<Profile />} />
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