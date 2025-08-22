import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Offcanvas } from "react-bootstrap";
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
    <header className="w-100">
      {/* ===== Desktop First Line ===== */}
      <div className="d-none d-md-flex justify-content-between align-items-center w-100 py-2 px-3">
        {/* Logo */}
        <Navbar.Brand>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/GoGreenerImage.png"}
              alt="GoGreener Logo"
              height="50"
            />
          </Link>
        </Navbar.Brand>

        {/* Right Side Links */}
        <Nav className="d-flex align-items-center gap-3">
          {user?.role === "ROLE_ADMIN" && (
            <NavDropdown title={<span style={{ color: "black" }}>Admin Pages</span>} id="admin-pages" >
              <NavDropdown.Item as={Link} to="/admin-events">Manage Events</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin-users">Manage Users</NavDropdown.Item>
            </NavDropdown>
          )}

          <Nav.Link
            as={user ? "span" : Link}
            to={user ? undefined : "/auth"}
            onClick={user ? handleLogout : undefined}
            style={{ cursor: "pointer", color: "black" }}
          >
            {user ? `${user.username} | Sign out` : "Sign up/Login"}
          </Nav.Link>
        </Nav>
      </div>

      {/* ===== Desktop Second Line ===== */}
      <div className="d-none d-md-block">
        <Navbar expand="md" className="py-1 w-100" style={{ backgroundColor: "transparent", borderBottom: "5px solid green" }}>
          <div className="d-flex justify-content-center align-items-center w-100 px-3">
            <Nav className="d-flex gap-4 text-dark">
              <Nav.Link as={Link} to="/events" className="text-dark">Events</Nav.Link>
              <Nav.Link as={Link} to="/volunteer" className="text-dark">Volunteer</Nav.Link>
              <Nav.Link as={Link} to="/shop" className="text-dark">Shop</Nav.Link>
              <Nav.Link as={Link} to="/dine" className="text-dark">Dine</Nav.Link>
              <Nav.Link as={Link} to={eventLink} className="text-dark fw-bold">
                    Add Something Green
              </Nav.Link>
            </Nav>
          </div>
        </Navbar>
      </div>

      {/* ===== Mobile Offcanvas ===== */}
      <Navbar expand="md" className="d-md-none py-2 w-100" style={{ backgroundColor: "transparent" }}>
        <div className="d-flex justify-content-between align-items-center w-100 px-3">
          <Navbar.Brand>
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/GoGreenerImage.png"}
                alt="GoGreener Logo"
                height="50"
              />
            </Link>
          </Navbar.Brand>

          {/* Offcanvas Toggle */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-success text-white offcanvas-green"
            style={{ width: '250px' }}
          >
            <Offcanvas.Header closeButton closeVariant="white" className="bg-success text-white" />
            <Offcanvas.Body>
              <Nav className="flex-column gap-2">
                {/* Main Links */}
                <Nav.Link as={Link} to="/events" className="text-white">Events</Nav.Link>
                <Nav.Link as={Link} to="/volunteer" className="text-white">Volunteer</Nav.Link>
                <Nav.Link as={Link} to="/shop" className="text-white">Shop</Nav.Link>
                <Nav.Link as={Link} to="/dine" className="text-white">Dine</Nav.Link>
                <Nav.Link as={Link} to={eventLink} className="text-white fw-bold">Add Something Green</Nav.Link>
                
                <div className="my-2 border-top border-light"></div>

                {/* Admin Pages */}
                {user?.role === "ROLE_ADMIN" && (
                    <NavDropdown
                        title={<span style={{ color: "white" }}>Admin Pages</span>}
                        id="admin-pages-mobile"
                        menuVariant="dark"
                        style={{ backgroundColor: "#198754", margin: 0 }}
                        >
                        <NavDropdown.Item as={Link} to="/admin-events" style={{ backgroundColor: "#198754", color: "white" }}>
                            Manage Events
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/admin-users" style={{ backgroundColor: "#198754", color: "white" }}>
                            Manage Users
                        </NavDropdown.Item>
                    </NavDropdown>
                 )}

                {/* User / Sign out */}
                <Nav.Link
                  as={user ? "span" : Link}
                  to={user ? undefined : "/auth"}
                  onClick={user ? handleLogout : undefined}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  {user ? `${user.username} | Sign out` : "Sign up/Login"}
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;