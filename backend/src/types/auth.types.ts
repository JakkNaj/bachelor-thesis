export type TCreateUserArgs = {
    email: string;
    name: string;
    password: string;
  };
  
export type TLoginUserArgs = {
  email: string;
  password: string;
};
  
export type TCheckAuthResponse = {
  authenticated: boolean;
};
  
  // make req.user available in protected routes
declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
    }
  }
}
