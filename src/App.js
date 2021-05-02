import React from "react";

import "./App.css";

import slides from "./data/slides.json";

import Carousel from "./components/Carousel"

const App = () => {
  return (
    <div className="App">
      <Carousel slides={slides}></Carousel>
    </div>
  );
}

export default App;
