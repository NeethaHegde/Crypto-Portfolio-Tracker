import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import PortfolioChart from '../components/PortfolioChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [newAsset, setNewAsset] = useState({ coin: '', amount: '', buyPrice: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
    } else {
      setUser(userData);
      fetchAssets(userData.token);
    }
  }, [navigate]);

  const fetchAssets = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.get('http://localhost:5000/api/assets', config);
      setAssets(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch assets');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const addAsset = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingId) {
        // Update Logic
        const res = await axios.put(`http://localhost:5000/api/assets/${editingId}`, newAsset, config);
        setAssets(assets.map(a => a._id === editingId ? res.data : a));
        setEditingId(null);
        toast.success('Asset updated successfully!');
      } else {
        // Create Logic
        const res = await axios.post('http://localhost:5000/api/assets', newAsset, config);
        setAssets([...assets, res.data]);
        toast.success(`Added ${newAsset.coin} to portfolio!`);
      }
      setNewAsset({ coin: '', amount: '', buyPrice: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to save asset';
      toast.error(msg);
    }
  };

  const deleteAsset = async (id) => {
    if (!window.confirm('Remove this asset?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`http://localhost:5000/api/assets/${id}`, config);
      setAssets(assets.filter((a) => a._id !== id));
      toast.success('Asset removed');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete asset');
    }
  };

  const startEdit = (asset) => {
    setNewAsset({ coin: asset.coin, amount: asset.amount, buyPrice: asset.buyPrice });
    setEditingId(asset._id);
    toast('Editing ' + asset.coin, { icon: '✏️' });
  };

  const cancelEdit = () => {
    setNewAsset({ coin: '', amount: '', buyPrice: '' });
    setEditingId(null);
  }

  const filteredAssets = assets.filter((a) =>
    a.coin.toLowerCase().includes(search.toLowerCase())
  );

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  const calculateTotalValue = () => {
    const total = assets.reduce((acc, curr) => acc + (curr.amount * curr.buyPrice), 0);
    return formatMoney(total);
  };

  if (!user) return null;

  return (
    <div className="container-fluid min-vh-100 p-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <img src="/src/assets/logo.png" alt="Logo" style={{ height: '50px' }} />
              <div>
                <h2 className="text-gradient mb-0">Portfolio Tracker</h2>
                <h5 className="text-white mt-1">Total Value: {calculateTotalValue()}</h5>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <span className="text-white">Hello, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Logout</button>
            </div>
          </div>

          <div className="row g-4">
            {/* Chart Section */}
            <div className="col-12 mb-2">
              <div className="glass-card p-4">
                <div className="row align-items-center">
                  <div className="col-md-6 text-center text-md-start">
                    <h4 className="mb-1">Portfolio Distribution</h4>
                    <p className="text-white-50 mb-0">Visual breakdown of your assets</p>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <div style={{ width: '100%', maxWidth: '350px' }}>
                      <PortfolioChart assets={assets} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add/Edit Asset Form */}
            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <h4 className="mb-3">{editingId ? 'Edit Asset' : 'Add New Asset'}</h4>
                <form onSubmit={addAsset}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Coin Symbol (e.g. BTC)"
                      className="form-control glass-input"
                      value={newAsset.coin}
                      onChange={(e) => setNewAsset({ ...newAsset, coin: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Amount Owned"
                      className="form-control glass-input"
                      value={newAsset.amount}
                      onChange={(e) => setNewAsset({ ...newAsset, amount: e.target.value })}
                      required
                      step="any"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      placeholder="Avg Buy Price ($)"
                      className="form-control glass-input"
                      value={newAsset.buyPrice}
                      onChange={(e) => setNewAsset({ ...newAsset, buyPrice: e.target.value })}
                      required
                      step="any"
                    />
                  </div>
                  <button type="submit" className="btn btn-web3 w-100 mb-2">
                    {editingId ? 'Update Asset' : 'Add to Portfolio'}
                  </button>
                  {editingId && (
                    <button type="button" onClick={cancelEdit} className="btn btn-outline-light w-100">Cancel</button>
                  )}
                </form>
              </div>
            </div>

            {/* Assets List */}
            <div className="col-md-8">
              <div className="glass-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4>Your Assets</h4>
                  <input
                    type="text"
                    placeholder="Search coins..."
                    className="form-control glass-input"
                    style={{ width: '250px' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="table-responsive">
                  <table className="table table-dark table-hover" style={{ background: 'transparent' }}>
                    <thead>
                      <tr>
                        <th style={{ background: 'transparent' }}>Coin</th>
                        <th style={{ background: 'transparent' }}>Amount</th>
                        <th style={{ background: 'transparent' }}>Avg Price</th>
                        <th style={{ background: 'transparent' }}>Total Value</th>
                        <th style={{ background: 'transparent' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map((asset) => (
                        <tr key={asset._id}>
                          <td style={{ background: 'transparent' }} className="fw-bold fs-5">{asset.coin.toUpperCase()}</td>
                          <td style={{ background: 'transparent' }}>{asset.amount}</td>
                          <td style={{ background: 'transparent' }}>{formatMoney(asset.buyPrice)}</td>
                          <td style={{ background: 'transparent' }} className="text-success fw-bold">
                            {formatMoney(asset.amount * asset.buyPrice)}
                          </td>
                          <td style={{ background: 'transparent' }}>
                            <button
                              onClick={() => startEdit(asset)}
                              className="btn btn-sm btn-outline-warning me-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => deleteAsset(asset._id)}
                              className="btn btn-sm btn-outline-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {filteredAssets.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center text-muted" style={{ background: 'transparent' }}>
                            No assets found. Start building your portfolio!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;