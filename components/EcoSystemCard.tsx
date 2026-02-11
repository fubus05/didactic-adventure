export interface EcoSystemCardProps {
  title: string;
  status: string;
  tag?: string;
  tagClasses?: string;
  imageUrl?: string;
  actionButton?: {
    text: string;
    onClick?: () => void;
  };
  icons?: React.ReactNode[];
  isBlurred?: boolean;
}

const EcoSystemCard: React.FC<EcoSystemCardProps> = ({
  title,
  status,
  tag,
  tagClasses = "bg-[#2B2B2B] text-[#FFD200]",
  imageUrl,
  actionButton,
  icons,
  isBlurred = false,
}) => {
  return (
    <div className="bg-[#0d0d0d] rounded-xl border border-[#2B2B2B] p-[13px] shadow-lg flex flex-row min-h-[106px] gap-[16px]">
      <div className="min-w-[80px] w-[80px] h-[80px] overflow-hidden relative bg-[#1a1a1a] rounded-md flex items-center justify-center self-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            width={80}
            height={80}
            className="object-cover w-full h-full rounded-md"
          />
        ) : (
          <img
            src="/overlay-new.png"
            alt="Default card icon"
            width={60}
            height={60}
            className="object-contain"
          />
        )}
      </div>
      <div className="w-full flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3
              className={`text-[14px] font-medium leading-tight ${
                isBlurred ? "filter blur-sm text-gray-300" : "text-white"
              }`}
            >
              {title}
            </h3>
            {tag && (
              <div
                className={`h-[22px] px-[6px] text-[12px] flex justify-center items-center font-normal rounded-md ${tagClasses} ml-2 shrink-0`}
              >
                {tag}
              </div>
            )}
          </div>
          <p
            className={`text-sm leading-tight ${
              isBlurred ? "filter blur-sm text-gray-500" : "text-gray-400" // Apply blur to status as well if isBlurred
            }`}
          >
            {status}
          </p>
        </div>

        <div className="flex justify-end items-center mt-auto pt-1">
          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className="w-auto text-[12px] bg-[#FFD200] font-semibold text-black py-1 px-[13px] rounded-[6px] transition cursor-pointer hover:bg-yellow-400
                hover:shadow-lg focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
            >
              {actionButton.text}
            </button>
          )}
          {icons && !actionButton && (
            <div className="flex space-x-3 items-center">
              {icons.map((icon, index) => (
                <span key={index} className="text-gray-400 text-2xl">
                  {icon}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoSystemCard;
