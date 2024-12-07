import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  // useeffect function and usenavigate hooks are used to redirect to the home page after 
  // being logged in and redirect to login page after being logged out

  const naviage = useNavigate();

    useEffect(()=>{
      onAuthStateChanged(auth,async (user) => {
        if(user){
          console.log("Logged in");
          naviage('/');
        }else{
          console.log("Logged out");
          naviage('/login');
        }
      })
    },[])

  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  )
}

export default App
