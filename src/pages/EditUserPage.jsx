import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const updateUser = () => {
    axios.patch(`http://localhost:3000/users/${id}`, user)
      .then(() => window.location.href = '/users')
      .catch((err) => console.error(err));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2 className="mb-4">Edit User</h2>
      <form onSubmit={(e) => { e.preventDefault(); updateUser(); }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditUserPage;
