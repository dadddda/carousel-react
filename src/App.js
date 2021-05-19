import React from "react";

import "./App.css";

import imageSlides from "./data/image-slides.json";
import textSlides from "./data/text-slides.json";

import Carousel from "./components/Carousel"

const App = () => {
  // template for image slide
  const ImageSlide = ({slideProps}) => {
    return (
      <div className="ImageSlide">
        <img src={slideProps.imgPath} alt={slideProps.filename} draggable="false"/>
      </div>
    )
  }

  // template for image thumbnail
  const ImageThumbnail = ({slideProps}) => {
    return (
      <div className="ImageThumbnail">
        <img src={slideProps.thumbnailPath} alt={slideProps.filename} draggable="false"/>
      </div>
    )
  }

  // template for text slide
  const TextSlide = ({slideProps}) => {
    return (
      <div className="TextSlide">
        <h1>{slideProps.title}</h1>
        <p>{slideProps.text}</p>
      </div>
    )
  }

  // template for text thumbnail
  const TextThumbnail = ({slideProps}) => {
    return (
      <div className="TextThumbnail">
        <h2>{slideProps.thumbnail}</h2>
      </div>
    )
  }

  return (
    <div className="App">
      <Carousel 
        slidesData={imageSlides} 
        SlideTemplate={ImageSlide}
        ThumbnailTemplate={ImageThumbnail}
      />
      <Carousel 
        slidesData={textSlides} 
        SlideTemplate={TextSlide}
        ThumbnailTemplate={TextThumbnail}
      />
    </div>
  );
}

export default App;
