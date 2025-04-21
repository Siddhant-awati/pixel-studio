import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate } from "react-router-dom";
import GalleryPage from "../GalleryPage";
import { useFetchAPI } from "../../hooks/useFetchAPI";
import { useMaintainState } from "../../hooks/useMaintainState";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(() => vi.fn()),
}));

vi.mock("../../hooks/useFetchAPI", () => ({
  useFetchAPI: vi.fn(() => ({
    fetchImages: vi.fn(() => ({
      data: [],
      loading: false,
      error: null,
    })),
    fetchImageById: vi.fn(() => ({
      data: null,
      loading: false,
      error: null,
    })),
  })),
}));

vi.mock("../../hooks/useMaintainState", () => ({
  useMaintainState: vi.fn(() => [1, vi.fn()]),
}));

describe("GalleryPage", () => {
  const mockNavigate = vi.fn();
  const mockSetPage = vi.fn();
  const mockImages = [
    { id: "1", author: "Image 1", url: "http://example.com/image1.jpg" },
    { id: "2", author: "Image 2", url: "http://example.com/image2.jpg" },
  ];

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useMaintainState).mockImplementation(() => [1, mockSetPage]);

    vi.mocked(useFetchAPI).mockReturnValue({
      fetchImages: vi.fn().mockReturnValue({
        data: mockImages,
        loading: false,
        error: null,
      }),
      fetchImageById: vi.fn().mockReturnValue({
        data: null,
        loading: false,
        error: null,
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when data is loading", () => {
    vi.mocked(useFetchAPI).mockReturnValue({
      fetchImages: vi.fn().mockReturnValue({
        data: null,
        loading: true,
        error: null,
      }),
      fetchImageById: vi.fn().mockReturnValue({
        data: null,
        loading: false,
        error: null,
      }),
    });

    render(<GalleryPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders images when data is loaded", () => {
    render(<GalleryPage />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });

  it("navigates to edit page when first image is clicked", () => {
    render(<GalleryPage />);
    fireEvent.click(screen.getAllByRole("img")[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/edit/1");
  });

  it("changes page when pagination item is clicked", () => {
    render(<GalleryPage />);
    const page2Button = screen.getAllByText("2")[0];
    fireEvent.click(page2Button);
    expect(mockSetPage).toHaveBeenCalledWith(2);
  });
});
