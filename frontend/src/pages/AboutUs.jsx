import '../App';
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";

const data = [
    { img: "/calendar.jpg", link: "/events", alt: "Green Events", text: "Discover eco-friendly events to attend or volunteer and make our planet Greener!" },
    { img: "/volunteer.jpg", link: "/volunteer", alt: "Green Volunteering", text: "Discover volunteering opportunities!" },
     { img: "/shop.jpg", link: "/shops", alt: "Green Shops", text: "Shop sustainably!" },
     { img: "/dine.jpg", link: "/dine", alt: "Green Dine", text: "Taste the greener side of dining!" },
     { img: "/new.jpg", link: "/add-something-green", alt: "Add something green", text: "And SHARE you green findings with the Green community!" }
]

const AboutUs = () => {
    return (
      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <div style={{ padding: '2rem' }}>
                <p>Do you want to have a Greener lifestyle?</p>

                <Container className="my-4">
                    {data.map((item, index) => (
                        <Link to={item.link}
                              className="text-decoration-none text-dark"  
                        >
                            <Row key={index} className="mb-4 align-items-center">
                            {/* Left Column - Picture */}
                                <Col xs={12} md={3}>
                                    <Image
                                    src={item.img}
                                    alt={`row-${index + 1}`}
                                    fluid
                                    rounded
                                    />
                                </Col>

                            {/* Right Column - Text */}
                                <Col xs={12} md={9}>
                                    <p><strong>{item.text}</strong></p>
                                </Col>
                            </Row>
                        </Link>
                    ))}
                </Container>

                <p><i><strong>GoGreener.gr is your guide to living a greener lifestyle! <br/>
                Discover eco-friendly events, volunteering opportunities, sustainable shops and restaurants— and even share your own green findings with the community. <br/>
                Together, let’s spread the word and make a difference!</strong></i></p>
            </div>
        </div>
    );
}

export default AboutUs;