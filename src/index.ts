import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (_: Request, res: Response) => {
  res.send("Express + Typescript Server!");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at PORT ${port}`);
});