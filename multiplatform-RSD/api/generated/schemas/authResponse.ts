/**
 * Generated by orval v7.8.0 🍺
 * Do not edit manually.
 * Travel Planner API
 * API documentation for the Travel Planner application
 * OpenAPI spec version: 1.0.0
 */
import type { UserResponse } from './userResponse';

export interface AuthResponse {
  /** JWT token */
  token?: string;
  user?: UserResponse;
}
