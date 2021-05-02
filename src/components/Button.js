import React from "react";

import "../styles/Button.css";

const Button = ({pos}) => {
  return (
    <div className={"Button " + pos}>
      <span>&lt;</span>
    </div>
  );
}

Button.defaultProps = {
  pos: "left"
}

export default Button;
