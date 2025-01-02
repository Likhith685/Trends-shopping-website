import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ settoken }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onsubmithandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        settoken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg max-w-md px-8 py-6 ">
        <h1 className="text-2xl font-bold mb-5 w-full text-center">
          Admin Panel
        </h1>
        <form onSubmit={onsubmithandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              className="rounded-md  w-full px-3 py-2 border border-gray-300 outline-none "
              type="email"
              placeholder="your@gmail.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              className="rounded-md  w-full px-3 py-2 border border-gray-300 outline-none "
              type="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button
            className="w-full mt-3 bg-black text-white px-4 py-2 text-2xl"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
