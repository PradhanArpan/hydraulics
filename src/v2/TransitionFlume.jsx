import React, { useMemo, useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f2 } from "./ui.jsx";

// Fixed channel: Q = 6 m3/s in a 3 m wide rectangular channel, so q = 2 m2/s.
const Q = 6, B1 = 3, q1 = Q / B1, yc1 = H.criticalDepth(q1);

function solve(kind, regime, dz, b2) {
  const y1 = regime === "sub" ? 1.5 : 0.4;
  const E1 = H.specificEnergy(y1, q1);
  const o = { kind, regime, y1, E1, choked: false, dz: kind === "hump" ? dz : 0, b2: kind === "narrow" ? b2 : B1 };
  if (kind === "hump") {
    const h = H.humpResponse(q1, y1, dz);
    o.limit = h.dzMax; o.qTh = q1;
    if (!h.choked) Object.assign(o, { yUp: y1, yTh: h.y2, yDown: y1, Eline: E1, E2: h.E2 });
    else {
      const Ep = 1.5 * yc1 + dz;
      Object.assign(o, { choked: true, yUp: H.depthAtEnergy(Ep, q1, "sub"), yTh: yc1, yDown: H.depthAtEnergy(Ep, q1, "sup"), Eline: Ep, E2: 1.5 * yc1 });
    }
  } else {
    const q2 = Q / b2, c = H.contractionResponse(Q, B1, y1, b2);
    o.limit = c.bMin; o.qTh = q2;
    if (!c.choked) Object.assign(o, { yUp: y1, yTh: c.y2, yDown: y1, Eline: E1, E2: E1 });
    else {
      const yc2 = H.criticalDepth(q2), Ep = 1.5 * yc2;
      Object.assign(o, { choked: true, yUp: H.depthAtEnergy(Ep, q1, "sub"), yTh: yc2, yDown: H.depthAtEnergy(Ep, q1, "sup"), Eline: Ep, E2: Ep });
    }
  }
  return o;
}

const sm = u => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const XA = 200, XB = 250, XC = 310, XD = 360;
// 0 before the transition, 1 inside it, 0 after it (smooth ramps)
const shape = x => (x < XA ? 0 : x < XB ? sm((x - XA) / (XB - XA)) : x <= XC ? 1 : x < XD ? 1 - sm((x - XC) / (XD - XC)) : 0);
const mix = (a, b, t) => a + (b - a) * t;

function SideView({ m }) {
  const s = 58, yb = 212;
  const pts = [], bed = [];
  for (let x = 10; x <= 550; x += 4) {
    const t = shape(x);
    const zb = m.dz * t;
    let h;
    if (x < XB) h = mix(m.yUp, zb + m.yTh, t);
    else if (x <= XC) h = zb + m.yTh;
    else h = mix(m.yDown, zb + m.yTh, t);
    pts.push([x, yb - h * s]); bed.push([x, yb - zb * s]);
  }
  const P = a => a.map(p => p[0].toFixed(0) + "," + p[1].toFixed(1)).join(" ");
  const ye = yb - m.Eline * s;
  return (
    <svg viewBox="0 0 560 250" className="fv" role="img" aria-label="Side view of flow over a bed hump or through a narrowing">
      <polygon points={P(pts) + " " + P([...bed].reverse())} className="fv-water" />
      <polyline points={P(pts)} className="fv-surface" fill="none" />
      <polygon points={P(bed) + " 550,232 10,232"} className="fv-bed" />
      {!m.choked && <line x1="10" x2="550" y1={yb - m.yUp * s} y2={yb - m.yUp * s} className="fv-ref" />}
      <line x1="10" x2="550" y1={ye} y2={ye} className="fv-egl" />
      <text x="14" y={ye - 5} className="fv-lbl fv-lbl--egl">{m.choked ? "energy line (raised upstream)" : "energy line (stays level)"}</text>
      <text x="14" y={yb - m.yUp * s + 16} className="fv-lbl">{"upstream depth " + f2(m.yUp) + " m"}</text>
      <text x="286" y={yb - (m.dz + m.yTh) * s + 16} textAnchor="middle" className="fv-lbl">{(m.kind === "hump" ? "over hump " : "in narrow part ") + f2(m.yTh) + " m"}</text>
      <text x="546" y={yb - m.yDown * s + 16} textAnchor="end" className="fv-lbl">{"downstream " + f2(m.yDown) + " m"}</text>
      {m.kind === "hump" && m.dz > 0.02 && <text x="286" y={yb - m.dz * s + 14} textAnchor="middle" className="fv-lbl fv-lbl--dim">{"hump " + f2(m.dz) + " m"}</text>}
    </svg>
  );
}

function PlanView({ m }) {
  const ws = 19, cy = 40, h1 = (B1 / 2) * ws, h2 = (m.b2 / 2) * ws;
  const top = [], bot = [];
  for (let x = 10; x <= 550; x += 4) { const h = mix(h1, h2, shape(x)); top.push([x, cy - h]); bot.push([x, cy + h]); }
  const P = a => a.map(p => p[0].toFixed(0) + "," + p[1].toFixed(1)).join(" ");
  return (
    <svg viewBox="0 0 560 100" className="fv" role="img" aria-label="Plan view of the channel narrowing">
      <polygon points={P(top) + " " + P([...bot].reverse())} className="fv-water" />
      <polyline points={P(top)} fill="none" className="fv-bank" /><polyline points={P(bot)} fill="none" className="fv-bank" />
      <text x="14" y="94" className="fv-lbl fv-lbl--dim">plan view (from above)</text>
      <text x="286" y="94" textAnchor="middle" className="fv-lbl">{"width " + f2(m.b2) + " m"}</text>
    </svg>
  );
}

function EyDiagram({ m }) {
  const W = 320, Ht = 250, L = 44, R = 12, T = 14, B = 38, Em = 3.2, Ym = 2.4;
  const px = e => L + (e / Em) * (W - L - R), py = d => Ht - B - (d / Ym) * (Ht - B - T);
  const curve = q => { const a = []; for (let d = 0.1; d <= Ym; d += 0.02) { const e = H.specificEnergy(d, q); if (e <= Em) a.push(px(e).toFixed(1) + "," + py(d).toFixed(1)); } return a.join(" "); };
  const cls = m.regime === "sub" ? "sub" : "sup";
  return (
    <svg viewBox={`0 0 ${W} ${Ht}`} className="fv" role="img" aria-label="Specific energy diagram showing the state before and over the transition">
      {[0, 1, 2].map(d => <g key={d}><line x1={L} x2={W - R} y1={py(d)} y2={py(d)} className="fv-grid" /><text x={L - 6} y={py(d) + 4} textAnchor="end" className="fv-tick">{d}</text></g>)}
      {[0, 1, 2, 3].map(e => <text key={e} x={px(e)} y={Ht - B + 15} textAnchor="middle" className="fv-tick">{e}</text>)}
      <line x1={L} y1={Ht - B} x2={W - R} y2={Ht - B} className="fv-axis" /><line x1={L} y1={T} x2={L} y2={Ht - B} className="fv-axis" />
      <text x={(L + W - R) / 2} y={Ht - 6} textAnchor="middle" className="fv-lbl">Specific energy E (m)</text>
      <text x={12} y={(T + Ht - B) / 2} transform={`rotate(-90 12 ${(T + Ht - B) / 2})`} textAnchor="middle" className="fv-lbl">Depth y (m)</text>
      <polyline points={curve(q1)} className="fv-curve" />
      {m.kind === "narrow" && <polyline points={curve(m.qTh)} className="fv-curve" strokeDasharray="5 4" />}
      {m.kind === "narrow" && (
        <g>
          <text x={L + 8} y={T + 12} className="fv-lbl">{"solid: channel (q = " + f2(q1) + ")"}</text>
          <text x={L + 8} y={T + 27} className="fv-lbl">{"dashed: narrow part (q = " + f2(m.qTh) + ")"}</text>
        </g>
      )}
      <line x1={px(0)} y1={py(0)} x2={px(2.4)} y2={py(2.4)} className="fv-diag" />
      {!m.choked && <circle cx={px(m.E2)} cy={py(m.yTh)} r="6" className="fv-alt" />}
      <circle cx={px(m.choked ? m.Eline : m.E1)} cy={py(m.choked ? m.yUp : m.y1)} r="6.5" className={"fv-dot fv-dot--" + cls} />
      {m.choked && <circle cx={px(m.E2)} cy={py(m.yTh)} r="5" className="fv-crit" />}
      <text x={px(m.choked ? m.Eline : m.E1) + 9} y={py(m.choked ? m.yUp : m.y1) - 7} className="fv-lbl">{m.choked ? "piled up upstream" : "before"}</text>
      <text x={px(m.E2) + 9} y={py(m.yTh) + 16} className="fv-lbl">{m.choked ? "critical" : "over it"}</text>
    </svg>
  );
}

export default function TransitionFlume() {
  const [kind, setKind] = useState("hump");
  const [regime, setRegime] = useState("sub");
  const [dz, setDz] = useState(0.2);
  const [b2, setB2] = useState(2.5);
  const m = useMemo(() => solve(kind, regime, dz, b2), [kind, regime, dz, b2]);
  const rise = m.dz + m.yTh - m.yUp; // surface level over the transition minus upstream level

  const status = m.choked
    ? (m.regime === "sub"
      ? "Choked. " + (m.kind === "hump" ? "The hump is higher than the energy to spare." : "The opening is narrower than the water can squeeze through.") + " Water piles up upstream by " + f2(m.yUp - m.y1) + " m, then shoots over the top at critical depth."
      : "Choked. A hydraulic jump forms upstream and the flow turns calm (schematic picture).")
    : (m.kind === "hump"
      ? (m.regime === "sub" ? "Calm flow: the water surface DIPS over the hump." : "Fast flow: the water surface RISES over the hump.")
      : (m.regime === "sub" ? "Calm flow: the water gets shallower and speeds up in the narrow part." : "Fast flow: the water gets deeper and slows down in the narrow part."));

  return (
    <Sim title="Bumps and narrow gaps">
      <Seg label="What the channel does" value={kind} onChange={setKind} options={[["hump", "Raise the bed (hump)"], ["narrow", "Narrow the channel"]]} />
      <Seg label="Incoming flow" value={regime} onChange={setRegime} options={[["sub", "Calm and deep (Fr < 1)"], ["sup", "Fast and shallow (Fr > 1)"]]} />
      <div className="sl-wrap">
        {kind === "hump"
          ? <Slider label="Hump height Δz" value={dz} min={0} max={0.9} step={0.01} unit="m" onChange={setDz} format={f2} />
          : <Slider label="Width of the narrow part b₂" value={b2} min={1.0} max={3.0} step={0.05} unit="m" onChange={setB2} format={f2} />}
      </div>
      {kind === "narrow" && <PlanView m={m} />}
      <SideView m={m} />
      <p className={"fv-regime fv-regime--" + (m.choked ? "crit" : m.regime)} aria-live="polite">{status}</p>
      <div className="fv-grid2">
        <EyDiagram m={m} />
        <div className="k2-col">
          <Kpi v={f2(m.yTh) + " m"} l={m.kind === "hump" ? "Depth over the hump" : "Depth in the narrow part"} tone={m.choked ? "crit" : m.regime} />
          <Kpi v={m.choked ? "choked" : (Math.abs(rise) < 0.005 ? "no change" : (rise < 0 ? "dips " : "rises ") + f2(Math.abs(rise)) + " m")} l="Water surface over it, compared with upstream" />
          <Kpi v={f2(m.limit) + " m"} l={m.kind === "hump" ? "Highest hump before choking" : "Narrowest gap before choking"} />
        </div>
      </div>
      <p className="sim__note">Fixed flow: 6 m³/s in a 3 m wide channel, no energy lost. Diagrams are schematic.</p>
    </Sim>
  );
}
