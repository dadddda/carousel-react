import React from "react";

import "../styles/Carousel.css";
import * as Const from "../helpers/constants";
import * as CarouselUtils from "../helpers/carousel_utils";

import SlidesContainer from "./SlidesContainer";

const Carousel = ({slides}) => {
  const carouselRef = React.createRef();
  const mainSlidesRef = React.createRef();
  const thumbnailSlidesRef = React.createRef();

  let inAction = false;
  let pointerMoved = false;
  let startX = 0;
  let actionX = 0;
  let activeComponent = null;

  let slidesComponent = null;
  let slidesCount = 0;

  let currentSlide = 0;

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
    activeComponent = e.currentTarget;

    slidesComponent = activeComponent.children[0];
    slidesCount = slidesComponent.children.length;

    console.log("start");
  }

  // action handler
  const actionHandler = (e) => {
    if (inAction === false) return;
    pointerMoved = true;

    let actionXDiff = actionX - CarouselUtils.getActionX(e);;
    actionX = CarouselUtils.getActionX(e);;

    CarouselUtils.dragSlides(activeComponent, slidesComponent, actionXDiff);
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (inAction === false) return;

    if (pointerMoved === false || slidesComponent === thumbnailSlidesRef.current) {
      inAction = false;
      console.log("stop");
      return;
    }

    currentSlide = CarouselUtils.updateSlideNumber(startX, actionX, currentSlide, slidesCount);
    CarouselUtils.jumpToSlide(slidesComponent, currentSlide, true);
    CarouselUtils.setSelectionTo(activeComponent, thumbnailSlidesRef.current, currentSlide);

    inAction = false;
    console.log("stop");
  }

  // click handler
  const clickHandler = (e) => {
    let currentTarget = e.currentTarget;

    if (pointerMoved === false) {
      console.log("click");
      
      let animate = false;
      if (slidesComponent === thumbnailSlidesRef.current) {
        currentSlide = currentTarget.id;
      } else {
        let mode = "";
        if (currentTarget.classList.contains(Const.LEFT_BUTTON)) mode = "decr";
        else mode = "incr";

        animate = true;
        currentSlide = CarouselUtils.modifySlideNumber(currentSlide, slidesCount, mode);
      }

      CarouselUtils.jumpToSlide(mainSlidesRef.current, currentSlide, animate);
      CarouselUtils.setSelectionTo(activeComponent, thumbnailSlidesRef.current, currentSlide);
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
  slides: []
}

export default Carousel;
