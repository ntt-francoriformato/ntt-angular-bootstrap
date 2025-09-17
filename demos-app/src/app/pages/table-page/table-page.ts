import { Component, inject } from '@angular/core';
import { DummyJsonService } from '../../services/dummy-json.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { Table } from '../../components/table/table';
import { CellHeaderDefDirective } from '../../directives/cell-header-def.directive';
import { CellDefDirective } from '../../directives/cell-def.directive';
import { ColumnDefDirective } from '../../directives/column-def.directive';
import { PagedResourceTable } from '../../components/table/paged-resource-table/paged-resource-table.component';
import { map } from 'rxjs';
import { Post } from '../../../connectors/dummy-json-api/models';
import { Page, queryParamsPagination } from '../../utils/pagination';
import { qp } from '../../services/query-params.service';
import { FormsModule } from '@angular/forms';

// This wants to be:
// type Sorting = NonNullable<GetPosts$Params['sorting']>[number];
type Sorting = 'title' | '-title';

@Component({
  selector: 'app-table-page',
  imports: [
    Table,
    PagedResourceTable,
    TranslateModule,
    FormsModule,
    CellHeaderDefDirective,
    CellDefDirective,
    ColumnDefDirective,
  ],
  templateUrl: './table-page.html',
  styleUrl: './table-page.css',
})
export default class TablePage {
  // For static table demo
  readonly staticTableValues = [
    {
      firstName: 'John',
      familyName: 'Doe',
      phoneNumber: '+39 320 388 2413',
    },
  ];

  // For paged resource table demo
  private readonly dummyJsonService = inject(DummyJsonService);

  readonly query = qp('query', '');

  readonly pagination = queryParamsPagination<Sorting>({
    resetSources: [this.query],
  });

  readonly posts$ = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) =>
      this.dummyJsonService.getPosts(params).pipe(
        // Mock search
        map((items) =>
          items.filter((i) =>
            i.title.toLocaleLowerCase().includes(params.query?.toLocaleLowerCase() ?? ''),
          ),
        ),
        // Mock pagination
        map(
          (items) => ({ items: items.slice(0, 25), count: items.length, limit: 25, offset: 0 }) as Page<Post>,
        ),
      ),
  });
}
