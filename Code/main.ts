import azureDevOpsApi from "./azuredevopsClient";
import { Scope } from "./AzureDevopsApiObjects/Scope";
import Configuration from "./configuration";

async function main() {
  const configuration = new Configuration();
  configuration.loadFromEnv();
  const azureDevopsClient = new azureDevOpsApi(configuration);
  const pats = await azureDevopsClient.listPatsAsync();
  console.log(pats);
  const createdPat = await azureDevopsClient.createPatAsync({
    allOrgs: true,
    displayName: 'A test pat',
    scope: Scope.Code__full,
    validTo: new Date(Date.now() + HoursToMiliseconds(2)).toISOString()
  });
  console.log(createdPat);

  const detailsOfPat = await azureDevopsClient.getPatAsync(createdPat.patToken.authorizationId);
  console.log(detailsOfPat);

  const updatedPat = await azureDevopsClient.updatePatAsync({
    allOrgs: true,
    authorizationId: createdPat.patToken.authorizationId,
    displayName: 'An updated pat',
    scope: Scope.FullAccess,
    validTo: new Date(Date.now() + HoursToMiliseconds(12)).toISOString(),
  });
  console.log(updatedPat);

  const deletePat = await azureDevopsClient.revokePatAsync(createdPat.patToken.authorizationId);
  console.log(`Pat has been deleted: ${deletePat}`);
}


main()
  .catch(err => console.log(err, true))
  .then(_ => process.exit());

function HoursToMiliseconds(hours: number): number {
  return 2 * 60 * 60 * 1000;
}
