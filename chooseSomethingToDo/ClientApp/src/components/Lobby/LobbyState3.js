import React, { useState, useEffect } from 'react';
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
import ChosenListing from './ChosenListing';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
const LobbyState3 = (props) => {

    const { users, chosen } = props;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
        {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom align="center" variant='h5'>
                        YOU GUYS ALL CHOSE --- {chosen.name}!!!
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ChosenListing listing={chosen} />
                </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={2}>
                        {users.map((user) => (
                            <Grid item xs={3}>
                                <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />

                            </Grid>


                        ))}

                    </Grid>
                </Grid>
               

            </Grid>
            )
    }
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography gutterBottom align="center" variant='h5'>
                    YOU GUYS ALL CHOSE --- {chosen.name}!!!
                </Typography>
            </Grid>
          
            <Grid item xs={8}>

                <Grid container spacing={2}>
                    {users.map((user) => (
                        <Grid item xs={3}>
                            <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />

                        </Grid>


                    ))}
                  
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <ChosenListing listing={chosen}/>
            </Grid>

        </Grid>

    )
};

export default LobbyState3;