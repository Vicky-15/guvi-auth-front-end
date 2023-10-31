import React, { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../components/Toast";
import axiosInstance from "../config/axios";
export const Login = () => {
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
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
      const { data, status } = await axiosInstance.post("/login", {
        ...formData,
      });

      if (data) {
        if (status === 200) {
          Toast.fire({
            icon: "success",
            title: "logged in successfully",
          });

          localStorage.setItem("authtoken", data.token);
          axiosInstance.defaults.headers.common.authtoken = data.token;

          navigate("/home");
        }
      }
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
        <h1>Login Form</h1>
        <Form onSubmit={handleSubmit}>
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
            Login
          </Button>
          <p>
            Don`t have an account? <Link to={"/"}>Register</Link>
          </p>
        </Form>
      </Container>
    </>
  );
};
