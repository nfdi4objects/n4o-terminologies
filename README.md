Dieses Repository enthält eine minimale HTML-Seite um die Liste der [N4O-Terminologien aus BARTOC](https://bartoc.org/en/node/18961) anzuzeigen.

Ein Snapshot der Daten in RDF ist auh unter <https://graph.nfdi4objects.net/terminology/> verfügbar.

Eine alternative, umfangreichere Möglichkeit zur Darstellung ist die Webanwendung [jskos-proxy](https://github.com/gbv/jskos-proxy#readme) (noch nicht umgesetzt).

Das Repository enthält folgende Skripte (Dependencies installieren mit `npm install`):

`jskos2pg.js` - Konvertiert Normdatensatz (JSKOS Concept) nach PG Format, woraus u.A. Cypher-Kommandos erstellt werden können. Beispielaufruf:

~~~sh
npm run -s jskos2pg -- https://api.dante.gbv.de/export/download/kenom_material/default/kenom_material__default.jskos.jsonld | pgraph -t cypherl --id uri
~~~
