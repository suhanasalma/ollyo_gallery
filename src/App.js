import { useRef, useState } from "react";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allImages } from "./pages/Home/images";
import Empty from "./pages/EmptyPage/Empty";
import { toast } from "react-toastify";

function App() {
  const [images, setImages] = useState(allImages);
  const fileInputRef = useRef(null);
  const [imageCount, setImageCount] = useState(images.length);
  const selectedImages = images.filter((image) => image.selected);
  const selectedFilesCount = selectedImages.length;
  const singleFileRef = useRef(null);
  const selectRightFileToUpload = async (file) => {
    try {
      const fileSizeInBytes = file.size;
      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;

      if (!file.type.startsWith("image/")) {
        toast.error(`Please only select image`, {
          position: "top-center",
          autoClose: 900,
        });
        return false;
      } else if (fileSizeInMB > 10) {
        singleFileRef.current.value = "";
        toast.error(`file size is bigger then 10 MB`, {
          position: "top-center",
          autoClose: 500,
        });
        singleFileRef.current.value = "";
        return false;
      }

      return true;
    } catch (error) {}
  };

  const handleDropImage = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let result = await selectRightFileToUpload(file);
      if (result) {
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
        toast.success(`1 photo added successfully`, {
          position: "top-center",
          autoClose: 500,
        });
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto bg-gray-100  min-h-screen">
      {images.length === 0 ? (
        <Empty
          handleDropImage={handleDropImage}
          selectRightFileToUpload={selectRightFileToUpload}
          fileInputRef={fileInputRef}
          imageCount={imageCount}
          setImageCount={setImageCount}
          setImages={setImages}
          images={images}
          allImages={allImages}
          selectedImages={selectedImages}
          selectedFilesCount={selectedFilesCount}
          singleFileRef={singleFileRef}
        />
      ) : (
        <Home
          handleDropImage={handleDropImage}
          fileInputRef={fileInputRef}
          imageCount={imageCount}
          setImageCount={setImageCount}
          setImages={setImages}
          images={images}
          allImages={allImages}
          selectedImages={selectedImages}
          selectedFilesCount={selectedFilesCount}
          singleFileRef={singleFileRef}
          selectRightFileToUpload={selectRightFileToUpload}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
