import React, { useEffect, useState } from 'react';
import './Signup.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const Signup = ({setUser}) => {
  const navigate = useNavigate()
  const [usernameTaken, setUsernameTaken] = useState(null)
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const copyForm = {...form}
    copyForm[e.target.name] = e.target.value
    setForm(copyForm)
  }

  const handleSignup = async () => {
    await axios.post('https://chat-r.herokuapp.com/api/users/signup',
    {
      name: form.name,
      username: form.username,
      password: form.password
    })
    .then((res) => {
      if (res.data === 'Username taken.') {
        setUsernameTaken(true)
      }
      else {
      setUser({...res.data.users})
      setForm({...form, name: '', username: '', password: ''})
      if(res.data.token) {
        window.localStorage.setItem('token', JSON.stringify(res.data))
      }
      navigate('/login')
    }
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
        <h1>Sign Up</h1>
        {usernameTaken && <Alert severity='error'>Username already taken.</Alert>}
        <TextField className='name-input' id="name" label="Enter Name" variant="outlined" name="name" value={form.name} onChange={handleChange}/>
        <TextField className='username-input' id="username" label="Enter Username" variant="outlined" name="username" value={form.username} onChange={handleChange}/>
        <TextField className='password-input' type="password" id="password" label="Enter Password" variant="outlined" name="password" value={form.password} onChange={handleChange}/>
        <ButtonGroup className='button-group'>
          <Button variant='contained' onClick={handleSignup}>Sign Up</Button>
          <Button variant='contained' onClick={() => navigate('/login')}>Log In</Button>
        </ButtonGroup>
        </Box>
    </>
  )
}

export default Signup

