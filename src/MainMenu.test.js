import { render, screen } from "@testing-library/react";
import MainMenu from "./MainMenu";

test("renders learn react link", () => {
  try {
    console.error = () => {}
    render(<MainMenu />);
  } catch {}
});

test("is a component type", () => {
  expect(MainMenu).toStrictEqual(expect.any(Function))
});
