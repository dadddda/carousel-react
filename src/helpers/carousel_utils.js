import * as Const from "./constants";

/**
 * Variable which stores wether or not new slide has been
 * summoned(appended/prepended). It's used to temporarily
 * block summoning of a new slide.
 */
let summoned = false;

/**
 * Returns given slides component's x(left) position relative to
 * given slides container's x(left) position.
 * @param {*} slidesContainer slides container of main or thumbnail type
 * @param {*} slidesComponent slides component located inside a slides container
 * @returns x(left) position of slides component relative to slides container
 */
const getSlidesXPos = (slidesContainer, slidesComponent) => {
  const slidesContainerBr = slidesContainer.getBoundingClientRect();
  const slidesComponentBr = slidesComponent.getBoundingClientRect();
  const slidesXPos = slidesComponentBr.left - slidesContainerBr.left;

  return slidesXPos;
}

/**
 * Moves first element of 'slidesArr' to the end.
 * 
 * As the change in React state will be apparent after next render and next
 * function calls this function returns slides array as it will be after the 
 * change happens.
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 * @returns changed array for reference purposes
 */
const appendSlide = (slidesArr, setSlides) => {
  const newSlides = [...slidesArr];
  const firstElement = newSlides.shift();
  newSlides.push(firstElement);
  setSlides(newSlides);

  return newSlides;
}

/**
 * Moves last element of 'slidesArr' to the beginning.
 * 
 * As the change in React state will be apparent after next render and next
 * function calls this function returns slides array as it will be after the 
 * change happens.
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 * @returns changed array for reference purposes
 */
const prependSlide = (slidesArr, setSlides) => {
  const newSlides = [...slidesArr];
  const lastElement = newSlides.pop();
  newSlides.unshift(lastElement);
  setSlides(newSlides);

  return newSlides;
}

/**
 * Summons new slide either by appending or by prepending according to
 * given 'append' boolean value. Updates React state of slides using given
 * 'setSlides' by moving it's last or first element to the other side of 
 * 'slidesArr' array and updates slides component x(left) value
 * to maintain current slide position.
 * 
 * As the change in React state will be apparent after next render and next
 * function calls this function returns slides array as it will be after the 
 * change happens.
 * @param {*} slidesContainer slides container of main type
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} append boolean value
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 * @returns changed array for reference purposes
 */
const summonSlide = (slidesContainer, slidesComponent, append, slidesArr, setSlides) => {
  summoned = true;
  const slidesXPos = getSlidesXPos(slidesContainer, slidesComponent);
  const slide = slidesComponent.childNodes[0];
  let newSlidesXPos = slidesXPos;

  let changedSlides = [];
  if (append) {
    changedSlides = appendSlide(slidesArr, setSlides);
    newSlidesXPos += slide.offsetWidth;
  } else {
    changedSlides = prependSlide(slidesArr, setSlides);
    newSlidesXPos -= slide.offsetWidth;
  }

  slidesComponent.style.left = newSlidesXPos + "px";
  return changedSlides;
}

/**
 * Given slides container, it's slides component and swipe length,
 * calculates new x(left) position for slides relative to slides container's
 * x(left) position and assigns that new value to slides component.
 * 
 * If the slides component is at the edge and it's located in slides
 * container of main type, then new slide is summoned to the left of
 * it or to the right depending on direction to support infinite
 * carousel transition.
 * @param {*} slidesContainer slides container of main or thumbnail type
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} actionXDiff swipe start and end x coordinate difference
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 * @returns nothing
 */
const dragSlides = (slidesContainer, slidesComponent, actionXDiff, slidesArr, setSlides) => {
  if (actionXDiff === 0) return;

  const slidesContainerBr = slidesContainer.getBoundingClientRect();
  const slidesComponentBr = slidesComponent.getBoundingClientRect();

  if (slidesContainerBr.width > slidesComponentBr.width) return;

  const slidesXPos = slidesComponentBr.left - slidesContainerBr.left;
  let newSlidesXPos = slidesXPos - actionXDiff;

  const slidesStartX = 0;
  const slidesEndX = slidesComponentBr.width - slidesContainerBr.width;

  if (newSlidesXPos > 0) {
    if (slidesContainer.classList.contains(Const.MAIN_TYPE) && summoned === false) {
      summonSlide(slidesContainer, slidesComponent, false, slidesArr, setSlides);
      return;
    } else {
      newSlidesXPos = slidesStartX;
    }
  } else if (newSlidesXPos < slidesEndX * -1) {
    if (slidesContainer.classList.contains(Const.MAIN_TYPE) && summoned === false) {
      summonSlide(slidesContainer, slidesComponent, true, slidesArr, setSlides);
      return;
    } else {
      newSlidesXPos = slidesEndX * -1;
    }
  }

  slidesComponent.style.left = newSlidesXPos + "px";
}

/**
 * Returns index of a slide element in slides array containing 
 * given slide ID.
 * @param {*} slides slides array from React state
 * @param {*} slideId slide id
 * @returns index of a slide element with slide id in given slides array
 */
const indexOfId = (slides, slideId) => {
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].id === slideId) return i;
  }
  return 0;
}

/**
 * Given slides component and slide ID(0...n), repositions slide
 * with given slide ID in the leftmost part of the viewport with or
 * without animation.
 * 
 * The 'summoned' state is reset to 'false' every time this function is called.
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} slideId slide id on which to jump
 * @param {*} slidesArr slides array from React state
 * @param {*} animate animation toggler boolean value
 */
const jumpToSlide = (slidesComponent, slideId, slidesArr, animate) => {
  const actualSlideId = indexOfId(slidesArr, slideId);

  const slidesCount = slidesComponent.children.length;
  const slideWidth = slidesComponent.offsetWidth / slidesCount;
  const newSlidesXPos = actualSlideId * slideWidth * -1;

  if (animate === true) slidesComponent.classList.add(Const.ANIMATED_SLIDES);
  slidesComponent.style.left = newSlidesXPos + "px";
  if (animate === true) {
    setTimeout(() => {
      slidesComponent.classList.remove(Const.ANIMATED_SLIDES);
    }, Const.TRANSITION_DURATION);
  }

  summoned = false;
}

/**
 * Given slides container, slides component and offset, repositions
 * slides component by given offset with or without animation.
 * @param {*} slidesContainer slides container of thumbnail or main type
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} offset
 * @param {*} animate animation toggler boolean value
 */
const jumpByOffset = (slidesContainer, slidesComponent, offset, animate) => {
  if (offset === 0) return;

  const newSlidesXPos = getSlidesXPos(slidesContainer, slidesComponent) + offset;

  if (animate === true) slidesComponent.classList.add(Const.ANIMATED_SLIDES);
  slidesComponent.style.left = newSlidesXPos + "px";
  if (animate === true) {
    setTimeout(() => {
      slidesComponent.classList.remove(Const.ANIMATED_SLIDES);
    }, Const.TRANSITION_DURATION);
  }
}

/**
 * Removes CSS "selected" class from every slide of given slides component
 * and then adds to a slide with the given slide ID. 
 * 
 * Also repositions given slides component if next slide is not fully visible 
 * to be fully visible.
 * @param {*} slidesContainer slides container of thumbnail type
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} slideId id of a slide to be repositioned
 */
const setSelectionTo = (slidesContainer, slidesComponent, slideId) => {
  const slides = slidesComponent.childNodes;
  slides.forEach(slide => {
    slide.classList.remove(Const.SELECTED_SLIDE);
  });

  const slidesContainerBr = slidesContainer.getBoundingClientRect();
  const slideBr = slides[slideId].getBoundingClientRect();

  let offset = 0;
  if (slidesContainerBr.right < slideBr.right) {
    offset = slidesContainerBr.right - slideBr.right;
  } else if (slidesContainerBr.left > slideBr.left) {
    offset = slidesContainerBr.left - slideBr.left;
  }

  jumpByOffset(slidesContainer, slidesComponent, offset, true);
  slides[slideId].classList.add(Const.SELECTED_SLIDE);
}

/**
 * According to given swipe length, current slide ID and total number
 * of slides, returns new value of slide ID(next/previous) which must be 
 * displayed.
 * @param {*} swipeLength swipe length, either positive or negative
 * @param {*} slideId slide id to be updated
 * @param {*} slidesCount total count of slides in carousel
 * @returns updated slide id
 */
const updateSlideId = (swipeLength, slideId, slidesCount) => {
  let newSlideId = slideId;
  if (Math.abs(swipeLength) < Const.JUMP_THRESHOLD) return newSlideId;
  
  if (swipeLength > 0) {
    if (slideId < slidesCount - 1) newSlideId++;
    else newSlideId = 0;
  } else if (swipeLength < 0) {
    if (slideId > 0) newSlideId--;
    else newSlideId = slidesCount - 1;
  }

  return newSlideId;
}

/**
 * Returns client x and y coordinates of touch/mouse action from given
 * event parameter.
 * 
 * If touch action is performed, it only returns data of the first 
 * touch point.
 * @param {*} e event parameter of touch/mouse action
 * @returns client x and y coordinates of touch/mouse action
 */
const getActionCoords = (e) => {
  let coordinateData = e;
  const touch = e.touches;
  if (touch !== undefined) coordinateData = touch[0];

  return {x: coordinateData.clientX, y: coordinateData.clientY};
}

/**
 * Returns true if slide with given slide ID is the first element
 * of given slides array.
 * @param {*} slidesArr slides array from React state
 * @param {*} slideId slide id
 * @returns boolean value
 */
const isFirst = (slidesArr, slideId) => {
  if (slidesArr[0].id === slideId) return true;
  return false;
}

/**
 * Returns true if slide with given slide ID is the last element
 * of given slides array.
 * @param {*} slidesArr slides array from React state
 * @param {*} slideId slide id
 * @returns boolean value
 */
const isLast = (slidesArr, slideId) => {
  if (slidesArr[slidesArr.length - 1].id === slideId) return true;
  return false;
}

/**
 * Updates x(left) position of given slides component by the given
 * scale factor.
 * @param {*} carouselComponent carousel component
 * @param {*} slidesComponent slides component located inside a slides container
 * @param {*} scaleFactor scale factor
 */
const keepRelative = (carouselComponent, slidesComponent, scaleFactor) => {
  const carouselComponentBr = carouselComponent.getBoundingClientRect();
  const slidesComponentBr = slidesComponent.getBoundingClientRect();

  const currLeft = slidesComponentBr.left - carouselComponentBr.left;
  const newSlidesXPos = currLeft * scaleFactor;
  slidesComponent.style.left = newSlidesXPos + "px";
}

/**
 * Updates slide ID, performs jump operation according to the new slide ID and
 * sets appropriate slide from thumbnail slides to "selected".
 * 
 * Passed 'params.currSlideId' changes after function call.
 * @param {*} params map of carousel parameters
 * @param {*} slidesArr array of React state of slides
 * @param {*} swipeLength swipe length
 */
const updateCarousel = (params, slidesArr, swipeLength) => {
  params.currSlideId = updateSlideId(swipeLength, params.currSlideId, params.slidesCount);
  jumpToSlide(params.slidesComponent, params.currSlideId, slidesArr, true);
  setSelectionTo(params.slidesContainer, params.thumbnailSlidesRef.current, params.currSlideId);
}

/**
 * Jumps to the next slide by performing slide summoning(if necessary)
 * and then by calling 'updateCarousel' function.
 * @param {*} params map of carousel parameters
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 */
const goToNextSlide = (params, slidesArr, setSlides) => {
  const summon = isLast(slidesArr, params.currSlideId);

  let changedSlidesArr = slidesArr;
  if (summon) {
    changedSlidesArr = summonSlide(params.slidesContainer, params.slidesComponent, 
                                   true, slidesArr, setSlides);
  }
  
  updateCarousel(params, changedSlidesArr, Const.JUMP_THRESHOLD);
}

/**
 * Jumps to the previous slide by performing slide summoning(if necessary)
 * and then by calling 'updateCarousel' function.
 * @param {*} params map of carousel parameters
 * @param {*} slidesArr array of React state of slides
 * @param {*} setSlides setter for React state of slides
 */
const goToPreviousSlide = (params, slidesArr, setSlides) => {
  const summon = isFirst(slidesArr, params.currSlideId);

  let changedSlidesArr = slidesArr;
  if (summon) {
    changedSlidesArr = summonSlide(params.slidesContainer, params.slidesComponent, 
                                   false, slidesArr, setSlides);
  }

  updateCarousel(params, changedSlidesArr, -1 * Const.JUMP_THRESHOLD);
}

/**
 * Jumps to slide of given ID. Also performs thumbnail selection.
 * 
 * Passed 'params.currSlideId' changes after function call.
 * @param {*} params map of carousel parameters
 * @param {*} slidesArr array of React state of slides
 * @param {*} slideId slide id on which jump is performed
 */
const goToSlide = (params, slidesArr, slideId) => {
  params.currSlideId = slideId;
  jumpToSlide(params.mainSlidesRef.current, params.currSlideId, slidesArr, false);
  setSelectionTo(params.slidesContainer, params.thumbnailSlidesRef.current, params.currSlideId);
}

export {
  dragSlides,
  getActionCoords,
  keepRelative,
  updateCarousel,
  goToNextSlide,
  goToPreviousSlide,
  goToSlide
}
