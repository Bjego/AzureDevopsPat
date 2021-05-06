import fetch from './fetchwrapper';
import { URLSearchParams } from 'url';
import Configuration from './configuration';

class AzureAdClient {
  configuration: Configuration;
  url: string;
  validUntil: Date;
  token: string;
  constructor(configuration) {
    this.configuration = configuration;
    this.url = `https://login.microsoftonline.com/${this.configuration.azure.Tenant}/oauth2/v2.0/token`;
    this.validUntil = null;
    this.token = null;
  }
  async getTokenAsync() {
    console.log('Getting azure ad token');
    if (this.token && this.validUntil > new Date()) {
      console.log('Using existing azure ad token');
      return this.token
    }
    console.log('Requesting a new azure ad token');
    const config = this.buildConfig();
    const requestTime = new Date();
    const response = await fetch(this.url, { method: 'POST', body: config })
    const json = await response.json();

    const token = json.access_token;
    const expiresInMilliSecs = json.expires_in * 1000;
    this.validUntil = new Date(requestTime.getTime() + expiresInMilliSecs);
    this.token = token;
    console.log('Using a new token');
    return this.token;
  }
  buildConfig() {
    const params = new URLSearchParams();
    params.append('client_id', this.configuration.azure.Client);
    params.append('scope', "499b84ac-1321-427f-aa17-267ca6975798/.default");
    params.append('client_secret', this.configuration.azure.Secret);
    params.append('username', this.configuration.azure.Username);
    params.append('password', this.configuration.azure.Password);
    params.append('grant_type', 'password');
    return params;
  }
}

export default AzureAdClient;