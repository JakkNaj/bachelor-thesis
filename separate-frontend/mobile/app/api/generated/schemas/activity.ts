/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */

export interface Activity {
  /** Activity ID */
  id: number;
  /** Activity title */
  title: string;
  /** Activity description */
  description?: string;
  /** Activity start time */
  startTime: string;
  /** Activity end time */
  endTime?: string;
  /** Activity type */
  type: string;
  /** Trip ID this activity belongs to */
  tripId: number;
  /** Creation timestamp */
  createdAt?: string;
  /** Update timestamp */
  updatedAt?: string;
}
