import RadioGroup, { RadioGroupProps } from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

function RadioButtons({ onChange, value, children, ...rest }: RadioGroupProps) {
  return (
    <FormControl>
      <RadioGroup
        value={value}
        name="radio-buttons-group"
        row
        onChange={onChange}
        {...rest}
      >
        {children}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtons;
