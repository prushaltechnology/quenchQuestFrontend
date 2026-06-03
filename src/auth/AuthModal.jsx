import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Tabs,
  message,
  Select,
} from "antd";

import {
  loginUser,
  registerUser,
  verifyOtp,
} from "../api/authApi";

// import { setUserData } from "../utils/auth"; // ✅ ADD THIS

const AuthModal = ({ open, onClose, setUser }) => {
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [forgotForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  const [showForgot, setShowForgot] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // ================= LOGIN =================
 // Function runs when user clicks Login button
const handleLogin = async (values) => {

  try {

    // Send email and password to backend API
    const response = await loginUser(values);

    // Print complete response in browser console
    console.log("FULL LOGIN RESPONSE:", response.data);

    // Show popup with response data
    // alert(JSON.stringify(response.data, null, 2));

    // Get user object from backend response
    // Example:
    // {
    //   id: 73,
    //   name: "Vishal",
    //   email: "...",
    //   phone: "...",
    //   ...
    // }
    const user = response.data.user;

    // Save user object in browser localStorage
    // JSON.stringify converts JavaScript object into text
    localStorage.setItem("user", JSON.stringify(user));

    // Update React state in Navbar/App
    // So UI immediately changes from Login button to Profile button
    setUser(user);

    // Show success message on screen
    message.success(
      response?.data?.message || "Login successful"
    );

    // Close Login Modal
    onClose();

  } catch (error) {

    // Print error in browser console
    console.error("LOGIN ERROR:", error);

    // Show error message on screen
    message.error(
      error?.response?.data?.message ||
      error.message ||
      "Login failed"
    );
  }
};

  // ================= REGISTER =================
  const handleRegister = async (values) => {
    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        location: values.location,
        skills: values.skills,
        availability: values.availability,
      };

      const response = await registerUser(payload);

      setUserEmail(values.email);
      setShowOtp(true);

      message.success(
        response?.data?.message || "OTP Sent Successfully"
      );
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    }
  };

  // ================= VERIFY OTP =================
  const handleVerifyOtp = async (values) => {
    try {
      const payload = {
        email: userEmail,
        otp: values.otp,
      };

      const response = await verifyOtp(payload);

      message.success(
        response.data?.message || "OTP Verified Successfully"
      );

      otpForm.resetFields();
      registerForm.resetFields();

      setShowOtp(false);
      onClose();
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
        "OTP Verification Failed"
      );
    }
  };

  // ================= FORGOT PASSWORD =================
  const handleForgotPassword = () => {
    message.success("Password reset link sent to your email");
    setShowForgot(false);
  };

  return (
    <Modal
      title="Welcome to Quench Quest"
      open={open}
      footer={null}
      centered
      onCancel={() => {
        setShowForgot(false);
        setShowOtp(false);
        onClose();
      }}
    >
      {showOtp ? (
        <>
          <h3>Verify OTP</h3>

          <p>
            OTP sent to <b>{userEmail}</b>
          </p>

          <Form form={otpForm} onFinish={handleVerifyOtp}>
            <Form.Item
              name="otp"
              rules={[{ required: true, message: "Enter OTP" }]}
            >
              <Input placeholder="Enter OTP" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Verify OTP
            </Button>
          </Form>
        </>
      ) : showForgot ? (
        <>
          <h3>Forgot Password</h3>

          <Form form={forgotForm} onFinish={handleForgotPassword}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block>
              Send Reset Link
            </Button>

            <Button type="link" block onClick={() => setShowForgot(false)}>
              Back to Login
            </Button>
          </Form>
        </>
      ) : (
        <Tabs
          items={[
            {
              key: "1",
              label: "Login",
              children: (
                <Form form={loginForm} onFinish={handleLogin}>
                  <Form.Item
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Login
                  </Button>
                </Form>
              ),
            },

            {
              key: "2",
              label: "Register",
              children: (
                <Form form={registerForm} onFinish={handleRegister}>
                  <Form.Item name="name" rules={[{ required: true }]}>
                    <Input placeholder="Name" />
                  </Form.Item>

                  <Form.Item name="email" rules={[{ required: true }]}>
                    <Input placeholder="Email" />
                  </Form.Item>

                  <Form.Item name="phone" rules={[{ required: true }]}>
                    <Input placeholder="Phone" />
                  </Form.Item>

                  <Form.Item name="location" rules={[{ required: true }]}>
                    <Input placeholder="Location" />
                  </Form.Item>

                  <Form.Item name="skills" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Skills" />
                  </Form.Item>

                  <Form.Item name="availability" rules={[{ required: true }]}>
                    <Select placeholder="Availability">
                      <Select.Option value="Weekdays">Weekdays</Select.Option>
                      <Select.Option value="Weekends">Weekends</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Button type="primary" htmlType="submit" block>
                    Register
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      )}
    </Modal>
  );
};

export default AuthModal;