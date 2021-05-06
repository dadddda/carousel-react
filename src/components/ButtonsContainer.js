import React from "react";

import "../styles/ButtonsContainer.css";
import * as Const from "../helpers/constants";
import Button from "./Button";

const ButtonsContainer = ({clickHandler}) => {
  return (
    <div className="ButtonsContainer">
      <Button
        type={Const.LEFT_BUTTON}
        clickHandler={clickHandler}
      />
      <Button 
        type={Const.RIGHT_BUTTON}
        clickHandler={clickHandler}
      />
    </div>
  );
}

ButtonsContainer.defaultProps = {
  clickHandler: () => {}
}

export default ButtonsContainer;
