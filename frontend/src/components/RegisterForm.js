import { useState } from 'react';
import { register } from "../api";
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";

export default function RegisterForm() {
    const [formData, setFormData] = useState({ 
      username: "",
      email: "", 
      confirmEmail: "",
      password: "",
      confirmPassword: "" });

    const [message, setMessage] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
     e.preventDefault();

    if (formData.email !== formData.confirmEmail) {
      setMessage("Emails do not match.");
      setShowModal(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }

    try {
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        setMessage("Registration successful! Click on the link that was sent to your email, so you can log in.");
        setShowModal(true);
        setFormData({
          username: "",
          email: "",
          confirmEmail: "",
          password: "",
          confirmPassword: ""
        });
    } catch (err) {
      // Extract server error message if available
      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";

      setMessage(`Registration failed: ${serverMsg}`);
      setShowModal(true);
    }
    };

    return (
      <>
        <h2 className="text-center">New member?</h2>

        <form onSubmit={handleSubmit} className="container" style={{ maxWidth: '400px'}}>
          <div className="mb-3">
            <input
                className="form-control"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="confirmEmail"
              type="email"
              placeholder="Confirm Email"
              value={formData.confirmEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
          />
          </div>
          <div className="mb-3">
            <input
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <Button type="submit" className="btn btn-success w-100">Register</Button>
          {/* {message && <p>{message}</p>} */}
        </form>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Registration Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

