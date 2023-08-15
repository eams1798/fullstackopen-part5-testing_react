import { useState, forwardRef, useImperativeHandle } from "react";

interface TogglableProps {
    openButtonLabel: string,
    closeButtonLabel?: string,
    children: JSX.Element[]
    isVisible?: boolean
}

const Togglable = forwardRef(({ openButtonLabel, closeButtonLabel, children, isVisible }: TogglableProps, refs) => {
  const [visible, setVisible] = useState(isVisible || false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const [componentOnHide, componentOnShow] = children;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div className="togglable-container">
      <div style={hideWhenVisible}>
        {componentOnHide}
        <button className="btn-show" onClick={toggleVisibility}>{openButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {componentOnShow}
        <button className="btn-hide" onClick={toggleVisibility}>{closeButtonLabel? closeButtonLabel: "Cancel"}</button>
      </div>
    </div>
  );
});

export default Togglable;