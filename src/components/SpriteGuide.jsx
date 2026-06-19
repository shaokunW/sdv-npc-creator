// 给小白看的「图片内部怎么排」示意图。纯展示，无交互。

const DIRECTIONS = [
  { label: "↓ 下", frames: [0, 1, 2, 3] },
  { label: "→ 右", frames: [4, 5, 6, 7] },
  { label: "↑ 上", frames: [8, 9, 10, 11] },
  { label: "← 左", frames: [12, 13, 14, 15] },
];

export function SpriteGridGuide() {
  return (
    <div className="guide">
      <p className="guide-cap">
        一整张 <b>64 × 128</b>，4 行 × 4 列共 16 格（每格 16×32）。每行是一个朝向的 4 帧行走动画：
      </p>
      <div className="sprite-grid">
        {DIRECTIONS.map((d) => (
          <div className="sprite-row" key={d.label}>
            <span className="row-label">{d.label}</span>
            {d.frames.map((f) => (
              <span className="cell" key={f}>{f}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const EMOTIONS = [
  { n: 0, label: "中性" },
  { n: 1, label: "开心" },
  { n: 2, label: "伤心" },
  { n: 3, label: "特殊" },
  { n: 4, label: "爱慕" },
  { n: 5, label: "生气" },
];

export function PortraitGuide() {
  return (
    <div className="guide">
      <p className="guide-cap">
        最少只要 <b>第 0 格（64×64 中性脸）</b>。想要表情变化就按此顺序补满（2 列），全部六格为 128×192：
      </p>
      <div className="portrait-grid">
        {EMOTIONS.map((e) => (
          <span className={`pcell ${e.n === 0 ? "pcell-key" : ""}`} key={e.n}>
            <b>{e.n}</b> {e.label}
          </span>
        ))}
      </div>
    </div>
  );
}
