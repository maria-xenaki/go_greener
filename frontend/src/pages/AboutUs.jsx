import '../App';
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
      <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
            <div style={{ padding: '2rem' }}>
                <p>This space was created from the need to find ways to contribute to making our planet a better place.</p>
                <p>You can find all kind of <Link to="/events">events</Link> that help turn our planet greener, ways to <Link to="/volunteer">volunteer</Link> , places to <Link to="/shop">shop</Link> and <Link to="/dine">eat</Link>.</p>
                <p> And you are <i>more</i> than welcome to <Link to="/add-something-green">make your own contributions!</Link></p>
                <p>Let us know of any events, as well as places to volunteer, shop or eat greener, that you came across.</p>
                <p><i>It doesn't even have to be your event! It could be anything you found that you don't see already registered on this site.</i></p>
                <p>And remember! <b>SPREAD THE WORD!</b></p>
                </div>
        </div>
    );
}

export default AboutUs;