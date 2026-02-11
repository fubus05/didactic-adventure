const CTOInformationTable = () => {
  const data = [
    {
      area: "Hosting & infra map",
      whyWeNeedIt: (
        <>
          Identify processors / <br /> data-transfer regions
        </>
      ),
      questions: [
        "Which cloud regions are in use?",
        "Any on-prem or third-party nodes storing logs?",
      ],
    },
    {
      area: "Data inventory",
      whyWeNeedIt: "Build Article 30 GDPR record; list what exactly is logged",
      questions: [
        "What user-level logs are stored (IP, CPU stats, wallet)?",
        "Retention periods per table/bucket?",
      ],
    },
    {
      area: "Security controls",
      whyWeNeedIt: "Draft Security & Breach section accurately",
      questions: [
        "Encryption standards at rest/in transit?",
        "Incident-response workflow & SLA?",
      ],
    },
    {
      area: "Sub-processors list",
      whyWeNeedIt: "Legally required to disclose",
      questions: [
        "Full vendor list (analytics, email, CDN, KYC)",
        "Links to their DPAs?",
      ],
    },
    {
      area: "Cookies / SDKs",
      whyWeNeedIt: "Must list in cookie banner",
      questions: [
        "Exact cookies / local-storage keys set by frontend",
        "SDKs loaded (GA4, Plausible, Sentry)?",
      ],
    },
    {
      area: "Reward logic & on-chain data",
      whyWeNeedIt: "Explain “why we process wallet addresses”",
      questions: [
        "Where is reward calc performed (off-chain DB vs smart-contract)?",
      ],
    },
    {
      area: "KYC / AML flow (if any)",
      whyWeNeedIt: "Needed for legal basis & retention",
      questions: ["Which provider?", "What documents stored & for how long?"],
    },
    {
      area: "Backup & retention policy",
      whyWeNeedIt: "Define retention + deletion rights",
      questions: ["Snapshot frequency?", "Data-deletion automation?"],
    },
    {
      area: "Cross-border transfers",
      whyWeNeedIt: "SCC or other mechanism?",
      questions: ["Any US-hosted analytics for EU users?"],
    },
    {
      area: "Support / ticketing logs",
      whyWeNeedIt: "Additional data category",
      questions: ["Tool used (Zendesk, Intercom)?", "Storage duration?"],
    },
    {
      area: "Contact points",
      whyWeNeedIt: "Must list accurate addresses",
      questions: [
        "Registered legal entity name & address?",
        "Dedicated privacy mailbox?",
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-auto mb-5 hide-scrollbar">
      <table className="min-w-[966px] table-fixed w-full border-separate border-spacing-0 text-sm md:text-base">
        <thead className="bg-[#FFFFFF26] text-white">
          <tr className="text-center font-bold text-[16px]/[25px]">
            <th className="w-1/3 border-b border-r border-black px-4 py-[15.5px]">
              Area
            </th>
            <th className="w-1/3 border-b border-x border-black px-4 py-[15.5px]">
              Why we need it
            </th>
            <th className="w-1/3 border-b border-l border-black px-4 py-[15.5px]">
              Questions for CTO / Ops
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
                {row.area}
              </td>
              <td
                className={`text-[#D7D7D7] font-normal text-[16px]/[25px] border-y border-x border-black px-4 py-2 ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                {row.whyWeNeedIt}
              </td>
              <td
                className={`text-[#D7D7D7] font-normal text-[16px]/[25px] border-y border-l border-black px-4 py-2 ${
                  i === data.length - 1 ? "border-b-0" : ""
                }`}
              >
                <ul className="list-disc list-inside">
                  {row.questions.map((question, i) => (
                    <li key={i}>{question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CTOInformationTable;
