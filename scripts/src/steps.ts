import { spawnSync } from "node:child_process";
import queries from "./queries.ts";

// Wrapper for sqlite-utils command execution
export function sqliteUtilsCommand(command: string[], shell: boolean = false) {
  return spawnSync("sqlite-utils", command, {
    stdio: "inherit",
    shell,
  });
}

export function trimTextFields(db: string, table: string) {
  console.log(`Cleansing: Trimming all text fields`);
  // Trim all Text fields
  sqliteUtilsCommand(["query", db, queries.trim(table)]);
}

export function gpsDecimalPoints(db: string, table: string) {
  // Cleanse GPS Data

  console.log(`Cleansing: Consistent Koord.x value`);
  // Koord.x
  for (let i = 0; i < 4; i++) {
    sqliteUtilsCommand(["query", db, queries.coordinates[i](table, "x")]);
  }

  console.log(`Cleansing: Consistent Koord.y value`);
  // Koord.y
  for (let i = 0; i < 4; i++) {
    sqliteUtilsCommand(["query", db, queries.coordinates[i](table, "y")]);
  }
}

export function dateFormat(db: string, table: string) {
  console.log(`Cleansing: Consistent date format`);
  // Cleanse date formats
  sqliteUtilsCommand(
    ["convert", db, table, "Datum", "'r.parsedate(value)'"],
    true
  );
}

export function globalIds(db: string, table: string) {
  console.log(`Transformation: Creating globally unique IDs`);
  // Create globally unique ids from "Jahr" and "LfNr"
  sqliteUtilsCommand(["add-column", db, table, "GlobalId", "text"]);
  sqliteUtilsCommand(["query", db, queries.globalId(table)]);
  sqliteUtilsCommand(["transform", db, table, "--pk", "GlobalId"]);
}
