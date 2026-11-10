import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";

/** 冲击发生在第几帧（30fps 下约 1.4s 处）。 */
const IMPACT = 42;
/** Hit Stop：冻结 3 帧 = 0.1s。 */
const FREEZE_FRAMES = 3;

/**
 * 冲击帧样板：加速冲撞 → 2 帧白闪 → Hit Stop 冻结 0.1s → 减速滑出。
 *
 * 三个动作都不依赖外部特效：
 * - 白闪 = 一层绝对定位的白色 div，只在 2 帧内出现
 * - 冻结 = 把「用于计算的帧号」卡在 IMPACT 上，画面自然不动
 * - 变速 = Easing.in(quad) 加速 + Easing.out(cubic) 减速
 */
export const Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 冻结期间时间停止：所有动画都读 clock，不读 frame
  const frozen = frame >= IMPACT && frame < IMPACT + FREEZE_FRAMES;
  const clock = frozen ? IMPACT : frame;

  const approach = interpolate(clock, [0, IMPACT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  const retreat = interpolate(clock, [IMPACT, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const x = clock <= IMPACT ? 150 + approach * 390 : 540 + retreat * 330;
  const scaleX = frozen ? 1.35 : 1;
  const scaleY = frozen ? 0.72 : 1;

  // 白闪只亮 2 帧
  const flash = interpolate(frame, [IMPACT, IMPACT + 1, IMPACT + 2], [0, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // 冲击后的扩散环
  const ring = interpolate(frame, [IMPACT, IMPACT + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 42%, #16233d 0%, #0a1018 55%, #000 100%)",
        fontFamily: "Inter, 'Noto Sans SC', sans-serif",
      }}
    >
      <CameraMotionBlur samples={6} shutterAngle={180}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {/* 扩散环 */}
          <div
            style={{
              position: "absolute",
              width: 40 + ring * 520,
              height: 40 + ring * 520,
              borderRadius: "50%",
              border: "3px solid rgba(120,190,255,0.55)",
              opacity: 1 - ring,
            }}
          />

          {/* 冲击体 */}
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: 28,
              background: "linear-gradient(160deg, #9ad4ff 0%, #2f7bff 55%, #1446a0 100%)",
              boxShadow: "0 24px 70px rgba(47,123,255,0.45)",
              transform: `translateX(${x - 540}px) scale(${scaleX}, ${scaleY})`,
            }}
          />
        </AbsoluteFill>
      </CameraMotionBlur>

      {/* 地面冲击线 */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            position: "absolute",
            bottom: 520,
            width: 260 + ring * 420,
            height: 4,
            background: "rgba(160,220,255,0.85)",
            opacity: (1 - ring) * 0.9,
            borderRadius: 2,
          }}
        />
      </AbsoluteFill>

      {/* 白闪 */}
      <AbsoluteFill style={{ backgroundColor: "#fff", opacity: flash }} />

      {/* 状态说明 */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 110,
          color: "rgba(255,255,255,0.62)",
          fontSize: 28,
          letterSpacing: 1,
        }}
      >
        {frozen
          ? `HIT STOP · 冻结 ${FREEZE_FRAMES} 帧（${(FREEZE_FRAMES / 30).toFixed(1)}s）`
          : frame >= IMPACT
            ? `impact @ frame ${IMPACT} · 减速滑出`
            : `frame ${frame} / ${durationInFrames}`}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
