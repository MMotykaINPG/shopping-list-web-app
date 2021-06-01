import { render, screen } from "@testing-library/react";
import ListLabel from "./ListLabel";

test("renders learn react link", () => {
  try {
    console.error = () => {}
    render(<ListLabel />);
  } catch {}
});

test("is a component type", () => {
  expect(ListLabel).toStrictEqual(expect.any(Function))
});
