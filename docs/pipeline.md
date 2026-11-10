# 流水线定位：Remotion 在这套 AI 视频里干什么

这套工具链对应一张「AI 视频零成本制作全流程」的方案图，核心是 **双采质感 + 冲击帧**，全程零现金成本。

## 五段流水线

| 段位 | 谁负责 | 产物 |
|---|---|---|
| 第一段·骨架 | `dsh-plugin-ai-drama`：剧本结构化、人物卡、场景卡、分镜表，给每个镜头打「画面类型 / emphasis 重音等级」 | 分镜 JSON/MD |
| 第一段·动作预演 | `dsh-motion`：按分镜预演粗运动，定位重音落在第几秒第几帧 | storyboard 帧 |
| 第二段·意境层 | `dsh-creation-mode`：HTML/Canvas 意境动画，承担约 60% 常规画面 | 动画片段 |
| 第二段·讲解层 | `dsh-whiteboard-video`：卷轴 / 手绘风格讲解，约 20% | 讲解片段 |
| 第二段·质感层 | **本仓库（Remotion）**：叠加 20% 的双采质感与冲击帧 | 成片 mp4 |
| 第四段·配音 | `edge-tts`：中文神经音色，自动出字幕时间轴 | mp3 + srt |
| 第四段·合成 | `ffmpeg`：各通道片段 + 配音无损 concat | 最终成片 |

## Remotion 这一层具体做什么

1. **双采质感**：`@remotion/motion-blur` 的 `<CameraMotionBlur samples shutterAngle>` 把运动层在时间上多采几次再叠回去，
   发丝、衣料、边缘不会出现「一格一格」的塑料感。`samples` 越大越细腻，渲染越慢。
2. **冲击帧**：按「六拍结构」，在重音处插 1–2 帧白闪/反相，再用代码做 Hit Stop（冻结 0.1 s）与变速曲线。
   用 `interpolate` + `Easing` 实现，不依赖外部特效软件。
3. **逐帧合成**：Remotion 的每一帧都是 React 组件，时间轴精确到帧，重音对齐不用靠人眼拖。

## 和 dsh-remotion 技能的关系

`dsh-remotion` 是为 DSH 准备的 Remotion 官方 12 技能包（动画 / 音频 / 字幕 / 3D / 地图 / 图表 / 渲染 / Studio），
装好之后 agent 直接会写 Remotion 代码。本仓库是可运行的起点工程：composition、样板组件、输出约定。

## 输出约定

成片与素材不进仓库：

- 成片 → `E:\成品视频\成片\`
- 静帧 / 封面底图 → `E:\成品视频\素材\图片\`
- 旁白 → `E:\成品视频\配音\`（edge-tts）

命名 `<系列>-<集号>-<环节>.<ext>`，重做加 `-v2`，不覆盖上一版。
