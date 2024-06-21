import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StateDataGrid from "./StateDataGrid";

describe("StateDataGrid component", () => {
  test("renders with initial rows and controls", () => {
    render(<StateDataGrid />);

    expect(screen.getByText("Subasish")).toBeInTheDocument();
    expect(screen.getByText("Nabarun")).toBeInTheDocument();

    expect(screen.getByText("Add Row")).toBeInTheDocument();
  });

  test("deletes a row", () => {
    render(<StateDataGrid />);

    const deleteButtons = screen.getAllByRole("button", { name: "delete" });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText("Subasish")).not.toBeInTheDocument();
    expect(screen.getByText("Nabarun")).toBeInTheDocument();
  });

  test("searches rows", () => {
    render(<StateDataGrid />);

    const searchInput = screen.getByLabelText("Search");
    fireEvent.change(searchInput, { target: { value: "Kolkata" } });

    expect(screen.getByText("Kolkata")).toBeInTheDocument();
    expect(screen.queryByText("Agartala")).not.toBeInTheDocument();
  });
});
