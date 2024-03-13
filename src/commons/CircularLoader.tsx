import { CircularProgress, CircularProgressProps } from "@mui/material";

interface ICircularLoader extends CircularProgressProps {
  isLoading: Boolean;
  children: React.ReactNode;
}

function CircularLoader({ children, isLoading, ...rest }: ICircularLoader) {
  return isLoading ? <CircularProgress {...rest} /> : children;
}

export default CircularLoader;
