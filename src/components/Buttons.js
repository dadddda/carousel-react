import React from "react";

import "../styles/Buttons.css";
import * as K from "../helpers/constants";
import Button from "./Button";

const Buttons = ({clickHandler}) => {
  return (
    <div className="Buttons">
      <Button 
        pos={K.leftButton}
        clickHandler={clickHandler}
      ></Button>
      <Button 
        pos={K.rightButton}
        clickHandler={clickHandler}
      ></Button>
    </div>
  );
}

Buttons.defaultProps = {
  clickHandler: () => {}
}

export default Buttons;
