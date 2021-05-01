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

  let inAction = false;
  let posX = 0;
  let activeComp = null;

  // start action handler
  const startActionHandler = (e) => {
    activeComp = e.currentTarget;
    console.log("start");

    inAction = true;
    posX = e.clientX;
  }

  // action handler
  const actionHandler = (e) => {
    if (inAction === false) return;

    let posXDiff = posX - e.clientX;
    posX = e.clientX;

    if (activeComp !== null) {
      activeComp.scrollLeft += posXDiff;
    }
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    console.log("stop");

    inAction = false;
    activeComp = null;
  }

  return (
    <div className="Carousel">
      <View 
        type={singleView} 
        slides={slides} 
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
      ></View>
      <View 
        type={multipleView} 
        slides={slides}
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
      ></View>
    </div>
  )
}

export default Carousel;
