import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useEffect, useState } from "react";

type Props = Omit<TextFieldProps, "onChange"> & {
  onChange: (value: string) => void;
};

/**
 * Text field that triggers the onChange event with some delay after the user stopped typing
 */
export default function DelayedTextField({
  onChange,
  ...textFieldProps
}: Props) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onChange(inputValue);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue, onChange]);

  return (
    <TextField
      {...textFieldProps}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
