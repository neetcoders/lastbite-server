import dotenv from "dotenv";
dotenv.config();

import express, { Express } from "express";
import cors from "cors";

import router from "./api/api.route";

const app: Express = express();
const port = process.env.PORT;

app.use(cors({
  origin: ["http://localhost:3000", "https://lastbite-web-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
}));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at PORT ${port}`);
});