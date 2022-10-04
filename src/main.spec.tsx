import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import App from "./routes";

it("should render routes-container", () => {
    render(<App />);
    expect(screen.getByTestId("routes-container")).toBeInTheDocument();
});
