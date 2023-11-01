import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ImageItem = ({ image, index, handleCheckboxChange, setImages,images }) => {
  const [, ref] = useDrag({
    type: 'IMAGE',
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
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
        ref(drop(node));
      }}
      
      className={index === 0 ? 'grid-item-2x2' : 'grid-item cursor-pointer'}
    >
      <div className="image-container rounded-lg border-2 overflow-hidden">
        <img alt="img" src={image.img} className="image rounded-md" />
        <div className={`${image.selected ? 'selectedFile' : 'overlay'} rounded-md`}>
          <input
            type="checkbox"
            checked={image.selected}
            onChange={() => handleCheckboxChange(image.id)}
            className="overlay-button w-10 h-5"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageItem;
