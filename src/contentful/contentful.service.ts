import { Injectable } from '@angular/core';

import { createClient, ContentfulClientApi } from 'contentful';

@Injectable()
export class ContentFulService {
  client: ContentfulClientApi;

  constructor() {}

  setupClient(space: string, accessToken: string) {
    this.client = createClient({
      space,
      accessToken
    });
  }

  search(query: any): Promise<any> {
    return new Promise(resolve => {
      this.client.getEntries(query).then((response: any) => {
        resolve(response);
      });
    });
  }
}
