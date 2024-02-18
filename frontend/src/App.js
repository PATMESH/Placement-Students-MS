import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMain from './Components/Login/LoginMain';
import Details from './Components/Details';
import DashBoard from './Components/Admin/DashBoard';
import Profile from './Components/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;