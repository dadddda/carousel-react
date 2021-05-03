import * as K from "./constants";

// given view component, it's slides component and swipe length,
// calculates new x(left) position for slides and assigns that new
// value to slides component
const dragSlides = (activeComp, slidesComp, actionXDiff) => {
  if (actionXDiff === 0) return;

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

// given slides component and slide number(0...n), repositions
// slide with given slide number in the leftmost part of the viewport
// with animation
const jumpToSlide = (slidesComp, slideNum) => {
  let slidesCount = slidesComp.children.length;
  let slideWidth = slidesComp.offsetWidth / slidesCount;
  let newSlidesXPos = slideNum * slideWidth * -1;

  slidesComp.classList.add(K.animated);
  slidesComp.style.left = newSlidesXPos + "px";
  setTimeout(() => {
    slidesComp.classList.remove(K.animated);
  }, 200);
}

// given active component, slides component and offset, repositions
// slides component by given offset with animation
const jumpByOffset = (activeComp, slidesComp, offset) => {
  if (offset === 0) return;

  let activeCompBr = activeComp.getBoundingClientRect();
  let slidesCompBr = slidesComp.getBoundingClientRect();

  let newSlidesXPos = slidesCompBr.left - activeCompBr.left;
  newSlidesXPos += offset;

  slidesComp.classList.add(K.animated);
  slidesComp.style.left = newSlidesXPos + "px";
  setTimeout(() => {
    slidesComp.classList.remove(K.animated);
  }, 200);
}

// according to given swipe start coordinate, end coordinate, current
// slide number and total number of slides, returns new value of slide
// number(next/previous) which must be displayed
const updateSlideNum = (startX, endX, slideNum, slidesCount) => {
  let newSlide = slideNum;

  if (Math.abs(startX - endX) > K.jumpThreshold) {
    if (startX > endX && slideNum < slidesCount - 1) {
      newSlide++;
    } else if (startX < endX && slideNum > 0) {
      newSlide--;
    }
  }

  return newSlide;
}

// increments/decrements given slide number according to constraints
const modifySlideNum = (slideNum, slidesCount, mode) => {
  if (mode === "") return;
  
  let newSlideNum = slideNum;

  if (mode === "incr") {
    if (slideNum < slidesCount - 1) newSlideNum++;
  } else if (mode === "decr") {
    if (slideNum > 0) newSlideNum--;
  }

  return newSlideNum;
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
const selectSlide = (activeComp, slidesComp, slideNum) => {
  let slides = slidesComp.childNodes;
  slides.forEach(slide => {
    slide.classList.remove(K.selectedSlide);
  });

  let activeCompBr = activeComp.getBoundingClientRect();
  let slideBr = slides[slideNum].getBoundingClientRect();

  let offset = 0;
  if (activeCompBr.right < slideBr.right) {
    offset = activeCompBr.right - slideBr.right;
  } else if (activeCompBr.left > slideBr.left) {
    offset = activeCompBr.left - slideBr.left;
  }

  jumpByOffset(activeComp, slidesComp, offset);
  slides[slideNum].classList.add(K.selectedSlide);
}

export {
  dragSlides, 
  jumpToSlide, 
  jumpByOffset,
  updateSlideNum,
  modifySlideNum,
  getActionX,
  selectSlide
};
