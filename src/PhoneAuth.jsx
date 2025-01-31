import React, { useState, useEffect } from "react";
import { auth, RecaptchaVerifier } from "../dbconfig";
import { signInWithPhoneNumber } from "firebase/auth";

const PhoneSignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );
  }, []);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formattedPhoneNumber = `+63${phoneNumber.replace(/[^0-9]/g, "")}`;

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      // User successfully signed in
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div id="recaptcha-container"></div>
      {error && <p className="error">{error}</p>}

      {!confirmationResult ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number (e.g. 1234567890)"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneSignUp;
