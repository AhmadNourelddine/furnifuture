import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import image from "../../assets/furniFuture-logo.png";
import Footer from "../footer"; 


const HomeCarousel = (props)=>{
    var items = [
        {
            name: "Furniture For Your Home",
            description: "View and find what you want"
        },
        {
            name: "Sell Your Furniture Easily",
            description: "Quick and Easy way to sell and find your customers"
        }
    ]
    function Item(props)
    {
        return (
            <Card sx={{ maxWidth: 700, margin:"5% auto 0% auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image= {image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
    }
    return (
        <div>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        <Footer />
        </div>

    )
}
export default HomeCarousel;