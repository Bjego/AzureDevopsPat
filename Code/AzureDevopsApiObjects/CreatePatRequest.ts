import { Scope } from './Scope';


export interface CreatePatRequest {
  displayName: string;
  scope: Scope;
  validTo: string;
  allOrgs: boolean;
}
