import { Box, Typography } from '@mui/material'
import React from 'react'
import Chat from './Chat'
import Nav from './Nav'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const Home = ({user}) => {
    const {friendUsername} = useParams()
    const socket = useRef()
    const [conversation, setConversation] = useState()

    useEffect(() => {
        socket.current = io('http://localhost:4000')
    }, [])

    // useEffect(() => {
    //     user && socket.current.emit('user', user.id)
    // }, [user])

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
        await axios.get(`https://chat-r.herokuapp.com/api/messages/${user.username}/${friendUsername}`, 
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 
        }).then(res => setConversation(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        user && friendUsername && getMessages()
    }, [friendUsername, user])
    return (
        <Box className='home'
            display = 'flex'
            alignItems='center'
            justifyContent='center'
            gap='1rem'
            height = '100vh'
            padding='0 1rem'
        >
            {/* <Box className='nav'
                border= '2px solid'
                borderRadius='20px'
                width = '25%'
                height = '95vh'
            /> */}
            <Nav user={user}/> 
                <Box 
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    border= '2px solid'
                    borderRadius='2em'
                    width = '70%'
                    height = '93vh'
                    padding='1em'
                >
                    {conversation ? <Chat conversation={conversation} user={user} friendUsername={friendUsername}/> :
                    <Typography variant='h5'>Select a friend to start chatting with.</Typography>}
                </Box>
        </Box>
    )
}

export default Home
