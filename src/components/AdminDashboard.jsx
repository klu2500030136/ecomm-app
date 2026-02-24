import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
// import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions } from '@mui/material'; // REMOVED

const AdminDashboard = () => {
    const [newProduct, setNewProduct] = useState({ title: '', price: '', thumbnail: '' });
    const { products, approvedProducts, approveProduct, rejectProduct, addProduct } = useProducts();

    const isApproved = (id) => approvedProducts.some(p => p.id === id);

    const handleAddProduct = () => {
        if (!newProduct.title || !newProduct.price || !newProduct.thumbnail) {
            alert("Please fill all fields");
            return;
        }
        addProduct(newProduct);
        setNewProduct({ title: '', price: '', thumbnail: '' });
        alert("Product added successfully!");
    };

    return (
        <div className="content">
            <h1>Admin Dashboard - Product Approval</h1>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <h3>Add New Product</h3>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        style={{ padding: '0.5rem' }}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        style={{ padding: '0.5rem' }}
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProduct.thumbnail}
                        onChange={(e) => setNewProduct({ ...newProduct, thumbnail: e.target.value })}
                        style={{ padding: '0.5rem', flexGrow: 1 }}
                    />
                    <button className="pbtn" onClick={handleAddProduct}>Add Product</button>
                </div>
            </div>

            <section className="products">
                {Array.isArray(products) && products.length > 0 ? products.map((product) => (
                    <div className="product" key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                        <p style={{ color: isApproved(product.id) ? 'var(--success)' : 'var(--text-secondary)' }}>
                            Status: {isApproved(product.id) ? "Approved" : "Pending"}
                        </p>

                        <div style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
                            {!isApproved(product.id) ? (
                                <button className="pbtn" onClick={() => approveProduct(product)}>
                                    Approve
                                </button>
                            ) : (
                                <button className="dbtn" onClick={() => rejectProduct(product.id)}>
                                    Reject
                                </button>
                            )}
                        </div>
                    </div>
                )) : <p>Loading products...</p>}
            </section>
        </div>
    );
};

export default AdminDashboard;
