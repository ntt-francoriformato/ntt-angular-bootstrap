import { NgClass } from '@angular/common';
import { Directive, contentChild, input } from '@angular/core';

import { CellDefDirective } from './cell-def.directive';
import { CellHeaderDefDirective } from './cell-header-def.directive';

@Directive({
  selector: '[appColumnDef]',
  standalone: true,
})
export class ColumnDefDirective {
  readonly name = input<string>(undefined, { alias: 'appColumnDef' });
  readonly cell = contentChild.required(CellDefDirective);
  readonly headerCell = contentChild.required(CellHeaderDefDirective);

  readonly classes = input<NgClass['ngClass']>();
  readonly shrink = input<boolean>(false);
  readonly align = input<'start' | 'center' | 'end'>('start');
}
