// Utilities for managing pagination, sorting, and infinite scroll in Angular apps.
// These helpers are designed for use with PrimeNG tables and Angular signals/resources.

import { effect, Signal, signal } from '@angular/core';
import { deepEqual } from 'fast-equals';
import { qpMapN, qpNum } from '../services/query-params.service';

// Type for sortable column keys, supporting both ascending (K) and descending (-K) order.
export type SortAscDesc<K extends string> = K | `-${K}`;

export interface Pagination<S extends string> {
  offset: number;
  limit: number;
  sorting?: S[]; // Optional array of sorting keys (column names, with optional '-' prefix for descending)
}

export interface Page<T> {
  count: number;
  items: T[];
  limit: number;
  offset: number;
}

export const queryParamsPagination = <S extends string>(
  options: { resetSources?: Signal<unknown>[] } = {},
) => {
  const offsetQp = qpNum('offset', 0);
  const limitQp = qpNum('limit', 25);
  const sortingQp = qpMapN<S>('sorting', (x) => x as S);

  const sortingQpValue = sortingQp();

  const result = signal<Pagination<S>>(
    {
      offset: offsetQp(),
      limit: limitQp(),
      sorting: sortingQpValue,
    },
    {
      equal: deepEqual,
    },
  );

  effect(() => {
    const current = result();
    offsetQp.set(current.offset);
    limitQp.set(current.limit);
    sortingQp.set(current.sorting ?? []);
  });

  effect(() => {
    const sortingQpValue = sortingQp();
    result.set({
      offset: offsetQp(),
      limit: limitQp(),
      sorting: sortingQpValue,
    });
  });

  const { resetSources } = options;

  if (resetSources?.length) {
    effect(() => {
      resetSources.forEach((s) => s());
      result.update((p) => ({ ...p, offset: 0 }));
    });
  }

  return result;
};
