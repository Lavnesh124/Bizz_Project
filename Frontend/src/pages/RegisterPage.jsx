import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setbusinessName] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [gstNumber, setgstNumber] = useState('');


  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    gstNumber: "",
    mobileNumber: "",
    email: "",
    password: "",
    businessName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      gstNumber: gstNumber,
      mobileNumber: mobileNumber,
      businessName: businessName,
      password: password,
      email: email,
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/`, newUser);

    if (response.status == 201) {
      const data = response.data
      console.log(data);
      // localStorage.setItem('token', data.token)
      navigate('/')
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
            value={formData.businessName}
            onChange={handleChange}
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
            value={formData.gstNumber}
            onChange={handleChange}
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
            value={formData.mobileNumber}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
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
            value={formData.password}
            onChange={handleChange}
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
            href="/signin"
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
