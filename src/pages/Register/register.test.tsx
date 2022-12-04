import userEvent from "@testing-library/user-event";
import Register from "./index";
import { renderProvider } from "@/test";

describe("Register Component", () => {
  it("should render", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("title-create-user")).toBeInTheDocument();
  });
});
