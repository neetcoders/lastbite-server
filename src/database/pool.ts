import fs from "fs";
import path from "path";

import { Pool } from "pg";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.resolve(process.cwd(), "./certs/pg-digitalocean.crt")).toString()
  }
});

export default pool;
