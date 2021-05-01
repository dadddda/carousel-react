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

  const singleView = "single";
  const multipleView = "multiple";
  const jumpThreshold = 100;

  let inAction = false;
  let startX = 0;
  let actionX = 0;
  let activeComp = null;

  let slidesComp = null;
  let slidesCount = 0;
  let slideWidth = 0;

  let currSlide = 0;

  // start action handler
  const startActionHandler = (e) => {
    inAction = true;
    startX = e.clientX;
    actionX = e.clientX;
    activeComp = e.currentTarget;

    slidesComp = activeComp.children[0];
    slidesCount = slidesComp.children.length;
    slideWidth = slidesComp.offsetWidth / slidesCount;

    console.log("start");
  }

  // action handler
  const actionHandler = (e) => {
    if (inAction === false) return;

    let actionXDiff = actionX - e.clientX;
    actionX = e.clientX;

    let activeCompBr = activeComp.getBoundingClientRect();
    let slidesCompBr = slidesComp.getBoundingClientRect();

    let slidesXPos = slidesCompBr.left - activeCompBr.left;
    let newSlidesXPos = slidesXPos - actionXDiff;

    let slidesStartX = 0;
    let slidesEndX = slidesCompBr.width - activeCompBr.width;
    if (newSlidesXPos > 0) newSlidesXPos = slidesStartX;
    else if (newSlidesXPos < slidesEndX * -1) newSlidesXPos = slidesEndX * -1;

    slidesComp.style.left = newSlidesXPos + "px";
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    if (activeComp.classList.contains(multipleView)) {
      inAction = false;
      console.log("stop");
      return;
    }

    if (Math.abs(startX - actionX) > jumpThreshold) {
      if (startX > actionX && currSlide < slidesCount - 1) {
        currSlide++;
      } else if (startX < actionX && currSlide > 0) {
        currSlide--;
      }
    }

    slidesComp.style.transition = "left 200ms ease-in-out";
  
    let newSlidesXPos = currSlide * slideWidth * -1;
    slidesComp.style.left = newSlidesXPos + "px";

    setTimeout(() => {
      slidesComp.style.transition = "unset";
    }, 200);
    
    inAction = false;
    console.log("stop");
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
