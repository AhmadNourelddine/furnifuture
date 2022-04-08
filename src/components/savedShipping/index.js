import { Avatar, Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SavedShipping = (props) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
      className="modal-shipping-profiles"
    >
      <Box sx={{ py: 1 }} style={{ display: "flex", alignContent: "center" }}>
        <Box>
          <Avatar
            sx={{ mr: 1, width: 26, height: 26 }}
            alt="PP"
            src={props.image}
          />
        </Box>
        <Box>
          <Typography fontWeight={500} fontSize={10}>
            {capitalizeFirstLetter(props.name)}
          </Typography>
          <Typography fontWeight={100} fontSize={10}>
            {props.location}
          </Typography>
          <Typography fontWeight={100} fontSize={10}>
            {props.phone_number}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SavedShipping;
