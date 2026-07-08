import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoginPrism } from "./LoginPrism";

describe("loginPrism", () => {
  it("renders as decorative background", () => {
    const { container } = render(<LoginPrism />);

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
