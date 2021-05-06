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
const jumpToSlide = (slidesComponent, slideNumber, animate) => {
  let slidesCount = slidesComponent.children.length;
  let slideWidth = slidesComponent.offsetWidth / slidesCount;
  let newSlidesXPos = slideNumber * slideWidth * -1;

  if (animate === true) slidesComponent.classList.add(Const.ANIMATED_SLIDES);
  slidesComponent.style.left = newSlidesXPos + "px";
  if (animate === true) {
    setTimeout(() => {
      slidesComponent.classList.remove(Const.ANIMATED_SLIDES);
    }, 200);
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
    }, 200);
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
const updateSlideNumber = (startX, endX, slideNumber, slidesCount) => {
  let newSlide = slideNumber;

  if (Math.abs(startX - endX) > Const.JUMP_THRESHOLD) {
    if (startX > endX && slideNumber < slidesCount - 1) {
      newSlide++;
    } else if (startX < endX && slideNumber > 0) {
      newSlide--;
    }
  }

  return newSlide;
}

// increments/decrements given slide number according to constraints
const modifySlideNumber = (slideNumber, slidesCount, mode) => {
  if (mode === "") return;
  
  let newslideNumber = slideNumber;

  if (mode === "incr") {
    if (slideNumber < slidesCount - 1) newslideNumber++;
  } else if (mode === "decr") {
    if (slideNumber > 0) newslideNumber--;
  }

  return newslideNumber;
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
const setSelectionTo = (slidesContainer, slidesComponent, slideNumber) => {
  let slides = slidesComponent.childNodes;
  slides.forEach(slide => {
    slide.classList.remove(Const.SELECTED_SLIDE);
  });

  let slidesContainerBr = slidesContainer.getBoundingClientRect();
  let slideBr = slides[slideNumber].getBoundingClientRect();

  let offset = 0;
  if (slidesContainerBr.right < slideBr.right) {
    offset = slidesContainerBr.right - slideBr.right;
  } else if (slidesContainerBr.left > slideBr.left) {
    offset = slidesContainerBr.left - slideBr.left;
  }

  jumpByOffset(slidesContainer, slidesComponent, offset, true);
  slides[slideNumber].classList.add(Const.SELECTED_SLIDE);
}

export {
  dragSlides, 
  jumpToSlide, 
  jumpByOffset,
  keepRelative,
  updateSlideNumber,
  modifySlideNumber,
  getActionX,
  setSelectionTo
};
