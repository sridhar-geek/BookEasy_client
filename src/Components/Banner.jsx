import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { bannerImages } from "../assests/ImageUrl";
import { styled } from "@mui/material";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Image = styled("img")`
  width: 100%;
  height: 400px;
`;
const Banner = () => {
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      ssr={true}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      transitionDuration={400}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {bannerImages.map((img, index) => (
        <Image src={img.url} alt="Hotel" />
      ))}
    </Carousel>
  );
};

export default Banner;

// banner for homepage
