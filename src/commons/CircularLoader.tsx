import { CircularProgress, SxProps } from "@mui/material";

interface ICircularLoader {
  isLoading: Boolean;
  children: React.ReactNode;
  sx?: SxProps;
}

function CircularLoader({ children, isLoading, sx }: ICircularLoader) {
  return isLoading ? <CircularProgress sx={sx} /> : children;
}

export default CircularLoader;
