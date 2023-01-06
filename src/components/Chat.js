import { Avatar, Box, Button, FormControl, TextField, Typography, Badge, Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import moment from 'moment'


const Chat = ({user, conversation, message, setMessage, sendMessage, friendUsername}) => {
    const scrollRef = useRef();

    const handleChange = (e) => {
        e.target.name = e.target.value
        setMessage(e.target.name)
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [conversation]);

    return (
        <Box width='100%' display='flex' flexDirection='column' gap='1em' overflow='auto' height='100%'>
            <Box className='chat-info'
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                    height='4em'
                >
                    <Avatar />
                    <Box>
                        <Typography variant='h1' fontSize='1.5rem' fontWeight='bold'>@{friendUsername}</Typography>
                    </Box>
                </Box>
                <Divider orientation='horizontal' width='100%' color='black'/>
            {conversation && conversation.map((item, index) => {
                return (
                    <Box key={index} display='flex' width='100%' justifyContent={user.id === item.sender_id ? 'flex-end': 'flex-start'}>
                            {user.id!==item.sender_id && <Avatar variant='soft' height='2em' sx={{backgroundColor: 'gray'}}></Avatar>}
                            <Box width='max-content' padding='0.5em' borderRadius='1em' backgroundColor={user.id === item.sender_id ? 'pink': 'lightgray'}>
                                <Typography>{item.content}</Typography>
                            </Box>
                            {user.id===item.sender_id && <Avatar variant='soft' height='2em' sx={{backgroundColor:'salmon'}}></Avatar>}
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
