Korrekturen:

## 2016.txt
- LfNr 27207 hat im Feld `Ziff` den Wert "L1", welcher keiner gültigen Kennziffer für Ortsteile entspricht. Anhand der GPS-Koordinaten wurde manuell auf "416" korrigiert

```sql
UPDATE "2016" SET "Zif" = '416' WHERE "LfNr" = '27207';
```

## 2018.txt
- Das Zahlenformat der GPS-Koordinaten ist ungültig (Der Punkt ist hier sowohl als Dezimaltrennzeichen als auch als Tausendertrennzeichen gesetzt). Dank fester Anzahl von Nachkommastellen kann das leicht korrigiert werden:

- Alle Punkte entfernen:
```sql
UPDATE "2018"
SET "Koord.x"=replace("Koord.x", ".", "")
WHERE "Koord.x" LIKE '%.%.%';

UPDATE "2018"
SET "Koord.y"=replace("Koord.y", ".", "")
WHERE "Koord.y" LIKE '%.%.%';
```

- Neuen Punkt setzen:
```sql
UPDATE "2018"
SET "Koord.x" = CONCAT(SUBSTR("Koord.x",-6,-2), ".", SUBSTR("Koord.x",-6))
WHERE "Koord.x" NOT LIKE '%.%';

UPDATE "2018"
SET "Koord.y" = CONCAT(SUBSTR("Koord.y",-6,-2), ".", SUBSTR("Koord.y",-6))
WHERE "Koord.y" NOT LIKE '%.%';
```


## 2019.xlsx
- Die Daten liegen nur als Excel-Datei vor und müssen nach csv konvertiert werden (manuell via MS Excel)
- Das Zahlenformat der GPS-Koordinaten ist ungültig (siehe 2018)
- Right Trim

## Parse Formats
- Parse Dates
```sh
sqlite-utils convert clean/clean.db 2012 Datum \
  'r.parsedate(value)'
```

- Left Trim 2021 and 2022
```sql
UPDATE "2021"
SET Zif=ltrim(Zif),
	Zeit=ltrim(Zeit),
	WoTag=ltrim(WoTag),
	Urs03=ltrim(Urs03),
	Urs02=ltrim(Urs02),
	Urs01=ltrim(Urs01),
	Unf_Typ=ltrim(Unf_Typ),
	Typ=ltrim(Typ),
	Tag=ltrim(Tag),
	SZ=ltrim(SZ),
	Sv=ltrim(Sv),
	Str_Zus=ltrim(Str_Zus),
	OrdNr=ltrim(OrdNr),
	OL=ltrim(OL),
	NrBu=ltrim(NrBu),
	Mt=ltrim(Mt),
	M=ltrim(M),
	LZ=ltrim(LZ),
	Lv=ltrim(Lv),
	Licht=ltrim(Licht),
	LfNr=ltrim(LfNr),
	L=ltrim(L),
	Kz_Bet2=ltrim(Kz_Bet2),
	Kz_Bet1=ltrim(Kz_Bet1),
	"Koord.y"=ltrim("Koord.y"),
	"Koord.x"=ltrim("Koord.x"),
	Kl=ltrim(Kl),
	Kat=ltrim(Kat),
	Jahr=ltrim(Jahr),
	Gt=ltrim(Gt),
	Geschl_02=ltrim(Geschl_02),
	Geschl_01=ltrim(Geschl_01),
	Gemeinde=ltrim(Gemeinde),
	Fahrtrichtung=ltrim(Fahrtrichtung),
	Datum=ltrim(Datum),
	Char3=ltrim(Char3),
	Char2=ltrim(Char2),
	Char1=ltrim(Char1),
	Bet_02=ltrim(Bet_02),
	Bet_01=ltrim(Bet_01),
	Bet=ltrim(Bet),
	Beso3=ltrim(Beso3),
	Beso2=ltrim(Beso2),
	Beso1=ltrim(Beso1),
	BAB_Km=ltrim(BAB_Km),
	AV2=ltrim(AV2),
	AV1=ltrim(AV1),
	Art=ltrim(Art),
	Alter_02=ltrim(Alter_02),
	Alter_01=ltrim(Alter_01),
	AH=ltrim(AH);
```

- Datum formatieren:
```sh
sqlite-utils convert clean/clean.db 2023 Datum 'r.parsedate(value)'
```

```sql
CREATE TABLE combined as SELECT * FROM "2009" WHERE 0;

INSERT INTO combined
SELECT * FROM "2009"
UNION 
SELECT * FROM "2010"
UNION 
SELECT * FROM "2011"
UNION 
SELECT * FROM "2012"
UNION 
SELECT * FROM "2013"
UNION 
SELECT * FROM "2014"
UNION 
SELECT * FROM "2015"
UNION 
SELECT * FROM "2016"
UNION 
SELECT * FROM "2017"
UNION 
SELECT * FROM "2018"
UNION 
SELECT * FROM "2019"
UNION 
SELECT * FROM "2020"
UNION
SELECT * FROM "2021"
UNION
SELECT * FROM "2022"
UNION
SELECT * FROM "2023";
```