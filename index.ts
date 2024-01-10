import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

// explanation: the app is started from the client folder, the server files are bundled up as middleware by vite.
// because of this, dotenv by default thinks that the .env is within the client folder.
// therefore we have to specify the path to server folder's .env here:
dotenv.config({ path: "../native-land-web-server/.env" });

export const app = express();

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: process.env.POSTGRES_PORT,
});

app.get("/api/feature/:slug", async (request, response) => {
  try {
    const result = await pool.query(
      "SELECT name, polygon, polygon_style, pronunciation, sources, changelog, category, official_websites, created_at, last_modified_at, wordpress_created_at, wordpress_last_modified_at, related FROM features WHERE slug=$1",
      [request.params.slug]
    );
    response.status(200).json({ data: result.rows[0] });
  } catch (error) {
    console.error(error);
  }
});
