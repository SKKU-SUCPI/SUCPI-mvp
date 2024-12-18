import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Home } from './Student/Home';
import { GlobalChallenge } from './Student/global-challenge/GlobalChallenge';
import { ICTVolunteer } from './Student/ict-volunteer/ICTVolunteer';
import { KoreaChallenge } from './Student/korea-challenge/KoreaChallenge';
import { Profile } from './Student/profile/Profile';
import { Leaderboard } from './Admin/leaderboard/Leaderboard';
import { Statistic } from './Admin/statistic/Statistic';
import { Setting } from './Admin/setting/Setting';
import { StudentDetail } from './Admin/studentProfile/StudentDetail';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="global-challenge" element={<GlobalChallenge />} />
            <Route path="ict-volunteer" element={<ICTVolunteer />} />
            <Route path="korea-challenge" element={<KoreaChallenge />} />
            <Route path="profile" element={<Profile />} />
            
            <Route path='/admin/leaderboard' element={<Leaderboard />} />
            <Route path='/admin/statistic' element={<Statistic />} />
            <Route path='/admin/setting' element={<Setting />} />

            <Route path="/admin/students/:id" element={<StudentDetail />} />
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
