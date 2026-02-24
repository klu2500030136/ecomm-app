import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

function Products1() {
    const { approvedProducts } = useProducts();
    const navigate = useNavigate();

    const handleAddToCart = (p) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (isLoggedIn == "true") {
            const cartData = JSON.parse(localStorage.getItem("cart")) || [];
            cartData.push(p);
            localStorage.setItem("cart", JSON.stringify(cartData));
            navigate("/products1");
            alert("Added to cart Successfully");
        }
        else {
            alert("Please! Login first ");
            navigate("/login");
        }

    };

    return (
        <>

            <section className="products">
                {!Array.isArray(approvedProducts) || approvedProducts.length === 0 ? <p>No approved products available.</p> : approvedProducts.map((p) => (
                    <div className="product" key={p.id}>
                        <img src={p.thumbnail || p.image || "https://via.placeholder.com/150"} alt={p.title} />
                        <h3>{p.title}</h3>
                        <p>Category: {p.category}</p>
                        <p>Price: ${p.price}</p>
                        <button className="pbtn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
                    </div>
                ))}
            </section>

        </>
    )
}

export default Products1