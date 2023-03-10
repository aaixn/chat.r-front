import React, { useEffect, useState } from 'react'
import { Box, Typography, Badge, Avatar, IconButton, InputBase, Divider } from '@mui/material'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FriendRequests from './FriendRequests';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SearchUsers from './SearchUsers';

const Nav = ({user, friendList, onlineFriends, setCurrentChat, showFriendRequests, setShowFriendRequests}) => {
    const [search, setSearch] = useState('')
    const {friendUsername} = useParams()
    const navigate = useNavigate()

    const handleChange = (e) => {
        e.target.name = e.target.value
        setSearch(e.target.name)
    }

    const logOut = () => {
        window.localStorage.removeItem('token')
        navigate('/login')
    }

    const active = {
        '& .MuiBadge-badge': {
            backgroundColor: 'lightgreen',
            height: '1rem',
            minWidth: '1rem',
            borderRadius: '0.5rem'
        }
    }

    const inactive = {
        '& .MuiBadge-badge': {
            backgroundColor: 'lightgray',
            height: '1rem',
            minWidth: '1rem',
            borderRadius: '0.5rem'
        }
    }

    const avatar = {
        backgroundColor: 'pink'
    }

    const setCurrentChatTo = (user, friend) => {
        setCurrentChat([user, friend])
    }

    useEffect(() => {
        if (friendList && user && friendUsername) {        
        const person = friendList[0].filter((friend) => friend.username === friendUsername)
        setCurrentChat([user.id, person[0].id])
        }
    }, [friendList])

  if (user) return (
    <Box className='nav'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        width = '15%'
        height = '100%'
        padding='0 1vw'
    >
        <Box display='flex' border='2px solid' boxShadow='5px 5px pink' marginTop='1em' height='max-content'>
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
                        <Link to={`/${user.username}/${item[0].username}`} key={index} onClick={() => setCurrentChatTo(user.id, item[0].id)}>
                        <Box display='flex' alignItems='center'>
                            <Badge overlap='circular' variant='dot' sx={onlineFriends && onlineFriends.includes(item[0].id) ? active : inactive} >
                                <Avatar variant='soft' sx={avatar} height='2em'>{item[0].name.charAt(0).toUpperCase()}</Avatar>
                            </Badge>
                            <Box>
                                <Typography marginLeft='1rem' fontWeight='bold'>{item[0].name}</Typography>
                                <Typography marginLeft='1rem' variant='subtitle2'>@{item[0].username}</Typography>
                            </Box>
                        </Box>
                        </Link>
                    )
                })}
            </Box> : <SearchUsers user={user} search={search} setSearch={setSearch} setShowFriendRequests={setShowFriendRequests}/>}
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
            <PersonAddAlt1RoundedIcon onClick={() => setShowFriendRequests(!showFriendRequests)} sx={{color: 'black', fontSize: '2em', "&:hover": { cursor: "pointer" }}}/>
            <ExitToAppRoundedIcon sx={{color:'red', fontSize: '2em', "&:hover": { cursor: "pointer" }}} onClick={logOut}/>
        </Box>
    </Box>
  )
}

export default Nav
