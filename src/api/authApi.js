import axios from "axios";

console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = (data) =>
  API.post("/auth/register/", data);

export const verifyOtp = (data) =>
  API.post("/auth/verify-otp/", data);

export const loginUser = (data) =>
  API.post("/auth/login/", data);

export const forgotPassword = (data) =>
  API.post("/auth/forgot-password/", data);

export const createVolunteer = (data) =>
  API.post("/auth/register/", data);

export const sendContactMessage = (data) =>
  API.post("/contact/", data);

export const resetPassword = (data) =>
  API.post("/auth/reset-password/", data);
