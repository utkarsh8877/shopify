import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <h1 style={{ color: '#22c55e', marginBottom: '1rem' }}>Order Placed Successfully!</h1>
            <p style={{ marginBottom: '2rem' }}>Thank you for your purchase.</p>
            <Link to="/shop" className="btn">Continue Shopping</Link>
        </div>
    );
};

export default OrderSuccess;
