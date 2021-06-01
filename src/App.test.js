import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});

test("is a component type", () => {
  expect(App).toStrictEqual(expect.any(Function))
});
