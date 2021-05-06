interface Azure {
  Tenant: string,
  Client: string,
  Secret: string,
  Username: string,
  Password: string
}
class Configuration {
  azure: Azure;
  organisation: string;
  constructor() {
    this.azure = {
      Tenant: '',
      Client: '',
      Secret: '',
      Username: '',
      Password: ''
    };

    this.organisation = ''
  }
  loadFromEnv() {
    console.log("Loading configuration from Environment...");
    this.azure.Client = this.validate('process.env.AZURE_CLIENT_ID', process.env.AZURE_CLIENT_ID);
    this.azure.Tenant = this.validate('process.env.AZURE_TENANT_ID', process.env.AZURE_TENANT_ID);
    this.azure.Secret = this.validate('process.env.AZURE_CLIENT_SECRET', process.env.AZURE_CLIENT_SECRET);
    this.azure.Username = this.validate('process.env.AZURE_USERNAME', process.env.AZURE_USERNAME);
    this.azure.Password = this.validate('process.env.AZURE_PASSWORD', process.env.AZURE_PASSWORD);

    this.organisation = this.validate('process.env.AZURE_DEVOPS_ORG', process.env.AZURE_DEVOPS_ORG);
  }
  validate(name: string, variable: string) {
    if (!variable) {
      throw `Environment variable expected : ${name}`;
    }
    return variable;
  }
}
export default Configuration;