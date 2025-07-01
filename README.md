# Harmonisierter Datensatz über Verkehrsunfälle in Hamburg von 2009 bis 2024

Dieses Repository beinhaltet die Rohdaten inkl. Geokoordinaten über alle Verkehrsunfälle in Hamburg zwischen 2009 und 2024 aus der polizeilichen Unfalldatenbank EUSKa (Elektronische Unfalltypensteckkarte). Die Quelle der Daten sind verschiedene IFG-Anfragen (alle weiter unten verlinkt). Die Daten in diesem Repository wurden lediglich kombiniert, in ein einheitliches Format gebracht, und (eindeutige) Fehler korrigiert.

Die bereinigten Daten finden sich immer in Form einer SQLite-Datenbank als Artefakt [unter dem neusten Workflow-Durchlauf](https://github.com/pReya/unfallkarte-hamburg-daten/actions).

## Übersicht
| Jahr | Datei/Anfrage | Unfälle |
|------|---------------|---------|
| 2009 |Geodaten2009anonymisiert.txt<br>[Geodaten2009_2011anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106840)|63631|
| 2010 |Geodaten2010anonymisiert.txt<br>[Geodaten2009_2011anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106840)|64347|
| 2011 |Geodaten2011anonymisiert.txt<br>[Geodaten2009_2011anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106840)|66139|
| 2012 |Geodaten2012anonymisiert.txt<br>[Geodaten2012_2014anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106841)|65762|
| 2013 |Geodaten2013anonymisiert.txt<br>[Geodaten2012_2014anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106841)|65045|
| 2014 |Geodaten2014anonymisiert.txt<br>[Geodaten2012_2014anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106841)|65752|
| 2015 |Geodaten2015anonymisiert.txt<br>[Geodaten2015_2017anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106842)|67227|
| 2016 |Geodaten2016anonymisiert.txt<br>[Geodaten2015_2017anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106842)|68451|
| 2017 |Geodaten2017anonymisiert.txt<br>[Geodaten2015_2017anonymisiert.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg/#nachricht-106842)|67918|
| 2018 |2019-05-10_Reduzierter Datensatz und Unfallliste HH2018.txt<br>[2019-05-10_ReduzierterDatensatzundUnfalllisteHH2018.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg-im-jahre-2018/#nachricht-367376)|67558|
| 2019 |200312_BriefSP31Vfg._GeodatenzuVerkehrsunfllen2019_Anlage_Datensatz.xlsx<br>[200312_BriefSP31Vfg._GeodatenzuVerkehrsunfllen2019_Anlage_Datensatz.xlsx](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg-im-jahre-2019/#nachricht-470737)|68887|
| 2020 |ReduzierterDatensatzundUnfalllisteHH2020.txt<br>[ReduzierterDatensatzundUnfalllisteHH2020.txt](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfallen-in-hamburg-im-jahre-2020/#nachricht-569893)|58137|
| 2021 |Reduzierter Datensatz und Unfallliste2021.csv<br>[reduzierterdatensatzundunfallliste2021plerlaeuterung.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfaellen-in-hamburg-im-jahre-2022/#nachricht-771669)|59463|
| 2022 |Reduzierter Datensatz und Unfallliste2022.csv<br>[reduzierterdatensatzundunfallliste2022plerlaeuterung.zip](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfaellen-in-hamburg-im-jahre-2022/#nachricht-771668)|60957|
| 2023 |reduzierterdatensatzundunfallliste-2023.csv<br>[reduzierterdatensatzundunfallliste-2023.csv](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfaellen-in-hamburg-im-jahre-2023/#nachricht-937383)|63597|
| 2024 |reduzierterdatensatzundunfallliste.xlsx<br>[reduzierterdatensatzundunfallliste.xlsx](https://fragdenstaat.de/anfrage/geodaten-zu-verkehrsunfaellen-in-hamburg-im-jahre-2024/#nachricht-1002692)|64075|
| **Gesamt** | |1036946|

## Lizenz
**Ich bin nicht der Urheber dieser Daten.** Sie stammen alle aus den o.g. IFG-Anfragen und es wurde dort keine explizite Lizenz angegeben. Daher weiß ich nicht, unter welcher Lizenz diese Daten stehen (für entsprechende Hinweise bin ich dankbar).

## Bereinigungen/Modifikationen
- In den Rohdaten im Jahr 2019 sind die Spalten `WoTag` und `TagebuchNr` dazugekommen. Ab 2020 wurde `TagebuchNr` wieder entfernt (ist also nur für ein Jahr vorhanden).

- LfNr 27207 im Jahr 2016 hat im Feld `Ziff` den Wert "L1", welcher keiner gültigen Kennziffer für Ortsteile entspricht. Anhand der GPS-Koordinaten wurde manuell auf "416" korrigiert

```sql
UPDATE "accidents" SET "Zif" = '416' WHERE "LfNr" = '27207' AND "Jahr" = 2016;
```

- Das Zahlenformat vieler GPS-Koordinaten ist ungültig (der Punkt wird hier sowohl als Dezimaltrennzeichen als auch als Tausendertrennzeichen gesetzt). Dank fester Anzahl von Nachkommastellen kann das leicht korrigiert werden.

- Alle Textfelder wurden von führendem und folgendem Whitespace befreit (trim).

- Das Datumsformat wurde vereinheitlicht zu `YYYY-MM-DD`

- Es wurde eine global eindeutige ID in der Spalte `GlobalId` hinzugefügt (zusammengesetzt aus `Jahr` und `LfNr`).
