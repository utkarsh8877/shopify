import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchOrders = async () => {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const { data } = await axios.get('/api/orders/myorders', config);
            setOrders(data);
        };
        fetchOrders();
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div>
            <h2>User Profile</h2>
            <div style={{ marginTop: '2rem', background: '#27272a', padding: '2rem', borderRadius: '8px' }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
            
            <h3 style={{ marginTop: '2rem' }}>My Orders</h3>
            <div style={{ marginTop: '1rem' }}>
                {orders.length === 0 ? <p>No orders found.</p> : (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #3f3f46' }}>
                                <th style={{ padding: '1rem' }}>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #3f3f46' }}>
                                    <td style={{ padding: '1rem' }}>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                    <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Profile;
