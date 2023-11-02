import React, { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ImageItem from "../../components/ImageItem";
import FileUploads from "../../components/FileUploads";
import FilesDownloadAndDelete from "../../components/FilesDownloadAndDelete";
import "./home.css";

const Home = ({
  images,
  setImages,
  fileInputRef,
  imageCount,
  setImageCount,
  selectedImages,
  selectedFilesCount,
  singleFileRef,
  selectRightFileToUpload,
  handleDropImage,
}) => {
  const handleCheckboxChange = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return { ...image, selected: !image.selected };
      }
      return image;
    });
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section className="w-11/12 bg-white rounded-lg shadow-lg mx-auto">
        <FilesDownloadAndDelete
          selectedFilesCount={selectedFilesCount}
          images={images}
          setImages={setImages}
          selectedImages={selectedImages}
          imageCount={imageCount}
        />
        <hr className="custom-hr my-5" />

        <div
          ref={fileInputRef}
          onDrop={handleDropImage}
          onDragOver={(e) => e.preventDefault()}
          className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 p-10"
        >
          {images?.map((item, index) => (
            <ImageItem
              images={images}
              key={item.id}
              image={item}
              index={index}
              handleCheckboxChange={handleCheckboxChange}
              setImages={setImages}
            />
          ))}
          <FileUploads
            singleFileRef={singleFileRef}
            images={images}
            imageCount={imageCount}
            setImageCount={setImageCount}
            setImages={setImages}
            selectRightFileToUpload={selectRightFileToUpload}
          />
        </div>
      </section>
    </DndProvider>
  );
};

export default Home;
