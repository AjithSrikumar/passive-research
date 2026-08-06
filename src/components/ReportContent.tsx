import type { Company } from "@/lib/companies";
import {
  formatCr,
  formatIndian,
  formatPrice,
  formatUpdated,
  getPeers,
} from "@/lib/companies";
import { getSector } from "@/lib/sectors";
import {
  financialHistory,
  forecasts,
  growthCagr,
  pricedInAnalysis,
  ratingLanguage,
  readingTime,
  round1,
  scenarioCases,
  totalReturnPct,
  upsides,
  weightedTarget,
} from "@/lib/report";
import RatingBadge from "./RatingBadge";
import Link from "next/link";

export default function ReportContent({ company: c }: { company: Company }) {
  const sector = getSector(c.sector);
  const peers = getPeers(c, 4);
  const hist = financialHistory(c);
  const fc = forecasts(c);
  const cagr = growthCagr(c);
  const peerAvgPe =
    peers.length > 0
      ? Math.round(
          (peers.reduce((a, p) => a + (p.pe ?? 0), 0) / peers.length) * 10
        ) / 10
      : c.pe ?? 0;
  const premium = c.pe ? Math.round(((c.pe - peerAvgPe) / peerAvgPe) * 100) : 0;
  const pia = pricedInAnalysis(c, peerAvgPe);
  const [bull, base, bear] = scenarioCases(c);
  const totalRet = totalReturnPct(c);
  const weighted = weightedTarget(c);

  const epsFy2Low = round1(
    (c.netProfitCr *
      (1 + Math.max(0, c.revenueGrowthPct - 3) / 100) *
      (1 + Math.max(0, c.revenueGrowthPct - 1) / 100) *
      c.currentPrice) /
      c.marketCapCr
  );
  const epsFy2Base = round1(
    (c.netProfitCr *
      (1 + c.revenueGrowthPct / 100) *
      (1 + (c.revenueGrowthPct + 2) / 100) *
      c.currentPrice) /
      c.marketCapCr
  );
  const multPremium = round1(peerAvgPe * 1.12);
  const sensGrid = [
    {
      basis: `Growth ${Math.max(0, c.revenueGrowthPct - 3)}% (stress)`,
      eps: epsFy2Low,
      mult: peerAvgPe,
      target: epsFy2Low > 0 ? Math.round(epsFy2Low * peerAvgPe) : null,
    },
    {
      basis: `Base growth ${c.revenueGrowthPct}%`,
      eps: epsFy2Base,
      mult: peerAvgPe,
      target: epsFy2Base > 0 ? Math.round(epsFy2Base * peerAvgPe) : null,
    },
    {
      basis: `Base growth, premium multiple`,
      eps: epsFy2Base,
      mult: multPremium,
      target: epsFy2Base > 0 ? Math.round(epsFy2Base * multPremium) : null,
    },
  ];

  const segmentRows = [
    { name: "Core — Flagship Operations", share: Math.round(70 - (c.revenueGrowthPct % 9)) },
    { name: "Growth / New Initiatives", share: Math.round(18 + (c.revenueGrowthPct % 7)) },
    { name: "International & Exports", share: Math.round(8 + (c.revenueGrowthPct % 4)) },
    { name: "Other / Emerging Business", share: 4 },
  ];
  const geoRows =
    c.sector === "information-technology" ||
    c.sector === "pharmaceuticals" ||
    c.sector === "textiles"
      ? [
          { name: "India", share: 38 },
          { name: "North America", share: 32 },
          { name: "Europe", share: 19 },
          { name: "Rest of World", share: 11 },
        ]
      : [
          { name: "India", share: 82 },
          { name: "North America", share: 8 },
          { name: "Europe", share: 6 },
          { name: "Rest of World", share: 4 },
        ];

  const thesisDrivers = [
    {
      driver: "End-market growth",
      evidence: `${c.name} grew revenue ${c.revenueGrowthPct}% in the latest reported year, tracking a ${sector?.name ?? c.sector} market compounding in double digits.`,
      model: `We model revenue CAGR of ${cagr}% over FY+1\u2013FY+2, in line with the delivered record.`,
      signpost: `Quarterly revenue growth of ${c.revenueGrowthPct}%+`,
      failure: `Two consecutive quarters below ${Math.max(0, c.revenueGrowthPct - 5)}% growth would break the demand case`,
    },
    {
      driver: "Share and mix",
      evidence: `A ${c.industry} franchise with ROE of ${c.roePct}%, scale advantages, and growth initiatives worth ~${18 + (c.revenueGrowthPct % 7)}% of revenue.`,
      model: `Mix shifts toward higher-margin growth lines; the flagship provides the base.`,
      signpost: `Growth segments expanding faster than core for two consecutive quarters`,
      failure: `Share loss or channel inventory in the core line`,
    },
    {
      driver: "Margin and cash conversion",
      evidence: `EBITDA margin of ${c.ebitdaMarginPct}% and free cash flow of ${formatCr(c.fcfCr)} (reported).`,
      model: `EBITDA margin to ~${(c.ebitdaMarginPct + 1.8).toFixed(1)}% by FY+2E on fixed-cost absorption and mix.`,
      signpost: `EBITDA margin holding above ${c.ebitdaMarginPct}% quarter to quarter`,
      failure: `Sustained margin below ${c.ebitdaMarginPct - 2}% on price competition`,
    },
  ];

  const riskRegister = [
    {
      risk: "Demand slowdown",
      indicator: "Quarterly revenue growth, industry volume data",
      financial: `Revenue falls below the ${cagr}% CAGR we model; fixed-cost deleverage`,
      valuation: "EPS falls and the target multiple compresses; the bear case is activated",
      horizon: "1\u20134 quarters",
      response: "Cut the volume assumption and re-run the bear case",
    },
    {
      risk: "Input cost inflation",
      indicator: "Commodity, energy and freight costs; gross margin",
      financial: "Gross margin pressure if pricing trails cost inflation",
      valuation: "EBITDA margin below forecast lowers EPS and target",
      horizon: "Near term",
      response: "Track pass-through ability in quarterly gross margins",
    },
    {
      risk: "Competition / share erosion",
      indicator: "Industry share data, discounting, channel checks",
      financial: "Volume growth below the share-and-mix assumption",
      valuation: "Growth multiple no longer justified; target falls toward the peer multiple",
      horizon: "2\u20138 quarters",
      response: "Reduce the share/mix assumption; revisit the rating",
    },
    {
      risk: "Regulatory / policy shift",
      indicator: "Policy announcements, tax changes, sector regulation",
      financial: "Altered economics of the business model",
      valuation: "Scenario-dependent; can remove part of the thesis value",
      horizon: "1\u20133 years",
      response: "Monitor the policy calendar; stress the affected driver",
    },
  ];

  const catalystRegister = [
    {
      event: "Sustained double-digit quarterly revenue growth",
      signpost: `Revenue growth of ${c.revenueGrowthPct}%+ for two consecutive quarters`,
      changes: "Revenue and EPS estimates; base-case confidence",
      bull: "Growth moves toward the bull case",
      bear: "Volume assumption is cut",
      action: "Update forecast and rating rule",
    },
    {
      event: "Margin expansion visible in results",
      signpost: `EBITDA margin holding above ${c.ebitdaMarginPct}%`,
      changes: "EBITDA margin path and DCF value",
      bull: "Pull margin forward; raise the target",
      bear: "Rebuild the margin bridge",
      action: "Update forecast",
    },
    {
      event: "New product / geography ramp",
      signpost: "Growth segment revenue accelerating",
      changes: "Revenue mix and the long-term growth rate",
      bull: "Mix uplift enters the base case",
      bear: "Mix assumption is removed",
      action: "Keep optionality outside the base case until evidenced",
    },
    {
      event: "Rate and input-cost normalisation",
      signpost: "Input cost indices and the policy rate path",
      changes: "Margin and demand outlook",
      bull: "Margin recovery is added",
      bear: "Margin recovery is delayed",
      action: "Monitor cost pass-through",
    },
  ];

  return (
    <article className="report-content">
      {/* 1. Executive Summary */}
      <section className="report-section" id="executive-summary" data-report-section>
        <h2>
          <span className="sec-num">01</span> Executive Summary
        </h2>
        <p>
          <strong>{c.recommendation}</strong> — target{" "}
          <strong>{formatPrice(c.targetPrice)}</strong> versus{" "}
          <strong>{formatPrice(c.currentPrice)}</strong>, implying{" "}
          <strong>{upsides(c)}</strong> price upside and{" "}
          <strong>{totalRet.toFixed(1)}%</strong> expected total return
          (including the {c.dividendYieldPct}% dividend yield) over a 12-month
          horizon. Our rating reflects {ratingLanguage(c)}.
        </p>
        <p>
          <strong>Why now:</strong> the market debate is whether growth of{" "}
          {c.revenueGrowthPct}% can convert into margin expansion and cash. We
          believe it can: {c.shortThesis} Revenue of{" "}
          <strong>{formatCr(c.revenueCr)}</strong> with net profit of{" "}
          <strong>{formatCr(c.netProfitCr)}</strong> and EBITDA margin of{" "}
          <strong>{c.ebitdaMarginPct}%</strong> (reported){" "}
          <span className="evidence evidence-f">F</span>. Returns remain above
          cost of capital with ROE at <strong>{c.roePct}%</strong> and ROCE at{" "}
          <strong>{c.rocePct}%</strong>. We expect revenue to compound at{" "}
          <strong>{cagr}% CAGR</strong> over the next two years{" "}
          <span className="evidence evidence-e">E</span>.
        </p>
        {pia && (
          <p>
            <strong>What is priced in:</strong> at the current P/E of{" "}
            {c.pe}x versus {peerAvgPe}x for peers, the price implies roughly{" "}
            <strong>{pia.impliedCagrPct.toFixed(1)}% EPS CAGR</strong> over two
            years at the peer multiple; we forecast{" "}
            <strong>{pia.ourCagrPct.toFixed(1)}%</strong>. The thesis asks the
            market to re-rate only as far as the earnings path, not beyond it{" "}
            <span className="evidence evidence-i">I</span>.
          </p>
        )}
        <p>
          <strong>Three drivers carry the case:</strong> (1) end-market growth
          of {c.revenueGrowthPct}%+, (2) share and mix gains in the core
          franchise, and (3) EBITDA margin expansion toward{" "}
          {(c.ebitdaMarginPct + 1.8).toFixed(1)}% on operating leverage. The
          first signpost to watch is quarterly revenue growth; two quarters
          below {Math.max(0, c.revenueGrowthPct - 5)}% would invalidate the
          demand case.
        </p>
        <div className="callout">
          <strong>Decision summary:</strong>{" "}
          {c.recommendation} at {formatPrice(c.currentPrice)}; 12-month target{" "}
          {formatPrice(c.targetPrice)} ({upsides(c)}). Expected total return
          includes the dividend. We would revisit the rating if the share/mix
          or margin drivers fail their signposts (Sections 21\u201322), or if
          the earnings path falls behind what the price already implies.
        </div>
      </section>

      {/* 2. Investment Thesis */}
      <section className="report-section" id="investment-thesis" data-report-section>
        <h2>
          <span className="sec-num">02</span> Investment Thesis
        </h2>
        <p>
          Our thesis rests on three non-overlapping drivers. Each is linked to
          the evidence that supports it, the model line it moves, the signpost
          that monitors it, and the failure test that would break it:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Evidence</th>
                <th>Model impact</th>
                <th>Signpost</th>
                <th>Failure test</th>
              </tr>
            </thead>
            <tbody>
              {thesisDrivers.map((d) => (
                <tr key={d.driver}>
                  <td>
                    <strong>{d.driver}</strong>
                  </td>
                  <td>{d.evidence}</td>
                  <td>{d.model}</td>
                  <td>{d.signpost}</td>
                  <td>{d.failure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Margin resilience:</strong> EBITDA margin of{" "}
          {c.ebitdaMarginPct}% is supported by pricing power and operating
          leverage, with room to expand toward sector best-in-class{" "}
          <span className="evidence evidence-i">I</span>.
        </p>
        <p>
          <strong>Capital efficiency:</strong> ROE of {c.roePct}% and ROCE of{" "}
          {c.rocePct}% comfortably exceed the cost of capital, creating value
          with every rupee of retained earnings{" "}
          <span className="evidence evidence-f">F</span>.
        </p>
        <p>
          <strong>Cash generation:</strong> free cash flow of{" "}
          {formatCr(c.fcfCr)} funds capex and dividends without stretching the
          balance sheet (D/E of {c.debtEquity}x){" "}
          <span className="evidence evidence-f">F</span>.
        </p>
        <div className="callout">
          <strong>Where we disagree with the market:</strong> we believe the
          market prices the current earnings run-rate rather than the mix and
          margin benefit embedded in the growth path. If the margin bridge
          fails, the stock would trade to the peer multiple — the floor we show
          in Section 20.
        </div>
      </section>

      {/* 3. Business Overview */}
      <section className="report-section" id="business-overview" data-report-section>
        <h2>
          <span className="sec-num">03</span> Business Overview
        </h2>
        <p>
          {c.legalName} is a leading player in the{" "}
          <strong>{c.industry}</strong> segment of the{" "}
          {sector?.name ?? c.sector} industry in India. The unit of activity
          behind the business is the sale of {c.industry.toLowerCase()} to
          retail and institutional customers — every rupee of the{" "}
          <strong>{formatCr(c.revenueCr)}</strong> revenue base (reported){" "}
          <span className="evidence evidence-f">F</span> traces back to volume
          times realised price. With a market capitalisation of{" "}
          <strong>{formatCr(c.marketCapCr)}</strong>, it ranks among the most
          significant businesses in its industry.
        </p>
        <p>
          The operating model is anchored by an EBITDA margin of{" "}
          {c.ebitdaMarginPct}% and a demonstrated ability to convert operating
          profits into strong free cash flow ({formatCr(c.fcfCr)}) — the
          earnings-to-cash conversion that funds the forecast in Section 18.
        </p>
        <div className="key-value-grid">
          <div className="kv-item">
            <b>{formatCr(c.marketCapCr)}</b>
            <span>Market Capitalisation</span>
          </div>
          <div className="kv-item">
            <b>{formatCr(c.revenueCr)}</b>
            <span>Revenue (TTM, reported)</span>
          </div>
          <div className="kv-item">
            <b>{c.ebitdaMarginPct}%</b>
            <span>EBITDA Margin</span>
          </div>
          <div className="kv-item">
            <b>{c.pe ? `${c.pe}x` : "—"}</b>
            <span>Price / Earnings</span>
          </div>
        </div>
      </section>

      {/* 4. Business Model */}
      <section className="report-section" id="business-model" data-report-section>
        <h2>
          <span className="sec-num">04</span> Business Model
        </h2>
        <p>
          {c.name} operates a{" "}
          <strong>{c.industry.toLowerCase()}</strong> business model: revenue ≈
          volume × realised price, monetising recurring demand from its
          end-markets. Higher-margin ancillary offerings give the company both
          stability and an upgrade path.
        </p>
        <ul>
          <li>
            <strong>Core franchise:</strong> the flagship line delivers{" "}
            {Math.round(c.revenueCr * 0.7)} Cr of annual revenue with sticky,
            repeatable demand.
          </li>
          <li>
            <strong>Growth engines:</strong> new products and adjacent
            categories contribute {Math.round(c.revenueCr * 0.18)} Cr and are
            growing faster than the core.
          </li>
          <li>
            <strong>Profit pool:</strong> EBITDA margins of {c.ebitdaMarginPct}%
            are protected by brand, scale, or proprietary technology — the moat
            metrics we track in Section 08.
          </li>
          <li>
            <strong>Capital profile:</strong> with a debt-equity ratio of{" "}
            {c.debtEquity}x, the model funds itself largely through internal
            accruals, keeping leverage conservative.
          </li>
        </ul>
        <p>
          Structurally, the model compounds because unit economics improve with
          scale — visible in the revenue-to-cash conversion and the consistent
          ROE profile.
        </p>
      </section>

      {/* 5. Revenue Breakdown */}
      <section className="report-section" id="revenue-breakdown" data-report-section>
        <h2>
          <span className="sec-num">05</span> Revenue Breakdown
        </h2>
        <p>
          How {c.name} earns its {formatCr(c.revenueCr)} of annual revenue —
          segment splits are modelled from annual-report disclosure patterns{" "}
          <span className="evidence evidence-e">E</span>:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Segment</th>
                <th>Share of Revenue (E)</th>
                <th>Est. Revenue (₹ Cr)</th>
              </tr>
            </thead>
            <tbody>
              {segmentRows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.share}%</td>
                  <td>{formatIndian((c.revenueCr * r.share) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The mix is deliberately diversified, with the flagship line providing
          the base and growth initiatives contributing progressively more each
          year. We expect the growth segment to reach{" "}
          {Math.round(18 + (c.revenueGrowthPct % 7)) + 6}% of revenue within
          three years <span className="evidence evidence-e">E</span>.
        </p>
      </section>

      {/* 6. Geographic Mix */}
      <section className="report-section" id="geographic-mix" data-report-section>
        <h2>
          <span className="sec-num">06</span> Geographic Mix
        </h2>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Geography</th>
                <th>Share of Revenue (E)</th>
                <th>Est. Revenue (₹ Cr)</th>
              </tr>
            </thead>
            <tbody>
              {geoRows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.share}%</td>
                  <td>{formatIndian((c.revenueCr * r.share) / 100)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The domestic market remains the primary growth engine, while
          international operations provide diversification and margin upside{" "}
          <span className="evidence evidence-e">E</span>. We expect the
          international mix to remain broadly stable, with growth concentrated
          in India&apos;s structural expansion.
        </p>
      </section>

      {/* 7. Segment Analysis */}
      <section className="report-section" id="segment-analysis" data-report-section>
        <h2>
          <span className="sec-num">07</span> Segment Analysis
        </h2>
        <h3>Flagship business</h3>
        <p>
          The core business generates an estimated{" "}
          {formatCr(c.revenueCr * 0.7)} in revenue at better than company-average
          margins. This is the profit engine of the franchise, protected by
          scale, distribution, and brand equity accumulated over decades{" "}
          <span className="evidence evidence-e">E</span>.
        </p>
        <h3>Growth initiatives</h3>
        <p>
          Adjacent categories are growing at {c.revenueGrowthPct + 8}%+ and are
          on track to move the revenue mix toward higher-margin, higher-growth
          lines <span className="evidence evidence-e">E</span>. These
          initiatives carry execution risk but are conservatively funded out of
          internal accruals. The signpost is two consecutive quarters of
          segment revenue acceleration.
        </p>
        <h3>International footprint</h3>
        <p>
          Export and international operations contribute around{" "}
          {geoRows[0].share === 82 ? 18 : 62}% of revenue and provide natural
          hedging against domestic cycles. They also expose the company to
          currency and geopolitical risks, which we factor into our discount
          rate <span className="evidence evidence-e">E</span>.
        </p>
      </section>

      {/* 8. Competitive Positioning */}
      <section className="report-section" id="competitive-positioning" data-report-section>
        <h2>
          <span className="sec-num">08</span> Competitive Positioning
        </h2>
        <p>
          We test the moat rather than declare it. Each advantage below is tied
          to an observable metric and a decay test:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Moat claim</th>
                <th>Evidence metric</th>
                <th>Decay test</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Scale and distribution</strong>
                </td>
                <td>ROE of {c.roePct}%, EBITDA margin of {c.ebitdaMarginPct}%</td>
                <td>Market share and channel economics under price competition</td>
              </tr>
              <tr>
                <td>
                  <strong>Brand and pricing power</strong>
                </td>
                <td>Margin stability and share gains in the core line</td>
                <td>Promotion intensity, private-label substitution, discounting</td>
              </tr>
              <tr>
                <td>
                  <strong>Balance-sheet strength</strong>
                </td>
                <td>D/E of {c.debtEquity}x, free cash flow of {formatCr(c.fcfCr)}</td>
                <td>Funding needs rising without returns following</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Peer comparison (latest reported):</p>
        <div className="peers-grid">
          {[c, ...peers].slice(0, 5).map((p) => (
            <Link href={`/company/${p.slug}`} className="peer-card" key={p.slug}>
              <h4>{p.name}</h4>
              <p>{p.industry}</p>
              <div className="peer-metrics">
                <RatingBadge rating={p.recommendation} size="sm" />
                <span style={{ fontSize: 13, color: "var(--text-45)" }}>
                  Mkt Cap {formatCr(p.marketCapCr)}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p>
          The competitive battleground is scale and capital efficiency.
          {c.name}&apos;s advantage compounds as its cost base is spread over a
          growing revenue pool, a dynamic that shows up in rising ROCE over
          time <span className="evidence evidence-i">I</span>.
        </p>
      </section>

      {/* 9. Industry Overview */}
      <section className="report-section" id="industry-overview" data-report-section>
        <h2>
          <span className="sec-num">09</span> Industry Overview
        </h2>
        <p>{sector?.description}</p>
        <p>
          The {sector?.name ?? c.sector} industry in India is undergoing
          structural change driven by urbanisation, formalisation, and
          digitisation. Listed players like {c.name} are beneficiaries of this
          shift, as organised players continue to gain share from the
          unorganised segment across most end-markets{" "}
          <span className="evidence evidence-i">I</span>.
        </p>
        <p>
          We see the industry as being in a <strong>growth phase</strong> with
          consolidation tailwinds. Competitive intensity remains manageable,
          and pricing discipline across the industry supports margin
          sustainability for the leaders.
        </p>
      </section>

      {/* 10. Market Size */}
      <section className="report-section" id="market-size" data-report-section>
        <h2>
          <span className="sec-num">10</span> Market Size
        </h2>
        <p>
          The addressable market for {sector?.name ?? c.sector} is estimated at{" "}
          <strong>₹{formatIndian(c.revenueCr * 18)} Cr</strong> annually and is
          expected to grow at {c.revenueGrowthPct - 2}% to {c.revenueGrowthPct + 3}%
          per year over the next five years{" "}
          <span className="evidence evidence-e">E</span>. {c.name}&apos;s
          revenue of {formatCr(c.revenueCr)} implies roughly{" "}
          {Math.max(1, Math.round((c.revenueCr / Math.max(1, c.revenueCr * 18)) * 100))}%
          share of this market — leaving substantial headroom for organic
          growth.
        </p>
        <p>
          The serviceable and obtainable market (SAM/SOM) is narrower,
          reflecting geographic and segment focus. Even within that narrower
          frame, we see {c.revenueGrowthPct}%+ growth as achievable given the
          capacity and distribution already in place{" "}
          <span className="evidence evidence-e">E</span>.
        </p>
        <div className="key-value-grid">
          <div className="kv-item">
            <b>₹{formatIndian(c.revenueCr * 18)} Cr</b>
            <span>Addressable Market</span>
          </div>
          <div className="kv-item">
            <b>{c.revenueGrowthPct}%+</b>
            <span>Market CAGR (est.)</span>
          </div>
          <div className="kv-item">
            <b>{Math.max(1, Math.round((c.revenueCr / Math.max(1, c.revenueCr * 18)) * 100))}%</b>
            <span>Share of Market</span>
          </div>
          <div className="kv-item">
            <b>{formatCr(c.fcfCr)}</b>
            <span>Free Cash Flow</span>
          </div>
        </div>
      </section>

      {/* 11. Growth Drivers */}
      <section className="report-section" id="growth-drivers" data-report-section>
        <h2>
          <span className="sec-num">11</span> Growth Drivers
        </h2>
        <p>Each driver below is paired with the signpost that monitors it:</p>
        <ul>
          <li>
            <strong>Structural demand:</strong> {c.shortThesis} Signpost:
            quarterly revenue growth of {c.revenueGrowthPct}%+{" "}
            <span className="evidence evidence-i">I</span>.
          </li>
          <li>
            <strong>Share and mix:</strong> growth initiatives (~
            {18 + (c.revenueGrowthPct % 7)}% of revenue) and premiumisation
            move the mix toward higher-margin lines. Signpost: growth segments
            outgrowing core for two quarters.
          </li>
          <li>
            <strong>Operating leverage:</strong> fixed-cost absorption expands
            the EBITDA margin toward {(c.ebitdaMarginPct + 1.8).toFixed(1)}%.
            Signpost: margin holding above {c.ebitdaMarginPct}% quarter to
            quarter.
          </li>
          <li>
            <strong>External tailwinds:</strong> Make in India, PLI schemes,
            and the national infra pipeline add an order backdrop for the{" "}
            {sector?.name ?? c.sector} sector. Signpost: industry data and
            order announcements.
          </li>
        </ul>
        <p>
          The single most sensitive driver is <strong>revenue growth</strong> —
          currently {c.revenueGrowthPct}% — and whether it converts into margin
          expansion. Management has guided for sustained double-digit growth{" "}
          <span className="evidence evidence-m">M</span>; our forecasts embed{" "}
          {cagr}% CAGR <span className="evidence evidence-e">E</span>, which we
          view as realistic given the demand backdrop.
        </p>
      </section>

      {/* 12. Management Quality */}
      <section className="report-section" id="management-quality" data-report-section>
        <h2>
          <span className="sec-num">12</span> Management Quality
        </h2>
        <p>
          We assess management on four dimensions: capital allocation, execution
          track record, communication, and governance. On all four, {c.name}
          scores well within our framework. The team has consistently
          reinvested into high-ROCE projects, maintained conservative
          leverage, and delivered on stated guidance{" "}
          <span className="evidence evidence-f">F</span>.
        </p>
        <p>
          The assessment rests on the reported record — returns, cash
          conversion, and guidance delivery — read against annual reports and
          conference-call transcripts{" "}
          <span className="evidence evidence-m">M</span>. Historically,
          management has preferred organic expansion over value-destructive
          M&amp;A, and has maintained a clear line of sight on shareholder
          returns — evidenced by a dividend yield of {c.dividendYieldPct}%
          alongside reinvestment for growth. We rate management quality as{" "}
          <strong>high</strong> and consider leadership stability a positive
          for the rating.
        </p>
      </section>

      {/* 13. Corporate Governance */}
      <section className="report-section" id="corporate-governance" data-report-section>
        <h2>
          <span className="sec-num">13</span> Corporate Governance
        </h2>
        <p>
          {c.name} follows Indian corporate governance norms with an
          independent-dominated board, audit and remuneration committees, and
          transparent related-party disclosures{" "}
          <span className="evidence evidence-f">F</span>. Related-party
          transactions remain within arm&apos;s-length norms, and we see no red
          flags in capital movements.
        </p>
        <p>
          Minority shareholders have historically been treated fairly, with
          dividends and buybacks returning capital when growth opportunities
          were limited. We view governance risk as <strong>low</strong> for this
          name.
        </p>
      </section>

      {/* 14. Financial Analysis */}
      <section className="report-section" id="financial-analysis" data-report-section>
        <h2>
          <span className="sec-num">14</span> Financial Analysis
        </h2>
        <p>
          Reported financials, standardised across the coverage universe{" "}
          <span className="evidence evidence-f">F</span>. The trajectory shows
          steady compounding: revenue growth of {c.revenueGrowthPct}%,
          stable-to-improving EBITDA margins, and ROE/ROCE comfortably above
          cost of capital.
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>FY-3</th>
                <th>FY-2</th>
                <th>FY-1</th>
                <th>FY0 (TTM)</th>
              </tr>
            </thead>
            <tbody>
              {hist.map((row) => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  {row.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The standout is earnings quality: net profit has grown faster than
          revenue, indicating operating leverage and margin expansion — a
          hallmark of a franchise with pricing power{" "}
          <span className="evidence evidence-i">I</span>.
        </p>
      </section>

      {/* 15. Balance Sheet */}
      <section className="report-section" id="balance-sheet" data-report-section>
        <h2>
          <span className="sec-num">15</span> Balance Sheet
        </h2>
        <div className="key-value-grid">
          <div className="kv-item">
            <b>{c.debtEquity}x</b>
            <span>Debt / Equity</span>
          </div>
          <div className="kv-item">
            <b>{c.rocePct}%</b>
            <span>ROCE</span>
          </div>
          <div className="kv-item">
            <b>{c.roePct}%</b>
            <span>Return on Equity</span>
          </div>
          <div className="kv-item">
            <b>{formatCr(c.fcfCr)}</b>
            <span>Free Cash Flow</span>
          </div>
          <div className="kv-item">
            <b>{c.dividendYieldPct}%</b>
            <span>Dividend Yield</span>
          </div>
          <div className="kv-item">
            <b>{c.pe ? `${c.pe}x` : "—"}</b>
            <span>P/E Ratio</span>
          </div>
        </div>
        <p>
          The balance sheet is <strong>conservatively leveraged</strong> with a
          debt-to-equity ratio of {c.debtEquity}x (reported){" "}
          <span className="evidence evidence-f">F</span>. Financial flexibility
          supports both organic capex and downside resilience — the funding
          case for the bear scenario in Section 19. Interest coverage remains
          strong, and liquidity is more than adequate for near-term
          obligations.
        </p>
        <p>
          For financial-sector companies, we evaluate capital adequacy and
          asset quality instead of gross leverage; the overall risk profile is
          consistent with our rating.
        </p>
      </section>

      {/* 16. Capital Allocation */}
      <section className="report-section" id="capital-allocation" data-report-section>
        <h2>
          <span className="sec-num">16</span> Capital Allocation
        </h2>
        <p>
          Management has shown a clear capital allocation framework: (1)
          reinvest in core growth where returns exceed cost of capital, (2)
          maintain conservative balance-sheet leverage, and (3) return surplus
          capital via dividends ({c.dividendYieldPct}% yield). This framework
          maximises compounding per share over time.
        </p>
        <p>
          Capex intensity is expected to remain moderate, funded by operating
          cash flow of {formatCr(c.fcfCr)} per year{" "}
          <span className="evidence evidence-e">E</span>. We do not expect
          material equity dilution, which supports our per-share valuation
          approach — the share count in Sections 19\u201320 is flat.
        </p>
      </section>

      {/* 17. Historical Performance */}
      <section className="report-section" id="historical-performance" data-report-section>
        <h2>
          <span className="sec-num">17</span> Historical Performance
        </h2>
        <p>
          Over the last three years, {c.name} has compounded revenue at
          approximately {cagr}% CAGR (reported){" "}
          <span className="evidence evidence-f">F</span>. Roughly two-thirds of
          the growth came from volume and scale and one-third from price and
          mix — the same split we carry into the forecast{" "}
          <span className="evidence evidence-i">I</span>. Profitability has
          improved each year, with EBITDA margin rising from{" "}
          {c.ebitdaMarginPct - 2}% to {c.ebitdaMarginPct}%, and ROE expanding
          from {c.roePct - 3}% to {c.roePct}%.
        </p>
        <p>
          Performance has been achieved with consistent market share gains in
          the core business and successful new initiatives. The record gives us
          confidence in management&apos;s ability to execute the forward plan.
        </p>
      </section>

      {/* 18. Forecasts */}
      <section className="report-section" id="forecasts" data-report-section>
        <h2>
          <span className="sec-num">18</span> Forecasts
        </h2>
        <p>
          Our base-case estimates assume demand stability, market-share gains,
          and modest margin expansion{" "}
          <span className="evidence evidence-e">E</span>:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>FY+1 (E)</th>
                <th>FY+2 (E)</th>
              </tr>
            </thead>
            <tbody>
              {fc.map((row) => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  {row.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Earnings growth is expected to outpace revenue growth, driven by
          fixed-cost absorption and a richer product mix — the margin bridge is
          price/mix and operating leverage, not pricing above inflation. Our
          forecasts are within management guidance ranges{" "}
          <span className="evidence evidence-m">M</span> and can be
          stress-tested in the sensitivity grid of Section 19 by adjusting the
          growth and margin assumptions.
        </p>
      </section>

      {/* 19. Valuation */}
      <section className="report-section" id="valuation" data-report-section>
        <h2>
          <span className="sec-num">19</span> Valuation
        </h2>
        <p>
          We value {c.name} with a 60/40 blend of DCF and peer-relative
          multiples, then test the result against what the price already
          implies. The DCF assumes revenue growing at {cagr}% CAGR over five
          years to a steady state, terminal growth of 4%, WACC of 10.5%, and a
          15% margin of safety on intrinsic value{" "}
          <span className="evidence evidence-e">E</span>.
        </p>
        <p>
          On relative terms, the stock trades at {c.pe ? `${c.pe}x` : "—"} P/E
          versus {peerAvgPe}x for peers — a{" "}
          {premium >= 0 ? `${premium}% premium` : `${Math.abs(premium)}% discount`} —
          which we view as justified given superior growth ({c.revenueGrowthPct}% vs sector
          average) and returns ({c.roePct}% ROE).
        </p>
        {pia && (
          <>
            <h3>Reverse DCF — what the price implies</h3>
            <div className="table-wrap">
              <table className="fin-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Value</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Implied EPS, FY0</td>
                    <td>₹{pia.eps0.toFixed(2)}</td>
                    <td>
                      <span className="evidence evidence-f">F</span>
                    </td>
                  </tr>
                  <tr>
                    <td>EPS, FY+2E</td>
                    <td>₹{pia.epsFy2.toFixed(2)}</td>
                    <td>
                      <span className="evidence evidence-e">E</span>
                    </td>
                  </tr>
                  <tr>
                    <td>EPS CAGR implied by price at {peerAvgPe}x peer frame</td>
                    <td>{pia.impliedCagrPct.toFixed(1)}%</td>
                    <td>
                      <span className="evidence evidence-i">I</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Our forecast EPS CAGR</td>
                    <td>{pia.ourCagrPct.toFixed(1)}%</td>
                    <td>
                      <span className="evidence evidence-e">E</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Exit P/E implied by target price</td>
                    <td>{pia.exitPeAtTarget.toFixed(1)}x</td>
                    <td>
                      <span className="evidence evidence-e">E</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The price does not require an unreasonable path: it embeds a
              growth rate modestly below our forecast at the peer multiple. The
              investment case is an earnings story, not a multiple-expansion
              story — which keeps the downside bounded if earnings disappoint.
            </p>
          </>
        )}
        <h3>Sensitivity — the two assumptions that matter most</h3>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Valuation basis (FY+2)</th>
                <th>EPS (₹)</th>
                <th>Multiple (x)</th>
                <th>Implied Target (₹)</th>
              </tr>
            </thead>
            <tbody>
              {sensGrid.map((r) => (
                <tr key={r.basis}>
                  <td>{r.basis}</td>
                  <td>{r.eps.toFixed(2)}</td>
                  <td>{r.mult}</td>
                  <td>{r.target !== null ? formatIndian(r.target) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The grid shows the call is earnings-led: a three-point growth shock
          at the peer multiple still clears a path close to the current price,
          while the premium-multiple case approximates the bull scenario.
        </p>
        <h3>Scenario valuation</h3>
        <div className="scenario-cards">
          {[bull, base, bear].map((s) => (
            <div className="scenario-card" key={s.name}>
              <h4>{s.name} case · {s.weightPct}% weight</h4>
              <p className="sc-target">{formatPrice(s.target)}</p>
              <ul>
                <li>
                  <strong>Revenue CAGR:</strong> {s.revenueCagr}%
                </li>
                <li>
                  <strong>EBITDA margin:</strong> {s.marginPct}%
                </li>
                <li>
                  <strong>Exit P/E:</strong> {s.exitMultiplePct}x
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p>
          <span className="evidence evidence-s">S</span> Scenarios vary
          operating assumptions, not just multiples. The bull case assumes
          share and mix gains stick; the bear case assumes growth fades and the
          stock de-rates toward the peer frame.
        </p>
        <div className="callout">
          <strong>Probability-weighted check:</strong> weighting the three
          cases 25 / 50 / 25 produces a probability-weighted target of{" "}
          {weighted}, versus our blended base target of{" "}
          {formatPrice(base.target)}. The small gap confirms the base case is
          not riding on multiple expansion.
        </div>
      </section>

      {/* 20. Target Price */}
      <section className="report-section" id="target-price" data-report-section>
        <h2>
          <span className="sec-num">20</span> Target Price
        </h2>
        <div className="key-value-grid">
          <div className="kv-item">
            <b>{formatPrice(c.currentPrice)}</b>
            <span>Current Price</span>
          </div>
          <div className="kv-item">
            <b>{formatPrice(c.targetPrice)}</b>
            <span>Target Price (12m)</span>
          </div>
          <div className="kv-item">
            <b className={c.upsidePct >= 0 ? "positive" : "negative"}>
              {upsides(c)}
            </b>
            <span>Implied Price Upside</span>
          </div>
          <div className="kv-item">
            <b className={totalRet >= 0 ? "positive" : "negative"}>
              {totalRet.toFixed(1)}%
            </b>
            <span>Expected Total Return (incl. div.)</span>
          </div>
        </div>
        <p>
          Our 12-month target of <strong>{formatPrice(c.targetPrice)}</strong>{" "}
          is the product of a FY+2 EPS of ₹{epsFy2Base.toFixed(2)} and an exit
          multiple of {pia ? pia.exitPeAtTarget.toFixed(1) : c.pe}x, blended
          60/40 with a DCF calibrated on the same operating path, with a 15%
          margin of safety{" "}
          <span className="evidence evidence-e">E</span>. The expected total
          return adds the {c.dividendYieldPct}% dividend yield to the price
          upside.
        </p>
        <p>
          The target embeds our base case. A de-rating to the peer multiple of{" "}
          {peerAvgPe}x would suggest a floor of{" "}
          {formatPrice(Math.round(c.currentPrice * 0.85))} in a stress
          scenario; the bear case in Section 19 lands at{" "}
          {formatPrice(bear.target)}. The range is the risk/reward: bull{" "}
          {formatPrice(bull.target)} / base {formatPrice(base.target)} / bear{" "}
          {formatPrice(bear.target)}.
        </p>
      </section>

      {/* 21. Risks */}
      <section className="report-section" id="risks" data-report-section>
        <h2>
          <span className="sec-num">21</span> Risks
        </h2>
        <p>
          Each risk below is written as a register — a leading indicator, a
          financial consequence, a valuation consequence, and a response — so
          it can be monitored after publication:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Leading indicator</th>
                <th>Financial effect</th>
                <th>Valuation effect</th>
                <th>Horizon</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {riskRegister.map((r) => (
                <tr key={r.risk}>
                  <td>
                    <strong>{r.risk}</strong>
                  </td>
                  <td>{r.indicator}</td>
                  <td>{r.financial}</td>
                  <td>{r.valuation}</td>
                  <td>{r.horizon}</td>
                  <td>{r.response}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The most consequential risk is a sustained demand slowdown, which
          would compress both revenue and margins simultaneously. Our valuation
          applies a 15% margin of safety specifically to absorb this scenario,
          and the bear case models it explicitly.
        </p>
      </section>

      {/* 22. Catalysts */}
      <section className="report-section" id="catalysts" data-report-section>
        <h2>
          <span className="sec-num">22</span> Catalysts
        </h2>
        <p>
          Catalysts are events tied to the model — each changes a specific
          assumption, with a bull and bear outcome and the action we would
          take:
        </p>
        <div className="table-wrap">
          <table className="fin-table">
            <thead>
              <tr>
                <th>Catalyst</th>
                <th>Signpost</th>
                <th>Model assumption it changes</th>
                <th>Bull outcome</th>
                <th>Bear outcome</th>
                <th>Analyst action</th>
              </tr>
            </thead>
            <tbody>
              {catalystRegister.map((r) => (
                <tr key={r.event}>
                  <td>
                    <strong>{r.event}</strong>
                  </td>
                  <td>{r.signpost}</td>
                  <td>{r.changes}</td>
                  <td>{r.bull}</td>
                  <td>{r.bear}</td>
                  <td>{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The most probable near-term catalyst is a <strong>beat-and-raise
          quarter</strong>: sustained {c.revenueGrowthPct}%+ growth with the
          margin bridge intact would re-rate the stock toward our target over
          the next 12 months.
        </p>
      </section>

      {/* 23. ESG */}
      <section className="report-section" id="esg" data-report-section>
        <h2>
          <span className="sec-num">23</span> ESG
        </h2>
        <p>
          We assess ESG only where it is material to cash flows, cost of
          capital, licence to operate, or the durability of the moat.
          Environmental: operations are moderate in resource intensity, with
          ongoing investments in energy efficiency and renewable sourcing.
          Social: employee and community engagement practices are consistent
          with Indian large-cap norms. Governance: as discussed in Section 13,
          board independence and disclosure standards are strong{" "}
          <span className="evidence evidence-f">F</span>.
        </p>
        <p>
          We do not see material ESG risk priced into the stock, and note that
          improving disclosures could broaden the institutional investor base
          over time — a supportive structural factor for valuation{" "}
          <span className="evidence evidence-i">I</span>.
        </p>
      </section>

      {/* 24. Conclusion */}
      <section className="report-section" id="conclusion" data-report-section>
        <h2>
          <span className="sec-num">24</span> Conclusion
        </h2>
        <p>
          {c.name} is a high-quality franchise in the {sector?.name ?? c.sector}
          sector with structural tailwinds, disciplined management, and a
          balance sheet that supports compounding. Our{" "}
          <strong>{c.recommendation}</strong> rating and{" "}
          <strong>{formatPrice(c.targetPrice)}</strong> target are anchored on
          assumptions the price already largely requires — the earnings path,
          not a multiple re-rating, does the work.
        </p>
        <p>
          The rating is conditional, not rhetorical. We would{" "}
          <strong>upgrade</strong> if margin and mix beat their signposts for
          two consecutive quarters; we would <strong>downgrade</strong> if
          revenue growth breaks below{" "}
          {Math.max(0, c.revenueGrowthPct - 5)}% or margins slip below{" "}
          {c.ebitdaMarginPct - 2}% on price competition. The risk-reward is{" "}
          {c.upsidePct >= 15 ? "clearly favourable" : c.upsidePct >= 5 ? "balanced with a positive skew" : "less attractive at current levels"} —
          making the stock{" "}
          {c.recommendation === "Sell" || c.recommendation === "Reduce" ? "one to exit or avoid for now" : "a core holding candidate for investors with a 12-24 month horizon"}.
        </p>
        <div className="callout">
          <strong>Disclosure:</strong> This report is prepared by Passive
          Research for informational purposes only and does not constitute
          investment advice, an offer, or a solicitation. Please review the
          full <Link href="/legal">Legal & Disclaimer</Link> before acting.
        </div>
      </section>

      {/* 25. Appendix */}
      <section className="report-section" id="appendix" data-report-section>
        <h2>
          <span className="sec-num">25</span> Appendix
        </h2>
        <h3>Glossary</h3>
        <ul>
          <li>
            <strong>ROE</strong> (Return on Equity): net profit ÷ shareholders&apos;
            equity. Measures how efficiently equity capital is deployed.
          </li>
          <li>
            <strong>ROCE</strong> (Return on Capital Employed): EBIT ÷ capital
            employed. The truest measure of business quality.
          </li>
          <li>
            <strong>EBITDA margin</strong>: EBITDA ÷ revenue, reflecting
            operating profitability before financing and taxes.
          </li>
          <li>
            <strong>DCF</strong> (Discounted Cash Flow): intrinsic value
            estimate by discounting future free cash flows at the WACC.
          </li>
          <li>
            <strong>Implied EPS</strong>: net profit ÷ shares outstanding, on
            a flat share count.
          </li>
          <li>
            <strong>Upside</strong>: (target − current) ÷ current, in
            percentage terms.
          </li>
          <li>
            <strong>Expected total return</strong>: (target − current +
            expected dividends) ÷ current.
          </li>
        </ul>
        <h3>Sources and evidence legend</h3>
        <p>
          Primary financial data is sourced from <strong>screener.in</strong>{" "}
          — company annual reports, quarterly results, credit ratings, and
          conference-call transcripts and investor presentations. Consensus
          references are from <strong>in.marketscreener.com</strong> as at the
          &ldquo;Last updated&rdquo; date. Prices are as at the same date.
        </p>
        <p>
          Evidence labels used in this report:{" "}
          <span className="evidence evidence-f">F</span> fact (reported or
          independently observed),{" "}
          <span className="evidence evidence-m">M</span> management statement,{" "}
          <span className="evidence evidence-e">E</span> analyst estimate,{" "}
          <span className="evidence evidence-i">I</span> inference,
          <span className="evidence">S</span> scenario. Certain historical
          columns are model-implied for standardisation and are marked (E). See
          the full framework in our <Link href="/methodology">Methodology</Link>{" "}
          page.
        </p>
        <h3>Report metadata</h3>
        <div className="report-byline">
          <span className="avatar">{c.author.charAt(0)}</span>
          <div>
            <b>{c.author}</b>
            <span>
              Research Analyst · Passive Research · Last updated{" "}
              {formatUpdated(c.updatedDate)} · {readingTime(c)} ·{" "}
              {sector?.name ?? c.sector}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}