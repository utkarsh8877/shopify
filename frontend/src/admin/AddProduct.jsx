// Created dynamically inside AdminProducts.jsx, no separate logic usually required
// We use the createProductHandler then redirect to EditProduct.
import { Navigate } from 'react-router-dom';
const AddProduct = () => <Navigate to="/admin/products" />;
export default AddProduct;
