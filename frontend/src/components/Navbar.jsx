import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import AuthContext from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Settings } from 'lucide-react';
import '../styles/navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">Shopify</Link>
            <div className="nav-links">
                <Link to="/shop">Shop</Link>
                <Link to="/cart">
                    <ShoppingCart size={20} />
                    <span>({cartItems.length})</span>
                </Link>
                {user ? (
                    <>
                        <Link to="/profile"><User size={20} /> {user.name}</Link>
                        {user.isAdmin && <Link to="/admin"><Settings size={20} /> Admin</Link>}
                        <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="btn">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
