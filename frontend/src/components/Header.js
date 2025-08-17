import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const eventLink = user ? "/new-event" : "/auth";

    return (
        <Navbar bg="success" expand="md" variant="dark" className="mb-4 py-3">
            <Container>
                <Navbar.Brand>
                    <h1 className="mb-0">
                        <Link to="/" className="text-decoration-none text-light">
                            GoGreener App
                        </Link>
                    </h1>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    className="bg-success"
                    style={{ width: '225px' }}
                >
                    <Offcanvas.Header closeButton closeVariant="white" className="bg-success text-white"/>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 align-items-center gap-3">

                            {/* 1. Admin Page button, visible only for admin */}
                            {user?.role === "ROLE_ADMIN" && (
                                // <Nav.Link as={Link} to="/admin-events" className="text-light bg-success">
                                //     Admin Page
                                // </Nav.Link>
                                <NavDropdown title="Admin Pages">
                                    <NavDropdown.Item href="/admin-events" className="btn-success">
                                        Manage Events
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/admin-users">Manage Users
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                            
                            {/* 2. Add New Event button, redirects accordingly */}
                            <Nav.Link as={Link} to={eventLink} className="text-light bg-success">
                                    Add New Event
                            </Nav.Link>
                            
                            {/* 3. user appears if logged in, otherwise Signup/Login */}
                             <Nav.Link
                                as={user ? "span" : Link}
                                to={user ? undefined : "/auth"}
                                onClick={user ? handleLogout : undefined}
                                className="text-light bg-success nav-link-hover"
                                style={{ cursor: "pointer" }}
                                >
                                {user ? `${user.username} | Sign out` : "Sign up/Login"}
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Header;
