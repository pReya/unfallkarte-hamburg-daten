# Harmonisierter Datensatz über Verkehrsunfälle in Hamburg von 2009 bis 2023


> [!WARNING]  
> Dieses Repository ist in einem "work in progress"-Zustand. Idealerweise müsste die Bereinigung/Aufbereitung der Daten komplett automatisiert und reproduzierbar erfolgen. Leider ist das aktuell noch nicht der Fall.

Dieses Repository beinhaltet die Rohdaten inkl. Geokoordinaten über alle Verkehrsunfälle in Hamburg zwischen 2009 und 2023. Die Quelle der Daten sind verschiedene IFG-Anfragen. Die Daten in diesem Repository wurden lediglich in ein einheitliches Format gebracht, und (eindeutige) Fehler korrigiert.

Die bereinigten Daten finden sich in Form einer SQLite Datenbank [unter "Releases"](https://github.com/pReya/unfallstatistik-hamburg-daten/releases).

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
| **Gesamt** | |972871|

## Lizenz
**Ich bin nicht der Urheber dieser Daten.** Sie stammen alle aus den o.g. IFG-Anfragen und es wurde dort keine explizite Lizenz angegeben. Daher weiß ich nicht, unter welcher Lizenz diese Daten stehen (für entsprechende Hinweise bin ich offen).