import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function AuthPage() {

    return (
        <div>
            <LoginForm/>
            <p className="text-center">Not a member yet? Sign up <Link to="/register">here</Link>.</p>
        </div>
    );
}