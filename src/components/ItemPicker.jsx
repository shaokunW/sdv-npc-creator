import { useState, useMemo, useRef, useEffect } from "react";
import { ITEMS } from "../data/items";
import { CATEGORIES } from "../data/categories";

// 把物品和分类合成一个可搜索的池子。分类用 kind:"cat" 区分，显示时带标签。
const POOL = [
  ...CATEGORIES.map((c) => ({ ...c, kind: "cat" })),
  ...ITEMS.map((i) => ({ ...i, kind: "item" })),
];
const BY_ID = new Map(POOL.map((p) => [String(p.id), p]));

// 把一个 ID 解析成可显示的名字；不在数据库里的（自定义/未收录）显示原始 ID。
function resolve(id) {
  const hit = BY_ID.get(String(id));
  if (hit) return { id, label: `${hit.zh} · ${hit.en}`, kind: hit.kind };
  return { id, label: `ID ${id}`, kind: "unknown" };
}

// value 是空格分隔的 ID 字符串（生成器要的就是这个格式）。
export default function ItemPicker({ label, value, onChange }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const selected = useMemo(
    () => (value || "").trim().split(/\s+/).filter(Boolean),
    [value]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return POOL.filter((p) => {
      if (selected.includes(String(p.id))) return false;
      return (
        p.zh.toLowerCase().includes(q) ||
        p.en.toLowerCase().includes(q) ||
        String(p.id).includes(q)
      );
    }).slice(0, 8);
  }, [query, selected]);

  useEffect(() => {
    const onDoc = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const add = (id) => {
    onChange([...selected, String(id)].join(" "));
    setQuery("");
  };
  const remove = (id) => {
    onChange(selected.filter((s) => s !== String(id)).join(" "));
  };
  // 允许直接输入一个未收录的 ID 后回车加入（兼容自定义/模组物品）。
  const onKey = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      if (results[0]) add(results[0].id);
      else if (/^-?\d+$/.test(query.trim())) add(query.trim());
    }
  };

  return (
    <div className="picker" ref={boxRef}>
      <span className="field-label">{label}</span>
      <div className="chips">
        {selected.map((id) => {
          const r = resolve(id);
          return (
            <span key={id} className={`chip chip-${r.kind}`}>
              {r.label}
              <button type="button" onClick={() => remove(id)} aria-label="移除">×</button>
            </span>
          );
        })}
        {selected.length === 0 && <span className="chips-empty">未选择</span>}
      </div>
      <div className="picker-input">
        <input
          value={query}
          placeholder="搜中文 / 英文 / ID，回车加入"
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
        />
        {open && results.length > 0 && (
          <ul className="results">
            {results.map((p) => (
              <li key={p.id} onClick={() => add(p.id)}>
                <span className="r-name">{p.zh} <span className="r-en">{p.en}</span></span>
                <span className={`r-tag r-tag-${p.kind}`}>
                  {p.kind === "cat" ? "分类" : `#${p.id}`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
