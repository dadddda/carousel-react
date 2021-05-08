# Carousel component using React.js

This carousel component works on desktop and mobile devices with it's responsive design. It works with any HTML content. Supports swipes, button navigation, thumbnails for better user experience and infinite scroll. It's implemented without using any third-party libraries.

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

For demonstration purposes, the carousel component uses sample images which are located inside `public/images` folder. The data about the images is passed to carousel component as a `slides.json` file located in `src/data` folder.

There are few things you should know:

1. Carousel component takes array of map elements as it's prop `slidesData`.
2. Each map element of the array represents individual slide.
3. The size of slides data array decides how many slides render inside carousel component.
4. You can leave map elements empty as `"id"` keys are added automatically inside carousel component, but feel free to add as many additional props as you wish that you will be using inside each slide component.
5. You only need to modify `Slide.js` file according to your content.

In this example map elements include `"path"` and `"filename"` keys used for image `src` and `alt` respectively:
```JSON
[
  {
    "path": "./images/mountain.jpg",
    "filename": "Mountain"
  }
]
```

Adding carousel component is easy:
```JSX
import slides from "./data/slides.json";
import Carousel from "./components/Carousel"

const App = () => {
  return (
    <div className="App">
      <Carousel slidesData={slides}/>
    </div>
  );
}
```

Inside the slide component there is main `div` for the component itself and inside that you can place your content. In this example `<img>` element is used:
```HTML
<img src={slideProps.path} alt={slideProps.filename} draggable="false"/>
```
As you can see above you can access your props, those you have added in `slidesData` array, from `slideProps` element.

Also add all the necessary styling in the `src/styles/Slide.css` file. `<img>` tag styling example:
```CSS
.Slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```