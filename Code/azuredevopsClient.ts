import fetch from './fetchwrapper';
import AzureAdClient from './azureAdClient';
import Configuration from './configuration';
import { ListResponse } from './AzureDevopsApiObjects/ListResponse';
import { CreatePatRequest } from './AzureDevopsApiObjects/CreatePatRequest';
import { PatDetailResponse } from './AzureDevopsApiObjects/PatDetailResponse';
import { UpdatePatRequest } from './AzureDevopsApiObjects/UpdatePatRequest';


class azureDevOpsApi {
  configuration: Configuration;
  tokenLoader: AzureAdClient;
  listUrl: string;
  createUrl: string;
  deleteUrl: string;
  updateUrl: string;
  getUrl: string;
  constructor(configuration: Configuration) {
    this.configuration = configuration;
    this.tokenLoader = new AzureAdClient(configuration);
    this.listUrl = `https://vssps.dev.azure.com/${this.configuration.organisation}/_apis/tokens/pats?api-version=6.1-preview.1`;
    this.createUrl = `https://vssps.dev.azure.com/${this.configuration.organisation}/_apis/tokens/pats?api-version=6.1-preview.1`;
    this.deleteUrl = `https://vssps.dev.azure.com/${this.configuration.organisation}/_apis/tokens/pats?api-version=6.1-preview.1&authorizationId=`;
    this.updateUrl = `https://vssps.dev.azure.com/${this.configuration.organisation}/_apis/tokens/pats?api-version=6.1-preview.1`;
    this.getUrl = `https://vssps.dev.azure.com/${this.configuration.organisation}/_apis/tokens/pats?api-version=6.1-preview.1&authorizationId=`;
  }
  async listPatsAsync(): Promise<ListResponse> {
    console.log('Getting all Pats');
    const options = await this.buildHeaders();
    const response = await fetch(this.listUrl, options);
    const json = await response.json();
    return json as ListResponse;
  }

  async createPatAsync(createRequest: CreatePatRequest): Promise<PatDetailResponse> {
    const options = await this.buildHeaders();
    options.method = 'POST';
    options.body = JSON.stringify(createRequest);
    const response = await fetch(this.createUrl, options);
    const json = await response.json();
    return json as PatDetailResponse;
  }

  async getPatAsync(authorizationId: string): Promise<PatDetailResponse> {
    console.log(`Loading token: ${authorizationId}`);
    const url = `${this.getUrl}${authorizationId}`;
    const options = await this.buildHeaders();
    const response = await fetch(url, options);
    const json = await response.json();
    return json as PatDetailResponse;
  }

  async revokePatAsync(authorizationId: string): Promise<Boolean> {
    console.log(`Revoking token: ${authorizationId}`);
    const url = `${this.deleteUrl}${authorizationId}`;
    const options = await this.buildHeaders();
    options.method = 'DELETE';
    const response = await fetch(url, options);
    return response.ok
  }

  async updatePatAsync(updatePatRequest: UpdatePatRequest) {
    const options = await this.buildHeaders();
    options.method = 'PUT';
    options.body = JSON.stringify(updatePatRequest);
    const response = await fetch(this.createUrl, options);
    const json = await response.json();
    return json as PatDetailResponse;
  }


  async buildHeaders(): Promise<any> {
    return {
      headers: {
        'Authorization': `Bearer ${await this.tokenLoader.getTokenAsync()}`,
        'Content-Type': 'application/json'
      }
    }
  }
}

export default azureDevOpsApi;