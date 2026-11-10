import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";

/**
 * 最小可跑的动效样板：
 * - spring 驱动入场
 * - CameraMotionBlur 做「双采质感」式的动态模糊（samples 越大越细腻、越慢）
 */
export const Hello: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 40 });
  const exit = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const x = interpolate(enter, [0, 1], [-600, 0]);
  const scale = interpolate(enter, [0, 1], [0.85, 1]);
  const opacity = enter * exit;

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 30% 20%, #1b2a4a 0%, #070b14 60%, #000 100%)",
        fontFamily: "Inter, 'Noto Sans SC', sans-serif",
      }}
    >
      <CameraMotionBlur samples={6} shutterAngle={180}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              transform: `translateX(${x}px) scale(${scale})`,
              opacity,
              padding: "48px 64px",
              borderRadius: 32,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
              color: "#fff",
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: 2,
              backdropFilter: "blur(12px)",
            }}
          >
            大肥鱼 · Remotion 工作台
          </div>
        </AbsoluteFill>
      </CameraMotionBlur>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 120,
          color: "rgba(255,255,255,0.55)",
          fontSize: 30,
          opacity,
        }}
      >
        frame {frame} / {durationInFrames}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
