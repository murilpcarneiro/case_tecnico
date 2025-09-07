import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqliteClient = new Database(process.env.DB_FILE_NAME! || "db.sqlite");

export const db = drizzle(sqliteClient);

migrate(db, { migrationsFolder: "./drizzle" });
