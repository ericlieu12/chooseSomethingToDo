import React from 'react';

import UserCard from './UserCard.js';

import Grid from '@mui/material/Grid';

const UserList = (props) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return (
            <Grid container spacing={2}>
                {props.users.map((user) => (
                    <Grid item xs={6}>
                        <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />

                    </Grid>


                ))}

            </Grid>



        )
    }
    else {
        return (
            <Grid container spacing={2}>
                {props.users.map((user) => (
                    <Grid item xs={3}>
                        <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />

                    </Grid>


                ))}

            </Grid>



        )
    }
    
};

export default UserList;