import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/product/getproducts'); 
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Initial fetch
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Product List</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <div className="card my-4">
                                <div className="card-body">
                                    <h5>{product.product_name}</h5>
                                    <p>Quantity: {product.products_quantity}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No products found.</div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
