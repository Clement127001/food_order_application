import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./Modal.module.css";

const Overlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const BackDrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const Modal = (props) => {
  const overlay_render = document.getElementById("overlay");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        overlay_render
      )}
      {ReactDOM.createPortal(
        <Overlay>{props.children}</Overlay>,
        overlay_render
      )}
    </Fragment>
  );
};

export default Modal;
