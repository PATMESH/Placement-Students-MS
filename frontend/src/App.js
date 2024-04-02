import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginMain from './Components/Login/LoginMain';
import Details from './Components/Users-Work/Details';
import DashBoard from './Components/Admin/DashBoard';
import Profile from './Components/Users-Work/Profile';
import EditDetails from './Components/Users-Work/EditDetails';
import Learning from './Components/Users-Work/Learning';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginMain />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/edit-details/:id" element={<EditDetails />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/learning" element={<Learning/>} />
      </Routes>
    </Router>
  );
}

export default App;