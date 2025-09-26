import { Component, signal } from '@angular/core';

import { GroupableGantt } from '../../components/groupable-gantt/groupable-gantt';

import type { Options, Task } from '../../../gantt-lib';

@Component({
  selector: 'app-scheduler-page',
  imports: [GroupableGantt],
  templateUrl: './scheduler-page.html',
  styleUrl: './scheduler-page.css',
})
export default class SchedulerPage {
  /**
   * Sample grouped tasks for the GroupableGantt chart
   */
  protected groupedTasks = signal<Task[]>([
    {
      start: '2024-09-25T09:00',
      end: '2024-09-25T17:00',
      name: 'Task 1',
      id: 'Task 1',
      color: '#ebebed',
      color_progress: '#0072bc',
      progress: 80,
      group: 'A',
    },
    {
      start: '2024-09-25T18:00',
      end: '2024-09-25T23:00',
      name: 'Task 2',
      id: 'Task 2',
      progress: 5,
      group: 'A',
    },
    {
      start: '2024-09-26T09:00',
      end: '2024-09-26T17:00',
      name: 'Task 3',
      id: 'Task 3',
      progress: 0,
      group: 'B',
    },
  ]);

  /**
   * GroupableGantt chart options with grouping enabled
   */
  protected groupedGanttOptions = signal<Options>({
    enable_grouping: true,
    groups: ['A', 'B'],
    view_mode: 'Hour',
    date_format: 'DD-MM-YYYYTHH:mm',
    readonly: true,
    scroll_to: 'today',
    popup_on: 'hover',
    lines: 'vertical',
  });
}
