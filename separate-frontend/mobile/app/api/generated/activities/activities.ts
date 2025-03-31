/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import { useMutation } from "@tanstack/react-query";
import type { MutationFunction, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";

import type { Activity, Error, PostApiActivitiesTripTripIdBody, PutApiActivitiesIdBody } from ".././schemas";

import { customInstance } from "../../mutator/custom-instance";

/**
 * @summary Add an activity to a trip
 */
export const postApiActivitiesTripTripId = (
	tripId: number,
	postApiActivitiesTripTripIdBody: PostApiActivitiesTripTripIdBody,
	signal?: AbortSignal
) => {
	return customInstance<Activity>({
		url: `/api/activities/trip/${tripId}`,
		method: "POST",
		headers: { "Content-Type": "application/json" },
		data: postApiActivitiesTripTripIdBody,
		signal,
	});
};

export const getPostApiActivitiesTripTripIdMutationOptions = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof postApiActivitiesTripTripId>>,
		TError,
		{ tripId: number; data: PostApiActivitiesTripTripIdBody },
		TContext
	>;
}): UseMutationOptions<
	Awaited<ReturnType<typeof postApiActivitiesTripTripId>>,
	TError,
	{ tripId: number; data: PostApiActivitiesTripTripIdBody },
	TContext
> => {
	const mutationKey = ["postApiActivitiesTripTripId"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<
		Awaited<ReturnType<typeof postApiActivitiesTripTripId>>,
		{ tripId: number; data: PostApiActivitiesTripTripIdBody }
	> = (props) => {
		const { tripId, data } = props ?? {};

		return postApiActivitiesTripTripId(tripId, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PostApiActivitiesTripTripIdMutationResult = NonNullable<Awaited<ReturnType<typeof postApiActivitiesTripTripId>>>;
export type PostApiActivitiesTripTripIdMutationBody = PostApiActivitiesTripTripIdBody;
export type PostApiActivitiesTripTripIdMutationError = Error;

/**
 * @summary Add an activity to a trip
 */
export const usePostApiActivitiesTripTripId = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof postApiActivitiesTripTripId>>,
		TError,
		{ tripId: number; data: PostApiActivitiesTripTripIdBody },
		TContext
	>;
}): UseMutationResult<
	Awaited<ReturnType<typeof postApiActivitiesTripTripId>>,
	TError,
	{ tripId: number; data: PostApiActivitiesTripTripIdBody },
	TContext
> => {
	const mutationOptions = getPostApiActivitiesTripTripIdMutationOptions(options);

	return useMutation(mutationOptions);
};
/**
 * @summary Update an activity
 */
export const putApiActivitiesId = (id: number, putApiActivitiesIdBody: PutApiActivitiesIdBody) => {
	return customInstance<Activity>({
		url: `/api/activities/${id}`,
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		data: putApiActivitiesIdBody,
	});
};

export const getPutApiActivitiesIdMutationOptions = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof putApiActivitiesId>>,
		TError,
		{ id: number; data: PutApiActivitiesIdBody },
		TContext
	>;
}): UseMutationOptions<Awaited<ReturnType<typeof putApiActivitiesId>>, TError, { id: number; data: PutApiActivitiesIdBody }, TContext> => {
	const mutationKey = ["putApiActivitiesId"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof putApiActivitiesId>>, { id: number; data: PutApiActivitiesIdBody }> = (
		props
	) => {
		const { id, data } = props ?? {};

		return putApiActivitiesId(id, data);
	};

	return { mutationFn, ...mutationOptions };
};

export type PutApiActivitiesIdMutationResult = NonNullable<Awaited<ReturnType<typeof putApiActivitiesId>>>;
export type PutApiActivitiesIdMutationBody = PutApiActivitiesIdBody;
export type PutApiActivitiesIdMutationError = Error;

/**
 * @summary Update an activity
 */
export const usePutApiActivitiesId = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<
		Awaited<ReturnType<typeof putApiActivitiesId>>,
		TError,
		{ id: number; data: PutApiActivitiesIdBody },
		TContext
	>;
}): UseMutationResult<Awaited<ReturnType<typeof putApiActivitiesId>>, TError, { id: number; data: PutApiActivitiesIdBody }, TContext> => {
	const mutationOptions = getPutApiActivitiesIdMutationOptions(options);

	return useMutation(mutationOptions);
};
/**
 * @summary Delete an activity
 */
export const deleteApiActivitiesId = (id: number) => {
	return customInstance<void>({ url: `/api/activities/${id}`, method: "DELETE" });
};

export const getDeleteApiActivitiesIdMutationOptions = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteApiActivitiesId>>, TError, { id: number }, TContext>;
}): UseMutationOptions<Awaited<ReturnType<typeof deleteApiActivitiesId>>, TError, { id: number }, TContext> => {
	const mutationKey = ["deleteApiActivitiesId"];
	const { mutation: mutationOptions } = options
		? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
			? options
			: { ...options, mutation: { ...options.mutation, mutationKey } }
		: { mutation: { mutationKey } };

	const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteApiActivitiesId>>, { id: number }> = (props) => {
		const { id } = props ?? {};

		return deleteApiActivitiesId(id);
	};

	return { mutationFn, ...mutationOptions };
};

export type DeleteApiActivitiesIdMutationResult = NonNullable<Awaited<ReturnType<typeof deleteApiActivitiesId>>>;

export type DeleteApiActivitiesIdMutationError = Error;

/**
 * @summary Delete an activity
 */
export const useDeleteApiActivitiesId = <TError = Error, TContext = unknown>(options?: {
	mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteApiActivitiesId>>, TError, { id: number }, TContext>;
}): UseMutationResult<Awaited<ReturnType<typeof deleteApiActivitiesId>>, TError, { id: number }, TContext> => {
	const mutationOptions = getDeleteApiActivitiesIdMutationOptions(options);

	return useMutation(mutationOptions);
};
