import React from "react";

import "../styles/Carousel.css";

import View from "./View";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      title: "Slide 1"
    },
    {
      id: 2,
      title: "Slide 2"
    },
    {
      id: 3,
      title: "Slide 3"
    },
    {
      id: 4,
      title: "Slide 4"
    },
    {
      id: 5,
      title: "Slide 5"
    },
    {
      id: 6,
      title: "Slide 6"
    }
  ]

  let singleView = "single";
  let multipleView = "multiple";

  return (
    <div className="Carousel">
      <View type={singleView} slides={slides}></View>
      <View type={multipleView} slides={slides}></View>
    </div>
  )
}

export default Carousel;
