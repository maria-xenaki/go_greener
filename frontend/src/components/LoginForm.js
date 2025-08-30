import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AuthContext } from "./AuthContext";

export default function LoginForm() {
    const [formData, setFormData] = useState({ username: "", password: ""});
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData((prev) => 
            ({...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(""); 
        setIsError(false);

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Login failed");
                setIsError(true);
                return;
            }

            login(data.token);
            setMessage("Login successful!");
            setIsError(false);
            navigate("/add-something-green");

        } catch (err) {
            console.error(err);
            setMessage("An unexpected error occurred. Please try again.");
            setIsError(true);
        }
    };

        return (
            <>
            <form 
                onSubmit={handleSubmit} className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                <div className="form-group mx-sm-3 mb-2" style={{ width: '60px' }}>Login
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mx-sm-3 mb-2">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <Button type="submit" className="btn-success mb-2">Login</Button>
                    {message && <p>{message}</p>}
                    {isError && message === "Wrong password." && (
                        <p>
                            <span
                                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => navigate("/forgot-password")}
                            >
                                Forgot password?
                            </span>
    </p>
)}


                
            </form>
        </>
        );
}