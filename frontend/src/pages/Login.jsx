import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (user) {
            navigate(`/${redirect}`);
        }
    }, [navigate, user, redirect]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form onSubmit={submitHandler} style={{ marginTop: '1rem' }}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Sign In</button>
            </form>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
                New Customer? <Link to={`/register?redirect=${redirect}`} style={{ color: '#f97316' }}>Register</Link>
            </p>
        </div>
    );
};

export default Login;
