/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import {
  useQuery
} from '@tanstack/react-query';
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryClient,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  Error,
  UserResponse
} from '.././schemas';

import { apiClient } from '../../apiClient';




/**
 * @summary Get user profile
 */
export const getApiUsersProfile = (
    
 signal?: AbortSignal
) => {
      
      
      return apiClient<UserResponse>(
      {url: `/api/users/profile`, method: 'GET', signal
    },
      );
    }
  

export const getGetApiUsersProfileQueryKey = () => {
    return [`/api/users/profile`] as const;
    }

    
export const getGetApiUsersProfileQueryOptions = <TData = Awaited<ReturnType<typeof getApiUsersProfile>>, TError = Error>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetApiUsersProfileQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiUsersProfile>>> = ({ signal }) => getApiUsersProfile(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData> & { queryKey: DataTag<QueryKey, TData, TError> }
}

export type GetApiUsersProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getApiUsersProfile>>>
export type GetApiUsersProfileQueryError = Error


export function useGetApiUsersProfile<TData = Awaited<ReturnType<typeof getApiUsersProfile>>, TError = Error>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersProfile>>,
          TError,
          Awaited<ReturnType<typeof getApiUsersProfile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiUsersProfile<TData = Awaited<ReturnType<typeof getApiUsersProfile>>, TError = Error>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getApiUsersProfile>>,
          TError,
          Awaited<ReturnType<typeof getApiUsersProfile>>
        > , 'initialData'
      >, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
export function useGetApiUsersProfile<TData = Awaited<ReturnType<typeof getApiUsersProfile>>, TError = Error>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData>>, }
 , queryClient?: QueryClient
  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> }
/**
 * @summary Get user profile
 */

export function useGetApiUsersProfile<TData = Awaited<ReturnType<typeof getApiUsersProfile>>, TError = Error>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiUsersProfile>>, TError, TData>>, }
 , queryClient?: QueryClient 
 ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {

  const queryOptions = getGetApiUsersProfileQueryOptions(options)

  const query = useQuery(queryOptions , queryClient) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



