import { useParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useFetchAPI } from "../hooks/useFetchAPI";
import { useMaintainState } from "../hooks/useMaintainState";
import ImageToolbar from "../components/ImageToolbar";
import { ImageEditParamsType } from "../types/types";

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchImageById } = useFetchAPI();
  const { data: image, loading, error } = fetchImageById(id!);

  // Persist edit parameters
  const [editParams, setEditParams] = useMaintainState<ImageEditParamsType>(
    `editParams_${id}`,
    { width: 300, height: 200, grayscale: false, blur: 0 }
  );

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `edited_image_${id}.jpg`;
    link.click();
  };

  if (loading)
    return (
      <Spinner
        animation="border"
        className="d-block mx-auto my-4"
        role="status"
      />
    );
  if (error || !image)
    return (
      <Alert variant="danger" role="alert">
        {error || "Image not found"}
      </Alert>
    );

  return (
    <Container className="py-4">
      <ImageToolbar
        image={image}
        id={id!}
        editParams={editParams}
        setEditParams={setEditParams}
        onDownload={handleDownload}
      />
    </Container>
  );
};

export default EditorPage;
