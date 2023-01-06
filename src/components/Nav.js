import React, { useEffect, useState } from 'react'
import { Box, Typography, Badge, Avatar, IconButton, InputBase, Divider } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import FriendRequests from './FriendRequests';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchUsers from './SearchUsers';

const Nav = ({user}) => {
    const [search, setSearch] = useState('')
    const [friendList, setFriendList] = useState()
    const [showFriendRequests, setShowFriendRequests] = useState(false)

    const handleChange = (e) => {
        e.target.name = e.target.value
        setSearch(e.target.name)
    }

    const getFriendList = async () => {
        await axios.get(`https://chat-r.herokuapp.com/api/users/${user.username}/friends`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => setFriendList(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        user && getFriendList()
    }, [user, showFriendRequests])

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

    const avatar = {
        backgroundColor: 'pink'
    }

  if (user) return (
    <Box className='nav'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        border= '2px solid'
        borderRadius='2em'
        width = '20%'
        height = '94vh'
        padding='1vw'
    >
        <Box display='flex' border='2px solid' borderRadius='1em' boxShadow='5px 5px pink' marginTop='1em' height='max-content'>
            <Box flexGrow='1' padding='0.3em 0.7em'>
                <InputBase name='search' value={search} onChange={handleChange}/>
            </Box>
            <Divider orientation='vertical' flexItem color='black'/>
            <IconButton>
                <SearchRoundedIcon/>
            </IconButton>
        </Box>
        {search == '' ? showFriendRequests ? <FriendRequests user={user} setShowFriendRequests={setShowFriendRequests} showFriendRequests={showFriendRequests}/> : 
            <Box display='flex' flexDirection='column' gap='1em' flexGrow='1' marginTop='2em'>
                {friendList && friendList.map((item, index) => {
                    return(
                        <Link to={`/${user.username}/${item[0].username}`} key={index}>
                        <Box display='flex' alignItems='center'>
                            <Badge overlap='circular' variant='dot' sx={item[0].active ? active : inactive} >
                                <Avatar variant='soft' sx={avatar} height='2em'>{item[0].name.charAt(0).toUpperCase()}</Avatar>
                            </Badge>
                            <Typography marginLeft='1rem'>{item[0].name}</Typography>
                        </Box>
                        </Link>
                    )
                })}
            </Box> : <SearchUsers user={user} search={search} setSearch={setSearch}/>}
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
            <PersonAddAlt1RoundedIcon onClick={() => setShowFriendRequests(!showFriendRequests)} sx={{color: 'gray', fontSize: '2em'}}/>
            <SettingsIcon sx={{color: 'gray', fontSize: '2em'}}/>
        </Box>
    </Box>
  )
}

export default Nav
