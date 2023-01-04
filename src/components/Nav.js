import React, { useEffect, useState } from 'react'
import { Box, Typography, Badge, Avatar } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';

const Nav = ({user}) => {
    const [friendList, setFriendList] = useState()

    const getFriendList = async () => {
        await axios.get(`http://localhost:4000/api/users/${user.username}/friends`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => setFriendList(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getFriendList()
    }, [user])

    const active = {
        '& .MuiBadge-badge': {
            color: 'green',
            backgroundColor: 'lightgreen',
            height: '1rem',
            minWidth: '1rem',
            borderRadius: '0.5rem'
        }
    }

    const inactive = {
        '& .MuiBadge-badge': {
            color: 'green',
            backgroundColor: 'lightgreen',
            height: '1rem',
            minWidth: '1rem',
            borderRadius: '0.5rem'
        }
    }

  if (user) return (
    <Box className='nav'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        border= '2px solid'
        borderRadius='20px'
        width = '20%'
        height = '93vh'
        padding='1vw'
    >
        <Box>
            {friendList && friendList.map(item => {
                return(
                    <Box display='flex' alignItems='center'>
                        <Badge overlap='circular' variant='dot' sx={item.active ? active : inactive} >
                            <Avatar src={item.pfp} height='2em'/>
                        </Badge>
                        <Typography marginLeft='1rem'>{item.name}</Typography>
                    </Box>
                )
            })}
        </Box>
        <Box className='me'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            height='8%'
            width='100%'
        >
            <Box height='100%' width='100%' display='flex' alignItems='center'>
                <Avatar 
                    src={user.pfp}
                    height='2em'
                />
                <Typography fontWeight='bold' marginLeft='1rem'>me</Typography>
            </Box>
            <SettingsIcon sx={{color: 'gray', fontSize: '2em'}}/>
        </Box>
    </Box>
  )
}

export default Nav
