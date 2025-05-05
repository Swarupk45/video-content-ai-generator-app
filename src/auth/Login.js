import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { toast, Toaster } from "react-hot-toast";
import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { FaMobileScreenButton } from "react-icons/fa6";

function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => console.log("reCAPTCHA solved"),
      });
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, `+${phone}`, appVerifier);
      setConfirmationResult(result);
      toast.success("OTP sent successfully!");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      if (!confirmationResult) {
        toast.error("No OTP request in progress");
        return;
      }
      const result = await confirmationResult.confirm(otp);
      toast.success("Phone number verified!");
      dispatch(login(result.user));
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } catch (error) {
      toast.error("Failed to verify OTP");
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">
      <Toaster />
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-slate-800 flex items-center justify-center"><FaMobileScreenButton color="black" fontSize={30}/> Phone Login</h2>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Phone Number</label>
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputClass="!w-full !border-gray-300 !rounded-lg !py-2 !px-3 !text-sm"
            containerClass="!w-full"
          />
        </div>

        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Sending OTP...
            </>
          ) : (
            "Send OTP"
          )}
        </button>

        <div id="recaptcha-container"></div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Enter OTP</label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={verifyOtp}
          disabled={verifying}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-60"
        >
          {verifying ? (
            <>
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>
      </div>
    </div>
  );
}

export default Login;
