// import React from 'react';
import React, { useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import Form from "react-bootstrap/Form";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import AuthService from "./services/auth.service";
import userService from "./services/user.service";
import Button from "react-bootstrap/Button";
// import { navigate } from "@storybook/addon-links";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  let [authMode, setAuthMode] = useState("signup");
  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [contact_name, setContactName] = useState("");
  const [phone_number, setPhoneNunmer] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  const navigate = useNavigate();
  function handleSignupSubmit() {
    axios
      .post("https://java-api.codeboxxtest.xyz/customers/new", {
        email: "1",
        password: "2",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSubmit(event) {
    if (email === "customer1@business.com" && password === "password123") {
      AuthService.login(email, password);
      userService.getUserBoard();
      console.log("Login successfully!");
      // sessiontoken(email,password)
      navigate("/");
    } else {
      console.log("Invaild Credentials");
    }
    event.preventDefault();
  }
  function sessiontoken(email, password) {
    axios
      .request(
        "https://java-api.codeboxxtest.xyz/authenticate?email=customer1%40business.com&password=password123"
      )
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
  }
  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <Form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Haven't Registered?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign up
              </span>
            </div>
            <Form.Group size="lg" className="form-group mt-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              size="lg"
              className="form-group mt-3"
              controlId="password"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control mt-1"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2 mt-3">
              <Button
                block
                size="lg"
                type="submit"
                disabled={!validateForm()}
                className="btn btn-primary"
              >
                Login
              </Button>{" "}
            </div>
          </div>
          {/* <p className="forgot-password text-right mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
        </Form>
      </div>
    );
  }
  return (
    <div className="Auth-form-container">
      <Form className="Auth-form" onSubmit={handleSignupSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>

          <Form.Group
            size="lg"
            className="form-group mt-3"
            controlId="company_name"
          >
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              className="form-control mt-1"
              placeholder="Enter Company Name"
              value={company_name}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            size="lg"
            className="form-group mt-3"
            controlId="contact_name"
          >
            <Form.Label>Contact Name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              className="form-control mt-1"
              placeholder="Enter Contact Name"
              value={contact_name}
              onChange={(e) => setContactName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            size="lg"
            className="form-group mt-3"
            controlId="phone_number"
          >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              className="form-control mt-1"
              placeholder="Enter Phone Number"
              value={phone_number}
              onChange={(e) => setPhoneNunmer(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            size="lg"
            className="form-group mt-3"
            controlId="company_description"
          >
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              className="form-control mt-1"
              placeholder="Enter Company Description"
            />
          </Form.Group>
          <Form.Group size="lg" className="form-group mt-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              className="form-control mt-1"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            size="lg"
            className="form-group mt-3"
            controlId="password"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control mt-1"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-3">
            <Button
              block
              size="lg"
              type="submit"
              disabled={!validateForm()}
              className="btn btn-primary"
            >
              register
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
