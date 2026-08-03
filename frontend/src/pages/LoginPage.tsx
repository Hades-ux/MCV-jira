import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hook/auth/useLogin";
import { useNavigate } from "react-router";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").pipe(z.email()),
  password: z.string().min(1, "Paswword is required"),
});

interface LoginInput {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate()
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    login(data, {
      onSuccess: () => {
        setTimeout(() => {
          navigate("/me");
        }, 500);
      },
    });
  };

  return (
    <div className=" min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form
            className=" flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* email */}
            <div>
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                className="input input-bordered w-full"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              className="btn btn-primary w-full disabled:pointer-events-auto disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
