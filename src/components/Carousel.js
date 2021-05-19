import React from "react";

import "../styles/Carousel.css";
import * as Const from "../helpers/constants";
import * as CarouselUtils from "../helpers/carousel_utils";

import SlidesContainer from "./SlidesContainer";

const Carousel = ({
  slidesData,
  SlideTemplate,
  ThumbnailTemplate
}) => {
  let mainSlidesId = 0;
  const [mainSlidesArr, setMainSlides] = React.useState(slidesData.map(elem => (
    {...elem, id: mainSlidesId++}
  )));

  let thumbnailSlidesId = 0;
  const [thumbnailSlidesArr, setThumbnailSlides] = React.useState(slidesData.map(elem => (
    {...elem, id: thumbnailSlidesId++}
  )));

  const carouselParamsRef = React.useRef({
      inAction: false,
      isTouch: false,
      isSwipe: false,
      isScroll: false,
      pointerMoved: false,
      isMoveAction: false,
      startCoord: {x: 0, y: 0},
      actionCoord: {x: 0, y: 0},
      slidesContainer: null,
      slidesComponent: null,
      slidesCount: 0,
      currSlideId: 0,
      carouselRef: React.createRef(),
      mainSlidesRef: React.createRef(),
      thumbnailSlidesRef: React.createRef()
    }
  )

  const carouselParams = carouselParamsRef.current;

  // window resize event initializer and handler
  React.useEffect(() => {
    let carouselWidth = carouselParams.carouselRef.current.offsetWidth;
    const resizeHandler = () => {
      const scaleFactor = carouselParams.carouselRef.current.offsetWidth / carouselWidth;
      carouselWidth = carouselParams.carouselRef.current.offsetWidth;
  
      CarouselUtils.keepRelative(carouselParams.carouselRef.current, 
                                 carouselParams.mainSlidesRef.current, scaleFactor);
      CarouselUtils.keepRelative(carouselParams.carouselRef.current, 
                                 carouselParams.thumbnailSlidesRef.current, scaleFactor);
    }

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    }
  }, [mainSlidesArr]);

  // start action handler
  const startActionHandler = (e) => {
    if (e.type === "touchstart") carouselParams.isTouch = true;
    if (e.type === "mousedown" && carouselParams.isTouch === true) return;

    carouselParams.inAction = true;
    carouselParams.pointerMoved = false;
    carouselParams.isMoveAction = false;

    carouselParams.startCoord = CarouselUtils.getActionCoords(e);
    carouselParams.actionCoord = CarouselUtils.getActionCoords(e);
    carouselParams.slidesContainer = e.currentTarget;

    carouselParams.slidesComponent = carouselParams.slidesContainer.children[0];
    carouselParams.slidesCount = carouselParams.slidesComponent.children.length;
  }

  // action handler
  const actionHandler = (e) => {
    if (e.type === "mousemove" && carouselParams.isTouch === true) return;
    if (carouselParams.inAction === false) return;
    carouselParams.pointerMoved = true;

    const actionXDiff = carouselParams.actionCoord.x - CarouselUtils.getActionCoords(e).x;
    carouselParams.actionCoord = CarouselUtils.getActionCoords(e);

    const swipeLengthX = Math.abs(carouselParams.startCoord.x - carouselParams.actionCoord.x);
    const swipeLengthY = Math.abs(carouselParams.startCoord.y - carouselParams.actionCoord.y);
    
    if (swipeLengthX >= Const.DRAG_THRESHOLD 
        && swipeLengthX > swipeLengthY 
        && carouselParams.isScroll === false) {
      carouselParams.isSwipe = true;
    } else if (swipeLengthY >= Const.DRAG_THRESHOLD 
               && swipeLengthX <= swipeLengthY 
               && carouselParams.isSwipe === false) {
      carouselParams.isScroll = true;
    }

    if (carouselParams.isScroll) {
      carouselParams.startCoord = CarouselUtils.getActionCoords(e);
      return;
    }

    if (swipeLengthX < Const.DRAG_THRESHOLD && carouselParams.isMoveAction === false) return;
    else carouselParams.isMoveAction = true;

    CarouselUtils.dragSlides(carouselParams.slidesContainer, carouselParams.slidesComponent, 
                             actionXDiff, mainSlidesArr, setMainSlides);
  }

  // stop action handler
  const stopActionHandler = (e) => {
    if (e.type === "mouseup" && carouselParams.isTouch === true) {
      carouselParams.isTouch = false;
      return;
    }

    if (carouselParams.inAction === false) return;

    carouselParams.isSwipe = false;
    carouselParams.isScroll = false;

    if (carouselParams.pointerMoved === false 
        || carouselParams.slidesComponent === carouselParams.thumbnailSlidesRef.current) {
      carouselParams.inAction = false;
      return;
    }

    let swipeLength = carouselParams.startCoord.x - carouselParams.actionCoord.x;
    CarouselUtils.updateCarousel(carouselParams, mainSlidesArr, swipeLength);

    carouselParams.inAction = false;
  }

  // click handler
  const clickHandler = (e) => {
    const currentTarget = e.currentTarget;

    if (carouselParams.isMoveAction === false) {
      if (carouselParams.slidesComponent === carouselParams.thumbnailSlidesRef.current) {
        const newSlideId = parseInt(currentTarget.id);
        CarouselUtils.goToSlide(carouselParams, mainSlidesArr, newSlideId);
      } else {
        if (currentTarget.classList.contains(Const.LEFT_BUTTON)) {
          CarouselUtils.goToPreviousSlide(carouselParams, mainSlidesArr, setMainSlides);
        } else if (currentTarget.classList.contains(Const.RIGHT_BUTTON)) {
          CarouselUtils.goToNextSlide(carouselParams, mainSlidesArr, setMainSlides);
        }
      }
    }
  }

  return (
    <div className="Carousel" ref={carouselParams.carouselRef}>
      <SlidesContainer 
        type={Const.MAIN_TYPE} 
        slidesArr={mainSlidesArr} 
        SlideTemplate={SlideTemplate}
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={carouselParams.mainSlidesRef}
      />
      <SlidesContainer 
        type={Const.THUMBNAIL_TYPE} 
        slidesArr={thumbnailSlidesArr}
        SlideTemplate={ThumbnailTemplate}
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={carouselParams.thumbnailSlidesRef}
      />
    </div>
  )
}

Carousel.defaultProps = {
  slidesData: [],
  thumbnailsData: []
}

export default Carousel;
