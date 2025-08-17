import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setMessage("No token provided.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/email-verification/confirm?token=${token}`
        );

        const text = await response.text();

        if (!response.ok) {
          throw new Error(text || "Verification failed.");
        }

        setMessage(text);
      } catch (error) {
        setMessage(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{loading ? "Please wait..." : message}</h2>
    </div>
  );
};

export default VerifyEmail;
