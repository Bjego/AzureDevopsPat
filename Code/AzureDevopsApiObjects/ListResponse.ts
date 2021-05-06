import { PatDetail } from './PatDetail';

export interface ListResponse {
  continuationToken: string;
  patTokens: PatDetail[];
}
