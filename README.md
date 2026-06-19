# 星露谷 NPC 生成器（Stardew Valley NPC Creator）

一个纯前端的网页工具，让用户通过表单创建一个基础可对话的星露谷村民，
一键导出可直接安装的 Content Patcher mod。无后端、无数据库。

## 本地运行

```bash
npm install
npm run dev
```

打开终端给出的本地地址即可。

> 注意：不要直接双击 `index.html` 打开，ES 模块在 `file://` 下会被浏览器拦截。
> 必须通过 `npm run dev`（开发）或 `npm run preview`（预览构建产物）启动。

## 部署到 GitHub Pages

1. **改仓库名**：打开 `vite.config.js`，把 `base` 改成 `/你的仓库名/`（前后都要有斜杠）。这一步漏了，线上会白屏 + 资源 404。
2. 把代码推到 GitHub 的 `main` 分支（记得连 `package-lock.json` 一起提交，workflow 用了 `npm ci`）。
3. 仓库 **Settings → Pages → Source** 选成 **GitHub Actions**（只需设置一次）。
4. 之后每次 `git push` 到 `main` 会自动构建发布。地址为
   `https://你的用户名.github.io/你的仓库名/`。

## 生成的 mod 怎么用

下载的 `[CP] 名字.zip` 解压到 `Stardew Valley/Mods/`，需先安装：

- SMAPI（mod 加载器）
- Content Patcher

用 SMAPI 启动游戏，村民就会出现在所设地图（默认 Town）。

## 代码结构

```
src/
├─ App.jsx                 表单 + 预览 UI
├─ index.css               样式
├─ generator/
│  ├─ buildManifest.js     生成 manifest.json
│  ├─ buildContent.js      生成 content.json（核心数据结构）
│  └─ packMod.js           JSZip 打包 + 触发下载
└─ validators/
   └─ imageSize.js         精灵图 / 立绘尺寸校验
```

## 已知待完善（第一版范围之外）

当前是「基础可对话 NPC」：身份、性格、礼物、基础对话、固定居所。
尚未做：日程、好感度分级对话、可结婚、节日、剧情事件。

`buildContent.js` 里礼物口味字符串的分段顺序，发布前请对照官方 Wiki
*Modding:Gift taste data* 再核一遍——这是最容易写错的一处。

## 致谢

基于 ConcernedApe 的 Stardew Valley，使用 Pathoschild 的 Content Patcher。
