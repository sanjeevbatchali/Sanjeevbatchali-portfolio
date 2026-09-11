import type { Config } from "drizzle-kit";

const databaseUrl =
  process.env.NETLIFY_DATABASE_URL ??
  process.env.NETLIFY_DB_URL ??
  process.env.DATABASE_URL;

const config = {
  out: "./netlify/database/migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  ...(databaseUrl ? { dbCredentials: { url: databaseUrl } } : {}),
} satisfies Config;

export default config;
