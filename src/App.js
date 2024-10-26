import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListUserPage from './pages/ListUserPage';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import Products from './pages/Products';

function App() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">User Management</h1>

      <Router>
        <nav className="mb-4">
          <Link to="/users" className="btn btn-outline-primary me-2">Ok Users</Link>
          <Link to="/users/create" className="btn btn-outline-success me-2">Create User</Link>
          <Link to="/products" className="btn btn-outline-secondary">Products</Link> 
        </nav>

        <Routes>
          <Route path="/users" element={<ListUserPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users/edit/:id" element={<EditUserPage />} />
          <Route path="/products" element={<Products />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
