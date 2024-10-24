// Creating data and retreving data
const client = require("./clients");
const schema = require("./schemas");
const { desc, eq } = require("drizzle-orm");

async function newLead({ email }) {
  const db = await client.getDrizzelDbClient();
  const result = await db
    .insert(schema.LeadTabel)
    .values({
      email: email,
    })
    .returning
    //   {
    //   timestamp: schema.LeadTabel.createdAt,
    //   newEmail: schema.LeadTabel.email,
    // }
    ();
  // console.log(db);
  // if (result.length === 1) {
  //   return result[0];
  // }
  return result;
}

async function listLeads() {
  const db = await client.getDrizzelDbClient();
  const results = await db
    .select()
    .from(schema.LeadTabel)
    .orderBy(desc(schema.LeadTabel.createdAt))
    .limit(10);

  return results;
}

async function getLeads(id) {
  const db = await client.getDrizzelDbClient();
  const result = await db
    .select()
    .from(schema.LeadTabel)
    .where(eq(schema.LeadTabel.id, id));

  if (result.length === 1) {
    return result[0];
  }

  return null;
}

module.exports.newLead = newLead;
module.exports.listLeads = listLeads;
module.exports.getLeads = getLeads;
