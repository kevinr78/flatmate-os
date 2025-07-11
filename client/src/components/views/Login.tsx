import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/api/auth";
import { LoginForm, LoginResponse } from "../utils/types";
const Login = () => {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = (await login(form)) as { data: LoginResponse };
      const { accessToken, refreshToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/home/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="card bg-base-100 shadow-md p-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full mt-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
