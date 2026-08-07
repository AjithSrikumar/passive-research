import type { NoteBlock, ResearchNote } from "@/lib/notes/types";

function Inline({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
      )}
    </>
  );
}

function Table({
  block,
  fixedCols,
}: {
  block: Extract<NoteBlock, { type: "table" | "drivers" }>;
  fixedCols?: string[];
}) {
  const cols =
    block.type === "drivers"
      ? (fixedCols ?? ["Driver", "Evidence", "Financial consequence", "Monitoring"])
      : block.cols;
  const rows =
    block.type === "drivers"
      ? block.rows.map((r) => [r.driver, r.evidence, r.consequence, r.monitor])
      : block.rows;
  return (
    <div className="note-table-wrap">
      {block.type === "table" && block.caption ? (
        <p className="note-caption">{block.caption}</p>
      ) : null}
      <table className="note-table">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} data-label={cols[ci] ?? ""}>
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }: { block: NoteBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="note-p">
          <Inline text={block.text} />
        </p>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "callout":
      return (
        <div className={`note-callout ${block.tone ?? "info"}`}>
          {block.title ? <b className="note-callout-title">{block.title}</b> : null}
          <p>
            <Inline text={block.text} />
          </p>
        </div>
      );
    case "kv":
      return (
        <div className="note-kv">
          {block.items.map((item) => (
            <div className="note-kv-item" key={item.label}>
              <b>{item.value}</b>
              <span>{item.label}</span>
              {item.sub ? <small>{item.sub}</small> : null}
            </div>
          ))}
        </div>
      );
    case "table":
      return <Table block={block} />;
    case "drivers":
      return <Table block={block} />;
    case "cards":
      return (
        <div className="note-cards">
          {block.items.map((card) => (
            <div className="note-card" key={card.title}>
              <h4>{card.title}</h4>
              <p>
                <Inline text={card.body} />
              </p>
            </div>
          ))}
        </div>
      );
    case "list":
      return (
        <div className="note-list">
          {block.items.map((item) => (
            <div className="note-li" key={item.lead}>
              <b>{item.lead}</b>
              <p>
                <Inline text={item.text} />
              </p>
            </div>
          ))}
        </div>
      );
    case "quote":
      return (
        <blockquote className="note-quote">
          <p>
            <Inline text={block.text} />
          </p>
          <footer>{block.source}</footer>
        </blockquote>
      );
    case "risks":
      return (
        <div className="note-risks">
          {block.rows.map((r) => (
            <div className="note-risk" key={r.risk}>
              <div className="note-risk-head">
                <b>{r.risk}</b>
                <span className={`note-risk-prob p-${r.probability.toLowerCase()}`}>
                  {r.probability}
                </span>
              </div>
              <dl>
                <dt>Financial impact</dt>
                <dd>
                  <Inline text={r.financial} />
                </dd>
                <dt>Valuation impact</dt>
                <dd>
                  <Inline text={r.valuation} />
                </dd>
                <dt>Leading indicators</dt>
                <dd>{r.indicator}</dd>
                <dt>Mitigation</dt>
                <dd>{r.mitigation}</dd>
                <dt>Monitoring KPI</dt>
                <dd>{r.kpi}</dd>
              </dl>
            </div>
          ))}
        </div>
      );
    case "downloads":
      return (
        <ul className="note-downloads">
          {block.items.map((d) => (
            <li key={d.url}>
              <a href={d.url} target="_blank" rel="noopener noreferrer">
                {d.label}
              </a>
              {d.note ? <span>{d.note}</span> : null}
            </li>
          ))}
        </ul>
      );
    case "small":
      return (
        <p className="note-small">
          <Inline text={block.text} />
        </p>
      );
    default:
      return null;
  }
}

export default function ReportNote({ note }: { note: ResearchNote }) {
  return (
    <article className="report-content note">
      <div className="note-header">
        {note.header.map((item) => (
          <div className="note-kv-item" key={item.label}>
            <b>{item.value}</b>
            <span>{item.label}</span>
            {item.sub ? <small>{item.sub}</small> : null}
          </div>
        ))}
      </div>

      {note.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="report-section note-section"
          data-report-section
        >
          <h2>{section.label}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </article>
  );
}