import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import '../../css/furnitureItem-sell/furnitureItem-sell.css';
import img from '../../assets/furniFuture-logo.png';

export default function FurnitureItem(props) {
  return (
    <Card className="furniture-item-card" sx={{ maxWidth: 345 }} style={{margin:"1.5rem 1rem", padding:"3rem 1rem", borderRadius:"20px"}}>
      <CardActionArea style={{display:"flex", flexDirection:"column"}}>
        <CardMedia style={{padding:"2rem 5rem"}}
          component="img"
          height="140"
          image={img}
          alt="furniture"
        />
        <div style={{padding:"1rem 2rem"}}>
          <Typography style={{fontWeight:"900"}} gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography className='content-box' variant="body2" color="text.secondary">
          {props.description}
          </Typography>

          <div className="sell-furniture-item-date-location">         
            
           <Typography className="sell-furniture-item-location content-box" variant="h6" component="div" color="text.secondary">
           {props.location}
          </Typography>

          <Typography className="sell-furniture-item-date content-box" variant="h6" component="div" color="text.secondary">
          {props.date}
          </Typography></div>

        </div>
      </CardActionArea>
      <div style={{padding: "0 2rem", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>

      <Typography className="sell-furniture-item-price" variant="h5" color="text.secondary">
         {props.price}
          </Typography>
        <Button className="sell-furniture-item-button" size="small" style={{padding:"auto"}}>
          Save
        </Button>
      </div>
    </Card>
  );
}