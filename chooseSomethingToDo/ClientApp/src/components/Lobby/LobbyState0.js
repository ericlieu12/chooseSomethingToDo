import React from 'react';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';

import Grid from '@mui/material/Grid';

import UserList from '../SharedLobbyComponents/UserList';


import APISettings from './APISettings.js';

const LobbyState0 = (props) => {
    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        alert("Link copied")
    }
    const { startLobby, users, isLeader } = props;
    navigator.clipboard.writeText(window.location.href)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return (

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" component="div">
                        SETTINGS
                    </Typography>

                </Grid>
                <Grid item xs={12}>  <Button onClick={() => copyLink()} sx={{ width: '100%' }} style={{ backgroundColor: '#454955', color: '#F3EFF5', borderRadius: 8, padding: 5 }} > Copy Link </Button> </Grid>
                <Grid item xs={12}>

                    <APISettings startLobby={startLobby} isLeader={isLeader} />


                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" component="div">
                        PLAYERS
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserList users={users} />

                </Grid>
                
                <Grid item xs={12}>
                    <Typography variant="body2" align="center" component="div">
                        Copy the link and share with your friends! The leader can change settings how he pleases.
                        Unfortunately, the ability to kick someone is not avaliable yet (working on it)! Just restart another lobby.
                    </Typography>


                </Grid>
                <Grid item xs={12}>  <Button onClick={() => copyLink()} sx={{ width: '100%' }} style={{ backgroundColor: '#454955', color: '#F3EFF5', borderRadius: 8, padding: 5 }} > Copy Link </Button> </Grid>
            </Grid>
        )
    }




    return (

        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h5" align="center" component="div">
                    PLAYERS
                </Typography>
                </Grid>
            <Grid item xs={4}>
                <Typography variant="h5" align="center" component="div">
                    SETTINGS
                </Typography>
            </Grid>
            <Grid item xs={8} >
                <UserList users={users}/>
                
                </Grid>

            <Grid item xs={4}>
                <APISettings startLobby={startLobby} isLeader={isLeader} />


            </Grid>

            <Grid item xs={12}>
                <Typography variant="body2" align="center" component="div">
                    Copy the link and share with your friends! The leader can change settings how he pleases.
                    Unfortunately, the ability to kick someone is not avaliable yet (working on it)! Just restart another lobby.
                </Typography>
               

            </Grid> 
            <Grid item xs={12}>  <Button sx={{ width: '100%' }} style={{ backgroundColor: '#454955', color: '#F3EFF5', borderRadius: 8, padding: 5 }} onClick={() => copyLink()}> Copy Link </Button> </Grid>
        </Grid>
          
              
    )
};

export default LobbyState0;