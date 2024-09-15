import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListUserPage = () => {
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/users`, { params: { role } })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, [role]);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2 className="mb-4">User List</h2>
      <div className="mb-3">
        <select className="form-select w-25" onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/users/edit/${user.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserPage;
