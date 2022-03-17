import React, { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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


const APISettings = (props) => {
    const { startLobby } = props;
    const [distance, setDistance] = useState(5)
    const [openNow, setOpenNow] = useState(true)
    const [price, setPrice] = useState(4)
    const [address, setAddress] = useState('3501 W Rolling Hills Circle, Davie, FL 33328');
    const [categoriesString, setCategoriesString] = useState('restaurants')
    const getLocationData = () => {
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(getAddress, posError); // Passing in a success callback and an error callback fn
        } else {
            alert("Sorry, Geolocation is not supported by this browser."); // Alert is browser does not support geolocation
        }
    }
    // Geolocation error callback fn. Query permissions to check if the error occured due to user not allowing location to be shared
    const posError = () => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(res => {
                if (res.state === 'denied') {
                    alert('You can continue by submitting location manually.')
                }
            })
        } else {
            alert('You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
        }
    }
    const getAddress = async (position) => {
        
            let lat = position.coords.latitude // You have obtained latitude coordinate!
            let lon = position.coords.longitude // You have obtained longitude coordinate!
            const response = await fetch("/googleapikeys", {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'

                }),


            });
        const apiKey = await response.json()
        /*console.log(apiKey)*/
        const addressResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`)
            const addressString = await addressResponse.json();
            setAddress(addressString.results[0].formatted_address)
        
        
        
    }
    const enterAddress = async () => {
        const response = await fetch("/googleapikeys", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),


        });
        const apiKey = await response.json()
        const tempAddress = prompt("Please enter a valid address (128 Test Street, Town, State ZIP)", "128 Test Street, Test Town, EE 01234");
        const addressResponse = await fetch(`https://maps.google.com/maps/api/geocode/json?key=${apiKey}&address=${tempAddress}`)
        const addressString = await addressResponse.json();
        if (addressString.status == 'OK') {
            setAddress(tempAddress)
        }
        else {
            if (tempAddress == null) {
                            }
            else {
                enterAddress()
            }
        }
      
    };
    useEffect(() => {

        getLocationData()

    }, []);
    const handleSliderChange = (event) => {
        setDistance(event.target.value)
    }
    const handleCheckBoxChange = (event, value) => {


        if (event.target.checked) {
            if (value == "openNow") {
                setOpenNow(true)
            }
            else {
                var newString = categoriesString + "," + value
                if (newString.charAt(0) == ',') {

                    newString = newString.substring(1, newString.length - 1)
                }
                setCategoriesString(newString)

            }

        }
        else {
            if (value == "openNow") {
                setOpenNow(false)
            }
            else {

                var newString = categoriesString.replace((',' + value), '')
                newString = newString.replace((value), '')
                if (newString.charAt(0) == ',') {
                    newString = newString.substring(1, newString.length - 1)
                }
                setCategoriesString(newString)


            }
        }

    };
    const handlePriceChange = (event) => {


        setPrice(event.target.value)

    };
    if (props.isLeader) {
        return (
            <Stack direction='column' spacing={2}>
                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Stack direction='row'>
                        <Typography variant="body2" >
                            {address}
                        </Typography>
                        <IconButton>
                            <EditIcon onClick={() => enterAddress()}sx={{ fontSize: 12 }} />
                        </IconButton>
                    </Stack>
               
                 

                    <FormLabel>Categories</FormLabel>
                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "restaurants")} control={<Checkbox defaultChecked />} labelPlacement="end" label="Restaurants" />
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "active")} control={<Checkbox />} labelPlacement="end" label="Active Life" />
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "arts")} control={<Checkbox />} labelPlacement="end" label="Arts & Entertainment" />

                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "beautysvc")} control={<Checkbox />} labelPlacement="end" label="Beauty & Spas" />
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "food")} control={<Checkbox />} labelPlacement="end" label="Food" />
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "nightlife")} control={<Checkbox />} labelPlacement="end" label="Nightlife " />

                    </FormGroup>

                    <FormLabel>Open Now</FormLabel>
                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "openNow")} control={<Checkbox defaultChecked />} labelPlacement="end" label="Open Now" />


                    </FormGroup>

                    <FormLabel>Distance (min: 1 mile, max: 25 miles)</FormLabel>


                    <Slider defaultValue={5} min={1} max={25} aria-label="Default" onChange={handleSliderChange} valueLabelDisplay="auto" />

                    <FormLabel id="demo-radio-buttons-group-label">Max Price</FormLabel>
                    <RadioGroup sx={{ ml: 2 }} align="right"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="4"
                        name="radio-buttons-group"
                        onChange={handlePriceChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="$" />
                        <FormControlLabel value="2" control={<Radio />} label="$$" />
                        <FormControlLabel value="3" control={<Radio />} label="$$$" />
                        <FormControlLabel value="4" control={<Radio />} label="$$$$" />
                    </RadioGroup>

                </FormControl>
                <Button style={{ backgroundColor: '#454955', color: '#F3EFF5', fontSize: 20, borderRadius: 16, padding: 10 }} variant="contained" onClick={() => startLobby(distance, openNow, categoriesString, price, address)}> Start Lobby </Button>
            </Stack>
        )
    }
    else {
        return (
            <Stack direction='column' spacing={2}>
                <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Stack direction='row'>
                        <Typography variant="body2" >
                            {address}
                        </Typography>
                        <IconButton disabled>
                            <EditIcon sx={{ fontSize: 12 }} />
                        </IconButton>
                    </Stack>
                    <FormLabel>Categories</FormLabel>
                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel  disabled onChange={(event) => handleCheckBoxChange(event, "restaurants")} control={<Checkbox defaultChecked />} labelPlacement="end" label="Restaurants" />
                        <FormControlLabel  disabled onChange={(event) => handleCheckBoxChange(event, "active")} control={<Checkbox />} labelPlacement="end" label="Active Life" />
                        <FormControlLabel  disabled onChange={(event) => handleCheckBoxChange(event, "arts")} control={<Checkbox />} labelPlacement="end" label="Arts & Entertainment" />

                        <FormControlLabel disabled onChange={(event) => handleCheckBoxChange(event, "beautysvc")} control={<Checkbox />} labelPlacement="end" label="Beauty & Spas" />
                        <FormControlLabel disabled onChange={(event) => handleCheckBoxChange(event, "food")} control={<Checkbox />} labelPlacement="end" label="Food" />
                        <FormControlLabel disabled onChange={(event) => handleCheckBoxChange(event, "nightlife")} control={<Checkbox />} labelPlacement="end" label="Nightlife " />

                    </FormGroup>

                    <FormLabel>Open Now</FormLabel>
                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel disabled onChange={(event) => handleCheckBoxChange(event, "openNow")} control={<Checkbox defaultChecked />} labelPlacement="end" label="Open Now" />


                    </FormGroup>

                    <FormLabel>Distance (min: 1 mile, max: 25 miles)</FormLabel>


                    <Slider disabled defaultValue={5} min={1} max={25} aria-label="Default" onChange={handleSliderChange} valueLabelDisplay="auto" />

                    <FormLabel id="demo-radio-buttons-group-label">Max Price</FormLabel>
                    <RadioGroup  sx={{ ml: 2 }} align="right"
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="4"
                        name="radio-buttons-group"
                        onChange={handlePriceChange}
                    >
                        <FormControlLabel disabled value="1" control={<Radio />} label="$" />
                        <FormControlLabel disabled value="2" control={<Radio />} label="$$" />
                        <FormControlLabel disabled value="3" control={<Radio />} label="$$$" />
                        <FormControlLabel disabled value="4" control={<Radio />} label="$$$$" />
                    </RadioGroup>

                </FormControl>
                <Button style={{ backgroundColor: '#454955', color: '#F3EFF5', fontSize: 20, borderRadius: 16, padding: 10 }} variant="contained" disabled onClick={() => startLobby(distance, openNow, categoriesString, price, address)}> Start Lobby </Button>
            </Stack>
        )
    }
   
};

export default APISettings;