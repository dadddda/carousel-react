import * as K from "./constants";

// given view component, it's slides component and swipe length,
// calculates new x(left) position for slides and assigns that new
// value to slides component
const repositionSlides = (activeComp, slidesComp, actionXDiff) => {
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

  slidesComp.classList.add(K.animated);
  
  let newSlidesXPos = slideNum * slideWidth * -1;
  slidesComp.style.left = newSlidesXPos + "px";

  setTimeout(() => {
    slidesComp.classList.remove(K.animated);
  }, 200);
}

// according to given swipe start coordinate, end coordinate, current
// slide number and total number of slides, returns new value of slide
// number(next/previous) which must be displayed
const adjCurrSlide = (startX, endX, currSlide, slidesCount) => {
  let newSlide = currSlide;

  if (Math.abs(startX - endX) > K.jumpThreshold) {
    if (startX > endX && currSlide < slidesCount - 1) {
      newSlide++;
    } else if (startX < endX && currSlide > 0) {
      newSlide--;
    }
  }

  return newSlide;
}

// increments given slide number according to constraints
const incrCurrSlide = (currSlide, slidesCount) => {
  let newSlide = currSlide;

  if (currSlide < slidesCount - 1) newSlide++;

  return newSlide;
}

// decrements given slide number according to constraints
const decrCurrSlide = (currSlide) => {
  let newSlide = currSlide;

  if (currSlide > 0) newSlide--;

  return newSlide;
}

// returns client x coordinate of touch/mouse action
const getActionX = (e) => {
  let coordinateData = e;
  let touch = e.touches;
  if (touch !== undefined) coordinateData = touch[0];

  return coordinateData.clientX;
}

// clears from every slide and then adds selected slide CSS 
// class to a slide with the given id from the given slides list
const selectSlide = (id, slides) => {
  slides.forEach(slide => {
    slide.classList.remove(K.selectedSlide);
  });

  slides[id].classList.add(K.selectedSlide);
}

export {
  repositionSlides, 
  jumpToSlide, 
  adjCurrSlide,
  incrCurrSlide,
  decrCurrSlide,
  getActionX,
  selectSlide
};
