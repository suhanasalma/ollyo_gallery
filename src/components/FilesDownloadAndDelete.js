import React from 'react';
import { FaTrash, FaDownload } from "react-icons/fa";
import {toast } from 'react-toastify';


const FilesDownloadAndDelete = ({selectedFilesCount,images,setImages,imageCount,selectedImages}) => {

  const deleteFiles = () => {
    let image = images?.filter((image) => !image.selected);
    setImages(image);
    toast.success(`${selectedFilesCount} ${selectedFilesCount===1?"photo":"photos"} deleted successfully`,{
      position: "top-center",
      autoClose: 500,

    });
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
    toast.success(`${selectedFilesCount} ${selectedFilesCount===1?" photo":" photos"} downloaded successfully`,{
      position: "top-center",
      autoClose: 500,

    });
  };
    return (
        <div >
            {selectedFilesCount === 0 ? (
          <div className="text-lg">
            <p className="font-bold px-10 pt-5">Gallery</p>
          </div>
        ) : (
          <div className="flex items-center justify-between px-10 pt-5 text-lg">
            <div className="flex items-center justify-center gap-5 font-bold">
              <input
                onChange={selectAllImages}
                type="checkbox"
                checked={selectedFilesCount.length !== 0}
              />
              <p>{selectedFilesCount} file selected</p>
            </div>
            <div className="flex items-center gap-5">
              <div className=" group relative">
                <button
                  onClick={deleteFiles}
                  className="text-red-600 font-medium"
                >
                  <FaTrash />
                </button>
                <p className="text-sm bg-red-600 text-white px-2 font-semibold rounded-xl absolute left-[-10px] top-10 w-[100px] opacity-0 group-hover:opacity-100 duration-200 ease-in-out">
                  Delete Files
                </p>
              </div>
              <div className=" group relative">
                <button
                  onClick={handleDownload}
                  className="text-blue-600 font-medium"
                >
                  <FaDownload />
                </button>
                <p className="text-sm bg-blue-600 text-white px-2 font-semibold rounded-xl absolute -left-10 top-10 w-[100px] opacity-0 group-hover:opacity-100 duration-200 ease-in-out">
                  Download
                </p>
              </div>
            </div>
          </div>
        )}
        </div>
    );
};

export default FilesDownloadAndDelete;