import React from "react";
import cover from "../../assests/cover/394730-wallpaper-night-city-moon-4k-hd.jpg";
import "./empty.css";
import Marquee from "react-fast-marquee";

import FileUploads from "../../components/FileUploads";
import { imagesOneRow, imagesSecondRow } from "./emptyData";

const Empty = ({
  images,
  setImages,
  fileInputRef,
  imageCount,
  setImageCount,
  singleFileRef,
  selectRightFileToUpload,
  handleDropImage,
}) => {
  return (
    <section
      ref={fileInputRef}
      onDrop={handleDropImage}
      onDragOver={(e) => e.preventDefault()}
      className="w-11/12 mx-auto p-5 bg-white"
    >
      <div className=" w-full relative empty_cover">
        <img
          loading="lazy"
          className="w-full h-60 object-cover object-top"
          src={cover}
        />
        <p className="text-white font-bold xl:text-4xl md:text-2xl text-lg ">
          Showcase & Discover Creative Work
        </p>
      </div>
      <div className="my-20">
        <Marquee pauseOnClick={true} autoFill={true}>
          {imagesOneRow?.map((item, i) => (
            <img
              loading="lazy"
              key={i}
              className="w-66 h-32 object-cover mx-10 rounded-lg border-4 border-red-500 border-double"
              alt="item"
              src={item.img}
            />
          ))}
        </Marquee>
      </div>
      <div className="my-20">
        <Marquee direction="right" pauseOnClick={true} autoFill={true}>
          {imagesSecondRow?.map((item, i) => (
            <img
              loading="lazy"
              key={i}
              className="w-66 h-32 rounded-lg border-2 border-red-400 border-dashed object-cover mx-10"
              alt="item"
              src={item.img}
            />
          ))}
        </Marquee>
      </div>
      <FileUploads
        singleFileRef={singleFileRef}
        images={images}
        imageCount={imageCount}
        setImageCount={setImageCount}
        setImages={setImages}
        selectRightFileToUpload={selectRightFileToUpload}
      />
    </section>
  );
};

export default Empty;
