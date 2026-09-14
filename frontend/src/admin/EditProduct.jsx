import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditProduct = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setName(data.name);
            setPrice(data.price);
            setImage(data.image);
            setBrand(data.brand);
            setCategory(data.category);
            setCountInStock(data.countInStock);
            setDescription(data.description);
        };
        fetchProduct();
    }, [id, user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.put(`/api/products/${id}`, {
                name, price, image, brand, category, countInStock, description
            }, config);
            toast.success('Product updated');
            navigate('/admin/products');
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Link to="/admin/products" className="btn btn-secondary" style={{ marginBottom: '1rem', display: 'inline-block' }}>Go Back</Link>
            <h2>Edit Product</h2>
            <div className="auth-container" style={{ margin: '2rem 0' }}>
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Count In Stock</label>
                        <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }}>Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
