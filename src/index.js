const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");

const app = express();

app.get("/", async (req, res, next) => {
  const sql = await getDbClient();
  const [results] = await sql`select now()`;
  const delta = (results.now.getTime() - Date.now()) / 1000;
  return res.status(200).json({
    message: "Hello from root!",
    results: results.now,
    delta: delta,
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
