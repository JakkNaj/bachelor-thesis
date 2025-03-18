/**
 * Generated by orval v7.6.0 🍺
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

import type {
  AuthResponse,
  Error,
  PostApiAuthLoginBody,
  PostApiAuthSignupBody
} from '.././schemas';

import { customInstance } from '../../mutator/custom-instance';




/**
 * @summary Login a user
 */
export const postApiAuthLogin = (
    postApiAuthLoginBody: PostApiAuthLoginBody,
  signal?: AbortSignal
) => {
      return customInstance<AuthResponse>(
      {url: `/api/auth/login`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthLoginBody, signal
    },
      );
    }
  


export const getPostApiAuthLoginMutationOptions = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext> => {
    
const mutationKey = ['postApiAuthLogin'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogin>>, {data: PostApiAuthLoginBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthLogin(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLoginMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogin>>>
    export type PostApiAuthLoginMutationBody = PostApiAuthLoginBody
    export type PostApiAuthLoginMutationError = Error

    /**
 * @summary Login a user
 */
export const usePostApiAuthLogin = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogin>>, TError,{data: PostApiAuthLoginBody}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogin>>,
        TError,
        {data: PostApiAuthLoginBody},
        TContext
      > => {

      const mutationOptions = getPostApiAuthLoginMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Register a new user
 */
export const postApiAuthSignup = (
    postApiAuthSignupBody: PostApiAuthSignupBody,
    signal?: AbortSignal
) => {
      
      
      return customInstance<AuthResponse>(
      {url: `/api/auth/signup`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: postApiAuthSignupBody, signal
    },
      );
    }
  


export const getPostApiAuthSignupMutationOptions = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext> => {
    
const mutationKey = ['postApiAuthSignup'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthSignup>>, {data: PostApiAuthSignupBody}> = (props) => {
          const {data} = props ?? {};

          return  postApiAuthSignup(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthSignupMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthSignup>>>
    export type PostApiAuthSignupMutationBody = PostApiAuthSignupBody
    export type PostApiAuthSignupMutationError = Error

    /**
 * @summary Register a new user
 */
export const usePostApiAuthSignup = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthSignup>>, TError,{data: PostApiAuthSignupBody}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthSignup>>,
        TError,
        {data: PostApiAuthSignupBody},
        TContext
      > => {

      const mutationOptions = getPostApiAuthSignupMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * @summary Logout a user
 */
export const postApiAuthLogout = (
    
 signal?: AbortSignal
) => {
      
      
      return customInstance<Error>(
      {url: `/api/auth/logout`, method: 'POST', signal
    },
      );
    }
  


export const getPostApiAuthLogoutMutationOptions = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext> => {
    
const mutationKey = ['postApiAuthLogout'];
const {mutation: mutationOptions} = options ?
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ?
      options
      : {...options, mutation: {...options.mutation, mutationKey}}
      : {mutation: { mutationKey, }};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiAuthLogout>>, void> = () => {
          

          return  postApiAuthLogout()
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type PostApiAuthLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof postApiAuthLogout>>>
    
    export type PostApiAuthLogoutMutationError = Error

    /**
 * @summary Logout a user
 */
export const usePostApiAuthLogout = <TError = Error,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof postApiAuthLogout>>, TError,void, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof postApiAuthLogout>>,
        TError,
        void,
        TContext
      > => {

      const mutationOptions = getPostApiAuthLogoutMutationOptions(options);

      return useMutation(mutationOptions);
    }
    