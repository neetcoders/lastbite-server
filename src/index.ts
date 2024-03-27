import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";

import router from "./api/api.route";

const app: Express = express();
const port = process.env.PORT;

app.use("/", router)

app.listen(port, () => {
  console.log(`[server]: Server is running at PORT ${port}`);
});