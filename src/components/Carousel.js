import React from "react";

import "../styles/Carousel.css";
import * as K from "../helpers/constants";
import * as Utils from "../helpers/utils";

import slides from "../data/slides.json";

import View from "./View";

const Carousel = () => {
  const singleSlides = React.createRef();
  const multipleSlides = React.createRef();

  let inAction = false;
  let moved = false;
  let startX = 0;
  let actionX = 0;
  let activeComp = null;

  let slidesComp = null;
  let slidesCount = 0;

  let currSlide = 0;

  // start action handler
  const startActionHandler = (e) => {
    inAction = true;
    moved = false;

    startX = Utils.getActionX(e);
    actionX = Utils.getActionX(e);
    activeComp = e.currentTarget;

    slidesComp = activeComp.children[0];
    slidesCount = slidesComp.children.length;

    console.log("start");
  }

  // action handler
  const actionHandler = (e) => {
    if (inAction === false) return;
    moved = true;

    let actionXDiff = actionX - Utils.getActionX(e);;
    actionX = Utils.getActionX(e);;

    Utils.repositionSlides(activeComp, slidesComp, actionXDiff);
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    if (slidesComp === multipleSlides.current) {
      inAction = false;
      console.log("stop");
      return;
    }

    currSlide = Utils.adjCurrSlide(startX, actionX, currSlide, slidesCount);
    Utils.jumpToSlide(slidesComp, currSlide);

    inAction = false;
    console.log("stop");
  }

  // multiple view slides click handler
  const clickHandler = (e) => {
    if (moved === false) {
      console.log("click");
      currSlide = e.currentTarget.id;
      Utils.jumpToSlide(singleSlides.current, currSlide);
    } else {
      console.log("moved");
    }
  }

  return (
    <div className="Carousel">
      <View 
        type={K.singleView} 
        slides={slides} 
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        slidesRef={singleSlides}
      ></View>
      <View 
        type={K.multipleView} 
        slides={slides}
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={multipleSlides}
      ></View>
    </div>
  )
}

export default Carousel;
