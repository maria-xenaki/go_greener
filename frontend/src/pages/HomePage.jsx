import React, {useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../components/AuthContext";

const HomePage = () => {

const { user } = useContext(AuthContext);

const eventLink = user ? "/add-something-green" : "/login";


const carouselItems = [
  { src: "/calendar.jpg", link: "/events", alt: "Green Events"},
  { src: "/volunteer.jpg", link: "/volunteer", alt: "Volunteer Green" },
  { src: "/shop.jpg", link: "/shop", alt: "Shop Green" },
  { src: "/dine.jpg", link: "/dine", alt: "Dine Green" },
  { src: "/new.jpg", link: eventLink, alt: "Add something Green" },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,      
  autoplaySpeed: 3000,
  pauseOnHover: true, 
  cssEase: "ease-in-out",
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 }
    }
  ]
};

const ImageCarousel = () => (
  <Slider {...settings}>
      {carouselItems.map((item, idx) => (
        <div key={idx} style={{ textAlign: "center" }} className="mt-2">
          <Link to={item.link} className="text-decoration-none">
            <img
              src={item.src}
              alt={item.alt}
              style={{ 
                width: "95%", 
                height: "300px", 
                objectFit: "cover",
                borderRadius: "8px" }}
            />
             <div
            style={{
              marginTop: "8px",
              fontWeight: "bold",
              color: "black",
              cursor: "pointer"
            }}
          >
            {item.alt}
          </div>
          </Link>
        </div>
      ))}
    </Slider>
    );



  return (
    <>
      {/* Overlay text (now positioned relative to the banner in Layout) */}
      <div
        
        style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          textAlign: "left",
          color: "white",
          zIndex: 2
        }}
      >
        <Link to="/about" style={{textDecoration:"none"}}>
          <h1 className="text-light">
            <strong>LET’S MAKE OUR PLANET</strong>
          </h1>
          <h1 className="text-light">
            <strong>GREENER</strong>
          </h1>
        </Link>
      </div>

      {/* Text + Carousel */}
      <Container fluid className="mt-5">
        <Row
          className="p-3 w-100"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <Col xs={12} className="text-center">
            <ImageCarousel />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
