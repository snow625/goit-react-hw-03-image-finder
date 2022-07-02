import ImageGalleryItem from "./ImageGalleryItem";

import PropTypes from "prop-types";

import style from "./imageGallery.module.css";

const ImageGallery = (props) => {
  const { items, onClick } = props;
  const elements = items.map((el, i) => {
    const { id, webformatURL, tags } = el;
    return (
      <ImageGalleryItem
        onClick={onClick}
        index={i}
        key={id}
        src={webformatURL}
        alt={tags}
      />
    );
  });
  return <ul className={style.gallery}>{elements}</ul>;
};

ImageGallery.defaultProps = {
  items: [],
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
export default ImageGallery;
