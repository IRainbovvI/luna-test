import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditModal from "../components/EditModal";

describe("EditModal Component", () => {
  const mockModule = {
    id: "1",
    name: "Test Module",
    description: "Test Description",
    available: true,
    targetTemperature: 25,
  };

  it("renders with correct initial values", () => {
    render(
      <EditModal
        open={true}
        handleClose={() => {}}
        module={mockModule}
        handleSave={() => {}}
      />
    );

    expect(screen.getByText("Edit Module")).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toHaveValue("Test Module");
    expect(screen.getByLabelText("Description *")).toHaveValue(
      "Test Description"
    );
    expect(screen.getByLabelText("Target Temperature")).toHaveValue(25);
  });

  it("updates state on input change", () => {
    render(
      <EditModal
        open={true}
        handleClose={() => {}}
        module={mockModule}
        handleSave={() => {}}
      />
    );

    const nameInput = screen.getByLabelText("Name *");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    expect(nameInput).toHaveValue("Updated Name");

    const tempInput = screen.getByLabelText("Target Temperature");
    fireEvent.change(tempInput, { target: { value: 30 } });
    expect(tempInput).toHaveValue(30);
  });

  it("calls handleSave on form submission", () => {
    const mockHandleSave = jest.fn();
    render(
      <EditModal
        open={true}
        handleClose={() => {}}
        module={mockModule}
        handleSave={mockHandleSave}
      />
    );

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockHandleSave).toHaveBeenCalledWith(mockModule);
  });
});
