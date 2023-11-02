import React from "react";
import { BsImage } from "react-icons/bs";
import { toast } from "react-toastify";

const FileUploads = ({
  images,
  imageCount,
  setImageCount,
  setImages,
  singleFileRef,
  selectRightFileToUpload
}) => {
  //   const uploadFile = async (e) => {
  //     const file = e.target.files[0];
  //     if (!file) {
  //       return;
  //     }
  //     const formData = new FormData();
  //     formData.append("image", file);

  //   const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`;
  //     fetch(url, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         if (result.status === 200) {
  //           const updatedImages = [
  //             ...images,
  //             {
  //               id: imageCount + 1,
  //               img: result?.data?.url,
  //               selected: false,
  //             },
  //           ];
  //           setImages(updatedImages);
  //         }
  //         console.log("result", "img: result.data.display_url", result);
  //       });
  //   };
  const displaySelectedImage = async (e) => {
    const files = e.target.files;
    let result = await selectRightFileToUpload(files[0])
    if(result){
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
          singleFileRef.current.value = "";
          toast.success(`1 photo added successfully`, {
            position: "top-center",
            autoClose: 500,
          });
        };
  
        reader.readAsDataURL(files[0]);
    }
  };


  return (
    <div
      className={`grid-item border-2 border-dashed rounded-lg flex justify-center items-center bg-gray-100 min-h-[140px] relative ${
        images.length === 0 ? "grid-item-2x2" : ""
      }`}
    >
      <input
        ref={singleFileRef}
        onChange={displaySelectedImage}
        accept="image/*"
        type="file"
        name="file"
        className="w-full h-full absolute opacity-0"
      />
      <div className="text-center">
        <div className="flex justify-center items-center">
          <BsImage className="text-xl" />
        </div>
        <p className="font-semibold">Add Images</p>
      </div>
    </div>
  );
};

export default FileUploads;
