import { PaperProps, Paper, Typography } from "@mui/material";
import { Result } from "../../types/userResponse";

interface IUserDetailsCard extends PaperProps {
  user: Result;
}

function UserDetailsCard({ user, ...rest }: IUserDetailsCard) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 7,
      }}
      {...rest}
    >
      <Typography>Username: {user?.login?.username}</Typography>
      <Typography>Email: {user?.email}</Typography>
      <Typography>Phone Number: {user?.cell}</Typography>
      <Typography>
        Natonality: {user?.nat}
        <img src={`https://flagsapi.com/${user?.nat}/flat/16.png`} alt="flag" />
      </Typography>
      <Typography>Residence: {user?.location?.city}</Typography>
    </Paper>
  );
}

export default UserDetailsCard;
