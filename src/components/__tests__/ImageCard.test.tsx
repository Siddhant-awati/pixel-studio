import { render, screen, fireEvent } from "@testing-library/react";
import ImageCard from "../ImageCard";
import { vi } from "vitest";

const mockImage = {
  id: "1",
  author: "Author 1",
  width: 300,
  height: 200,
  url: "",
  download_url: "",
};

describe("ImageCard", () => {
  it("renders image and author", () => {
    const mockOnClick = vi.fn();
    render(<ImageCard image={mockImage} onClick={mockOnClick} />);
    expect(screen.getByText("Author: Author 1")).toBeInTheDocument();
    expect(screen.getByAltText("Image by Author 1")).toBeInTheDocument();
  });

  it("calls onClick with image ID", () => {
    const mockOnClick = vi.fn();
    render(<ImageCard image={mockImage} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText("Author: Author 1"));
    expect(mockOnClick).toHaveBeenCalledWith("1");
  });
});
