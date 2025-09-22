import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { requestPasswordReset, resetPassword } from "../api";

export default function ResetPasswordForm() {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // --- Forgot Password ---
    const handleRequestReset = async (e) => {
        e.preventDefault();
        try {
            const text = await requestPasswordReset(formData.email);
            setMessage(text);
            setEmailSent(true);
            setShowModal(true);
        } catch (err) {
            setMessage("Failed to send reset email.");
            setShowModal(true);
        }
    };

    // --- Reset Password ---
   const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        setShowModal(true);
        return;
    }
    try {
        const text = await resetPassword(token, formData.newPassword);
        setMessage(text); 
        setShowModal(true); 
        
        // redirect after 2 seconds
        setTimeout(() => {
            window.location.href = "/login";
            }, 2000);
    } catch (err) {
        setMessage("Failed to reset password.");
        setShowModal(true);
    }
};

    const renderModal = () => (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>{token ? "Password Reset Status" : "Forgot Password Status"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
                {!token && emailSent && <p className="mt-2">Check your email for the reset link!</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );

    if (token) {
        return (
            <>
                <form onSubmit={handleResetPassword} className="container" style={{ maxWidth: '400px' }}>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <Button type="submit" className="w-100 btn-success">Reset Password</Button>
                </form>
                {renderModal()}
            </>
        );
    }

    // --- Render Forgot Password Form ---
    return (
        <>
            <form onSubmit={handleRequestReset} className="container" style={{ maxWidth: '400px' }}>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <Button type="submit" className="w-100 btn-success">Send Reset Link</Button>
            </form>
            {renderModal()}
        </>
    );
}
