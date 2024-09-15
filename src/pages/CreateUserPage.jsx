import { useState } from 'react';
import axios from 'axios';

const CreateUserPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('BUYER');

  const createUser = () => {
    axios.post(`http://localhost:3000/users`, { name, email, role })
      .then(() => window.location.href = '/users')
      .catch((err) => console.error(err));
  };

  return (
    <div className="container">
      <h2 className="mb-4">Create User</h2>
      <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="BUYER">Buyer</option>
            <option value="SELLER">Seller</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
