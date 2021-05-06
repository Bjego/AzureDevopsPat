import { CreatePatRequest } from "./CreatePatRequest";

export interface UpdatePatRequest extends CreatePatRequest {
  authorizationId: string;
}
