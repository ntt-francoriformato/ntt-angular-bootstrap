import { inject, Injectable } from '@angular/core';

import { PostsService } from '../../connectors/dummy-json-api/services';
import { GetPosts$Params } from '../../connectors/dummy-json-api/fn/posts/get-posts';

@Injectable({
  providedIn: 'root',
})
export class DummyJsonService {
  private readonly postsApi = inject(PostsService);

  getPosts(params: GetPosts$Params) {
    return this.postsApi.getPosts(params);
  }
}
