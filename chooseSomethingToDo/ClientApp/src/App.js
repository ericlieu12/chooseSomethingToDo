import React, { Component } from 'react';

import { Routes, Route } from 'react-router-dom';

import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Lobby from './components/Lobby/Lobby';
import Home from './components/Home/Home';
import Container from '@mui/material/Container';
function App() {
   
    const theme = createTheme({
        palette: {
            primary: {
                main: '#454955'
            }
        },
        typography: {
            allVariants: {
                color: "#0D0A0B"
            },
        },
    });
    //<link
    //    rel="stylesheet"
    //    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    ///>
   
   
    


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ minHeight: '100vh', overflow: 'auto'}} >

           
         
             
       
                <Container>
                <Routes>
                    <Route path="/" element={<Home />}/>
                       
                         
                        <Route path="/lobby">
                        <Route path=":lobbyUrl" element={<Lobby />} />
                        <Route path="*" element={<Home />} />
                        </Route>
                    
                    </Routes>
              
      </Container>
            </Box>
            </ThemeProvider>
    )
}
export default App;
