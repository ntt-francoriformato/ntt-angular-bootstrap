/**
 * QueryParamsService and helpers for Angular
 *
 * This service and its exported helpers provide a reactive, signal-based way to bind Angular query parameters
 * to application state. It allows you to map query parameters to signals, automatically update them when the URL changes,
 * and push changes back to the URL in a controlled way. Use the exported `qp`, `qpNum`, `qpBool`, `qpMap`, etc. functions
 * in your components to create signals bound to specific query parameters. Use the service to programmatically update
 * query parameters in the URL.
 *
 * Example usage:
 *   const page = qpNum('page', 1); // signal<number> bound to ?page=...
 *   const search = qp('search', ''); // signal<string> bound to ?search=...
 *
 * When the query parameter changes in the URL, the signal updates. When you update the signal, the URL updates.
 *
 */
import { DestroyRef, Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Deep equality check for query param values (handles arrays and primitives)
const equal = (a: unknown, b: unknown): boolean => {
  const aArray = Array.isArray(a);
  const bArray = Array.isArray(b);
  if (aArray && bArray) {
    return a.length === b.length && a.every((x, i) => equal(x, b[i]));
  }
  if (aArray !== bArray) {
    return false;
  }
  return `${a}` === `${b}`;
};

/**
 * Creates a signal bound to a query parameter, with custom mapping from string[] to T.
 * Updates automatically when the query param changes, and pushes changes back to the URL.
 */
export const qpMap = <T>(key: string, f: (x: string[]) => T) => {
  const route = inject(ActivatedRoute);

  // Create a signal initialized from the current query param value
  const r = signal(f(route.snapshot.queryParamMap.getAll(key)), { equal });

  // Subscribe to query param changes and update the signal
  const sub = route.queryParamMap.subscribe((x) => r.set(f(x.getAll(key))));

  // Push signal changes back to the URL
  const qpService = inject(QueryParamsService);
  effect(() => qpService.set(key, r()));

  // Clean up subscription on destroy
  inject(DestroyRef).onDestroy(() => {
    sub.unsubscribe();
  });
  return r;
};

/**
 * Like qpMap, but expects a single value (or uses defaultValue if not present).
 *
 * Function overloads:
 * - If you provide a required defaultValue, the return type is WritableSignal<T> (never undefined).
 * - If defaultValue is optional, the return type is WritableSignal<T | undefined> (may be undefined if the param is missing).
 *
 * This allows TypeScript to infer the correct type for the signal depending on whether you want a required or optional value.
 *
 * Example:
 *   const foo = qpMapSingle('foo', parseInt, 0); // WritableSignal<number>
 *   const bar = qpMapSingle('bar', x => x);      // WritableSignal<string | undefined>
 */
export function qpMapSingle<T>(
  key: string,
  f: (x: string) => T,
  defaultValue: T,
): WritableSignal<T>;
export function qpMapSingle<T>(
  key: string,
  f: (x: string) => T,
  defaultValue?: T,
): WritableSignal<T | undefined>;
export function qpMapSingle<T>(key: string, f: (x: string) => T, defaultValue?: T) {
  return qpMap(key, (values) => (values.length === 1 ? f(values[0]) : defaultValue));
}

/**
 * Signal for a string query parameter (single value).
 */
export function qp(key: string, defaultValue: string): WritableSignal<string>;
export function qp(key: string, defaultValue?: string): WritableSignal<string | undefined>;
export function qp(key: string, defaultValue?: string) {
  return qpMapSingle(key, (x) => x, defaultValue);
}

/**
 * Signal for a numeric query parameter (single value, coerced to number).
 */
export function qpNum(key: string, defaultValue: number): WritableSignal<number>;
export function qpNum(key: string, defaultValue?: number): WritableSignal<number | undefined>;
export function qpNum(key: string, defaultValue?: number) {
  return qpMapSingle(key, (x) => +x, defaultValue);
}

/**
 * Signal for a boolean query parameter (single value, 'true' string is true).
 */
export function qpBool(key: string, defaultValue: boolean): WritableSignal<boolean>;
export function qpBool(key: string, defaultValue?: boolean): WritableSignal<boolean | undefined>;
export function qpBool(key: string, defaultValue?: boolean) {
  return qpMapSingle(key, (x) => x === 'true', defaultValue);
}

/**
 * Signal for an array of query parameter values, mapped to T.
 */
export const qpMapN = <T>(key: string, f: (x: string) => T) =>
  qpMap(key, (values) => values.map(f));

/**
 * Signal for a string query parameter, cast to a specific string literal type.
 */
export function qpCast1<T extends string>(key: string, defaultValue: T): WritableSignal<T>;
export function qpCast1<T extends string>(
  key: string,
  defaultValue?: T,
): WritableSignal<T | undefined>;
export function qpCast1<T extends string>(key: string, defaultValue?: T) {
  return qpMapSingle(key, (x) => x as T, defaultValue);
}

/**
 * Signal for an array of string query parameter values, cast to a specific string literal type.
 */
export const qpCastN = <T extends string>(key: string) => qpMap(key, (values) => values as T[]);

// Used as a sentinel to detect when to update query params
const emptyQp = {};

/**
 * Service for updating query parameters in the URL in a reactive way.
 * Not intended for direct use; use the exported helpers instead.
 */
@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private readonly router = inject(Router);
  // Internal signal holding pending query param updates
  private readonly mapSignal = signal<Params>(emptyQp, { equal: () => false });

  constructor() {
    // When mapSignal changes, update the URL with new query params
    effect(() => {
      const queryParams = this.mapSignal();
      if (queryParams !== emptyQp) {
        this.mapSignal.set(emptyQp);
        void this.router.navigate([], {
          queryParams,
          replaceUrl: true,
          queryParamsHandling: 'merge',
          preserveFragment: true,
        });
      }
    });
  }

  /**
   * Schedule a query param update for the given key/value.
   * Called by the signal helpers when the signal changes.
   */
  set(key: string, value: unknown) {
    this.mapSignal.update((prev) => ({
      ...prev,
      [key]: value,
    }));
  }
}
