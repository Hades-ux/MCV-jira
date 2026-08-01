import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termAndCondition: boolean;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      
      await api.post("/auth/register",(data))
      toast.success("Registration successful!");
      
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error)
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
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets are allowed",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.firstName && (
                  <p role="alert" className="text-error text-sm mt-1">{errors.firstName.message}</p>
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
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name must be at least 3 charaters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Only alphabets are allowed",
                    },
                  })}
                  className="input input-bordered w-full"
                />
                {errors.lastName && (
                  <p role="alert" className="text-error text-sm mt-1">{errors.lastName.message}</p>
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
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
                {...register("password", {
                  required: "Password is  required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* term and condition
            <div className="flex items-center justify-between">
              <label
                htmlFor="termAndCondition"
                className="flex items-center gap-2"
              >
                <input
                  id="termAndCondition"
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  {...register("termAndCondition", {
                    required: "Please accept the terms and conditions",
                  })}
                />
                <span>Term and condition</span>
              </label>
            </div>
            {errors.termAndCondition && (
                <p className="text-error text-sm mt-1">{errors.termAndCondition?.message}</p>
              )} */}

            {/* submit button */}
            <button 
            type="submit"
            className="btn btn-primary w-full">
              Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;