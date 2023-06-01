import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../images/life_style_working_75.jpg';
import slide2 from '../images/5484411.jpg';
import slide3 from '../images/5486713.jpg';
import slide4 from '../images/2001.i515.002_spring_gardening_flat_4x1-01.jpg';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#4E7130', color: '#C9B590', padding: '20px' }}>
      <h1>Welcome to Botanic Butler</h1>
      <p>Your one-stop solution for plant care and management</p>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide1}
            alt="Slide 1"
          />
          <Carousel.Caption>
            <h3>Slide 1</h3>
            {/* <p>Description for Slide 1</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide2}
            alt="Slide 2"
          />
          <Carousel.Caption>
            <h3>Slide 2</h3>
            {/* <p>Description for Slide 2</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide3}
            alt="Slide 3"
          />
          <Carousel.Caption>
            <h3>Slide 3</h3>
            {/* <p>Description for Slide 3</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide4}
            alt="Slide 4"
          />
          <Carousel.Caption>
            <h3>Slide 4</h3>
            {/* <p>Description for Slide 4</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
