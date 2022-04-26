import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { v4 as uuidv4 } from 'uuid';
import ResultCard from './ResultCard';

const SearchResults = () => {
  const { state } = useLocation();
  const { query } = state;
  const [listings, setListings] = useState([]);
  const [bidListings, setBidListings] = useState([]);
  const navigate = useNavigate();

  async function getListings() {
    try {
      const { data } = await axios.post('/item/search', {
        filter: query,
      });
      if (data && data.length > 0) {
        setListings(data.reverse());
      }
    } catch (error) {
      throw new Error('Error searching for items');
    }
  }

  async function getBidListings() {
    try {
      const { data } = await axios.post('/item/bidSearch', {
        filter: query,
      });
      setBidListings(data.reverse());
    } catch (error) {
      throw new Error('Error searching for items');
    }
  }

  useEffect(() => {
    getListings();
    getBidListings();
  }, [query]);

  // const rows = Math.ceil(listings.length / 3);
  // const items = (Array(rows).fill().map((_, rowIndex) => (
  //   <Row>
  //     {
  //       listings.slice(rowIndex * 3, (rowIndex * 3) + 3).map((result) => (
  //         <Col>
  //           <ResultCard
  //             /* eslint no-underscore-dangle: 0 */
  //             key={result._id}
  //             title={result.itemName}
  //             price={result.price}
  //             lister={result.posterName}
  //             tag={result.tag}
  //             image={result.media}
  //           />
  //         </Col>
  //       ))
  //     }
  //   </Row>
  // )));

  return (
    <div className="homepage pt-5">
      <div className="carousel-wrapper">
        <h4 style={{ marginTop: '0 auto' }}> {listings.length} Regular listing results for &quot;{query}&quot;</h4>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={listings.length}
          visibleSlides={5}
        >
          <Slider>
            {listings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/item', { state: { itemId: item._id } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={`http://localhost:8080/${item.media}`} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%' }}><b>{`$${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
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
        <h4> {bidListings.length} Bid listing results for &quot;{query}&quot;</h4>
        <CarouselProvider
          className="mt-1"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          totalSlides={bidListings.length}
          visibleSlides={5}
        >
          <Slider>
            {bidListings.map((item, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <Slide onClick={() => navigate('/item', { state: { itemId: item._id } })} index={idx} key={uuidv4()}>
                {item.media && item.media !== ''
                  ? (
                    <>
                      <Image src={`http://localhost:8080/${item.media}`} alt="product pic" hasMasterSpinner={false} />
                      <p style={{ width: '100%' }}><b>{`Highest Bid: $${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
                    </>
                  )
                  : (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
                      <h1>{item.itemName}</h1>
                      <p style={{ width: '100%', textAlign: 'center' }}><b>{`$${item.price}`}</b>{`, listed by ${item.posterName.split(' ')[0]}`}</p>
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
    </div>
  );
};

export default SearchResults;
