import database from "infra/database.js";
import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  if (request.method !== "GET" && request.method !== "POST") {
    return response.status(405).end();
  }
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    verbose: true,
    migrationsTable: "pgmigrations",
    direction: "up",
  };

  if (request.method === "GET") {
    console.log("Entrou no método GET");
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    dbClient.end();
    response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    console.log("Entrou no método POST");
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    dbClient.end();
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }
}
