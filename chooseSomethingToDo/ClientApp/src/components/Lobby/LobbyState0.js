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
    const [ distance, setDistance ] = useState(5)
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
                    alert('Enable location permissions for this website in your browser settings.')
                }
            })
        } else {
            alert('Unable to access your location. You can continue by submitting location manually.') // Obtaining Lat/long from address necessary
        }
    }
    const getAddress = async (position) => {
        let lat = position.coords.latitude // You have obtained latitude coordinate!
        let lon = position.coords.longitude // You have obtained longitude coordinate!
        const response = await fetch("https://localhost:7226/googleapikeys", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json'

            }),


        });
        const apiKey = await response.json()

        const addressResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyD6RoqikX4m2kogP_MpaaNu86iEsXAntIY`)
        const addressString = await addressResponse.json();
        setAddress(addressString.results[0].formatted_address)
    }
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
                
                setCategoriesString(newString)
                
                
            }
        }
       
    };
    const handlePriceChange = (event) => {

       
       setPrice(event.target.value)

    };

    return (

        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h5" align="center" component="div">
                    PLAYERS
                </Typography>
                </Grid>
            <Grid item xs={4}>
                <Typography variant="h5" align="center" component="div">
                    SETTINGS {categoriesString}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                
                <Grid container spacing={2}>
            {users.map((user) => (
                        <Grid item xs={3}>
                    <UserCard name={user.name} key={user.id} />

        </Grid>
                         

            ))}
                   
                    </Grid>
                </Grid>
            <Grid item xs={4}>
                <Stack direction='column'>
                <Stack direction='row'>
                <Typography gutterBottom  sx={{ mb: 1.5 }} variant="body2" >
                    Location: {address}
                    </Typography>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Stack>
                <Typography gutterBottom sx={{ mb: 1.5 }} variant="body2" >
                  Categories
                </Typography>
                <FormGroup>
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "restaurants")} control={<Checkbox defaultChecked />} labelPlacement="start" label="Restaurants" />
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "active")} control={<Checkbox />} labelPlacement="start" label="Active Life" />
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "arts")} control={<Checkbox  />} labelPlacement="start" label="Arts & Entertainment" />
                    
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "beautysvc")} control={<Checkbox  />} labelPlacement="start" label="Beauty & Spas" />
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "food")} control={<Checkbox />} labelPlacement="start" label="Food" />
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "nightlife")} control={<Checkbox />} labelPlacement="start" label="Nightlife " />
                    
                </FormGroup>
                <Typography gutterBottom sx={{ mb: 1.5 }} variant="body2" >
                    Open Now
                </Typography>
                <FormGroup>
                    <FormControlLabel onChange={(event) => handleCheckBoxChange(event, "openNow")} control={<Checkbox defaultChecked />} labelPlacement="start" label="Open Now" />
                    

                </FormGroup>

                <Typography id="input-slider" gutterBottom>
                    Distance (min: 1 mile, max: 25 miles)
                </Typography>
                <Slider defaultValue={5} min={1} max={25} aria-label="Default" onChange={handleSliderChange} valueLabelDisplay="auto" />
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Max Price</FormLabel>
                    <RadioGroup
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
                    <Button variant="contained" onClick={() => startLobby(distance, openNow, categoriesString, price, address)}> Start Lobby </Button>
                    </Stack>
            </Grid>
          
        </Grid>
          
              
    )
};

export default LobbyState0;