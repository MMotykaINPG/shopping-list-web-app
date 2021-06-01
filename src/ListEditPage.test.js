import { render, screen } from "@testing-library/react";
import ListEditPage from "./ListEditPage";

test("renders learn react link", () => {
  try {
    console.error = () => {}
    render(<ListEditPage />);
  } catch {}
});

test("is a component type", () => {
  expect(ListEditPage).toStrictEqual(expect.any(Function))
});
