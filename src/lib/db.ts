import { createPool, Pool } from "mysql2/promise";

// Create a database connection pool
let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    pool = createPool({
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER || "noevo",
      password: process.env.DB_PASSWORD || "noevopassword",
      database: process.env.DB_DATABASE || "noevo",
    });
  }
  return pool;
}
