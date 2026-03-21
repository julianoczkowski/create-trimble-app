import { describe, it, expect, vi } from "vitest";
import { render } from "@solidjs/testing-library";
import HomePage from "./pages/HomePage";

vi.mock("@trimble-oss/moduswebcomponents/loader", () => ({
  defineCustomElements: vi.fn(),
  setAssetPath: vi.fn(),
}));

describe("HomePage", () => {
  it("renders the app title", () => {
    const { getByText } = render(() => <HomePage />);
    expect(getByText("Modus SolidJS App")).toBeInTheDocument();
  });

  it("renders the getting started section", () => {
    const { getByText } = render(() => <HomePage />);
    expect(getByText("Getting Started")).toBeInTheDocument();
  });

  it("renders the dev panel button", () => {
    const { getByText } = render(() => <HomePage />);
    expect(getByText("Open Dev Panel")).toBeInTheDocument();
  });
});
