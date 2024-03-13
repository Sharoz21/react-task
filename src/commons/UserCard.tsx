import {
  Avatar,
  AvatarProps,
  Box,
  Card,
  CardProps,
  Typography,
} from "@mui/material";
import { Result } from "../types/userResponse";

interface IUserCard extends CardProps {
  user: Result;
}

function UserCard({ user, sx, children, ...rest }: IUserCard) {
  return (
    <Card sx={sx} {...rest}>
      {children}
      <Box marginLeft={1}>
        <Typography variant="h5" fontSize={24}>
          {user?.name.first} {user?.name.last}
        </Typography>
        <Typography variant="body1">{user?.gender}</Typography>
        <Typography variant="body2">{user?.dob?.age}</Typography>
      </Box>
    </Card>
  );
}

interface IUserAvatar extends AvatarProps {}

function UserAvatar(props: IUserAvatar) {
  return <Avatar {...props} />;
}

UserCard.UserAvatar = UserAvatar;

export default UserCard;
