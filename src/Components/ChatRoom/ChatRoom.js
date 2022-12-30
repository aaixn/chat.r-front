import React, { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

function ChatRoom({socket}) {

    const [message, setMessage] = useState('')
    
    const sendMessage = async () => {
        if (message !== '') {
            const messageData = {
                content: message,
                time: new Date(Date.now())
            }
            await socket.emit('send_message', messageData)
        }
    }

    useEffect(() => {
        socket.on('receive_message', (arg) => {
            console.log(arg);
        })
    }, [socket])

    return (
    <div className='chatroom'>
        <h1>Start Chattin'</h1>
        <input
            placeholder='write your message'
            onChange={(e) => {
                setMessage(e.target.value)
            }}
        />
        <button
            onClick={sendMessage}
        >Send
        </button>
    </div>
  )
}

export default ChatRoom
