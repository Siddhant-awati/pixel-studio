import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import EditorPage from "../EditorPage";
import { useMaintainState } from "../../hooks/useMaintainState";
import { ImageType } from "../../types/types";

interface ServiceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const mockFetchImageById = vi.fn<[string], ServiceState<ImageType>>();
const mockSetEditParams = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(() => ({ id: "1" })),
}));

vi.mock("../../hooks/useFetchAPI", () => ({
  useFetchAPI: vi.fn(() => ({
    fetchImageById: mockFetchImageById,
  })),
}));

vi.mock("../../hooks/useMaintainState", () => ({
  useMaintainState: vi.fn(() => [
    { width: 300, height: 200, grayscale: false, blur: 0 },
    mockSetEditParams,
  ]),
}));

vi.mock("../../components/ImageToolbar", () => ({
  default: vi.fn(({ onDownload }) => (
    <button onClick={() => onDownload("mocked-url")}>Mock Download</button>
  )),
}));

describe("EditorPage", () => {
  const mockImage: ImageType = {
    id: "1",
    author: "Test Author",
    url: "test-image.jpg",
    width: 800,
    height: 600,
    download_url: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when loading", () => {
    mockFetchImageById.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<EditorPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error message if the request fails", () => {
    mockFetchImageById.mockReturnValue({
      data: null,
      loading: false,
      error: "Error, failed to load",
    });

    render(<EditorPage />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders ImageToolbar when image is loaded", () => {
    mockFetchImageById.mockReturnValue({
      data: mockImage,
      loading: false,
      error: null,
    });

    render(<EditorPage />);
    expect(screen.getByText("Mock Download")).toBeInTheDocument();
  });
  it("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch image";
    mockFetchImageById.mockReturnValue({
      data: null,
      loading: false,
      error: errorMessage,
    });

    render(<EditorPage />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders "Image not found" when no image data', () => {
    mockFetchImageById.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<EditorPage />);
    expect(screen.getByText("Image not found")).toBeInTheDocument();
  });

  it("renders ImageToolbar when image is loaded", () => {
    mockFetchImageById.mockReturnValue({
      data: mockImage,
      loading: false,
      error: null,
    });

    render(<EditorPage />);
    expect(screen.getByText("Mock Download")).toBeInTheDocument();
  });

  it("persists edit params with image id", () => {
    mockFetchImageById.mockReturnValue({
      data: mockImage,
      loading: false,
      error: null,
    });

    render(<EditorPage />);

    expect(useMaintainState).toHaveBeenCalledWith("editParams_1", {
      width: 300,
      height: 200,
      grayscale: false,
      blur: 0,
    });
  });
});
