import PropTypes from "prop-types";

import style from "./button.module.css";

const Button = (props) => {
  const { onClick, type, text } = props;
  return (
    <button className={style.button} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
