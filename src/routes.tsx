import { createBrowserRouter } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import GalleryPage from "./pages/GalleryPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <GalleryPage />,
  },
  {
    path: "/edit/:id",
    element: <EditorPage />,
  },
]);
