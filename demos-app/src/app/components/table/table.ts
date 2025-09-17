import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, contentChildren, input, model, output } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

import { ColumnDefDirective } from '../../directives/column-def.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.css',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, Skeleton, TableModule],
})
export class Table<T, S extends string> {
  readonly value = input.required<T[]>();

  readonly showPagination = input<boolean>(false);
  readonly isLoading = input<boolean>(false);

  readonly sorting = model<S[]>();
  readonly offset = model<number>();
  readonly limit = model<number>();
  readonly columns = input<readonly ColumnDefDirective[]>();

  readonly rowSelected = output<T>();

  readonly childColumns = contentChildren(ColumnDefDirective);

  readonly effectiveColumns = computed(() =>
    this.columns() && (this.columns()?.length ?? 0) > 0 ? this.columns() : this.childColumns(),
  );

  readonly multiSortMeta = computed(() => {
    const sort = this.sorting();

    return sort?.length
      ? sort.map((field) =>
          field.startsWith('-') ? { field: field.substring(1), order: -1 } : { field, order: 1 },
        )
      : undefined;
  });

  onLazyLoad(event: TableLazyLoadEvent) {
    const multiSortMeta = event.multiSortMeta;

    this.sorting.set(
      multiSortMeta
        ? multiSortMeta.map(({ field, order }) => `${order === -1 ? '-' : ''}${field}` as S)
        : undefined,
    );

    this.offset.set(event.first ?? 0);
    this.limit.set(event.rows ?? 20);
  }
}
