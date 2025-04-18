import { Card } from "react-bootstrap";
import { ImageType } from "../types/types";

interface ImageCardProps {
  image: ImageType;
  onClick: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <Card
      onClick={() => onClick(image.id)}
      className="h-100 shadow-sm"
      style={{ cursor: "pointer" }}
    >
      <Card.Img
        variant="top"
        src={`https://picsum.photos/id/${image.id}/300/200`}
        alt={`Image by ${image.author}`}
      />
      <Card.Body>
        <Card.Text>Author: {image.author}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ImageCard;
