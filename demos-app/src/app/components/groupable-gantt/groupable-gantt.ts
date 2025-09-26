import {
  AfterViewInit,
  Component,
  ElementRef,
  computed,
  input,
  output,
  viewChild,
} from '@angular/core';

import Gantt from '../../../gantt-lib';
import type { Options, Task } from '../../../gantt-lib';

@Component({
  selector: 'app-groupable-gantt',
  standalone: true,
  imports: [],
  templateUrl: './groupable-gantt.html',
  styleUrls: ['./groupable-gantt.css'],
})
export class GroupableGantt implements AfterViewInit {
  /* Array of tasks to be displayed in the Gantt chart */
  readonly tasks = input<Task[]>([]);

  /* Configuration options for the Gantt chart */
  readonly options = input<Options>({});

  /* Emits when a task is clicked */
  readonly taskClick = output<Task>();

  /* Reference to the Gantt chart container */
  private readonly ganttContainer = viewChild('gantt', { read: ElementRef });

  /* To display our custom label list on the right, we need to position it after the header */
  protected readonly ganttHeaderHeight = computed(() => {
    const ganttContainer = this.ganttContainer()?.nativeElement;
    if (!ganttContainer || !(ganttContainer instanceof HTMLElement)) {
      return 0;
    }

    return ganttContainer.querySelector('.grid-header')?.clientHeight;
  });

  /* Height for a row of the custom label list */
  protected readonly ganttRowHeight = computed(() => {
    const ganttContainer = this.ganttContainer()?.nativeElement;
    if (!ganttContainer || !(ganttContainer instanceof HTMLElement)) {
      return 0;
    }

    return ganttContainer.querySelector('rect.grid-row')?.getAttribute('height');
  });

  /* Instance of the Frappe Gantt chart */
  private ganttChart?: Gantt;

  ngAfterViewInit(): void {
    this.initGantt();
  }

  /* Initializes the Gantt chart with tasks and options */
  private initGantt(): void {
    if (!this.tasks()?.length) {
      return;
    }

    // Initialize the Gantt chart with tasks and options
    this.ganttChart = new Gantt(this.ganttContainer()?.nativeElement, this.tasks(), {
      ...this.options(),
      on_click: (task: Task) => {
        this.taskClick.emit(task);
      },
    });
  }

  /* Refresh the Gantt chart with new tasks */
  refreshChart(): void {
    if (this.ganttChart) {
      this.ganttChart.refresh(this.tasks());
    } else {
      this.initGantt();
    }
  }
}
