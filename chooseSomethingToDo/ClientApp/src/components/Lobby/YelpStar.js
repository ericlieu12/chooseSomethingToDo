import React, { useState, useEffect } from 'react';

import yelp0 from '../../resources/regular_0.png';
import yelp1 from '../../resources/regular_1.png';
import yelp2 from '../../resources/regular_2.png';
import yelp3 from '../../resources/regular_3.png';
import yelp4 from '../../resources/regular_4.png';
import yelp5 from '../../resources/regular_5.png';
const YelpStar = (props) => {
    const rating = props.rating;
    if (rating == 1) {
        return (<img src={yelp1}/>)
    }
    if (rating == 2) {
        return (<img src={yelp2}/>)
    }
                if (rating == 3) {
                    return (<img src={yelp3}/>)
    }
                    if (rating == 4) {
                        return (<img src={yelp4}/>)
    }
                        if (rating == 5) {
                            return (<img src={yelp5}/>)
    }
    return (<img src={yelp0}/>)

   
};

export default YelpStar;