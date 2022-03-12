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
import UserCard from './UserCard.js';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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

    const { startLobby, users } = props;


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
            <Grid item xs={8}>
                
                <Grid container spacing={2}>
            {users.map((user) => (
                        <Grid item xs={3}>
                    <UserCard name={user.name} key={user.id} />

        </Grid>
                         

            ))}
                    <Grid item xs={3}>
                        <UserCard name="test" key="5" />

                    </Grid>
                    <Grid item xs={3}>
                        <UserCard name="test" key="5" />

                    </Grid>
                    <Grid item xs={3}>
                        <UserCard name="test" key="5" />

                    </Grid>
                    <Grid item xs={3}>
                        <UserCard name="test" key="5" />

                    </Grid>
                    </Grid>
                </Grid>
            <Grid item xs={4}>
                <Stack direction='row'>
                <Typography gutterBottom  sx={{ mb: 1.5 }} variant="body2" >
                    Location: {props.address}
                    </Typography>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    </Stack>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} labelPlacement="start" label="Active Life" />
                    <FormControlLabel control={<Checkbox defaultChecked />} labelPlacement="start" label="Arts & Entertainment" />
                    <FormControlLabel control={<Checkbox defaultChecked />} labelPlacement="start" label="Automotive" />
                    <FormControlLabel control={<Checkbox defaultChecked />} labelPlacement="start" label="Beauty & Spas" />
        
                    <FormControlLabel disabled control={<Checkbox />} labelPlacement="start" label="Food" />
                    <FormControlLabel disabled control={<Checkbox />} labelPlacement="start" label="Nightlife " />
                    <FormControlLabel disabled control={<Checkbox />} labelPlacement="start" label="Restaurants" />
                </FormGroup>
              
            </Grid>
          
        </Grid>
          
              
    )
};

export default LobbyState0;