import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Signup({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('buyer');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find((u) => u.email === email)) {
      alert('User already exists');
      return;
    }

    const newUser = { email, password, type };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    navigate('/home');
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Sign Up</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select onChange={(e) => setType(e.target.value)}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleSignup} className="w-100">
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
