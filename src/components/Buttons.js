import React from "react";

import "../styles/Buttons.css";
import * as K from "../helpers/constants";
import Button from "./Button";

const Buttons = () => {
  return (
    <div className="Buttons">
      <Button pos={K.leftButton}></Button>
      <Button pos={K.rightButton}></Button>
    </div>
  );
}

export default Buttons;
