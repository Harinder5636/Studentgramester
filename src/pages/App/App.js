import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import userService from '../../utils/userService';
import Feed from '../Feed/Feed'
import Layout from "../Layout/Layout";

function App() {

  const [user, setUser] = useState(userService.getUser())

  function handleSignupOrLogin(){
    console.log('it is define')
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

if (user) {
  return (
    <Routes>
      <Route 
      path="/" 
      element={<Layout user={user} handleLogout={handleLogout}/>}>
        <Route index element={<Feed user={user}/>}></Route>
        <Route path="/:username" element={<ProfilePage user={user}/>}/>
        </Route>
    </Routes>
);
}

return (
  <Routes>
    <Route 
    path="/login"
    element={<LoginPage handleSignUpOrLogin={handleSignupOrLogin} />}
    />
    <Route 
    path="/signup"
    element={<SignupPage handleSignUpOrLogin={handleSignupOrLogin} />}
    />
    <Route path="/*" element={<Navigate to="/login" />} />
  </Routes>
);
}

export default App;
