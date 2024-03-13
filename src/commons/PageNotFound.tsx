import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      marginY={30}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Oops! Something went wrong.</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
