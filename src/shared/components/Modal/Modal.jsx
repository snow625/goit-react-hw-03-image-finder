import { Component } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

import style from "./modal.module.css";

const modalPlace = document.getElementById("modal-root");

class Modal extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleClose);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleClose);
  }

  handleClose = (event) => {
    const { target, currentTarget, code } = event;
    if (target === currentTarget) {
      this.props.onClose();
      return;
    }
    if (code === "Escape") {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;
    const { handleClose } = this;
    return createPortal(
      <div onClick={handleClose} className={style.overlay}>
        <div className={style.modal}>{children}</div>
      </div>,
      modalPlace
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
