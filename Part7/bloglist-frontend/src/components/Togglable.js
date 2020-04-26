import React, { useState, useImperativeHandle } from "react";
import { Button } from "@material-ui/core";

import PropTypes from "prop-types";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button color="primary" onClick={toggleVisibility}>
          <b>{props.buttonLabel}</b>
        </Button>
      </div>
      <div style={showWhenVisible} id="ToggleContents">
        {props.children}
        <Button color="secondary" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
