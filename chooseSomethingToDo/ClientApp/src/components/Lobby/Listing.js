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

import YelpStar from './YelpStar.js';

import YelpFav from '../../resources/yelp_favicon.png';
import Chip from '@mui/material/Chip';


const Listing = (props) => {

    const { submitAnswer, listing } = props;
    const categories = listing.categoryTitleString.split(",");
    const id = listing.id;
    const transactions = listing.transactionsString.split(",");
    categories.pop()
    transactions.pop()
    var checkmark = '✔';
    const answerSubmit = (value) => {
        submitAnswer(value)
       
    }
    return (
        <Card sx={{ width: 300, height: 550, display: 'flex', flexDirection: 'column'}} >
            <CardMedia
                component="img"
                height="225"
                width="300"
                image={listing.imageURL}
                alt="green iguana"
                style={{objectFit: 'cover'}}
            />
            <CardContent>
                <Typography variant="h5">
                   {listing.name} ({listing.price})
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }} color="#454955">
                    {listing.addressString}, {listing.city}, {listing.state} {listing.zipCode}
                </Typography>
              
                <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                    
                    <YelpStar rating={listing.rating} />
                    <Typography align="center" variant="body2" color="#454955">
                        {listing.reviewCount} reviews
                    </Typography>
                    </Stack>
               
                   
                
               
               
                {categories.map((category) => (
                   
                    <Chip sx={{ mb: 1, mr: 2 }} label={category} />

                ))}

                {/*{transactions.map((transaction) => (*/}

                {/*    <Chip label={transaction} />*/}

                {/*))}*/}

                
            </CardContent>
            <CardActions sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignSelf:'flexEnd', mt:'auto' }} >
                
                <Button size="medium" variant="contained" onClick={() => answerSubmit('no')} > X </Button>
                <a href={listing.yelpURL} target="_blank">  <img src={YelpFav} /> </a>
               
                <Button align="right" size="medium" variant="contained" onClick={() => answerSubmit('yes')} > {checkmark}</Button>
            </CardActions>
        </Card>
    )
};

export default Listing;