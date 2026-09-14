import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Trash2 } from 'lucide-react';
import '../styles/cart.css';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate('/login?redirect=checkout');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div style={{ marginTop: '2rem' }}>
                    Your cart is empty. <Link to="/shop" style={{ color: '#f97316' }}>Go back to shop.</Link>
                </div>
            ) : (
                <div className="cart-container" style={{ marginTop: '2rem' }}>
                    <div>
                        {cartItems.map(item => (
                            <div key={item.product} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <Link to={`/product/${item.product}`} style={{ flex: 1 }}>{item.name}</Link>
                                <span>${item.price}</span>
                                <select 
                                    value={item.qty} 
                                    onChange={(e) => dispatch(addToCart({...item, qty: Number(e.target.value)}))}
                                    style={{ width: 'auto', marginTop: 0 }}
                                >
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                                <button className="btn btn-secondary" onClick={() => dispatch(removeFromCart(item.product))}>
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </p>
                        <button className="btn" style={{ width: '100%' }} onClick={checkoutHandler}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
