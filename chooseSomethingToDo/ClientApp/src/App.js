import React, { Component } from 'react';

import { Routes, Route } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Lobby from './components/Lobby/Lobby';

function App() {
    const navigate = useNavigate();

    //<link
    //    rel="stylesheet"
    //    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    ///>
    const theme = createTheme({
        palette: {
            primary: {
                main: '#000000'
            }
        },
    });
 
   
   
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
        <ThemeProvider theme={theme}>
            <div className="App">
                <button onClick={() => createLobby()}> Create Lobby </button>
             

                <Routes>
                   
                    <Route path="/lobby" >
                        <Route path=":lobbyUrl" element={<Lobby />} />
                        </Route>
                    
                    </Routes>
              
            </div>
        </ThemeProvider>
    )
}
export default App;
