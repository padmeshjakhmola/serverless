const serverless = require("serverless-http");
const express = require("express");

const { neon, neonConfig } = require("@neondatabase/serverless");

const app = express();

async function dbCLient() {
  //fr http connection and non-pooling
  neonConfig.fetchConnectionCache = true;
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

app.get("/", async (req, res, next) => {
  const sql = await dbCLient();
  const [results] = await sql`select now()`;
  return res.status(200).json({
    message: "Hello from root!",
    results: results.now,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
