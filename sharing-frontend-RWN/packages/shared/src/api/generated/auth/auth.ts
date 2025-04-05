/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation
} from '@tanstack/react-query';
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationResult
} from '@tanstack/react-query';

import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import type {
  AuthResponse,
  Error,
  PostApiAuthLoginBody,
  PostApiAuthSignupBody
} from '.././schemas';





/**
 * @summary Login a user
 */
export const postApiAuthLogin = (
    postApiAuthLoginBody: PostApiAuthLoginBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<AuthResponse>> => {
    
    
    return axios.post(
      `/api/auth/login`,
      postApiAuthLoginBody,options
    );
  }



export const getPostApiAuthLoginMutationOptions = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext> => {
    
const mutationKey = ['postApiAuthLogin'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogin>>, {data: PostApiAuthLoginBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthLogin(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogin>>>
    export type PostApiAuthLoginMutationBody = PostApiAuthLoginBody
    export type PostApiAuthLoginMutationError = AxiosError<Error>

    /**
 * @summary Login a user
 */
export const usePostApiAuthLogin = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext>, axios?: AxiosRequestConfig}
 ): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogin>>,
        TError,
        {data: PostApiAuthLoginBody},
        TContext
      > => {

      const mutationOptions = getPostApiAuthLoginMutationOptions(options);

      return useMutation(mutationOptions );
    }
    /**
 * @summary Register a new user
 */
export const postApiAuthSignup = (
    postApiAuthSignupBody: PostApiAuthSignupBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<AuthResponse>> => {
    
    
    return axios.post(
      `/api/auth/signup`,
      postApiAuthSignupBody,options
    );
  }



export const getPostApiAuthSignupMutationOptions = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext> => {
    
const mutationKey = ['postApiAuthSignup'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthSignup>>, {data: PostApiAuthSignupBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthSignup(data,axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthSignupMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthSignup>>>
    export type PostApiAuthSignupMutationBody = PostApiAuthSignupBody
    export type PostApiAuthSignupMutationError = AxiosError<Error>

    /**
 * @summary Register a new user
 */
export const usePostApiAuthSignup = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext>, axios?: AxiosRequestConfig}
 ): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthSignup>>,
        TError,
        {data: PostApiAuthSignupBody},
        TContext
      > => {

      const mutationOptions = getPostApiAuthSignupMutationOptions(options);

      return useMutation(mutationOptions );
    }
    /**
 * @summary Logout a user
 */
export const postApiAuthLogout = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Error>> => {
    
    
    return axios.post(
      `/api/auth/logout`,undefined,options
    );
  }



export const getPostApiAuthLogoutMutationOptions = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, axios?: AxiosRequestConfig}
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext> => {
    
const mutationKey = ['postApiAuthLogout'];
const {mutation: mutationOptions, axios: axiosOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }, axios: undefined};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogout>>, void> = () => {
          

          return  postApiAuthLogout(axiosOptions)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogout>>>
    
    export type PostApiAuthLogoutMutationError = AxiosError<Error>

    /**
 * @summary Logout a user
 */
export const usePostApiAuthLogout = <TError = AxiosError<Error>,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, axios?: AxiosRequestConfig}
 ): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostApiAuthLogoutMutationOptions(options);

      return useMutation(mutationOptions );
    }
    