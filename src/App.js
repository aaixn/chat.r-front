import { React, useEffect, useState } from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';

const App = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      const token = JSON.parse(window.localStorage.getItem('token')) || '{}'
      if (token) {
        setUser({
          ...user,
          token: token.token,
          id: token.id,
          name: token.name,
          username: token.username,
          pfp: token.pfp,
          bio: token.bio
        })
      }
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login user={user} setUser={setUser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
