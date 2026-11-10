import { Config } from "@remotion/cli/config";

// 输出：H.264 MP4，默认 1080p 由 composition 决定
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// 需要透明通道时改成 "png"
