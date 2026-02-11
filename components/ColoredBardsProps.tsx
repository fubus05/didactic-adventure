interface ColoredBarsProps {
  totalBars: number;
  redBars: number;
  barColorActive: string;
  barColorInActive: string;
  barWidth?: string;
  barHeight?: string;
  gap?: string;
}

const ColoredBars: React.FC<ColoredBarsProps> = ({
  totalBars,
  redBars,
  barColorActive,
  barColorInActive,
  barWidth = "w-4",
  barHeight = "h-16",
  gap = "gap-x-2",
}) => {
  if (redBars > totalBars) {
    console.warn("");
    redBars = totalBars;
  }

  const bars = [];
  for (let i = 0; i < totalBars; i++) {
    bars.push(
      <div
        key={i}
        className={`${barWidth} ${barHeight} ${
          i < redBars ? barColorActive : barColorInActive
        }`}
      />
    );
  }

  return <div className={`flex ${gap}`}>{bars}</div>;
};

export default ColoredBars;
