import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'


const Chat = ({user}) => {
    const socket = useRef()
    const [conversation, setConversation] = useState()

    useEffect(() => {
        socket.current = io('http://localhost:4000')
    }, [])

    useEffect(() => {
        user && socket.current.emit('user', user.id)
    }, [user])

    // user && socket.current.emit('sendMessage', {
    //     senderId: user.id,
    //     receiverId: 5,
    //     content:'hi from baby po'
    // })

    // useEffect(() => {
    //     socket.current = io('http://localhost:4000')
    //     socket.current.on('retrieveMessage', (data) => {
    //         setIncomingMessage({
    //             sender_id: data.
    //         })
    //     })
    // })

    const getMessages = async() => {
        await axios.get(`http://localhost:4000/api/messages/${user.username}/buh`, 
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 
        }).then(res => setConversation(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        user && getMessages()
    }, [socket])

  return (
    <Box>
      {conversation && conversation.map((item, index) => {
        return (
            <Box key={index}>
                <Typography>{item.content}</Typography>
            </Box>
        )
      })}
    </Box>
  )
}

export default Chat
