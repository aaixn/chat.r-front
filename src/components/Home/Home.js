import { Box, Typography } from '@mui/material'
import React from 'react'

const Home = ({user}) => {
    return (
        <Box className='home'
            display = 'flex'
            alignItems='center'
            justifyContent='center'
            gap='1rem'
            height = '100vh'
            padding='0 1rem'
        >
            <Box className='nav'
                border= '2px solid'
                borderRadius='20px'
                width = '25%'
                height = '95vh'
            />
            <Box 
                display='flex'
                alignItems='center'
                justifyContent='center'
                border= '2px solid'
                borderRadius='20px'
                width = '75%'
                height = '95vh'
            >
                <Typography variant='h5'>Select a friend to start chatting with.</Typography>
            </Box>
        </Box>
    )
}

export default Home
