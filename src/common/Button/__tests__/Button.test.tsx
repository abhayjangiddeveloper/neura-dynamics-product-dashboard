import { render, screen } from "@testing-library/react";
import Button from "..";

describe("Button", () => {
  it("renders a default button", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText("Click me").closest("button");
    expect(button).toBeInTheDocument();
  });

  it("renders a primary button", () => {
    render(<Button variant="primary">Click me</Button>);

    const button = screen.getByText("Click me").closest("button");
    const container = button?.closest(".commonButtonContainer");

    expect(container).toHaveClass("primaryButton");
  });

  it("renders a secondary button", () => {
    render(<Button variant="secondary">Click me</Button>);

    const button = screen.getByText("Click me").closest("button");
    const container = button?.closest(".commonButtonContainer");

    expect(container).toHaveClass("secondaryButton");
  });

  it("renders a disabled button", () => {
    render(<Button disabled>Click me</Button>);

    const button = screen.getByText("Click me").closest("button");
    expect(button).toBeDisabled();
  });
});
