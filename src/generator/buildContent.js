// Builds content.json — every "patch" the mod applies to the game.
const strip = (s) => (s || "").trim();
const idSafe = (s) => strip(s).replace(/[^A-Za-z0-9]/g, "") || "NPC";

// Turn "746, 344 18" into "746 344 18". Item IDs are space-separated;
// negative numbers are category IDs (e.g. -5 eggs, -6 milk, -7 cooked dishes).
const itemIds = (s) =>
  strip(s).replace(/[,，]/g, " ").replace(/\s+/g, " ").trim();

// NPCGiftTastes per-NPC format: 10 segments joined by "/", as 5 pairs of
// [reaction text, item ids] in the order Love / Like / Dislike / Hate / Neutral.
// Reaction text may be left empty — the game then uses generic reactions.
// VERIFY the exact segment order against the wiki's "Modding:Gift taste data"
// before you ship; it is the one field that is easy to get subtly wrong.
function buildGiftTastes(npc) {
  return [
    "", itemIds(npc.giftLove),
    "", itemIds(npc.giftLike),
    "", itemIds(npc.giftDislike),
    "", itemIds(npc.giftHate),
    "", "",
  ].join("/");
}

// Characters/Dialogue/<name>: a key -> line map. "$h" shows the happy portrait.
function buildDialogue(npc) {
  const out = {};
  const intro = strip(npc.introduction);
  const mon = strip(npc.dialogueMon);
  if (intro) out.Introduction = intro;
  if (mon) out.Mon = mon;
  if (Object.keys(out).length === 0) {
    out.Introduction = `Hi, I'm ${strip(npc.name) || "new around here"}.`;
  }
  return out;
}

export function buildContent(npc) {
  // Internal name. {{ModId}} is a Content Patcher token that expands to the
  // manifest's UniqueID, so this NPC can never collide with another mod's.
  const id = `{{ModId}}_${idSafe(npc.name)}`;

  return {
    Format: "2.0.0",
    Changes: [
      {
        Action: "EditData",
        Target: "Data/Characters",
        Entries: {
          [id]: {
            DisplayName: strip(npc.name) || "NPC",
            BirthSeason: npc.birthSeason,
            BirthDay: Number(npc.birthDay) || 1,
            Gender: npc.gender,
            Age: npc.age,
            Manner: npc.manner,
            SocialAnxiety: npc.socialAnxiety,
            Optimism: npc.optimism,
            HomeRegion: "Town",
            CanBeRomanced: false,
            // Where they spawn and sleep. Location must be a real map name.
            Home: [
              {
                Id: "Default",
                Location: strip(npc.homeLocation) || "Town",
                Tile: { X: Number(npc.homeX) || 30, Y: Number(npc.homeY) || 60 },
                Direction: "down",
              },
            ],
            TextureName: `Characters/${id}`,
            Size: { X: 16, Y: 32 },
          },
        },
      },
      {
        Action: "Load",
        Target: `Characters/${id}`,
        FromFile: "assets/sprite.png",
      },
      {
        Action: "Load",
        Target: `Portraits/${id}`,
        FromFile: "assets/portrait.png",
      },
      {
        Action: "EditData",
        Target: "Data/NPCGiftTastes",
        Entries: { [id]: buildGiftTastes(npc) },
      },
      {
        Action: "EditData",
        Target: `Characters/Dialogue/${id}`,
        Entries: buildDialogue(npc),
      },
    ],
  };
}
