import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../lib/axios";
import toast from "react-hot-toast";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(3, "First name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Only alphabets are allowed"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(3, "Last name must be at least 3 characters")
    .regex(/^[A-Za-z]+$/, "Only alphabets are allowed"),

  email: z
    .string()
    .min(1, "Email is required")
    .pipe(z.email("Please enter a valid email address")),

  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    ),
  termAndCondition: z
    .boolean()
    .refine((val) => val === true, "Please accept the terms and conditions"),
});

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termAndCondition: boolean;
}

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    try {
      setLoading(true);
      await api.post("/auth/register", data);
      toast.success("Registration successful!");
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center ">
      <div className=" card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Register</h2>

          {/* form */}
          <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* full name */}
            <div className=" flex gap-4">
              {/* first name */}
              <div>
                <label htmlFor="firstName" className="label">
                  <span className="label-text">First name</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  className="input input-bordered w-full"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p role="alert" className="text-error text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* last name */}
              <div>
                <label htmlFor="lastName" className="label">
                  <span className="label-text">Last name</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="input input-bordered w-full"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p role="alert" className="text-error text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            {/* email */}
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="input input-bordered w-full"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* password */}
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register("password")}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* term and condition */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="termAndCondition"
                className="flex items-center gap-2"
              >
                <input
                  id="termAndCondition"
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  {...register("termAndCondition")}
                />
                <span>Term and condition</span>
              </label>
            </div>
            {errors.termAndCondition && (
              <p className="text-error text-sm mt-1">
                {errors.termAndCondition?.message}
              </p>
            )}
            {/* submit button */}
            <button
              type="submit"
              className="btn btn-primary w-full disabled:pointer-events-auto disabled:cursor-not-allowed"
              disabled={loading}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
