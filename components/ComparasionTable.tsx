import React from "react";
import ColoredBars from "./ColoredBardsProps";

const ComparasionTable = () => {
  const wenodeTable = ["wenode", "Open", "Weekly", "", "Community-based"];
  const cloudAI = ["Cloud AI", "Closed", "None", "", "Internalh"];
  const names = ["Feature", "Access", "Rewards", "Infra Cost", "Governance"];

  const [animatedCloudAIActiveBars, setAnimatedCloudAIActiveBars] =
    React.useState(0);
  const [animatedWenodeActiveBars, setAnimatedWenodeActiveBars] =
    React.useState(0);

  const TARGET_CLOUD_AI_BARS = 7;
  const TARGET_WENODE_BARS = 2;
  const ANIMATION_STEP_DELAY_MS = 300;
  const REPETITION_DELAY_MS = 2000;

  React.useEffect(() => {
    let cloudAICurrentBars = 0;
    let wenodeCurrentBars = 0;
    let animationIntervalId: any;
    let repetitionTimeoutId: any;

    const runAnimationCycle = () => {
      cloudAICurrentBars = 0;
      wenodeCurrentBars = 0;
      setAnimatedCloudAIActiveBars(0);
      setAnimatedWenodeActiveBars(0);

      animationIntervalId = setInterval(() => {
        let cloudAIDone = cloudAICurrentBars >= TARGET_CLOUD_AI_BARS;
        let wenodeDone = wenodeCurrentBars >= TARGET_WENODE_BARS;

        if (!cloudAIDone) {
          cloudAICurrentBars++;
          setAnimatedCloudAIActiveBars((prevBars) =>
            Math.min(prevBars + 1, TARGET_CLOUD_AI_BARS)
          );
        }

        if (!wenodeDone) {
          wenodeCurrentBars++;
          setAnimatedWenodeActiveBars((prevBars) =>
            Math.min(prevBars + 1, TARGET_WENODE_BARS)
          );
        }

        cloudAIDone = cloudAICurrentBars >= TARGET_CLOUD_AI_BARS;
        wenodeDone = wenodeCurrentBars >= TARGET_WENODE_BARS;

        if (cloudAIDone && wenodeDone) {
          clearInterval(animationIntervalId);

          repetitionTimeoutId = setTimeout(
            runAnimationCycle,
            REPETITION_DELAY_MS
          );
        }
      }, ANIMATION_STEP_DELAY_MS);
    };

    runAnimationCycle();

    return () => {
      clearInterval(animationIntervalId);
      clearTimeout(repetitionTimeoutId);
    };
  }, []);

  return (
    <div className="relative md:scale-[1] scale-[0.7] sm:scale-[0.9]">
      <div className="absolute h-[268px] w-[626px] right-0">
        <img src="/table1.svg" alt="tableSvg" height={268} width={626} />
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-[100px] items-end justify-center text-right">
          {names.map((item, index) => {
            if (index === 0) {
              return (
                <div key={index} className="py-[18px] pr-5 font-[700]">
                  {item}
                </div>
              );
            }
            return (
              <div
                key={index}
                className="text-[16px] gap-[30px] font-[700] py-[14px] pr-5 "
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col w-[210px] items-center justify-center text-white/55">
          {cloudAI.map((item, index) => {
            if (index === 0) {
              return (
                <div className="p-[18px] font-[700] text-white" key={index}>
                  {item}
                </div>
              );
            }
            if (index === 3) {
              return (
                <div className="py-[14px]" key={index}>
                  <ColoredBars
                    totalBars={TARGET_CLOUD_AI_BARS}
                    redBars={animatedCloudAIActiveBars}
                    barColorActive="bg-[#C84B4B]"
                    barColorInActive="bg-[#8c9995]"
                    barWidth="w-[6px]"
                    barHeight="h-[20px]"
                    gap="gap-x-[6px]"
                  />
                </div>
              );
            }
            return (
              <div key={index} className="text-[16px] gap-[30px] py-[15px]">
                {item}
              </div>
            );
          })}
        </div>
        <div className="flex flex-col w-[210px] items-center justify-center">
          {wenodeTable.map((item, index) => {
            if (index === 3) {
              return (
                <div
                  className="flex justify-center py-[14px] pt-[14px]"
                  key={index}
                >
                  <ColoredBars
                    totalBars={7}
                    redBars={animatedWenodeActiveBars}
                    barColorActive="bg-[#00ba7c]"
                    barColorInActive="bg-[#8c9995]"
                    barWidth="w-[6px]"
                    barHeight="h-[20px]"
                    gap="gap-x-[6px]"
                  />
                </div>
              );
            }
            if (index === 0) {
              return (
                <div
                  className="text-[16px] text-white flex gap-1 p-[16px] z-20"
                  key={index}
                >
                  <img
                    src="/logo-table.svg"
                    alt="Logo Table"
                    width={103.2}
                    height={27.48}
                  />
                </div>
              );
            }
            return (
              <div
                key={index}
                className="text-[16px] gap-[30px] text-[#8c9995] py-[15px]"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparasionTable;
