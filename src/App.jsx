import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './routes/home/Home';
import Login from './routes/auth/Login';
import SignUp from './routes/auth/SignUp';
import UserInteraction from './routes/users/UserInteraction';
import AppointmentManagement from './routes/appointment/AppointmentManagement';

function App() {


  return <>

    <Router>
      <div className='bg-gradient-to-br from-indigo-100 to-purple-200 h-screen w-screen'>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user/:userId" element={<UserInteraction />} />
          <Route path="/appointment/:userId" element={<AppointmentManagement />} />


          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </Router></>
}

export default App
