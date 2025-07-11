import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../utils/api/auth.ts";
import { type SignupForm, type SignupResponse } from "../utils/types.ts";

const Signup = () => {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = (await signup(form)) as { data: SignupResponse };
      const { accessToken, refreshToken } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/home");
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="card bg-base-100 shadow-md p-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-3"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
