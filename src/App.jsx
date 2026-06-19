import { useState, useEffect, useMemo } from "react";
import { packMod } from "./generator/packMod";
import { checkImage } from "./validators/imageSize";
import { LOCATIONS } from "./data/locations";
import ItemPicker from "./components/ItemPicker";

const SEASONS = [
  { v: "spring", label: "春", dot: "#7FB069" },
  { v: "summer", label: "夏", dot: "#E8B23A" },
  { v: "fall", label: "秋", dot: "#C9702B" },
  { v: "winter", label: "冬", dot: "#8FB8D6" },
];

const INITIAL = {
  author: "", name: "", birthSeason: "spring", birthDay: 15,
  gender: "Female", age: "Adult", manner: "Neutral", socialAnxiety: "Outgoing",
  optimism: "Positive", homeLocation: "Town", homeX: 30, homeY: 60,
  introduction: "", dialogueMon: "",
  giftLove: "", giftLike: "", giftDislike: "", giftHate: "",
};

function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

export default function App() {
  const [npc, setNpc] = useState(INITIAL);
  const [sprite, setSprite] = useState(null);
  const [portrait, setPortrait] = useState(null);
  const [spriteCheck, setSpriteCheck] = useState({ state: "empty", msg: "尚未选择图片" });
  const [portraitCheck, setPortraitCheck] = useState({ state: "empty", msg: "尚未选择图片" });
  const [busy, setBusy] = useState(false);
  const [showCoords, setShowCoords] = useState(false);

  const set = (k) => (e) => setNpc((p) => ({ ...p, [k]: e.target.value }));
  const setGift = (k) => (v) => setNpc((p) => ({ ...p, [k]: v }));

  const onLocation = (e) => {
    const loc = LOCATIONS.find((l) => l.id === e.target.value);
    setNpc((p) => ({ ...p, homeLocation: loc.id, homeX: loc.tile.x, homeY: loc.tile.y }));
  };

  useEffect(() => { checkImage(sprite, 16, 32).then(setSpriteCheck); }, [sprite]);
  useEffect(() => { checkImage(portrait, 64, 64).then(setPortraitCheck); }, [portrait]);

  const portraitURL = useMemo(
    () => (portrait ? URL.createObjectURL(portrait) : null), [portrait]
  );
  useEffect(() => () => portraitURL && URL.revokeObjectURL(portraitURL), [portraitURL]);

  const season = SEASONS.find((s) => s.v === npc.birthSeason);
  const ready = npc.name.trim() && sprite && portrait;

  async function onGenerate() {
    setBusy(true);
    try { await packMod(npc, sprite, portrait); }
    finally { setBusy(false); }
  }

  return (
    <div className="app">
      <header className="masthead">
        <p className="eyebrow">Stardew Valley · Content Patcher</p>
        <h1>新村民生成器</h1>
        <p className="sub">填好资料、放上图，导出一个能直接丢进 <code>Mods/</code> 的村民。</p>
      </header>

      <main className="layout">
        <div className="form">
          <section className="card">
            <h2 className="section-head"><span className="num">01</span> 身份</h2>
            <div className="grid2">
              <Field label="作者名" hint="用于生成 mod 的唯一 ID">
                <input value={npc.author} onChange={set("author")} placeholder="你的昵称" />
              </Field>
              <Field label="村民名字" hint="游戏内显示名">
                <input value={npc.name} onChange={set("name")} placeholder="Jane" />
              </Field>
            </div>
            <div className="grid3">
              <Field label="生日 · 季节">
                <select value={npc.birthSeason} onChange={set("birthSeason")}>
                  {SEASONS.map((s) => <option key={s.v} value={s.v}>{s.label}</option>)}
                </select>
              </Field>
              <Field label="生日 · 日期">
                <input type="number" min="1" max="28" value={npc.birthDay} onChange={set("birthDay")} />
              </Field>
              <Field label="性别">
                <select value={npc.gender} onChange={set("gender")}>
                  <option value="Female">女</option>
                  <option value="Male">男</option>
                  <option value="Undefined">未定义</option>
                </select>
              </Field>
            </div>
          </section>

          <section className="card">
            <h2 className="section-head"><span className="num">02</span> 性格与居所</h2>
            <div className="grid2">
              <Field label="年龄段">
                <select value={npc.age} onChange={set("age")}>
                  <option value="Adult">成人</option>
                  <option value="Teen">青少年</option>
                  <option value="Child">儿童</option>
                </select>
              </Field>
              <Field label="礼貌">
                <select value={npc.manner} onChange={set("manner")}>
                  <option value="Neutral">中立</option>
                  <option value="Polite">礼貌</option>
                  <option value="Rude">粗鲁</option>
                </select>
              </Field>
              <Field label="社交">
                <select value={npc.socialAnxiety} onChange={set("socialAnxiety")}>
                  <option value="Neutral">中立</option>
                  <option value="Outgoing">外向</option>
                  <option value="Shy">害羞</option>
                </select>
              </Field>
              <Field label="心态">
                <select value={npc.optimism} onChange={set("optimism")}>
                  <option value="Neutral">中立</option>
                  <option value="Positive">乐观</option>
                  <option value="Negative">悲观</option>
                </select>
              </Field>
            </div>
            <div style={{ marginTop: 14 }}>
              <Field label="居住地图" hint="村民出生与睡觉的地方">
                <select value={npc.homeLocation} onChange={onLocation}>
                  {LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id}>{l.zh}（{l.en}）</option>
                  ))}
                </select>
              </Field>
            </div>
            <button type="button" className="advanced-toggle" onClick={() => setShowCoords((s) => !s)}>
              {showCoords ? "▾" : "▸"} 高级：手动微调落脚坐标（可不管）
            </button>
            {showCoords && (
              <div className="grid2" style={{ marginTop: 10 }}>
                <Field label="格子 X"><input type="number" value={npc.homeX} onChange={set("homeX")} /></Field>
                <Field label="格子 Y"><input type="number" value={npc.homeY} onChange={set("homeY")} /></Field>
              </div>
            )}
          </section>

          <section className="card">
            <h2 className="section-head"><span className="num">03</span> 图像</h2>
            <div className="grid2">
              <Upload label="行走精灵图" spec="每帧 16 × 32" check={spriteCheck} onPick={setSprite} />
              <Upload label="对话立绘" spec="每张 64 × 64" check={portraitCheck} onPick={setPortrait} />
            </div>
          </section>

          <section className="card">
            <h2 className="section-head"><span className="num">04</span> 对话</h2>
            <Field label="初次见面台词" hint="留空则自动生成一句">
              <textarea rows="2" value={npc.introduction} onChange={set("introduction")} placeholder="你好，我是…" />
            </Field>
            <Field label="周一台词" hint="可加 $h 显示开心表情">
              <textarea rows="2" value={npc.dialogueMon} onChange={set("dialogueMon")} placeholder="周一过得真慢呢。$h" />
            </Field>
          </section>

          <section className="card">
            <h2 className="section-head"><span className="num">05</span> 礼物口味</h2>
            <p className="mini">搜中文、英文或 ID 都行。选「分类」可一次涵盖整类（如「所有水果」）。</p>
            <div className="pickers">
              <ItemPicker label="喜爱" value={npc.giftLove} onChange={setGift("giftLove")} />
              <ItemPicker label="喜欢" value={npc.giftLike} onChange={setGift("giftLike")} />
              <ItemPicker label="不喜欢" value={npc.giftDislike} onChange={setGift("giftDislike")} />
              <ItemPicker label="讨厌" value={npc.giftHate} onChange={setGift("giftHate")} />
            </div>
          </section>
        </div>

        <aside className="preview">
          <div className="villager-card">
            <p className="eyebrow">预览</p>
            <div className="frame">
              {portraitURL
                ? <span className="px" style={{ backgroundImage: `url(${portraitURL})` }} />
                : <span className="placeholder">?</span>}
            </div>
            <h3 className="vname">{npc.name.trim() || "无名村民"}</h3>
            <p className="vmeta">
              <span className="dot" style={{ background: season.dot }} />
              {season.label}月 {npc.birthDay} 日生
            </p>
            <button className="generate" disabled={!ready || busy} onClick={onGenerate}>
              {busy ? "打包中…" : "生成并下载 mod"}
            </button>
            {!ready && (
              <p className="need">还需要：{!npc.name.trim() ? "名字 " : ""}{!sprite ? "精灵图 " : ""}{!portrait ? "立绘" : ""}</p>
            )}
            <p className="howto">下载后解压到 <code>Stardew Valley/Mods/</code>，需已装 SMAPI 与 Content Patcher。</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

function Upload({ label, spec, check, onPick }) {
  return (
    <div className="upload">
      <span className="field-label">{label}</span>
      <label className="dropzone">
        <input type="file" accept="image/png" onChange={(e) => onPick(e.target.files?.[0] || null)} />
        <span className="dz-spec">{spec}</span>
        <span className="dz-cta">选择 PNG</span>
      </label>
      <span className={`status status-${check.state}`}>{check.msg}</span>
    </div>
  );
}
