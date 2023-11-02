import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ImageItem = ({
  image,
  index,
  handleCheckboxChange,
  setImages,
  images,
}) => {
  const [{ isDragging }, drag, preview] = useDrag({
    type: "IMAGE",
    item: { id: image.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(draggedItem.index, 1);
        updatedImages.splice(index, 0, movedImage);
        setImages(updatedImages);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      className={index === 0 ? "grid-item-2x2" : "grid-item cursor-pointer"}
    >
      <div
        className={`image-container rounded-lg border-2 overflow-hidden ${
          isDragging && index !== 0 ? "dragging-image" : " opacity-100"
        }`}
      >
        <img
          loading="lazy"
          alt="img"
          src={image.img}
          className={`image rounded-md `}
        />

        <div
          className={`${
            image.selected ? "selectedFile" : "overlay"
          } rounded-md`}
        >
          <input
            type="checkbox"
            checked={image.selected}
            onChange={() => handleCheckboxChange(image.id)}
            className="overlay-button w-10 h-5"
          />
        </div>

        {isDragging &&
          preview(
            <div className="drag-preview rounded-md">
              <img
                loading="lazy"
                alt="img"
                src={image.img}
                className="image rounded-lg overflow-hidden"
              />
            </div>
          )}
      </div>
    </div>
  );
};

export default ImageItem;
