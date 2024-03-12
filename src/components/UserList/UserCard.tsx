import { Avatar, Box, Card, SxProps, Typography } from "@mui/material";
import { Result } from "../../types/userResponse";

interface IUserCard {
  user: Result;
  sx?: SxProps;
}

function UserCard({ user, sx }: IUserCard) {
  return (
    <Card sx={sx}>
      <Avatar
        alt={user?.name.first}
        sx={{ width: 64, height: 64, marginY: "auto" }}
        src={user?.picture?.thumbnail}
      />
      <Box marginLeft={1}>
        <Typography fontSize={24}>{user?.name.first}</Typography>
        <Typography>{user?.gender}</Typography>
        <Typography>{user?.dob?.age}</Typography>
      </Box>
    </Card>
  );
}

export default UserCard;
