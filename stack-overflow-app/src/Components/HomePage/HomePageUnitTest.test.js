import { render, fireEvent } from "@testing-library/react"
import ReactDOM from 'react-dom';
import { HomePage } from "..";

it("rendersWithoutCrashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HomePage />, div);
});

describe("change in input", () => {
  it("on username change", () => {
    const { queryByTitle } = render(<HomePage />);
    const user = queryByTitle("regUsername");
    fireEvent.change(user, { target: { value: "testValue" } });
    expect(user.value).toBe("testValue");
  });
});
