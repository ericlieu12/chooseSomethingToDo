import React, { useState } from 'react';

import { Link } from "react-router-dom";


import Backdrop from '@mui/material/Backdrop';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";


import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';

const Home = (props) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    async function createLobby() {
        setLoading(true)
        try {
           
            const response = await fetch("api/lobbies/createlobby", {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'

                }),
               
            });
            const lobby = await response.json();
          
            
            navigate("/lobby/" + lobby.urlString);
        }
        catch (ex) {
            alert("Failed to create lobbby. Wait a few seconds and try again or refresh the page.")
        }

    }
    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}

            >
                <CircularProgress color="inherit" />
            </Backdrop>)
    }
    return (
        <Stack direction="column" spacing={4} justifyContent="center"
            alignItems="center">
            <Stack>
            <Typography gutterBottom align="center" variant="h3" >
               Choose What 2 Do
                </Typography>
            <Typography gutterBottom align="center" variant="h4" >
                Find something to do with your friends (or self).
                </Typography>
                </Stack>
            <Button sx={{ width: '400px' }} style={{ fontSize: 18 }} variant="contained" onClick={() => createLobby()}>Choose a restaraunt to eat (nearby restaurants)!</Button>
            <Button sx={{ width: '400px' }} style={{ fontSize: 18 }} variant="contained" onClick={() => createLobby()}>Choose a place to go (nightclub, park, etc.)!</Button>
            <Button sx={{ width: '400px' }} style={{ fontSize: 18 }} variant="contained" disabled>Choose a Netflix movie to watch! [COMING SOON]</Button>
            <Stack>
            <Typography  align="center" variant="body1" >
                Made by <Link to="https://www.linkedin.com/in/ericlieu12"> Eric Lieu </Link>
            </Typography>
            <Typography gutterBottom align="center" variant="body1" >
                 <Link to="https://account.venmo.com/u/eric-Lieu-4"> Venmo </Link>
                </Typography>
            </Stack>
            <Stack>
            <Typography  align="center" variant="body2" >
                Any suggestions or bugs, email me at ericlieu118@gmail.com. Version 1.0, created with React, .NET Core, and SignalR.  
                </Typography>
                <Typography align="center" variant="body2" >
                    Check out how I built this and my future planned updates here:
                    <a href="https://docs.google.com/document/d/1m7E9Fm37ayJGF88pLDqmkJlLfShcEpcvd-4BHPFumQ0/edit?usp=sharing">Google Doc </a>
                </Typography>
           </Stack>
            
            </Stack>
    )
};

export default Home;