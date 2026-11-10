import { Composition } from "remotion";
import { Hello } from "./Hello";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloMotion"
        component={Hello}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
