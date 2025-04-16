import * as yup from "yup";

export const signupSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], "Passwords must match")
      .required("Please confirm your password"),
  });
  
export type TSignupSchema = yup.InferType<typeof signupSchema>;