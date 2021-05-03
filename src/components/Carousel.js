import React from "react";

import "../styles/Carousel.css";
import * as K from "../helpers/constants";
import * as Utils from "../helpers/utils";

import View from "./View";

const Carousel = ({slides}) => {
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

    Utils.dragSlides(activeComp, slidesComp, actionXDiff);
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    if (moved === false || slidesComp === multipleSlides.current) {
      inAction = false;
      console.log("stop");
      return;
    }

    currSlide = Utils.updateSlideNum(startX, actionX, currSlide, slidesCount);
    Utils.jumpToSlide(slidesComp, currSlide);
    Utils.selectSlide(activeComp, multipleSlides.current, currSlide);

    inAction = false;
    console.log("stop");
  }

  // click handler
  const clickHandler = (e) => {
    let currentTarget = e.currentTarget;

    if (moved === false) {
      console.log("click");
      
      if (slidesComp === multipleSlides.current) {
        currSlide = currentTarget.id;
      } else {
        let mode = "";
        if (currentTarget.classList.contains(K.leftButton)) mode = "decr";
        else mode = "incr";

        currSlide = Utils.modifySlideNum(currSlide, slidesCount, mode);
      }

      Utils.jumpToSlide(singleSlides.current, currSlide);
      Utils.selectSlide(activeComp, multipleSlides.current, currSlide);
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
        clickHandler={clickHandler}
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

Carousel.defaultProps = {
  slides: []
}

export default Carousel;
