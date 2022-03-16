import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Routes, Route } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
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
            <Box sx={{ height: '100vh', bgcolor: '#F3EFF5'}} style={{overflow: 'hidden'}}>

            <Container className="App" sx={{ mt: 5 }}>
           
         
             
       

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
