import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import UserCard from '../SharedLobbyComponents/UserCard.js';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ChosenListing from './ChosenListing';

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
                    <Stack direction="row" sx={{ height: '100%', width: '100%' }} justifyContent="center" alignItems="center">
                        <ChosenListing listing={chosen} />
                    </Stack>
                  
                </Grid>
                <Grid item xs={12}>

                    <Grid container spacing={2}>
                        {users.map((user) => (
                            <Grid item xs={6}>
                                <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />

                            </Grid>


                        ))}

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" align="center" component="div">
                        Thank you for using my webapp! Remember to share with your friends and I appreciate any feedback at ericlieu118@gmail.com!
                    </Typography>


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
            <Grid item xs={12}>
                <Typography variant="body2" align="center" component="div">
                    Thank you for using my webapp! Remember to share with your friends and I appreciate any feedback at ericlieu118@gmail.com!
                </Typography>


            </Grid>
        </Grid>

    )
};

export default LobbyState3;