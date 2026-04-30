import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert("Reset link sent to email");
    } catch (err) {
      alert("Error sending reset link");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
}