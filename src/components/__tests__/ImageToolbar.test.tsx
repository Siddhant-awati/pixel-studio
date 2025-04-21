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

  beforeEach(() => {
    mockSetEditParams.mockClear();
    mockOnDownload.mockClear();
  });

  it("renders form and updates inputs on blur", () => {
    render(
      <ImageToolbar
        image={mockImage}
        id="1"
        editParams={mockEditParams}
        setEditParams={mockSetEditParams}
        onDownload={mockOnDownload}
      />
    );

    const widthInput = screen.getByLabelText("Width") as HTMLInputElement;
    const blurInput = screen.getByLabelText(
      "Blur (0-10): 0"
    ) as HTMLInputElement;

    fireEvent.change(widthInput, { target: { value: "400" } });
    fireEvent.blur(widthInput);
    expect(mockSetEditParams).toHaveBeenCalledWith(expect.any(Function));
    const widthUpdate = mockSetEditParams.mock.calls[0][0](mockEditParams);
    expect(widthUpdate).toEqual({ ...mockEditParams, width: 400 });

    fireEvent.change(blurInput, { target: { value: "5" } });
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
