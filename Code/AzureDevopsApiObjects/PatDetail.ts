import { Scope } from './Scope';

export interface PatDetail {
  displayName: string;
  validTo: string;
  scope: Scope;
  targetAccounts: string[];
  validFrom: string;
  authorizationId: string;
  token: string;
}
