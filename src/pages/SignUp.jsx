import React, { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../components/Toast";
import axiosInstance from "../config/axios";

export const SignUp = () => {
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((pre) => ({ ...pre, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await axiosInstance.post("/signup/verify", {
        ...formData,
      });

      if (data) {
        Toast.fire({
          icon: "info",
          title: data,
        });
      }
      navigate("/login");
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.response.data,
      });
    }
  }
  useEffect(() => {
    if (token) navigate("/home");
  }, []);
  return (
    <>
      <Container>
        <h1>Registration Form</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <p>
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </Form>
      </Container>
    </>
  );
};
