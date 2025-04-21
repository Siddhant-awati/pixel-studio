import { useState } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { ImageType, ImageEditParamsType } from "../types/types";

interface ImageEditorFormProps {
  image: ImageType;
  id: string;
  editParams: ImageEditParamsType;
  setEditParams: React.Dispatch<React.SetStateAction<ImageEditParamsType>>;
  onDownload: (url: string) => void;
}

const ImageToolbar: React.FC<ImageEditorFormProps> = ({
  image,
  id,
  editParams,
  setEditParams,
  onDownload,
}) => {
  const [localWidth, setLocalWidth] = useState(editParams.width);
  const [localHeight, setLocalHeight] = useState(editParams.height);

  const handleParamChange = (key: keyof ImageEditParamsType, value: any) => {
    setEditParams((prev) => ({ ...prev, [key]: value }));
  };

  const generateImageUrl = () => {
    let imgURL = `https://picsum.photos/id/${id}/${editParams.width}/${editParams.height}`;
    const params = [];
    if (editParams.grayscale) params.push("grayscale");
    if (editParams.blur > 0) params.push(`blur=${editParams.blur}`);
    if (params.length) imgURL += `?${params.join("&")}`;
    return imgURL;
  };

  const handleSubmit = () => {
    onDownload(generateImageUrl());
  };

  return (
    <div className="mx-auto toolbar-wrapper">
      <h2 className="mb-4">Image Toolbar</h2>
      <Form>
        <Form.Group controlId="width" className="mb-4">
          <Form.Label>Width</Form.Label>
          <Form.Control
            type="number"
            value={localWidth}
            onChange={(e) => setLocalWidth(parseInt(e.target.value) || 0)}
            onBlur={() => handleParamChange("width", localWidth)}
          />
        </Form.Group>

        <Form.Group controlId="height" className="mb-4">
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="number"
            value={localHeight}
            onChange={(e) => setLocalHeight(parseInt(e.target.value) || 0)}
            onBlur={() => handleParamChange("height", localHeight)}
          />
        </Form.Group>

        <Form.Group controlId="grayscale" className="mb-4">
          <Form.Check
            type="switch"
            label="Grayscale"
            checked={editParams.grayscale}
            onChange={(e) => handleParamChange("grayscale", e.target.checked)}
          />
        </Form.Group>

        <Form.Group controlId="blur" className="mb-4">
          <Form.Label>Blur (0-10): {editParams.blur}</Form.Label>
          <Form.Range
            value={editParams.blur}
            onChange={(e) =>
              handleParamChange("blur", parseInt(e.target.value))
            }
            min={0}
            max={10}
            step={1}
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" onClick={handleSubmit}>
            Download
          </Button>
          <Button variant="link" onClick={() => window.history.back()}>
            Back to Gallery
          </Button>
        </div>
      </Form>
      <br />
      <Image
        src={generateImageUrl()}
        alt={`Edited image by ${image.author}`}
        fluid
        className="mb-4"
      />
    </div>
  );
};

export default ImageToolbar;
