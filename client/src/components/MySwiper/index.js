import { useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Autoplay, Navigation } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import "./MySwiper.scss";

const MySwiper = ({
  children,
  className = "",
  showDefaultNavigation = true,
  breakpoints = {
    375: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    740: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 5,
      slidesPerGroup: 5,
      spaceBetween: 28,
    },
  },
  ...params
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <div className={clsx("my-swiper", className)}>
        <Swiper
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          modules={[Navigation, Autoplay]}
          {...params}
          navigation={{
            prevEl: `.${className}-prev`,
            nextEl: `.${className}-next`,
          }}
          breakpoints={breakpoints}
        >
          {children}
        </Swiper>
        {params.navigation && showDefaultNavigation && (
          <button
            className={clsx(
              "swiper-arrow",
              "is-circle",
              "is-hover-dark",
              `${className}-prev`,
              "prev"
            )}
            ref={prevRef}
          >
            <i className="ic-go-left"></i>
          </button>
        )}
        {params.navigation && showDefaultNavigation && (
          <button
            className={clsx(
              "swiper-arrow",
              "is-circle",
              "next",
              "is-hover-dark",
              `${className}-next`
            )}
            ref={nextRef}
          >
            <i className="ic-go-right"></i>
          </button>
        )}
      </div>
      {params.navigation && !showDefaultNavigation && (
        <div className="swiper-top-arrows">
          <button
            className={clsx(
              "swiper-top-arrow",
              "is-hover-dark",
              `${className}-prev`,
              "prev"
            )}
            ref={prevRef}
          >
            <i className="ic-go-left"></i>
          </button>
          <button
            className={clsx(
              "swiper-top-arrow",
              "next",
              "is-hover-dark",
              `${className}-next`
            )}
            ref={nextRef}
          >
            <i className="ic-go-right"></i>
          </button>
        </div>
      )}
    </>
  );
};
MySwiper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  showDefaultNavigation: PropTypes.bool,
  breakpoints: PropTypes.object,
};
export default MySwiper;
