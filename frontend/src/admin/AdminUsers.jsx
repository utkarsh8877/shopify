import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        const fetchUsers = async () => {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
        };
        fetchUsers();
    }, [user, navigate]);

    return (
        <div>
            <h1>Users</h1>
            <table style={{ width: '100%', marginTop: '2rem', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #3f3f46' }}>
                        <th style={{ padding: '1rem' }}>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} style={{ borderBottom: '1px solid #3f3f46' }}>
                            <td style={{ padding: '1rem' }}>{u._id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.isAdmin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
