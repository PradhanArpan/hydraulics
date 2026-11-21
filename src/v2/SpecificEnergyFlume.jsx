import React, { useEffect, useRef, useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, useReducedMotion, f2 } from "./ui.jsx";

const regimeOf = Fr =>
  Math.abs(Fr - 1) < 0.03 ? { cls: "crit", label: "Critical" }
    : Fr < 1 ? { cls: "sub", label: "Subcritical (calm, deep)" }
      : { cls: "sup", label: "Supercritical (fast, shallow)" };

const OUTCOME = {
  sub: "Ripples swim upstream. A gate or weir downstream can “tell” the water behind it that something changed (Fr < 1).",
  crit: "Ripples just hold their ground. News can neither go up nor down the channel (Fr = 1).",
  sup: "Ripples are swept downstream. Water upstream never learns what happens downstream (Fr > 1)."
};

function Arrow({ x, y, len }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + len} y2={y} className="fv-arrow" />
      <polygon points={`${x + len},${y} ${x + len - 7},${y - 4} ${x + len - 7},${y + 4}`} className="fv-arrowhead" />
    </g>
  );
}

function SideView({ y, E, V, reg }) {
  const s = 55, yb = 205, x0 = 14, x1 = 406;
  const ys = yb - y * s;
  const off = E * s > 188;
  const ye = off ? 16 : yb - E * s;
  const len = Math.min(80, 12 + V * 14);
  const rows = y * s > 40 ? [0.3, 0.7] : [0.5];
  return (
    <svg viewBox="0 0 420 240" className="fv" role="img" aria-label={`Side view of a channel: depth ${f2(y)} metres, speed ${f2(V)} metres per second`}>
      <rect x={x0} y={ys} width={x1 - x0} height={yb - ys} className="fv-water" />
      <line x1={x0} y1={ys} x2={x1} y2={ys} className="fv-surface" />
      <rect x={x0} y={yb} width={x1 - x0} height={16} className="fv-bed" />
      <g className={"fv-flow fv-flow--" + reg.cls}>
        {rows.map(r => <Arrow key={r} x={70} y={yb - y * s * r} len={len} />)}
      </g>
      <line x1={x0} y1={ye} x2={x1} y2={ye} className="fv-egl" />
      <text x={x0 + 4} y={ye - 5} className="fv-lbl fv-lbl--egl">{off ? "↑ energy line (off the top)" : "energy line  E = y + V²/2g"}</text>
      {!off && ys - ye > 16 && (
        <g>
          <line x1={50} y1={ye} x2={50} y2={ys} className="fv-dim" />
          <text x={56} y={(ye + ys) / 2 + 4} className="fv-lbl">{"V²/2g = " + f2(E - y) + " m"}</text>
        </g>
      )}
      <line x1={392} y1={ys} x2={392} y2={yb} className="fv-dim" />
      <text x={388} y={(ys + yb) / 2 + 4} textAnchor="end" className="fv-lbl fv-lbl--w">y = {f2(y)} m</text>
    </svg>
  );
}

function EyPlot({ q, y, E, alt, yc, Emin, reg }) {
  const W = 320, Ht = 240, L = 44, R = 12, T = 14, B = 38;
  const px = e => L + (e / 4) * (W - L - R);
  const py = d => Ht - B - (d / 3) * (Ht - B - T);
  const pts = [];
  for (let d = 0.1; d <= 3.0001; d += 0.02) { const e = H.specificEnergy(d, q); if (e <= 4) pts.push(px(e).toFixed(1) + "," + py(d).toFixed(1)); }
  const inView = E <= 4;
  return (
    <svg viewBox={`0 0 ${W} ${Ht}`} className="fv" role="img" aria-label="Specific energy versus depth curve">
      {[0, 1, 2, 3].map(d => <g key={d}><line x1={L} x2={W - R} y1={py(d)} y2={py(d)} className="fv-grid" /><text x={L - 6} y={py(d) + 4} textAnchor="end" className="fv-tick">{d}</text></g>)}
      {[0, 1, 2, 3, 4].map(e => <text key={e} x={px(e)} y={Ht - B + 15} textAnchor="middle" className="fv-tick">{e}</text>)}
      <line x1={L} y1={Ht - B} x2={W - R} y2={Ht - B} className="fv-axis" />
      <line x1={L} y1={T} x2={L} y2={Ht - B} className="fv-axis" />
      <text x={(L + W - R) / 2} y={Ht - 6} textAnchor="middle" className="fv-lbl">Specific energy E (m)</text>
      <text x={12} y={(T + Ht - B) / 2} transform={`rotate(-90 12 ${(T + Ht - B) / 2})`} textAnchor="middle" className="fv-lbl">Depth y (m)</text>
      <line x1={px(0)} y1={py(0)} x2={px(3)} y2={py(3)} className="fv-diag" />
      <text x={px(2.7) + 4} y={py(2.7) + 14} className="fv-tick">E = y</text>
      <polyline points={pts.join(" ")} className="fv-curve" />
      <circle cx={px(Emin)} cy={py(yc)} r="4" className="fv-crit" />
      <text x={px(Emin) + 8} y={py(yc) + 4} className="fv-lbl">critical</text>
      {inView && (
        <g>
          <line x1={px(E)} x2={px(E)} y1={py(y)} y2={py(alt)} className="fv-same" />
          <circle cx={px(E)} cy={py(alt)} r="5" className="fv-alt" />
          <circle cx={px(E)} cy={py(y)} r="6.5" className={"fv-dot fv-dot--" + reg.cls} />
        </g>
      )}
      {!inView && <text x={W / 2} y={T + 24} textAnchor="middle" className="fv-lbl">E is off the chart for this depth</text>}
    </svg>
  );
}

const T_END = 2.3;
function PlanView({ V, c, t }) {
  const k = 22, x0 = 230, cy = 100;
  const rings = [0, 0.45, 0.9].map((d, i) => {
    const tt = t - d; if (tt <= 0) return null;
    return <circle key={i} cx={x0 + V * tt * k} cy={cy} r={c * tt * k} className="fv-ring" style={{ opacity: Math.max(0.1, 1 - tt / 2.6) }} />;
  });
  const t1 = t > 0 ? t : 0;
  const tip = x0 + (V - c) * t1 * k;
  return (
    <svg viewBox="0 0 560 200" className="fv" role="img" aria-label="Top view of a channel with ripples from a dropped pebble">
      <defs><clipPath id="fv-clip"><rect x="10" y="30" width="540" height="140" /></clipPath></defs>
      <rect x="10" y="30" width="540" height="140" className="fv-water" />
      <line x1="10" y1="30" x2="550" y2="30" className="fv-bank" /><line x1="10" y1="170" x2="550" y2="170" className="fv-bank" />
      <g clipPath="url(#fv-clip)">{rings}</g>
      <line x1={x0} y1="30" x2={x0} y2="170" className="fv-ref" />
      <circle cx={x0} cy={cy} r="4" className="fv-pebble" />
      <text x={x0 + 6} y="44" className="fv-lbl">pebble lands here</text>
      {t > 0.05 && tip < x0 - 3 && tip > 12 && <g><circle cx={tip} cy={cy} r="5" className="fv-tip" /><text x={tip} y={cy - 12} textAnchor="middle" className="fv-lbl fv-lbl--tip">ripple moving upstream</text></g>}
      <Arrow x={24} y={186} len={46} />
      <text x={78} y={190} className="fv-lbl">flow</text>
    </svg>
  );
}

export default function SpecificEnergyFlume() {
  const [y, setY] = useState(1.2);
  const [q, setQ] = useState(1.5);
  const [mode, setMode] = useState("energy");
  const [more, setMore] = useState(false);
  const [t, setT] = useState(0);
  const reduced = useReducedMotion();
  const raf = useRef(0);

  const yc = H.criticalDepth(q), Emin = 1.5 * yc;
  const V = q / y, Fr = H.froude(q, y), E = H.specificEnergy(y, q), alt = H.alternateDepth(y, q);
  const c = Math.sqrt(H.G * y);
  const reg = regimeOf(Fr);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  const drop = () => {
    cancelAnimationFrame(raf.current);
    if (reduced) { setT(T_END); return; }
    const t0 = performance.now();
    const tick = now => {
      const s = Math.min(T_END, ((now - t0) / 1000) * 0.7);
      setT(s);
      if (s < T_END) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };
  useEffect(() => { if (mode === "pebble" && t === 0) drop(); }, [mode]);

  return (
    <Sim title="One flow, two possible depths">
      <Seg label="View" value={mode} onChange={setMode} options={[["energy", "Energy view"], ["pebble", "Pebble test"]]} />
      <div className="sl-wrap">
        <Slider label="Water depth y" value={y} min={0.15} max={2.5} step={0.01} unit="m" onChange={setY} format={f2} />
        {more && <Slider label="Flow per metre width q" value={q} min={0.5} max={2.5} step={0.05} unit={"m²/s"} onChange={setQ} format={f2} />}
        <div className="sl-row">
          <button type="button" className="btn ghost" onClick={() => setY(+yc.toFixed(2))}>Jump to critical depth</button>
          <button type="button" className="btn ghost" onClick={() => setMore(m => !m)} aria-expanded={more}>{more ? "Hide" : "Show"} more controls</button>
        </div>
      </div>

      {mode === "energy" ? (
        <div className="fv-grid2">
          <SideView y={y} E={E} V={V} reg={reg} />
          <EyPlot q={q} y={y} E={E} alt={alt} yc={yc} Emin={Emin} reg={reg} />
        </div>
      ) : (
        <div>
          <PlanView V={V} c={c} t={t} />
          <div className="sl-row"><button type="button" className="btn" onClick={drop}>Drop a pebble</button>
            <span className="fv-speeds">ripple speed <b>c = {f2(c)} m/s</b> &nbsp;vs&nbsp; current <b>V = {f2(V)} m/s</b></span></div>
          <p className={"fv-outcome fv-outcome--" + reg.cls} aria-live="polite">{OUTCOME[reg.cls]}</p>
        </div>
      )}

      <div className="k2-row">
        <Kpi v={f2(V) + " m/s"} l="Speed V" />
        <Kpi v={f2(Fr)} l="Froude number Fr" tone={reg.cls} />
        <Kpi v={f2(E) + " m"} l="Specific energy E" />
        <Kpi v={f2(alt) + " m"} l="Other depth, same E" />
      </div>
      <p className={"fv-regime fv-regime--" + reg.cls}>{reg.label}{Math.abs(Fr - 1) >= 0.03 ? "" : " — the minimum-energy state"}</p>
      <p className="sim__note">Diagrams are schematic. Depth and energy values are computed for a wide rectangular channel.</p>
    </Sim>
  );
}
