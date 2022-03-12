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
import Container from '@mui/material/Container';
function App() {
    const navigate = useNavigate();

    //<link
    //    rel="stylesheet"
    //    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    ///>
   
   
    async function createLobby() {
        document.cookie = "userID=" + '=; Max-Age=0'
        const response = await fetch("https://localhost:7226/api/lobbies/api/createlobby", {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),
            body: JSON.stringify("Doggie")
        });
        const lobby = await response.json();
        console.log(lobby.users[0].id)
        document.cookie = "userID=" + lobby.users[0].id;
        navigate("/lobby/" + lobby.urlString);
        
    }


    return (
        <Box sx={{ height: '100vh' }} style={{overflow: 'hidden'}}>
            <AppBar position="static" sx={{ width: '100vw' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit" onClick={() => createLobby()}>Create lobby</Button>
                </Toolbar>
            </AppBar>
            <Container className="App" sx={{ mt: 5 }}>
           
         
             
             

                <Routes>
                   
                    <Route path="/lobby" >
                        <Route path=":lobbyUrl" element={<Lobby />} />
                        </Route>
                    
                    </Routes>
              
        </Container>
        </Box>
    )
}
export default App;
