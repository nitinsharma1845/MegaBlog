import { useState } from "react";
import { Button, button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appWrite/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

const Signup = () => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  async function signUp(data) {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();

        if (currentUser) {
          dispatch(login(userData));
          nevigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signUp)}>
          <div className="space-y-5">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter Your Full Name"
              {...register("name", { required: true })}
            />

            <Input
              type="email"
              label="Email"
              placeholder="Enter Your Email"
              {...register("email", { required: true })}
            />

            <Input
              type="password"
              label="Pasword"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <Button type="button" clasName="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
