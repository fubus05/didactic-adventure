import React from "react";

interface SocialsEcoSystemProps {
  svgPath: string;
  buttonClassName?: string;
  svgClassName?: string;
}

const SocialsEcoSystem: React.FC<SocialsEcoSystemProps> = ({
  svgPath,
  buttonClassName = "",
  svgClassName = "",
}) => {
  return (
    <button
      type="button"
      className={`p-[4px] rounded-full bg-[#151515] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer transition duration-300 ${buttonClassName}`}
      aria-label="Social media icon"
    >
      <div>
        <img
          src={svgPath}
          alt={svgPath}
          width={16}
          height={16}
          className="h-[16px] w-[16px]"
        />
      </div>
    </button>
  );
};

export default SocialsEcoSystem;
