import userEvent from "@testing-library/user-event";
import Register from "./index";
import { renderProvider } from "@/test";

describe("Register Component show components renders", () => {
  it("should render", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("title-create-user")).toBeInTheDocument();
  });

  it("should render the logo", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("logo")).toBeInTheDocument();
  });

  it("should render the form", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("form")).toBeInTheDocument();
  });

  it("should render the inputs", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("input-name")).toBeInTheDocument();
    expect(getByTestId("input-email")).toBeInTheDocument();
    expect(getByTestId("input-password")).toBeInTheDocument();
    expect(getByTestId("input-password-confirm")).toBeInTheDocument();
    expect(getByTestId("input-street")).toBeInTheDocument();
    expect(getByTestId("input-neighborhood")).toBeInTheDocument();
    expect(getByTestId("input-complement")).toBeInTheDocument();
    expect(getByTestId("input-number")).toBeInTheDocument();
    expect(getByTestId("select-state")).toBeInTheDocument();
    expect(getByTestId("select-city")).toBeInTheDocument();
  });

  it("should render the button", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("submit-component")).toBeInTheDocument();
  });

  it("should render the link", () => {
    const { getByTestId } = renderProvider(<Register />);
    expect(getByTestId("link-login")).toBeInTheDocument();
  });
});
