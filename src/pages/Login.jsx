import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login(){
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const res = await api.post("/auth/login",formData);
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
        } catch(error){
            alert(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 border rounded-lg shadow"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

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
          Login
        </button>

        <p className="mt-4">
          Don't have an account?
          <Link
            to="/register"
            className="ml-2 underline"
          >
            Register
          </Link>
        </p>

      </form>

    </div>  
    );
}

export default Login;