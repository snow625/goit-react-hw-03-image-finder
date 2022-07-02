import { Component } from "react";

import Searchbar from "./Searchbar";
import { getImgsByQwery } from "../../shared/serveces/pixabay";

import ImageGallery from "./ImageGallery";
import Button from "../Button";
import Modal from "../../shared/components/Modal";
import Loader from "../Loader";
import style from "./imageFinder.module.css";

class ImageFinder extends Component {
  state = {
    items: [],
    qwery: "",
    page: 1,
    totalPages: 0,
    modalImg: {
      src: "",
      alt: "",
    },
    modalOpen: false,
    loader: false,
    error: null,
  };

  async getImgItemsByQwery() {
    const { qwery, page } = this.state;
    this.setState({ loader: true });
    try {
      const data = await getImgsByQwery(qwery, page);
      const totalPages = Math.ceil(data.totalHits / 12);
      this.setState((prevState) => {
        const { items } = prevState;

        return { items: [...items, ...data.hits], totalPages, loader: false };
      });
    } catch (error) {
      this.setState({ loader: false });
      this.setState({ error });
    }
  }

  setQweryInState = (value) => {
    const { qwery } = this.state;
    if (value !== qwery) {
      this.setState({ qwery: value, page: 1, totalPages: 0, items: [] });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, qwery: prevQwery, items: prevItems } = prevState;
    const { page: nextPage, qwery: nextQwery, items: nextItems } = this.state;
    if (prevPage !== nextPage || prevQwery !== nextQwery) {
      this.getImgItemsByQwery();
    }
    // Плавный скрол при добавлении новых карточек
    if (
      prevItems.length > 0 &&
      prevItems.length !== nextItems.length &&
      nextItems.length
    ) {
      const { height: cardHeight } = document
        .querySelector("ul")
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }
  }

  setNextPage = () => {
    this.setState((prevState) => {
      const { page: prevPage } = prevState;
      return { page: prevPage + 1 };
    });
  };

  setModalImg = (index) => {
    const { items, modalImg } = this.state;
    const { src: currentSrc } = modalImg;
    const { largeImageURL: src, tags: alt } = items[index];
    if (currentSrc !== src) {
      this.setState({
        modalImg: {
          src,
          alt,
        },
        modalOpen: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      modalImg: {
        src: "",
        alt: "",
      },
      modalOpen: false,
    });
  };

  render() {
    const { setQweryInState, setNextPage, setModalImg, closeModal } = this;
    const {
      items,
      modalImg,
      modalOpen,
      error,
      totalPages,
      page,
      loader,
      qwery,
    } = this.state;

    const notFound = !totalPages && qwery && !loader && !error;
    const noWrapper = error || loader || notFound;
    const noGallary = !notFound && qwery && !error;
    const noButton = totalPages - page > 0;

    return (
      <div className={style.imageFinder}>
        <Searchbar onSubmit={setQweryInState} />

        {noGallary && <ImageGallery items={items} onClick={setModalImg} />}

        {noButton && !loader && (
          <Button onClick={setNextPage} text="Load more" type="button" />
        )}

        {modalOpen && (
          <Modal onClose={closeModal}>
            <img src={modalImg.src} alt={modalImg.alt} />
          </Modal>
        )}
        {noWrapper && (
          <div className={style.wrapper}>
            {loader && <Loader />}
            {error && (
              <p className={style.error}>{error?.message}, try again</p>
            )}
            {notFound && (
              <p
                className={style.notFind}
              >{`On request "${qwery}" nothing found, change the keyword and try again`}</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ImageFinder;
