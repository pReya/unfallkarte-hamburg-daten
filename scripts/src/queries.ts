export default {
  // Trim everything
  trim: (tableName: string) => {
    return `UPDATE "${tableName}"
SET Datum=trim(Datum),
Zeit=trim(Zeit),
"Koord.x"=trim("Koord.x"),
"Koord.y"=trim("Koord.y"),
NrBu=trim(NrBu),
Gemeinde=trim(Gemeinde),
Licht=trim(Licht),
Str_Zus=trim(Str_Zus),
Bet_01=trim(Bet_01),
Bet_02=trim(Bet_02),
Geschl_01=trim(Geschl_01),
Geschl_02=trim(Geschl_02),
Unf_Typ=trim(Unf_Typ),
Kz_Bet1=trim(Kz_Bet1),
Kz_Bet2=trim(Kz_Bet2),
Fahrtrichtung=trim(Fahrtrichtung),
WoTag=trim(WoTag);`;
  },
  // Normalize GPS coordinates
  coordinates: [
    (tableName: string, coord: "x" | "y") => {
      return `UPDATE "${tableName}" SET "Koord.${coord}"=replace("Koord.${coord}", ',', '.');`;
    },
    (tableName: string, coord: "x" | "y") => {
      return `UPDATE "${tableName}"
SET
  "Koord.${coord}"=
    concat(
      substr("Koord.${coord}", 1, (instr("Koord.${coord}", '.') - 1)),
      ',',
      substr("Koord.${coord}", (instr("Koord.${coord}", '.') + 1))
    );`;
    },
    (tableName: string, coord: "x" | "y") => {
      return `UPDATE "${tableName}" SET "Koord.${coord}"=replace("Koord.${coord}", '.', '');`;
    },
    (tableName: string, coord: "x" | "y") => {
      return `UPDATE "${tableName}" SET "Koord.${coord}"=replace("Koord.${coord}", ',', '.');`;
    },
  ],
  globalId: (tableName: string) =>
    `UPDATE "${tableName}" SET GlobalId = concat("Jahr",'-',"LfNr");`,
};
