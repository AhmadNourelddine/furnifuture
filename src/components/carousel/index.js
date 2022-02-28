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
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    function Item(props)
    {
        return (
            <Card sx={{ maxWidth: 500, margin:"5%" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
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