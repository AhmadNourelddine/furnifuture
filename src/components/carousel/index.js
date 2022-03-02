import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import image1 from "../../assets/furniFuture-logo.png"; 
import image2 from "../../assets/carousel-item1.jpg";
import image3 from "../../assets/carousel-item2.jpg";
import image4 from "../../assets/carousel-item3.jpg";


const HomeCarousel = (props)=>{
    var items = [
        {
            name: "Furniture For Your Home",
            description: "View and find what you want",
            image:image1
        },
        {
            name: "Sell Your Furniture Easily",
            description: "Quick and Easy way to sell and find your customers",
            image:image2
        },
        {
            name: "Find Your Best Option",
            description: "Easy way to find what you want",
            image:image3
        },
        {
            name: "The Best Option For You",
            description: "Provides easy to use solutions",
            image:image4
        }
    ]
    function Item(props)
    {
        return (
            <Card sx={{ maxWidth: 700, margin:"auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image= {props.item.image}
                alt="green iguana"
              />
              <CardContent style={{backgroundColor:"#F7F3E3"}}>
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
        <div  style={{margin:"5%"}}>
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </div>

    )
}
export default HomeCarousel;