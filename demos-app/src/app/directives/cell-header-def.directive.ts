import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCellHeaderDef]',
  standalone: true,
})
export class CellHeaderDefDirective {
  readonly template = inject(TemplateRef<unknown>);
}
