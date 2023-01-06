import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Avatar, Typography } from '@mui/material'
import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';
import { useNavigate } from 'react-router-dom';

const SearchUsers = ({user, search, setSearch, setShowFriendRequests}) => {
    const [matchedUsers, setMatchedUsers] = useState()
    const navigate = useNavigate()
    
    const getBySearch = async () => {
        await axios.get(`https://chat-r.herokuapp.com/api/users/search/${search}`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => setMatchedUsers(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getBySearch()
    }, [search])


    const sendFriendRequest = async (item) => {
        await axios.post(`https://chat-r.herokuapp.com/api/friendRequest`,
        {
            username: user.username,
            friendToAddUsername: item.username
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        setSearch('')
    }

  return (
    <Box height='100%' margin='2em 0' display='flex' flexDirection='column' gap='1em'>
      {matchedUsers && matchedUsers.map((item, index) => {
                return(
                    <Box key={index} display='flex' alignItems='center' justifyContent='space-between'>
                        <Box display='flex' alignItems='center' width='100%'>
                            <Avatar variant='soft' sx={{backgroundColor: 'pink'}} height='2em'>{item.name.charAt(0).toUpperCase()}</Avatar>
                            <Box flexGrow='1'>
                                <Typography marginLeft='1rem' fontWeight='bold'>{item.name}</Typography>
                                <Typography marginLeft='1rem' variant='subtitle2'>@{item.username}</Typography>
                            </Box>
                            <AddReactionRoundedIcon sx={{color: 'gray', "&:hover": { color: "darkseagreen" }}} onClick={() => {
                                sendFriendRequest(item)
                                setShowFriendRequests(false)
                            }}
                            />
                        </Box>
                    </Box>
                )
        })}
    </Box>
  )
}

export default SearchUsers
