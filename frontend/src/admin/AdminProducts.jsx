import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/products/${id}`, config);
                fetchProducts();
                toast.success('Product deleted');
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post('/api/products', {}, config);
            navigate(`/admin/products/edit/${data._id}`);
        } catch (error) {
            toast.error('Failed to create product');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Products</h1>
                <button className="btn" onClick={createProductHandler}>Create Product</button>
            </div>
            <table style={{ width: '100%', marginTop: '2rem', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #3f3f46' }}>
                        <th style={{ padding: '1rem' }}>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id} style={{ borderBottom: '1px solid #3f3f46' }}>
                            <td style={{ padding: '1rem' }}>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <Link to={`/admin/products/edit/${product._id}`} style={{ marginRight: '1rem' }}>
                                    <Edit size={16} />
                                </Link>
                                <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} onClick={() => deleteHandler(product._id)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
