# Remotion 工作台（E:\Remotion）

React 编程式视频。配合 DSH 的 `dsh-remotion` 插件（12 个官方技能）使用。

## 产物去哪

**不要输出到本项目目录。** 成片写 `E:\成品视频\成片`，静帧/封面底图写 `E:\成品视频\素材\图片`。
最省事的办法是用成品目录里的包装脚本：

```powershell
& E:\成品视频\tools\render.ps1 -Composition HelloMotion -Name demo-ep01
& E:\成品视频\tools\still.ps1  -Composition HelloMotion -Frame 60 -Name demo-ep01-cover
```

脚本会自动 `cd` 到本工程、跑 `remotion render/still`、把结果写进规范目录并打印最终路径。

## 常用命令

```powershell
cd E:\Remotion
remotion studio                                   # 可视化预览（时间轴 + 热更新）
npm run out                                       # 渲染 HelloMotion → E:\成品视频\成片\hello.mp4
npm run out:still                                 # 第 60 帧 → E:\成品视频\素材\图片\hello.png

# 带目标的写法（推荐，名字换成你的集号）
remotion render HelloMotion "E:\成品视频\成片\demo-ep01.mp4"
remotion still  HelloMotion "E:\成品视频\素材\图片\demo-ep01-cover.png" --frame=60
```

## 结构

- `src/index.ts` — 注册入口
- `src/Root.tsx` — 合成（composition）清单：id / 尺寸 / 时长 / fps
- `src/Hello.tsx` — 样板：spring 入场 + `@remotion/motion-blur` 动态模糊（双采质感的起点）
- `remotion.config.ts` — 输出格式与覆盖策略

## 提示

- 需要 Chrome Headless Shell，首次 `render` 自动下载（约 150 MB，已装好）。
- 透明背景：把 `remotion.config.ts` 的 `setVideoImageFormat("jpeg")` 改成 `"png"`。
- 冲击帧 / Hit Stop：用 `interpolate` + `Easing` 造瞬时变速，配合 1–2 帧白闪（`AbsoluteFill` 叠加 `opacity` 脉冲）。
- 双采质感：`<CameraMotionBlur samples={6} shutterAngle={180}>` 包住运动层，samples 越大越细腻也越慢。
