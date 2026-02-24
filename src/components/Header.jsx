
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

function Header() {

  const { user, logout } = useAuth();
  const name = user?.username;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <header>
        <h1>🛍️ MyShop</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products1">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/admin-login">Admin</Link>
          {name ? (
            <div id="user-display">
              <span>Hi, {name}</span>
              <button onClick={handleLogout} className="pbtn" style={{ marginLeft: '1rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>LogOut</button>
            </div>
          ) : null}
        </nav>

      </header>
    </>
  )

}
export default Header