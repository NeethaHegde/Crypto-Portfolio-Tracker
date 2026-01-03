import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use full URL or setup proxy. Assuming localhost:5000 from server task
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card p-5" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img src="/src/assets/logo.png" alt="Logo" style={{ height: '80px', marginBottom: '1rem' }} />
          <h2 className="text-gradient">Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control glass-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control glass-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control glass-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-web3 w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <small>Already have an account? <Link to="/login" className="text-decoration-none" style={{ color: '#c084fc' }}>Login</Link></small>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;