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
    
    const { sendYesListing, listings } = props;
   
    const [listingID, setListingID] = useState(0);
    const yesAnswer = () => {
        sendYesListing(listingID)
        setListingID(listingID + 1)
    }
    const noAnswer = () => {
        setListingID(listingID + 1)
    }
    return (
        <Listing listing={listings[listingID]} yesAnswer={yesAnswer} noAnswer={noAnswer} />
    )
};

export default LobbyState2;