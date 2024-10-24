const { neon, neonConfig } = require("@neondatabase/serverless");
const secrets = require("../lib/secrets");
const { drizzle } = require("drizzle-orm/neon-http");

async function getDbClient() {
  const dbUrl = await secrets.getDatabaseUrl();

  // neonConfig.fetchConnectionCache = true;
  // deprecated (now always `true`)

  const sql = neon(dbUrl);
  return sql;
}

async function getDrizzelDbClient() {
  const sql = await getDbClient();
  return drizzle(sql);
}

module.exports.getDbClient = getDbClient;
module.exports.getDrizzelDbClient = getDrizzelDbClient;
