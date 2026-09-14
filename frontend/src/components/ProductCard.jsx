import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
                <Link to={`/product/${product._id}`}>
                    <h3 className="product-title">{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span>⭐ {product.rating}</span>
                    <span style={{ color: '#a1a1aa' }}>({product.numReviews} reviews)</span>
                </div>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <Link to={`/product/${product._id}`} className="btn" style={{ textAlign: 'center', marginTop: 'auto' }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
