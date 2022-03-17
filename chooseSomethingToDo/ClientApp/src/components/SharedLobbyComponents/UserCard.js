import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import GradeIcon from '@mui/icons-material/Grade';

const UserCard = (props) => {

    const [openJoin, setOpenJoin] = useState(true)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenJoin(false);
    };
    if (props.isLeader) {
        return (
            <Card sx={{ width: '100%', overflow: 'hidden', borderRadius: 6, bgcolor: '#FFFF00', height: '200px'}} elevation={4}>

                <CardContent>
                    <Typography gutterBottom align="center" component="div">
                        <GradeIcon sx={{ fontSize: 80 }} />
                    </Typography>
                    <Typography align="center" variant="h5" sx={{overflow: 'hidden'}}>
                        {props.name}
                    </Typography>
                    <Typography align="center" sx={{ mb: 1.5 }} variant="body2" color="#454955">
                        User
                    </Typography>
                    <Typography align="center" variant="body2" sx={{ fontStyle: 'italic' }} color="#454955">
                        The cool leader.
                    </Typography>

                </CardContent>
                <Snackbar open={openJoin} autoHideDuration={500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {props.name} has joined the lobby!
                    </Alert>
                </Snackbar>

            </Card>
        );
    }
    return (
        <Card sx={{ width: '100%', overflow: 'hidden', borderRadius: 6, bgcolor: '#F3EFF5', height: '200px' }} elevation={4}>

            <CardContent>
                <Typography gutterBottom align="center" component="div">
                    <AccountCircleIcon color="#454955" sx={{ fontSize: 80 }} />
                </Typography>
                <Typography align="center" variant="h5" sx={{ overflow: 'hidden' }}>
                    {props.name}
                </Typography>
                <Typography align="center" sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    User
                </Typography>
                <Typography align="center" variant="body2">
                    Just vibing.
                </Typography>

            </CardContent>
            <Snackbar open={openJoin} autoHideDuration={500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {props.name} has joined the lobby!
                </Alert>
            </Snackbar>

        </Card>
    );
    
}
export default UserCard;