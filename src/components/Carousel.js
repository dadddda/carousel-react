import React from "react";

import "../styles/Carousel.css";
import * as Const from "../helpers/constants";
import * as CarouselUtils from "../helpers/carousel_utils";

import SlidesContainer from "./SlidesContainer";

const Carousel = ({slidesJson}) => {
  const [slides, setSlides] = React.useState(slidesJson);

  const carouselRef = React.createRef();
  const mainSlidesRef = React.createRef();
  const thumbnailSlidesRef = React.createRef();

  let inAction = false;
  let pointerMoved = false;
  let startX = 0;
  let actionX = 0;
  let activeSlidesContainer = null;

  let slidesComponent = null;
  let slidesCount = 0;

  let currentSlideId = 0;

  // window resize event initializer and handler
  React.useEffect(() => {
    let carouselWidth = carouselRef.current.offsetWidth;

    const resizeHandler = () => {
      let scaleFactor = carouselRef.current.offsetWidth / carouselWidth;
      carouselWidth = carouselRef.current.offsetWidth;

      CarouselUtils.keepRelative(carouselRef.current, mainSlidesRef.current, scaleFactor);
      CarouselUtils.keepRelative(carouselRef.current, thumbnailSlidesRef.current, scaleFactor);
    }

    window.addEventListener("resize", resizeHandler)
    return () => {
      window.removeEventListener("resize", resizeHandler)
    }
  }, [])

  // start action handler
  const startActionHandler = (e) => {
    inAction = true;
    pointerMoved = false;

    startX = CarouselUtils.getActionX(e);
    actionX = CarouselUtils.getActionX(e);
    activeSlidesContainer = e.currentTarget;

    slidesComponent = activeSlidesContainer.children[0];
    slidesCount = slidesComponent.children.length;

    console.log("start");
  }

  // action handler
  const actionHandler = (e) => {
    if (inAction === false) return;
    pointerMoved = true;

    let actionXDiff = actionX - CarouselUtils.getActionX(e);;
    actionX = CarouselUtils.getActionX(e);;

    CarouselUtils.dragSlides(activeSlidesContainer, slidesComponent, actionXDiff);
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    if (pointerMoved === false || slidesComponent === thumbnailSlidesRef.current) {
      inAction = false;
      console.log("stop");
      return;
    }

    let swipeLength = startX - actionX;
    currentSlideId = CarouselUtils.updateSlideId(swipeLength, currentSlideId, slidesCount);
    CarouselUtils.jumpToSlide(slidesComponent, currentSlideId, true);
    CarouselUtils.setSelectionTo(activeSlidesContainer, thumbnailSlidesRef.current, currentSlideId);

    inAction = false;
    console.log("stop", currentSlideId);
  }

  // click handler
  const clickHandler = (e) => {
    let currentTarget = e.currentTarget;

    if (pointerMoved === false) {
      console.log("click");
      
      let animate = false;
      if (slidesComponent === thumbnailSlidesRef.current) {
        currentSlideId = currentTarget.id;
      } else {
        let mode = "";
        if (currentTarget.classList.contains(Const.LEFT_BUTTON)) mode = "decr";
        else mode = "incr";

        animate = true;
        currentSlideId = CarouselUtils.modifySlideId(currentSlideId, slidesCount, mode);
      }

      CarouselUtils.jumpToSlide(mainSlidesRef.current, currentSlideId, animate);
      CarouselUtils.setSelectionTo(activeSlidesContainer, thumbnailSlidesRef.current, currentSlideId);
    } else {
      console.log("pointerMoved");
    }
  }

  return (
    <div className="Carousel" ref={carouselRef}>
      <SlidesContainer 
        type={Const.MAIN_TYPE} 
        slides={slides} 
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={mainSlidesRef}
      />
      <SlidesContainer 
        type={Const.THUMBNAIL_TYPE} 
        slides={slides}
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={thumbnailSlidesRef}
      />
    </div>
  )
}

Carousel.defaultProps = {
  slidesJson: []
}

export default Carousel;
