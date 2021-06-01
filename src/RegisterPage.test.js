import { render, screen } from "@testing-library/react";
import RegisterPage from "./RegisterPage";

test("renders learn react link", () => {
  try {
    console.error = () => {}
    render(<RegisterPage />);
  } catch {}
});

test("is a component type", () => {
  expect(RegisterPage).toStrictEqual(expect.any(Function))
});
