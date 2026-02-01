import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { ENV } from "../config/env";

if (!ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

//initialize pg connection pool
const pool = new Pool({
    connectionString: ENV.DATABASE_URL,
});

//log when first connection is made
pool.on("connect", () => {
    console.log("Connected to the database successfully");
});
//log when an error occurs
pool.on("error", (err) => {
    console.error("Unexpected database connection error", err);
});

export const db = drizzle({client: pool, schema });

//what is connection pool?
//A connection pool is a cache of database connections that can be reused for future
//  requests, rather than opening a new connection every time a database access is 
// required. This improves performance and resource utilization.