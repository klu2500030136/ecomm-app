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

    // 🔥 Fetch API Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const fetchedProducts = response.data?.products || [];

                setApiProducts(fetchedProducts);

                // ✅ If no approved products exist → approve ALL API products
                const savedApproved = localStorage.getItem('approvedProducts');

                if (!savedApproved || JSON.parse(savedApproved).length === 0) {
                    setApprovedProducts(fetchedProducts);
                }

            } catch (error) {
                console.error("Failed to fetch products", error);
            }
        };

        fetchProducts();
    }, []);

    // 🔹 Save Approved Products
    useEffect(() => {
        localStorage.setItem('approvedProducts', JSON.stringify(approvedProducts));
    }, [approvedProducts]);

    // 🔹 Save Custom Products
    useEffect(() => {
        localStorage.setItem('customProducts', JSON.stringify(customProducts));
    }, [customProducts]);

    // 🔹 Add Custom Product
    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() };
        setCustomProducts(prev => [...prev, newProduct]);
    };

    // 🔹 Approve Product
    const approveProduct = (product) => {
        if (!approvedProducts.find(p => p.id === product.id)) {
            setApprovedProducts(prev => [...prev, product]);
        }
    };

    // 🔹 Reject Product
    const rejectProduct = (productId) => {
        setApprovedProducts(prev =>
            prev.filter(p => p.id !== productId)
        );
    };

    // 🔹 Combined Products (Admin View)
    const products = [...customProducts, ...apiProducts];

    return (
        <ProductContext.Provider
            value={{
                products,
                approvedProducts,
                approveProduct,
                rejectProduct,
                addProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);