import React, { useEffect, useRef, useState } from "react";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { allImages } from "./images";
import ImageItem from "../../components/ImageItem";
import FileUploads from "../../components/FileUploads";
import FilesDownloadAndDelete from "../../components/FilesDownloadAndDelete";
import './home.css'

const Home = () => {
  const [images, setImages] = useState(allImages);
  const fileInputRef = useRef(null);
  const [imageCount, setImageCount] = useState(images.length);
  const selectedImages = images.filter((image) => image.selected);
  const selectedFilesCount = selectedImages.length;

  const handleCheckboxChange = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return { ...image, selected: !image.selected };
      }
      return image;
    });
    setImages(updatedImages);
  };

  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    setImages(updatedImages);
  };

  const deleteFiles = () => {
    let image = images.filter((image) => !image.selected);
    setImages(image);
  };
  const selectAllImages = () => {
    const updatedImages = images.map((image) => {
      if (selectedFilesCount == imageCount) {
        return { ...image, selected: false };
      }
      return { ...image, selected: true };
    });
    setImages(updatedImages);
  };
  const displaySelectedImage = (e) => {
    const files = e.target.files;
    if (files && files[0] && files[0].size < 240000) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const updatedImages = [
          ...images,
          {
            id: imageCount + 1,
            img: event.target.result,
            selected: false,
          },
        ];
        setImageCount(imageCount + 1);
        setImages(updatedImages);
        fileInputRef.current.value = "";
      };

      reader.readAsDataURL(files[0]);
    } else {
      window.prompt("file size is bigger then 3kb");
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    selectedImages.forEach((image) => {
      const a = document.createElement("a");
      a.href = image.img;
      a.download = `image_${image.id}.png`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };
  const handleDropImage = (e) => {
    e.preventDefault();

    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const updatedImages = [
            ...images,
            {
              id: imageCount + 1,
              img: event.target.result,
              selected: false,
            },
          ];
          setImageCount(imageCount + 1);
          setImages(updatedImages);
        };

        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-11/12 bg-white rounded-lg shadow-lg">
        <FilesDownloadAndDelete
          selectedFilesCount={selectedFilesCount}
          selectAllImages={selectAllImages}
          deleteFiles={deleteFiles}
          handleDownload={handleDownload}
        />
        <hr className="custom-hr my-5" />

        <div
          ref={fileInputRef}
          onDrop={handleDropImage}
          onDragOver={(e) => e.preventDefault()}
          className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 p-10 "
        >
          {images.map((item, index) => (
            <ImageItem
              images={images}
              key={item.id}
              image={item}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
              moveImage={moveImage}
              setImages={setImages}
            />
          ))}
          <FileUploads
            images={images}
            displaySelectedImage={displaySelectedImage}
          />
        </div>
      </section>
    </DndProvider>
  );
};

export default Home;
