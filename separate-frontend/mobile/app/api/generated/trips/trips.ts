/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type {
	DataTag,
	DefinedInitialDataOptions,
	DefinedUseInfiniteQueryResult,
	DefinedUseQueryResult,
	InfiniteData,
	MutationFunction,
	QueryFunction,
	QueryKey,
	UndefinedInitialDataOptions,
	UseInfiniteQueryOptions,
	UseInfiniteQueryResult,
	UseMutationOptions,
	UseMutationResult,
	UseQueryOptions,
	UseQueryResult,
} from "@tanstack/react-query";

import type { Error, PutApiTripsIdBody, Trip, TripInput } from ".././schemas";

import { customInstance } from "../../mutator/custom-instance";

/**
 * @summary Get all trips for the authenticated user
 */
export const getApiTrips = (signal?: AbortSignal) => {
	return customInstance<Trip[]>({ url: `/api/trips`, method: "GET", signal });
};

export const getGetApiTripsQueryKey = () => {
	return [`/api/trips`] as const;
};

export const getGetApiTripsInfiniteQueryOptions = <
	TData = InfiniteData<Awaited<ReturnType<typeof getApiTrips>>>,
	TError = unknown,
>(options?: {
	query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiTripsQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTrips>>> = ({ signal }) => getApiTrips(signal);

	return { queryKey, queryFn, staleTime: 10000, ...queryOptions } as UseInfiniteQueryOptions<
		Awaited<ReturnType<typeof getApiTrips>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTripsInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiTrips>>>;
export type GetApiTripsInfiniteQueryError = unknown;

export function useGetApiTripsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTrips>>>, TError = unknown>(options: {
	query: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>> &
		Pick<
			DefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, Awaited<ReturnType<typeof getApiTrips>>>,
			"initialData"
		>;
}): DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTrips>>>, TError = unknown>(options?: {
	query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>> &
		Pick<
			UndefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, Awaited<ReturnType<typeof getApiTrips>>>,
			"initialData"
		>;
}): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTrips>>>, TError = unknown>(options?: {
	query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get all trips for the authenticated user
 */

export function useGetApiTripsInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTrips>>>, TError = unknown>(options?: {
	query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getGetApiTripsInfiniteQueryOptions(options);

	const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const getGetApiTripsQueryOptions = <TData = Awaited<ReturnType<typeof getApiTrips>>, TError = unknown>(options?: {
	query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiTripsQueryKey();

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTrips>>> = ({ signal }) => getApiTrips(signal);

	return { queryKey, queryFn, staleTime: 10000, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof getApiTrips>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTripsQueryResult = NonNullable<Awaited<ReturnType<typeof getApiTrips>>>;
export type GetApiTripsQueryError = unknown;

export function useGetApiTrips<TData = Awaited<ReturnType<typeof getApiTrips>>, TError = unknown>(options: {
	query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>> &
		Pick<
			DefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, Awaited<ReturnType<typeof getApiTrips>>>,
			"initialData"
		>;
}): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTrips<TData = Awaited<ReturnType<typeof getApiTrips>>, TError = unknown>(options?: {
	query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>> &
		Pick<
			UndefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, Awaited<ReturnType<typeof getApiTrips>>>,
			"initialData"
		>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTrips<TData = Awaited<ReturnType<typeof getApiTrips>>, TError = unknown>(options?: {
	query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get all trips for the authenticated user
 */

export function useGetApiTrips<TData = Awaited<ReturnType<typeof getApiTrips>>, TError = unknown>(options?: {
	query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTrips>>, TError, TData>>;
}): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getGetApiTripsQueryOptions(options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

	query.queryKey = queryOptions.queryKey;

	return query;
}

/**
 * @summary Create a new trip
 */
export const postApiTrips = (tripInput: TripInput, signal?: AbortSignal) => {
	return customInstance<Trip>({
		url: `/api/trips`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: tripInput,
		signal,
	});
};

export const getPostApiTripsMutationOptions = <TError = unknown, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof postApiTrips>>, TError, { data: TripInput }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof postApiTrips>>, TError, { data: TripInput }, TContext> => {
	const mutationKey = ["postApiTrips"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof postApiTrips>>, { data: TripInput }> = (props) => {
		const { data } = props ?? {};

		return postApiTrips(data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PostApiTripsMutationResult = NonNullable<Awaited<ReturnType<typeof postApiTrips>>>;
export type PostApiTripsMutationBody = TripInput;
export type PostApiTripsMutationError = unknown;

/**
 * @summary Create a new trip
 */
export const usePostApiTrips = <TError = unknown, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof postApiTrips>>, TError, { data: TripInput }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof postApiTrips>>, TError, { data: TripInput }, TContext> => {
	const mutationOptions = getPostApiTripsMutationOptions(options);

	return useMutation(mutationOptions);
};
/**
 * @summary Get a trip by ID
 */
export const getApiTripsId = (id: number, signal?: AbortSignal) => {
	return customInstance<Trip>({ url: `/api/trips/${id}`, method: "GET", signal });
};

export const getGetApiTripsIdQueryKey = (id: number) => {
	return [`/api/trips/${id}`] as const;
};

export const getGetApiTripsIdInfiniteQueryOptions = <TData = InfiniteData<Awaited<ReturnType<typeof getApiTripsId>>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiTripsIdQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTripsId>>> = ({ signal }) => getApiTripsId(id, signal);

	return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions } as UseInfiniteQueryOptions<
		Awaited<ReturnType<typeof getApiTripsId>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTripsIdInfiniteQueryResult = NonNullable<Awaited<ReturnType<typeof getApiTripsId>>>;
export type GetApiTripsIdInfiniteQueryError = Error;

export function useGetApiTripsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTripsId>>>, TError = Error>(
	id: number,
	options: {
		query: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> &
			Pick<
				DefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, Awaited<ReturnType<typeof getApiTripsId>>>,
				"initialData"
			>;
	}
): DefinedUseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTripsId>>>, TError = Error>(
	id: number,
	options?: {
		query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> &
			Pick<
				UndefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, Awaited<ReturnType<typeof getApiTripsId>>>,
				"initialData"
			>;
	}
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTripsId>>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get a trip by ID
 */

export function useGetApiTripsIdInfinite<TData = InfiniteData<Awaited<ReturnType<typeof getApiTripsId>>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseInfiniteQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
): UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getGetApiTripsIdInfiniteQueryOptions(id, options);

	const query = useInfiniteQuery(queryOptions) as UseInfiniteQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

	query.queryKey = queryOptions.queryKey;

	return query;
}

export const getGetApiTripsIdQueryOptions = <TData = Awaited<ReturnType<typeof getApiTripsId>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
) => {
	const { query: queryOptions } = options ?? {};

	const queryKey = queryOptions?.queryKey ?? getGetApiTripsIdQueryKey(id);

	const queryFn: QueryFunction<Awaited<ReturnType<typeof getApiTripsId>>> = ({ signal }) => getApiTripsId(id, signal);

	return { queryKey, queryFn, enabled: !!id, staleTime: 10000, ...queryOptions } as UseQueryOptions<
		Awaited<ReturnType<typeof getApiTripsId>>,
		TError,
		TData
	> & { queryKey: DataTag<QueryKey, TData, TError> };
};

export type GetApiTripsIdQueryResult = NonNullable<Awaited<ReturnType<typeof getApiTripsId>>>;
export type GetApiTripsIdQueryError = Error;

export function useGetApiTripsId<TData = Awaited<ReturnType<typeof getApiTripsId>>, TError = Error>(
	id: number,
	options: {
		query: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> &
			Pick<
				DefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, Awaited<ReturnType<typeof getApiTripsId>>>,
				"initialData"
			>;
	}
): DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsId<TData = Awaited<ReturnType<typeof getApiTripsId>>, TError = Error>(
	id: number,
	options?: {
		query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> &
			Pick<
				UndefinedInitialDataOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, Awaited<ReturnType<typeof getApiTripsId>>>,
				"initialData"
			>;
	}
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
export function useGetApiTripsId<TData = Awaited<ReturnType<typeof getApiTripsId>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };
/**
 * @summary Get a trip by ID
 */

export function useGetApiTripsId<TData = Awaited<ReturnType<typeof getApiTripsId>>, TError = Error>(
	id: number,
	options?: { query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof getApiTripsId>>, TError, TData>> }
): UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> } {
	const queryOptions = getGetApiTripsIdQueryOptions(id, options);

	const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData, TError> };

	query.queryKey = queryOptions.queryKey;

	return query;
}

/**
 * @summary Update a trip
 */
export const putApiTripsId = (id: number, putApiTripsIdBody: PutApiTripsIdBody) => {
	return customInstance<Trip>({
		url: `/api/trips/${id}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: putApiTripsIdBody,
	});
};

export const getPutApiTripsIdMutationOptions = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof putApiTripsId>>, TError, { id: number; data: PutApiTripsIdBody }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof putApiTripsId>>, TError, { id: number; data: PutApiTripsIdBody }, TContext> => {
	const mutationKey = ["putApiTripsId"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiTripsId>>, { id: number; data: PutApiTripsIdBody }> = (props) => {
		const { id, data } = props ?? {};

		return putApiTripsId(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PutApiTripsIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiTripsId>>>;
export type PutApiTripsIdMutationBody = PutApiTripsIdBody;
export type PutApiTripsIdMutationError = Error;

/**
 * @summary Update a trip
 */
export const usePutApiTripsId = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof putApiTripsId>>, TError, { id: number; data: PutApiTripsIdBody }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof putApiTripsId>>, TError, { id: number; data: PutApiTripsIdBody }, TContext> => {
	const mutationOptions = getPutApiTripsIdMutationOptions(options);

	return useMutation(mutationOptions);
};
/**
 * @summary Delete a trip
 */
export const deleteApiTripsId = (id: number) => {
	return customInstance<void>({ url: `/api/trips/${id}`, method: "DELETE" });
};

export const getDeleteApiTripsIdMutationOptions = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteApiTripsId>>, TError, { id: number }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteApiTripsId>>, TError, { id: number }, TContext> => {
	const mutationKey = ["deleteApiTripsId"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiTripsId>>, { id: number }> = (props) => {
		const { id } = props ?? {};

		return deleteApiTripsId(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type DeleteApiTripsIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiTripsId>>>;

export type DeleteApiTripsIdMutationError = Error;

/**
 * @summary Delete a trip
 */
export const useDeleteApiTripsId = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteApiTripsId>>, TError, { id: number }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof deleteApiTripsId>>, TError, { id: number }, TContext> => {
	const mutationOptions = getDeleteApiTripsIdMutationOptions(options);

	return useMutation(mutationOptions);
};
