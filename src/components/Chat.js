import { Avatar, Box, Button, FormControl, TextField, Typography, Badge, Divider } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import moment from 'moment'
import SendRoundedIcon from '@mui/icons-material/SendRounded';


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
        <Box width='100%' display='flex' flexDirection='column' gap='1em' height='100%' overflow='hidden'>
            <Box className='chat-info'
                    display='flex'
                    alignItems='center'
                    gap='1rem'
                    height='4em'
                    top='0'
                    position='sticky'
                    backgroundColor='white'
                >
                    <Avatar />
                    <Box>
                        <Typography variant='h1' fontSize='1.5rem' fontWeight='bold'>@{friendUsername}</Typography>
                    </Box>
            </Box>
            <Divider orientation='horizontal' color='black'/>
            <Box display='flex' flexDirection='column' gap='1em' flexGrow='1' overflow='scroll'>
            {conversation && conversation.map((item, index) => {
                return (
                    <Box key={index} display='flex' flexDirection='column' width='100%' justifyContent={user.id === item.sender_id ? 'flex-end': 'flex-start'}>
                        <Box display='flex' width='100%' gap='1em' justifyContent={user.id === item.sender_id ? 'flex-end': 'flex-start'}>
                            {user.id!==item.sender_id && <Avatar variant='soft' height='2em'></Avatar>}
                            <Box width='max-content' padding='0.5em 0.8em' borderRadius='1em' backgroundColor={user.id === item.sender_id ? 'pink': 'lightgray'}>
                                <Typography>{item.content}</Typography>
                            </Box>
                            {user.id===item.sender_id && <Avatar variant='soft' height='2em' sx={{backgroundColor:'pink'}}></Avatar>}
                        </Box>
                        <Box display='flex' width='100%' justifyContent={user.id === item.sender_id ? 'flex-end': 'flex-start'}>
                        <Typography>{moment(`${item.time_stamp}`).format('MMM DD YYYY, h:mm a')}</Typography>
                        </Box>
                    </Box>
                )
            })}
            </Box>
            <Box display='flex' width='100%' alignItems='center'>
                <TextField sx={{flexGrow: 1}} name='message' value={message} onChange={handleChange}></TextField>
                <SendRoundedIcon onClick={message !== '' ? sendMessage : null} width='10%' sx={{color: 'pink', fontSize: '2em'}}/>
            </Box>
        </Box>
    )
}

export default Chat
