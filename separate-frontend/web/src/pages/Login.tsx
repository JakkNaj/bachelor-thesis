import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore, EAuthStatus } from "../store/authStore";
import { usePostApiAuthLogin } from "../api/generated/auth/auth";
import { AuthResponse } from "../api/generated/schemas";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState, useEffect } from "react";

type TLoginFormData = {
	email: string;
	password: string;
};

const loginSchema = yup.object({
	email: yup.string().email("Invalid email format").required("Email is required"),
	password: yup.string().required("Password is required"),
});

export const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { setAuth, status } = useAuthStore();
	const [loginError, setLoginError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const searchParams = new URLSearchParams(window.location.search);
	const redirectPath = searchParams.get("redirect") || location.state?.from?.pathname || "/";

	useEffect(() => {
		if (status === EAuthStatus.AUTHENTICATED) {
			navigate(redirectPath, { replace: true });
		}
	}, [status, navigate, redirectPath]);

	const { mutate: login, isPending } = usePostApiAuthLogin({
		mutation: {
			onSuccess: (data: AuthResponse) => {
				if (data.token && data.user) {
					setAuth(data.token, data.user);
					navigate(redirectPath, { replace: true });
				}
			},
			onError: () => {
				setLoginError("Invalid email or password. Please try again.");
				setIsSubmitting(false);
			},
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TLoginFormData>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = (data: TLoginFormData) => {
		setLoginError(null);
		setIsSubmitting(true);
		login({ data });
	};

	return (
		<div className="h-full flex items-center justify-center bg-slate-50 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
				<div>
					<h1 className="text-2xl font-semibold text-slate-900 text-center">Welcome back</h1>
					<p className="mt-2 text-sm text-slate-600 text-center">Please sign in to your account</p>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(onSubmit)(e);
					}}
					className="space-y-2 flex flex-col"
				>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-slate-700 mt-1">
							Email
						</label>
						<Input
							id="email"
							type="email"
							{...register("email")}
							error={errors.email?.message}
							placeholder="Enter your email"
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
							Password
						</label>
						<Input
							id="password"
							type="password"
							{...register("password")}
							error={errors.password?.message}
							placeholder="Enter your password"
						/>
					</div>

					{loginError && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg">{loginError}</div>}

					<Button type="submit" isLoading={isPending || isSubmitting} loadingText="Signing in...">
						Sign in
					</Button>
				</form>

				<p className="text-sm text-slate-600 text-center mt-4">
					Don't have an account?{" "}
					<Link to="/register" className="font-medium text-slate-900 hover:text-slate-800">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};
