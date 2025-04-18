import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Pagination,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useFetchAPI } from "../hooks/useFetchAPI";
import { useMaintainState } from "../hooks/useMaintainState";
import ImageCard from "../components/ImageCard";

const GalleryPage: React.FC = () => {
  const [page, setPage] = useMaintainState("currentPage", 1);
  const { fetchImages } = useFetchAPI();
  const { data: images, loading, error } = fetchImages(page);
  const navigate = useNavigate();

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  const handleImageClick = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Pixel Studio</h1>
      {loading && (
        <Spinner animation="border" className="d-block mx-auto my-4" />
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Pagination className="justify-content-center mt-4">
        {[...Array(10)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={page === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      <Row>
        {images?.map((image) => (
          <Col xs={12} sm={6} md={4} key={image.id} className="mb-3">
            <ImageCard image={image} onClick={handleImageClick} />
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">
        {[...Array(10)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={page === idx + 1}
            onClick={() => handlePageChange(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default GalleryPage;
