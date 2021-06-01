import { render, screen } from "@testing-library/react";
import ItemLabel from "./ItemLabel";

test("renders learn react link", () => {
  render(<ItemLabel />);
});

test("is a component type", () => {
  expect(ItemLabel).toStrictEqual(expect.any(Function))
});
