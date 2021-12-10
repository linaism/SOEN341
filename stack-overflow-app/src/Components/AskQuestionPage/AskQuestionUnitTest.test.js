import { render, fireEvent } from "@testing-library/react"
import ReactDOM from 'react-dom';
import { AskQuestionPage } from "..";

it('rendersWithoutCrashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AskQuestionPage />, div);
});

describe("change in input", () => {
  it("on input change", () => {
    const {queryByTitle} = render(<AskQuestionPage />);
    const title = queryByTitle("askTitle");
    const content = queryByTitle("askContent");
    fireEvent.change(title, {target: {value: "testValue"} });
    fireEvent.change(content, {target: {value: "testValue"} });
    expect( title.value).toBe("testValue");
    expect(content.value).toBe("testValue");

  });
});
