const DataCollectionTable = () => {
  const data = [
    {
      category: "Account & Contact",
      examples:
        "e-mail, Discord/Twitter handle, wallet address, social-login metadata",
      legalBasis: "Contractual necessity",
    },
    {
      category: "Technical",
      examples: "IP, device/OS, browser, time-zone, language, referral URL",
      legalBasis: "Legitimate interest",
    },
    {
      category: "Usage / Telemetry",
      examples:
        "Node uptime, delegated hash-rate, click paths, feature engagement",
      legalBasis: "Legitimate interest",
    },
    {
      category: "Blockchain Data",
      examples: "Public wallet address, on-chain tx hashes, staking amounts",
      legalBasis: "Contract / Legitimate interest",
    },
    {
      category: "Marketing",
      examples: "Newsletter opens, campaign UTM tags, Zealy scores",
      legalBasis: "Consent",
    },
  ];

  return (
    <div className="w-full overflow-x-auto mb-5 hide-scrollbar">
      <table className="min-w-[966px] table-fixed w-full border-separate border-spacing-0 text-sm md:text-base">
        <thead className="bg-[#FFFFFF26] text-white">
          <tr className="text-center font-bold text-[16px]/[25px]">
            <th className="w-1/3 border-b border-r border-black px-4 py-[15.5px]">
              Category
            </th>
            <th className="w-1/3 border-b border-x border-black px-4 py-[15.5px]">
              Examples
            </th>
            <th className="w-1/3 border-b border-l border-black px-4 py-[15.5px]">
              Legal basis*
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#FFFFFF0D]">
          {data.map((row, i) => (
            <tr key={i} className="text-white text-center h-[90px]">
              <td
                className={`font-bold text-[16px]/[25px] border-y border-r border-black px-4 py-2 ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {row.category}
              </td>
              <td
                className={`text-[#D7D7D7] font-normal text-[16px]/[25px] border-y border-x border-black px-4 py-2 ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {row.examples}
              </td>
              <td
                className={`text-[#D7D7D7] font-normal text-[16px]/[25px] border-y border-l border-black px-4 py-2 ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {row.legalBasis}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataCollectionTable;
