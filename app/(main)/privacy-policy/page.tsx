import CTOInformationTable from "@/components/tables/CTOInformationTable";
import DataCollectionTable from "@/components/tables/DataCollectionTable";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="text-[#D7D7D7] pt-[76px] pb-[100px] px-4 sm:px-6 lg:px-8 max-w-[998px] sm:max-w-[1014px] lg:max-w-[1030px] mx-auto">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;1. Introduction
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            WeNode (“<span className="font-bold">WeNode</span>,” “
            <span className="font-bold">we</span>,” “
            <span className="font-bold">our</span>,” or “
            <span className="font-bold">us</span>”) respects your privacy.
            <br />
            This Privacy Policy explains how we collect, use, disclose and
            safeguard Personal Data when you visit https://wenode.io or interact
            with any related products, dashboards, APIs, smart-contracts,
            Discord/TG bots and mobile experiences (collectively, the “
            <span className="font-bold">Services</span>”).
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;2. Scope
          </h1>
          <div className="text-[16px]/[25px] font-normal">
            This Policy applies to anyone who:
            <ul className="list-disc list-inside">
              <li>browses the website;</li>
              <li>creates a WeNode account or wallet connection;</li>
              <li>
                delegates computing power, purchases nodes or invests in
                infrastructure;
              </li>
              <li>communicates with us on social or support channels;</li>
              <li>
                participates in events, campaigns, Zealy / Galxe quests or
                airdrops.
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;3. Definitions
          </h1>
          <div className="text-[16px]/[25px] font-normal">
            <ul className="list-disc list-inside">
              <li>
                <span className="font-bold">Personal Data</span> – any
                information that identifies or can reasonably be linked to an
                individual.
              </li>
              <br />
              <li>
                <span className="font-bold">Processing</span> – any operation
                performed on Personal Data (collection, storage, use,
                disclosure, deletion, etc.).
              </li>
              <br />
              <li>
                <span className="font-bold">Controller</span> – WeNode (legal
                entity:{" "}
                <span className="font-bold">
                  [WeNode Labs Ltd., registration Nº …]).
                </span>
              </li>
              <br />
              <li>
                <span className="font-bold">Processor</span> – a third party
                that processes data on WeNode’s behalf (e.g. AWS, Supabase,
                Cloudflare).
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;4. Data We Collect
          </h1>{" "}
          <DataCollectionTable />
          <p className="text-[16px]/[25px] font-normal">
            * For EU/UK users we rely on GDPR legal bases.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;5. How We Use Data
          </h1>
          <ol className="list-decimal list-inside marker:font-bold text-[16px]/[25px] font-normal">
            <li>
              <span className="font-bold">Operate the network</span> – node
              registration, reward calculations, airdrop eligibility.
            </li>
            <li>
              <span className="font-bold">Improve the product</span> –
              performance analytics, bug diagnostics, UX research.
            </li>
            <li>
              <span className="font-bold">Security & abuse prevention</span> –
              DDoS mitigation, anti-sybil checks, KYC/AML (where required).
            </li>
            <li>
              <span className="font-bold">Marketing & community</span> –
              campaign updates, event invitations, role/level assignments.
            </li>
            <li>
              <span className="font-bold">Regulatory compliance</span> – tax,
              accounting and anti-money-laundering obligations.
            </li>
          </ol>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;6. Cookies & Similar Tech
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            We use first-party cookies for session management and third-party
            cookies (e.g. Plausible / Google Analytics) for aggregated
            analytics. You can manage preferences via the cookie banner or
            browser settings.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;7. Sharing & Disclosure
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            We <span className="font-bold">never</span> sell Personal Data. We
            share it only with:
          </p>
          <ul className="list-disc list-inside text-[16px]/[25px] font-normal">
            <li>
              <span className="font-bold">Cloud & infra providers</span> — AWS,
              GCP or <span className="font-bold">[provider list];</span>
            </li>
            <li>
              <span className="font-bold">Analytics / marketing tools</span> —
              Plausible, PostHog, MailerLite, Zealy, Galxe;
            </li>
            <li>
              <span className="font-bold">Payment / KYC vendors</span> — Stripe,
              SumSub{" "}
              <span className="font-bold">
                (if node sales require fiat/fiat-on-ramp);
              </span>
            </li>
            <li>
              <span className="font-bold">Legal or regulatory bodies</span> when
              lawfully compelled;
            </li>
            <li>
              <span className="font-bold">Successors</span> in the event of
              merger, acquisition or asset sale.
            </li>
          </ul>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;8. International Transfers
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            Data may be stored or processed outside your jurisdiction (e.g.
            EU-US). When we transfer EU/UK data internationally we rely on
            Standard Contractual Clauses or an adequacy decision.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;9. Security
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            We apply industry-standard safeguards: TLS 1.3, encryption at rest,
            least-privilege IAM, periodic penetration testing, multi-sig on
            treasury wallets. No system is 100% secure; you use the Services at
            your own risk.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;10. Data Retention
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            Personal Data is kept{" "}
            <span className="font-bold">[X years/months]</span> or until the
            purpose is fulfilled, whichever is longer, unless a longer retention
            is required by law (e.g. tax records 7 years).
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;11. Your Rights
          </h1>
          <ul className="list-disc list-inside text-[16px]/[25px] font-normal pb-5">
            <li>Access, correct, delete or port your data;</li>
            <li>Object to or restrict processing;</li>
            <li>Withdraw consent (marketing opt-out);</li>
            <li>
              Lodge a complaint with your local data-protection authority.
            </li>
          </ul>
          <p className="text-[16px]/[25px] font-normal">
            Requests:{" "}
            <a href="mailto:privacy@wenode.io" className="underline">
              privacy@wenode.io
            </a>{" "}
            (we respond within 30 days).
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;12. Children
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            WeNode does not knowingly collect data from children under 13 (US) /
            16 (EU). If you believe we hold such data, contact us for deletion.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;13. Changes to This Policy
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            We may update this Policy periodically. We will notify you via
            banner, e-mail, or dashboard notice and update the “Effective Date”
            above.
          </p>
        </div>

        <div>
          <h1 className="text-[32px]/[40px] font-bold mb-5">
            &nbsp;&nbsp;14. Contact
          </h1>
          <p className="text-[16px]/[25px] font-normal">
            <span className="font-bold">Controller</span>: WeNode Labs Ltd.,{" "}
            <span className="font-bold">
              [registered address, jurisdiction]
            </span>
            <br />
            E-mail:{" "}
            <a href="mailto:privacy@wenode.io" className="underline">
              privacy@wenode.io
            </a>
            <br />
            Data-Protection Officer:{" "}
            <span className="font-bold">[Name or “N/A if not required”]</span>
          </p>
        </div>
        <div className="w-full h-[1px] bg-white/50"></div>
        <div>
          <h1 className="text-[32px]/[40px] font-bold lg:whitespace-nowrap mb-5">
            Information We’ll Need from the CTO / Engineering & Ops Leads
          </h1>
          <CTOInformationTable />
          <p className="text-[16px]/[25px] font-normal">
            Once the CTO supplies these details, we can plug the specifics into
            the template → final compliant Privacy Policy (and generate the
            formal Word/PDF if needed).
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
