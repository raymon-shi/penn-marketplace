import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { v4 as uuidv4 } from 'uuid';
import links from '../assets/productimages.json';
import '../styles/Homepage.css';

const Homepage = () => {
  const [regListings, setRegListings] = useState([]);
  const [bidListings, setBidListings] = useState([]);
  const [savedRegListings, setSavedRegListings] = useState([]);
  const [savedBidListings, setSavedBidListings] = useState([]);
  const navigate = useNavigate();

  const getRegListings = async () => {
    try {
      const { data } = await axios.get('/item/getRegListings');
      if (data && data.length > 0) {
        setRegListings(data.reverse());
      }
    } catch (err) {
      console.log('Error in retrieving regular listings');
    }
  };

  const getBidListings = async () => {
    try {
      const { data } = await axios.get('/item/getBidListings');
      if (data && data.length > 0) {
        setBidListings(data.reverse());
      }
    } catch (err) {
      console.log('Error in retrieving bid listings');
    }
  };

  const getSavedRegListings = async () => {
    try {
      const savedReg = await axios.get('/item/getSavedReg');
      setSavedRegListings(savedReg.data);
    } catch (err) {
      console.log('Error in retrieving saved reg listings');
    }
  };

  const getSavedBidListings = async () => {
    try {
      const savedBid = await axios.get('/item/getSavedBid');
      setSavedBidListings(savedBid.data);
    } catch (err) {
      console.log('Error in retrieving saved bid listings');
    }
  };

  useEffect(() => {
    getRegListings();
    getBidListings();
    getSavedRegListings();
    getSavedBidListings();
  }, []);

  return (
    <div className="homepage pt-5">
      <div className="carousel-wrapper">
        <h1>Regular listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={regListings.length}
          visibleSlides={5}
          step={5}
        >
          <Slider>
            {regListings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/RegularItem', { state: { itemId: item._id, posterName: item.posterName } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={item.media} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`$${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </>
                  )
                  : (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h1>{item.itemName}</h1>
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`Price: $${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </div>
                  )}
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
        <h1>Bid listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={bidListings.length}
          visibleSlides={5}
          step={5}
        >
          <Slider>
            {bidListings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/BidItem', { state: { itemId: item._id, posterName: item.posterName } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={item.media} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`Highest Bid: $${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </>
                  )
                  : (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h1>{item.itemName}</h1>
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`Highest Bid: $${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </div>
                  )}
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
        <h1>Saved Regular Listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={links.length}
          visibleSlides={5}
          step={5}
        >
          <Slider>
            {savedRegListings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/RegularItem', { state: { itemId: item._id } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={item.media} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`$${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </>
                  )
                  : (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h1>{item.itemName}</h1>
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`Price: $${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </div>
                  )}
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
        <h1>Saved Bid listings</h1>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={links.length}
          visibleSlides={5}
        >
          <Slider>
            {savedBidListings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/BidItem', { state: { itemId: item._id } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={item.media} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%' }}><b>{`Highest Bid: $${Math.max(Math.max(...item.bidHistory), 0)}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </>
                  )
                  : (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h1>{item.itemName}</h1>
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`Highest Bid: $${Math.max(Math.max(...item.bidHistory), 0)}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </div>
                  )}
              </Slide>
            ))}
          </Slider>
          <div className="buttons">
            <ButtonBack className="btn me-2">Back</ButtonBack>
            <ButtonNext className="btn">Next</ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      <div className="spacer" />
    </div>
  );
};

export default Homepage;
