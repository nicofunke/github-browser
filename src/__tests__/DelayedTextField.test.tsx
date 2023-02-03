import { fireEvent, render, waitFor } from "@testing-library/react";
import DelayedTextField from "../components/shared/DelayedTextField";

it("onChange is triggered delayed after typing", async () => {
  // Given: Delayed field
  const onChange = jest.fn(() => {});
  const { getByLabelText } = render(
    <DelayedTextField
      id="my-text-field"
      label="custom text field"
      name="custom text field"
      onChange={onChange}
    />
  );
  const textField = getByLabelText("custom text field") as HTMLInputElement;

  // When: Entering different values
  fireEvent.change(textField, { target: { value: "abc" } });
  fireEvent.change(textField, { target: { value: "test123" } });
  fireEvent.change(textField, { target: { value: "last input" } });
  expect(textField.value).toBe("last input");

  // Expect: onChange is called only once with the last value
  expect(onChange.mock.calls).toHaveLength(0);
  await new Promise((resolve) => setTimeout(resolve, 500));
  expect(onChange.mock.calls).toHaveLength(1);
  expect((onChange.mock.calls[0] as any)[0]).toBe("last input");
});
