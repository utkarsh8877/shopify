import { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    const { cartItems } = useSelector(state => state.cart);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

    const placeOrderHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country },
                paymentMethod: 'Razorpay',
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            }, config);

            // In a real app we'd initiate Razorpay payment here.
            // For now, we'll assume success.
            dispatch(clearCart());
            navigate('/ordersuccess');
        } catch (error) {
            toast.error('Order failed');
        }
    };

    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Checkout</h2>
            <div className="auth-container" style={{ margin: '2rem 0' }}>
                <h3>Shipping Address</h3>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label>Address</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
                </div>
            </div>
            <div className="auth-container">
                <h3>Order Summary</h3>
                <div style={{ marginTop: '1rem' }}>
                    <p>Items: ${itemsPrice.toFixed(2)}</p>
                    <p>Shipping: ${shippingPrice.toFixed(2)}</p>
                    <p>Tax: ${taxPrice.toFixed(2)}</p>
                    <h3 style={{ margin: '1rem 0' }}>Total: ${totalPrice}</h3>
                    <button className="btn" style={{ width: '100%' }} onClick={placeOrderHandler}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
