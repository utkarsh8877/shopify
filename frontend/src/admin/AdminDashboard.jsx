import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        const fetchStats = async () => {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/analytics', config);
            setStats(data);
        };
        fetchStats();
    }, [user, navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ background: '#27272a', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Users</h3>
                    <p style={{ fontSize: '2rem', color: '#f97316' }}>{stats.usersCount}</p>
                </div>
                <div style={{ background: '#27272a', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Products</h3>
                    <p style={{ fontSize: '2rem', color: '#f97316' }}>{stats.productsCount}</p>
                </div>
                <div style={{ background: '#27272a', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Orders</h3>
                    <p style={{ fontSize: '2rem', color: '#f97316' }}>{stats.ordersCount}</p>
                </div>
                <div style={{ background: '#27272a', padding: '1.5rem', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>Revenue</h3>
                    <p style={{ fontSize: '2rem', color: '#f97316' }}>${stats.totalRevenue?.toFixed(2)}</p>
                </div>
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                <Link to="/admin/products" className="btn">Manage Products</Link>
                <Link to="/admin/orders" className="btn">Manage Orders</Link>
                <Link to="/admin/users" className="btn">Manage Users</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
