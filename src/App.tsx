import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditorPage from "./pages/EditorPage";
import GalleryPage from "./pages/GalleryPage";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Restore last route on app load
  useEffect(() => {
    const lastPath = sessionStorage.getItem("lastPath");
    if (lastPath && lastPath !== location.pathname && lastPath !== "/") {
      navigate(lastPath, { replace: true });
    }
  }, []); // Run once on mount

  // Persist current route
  useEffect(() => {
    sessionStorage.setItem("lastPath", location.pathname);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/edit/:id" element={<EditorPage />} />
      </Routes>
    </>
  );
};

export default App;
