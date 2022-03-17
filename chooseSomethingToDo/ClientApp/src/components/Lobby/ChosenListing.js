import React from 'react';


import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import YelpStar from './YelpStar.js';
import YelpFav from '../../resources/yelp_favicon.png';
import Chip from '@mui/material/Chip';
import DirectionsIcon from '@mui/icons-material/Directions';

const ChosenListing = (props) => {

    const { listing } = props;
    const categories = listing.categoryTitleString.split(",");
    const transactions = listing.transactionsString.split(",");
    categories.pop()
    transactions.pop()
    const url = "https://www.google.com/maps/place/" +  listing.addressString  + "," +  listing.city  + "," +  listing.state  + "," +  listing.zipCode 
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
                <a href={listing.yelpURL} target="_blank">  <img src={YelpFav} /> </a>
                <a href={url} target="_blank"> <DirectionsIcon style={{fontSize: 55}} /> </a>
                
            </CardActions>
        </Card>
    )
};

export default ChosenListing;