import { Container, Button, Badge } from "react-bootstrap";
import axiosInstance from "../config/axios";
import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const Home = () => {
  const token = localStorage.getItem("authtoken");
  const [UserData, setUserData] = useState(null);
  const navigate = useNavigate();

  const getUserData = useCallback(async () => {
    const {
      data: { name, email },
    } = await axiosInstance.get("/home");

    setUserData(() => ({ name, email }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (token) await getUserData();
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.response.data,
        });

        delete axiosInstance.defaults.headers.common.authtoken;
        localStorage.clear();

        navigate("/login");
      }
    })();
  }, []);

  if (!token) return <Navigate to={"/"} />;

  return (
    <>
      <Container>
        <h1>Welcome Page</h1>
        <p>we are here to serve you</p>
        {UserData ? (
          <>
            <br />
            <p>
              <Badge bg="secondary">{UserData?.name}</Badge>
            </p>
            <br />
            <p>
              <Badge bg="secondary">{UserData?.email}</Badge>
            </p>
          </>
        ) : (
          "Loading User Details"
        )}
        <Button
          style={{ display: "block", width: "100%", margin: "0px auto" }}
          variant="primary"
        >
          Get Started
        </Button>
      </Container>
    </>
  );
};
