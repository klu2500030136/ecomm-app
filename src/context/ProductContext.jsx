import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [apiProducts, setApiProducts] = useState([]);
    const [customProducts, setCustomProducts] = useState(() => {
        const saved = localStorage.getItem('customProducts');
        return saved ? JSON.parse(saved) : [];
    });
    const [approvedProducts, setApprovedProducts] = useState(() => {
        const saved = localStorage.getItem('approvedProducts');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setApiProducts(response.data?.products || []);
            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem('approvedProducts', JSON.stringify(approvedProducts));
    }, [approvedProducts]);

    useEffect(() => {
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
    }, [customProducts]);

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() }; // Simple ID generation
        setCustomProducts([...customProducts, newProduct]);
    };

    const approveProduct = (product) => {
        if (!approvedProducts.find(p => p.id === product.id)) {
            setApprovedProducts([...approvedProducts, product]);
        }
    };

    const rejectProduct = (productId) => {
        setApprovedProducts(approvedProducts.filter(p => p.id !== productId));
    };

    const products = [...customProducts, ...apiProducts]; // Custom products first

    return (
        <ProductContext.Provider value={{ products, approvedProducts, approveProduct, rejectProduct, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
