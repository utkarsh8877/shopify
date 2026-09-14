import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Shopify. All rights reserved.</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <Link to="/about">About Us</Link>
                <Link to="/disclaimer">Disclaimer</Link>
                <Link to="/return">Return Policy</Link>
            </div>
        </footer>
    );
};

export default Footer;
