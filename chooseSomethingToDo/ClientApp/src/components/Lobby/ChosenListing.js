import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import YelpStar from './YelpStar.js';
import YelpLogo from '../../resources/yelp_logo.png';
import Chip from '@mui/material/Chip';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const ChosenListing = (props) => {

    const { listing } = props;
    const categories = listing.categoryTitleString.split(",");
    const transactions = listing.transactionsString.split(",");
    categories.pop()
    transactions.pop()
    return (
        <Card sx={{ width: 300 }}>
            <CardMedia
                component="img"
                height="200"
                width="300"
                image={listing.imageURL}
                alt="green iguana"
                style={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography variant="h5">
                    {listing.name} ({listing.price})
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }} color="text.secondary">
                    {listing.addressString}, {listing.city}, {listing.state} {listing.zipCode}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 1 }}>

                    <YelpStar rating={listing.rating} />
                    <Typography align="center" variant="body2" color="text.secondary">
                        {listing.reviewCount} reviews
                    </Typography>
                </Stack>





                {categories.map((category) => (

                    <Chip sx={{ mb: 1 }} label={category} />

                ))}

                {/*{transactions.map((transaction) => (*/}

                {/*    <Chip label={transaction} />*/}

                {/*))}*/}


            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                <Button size="small" variant="contained"  >No</Button>
                <Button align="right" size="small" variant="contained"  >Yes</Button>
            </CardActions>
        </Card>
    )
};

export default ChosenListing;