import { Component } from "react";
import PropTypes from "prop-types";

import style from "./searchbar.module.css";

class Searchbar extends Component {
  state = {
    value: "",
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { value } = this.state;
    onSubmit(value);
  };

  render() {
    const { value } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.label}>Search</span>
          </button>

          <input
            onChange={handleChange}
            className={style.input}
            value={value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
