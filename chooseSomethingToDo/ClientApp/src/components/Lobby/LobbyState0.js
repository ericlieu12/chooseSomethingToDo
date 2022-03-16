import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import UserCard from '../SharedLobbyComponents/UserCard.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import UserList from '../SharedLobbyComponents/UserList';

import FormControlLabel from '@mui/material/FormControlLabel';
import APISettings from './APISettings.js';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const LobbyState0 = (props) => {
    
    const { startLobby, users, isLeader} = props;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return (

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" align="center" component="div">
                        SETTINGS
                    </Typography>

                </Grid>
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
                <Grid item xs={12}>  <Button sx={{ width: '100%' }} style={{ backgroundColor: '#454955', color: '#F3EFF5', borderRadius: 8, padding: 5 }} > Copy Link </Button> </Grid>
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
            <Grid item xs={12}>  <Button sx={{ width: '100%' }} style={{ backgroundColor: '#454955', color: '#F3EFF5', borderRadius: 8, padding: 5 }} > Copy Link </Button> </Grid>
        </Grid>
          
              
    )
};

export default LobbyState0;