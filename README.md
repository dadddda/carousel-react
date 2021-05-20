# React.js carousel component 

This carousel component works on desktop and mobile devices with its responsive design. It works with any HTML content on individual slides. Supports swipes, button navigation, thumbnails and infinite scroll. It's implemented without using any third-party libraries.

### Install

To install all necessary dependencies, first install [Node.js](https://nodejs.org/en/) and then by using Node package manager **npm** run this command from the root directory:
```bash
npm install
```
If you have any problems with installing dependencies, remove `package-lock.json` file from the root directory and try again.

### Build

To build the project run this command from the root directory:
```bash
npm run build
```

### Start

To start the React.js web application run this command from the root directory:
```bash
npm start
```
By default the app runs on `localhost:8080`

### Usage

All the necessary files for the carousel component are located in `src/components`, `src/styles` and `src/helpers` directories.

For demonstration purposes `App.js` renders carousel component which contains text and image slides. Images are taken from `public/images` folder and the data for individual slide is stored inside `slides-data.json` file located in `src/data` folder.

There are a few things you should know:

1. Carousel component takes only two props `mainSlides` and `thumbnailSlides`. Each prop takes children of `<SlidesWrapper/>` component and renders them as individual slides.
2. `<SlidesWrapper/>` component is provided with its `src/styles/SlidesWrapper.css` for your slides styling.
3. If you want the thumbnails to be identical to main slides you can create one wrapper component and pass it to both props of carousel component.
4. Wrappers for main slides and thumbnails should have equal number of children as they are functionally connected together.

The example below shows implementation of simple carousel component.

`App.js` imports all the necessary stuff plus `<SlidesWrapper/>` and `<Carousel/>` components:
```JSX
import SlidesWrapper from "./components/SlidesWrapper";
import Carousel from "./components/Carousel";
```

Inside `App` two wrapper components are created for main slides and thumbnail slides respectively. In this example we have only two slides, first for the text and second for the image:
```JSX
const mainSlides = <SlidesWrapper>
  <div className="textSlide">
    <h1>Bridge</h1>
    <p>Bridge text...</p>
  </div>
  <div className="imageSlide">
    <img src="./images/bridge.jpg" draggable="false"/>
  </div>
</SlidesWrapper>

const thumbnailSlides = <SlidesWrapper>
  <div className="textThumbnail">
    <h2>B</h2>
  </div>
  <div className="imageThumbnail">
    <img src="./images/bridge_small.jpg" draggable="false"/>
  </div>
</SlidesWrapper>
```

Then the `<Carousel/>` component is created and children of above created components are passed:
```JSX
return (
  <div className="App">
    <Carousel 
      mainSlides={mainSlides.props.children}
      thumbnailSlides={thumbnailSlides.props.children}
    />
  </div>
);
```

Lastly all the necessary styling is written inside `src/styles/SlidesWrapper.css` file:
```CSS
.imageSlide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.imageThumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.textSlide {
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: justify;
  overflow-y: auto;
  background-color: rgb(210, 210, 210);
}

.textThumbnail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(210, 210, 210);
}
```
