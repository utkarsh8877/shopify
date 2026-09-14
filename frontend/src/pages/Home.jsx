import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data.slice(0, 4));
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className="product-grid" style={{ marginTop: '2rem' }}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;
