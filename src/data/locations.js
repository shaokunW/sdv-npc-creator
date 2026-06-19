// 地图数据库。id 是游戏内部地图名（直接写进 Home.Location），
// tile 是一个合理的默认落脚坐标，这样小白完全不用关心坐标数字。
// 进阶用户仍可在「高级」里手动改坐标。
export const LOCATIONS = [
  { id: "Town", zh: "鹈鹕镇", en: "Pelican Town", tile: { x: 30, y: 60 } },
  { id: "Beach", zh: "海滩", en: "Beach", tile: { x: 38, y: 30 } },
  { id: "Mountain", zh: "山区", en: "Mountain", tile: { x: 30, y: 25 } },
  { id: "Forest", zh: "森林", en: "Cindersap Forest", tile: { x: 70, y: 25 } },
  { id: "BusStop", zh: "公交车站", en: "Bus Stop", tile: { x: 20, y: 15 } },
  { id: "Backwoods", zh: "后山小道", en: "Backwoods", tile: { x: 20, y: 20 } },
  { id: "Railroad", zh: "铁路", en: "Railroad", tile: { x: 35, y: 45 } },
  { id: "Woods", zh: "秘密森林", en: "Secret Woods", tile: { x: 25, y: 20 } },
  { id: "Desert", zh: "沙漠", en: "Calico Desert", tile: { x: 35, y: 40 } },
];
