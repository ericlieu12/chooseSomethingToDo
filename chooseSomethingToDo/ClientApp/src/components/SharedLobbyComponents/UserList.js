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
import Slider from '@mui/material/Slider';
import EditIcon from '@mui/icons-material/Edit';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const UserList = (props) => {
  
    return (
        <Grid container spacing={2}>
            {props.users.map((user) => (
                <Grid item xs={3}>
                    <UserCard name={user.name} isLeader={user.isLeader} key={user.id} />
                   
                </Grid>


            ))}
         
        </Grid>


        
    )
};

export default UserList;