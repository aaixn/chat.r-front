import React, { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser}) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const copyForm = {...form}
    copyForm[e.target.name] = e.target.value
    setForm(copyForm)
  }

  const handleLogin = async () => {
    await axios.post('http://localhost:4000/api/auth/login',
    {
      username: form.username,
      password: form.password
    })
    .then((res) => {
      setUser({...res.data})
      setForm({...form, username: '', password: ''})
      if(res.data.token) {
        window.localStorage.setItem('token', JSON.stringify(res.data))
      }
      navigate('/')
    })
    .catch(err => console.log(err))
  }


  return (
    <>
      <Box
        className='login-form'
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Log In</h1>
        <TextField className='username-input' id="username" label="Enter Username" variant="outlined" name="username" value={form.username} onChange={handleChange}/>
        <TextField className='password-input' type="password" id="password" label="Enter Password" variant="outlined" name="password" value={form.password} onChange={handleChange}/>
        <ButtonGroup className='button-group'>
          <Button variant='contained' onClick={handleLogin}>Log In</Button>
          <Button variant='contained' onClick={() => navigate('/signup')}>Sign Up</Button>
        </ButtonGroup>
        </Box>
    </>
  )
}

export default Login

