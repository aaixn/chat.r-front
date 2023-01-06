import { React, useEffect, useState } from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup';
import Home from './components/Home';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState()
  const [friendList, setFriendList] = useState()

  const getFriendList = async () => {
    await axios.get(`https://chat-r.herokuapp.com/api/users/${user.username}/friends`,
    {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
    .then(res =>setFriendList(res.data))
    .catch(err => console.log(err))
}

useEffect(() => {
    user && getFriendList()
}, [user])

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
          bio: token.bio,
          friends: token.friends
        })
      }
    }
  }, [])

  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={user ? <Home user={user} setUser={setUser} friendList={friendList} setFriendList={setFriendList}/> : <Navigate to='/login'/>}></Route>
        <Route path='/login' element={<Login user={user} setUser={setUser} />}></Route>
        <Route path='/signup' element={<Signup user={user} setUser={setUser} />}></Route>
        <Route path='/:username/:friendUsername' element={<Home user={user} friendList={friendList} setFriendList={setFriendList} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
