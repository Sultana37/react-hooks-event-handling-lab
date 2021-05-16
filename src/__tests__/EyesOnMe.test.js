import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import EyesOnMe from "../components/EyesOnMe";
import React from "react";

beforeEach(() => {
  render(<EyesOnMe />);
});
function EyesOnMe() {
  function handleFocus() {
    console.log("Good!");
  }
  function handleBlur() {
    console.log("Hey! Eyes on me!");
  }
  return (
    <button onFocus={handleFocus} onBlur={handleBlur}>
    Eyes on me
  </button>
);
}
export default EyesOnMe;

test('displays a button with the text "Eyes on me"', () => {
  expect(screen.queryByText(/Eyes on me/)).toBeInTheDocument();
});

test("focusing the button triggers console output", () => {
  console.log = jest.fn();

  const button = screen.queryByText(/Eyes on me/);
  fireEvent.focus(button);

  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls[0][0]).toBe("Good!");
});

test("removing focus (blur) on the button triggers console output", () => {
  console.log = jest.fn();

  const button = screen.queryByText(/Eyes on me/);
  fireEvent.blur(button);

  expect(console.log).toHaveBeenCalled();
  expect(console.log.mock.calls[0][0]).toBe("Hey! Eyes on me!");
});
