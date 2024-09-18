import anystream from "json-anystream"
import { pgformat } from "pgraphs"

const args = process.argv.slice(2)
const source = args.length ? args[0] : process.stdin
const format = "pg"

const stream = await anystream.make(source, "json")
for await (let concept of stream) {
  const { uri, notation, prefLabel, broader, mappings } = concept

  const edges = []

  const labels = ['Concept','E55_Type']
  const properties = {}
  if (notation?.length) {
    properties.notation = [notation[0]]
  }
  if (prefLabel) {
    properties.labelLang = Object.keys(prefLabel)
    properties.label = Object.values(prefLabel)
  }
  for (let m of (mappings||[])) {
    if (m.type[0] == "http://www.w3.org/2004/02/skos/core#exactMatch" && m.to.memberSet.length===1) {
      edges.push({
        from: uri,
        to: m.to.memberSet[0].uri,
        labels: ["exactMatch"]
      })
    }
  }
  for (let b of (broader||[])) {
    edges.push({
      from: uri,
      to: b.uri,
      labels: ["broader"]
    })
  }
  const graph = { nodes: [{ id:uri, labels, properties }], edges }
  console.log(pgformat[format].serialize(graph))
}
