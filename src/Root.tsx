import { Composition } from "remotion";
import { Hello } from "./Hello";
import { Impact } from "./Impact";

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
      <Composition
        id="ImpactDemo"
        component={Impact}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
