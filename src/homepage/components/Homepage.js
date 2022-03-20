import React from 'react';
import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Button } from 'react-bootstrap';
import links from '../assets/productimages.json';
import '../styles/Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage" style={{ paddingTop: '150px' }}>
      <div className="carousel-wrapper">
        <h1 className>Today's listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={links.length}
          visibleSlides={5}
        >
        <Slider>
          {links.map((link) => (
            <Slide>
              <Image>
                <img src={link} alt="product pic" width="100%" height="100%" />
              </Image>
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
        </CarouselProvider>
      </div>

      <div className="carousel-wrapper">
        <h1 className>Trending Listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={links.length}
          visibleSlides={5}
        >
        <Slider>
          {links.map((link) => (
            <Slide>
              <Image>
                <img src={link} alt="product pic" width="100%" height="100%" />
              </Image>
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
        </CarouselProvider>
      </div>

      <div className="carousel-wrapper">
        <h1 className>Saved Listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={links.length}
          visibleSlides={5}
        >
        <Slider>
          {links.map((link) => (
            <Slide>
              <Image>
                <img src={link} alt="product pic" width="100%" height="100%" />
              </Image>
              <p>$5.99</p>
            </Slide>
          ))}
        </Slider>
        <div className="buttons">
          <ButtonBack className="btn me-2">Back</ButtonBack>
          <ButtonNext className="btn">Next</ButtonNext>
        </div>
        </CarouselProvider>
      </div>
    </div>
  );
};

export default Homepage;
