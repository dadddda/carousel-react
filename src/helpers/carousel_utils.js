import * as Const from "./constants";

// given slides container, it's slides component and swipe length,
// calculates new x(left) position for slides and assigns that new
// value to slides component
const dragSlides = (slidesContainer, slidesComponent, actionXDiff) => {
  if (actionXDiff === 0) return;

  let slidesContainerBr = slidesContainer.getBoundingClientRect();
  let slidesComponentBr = slidesComponent.getBoundingClientRect();

  if (slidesContainerBr.width > slidesComponentBr.width) return;

  let slidesXPos = slidesComponentBr.left - slidesContainerBr.left;
  let newSlidesXPos = slidesXPos - actionXDiff;

  let slidesStartX = 0;
  let slidesEndX = slidesComponentBr.width - slidesContainerBr.width;
  if (newSlidesXPos > 0) newSlidesXPos = slidesStartX;
  else if (newSlidesXPos < slidesEndX * -1) newSlidesXPos = slidesEndX * -1;

  slidesComponent.style.left = newSlidesXPos + "px";
}

// given slides component and slide number(0...n), repositions
// slide with given slide number in the leftmost part of the viewport
// with or without animation
const jumpToSlide = (slidesComponent, slideId, animate) => {
  let slidesCount = slidesComponent.children.length;
  let slideWidth = slidesComponent.offsetWidth / slidesCount;
  let newSlidesXPos = slideId * slideWidth * -1;

  if (animate === true) slidesComponent.classList.add(Const.ANIMATED_SLIDES);
  slidesComponent.style.left = newSlidesXPos + "px";
  if (animate === true) {
    setTimeout(() => {
      slidesComponent.classList.remove(Const.ANIMATED_SLIDES);
    }, Const.TRANSITION_DURATION);
  }
}

// given slides container, slides component and offset, repositions
// slides component by given offset with or without animation
const jumpByOffset = (slidesContainer, slidesComponent, offset, animate) => {
  if (offset === 0) return;

  let slidesContainerBr = slidesContainer.getBoundingClientRect();
  let slidesComponentBr = slidesComponent.getBoundingClientRect();

  let newSlidesXPos = slidesComponentBr.left - slidesContainerBr.left;
  newSlidesXPos += offset;

  if (animate === true) slidesComponent.classList.add(Const.ANIMATED_SLIDES);
  slidesComponent.style.left = newSlidesXPos + "px";
  if (animate === true) {
    setTimeout(() => {
      slidesComponent.classList.remove(Const.ANIMATED_SLIDES);
    }, Const.TRANSITION_DURATION);
  }
}

// updates left position of given slides component according to given
// scale factor
const keepRelative = (carouselComponent, slidesComponent, scaleFactor) => {
  let carouselComponentBr = carouselComponent.getBoundingClientRect();
  let slidesComponentBr = slidesComponent.getBoundingClientRect();

  let currLeft = slidesComponentBr.left - carouselComponentBr.left;
  let newSlidesXPos = currLeft * scaleFactor;
  slidesComponent.style.left = newSlidesXPos + "px";
}

// according to given swipe start coordinate, end coordinate, current
// slide number and total number of slides, returns new value of slide
// number(next/previous) which must be displayed
const updateSlideId = (swipeLength, slideId, slidesCount) => {
  let newSlideId = slideId;
  if (Math.abs(swipeLength) < Const.JUMP_THRESHOLD) return newSlideId;
  
  if (swipeLength > 0) {
    if (slideId < slidesCount - 1) newSlideId++;
  } else if (swipeLength < 0) {
    if (slideId > 0) newSlideId--;
  }

  return newSlideId;
}

// increments/decrements given slide number according to constraints
const modifySlideId = (slideId, slidesCount, mode) => {
  let newSlideId = slideId;

  if (mode === "incr") {
    if (slideId < slidesCount - 1) newSlideId++;
  } else if (mode === "decr") {
    if (slideId > 0) newSlideId--;
  }

  return newSlideId;
}

// returns client x coordinate of touch/mouse action
const getActionX = (e) => {
  let coordinateData = e;
  let touch = e.touches;
  if (touch !== undefined) coordinateData = touch[0];

  return coordinateData.clientX;
}

// removes CSS "selected" class from every slide and then adds to a slide 
// with the given slide number from the given slides list. also repositions
// given slides component if next slide is not fully visible
const setSelectionTo = (slidesContainer, slidesComponent, slideId) => {
  let slides = slidesComponent.childNodes;
  slides.forEach(slide => {
    slide.classList.remove(Const.SELECTED_SLIDE);
  });

  let slidesContainerBr = slidesContainer.getBoundingClientRect();
  let slideBr = slides[slideId].getBoundingClientRect();

  let offset = 0;
  if (slidesContainerBr.right < slideBr.right) {
    offset = slidesContainerBr.right - slideBr.right;
  } else if (slidesContainerBr.left > slideBr.left) {
    offset = slidesContainerBr.left - slideBr.left;
  }

  jumpByOffset(slidesContainer, slidesComponent, offset, true);
  slides[slideId].classList.add(Const.SELECTED_SLIDE);
}

export {
  dragSlides, 
  jumpToSlide, 
  jumpByOffset,
  keepRelative,
  updateSlideId,
  modifySlideId,
  getActionX,
  setSelectionTo
};
