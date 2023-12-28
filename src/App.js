import { selectAuth } from './components/features/auth/authSilce';

import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Signup from './components/Signup'
import Login from './components/Login';
import EditProfile from './components/EditProfile';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';



function App() {
  const { isAuthenticated, user } = useSelector(selectAuth);
  useEffect(() => {
    console.log(isAuthenticated);

  }, [isAuthenticated, user]);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          {/* <Route path="/profile" element={<UserProfile />} /> */}
          <Route path="/profile/edit" element={<Signup isEditMode={true} userData={user} />} />
          {/* <Route path="/quotes" element={<QuotesList />} />
          <Route path="/quotes/search" element={<SearchQuotes />} />
          <Route path="/quotes/:quoteId" element={<SingleQuote />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
      {/* The commented out Router code below can be removed as it is not needed */}
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Login />
            </>
          } />
          <Route path="/signup" element={
            <>
              <Signup />
            </>
          } />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
