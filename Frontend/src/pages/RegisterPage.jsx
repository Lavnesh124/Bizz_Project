import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [BusinessName, setbusinessName] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [gstNumber, setgstNumber] = useState('');


  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    gstNumber: "",
    mobileNumber: "",
    email: "",
    password: "",
    BusinessName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      gstNumber: gstNumber,
      mobileNumber: mobileNumber,
      BusinessName: BusinessName,
      password: password,
      email: email,
    }
    console.log(newUser);
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/`, newUser);
    console.log(response.status);

    if (response.status == 201) {
      const data = response.data
      console.log(data);
      localStorage.setItem('token', data.token)
      navigate('/overview')
    }

    setEmail('');
    setFormData('');
    setPassword('');
    setbusinessName('');
    setgstNumber('');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 w-full">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register
        </h2>
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={BusinessName}
            onChange={(e) => {
              setbusinessName(e.target.value)
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gst"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            GST Number
          </label>
          <input
            type="text"
            id="gst"
            name="gstNumber"
            value={gstNumber}
            onChange={(e) => {
              setgstNumber(e.target.value)
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => {
              setmobileNumber(e.target.value)
            }}
            pattern="[0-9]{10}"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Register
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/"
            className="text-blue-500 hover:underline"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
