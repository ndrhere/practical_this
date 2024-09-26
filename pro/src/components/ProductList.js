import React, { useEffect, useState } from 'react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [nameFilter, setNameFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [quantityFilter, setQuantityFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/product/getproducts');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setProducts(data.product);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilteredProducts = async () => {
        const query = new URLSearchParams({
            name: nameFilter,
            minPrice,
            maxPrice,
            quantity: quantityFilter,
            startDate,
            endDate,
        }).toString();

        try {
            const response = await fetch(`http://localhost:3000/product/getfilteredproducts?${query}`, {
                method: 'GET'
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchProducts(); 
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Product List</h2>
            <div className="filter-section mx-2 d-flex">
                <input 
                    className="form-control w-25"
                    type="text" 
                    placeholder="Product Name" 
                    value={nameFilter} 
                    onChange={(e) => setNameFilter(e.target.value)} 
                />
                <input 
                     className="form-control w-25"
                    type="number" 
                    placeholder="Min Price" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(e.target.value)} 
                />
                <input 
                     className="form-control w-25"
                    type="number" 
                    placeholder="Max Price" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(e.target.value)} 
                />
                <input 
                     className="form-control w-25"
                    type="text" 
                    placeholder="Quantity" 
                    value={quantityFilter} 
                    onChange={(e) => setQuantityFilter(e.target.value)} 
                />
                <input 
                     className="form-control w-25"
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                />
                <input 
                     className="form-control w-25"
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                />
                <button className="btn btn-primary" type="button" onClick={fetchFilteredProducts}>Filter</button>
            </div>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <div className="card my-4">
                                <div className="card-body">
                                    <h5>{product.product_name}</h5>
                                    <p>Quantity: {product.product_quantity}</p>
                                    <p>Price: {product.price}</p>
                                    <p>Created Date: {new Date(product.created_date).toLocaleDateString()}</p>
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
