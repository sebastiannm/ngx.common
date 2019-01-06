import { ContentfulClientApi } from 'contentful';
export declare class ContentFulService {
    client: ContentfulClientApi;
    constructor();
    setupClient(space: string, accessToken: string): void;
    search(query: any): Promise<any>;
}
