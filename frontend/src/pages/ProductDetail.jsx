import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data);
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: Number(qty)
        }));
        navigate('/cart');
    };

    if (!product.name) return <div>Loading...</div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div>
                <h1>{product.name}</h1>
                <p style={{ margin: '1rem 0', fontSize: '1.5rem', color: '#f97316' }}>${product.price}</p>
                <p style={{ marginBottom: '1rem' }}>{product.description}</p>
                
                <div style={{ padding: '1rem', background: '#27272a', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span>Status:</span>
                        <span>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</span>
                    </div>
                    {product.countInStock > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                            <span>Qty:</span>
                            <select value={qty} onChange={(e) => setQty(e.target.value)} style={{ width: 'auto', marginTop: 0 }}>
                                {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button 
                        className="btn" 
                        style={{ width: '100%' }} 
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
