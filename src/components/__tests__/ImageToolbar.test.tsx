import { render, screen, fireEvent } from "@testing-library/react";
import ImageToolbar from "../ImageToolbar";
import { vi } from "vitest";

const mockImage = {
  id: "1",
  author: "Author 1",
  width: 300,
  height: 200,
  url: "",
  download_url: "",
};

describe("ImageToolbar", () => {
  const mockEditParams = {
    width: 300,
    height: 200,
    grayscale: false,
    blur: 0,
  };
  const mockSetEditParams = vi.fn();
  const mockOnDownload = vi.fn();

  it("renders form and updates inputs", () => {
    render(
      <ImageToolbar
        image={mockImage}
        id="1"
        editParams={mockEditParams}
        setEditParams={mockSetEditParams}
        onDownload={mockOnDownload}
      />
    );

    // Check initial values
    expect(screen.getByLabelText("Width")).toHaveValue(300);
    expect(screen.getByLabelText("Blur (0-10): 0")).toHaveValue("0");

    // Update width
    fireEvent.change(screen.getByLabelText("Width"), {
      target: { value: "400" },
    });
    expect(mockSetEditParams.mock.calls[0][0](mockEditParams)).toEqual({
      ...mockEditParams,
      width: 400,
    });

    // Update blur
    fireEvent.change(screen.getByLabelText("Blur (0-10): 0"), {
      target: { value: "5" },
    });
    expect(mockSetEditParams.mock.calls[1][0](mockEditParams)).toEqual({
      ...mockEditParams,
      blur: 5,
    });
  });

  it("calls onDownload with correct URL", () => {
    render(
      <ImageToolbar
        image={mockImage}
        id="1"
        editParams={mockEditParams}
        setEditParams={mockSetEditParams}
        onDownload={mockOnDownload}
      />
    );

    fireEvent.click(screen.getByText("Download"));
    expect(mockOnDownload).toHaveBeenCalledWith(
      "https://picsum.photos/id/1/300/200"
    );
  });
});
