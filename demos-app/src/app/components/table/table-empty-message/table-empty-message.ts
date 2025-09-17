import { Component, input, ResourceStatus } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-table-empty-message',
  templateUrl: './table-empty-message.html',
  styleUrl: './table-empty-message.css',
  standalone: true,
  imports: [Skeleton],
})
export class TableEmptyMessage {
  readonly state = input.required<ResourceStatus>();

  readonly emptyTitle = input.required<string>();
  readonly emptyReason = input<string>();

  readonly colCount = input.required<number>();
  readonly rowCount = input(10);
}
