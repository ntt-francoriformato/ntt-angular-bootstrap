import { Component, inject } from '@angular/core';
import { DummyJsonService } from '../../services/dummy-json.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dummy-api-page',
  imports: [JsonPipe, TranslateModule],
  templateUrl: './dummy-api-page.html',
  styleUrl: './dummy-api-page.css',
})
export default class DummyApiPage {
  private readonly dummyJsonService = inject(DummyJsonService);

  readonly posts$ = rxResource({
    params: () => ({}),
    stream: ({ params }) => this.dummyJsonService.getPosts(params),
  });
}
