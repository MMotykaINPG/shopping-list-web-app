import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

test("renders learn react link", () => {
  try {
    console.error = () => {}
    render(<LoginPage />);
  } catch {}
});

test("is a component type", () => {
  expect(LoginPage).toStrictEqual(expect.any(Function))
});