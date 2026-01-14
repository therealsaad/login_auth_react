import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  if (!formData.name?.trim() || !formData.email?.trim() || !formData.password?.trim()) {
    alert('Fill all fields!');
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', 
      JSON.stringify(formData),  
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    alert('Success! ' + res.data.message);
    navigate('/login');
  } catch (err) {
    console.log('Full error:', err.response);  // Debug
    alert(err.response?.data?.message || 'Failed');
  } finally {
    setLoading(false);  // Always reset
  }
};


  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Login</h2>
      <form onSubmit={handleSubmit}>
         <input 
          name="name" placeholder="Full Name" 
          value={formData.name} onChange={handleChange} 
          required style={{width: '100%', padding: '12px', margin: '8px 0'}}
        />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{width: '100%', padding: '12px', margin: '8px 0'}} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={{width: '100%', padding: '12px', margin: '8px 0'}} />
        <button type="submit" disabled={loading} style={{width: '100%', padding: '12px', background: loading ? '#ccc' : '#007bff', color: 'white', border: 'none'}}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '20px'}}>
        No account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}

export default Login;
