import { useState, forwardRef, useImperativeHandle } from "react";

interface TogglableProps {
    openButtonLabel: string,
    closeButtonLabel?: string,
    children: JSX.Element[]
}

const Togglable = forwardRef(({ openButtonLabel, closeButtonLabel, children }: TogglableProps, refs) => {
  const [visible, setVisible] = useState(false);

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
    <div>
      <div style={hideWhenVisible}>
        {componentOnHide}
        <button onClick={toggleVisibility}>{openButtonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {componentOnShow}
        <button onClick={toggleVisibility}>{closeButtonLabel? closeButtonLabel: "Cancel"}</button>
      </div>
    </div>
  );
});

export default Togglable;