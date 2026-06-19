// Reads an image's real pixel size and checks it tiles cleanly into frames.
// Walking sprites: frames are 16x32. Portraits: frames are 64x64.
// Non-blocking by design — returns a status the UI shows as a hint, it never
// stops the user from generating.
export function checkImage(file, frameW, frameH) {
  return new Promise((resolve) => {
    if (!file) {
      resolve({ state: "empty", msg: "尚未选择图片" });
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const okW = img.width % frameW === 0;
      const okH = img.height % frameH === 0;
      const ok = okW && okH;
      resolve({
        state: ok ? "ok" : "warn",
        width: img.width,
        height: img.height,
        msg: ok
          ? `${img.width}×${img.height} · 尺寸正确`
          : `应为 ${frameW}×${frameH} 的整数倍，当前 ${img.width}×${img.height}`,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ state: "warn", msg: "无法读取该图片" });
    };
    img.src = url;
  });
}
