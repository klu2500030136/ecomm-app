import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Payment() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = (e) => {
        e.preventDefault();
        // In a real app, integrate with Stripe or similar here.
        alert("Payment Successful! Thank you for your purchase.");
        localStorage.removeItem("cart"); // Clear the cart
        navigate("/"); // Redirect to home on success
    };

    return (
        <>
            <div className="login-page">
                <form className="payment-card" onSubmit={handlePayment}>
                    <h2>Secure Checkout</h2>

                    <h3>Shipping Address</h3>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="fullName" placeholder="John Doe" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="john@example.com" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Address</label>
                        <input type="text" name="address" placeholder="123 Main St" required onChange={handleChange} />
                    </div>
                    <div className="grid-2">
                        <div className="input-group">
                            <label>City</label>
                            <input type="text" name="city" placeholder="New York" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>Zip Code</label>
                            <input type="text" name="zip" placeholder="10001" required onChange={handleChange} />
                        </div>
                    </div>

                    <h3 style={{ marginTop: "30px" }}>Payment Details</h3>
                    <div className="input-group">
                        <label>Name on Card</label>
                        <input type="text" name="cardName" placeholder="John Doe" required onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Credit Card Number</label>
                        <input type="text" name="cardNumber" placeholder="1111-2222-3333-4444" required onChange={handleChange} />
                    </div>

                    <div className="grid-2" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                        <div className="input-group">
                            <label>Exp Month</label>
                            <select name="expMonth" required onChange={handleChange}>
                                <option value="">Month</option>
                                <option value="01">01 - Jan</option>
                                <option value="02">02 - Feb</option>
                                <option value="03">03 - Mar</option>
                                <option value="04">04 - Apr</option>
                                <option value="05">05 - May</option>
                                <option value="06">06 - Jun</option>
                                <option value="07">07 - Jul</option>
                                <option value="08">08 - Aug</option>
                                <option value="09">09 - Sep</option>
                                <option value="10">10 - Oct</option>
                                <option value="11">11 - Nov</option>
                                <option value="12">12 - Dec</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Exp Year</label>
                            <input type="text" name="expYear" placeholder="2027" required onChange={handleChange} />
                        </div>
                        <div className="input-group">
                            <label>CVV</label>
                            <input type="text" name="cvv" placeholder="352" required onChange={handleChange} />
                        </div>
                    </div>

                    <button type="submit" className="action-btn" style={{ marginTop: "15px", width: "100%" }}>
                        Confirm & Pay
                    </button>
                </form>
            </div>
        </>
    );
}

export default Payment;