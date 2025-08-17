import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function AddEventBtn () {
    const navigate = useNavigate();

    return(
        <Button 
            onClick={() => {
                const token = localStorage.getItem("token");
                if (token) {
                navigate("/new-event"); 
                } else {
                navigate("/auth")};
                }
            }
                style={{ margin: "10px" }} className="btn-success"
        >
            Add New Event
        </Button>
    )
};

