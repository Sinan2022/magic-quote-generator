import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from './features/auth/authSilce';
import { selectUsers } from './features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from './features/auth/authSilce';


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(selectAuth);
  const authError = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // const users = useSelector(selectUsers);

  const users = [
    {
      "firstName": "sinan",
      "lastName": "saleem",
      "username": "sinan",
      "email": "sinan@gmail.com",
      "password": "sinan",
      "gender": "Male",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/Screenshot%202023-12-20%20at%204.50.53%20PM.png?alt=media&token=80961ba9-83cc-4425-b6c6-c62c53cad6f1"
    },
    {
      "firstName": "umar",
      "lastName": "tariq",
      "username": "umar",
      "email": "umar@gmail.com",
      "password": "umar",
      "gender": "Female",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/Screenshot%202023-11-29%20at%208.11.21%20PM.png?alt=media&token=3b8b4f70-a075-4807-a56b-e5894c21fb7e"
    },
    {
      "firstName": "ali",
      "lastName": "ahmad",
      "username": "ali",
      "email": "ali@gmail.com",
      "password": "ali",
      "gender": "Other",
      "profilePicture": "https://firebasestorage.googleapis.com/v0/b/ngo-registration-75ae0.appspot.com/o/WhatsApp%20Image%202023-12-11%20at%2012.04.47%20AM.jpeg?alt=media&token=23387294-e84e-4a7a-b920-b9150d5869e9"
    }
  ]
  //

  useEffect(() => {
    console.log('Users updated:', users);
    if (isAuthenticated == true) {
      navigate('/home');
    }
  }, [users, isAuthenticated]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const findUser = (formData, users) => {
    const { username, password } = formData;
    const user = users.find(user => user.email === username && user.password === password);
    return user || false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userOrFalse = findUser(formData, users);
    if (userOrFalse) {
      dispatch(loginSuccess({ user: userOrFalse, email: formData.username, password: formData.password }));
    } else {
      dispatch(loginFailure({ error: 'Incorrect credentials' }));
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
            <Link className='link' to="/signup">
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </div>
            </Link>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
