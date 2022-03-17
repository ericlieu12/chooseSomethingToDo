import React, { useState, useEffect } from 'react';

import Listing from './Listing';

import Stack from '@mui/material/Stack';

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
            <Stack direction="row" sx={{ height: '100vh', width: '100%' }} justifyContent="center" alignItems="center">
                <Listing listing={listings[listingID]} submitAnswer={submitAnswer} />
            </Stack>


        )
    }
    return (
        <Stack direction="row" sx={{ height: '100vh', width: '100%' }} justifyContent="center" alignItems="center">
            <Listing listing={listings[listingID]} submitAnswer={submitAnswer} />
        </Stack>
       
    )
};

export default LobbyState2;