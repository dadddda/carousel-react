# React.js carousel component 

This carousel component works on desktop and mobile devices with its responsive design. It works with any HTML content. Supports swipes, button navigation, thumbnails and infinite scroll. It's implemented without using any third-party libraries.

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

For demonstration purposes `App.js` contains two types of carousel components. First component shows images which are located inside `public/images` folder and the data about the images is stored inside `image-slides.json` file located in `src/data` folder. The second carousel component shows texts and the data about the texts is stored inside `text-slides.json` file located also in `src/data` folder.

There are a few things you should know:

1. Carousel component takes an array of map elements as its prop `slidesData`. 
2. Each map element of the array represents individual slide.
3. The size of `slidesData` array decides how many slides render inside carousel component.
4. You can leave map elements empty as `"id"` keys are added automatically inside carousel component, but feel free to add as many additional props as you wish that you will be using inside each slide component(Which are also passed as props).
5. In addition to `slidesData` carousel component also takes two template components as `slideTemplate` and `thumbnailTemplate` props. This two components are created by you and are rendered as main slide and as thumbnail slide respectively. As a result the carousel component supports any **HTML** content.
6. You only need to create **JSON** file and modify `App.js` and `Slide.css` files according to your content.

In the example below carousel component of images is shown. For the text variant look inside the code. The implementation approach is identical.

Map elements for carousel component of images include `"imgPath"`, `"thumbnailPath"` and `"filename"` keys used for image/thumbnail `src` and `alt` attributes:
```JSON
[
  {
    "imgPath": "./images/bridge.jpg",
    "thumbnailPath": "./images/bridge_small.jpg",
    "filename": "Bridge"
  }
]
```

This **JSON** file is imported as `imageSlides` inside `App.js` and contains the necessary data for each slide. Main slides and thumbnail slides also require template React components to render necessary **HTML** content, in this example, images. The template components accept `slideProps` as their props and from this prop **JSON** file's data is retrieved:
```JSX
import imageSlides from "./data/image-slides.json";
import Carousel from "./components/Carousel"

const App = () => {
  // template for image slide
  const ImageSlide = ({slideProps}) => {
    return (
      <div className="ImageSlide">
        <img src={slideProps.imgPath} alt={slideProps.filename} draggable="false"/>
      </div>
    )
  }

  // template for image thumbnail
  const ImageThumbnail = ({slideProps}) => {
    return (
      <div className="ImageThumbnail">
        <img src={slideProps.thumbnailPath} alt={slideProps.filename} draggable="false"/>
      </div>
    )
  }

  return (
    <div className="App">
      <Carousel 
        slidesData={imageSlides} 
        slideTemplate={ImageSlide}
        thumbnailTemplate={ImageThumbnail}
      />
    </div>
  );
}
```

Lastly all the necessary styling is written inside `src/styles/Slide.css` file. The below styling is used for image carousel component:
```CSS
.Slide .ImageSlide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.Slide .ImageThumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```
