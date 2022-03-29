import { Box, Checkbox, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

const SuggestedShipping=(props)=>{
    return (
        <Box style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}} 
                className='modal-shipping-profiles'>

                <Box sx={{py:1}} style={{display:'flex', alignContent:'center'}}>
                <Box><AccountCircleIcon sx={{fontSize:100, pr:1}}/></Box>
                <Box >
                    <Typography fontWeight={500} fontSize={10}>{props.name}</Typography>
                    <Typography fontWeight={100} fontSize={10}>{props.location}</Typography>
                    <Typography fontWeight={100} fontSize={10}>{props.phone_number}</Typography>
                </Box>
                <Box sx={{pl:3}} style={{alignSelf:'flex-start'}}>
                    <Checkbox  iconStyle={{fill: 'white'}}/>
                </Box>
                </Box>

              </Box>
    )
}

export default SuggestedShipping;