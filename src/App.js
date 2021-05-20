import React from "react";

import "./App.css";

import slidesData from "./data/slides-data.json";

import SlidesWrapper from "./components/SlidesWrapper";
import Carousel from "./components/Carousel";

const App = () => {
  const mainSlidesArr = slidesData.map(slideData => {
    return (
      <>
        <div className="textSlide">
          <h1>{slideData.filename}</h1>
          <p>{slideData.text}</p>
        </div>
        <div className="imageSlide">
          <img src={slideData.imgPath} alt={slideData.filename} draggable="false"/>
        </div>
      </>
    ).props.children;
  });

  const thumbnailSlidesArr = slidesData.map(slideData => {
    return (
      <>
        <div className="textThumbnail">
          <h2>{slideData.thumbnail}</h2>
        </div>
        <div className="imageThumbnail">
          <img src={slideData.thumbnailPath} alt={slideData.filename} draggable="false"/>
        </div>
      </>
    ).props.children;
  });
  
  const mainSlides = <SlidesWrapper>
    {mainSlidesArr.flat()}
  </SlidesWrapper>

  const thumbnailSlides = <SlidesWrapper>
    {thumbnailSlidesArr.flat()}
  </SlidesWrapper>

  return (
    <div className="App">
      <Carousel 
        mainSlides={mainSlides.props.children}
        thumbnailSlides={thumbnailSlides.props.children}
      />
    </div>
  );
}

export default App;
