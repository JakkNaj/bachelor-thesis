/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import type { Activity } from './activity';

export interface Trip {
  /** Trip ID */
  id: number;
  /** Trip title */
  title: string;
  /** Trip description */
  description?: string;
  /** Trip start date */
  startDate: string;
  /** Trip end date */
  endDate: string;
  /** User ID who owns the trip */
  userId?: number;
  /** Creation timestamp */
  createdAt?: string;
  /** Update timestamp */
  updatedAt?: string;
  activities?: Activity[];
}
