import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, // ... because it copies existing data
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // it prevents refresh,, the app doesn't resets

    try {
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md p-6 border rounded-lg shadow">
            <h1 className="text-3xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-3"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full border p-2"
        >
          Register
        </button>

        <p className="mt-4">
          Already have an account?
          <Link
            to="/"
            className="ml-2 underline"
          >
            Login
          </Link>
        </p>
        </form>
    </div>
  );
}

export default Register;
