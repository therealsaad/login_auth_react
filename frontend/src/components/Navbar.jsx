import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '15px 30px',
      background: '#333',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>
        MERN Auth
      </Link>
      
      <div>
        {!user ? (
          <>
            <Link to="/register" style={{ color: 'white', marginRight: '15px' }}>
              Register
            </Link>
            <Link to="/login" style={{ color: 'white' }}>
              Login
            </Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: '15px' }}>👋 {user.name}</span>
            <button onClick={handleLogout} style={{
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
