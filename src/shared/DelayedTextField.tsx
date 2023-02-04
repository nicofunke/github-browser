import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";

type Props = Omit<TextFieldProps, "onChange" | "value"> & {
  onChange: (value: string) => void;
  value?: string;
};

/**
 * Text field that triggers the onChange event with some delay after the user stopped typing
 */
export default function DelayedTextField({
  onChange,
  value,
  ...textFieldProps
}: Props) {
  const [inputValue, setInputValue] = useState(value || "");
  const [delayFn, setDelayFn] = useState<NodeJS.Timeout>();

  const customOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
    clearTimeout(delayFn);
    setDelayFn(setTimeout(() => onChange(e.target.value), 500));
  };

  return (
    <TextField
      {...textFieldProps}
      value={inputValue}
      onChange={customOnChange}
    />
  );
}
