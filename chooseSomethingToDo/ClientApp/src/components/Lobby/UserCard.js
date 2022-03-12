import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const UserCard = (props) => {
    return (
        <Card>
           
            <CardContent>
                <Typography gutterBottom align="center" component="div">
                    <AccountCircleIcon fontSize="large"/>
                </Typography>
                <Typography align="center" variant="h5">
                    {props.name}
                </Typography>
                <Typography align="center" sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
                    User
                </Typography>
                <Typography align="center" variant="body2">
                    Just vibing to the tunes.
                </Typography>

            </CardContent>
          
        </Card>
    );
}
export default UserCard;