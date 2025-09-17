import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appTableCell]',
  standalone: true,
})
export class TableCellDirective {
  readonly label = input.required();
  readonly sortField = input<string>();
  readonly cellClass = input<string>();
}
