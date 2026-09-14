import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        const fetchOrders = async () => {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/orders', config);
            setOrders(data);
        };
        fetchOrders();
    }, [user, navigate]);

    return (
        <div>
            <h1>Orders</h1>
            <table style={{ width: '100%', marginTop: '2rem', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #3f3f46' }}>
                        <th style={{ padding: '1rem' }}>ID</th>
                        <th>USER</th>
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
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>${order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid ? 'Yes' : 'No'}</td>
                            <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
