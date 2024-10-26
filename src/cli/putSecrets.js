// github action CLI command
// tsx src/cli/putSecrets.js <stage> <dbUrl>
require("dotenv").config();
const secrets = require("../lib/secrets");

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log("Usage: tsx src/cli/putSecrets.js <stage> <dbUrl>");
  process.exit(1);
}

if (require.main === module) {
  console.log("Updating Db Url!");

  const [stage, dbUrl] = args;
  secrets
    .putDatabaseUrl(stage, dbUrl)
    .then((val) => {
      console.log("VALUEESS:", val);
      console.log(`Secret set`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(`Secret not set: ${err}`);
      process.exit(1);
    });
}
