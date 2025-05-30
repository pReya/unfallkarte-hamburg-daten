import { spawnSync } from "node:child_process";
import { readdirSync, lstatSync } from "node:fs";
import { join, extname } from "node:path";
import {
  dateFormat,
  globalIds,
  gpsDecimalPoints,
  sqliteUtilsCommand,
  trimTextFields,
} from "./src/steps.ts";

const isCsvFile = (fileName: string) => {
  const isFile = lstatSync(fileName).isFile();
  const isRelevantExtension = CSV_FILETYPES.includes(extname(fileName));
  return isFile && isRelevantExtension;
};

const DB_NAME = "processed.db";
const DB_TABLE_NAME = "accidents";
const CSV_FOLDER = "../raw/";
const CSV_FILETYPES = [".csv", ".tsv", ".txt"];

console.log(
  `-- Importing Data from ${CSV_FOLDER} folder into SQLite ${DB_NAME} --`
);

const folderContent = readdirSync(CSV_FOLDER)
  .map((fileName) => {
    return join(CSV_FOLDER, fileName);
  })
  .filter(isCsvFile);

console.log(`Found ${folderContent.length} files: ${folderContent.join(", ")}`);

// STEP 1: CREATE NEW DATABASE
console.log(`Creating new Database: ${DB_NAME}`);
const createDb = spawnSync("sqlite-utils", ["create-database", DB_NAME], {
  stdio: "inherit",
});

if (createDb.status !== 0) {
  throw new Error("Could not create Database");
}

// STEP 2: INSERT DATA INTO NEW DATABASE
// sqlite-utils insert clean/clean.db 2016 raw/2016.txt --tsv --detect-types

for (let fileIndex = 0; fileIndex < folderContent.length; fileIndex++) {
  const filename = folderContent[fileIndex];
  console.log(
    `(${fileIndex + 1}/${folderContent.length}): Importing ${filename}`
  );
  let typeFlag = "--tsv";

  if (filename.endsWith("csv")) {
    typeFlag = "--sniff";
  }

  const importFileProcess = sqliteUtilsCommand([
    "insert",
    DB_NAME,
    DB_TABLE_NAME,
    filename,
    typeFlag,
    "--detect-types",
    "--alter",
  ]);

  if (importFileProcess.status !== 0) {
    throw new Error(`Could not insert ${filename} into ${DB_TABLE_NAME}`);
  }

  sqliteUtilsCommand(["tables", DB_NAME, "--counts"]);
}

// STEP 3: Data cleansing
trimTextFields(DB_NAME, DB_TABLE_NAME);
gpsDecimalPoints(DB_NAME, DB_TABLE_NAME);
dateFormat(DB_NAME, DB_TABLE_NAME);

// STEP 4: Add globally unique ID and use as primary key
globalIds(DB_NAME, DB_TABLE_NAME);
