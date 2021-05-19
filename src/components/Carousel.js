import React from "react";

import "../styles/Carousel.css";
import * as Const from "../helpers/constants";
import * as CarouselUtils from "../helpers/carousel_utils";

import SlidesContainer from "./SlidesContainer";

const Carousel = ({slidesData}) => {
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
      isScroll: false,
      pointerMoved: false,
      startX: 0,
      actionX: 0,
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

    const scrollHandler = () => {
      carouselParams.isScroll = true;
    }

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", scrollHandler);
    }
  }, [mainSlidesArr]);

  // start action handler
  const startActionHandler = (e) => {
    if (e.type === "touchstart") carouselParams.isTouch = true;
    if (e.type === "mousedown" && carouselParams.isTouch === true) return;

    carouselParams.inAction = true;
    carouselParams.pointerMoved = false;

    carouselParams.startX = CarouselUtils.getActionX(e);
    carouselParams.actionX = CarouselUtils.getActionX(e);
    carouselParams.slidesContainer = e.currentTarget;

    carouselParams.slidesComponent = carouselParams.slidesContainer.children[0];
    carouselParams.slidesCount = carouselParams.slidesComponent.children.length;
  }

  // action handler
  const actionHandler = (e) => {
    if (e.type === "mousemove" && carouselParams.isTouch === true) return;
    if (carouselParams.inAction === false) return;
    
    const actionXDiff = carouselParams.actionX - CarouselUtils.getActionX(e);
    carouselParams.actionX = CarouselUtils.getActionX(e);
    
    const swipeLength = carouselParams.startX - carouselParams.actionX;
    if (Math.abs(swipeLength) < Const.DRAG_THRESHOLD 
        || carouselParams.isScroll === true) return;

    carouselParams.pointerMoved = true;

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

    if (carouselParams.pointerMoved === false 
        || carouselParams.slidesComponent === carouselParams.thumbnailSlidesRef.current) {
      carouselParams.inAction = false;
      return;
    }

    let swipeLength = carouselParams.startX - carouselParams.actionX;
    if (carouselParams.isScroll) {
      carouselParams.isScroll = false;
      swipeLength = 0;
    }

    CarouselUtils.updateCarousel(carouselParams, mainSlidesArr, swipeLength);

    carouselParams.inAction = false;
  }

  // click handler
  const clickHandler = (e) => {
    const currentTarget = e.currentTarget;

    if (carouselParams.pointerMoved === false) {
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
        startActionHandler={startActionHandler}
        actionHandler={actionHandler}
        stopActionHandler={stopActionHandler}
        clickHandler={clickHandler}
        slidesRef={carouselParams.mainSlidesRef}
      />
      <SlidesContainer 
        type={Const.THUMBNAIL_TYPE} 
        slidesArr={thumbnailSlidesArr}
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
  slidesData: []
}

export default Carousel;
