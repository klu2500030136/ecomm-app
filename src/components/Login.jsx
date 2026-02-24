import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   if (username === "sai" && password === "123") {
  //     localStorage.setItem("isLoggedIn", "true");
  //     localStorage.setItem("username", username);
  //     navigate("/products1");
  //   } else {
  //     alert("Invalid username or password");
  //   }
  // };
  const { login } = useAuth(); // Get login function from context

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      u => u.username === username && u.password === password
    );

    if (validUser) {
      login({ username: validUser.username, role: 'user' }); // Use context
      navigate("/products1");
    } else if (username === 'admin' && password === 'admin') { // Allow admin login here too if desired, or keep separate
      alert("Please use Admin Login page for admin access.");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <>

      <div className="login-page">
        <div className="login-card">
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>

          <p>
            New User? <Link to="/signup">Register here</Link>
          </p>
        </div>
      </div>

    </>
  );
}

export default Login;
