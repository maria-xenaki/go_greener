import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Offcanvas } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowOffcanvas(false);
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const eventLink = user ? "/add-something-green" : "/login";

  return (
    <header className="w-100 fixed-top bg-white shadow-sm full-width-footer">
      {/* Desktop First Line */}
      <div className="d-none d-md-flex justify-content-between align-items-center w-100 py-1 px-3">
        <Navbar.Brand className="d-flex align-items-center">
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
               <NavDropdown.Item as={Link} to="/admin-events">Manage Posts</NavDropdown.Item> 
               <NavDropdown.Item as={Link} to="/admin-users">Manage Users</NavDropdown.Item>
             </NavDropdown>
           )}

           {user && (
             <Nav.Link
               as="span"
               onClick={handleLogout}
               style={{ cursor: "pointer", color: "black" }}
             >
               {user.username} | Sign out
             </Nav.Link>
           )}
         </Nav>
       </div>

       {/* Desktop Second Line */}
       <div className="d-none d-md-block">
         <Navbar expand="md" className="py-0 w-100" style={{ backgroundColor: "transparent", borderBottom: "5px solid green" }}>
           <div className="d-flex justify-content-center align-items-center w-100 px-3">
             <Nav className="d-flex gap-4 text-dark">
               <Nav.Link
                 as={NavLink} to="/events"
                 className={({ isActive }) =>
                   `text-dark ${isActive ? "fw-bold" : "text-dark"}`
                 }
                 >Events
               </Nav.Link>
               <Nav.Link
                 as={NavLink} to="/volunteer"
                 className={({ isActive }) =>
                   `text-dark ${isActive ? "fw-bold" : ""}`
                 }
               >Volunteer
               </Nav.Link>
               <Nav.Link
                 as={NavLink} to="/shop"
                 className={({ isActive }) =>
                   `text-dark ${isActive ? "fw-bold" : "text-dark"}`
                 }
                 >Shop
               </Nav.Link>  
               <Nav.Link
                 as={NavLink} to="/dine"
                 className={({ isActive }) =>
                   `text-dark ${isActive ? "fw-bold" : "text-dark"}`
                 }
                 >Dine
               </Nav.Link>
               <Nav.Link
                as={NavLink} to={eventLink}
                className={({ isActive }) =>
                  `text-dark ${isActive ? "fw-bold" : "text-dark"}`
                }
                >Add Something Green
              </Nav.Link>
            </Nav>
          </div>
        </Navbar>
      </div>

      {/* Mobile Offcanvas */}
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
          <Navbar.Toggle 
             aria-controls="offcanvasNavbar" 
             className="me-3 navbar-toggler-success"
             onClick={handleShow}
           />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-success text-white offcanvas-green"
            style={{ width: '250px' }}
            show={showOffcanvas}
            onHide={handleClose}
          >
            <Offcanvas.Header 
              closeButton 
              closeVariant="white" 
              className="bg-success text-white me-3 mt-3" />
            <Offcanvas.Body>
              <Nav className="flex-column gap-2">
                <Nav.Link as={Link} to="/events" className="text-white" onClick={handleClose}>Events</Nav.Link>
                <Nav.Link as={Link} to="/volunteer" className="text-white" onClick={handleClose}>Volunteer</Nav.Link>
                <Nav.Link as={Link} to="/shop" className="text-white" onClick={handleClose}>Shop</Nav.Link>
                <Nav.Link as={Link} to="/dine" className="text-white" onClick={handleClose}>Dine</Nav.Link>
                <Nav.Link as={Link} to={eventLink} className="text-white" onClick={handleClose}>Add Something Green</Nav.Link>
                
                <div className="my-2 border-top border-light"></div>

                 {/* Admin Pages */}
                 {user?.role === "ROLE_ADMIN" && (
                    <NavDropdown
                        title={<span style={{ color: "white" }}>Admin Pages</span>}
                        id="admin-pages-mobile"
                        menuVariant="dark"
                        style={{ backgroundColor: "#198754", margin: 0 }}
                        >
                        <NavDropdown.Item as={Link} to="/admin-events" style={{ backgroundColor: "#198754", color: "white" }} onClick={handleClose}>
                            Manage Posts
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/admin-users" style={{ backgroundColor: "#198754", color: "white" }}onClick={handleClose}>
                            Manage Users
                        </NavDropdown.Item>
                    </NavDropdown>
                 )}

                {user && (
                  <Nav.Link
                    as="span"
                    onClick={handleLogout}
                    className="text-white"
                    style={{ cursor: "pointer" }}
                  >
                     {user.username} | Sign out
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;