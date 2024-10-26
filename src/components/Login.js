import React, { useState } from 'react';
import { Container, Form, Button, Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import './Login.css';

function Login({ setUser }) {
  const [activeForm, setActiveForm] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState('buyer'); // for signup only

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      setUser(user);
      alert('Login successful');
    } else {
      alert('User not found or incorrect password');
    }
  };

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { email, password, accountType };

    if (users.some((u) => u.email === email)) {
      alert('User already exists');
    } else {
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Signup successful! Please login.');
      setActiveForm('login');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="auth-card p-4">
        <div className="text-center mb-4">
          <ToggleButtonGroup type="radio" name="auth-options" defaultValue="login" onChange={(val) => setActiveForm(val)}>
            <ToggleButton variant="outline-primary" value="login" active={activeForm === 'login'}>
              Login
            </ToggleButton>
            <ToggleButton variant="outline-secondary" value="signup" active={activeForm === 'signup'}>
              Signup
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {activeForm === 'login' && (
          <Form>
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin} className="w-100">
              Login
            </Button>
          </Form>
        )}

        {activeForm === 'signup' && (
          <Form>
            <h2 className="text-center mb-4">Signup</h2>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Control as="select" value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </Form.Control>
            </Form.Group>
            <Button variant="success" onClick={handleSignup} className="w-100">
              Signup
            </Button>
          </Form>
        )}
      </Card>
    </Container>
  );
}

export default Login;
