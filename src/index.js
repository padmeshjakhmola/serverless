const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");
const crud = require("./db/crud");
const validators = require("./db/validators");

const app = express();
app.use(express.json());

const STAGE = process.env.STAGE || "prod";

app.get("/", async (req, res, next) => {
  const sql = await getDbClient();
  const [results] = await sql`select now()`;
  const delta = (results.now.getTime() - Date.now()) / 1000;
  return res.status(200).json({
    results: results.now,
    delta: delta,
    stage: STAGE,
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/leads", async (req, res, next) => {
  const results = await crud.listLeads();
  return res.status(200).json({
    results: results,
  });
});
app.get("/leads/:id", async (req, res, next) => {
  const id = req.params.id;
  const result = await crud.getLeads(id);
  return res.status(200).json({
    result: result,
  });
});
app.post("/leads", async (req, res, next) => {
  const emailData = await req.body;
  // const { email } = emailData;
  const { data, hasError, message } = await validators.validateLead(emailData);

  if (hasError === true) {
    return res.status(400).json({
      message: message ? message : "Invalid. Please try again",
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      message: "server_error",
    });
  }

  const result = await crud.newLead(emailData);
  // insert data to the DB
  return res.status(201).json({
    body: emailData,
    results: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
