import React, { useEffect, useState } from "react";
import { verifyEmail } from "../api";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.hash.split('?')[1]).get('token');

    if (!token) {
      setMessage("No token provided.");
      setLoading(false);
      return;
    }

    const doVerify = async () => {
      try {
        const text = await verifyEmail(token);
        setMessage(text);
      } catch (error) {
        setMessage(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    doVerify();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{loading ? "Please wait..." : message}</h2>
    </div>
  );
};

export default VerifyEmail;
