import JSZip from "jszip";
import { buildManifest } from "./buildManifest";
import { buildContent } from "./buildContent";

// Assembles the whole mod folder in-memory and triggers a browser download.
// spriteFile / portraitFile are File objects from <input type="file">.
export async function packMod(npc, spriteFile, portraitFile) {
  const folderName = `[CP] ${(npc.name || "NPC").trim() || "NPC"}`;
  const zip = new JSZip();
  const root = zip.folder(folderName);

  root.file("manifest.json", JSON.stringify(buildManifest(npc), null, 2));
  root.file("content.json", JSON.stringify(buildContent(npc), null, 2));

  const assets = root.folder("assets");
  if (spriteFile) assets.file("sprite.png", spriteFile);
  if (portraitFile) assets.file("portrait.png", portraitFile);

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${folderName}.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
