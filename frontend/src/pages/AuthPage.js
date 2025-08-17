import LoginForm from "../components/LoginForm";

export default function AuthPage() {

    return (
        <div>
            <LoginForm/>
            <p className="text-center">Not a member yet? Register <a href="/register">here</a>.</p>
        </div>
    );
}