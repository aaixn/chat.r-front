import { Avatar, Box, Button, FormControl, TextField, Typography, Badge } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import moment from 'moment'


const Chat = ({user, conversation, friendUsername}) => {
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        e.target.name = e.target.value
        setMessage(e.target.name)
      }

      const sendMessage = async () => {
        await axios.post('https://chat-r.herokuapp.com/api/messages',
        {
            senderUsername: user.username,
            receiverUsername: friendUsername,
            content: message
        },
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 

        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      }

      return (
    <Box width='100%' display='flex' flexDirection='column' gap='1em'>
      {conversation && conversation.map((item, index) => {
        return (
            <Box key={index} display='flex' width='100%' justifyContent={user.id === item.sender_id ? 'flex-end': 'flex-start'}>
                    <Avatar src={user.id === item.sender_id ? user.pfp : item.pfp} ></Avatar>
                    <Box width='max-content' padding='0.5em' borderRadius='1em' backgroundColor={user.id === item.sender_id ? 'pink': 'lightgray'}>
                        <Typography>{item.content}</Typography>
                    </Box>
                <Typography>{moment(`${item.time_stamp}`).format('MMM DD YYYY, h:mm a')}</Typography>
            </Box>
        )
      })}
      <FormControl>
        <TextField name='message' value={message} onChange={handleChange}></TextField>
        <Button onClick={message !== '' ? sendMessage : null}>Send</Button>
      </FormControl>
    </Box>
  )
}

export default Chat
