import { Provider } from "react-redux";
import { store } from "@/store";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

export const renderProvider = (component: React.ReactElement, routes = []) =>
  render(<BrowserRouter>{component}</BrowserRouter>, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
