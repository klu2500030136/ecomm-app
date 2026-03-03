import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // ✅ Initialize cart with quantity
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQty = cart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    setCartItems(cartWithQty);
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const increaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const decreaseQty = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div style={{ paddingBottom: "80px", textAlign: "center" }}>
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h3>No items in cart</h3>
        ) : (
          <div className="products">
            {cartItems.map((item) => (
              <div className="product" key={item.id}>
                <img src={item.thumbnail} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div>
                  <button className="pbtn" onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
                <div>
                  <button className="dbtn" onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ margin: "0 20px" }}>Item count: {item.quantity}</span>
                  <button className="ibtn" onClick={() => increaseQty(item.id)}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div>
          <h2>Total price: ${totalPrice}</h2>
          <button onClick={() => navigate('/payment')} style={{ padding: "10px 20px", fontSize: "18px", cursor: "pointer" }}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;