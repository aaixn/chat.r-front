import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import Chat from './Chat'
import Nav from './Nav'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import io from 'socket.io-client'

const Home = ({user, friendList, setFriendList}) => {
    const {friendUsername} = useParams()
    const socket = useRef()
    const [conversation, setConversation] = useState()
    const [onlineFriends, setOnlineFriends] = useState()
    const [currentChat, setCurrentChat] = useState({
        members: []
    })
    const [message, setMessage] = useState('')
    const [receivedMessage, setReceivedMessage] = useState(null)

    useEffect(() => {
        socket.current = io('https://chat-r.herokuapp.com/')
        socket.current.on('receiveMessage', data => {
            console.log(data);
            setReceivedMessage(
              {
                sender_id: data.senderId,
                content: data.content,
                time_stamp: new Date(Date.now())
              }
            )
          })
    }, [])

    const getMessages = async() => {
        await axios.get(`https://chat-r.herokuapp.com/api/messages/${user.username}/${friendUsername}`, 
        {
            headers: {
                'Authorization': `Bearer ${user.token}`
            } 
        }).then(res => setConversation(res.data))
        .catch(err => console.log(err))
    }

    const sendMessage = async (e) => {
        e.preventDefault()  
        let receiverId = friendList && await friendList[0].filter(item => item.username === friendUsername)
        receiverId = receiverId[0].id

        socket.current.emit('sendMessage', 
        {
        senderId: user.id,
        receiverId: receiverId,
        content: message
        })

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
        await getMessages()
    }

    useEffect(() => {
        receivedMessage && currentChat?.includes(receivedMessage.sender) &&
        setConversation((prev) => [...prev, receivedMessage]);
    }, [receivedMessage, currentChat]);

    useEffect(() => {
        user && socket.current.emit('addUser', user.id)
        socket.current.on('getUsers', async (users) => {
            await user && setOnlineFriends(user.friends.filter(friend => users.some(user => user.userId === friend)))
        })
    }, [user])

    useEffect(() => {
        user && friendUsername && getMessages()
    }, [friendUsername, user, currentChat])

    return (
        <Box className='home'
            display = 'flex'
            alignItems='center'
            height = '100vh'
        >
            <Nav user={user} friendList={friendList} setFriendList={setFriendList} onlineFriends={onlineFriends} currentChat={currentChat} setCurrentChat={setCurrentChat}/> 
                <Divider orientation='vertical' color='black'/>
                <Box 
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='2em'
                    width = '70%'
                    height = '100%'
                    padding='1em'
                    boxSizing='border-box'
                    flexGrow='1'
                >
                    {conversation ? <Chat conversation={conversation} setConversation={setConversation} user={user} friendUsername={friendUsername} friendList={friendList} socket={socket} message={message} setMessage={setMessage} sendMessage={sendMessage}/> :
                    <Typography variant='h5'>Select a friend to start chatting with.</Typography>}
                </Box>
        </Box>
    )
}

export default Home
