import React, { useEffect, useState } from 'react';
import '../components/Products.css'; 

const Products = () => {
    const [products, setProducts] = useState([]);

  
    const sampleProducts = [
        { id: 1, name: 'Product A', price: 29.99, imageUrl: 'path/to/image1.jpg' },
        { id: 2, name: 'Product B', price: 19.99, imageUrl: 'path/to/image2.jpg' },
        { id: 3, name: 'Product C', price: 39.99, imageUrl: 'path/to/image3.jpg' },
        
    ];

    useEffect(() => {
        
        setProducts(sampleProducts);
    }, []);

    return (
        <div className="products-container">
            <h1>Products</h1>
            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrl} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>${product.price.toFixed(2)}</p>
                        <button>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;