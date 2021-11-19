import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import Feed from '../Feed/Feed'


function App() {

  const [user, setUser] = useState(userService.getUser())

  function handleSignupOrLogin(){
    console.log('it is define')
  }



  return (
      <Routes>
          <Route path='/' element={<Feed />} />
          <Route path="/login" element={<LoginPage handleSignupOrLogin={handleSignupOrLogin}/>} />
          
          <Route path="/signup" element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />} />
      </Routes>
  );
}

export default App;
