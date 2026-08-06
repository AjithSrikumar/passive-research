import type { Metadata } from "next";
import { reportToc } from "@/lib/report";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How Passive builds institutional-grade equity research: the decision-first report architecture, evidence classification, valuation framework, rating scale, risk register, and source policy.",
};

const RATING_SCALE = [
  { r: "Strong Buy", u: "+25% or more", w: "High" },
  { r: "Buy", u: "+15% to +25%", w: "Medium-High" },
  { r: "Accumulate", u: "+5% to +15%", w: "Medium" },
  { r: "Hold", u: "-5% to +5%", w: "Medium-Low" },
  { r: "Reduce", u: "-15% to -5%", w: "Low" },
  { r: "Sell", u: "Worse than -15%", w: "Very Low" },
];

const SECTION_ROLES: Record<string, string> = {
  "executive-summary":
    "the decision first — rating, target price, implied return, one-line thesis, what is priced in, and what would change our view.",
  "investment-thesis":
    "the thesis map — two to three non-overlapping drivers, each tied to evidence, a model line, a signpost, and a failure test.",
  "business-overview":
    "the business in one unit of activity — who the customer is, what is sold, and how money is made before any forecast is shown.",
  "business-model":
    "the revenue formula (units × realisation, for example), cost structure, and cash cycle.",
  "revenue-breakdown":
    "how revenue is earned by segment, labelled as analyst estimates where the split is modelled.",
  "geographic-mix":
    "geographic split of revenue, labelled as analyst estimates where modelled.",
  "segment-analysis":
    "the economics of each segment and how mix shifts toward higher-margin lines.",
  "competitive-positioning":
    "moat evidence — returns, scale, cost, and durability — not a declaration of leadership.",
  "industry-overview":
    "demand, supply, economics, and structure of the industry in which the company operates.",
  "market-size":
    "addressable, serviceable, and obtainable market — defined and sourced, never a top-down slide alone.",
  "growth-drivers":
    "the driver tree — the measurable variables that move revenue and margin, with signposts.",
  "management-quality":
    "capital allocation, execution, communication, and governance tracked as evidence.",
  "corporate-governance":
    "board independence, related-party activity, and minority-interest treatment.",
  "financial-analysis":
    "the auditable history — revenue, profit, margin, and cash over FY-3 to FY0.",
  "balance-sheet":
    "leverage, liquidity, and funding flexibility versus the demands of the forecast.",
  "capital-allocation":
    "reinvestment, returns, and dividends, and whether surplus is returned.",
  "historical-performance":
    "the historical growth bridge and what it implies for the forward path.",
  "forecasts":
    "two-year base estimates, labelled, with the assumptions exposed.",
  "valuation":
    "DCF, peer multiples, reverse DCF (what the price already implies), and scenarios.",
  "target-price":
    "the 12-month bridge from estimates to price, including dividends and risk range.",
  "risks":
    "a risk register — each risk carries a leading indicator and a model consequence.",
  "catalysts":
    "dated or measurable events tied to the model, with bull and bear outcomes.",
  "esg":
    "environmental, social, and governance factors only where they affect cash flow, cost of capital, or licence to operate.",
  "conclusion":
    "the conditional verdict — the rating, and the signposts that would upgrade, downgrade, or invalidate it.",
  "appendix":
    "glossary, evidence legend, sources, and full methodology references.",
};

export default function MethodologyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-inner">
          <span className="eyebrow">How We Work</span>
          <h1>Methodology</h1>
          <p>
            Every Passive report is built to a single standard: a professional
            institutional investor should be able to read the first three pages
            and answer what we rate it, what the market is pricing in, which
            drivers matter, and what would change our mind. Here is exactly how
            we build that — the framework, the evidence rules, the sources, and
            the valuation discipline.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner prose">
          <p className="last-updated">Last updated: August 2026</p>

          <h2>1. Research is a chain of claims</h2>
          <p>
            We treat a report as an operating system for a decision, not a
            catalogue of facts. Every material claim must be traceable along a
            visible chain:
          </p>
          <blockquote>
            Observation → interpretation → operating driver → financial
            consequence → valuation consequence → catalyst or risk → signpost.
          </blockquote>
          <p>
            This discipline applies twice. It stops us from stopping at a
            persuasive narrative, and it stops a reviewer from dismissing a
            non-consensus view merely because it is non-consensus. The question
            is always whether the bridge is evidence-backed and measurable.
          </p>

          <h2>2. The report framework</h2>
          <p>
            Each company report follows a fixed 25-section structure. This
            guarantees that any two companies — say a bank and a steelmaker —
            can be compared honestly, because every metric is defined and
            presented identically. The sections answer, in order: what is the
            security, what is changing, why can this company capture it, what
            reaches the financial statements, what is already priced in, and
            what would disprove the view.
          </p>
          <ul>
            {reportToc.map((s, i) => (
              <li key={s.id}>
                <strong>
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </strong>{" "}
                — {SECTION_ROLES[s.id] ?? s.label}
              </li>
            ))}
          </ul>

          <h2>3. The institutional test</h2>
          <p>
            Before publication, a portfolio manager who has not worked on the
            company must be able to answer five questions after reading only
            the first few screens of a report:
          </p>
          <ol>
            <li>What is the rating and target price, and over what horizon?</li>
            <li>What has changed, or why does the opportunity exist now?</li>
            <li>
              Which two or three operating drivers create the upside or
              downside?
            </li>
            <li>What is the market already pricing in?</li>
            <li>What observable event would change our mind?</li>
          </ol>
          <p>
            If those answers are not clear, the fix is not more content. It is
            better hierarchy. Every section above exists to answer one of these
            five questions.
          </p>

          <h2>4. Data and sources</h2>
          <p>
            Primary financial data is sourced from{" "}
            <strong>screener.in</strong>: company annual reports (financial
            statements, segment and geographic disclosures), quarterly results,
            <strong> credit ratings </strong> filed by rating agencies, and{" "}
            <strong>conference-call transcripts and investor presentations</strong>{" "}
            for management guidance and commentary. Consensus estimates (sales,
            EBITDA, EPS, and target multiples) are referenced from{" "}
            <strong>in.marketscreener.com</strong> as at each report&apos;s
            &ldquo;Last updated&rdquo; date.
          </p>
          <p>
            Where a figure is model-implied — such as historical segment
            reconstructions standardised across the coverage universe — it is
            explicitly labelled as an analyst estimate in the report&apos;s
            tables and appendix. Prices and market capitalisation are as at each
            report&apos;s &ldquo;Last updated&rdquo; date.
          </p>

          <h2>5. Evidence classification</h2>
          <p>
            The reader should never have to guess whether a number is reported,
            management&apos;s, consensus, or our own calculation. We apply a
            single classification scheme throughout every report:
          </p>
          <div className="table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Type</th>
                  <th>Meaning</th>
                  <th>Required support</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>F</strong>
                  </td>
                  <td>Fact</td>
                  <td>Reported or independently observed</td>
                  <td>Filing, company disclosure, or dated source</td>
                </tr>
                <tr>
                  <td>
                    <strong>M</strong>
                  </td>
                  <td>Management</td>
                  <td>Company guidance or stated ambition</td>
                  <td>Date, speaker, document or call</td>
                </tr>
                <tr>
                  <td>
                    <strong>C</strong>
                  </td>
                  <td>Consensus</td>
                  <td>External market estimate</td>
                  <td>Source (e.g. marketscreener) and date</td>
                </tr>
                <tr>
                  <td>
                    <strong>E</strong>
                  </td>
                  <td>Analyst estimate</td>
                  <td>Our forecast or model output</td>
                  <td>Driver build, period, and assumption</td>
                </tr>
                <tr>
                  <td>
                    <strong>I</strong>
                  </td>
                  <td>Inference</td>
                  <td>Interpretation of evidence</td>
                  <td>At least two supporting facts or a stated judgment</td>
                </tr>
                <tr>
                  <td>
                    <strong>S</strong>
                  </td>
                  <td>Scenario</td>
                  <td>Conditional forecast</td>
                  <td>Explicit conditions and weights where used</td>
                </tr>
                <tr>
                  <td>
                    <strong>U</strong>
                  </td>
                  <td>Uncertainty</td>
                  <td>Range or unresolved question</td>
                  <td>Sensitivity, signpost, or research plan</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Labels appear directly in tables and prose where provenance matters.
            Unlabelled financial history is reported (definition [F]); forecast
            columns are always marked (E); scenario valuations are marked (S).
          </p>

          <h2>6. Key metric definitions</h2>
          <ul>
            <li>
              <strong>Market cap:</strong> shares outstanding × current market
              price, in ₹ crore.
            </li>
            <li>
              <strong>Implied EPS:</strong> net profit ÷ shares outstanding,
              derived as net profit × price ÷ market cap on a flat share count
              (no dilution assumed unless stated).
            </li>
            <li>
              <strong>P/E ratio:</strong> market cap ÷ net profit (TTM). For
              loss-making companies we show &ldquo;—&rdquo; rather than a
              misleading negative multiple.
            </li>
            <li>
              <strong>ROE:</strong> net profit ÷ average shareholders&apos;
              equity.
            </li>
            <li>
              <strong>ROCE:</strong> EBIT ÷ average capital employed — our
              preferred measure of true business quality.
            </li>
            <li>
              <strong>EBITDA margin:</strong> EBITDA ÷ revenue.
            </li>
            <li>
              <strong>D/E:</strong> total borrowings ÷ shareholders&apos;
              equity. For financial companies we assess capital adequacy
              rather than gross leverage.
            </li>
          </ul>

          <h2>7. Valuation framework</h2>
          <p>
            Our 12-month target price blends two approaches at a 60/40
            weighting and is then tested against what the price already implies:
          </p>
          <ul>
            <li>
              <strong>DCF (60%):</strong> a five-year explicit forecast to a
              steady state, WACC of 10.5% (adjusted for company beta), terminal
              growth of 4%, and a 15% margin of safety on intrinsic value.
            </li>
            <li>
              <strong>Peer multiples (40%):</strong> the company&apos;s forward
              P/E placed against its sector peer set, normalised for growth
              quality, returns, and capital intensity. No premium is applied
              without naming the superior attribute that earns it — and the
              evidence that would remove it.
            </li>
            <li>
              <strong>Reverse DCF / &ldquo;what is priced in&rdquo;:</strong>{" "}
              for every report we show a reverse valuation of the current price:
              the implied EPS growth (at the peer multiple) or the implied exit
              multiple that the price already requires, versus our forecast.
              This is a market-implied requirement, not proof of mispricing —
              it shows the gap the thesis must close.
            </li>
            <li>
              <strong>Scenarios:</strong> bull, base and bear cases built from
              operating assumptions (revenue CAGR, EBITDA margin, exit
              multiple), weighted 25 / 50 / 25 to produce a probability-weighted
              target used as a consistency check on the blended target.
            </li>
          </ul>
          <p>
            The 12-month target price is the blended fair value. Expected total
            return is (target − current + expected dividends) ÷ current, stated
            as a single percentage against the current price.
          </p>

          <h2>8. Rating scale</h2>
          <p>
            Ratings are absolute over a 12-month horizon, expressed as expected
            total return (price appreciation plus dividends):
          </p>
          <div className="table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Rating</th>
                  <th>Expected 12m Return</th>
                  <th>Conviction</th>
                </tr>
              </thead>
              <tbody>
                {RATING_SCALE.map((r) => (
                  <tr key={r.r}>
                    <td>
                      <strong>{r.r}</strong>
                    </td>
                    <td>{r.u}</td>
                    <td>{r.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The bands are a guide to the expected-return frame, not a rigid
            grid. A rating must follow from the thesis, valuation, catalysts,
            and risk distribution — never from admiration for management. Every
            report states the specific signpost that would change the rating.
          </p>

          <h2>9. Risks, catalysts, and signposts</h2>
          <p>
            Risks are written as a register, so each can be monitored after
            publication:
          </p>
          <div className="table-wrap">
            <table className="fin-table">
              <thead>
                <tr>
                  <th>Risk</th>
                  <th>Leading indicator</th>
                  <th>Financial effect</th>
                  <th>Valuation effect</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Demand slowdown</td>
                  <td>Quarterly revenue, orders, industry volumes</td>
                  <td>Lower revenue, fixed-cost deleverage</td>
                  <td>Lower EPS and multiple</td>
                </tr>
                <tr>
                  <td>Price competition</td>
                  <td>Discounting, gross margin</td>
                  <td>Lower contribution margin</td>
                  <td>Multiple compression</td>
                </tr>
                <tr>
                  <td>Execution / capacity</td>
                  <td>Commissioning dates, utilisation</td>
                  <td>Lost revenue, idle cost</td>
                  <td>Value pushed out</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Catalysts are stated as event + expected result + why it matters,
            dated where possible, and each is linked to a model-input it can
            change. A signpost is a leading indicator — something observable
            before the thesis is confirmed or broken in the financials.
          </p>

          <h2>10. ESG scoring</h2>
          <p>
            ESG is assessed qualitatively across environment, social, and
            governance dimensions, but only where it affects cash flows, cost of
            capital, licence to operate, asset life, or the durability of the
            moat (Section 23 of each report). Governance is weighted most
            heavily because in our experience it correlates most strongly with
            shareholder returns in India.
          </p>

          <h2>11. Independence & conflicts</h2>
          <p>
            Passive holds no trading or fee relationships with any covered
            company, and no analyst may own a position that would bias a rating.
            Ratings reflect our honest view of value and risk only.
          </p>

          <div className="callout">
            <strong>Disclaimer:</strong> methodology is applied consistently,
            but research is not investment advice. Estimates and
            scenarios are analyst outputs, not guarantees. Past patterns do not
            guarantee future results. See our{" "}
            <a href="/legal" style={{ color: "var(--accent)", fontWeight: 600 }}>
              Legal & Disclaimer
            </a>
            .
          </div>
        </div>
      </section>
    </main>
  );
}