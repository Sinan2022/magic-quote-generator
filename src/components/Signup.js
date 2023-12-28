


import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from './features/users/usersSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const storage = getStorage(app);


function UserForm({ isEditMode = false, userData = null }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const defaultFormData = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    gender: '',
    profilePicture: ''
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (isEditMode && userData) {
      setFormData({
        ...userData.user,
        profilePicture: null
      });
    }
  }, [isEditMode, userData]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'profilePicture' ? files[0] : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    if (isEditMode) {
      dispatch(editUser(formData));
    } else {
      dispatch(addUser(formData));
    }

    navigate('/login')

  };

  const uploadFileAndGetUrl = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handlePictureChange = async (event) => {
    const receiptUrl = await uploadFileAndGetUrl(event.target.files[0]);
    setFormData(prevState => ({
      ...prevState,
      profilePicture: receiptUrl
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-center mb-4">{isEditMode ? 'Edit Profile' : 'Sign Up'}</h1>
          <Form onSubmit={handleSubmit}>
            {/* First Name */}
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Username */}
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

            {/* Email */}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={isEditMode}
                disabled={isEditMode}
              />
            </Form.Group>

            {/* Password */}
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

            {/* Gender */}
            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Gender select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            {/* Profile Picture */}
            <Form.Group controlId="formProfilePicture" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                onChange={handlePictureChange}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {isEditMode ? 'Update' : 'Submit'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserForm;
