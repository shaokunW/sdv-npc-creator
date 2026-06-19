// Builds the Content Patcher manifest.json — the mod's "ID card".
const strip = (s) => (s || "").trim();
const idSafe = (s) => strip(s).replace(/[^A-Za-z0-9]/g, "") || "NPC";

export function buildManifest(npc) {
  const name = strip(npc.name) || "NPC";
  const author = strip(npc.author) || "Unknown";
  return {
    Name: `Custom NPC - ${name}`,
    Author: author,
    Version: "1.0.0",
    Description: `Adds ${name} to the valley.`,
    UniqueID: `${idSafe(author)}.${idSafe(name)}NPC`,
    ContentPackFor: {
      UniqueID: "Pathoschild.ContentPatcher",
      MinimumVersion: "2.0.0",
    },
  };
}
