import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
    const res = await axios.post('http://localhost:5000/api/auth/register', 
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
    console.log('Full error:', err.response);  
    alert(err.response?.data?.message || 'Failed');
  } finally {
    setLoading(false);  
  }
};

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="name" placeholder="Full Name" 
          value={formData.name} onChange={handleChange} 
          required style={{width: '100%', padding: '12px', margin: '8px 0'}}
        />
        <input 
          name="email" type="email" placeholder="Email" 
          value={formData.email} onChange={handleChange} 
          required style={{width: '100%', padding: '12px', margin: '8px 0'}}
        />
        <input 
          name="password" type="password" placeholder="Password" 
          value={formData.password} onChange={handleChange} 
          required style={{width: '100%', padding: '12px', margin: '8px 0'}}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{width: '100%', padding: '12px', background: loading ? '#ccc' : '#28a745', color: 'white', border: 'none'}}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
      <p style={{textAlign: 'center', marginTop: '20px'}}>
        Already have account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
