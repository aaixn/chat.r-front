import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Avatar, Typography } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const FriendRequests = ({user, showFriendRequests, setShowFriendRequests}) => {
    const [friendRequests, setFriendRequests] = useState()

    const getFriendRequests = async () => {
        await axios.get(`https://chat-r.herokuapp.com/api/friendRequest/${user.username}`,
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => setFriendRequests(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getFriendRequests()
    }, [user])

    const acceptFriendRequest = async(item) => {
        await axios.put(`https://chat-r.herokuapp.com/api/friendRequest`,
        {
            id: item.id,
            sender_id: item.sender_id,
            receiver_id: item.receiver_id
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => console.log((res.data)))
        .catch(err => console.log(err))
    }

    const declineFriendRequest = async(item) => {
        await axios.delete(`https://chat-r.herokuapp.com/api/friendRequest`,
        {
            id: item.id
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then((res) => console.log((res.data)))
        .catch(err => console.log(err))
    }

  return (
    <Box display='flex' flexDirection='column' gap='1em' flexGrow='1' margintop='2em'>
      {friendRequests && friendRequests.map((item, index) => {
                return(
                    <Box key={index} display='flex' alignItems='center' justifyContent='space-between'>
                        <Box display='flex' alignItems='center'>
                            <Avatar src={item.pfp} height='2em'/>
                            <Typography marginLeft='1rem'>{item.senderName}</Typography>
                        </Box>
                        <Box>
                            <CheckCircleRoundedIcon onClick={() => {
                                acceptFriendRequest(item)
                                setShowFriendRequests(!showFriendRequests)
                            }}
                            sx={{color:'lightgreen'}}/>
                            <CancelRoundedIcon onClick={() => declineFriendRequest(item)} sx={{color:'red'}}/>
                        </Box>
                    </Box>
                )
        })}
    </Box>
  )
}

export default FriendRequests
