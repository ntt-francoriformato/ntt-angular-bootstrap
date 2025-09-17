import {
  Component,
  computed,
  contentChildren,
  input,
  model,
  output,
  Resource,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TableModule } from 'primeng/table';

import { ColumnDefDirective } from '../../../directives/column-def.directive';
import { Page, Pagination } from '../../../utils/pagination';
import { Table } from '../table';
import { TableEmptyMessage } from '../table-empty-message/table-empty-message';

@Component({
  selector: 'app-paged-resource-table',
  templateUrl: './paged-resource-table.component.html',
  styleUrl: './paged-resource-table.component.css',
  standalone: true,
  imports: [TableModule, Table, TableEmptyMessage],
})
export class PagedResourceTable<T, S extends string> {
  readonly content = contentChildren(TemplateRef);

  readonly table = viewChild(Table<T, S>);

  readonly pageRes = input.required<Resource<Page<T> | undefined>>();
  readonly pagination = model.required<Pagination<S>>();
  readonly rowSelected = output<T>();

  readonly query = input<string>();

  readonly emptyTitle = input.required<string>();
  readonly emptyQueryMessage = input<string>();

  readonly columns = contentChildren(ColumnDefDirective);

  readonly multiSortMeta = computed(() => {
    const sort = this.pagination()?.sorting;

    return sort?.length
      ? sort.map((field) =>
          field.startsWith('-') ? { field: field.substring(1), order: -1 } : { field, order: 1 },
        )
      : undefined;
  });
}
