export interface DatabaseError {
  success: false;
  error: string;
  details?: Record<string, unknown>;
}

export interface DatabaseSuccess<T> {
  success: true;
  data: T;
}

export type DatabaseResult<T> = DatabaseSuccess<T> | DatabaseError;

export function isError<T>(result: DatabaseResult<T>): result is DatabaseError {
  return !result.success;
}

export function isSuccess<T>(result: DatabaseResult<T>): result is DatabaseSuccess<T> {
  return result.success;
}

export function createError(message: string, details?: Record<string, unknown>): DatabaseError {
  return {
    success: false,
    error: message,
    details
  };
}

export function createSuccess<T>(data: T): DatabaseSuccess<T> {
  return {
    success: true,
    data
  };
}

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

export function calculatePagination(
  data: unknown[],
  total: number,
  limit: number,
  offset: number
): PaginationResult<unknown> {
  return {
    data,
    total,
    limit,
    offset,
    hasMore: offset + data.length < total
  };
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateRequired(value: unknown, fieldName: string): string | null {
  if (value === null || value === undefined || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return null;
}

export function handleError(error: Error | null, fallbackMessage: string): DatabaseError | null {
  if (!error) return null;

  const errorMessage = error.message || fallbackMessage;

  console.error('Error:', {
    message: error.message
  });

  return createError(errorMessage);
}
