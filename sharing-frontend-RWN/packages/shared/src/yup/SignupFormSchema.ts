import * as yup from "yup";

export const signupSchema = yup.object({
	name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
	email: yup.string().email("Invalid email format").required("Email is required"),
	password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export type TSignupSchema = yup.InferType<typeof signupSchema>;
