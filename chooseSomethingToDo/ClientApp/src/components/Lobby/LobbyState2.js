import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Listing from './Listing';
import UserListState2 from './UserListState2';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const LobbyState2 = (props) => {
    
    const { sendYesListing, listings, sendDoneMessage } = props;
     
    const [listingID, setListingID] = useState(0);
    const submitAnswer = (answer, value) => {
        if (answer == 'yes') {
            sendYesListing(value)
        }
        if (answer == 'no') {

        }
        if ((listingID + 1) == listings.length) {
            console.log('last card reached')
            sendDoneMessage()


        }
        else {
            setListingID(listingID + 1)
        }
        
    }
    
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        console.log("Yee haw")
        return (
            <Stack direction="row" sx={{ height: 'calc (100vh-64px)', width: '100%' }} justifyContent="center" alignContent="center">
                <Listing listing={listings[listingID]} submitAnswer={submitAnswer} />
            </Stack>


        )
    }
    return (
        <Grid container spacing={2} sx={{height: 'calc (100vh-64px)'}}>
            <Grid item xs={4}>
            
            </Grid>
            <Grid item xs={4}>
               
                <Listing listing={listings[listingID]} submitAnswer={submitAnswer} />
               
            </Grid>
            <Grid item xs={4}>

            </Grid>
            </Grid>
       
    )
};

export default LobbyState2;