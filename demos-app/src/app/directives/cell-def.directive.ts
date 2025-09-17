import { Directive, inject, input, TemplateRef } from '@angular/core';

import { Table } from '../components/table/table';

@Directive({
  selector: '[appCellDef]',
  standalone: true,
})
export class CellDefDirective<T, S extends string> {
  readonly appCellDef = input<Table<T, S>>();
  readonly template = inject(TemplateRef<T>);

  static ngTemplateContextGuard<T, S extends string>(
    def: CellDefDirective<T, S>,
    ctx: unknown,
  ): ctx is { $implicit: T } {
    return true;
  }
}
