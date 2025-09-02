import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { sendContactForm } from "../api";
import ModalComp from "../components/ModalComp";

const ContactUs = () => {

    const [form, setForm] = useState({
        name:"",
        email:"",
        subject:"",
        message:"",
    });

    const [showModal, setShowModal] =   useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) =>  {
        e.preventDefault();
        try {
            await sendContactForm(form);
            setMessage("Message sent successfully!");
            setShowModal(true);
            setForm({ name: "", email: "", subject: "", message: "" });
          } catch (err) {
            console.error(err);
            setMessage("Failed to send message.");
            setShowModal(true);
            }
        };

    return (
        <>
        <Form
            onSubmit={handleSubmit}
            style={{
                maxWidth:"1000px",
                margin: "0 auto",       
                display: "block",
            }}
            className="mt-4"   
        >
            <input
                className="form-control mb-3"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
            />
            <input
                className="form-control mb-3"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
            />
            <input 
                className="form-control mb-3"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
            />
            <textarea 
                className="form-control mb-3"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message"
                rows={5}
                required
            />
             <Button 
                type="submit"
                className="btn-success">
                    Submit
            </Button>
            <p className="mt-4">
                Alternatively, you can email us at{" "}
                <span
                    onClick={() => navigator.clipboard.writeText("gogreenerinfo@gmail.com")}
                    style={{ cursor: "pointer" }}
                    title="Click to copy"
                >
                gogreenerinfo@gmail.com
                </span>
            </p>
        </Form>
        <ModalComp 
            show={showModal} 
            setShowModal={setShowModal} 
            message={message} 
            />
        </>
    )

}

export default ContactUs;