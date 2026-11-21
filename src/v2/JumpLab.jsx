import React, { memo, useMemo, useRef, useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, useReducedMotion, useInView, useClock, f1, f2 } from "./ui.jsx";

const NOTE = {
  undular: "Gentle ripples, almost no roller. Very little energy is lost.",
  weak: "Small rollers and a smooth surface after the jump. Low loss.",
  oscillating: "The jet flips between the bottom and the top and sends waves far downstream.",
  steady: "A stable, well-formed roller. This is the type designers aim for in a stilling basin.",
  strong: "Violent and rough, with a lot of energy lost. The basin floor must be very strong."
};

const smooth = u => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };

function Particles({ cx, cy, rx, ry, n, w, t, reduced }) {
  const tt = reduced ? 0 : t;
  return Array.from({ length: n }, (_, i) => {
    const frac = (i * 0.618) % 1;
    const th = 2 * Math.PI * (i / n + w * tt);
    return <circle key={i} cx={cx + rx * (0.35 + 0.65 * frac) * Math.cos(th)} cy={cy - ry * (0.35 + 0.65 * frac) * Math.sin(th)} r="2.6" className="fv-part" />;
  });
}

function JumpSide({ j, mode, ratio, showE, t, reduced }) {
  const yb = 232, xG = 60;
  const q = j.q, yc = H.criticalDepth(q);
  const W = { toe: 170, up: j.y1, down: j.y2, state: "jump", yt: j.y2 };
  let s = 175 / Math.max(j.y2, showE && mode === "jump" ? j.E1 : 0);
  if (mode === "where") {
    s = 175 / Math.max(j.E1, j.y2 * 1.25);
    W.yt = ratio * j.y2; W.down = W.yt;
    if (W.yt <= yc * 1.001) { W.state = "none"; W.toe = 520; W.up = yc; }
    else if (ratio > 1.04) { W.state = "drowned"; W.toe = xG + 6; }
    else if (ratio >= 1) { W.state = "toe"; W.toe = 130; W.up = j.y1; }
    else {
      W.state = "swept";
      W.up = H.conjugateDepth(W.yt, q);
      W.toe = 130 + Math.min(1, (W.up - j.y1) / (yc - j.y1)) * 380;
    }
  }
  const FrToe = q / W.up / Math.sqrt(H.G * W.up);
  const Lpx = Math.max(40, Math.min(300, (6 * W.down * s) / 3));
  const undular = FrToe < 1.7;
  const xL = mode === "where" ? xG + 5 : 10;
  const depthAt = x => {
    if (W.state === "drowned") return W.yt;
    if (W.state === "none") return j.y1 + (yc - j.y1) * Math.min(1, (x - xL) / (W.toe - xL));
    if (x < W.toe) return mode === "where" ? j.y1 + (W.up - j.y1) * (x - xL) / (W.toe - xL) : j.y1;
    const u = (x - W.toe) / Lpx;
    if (undular) return W.up + (W.down - W.up) * (1 - Math.exp(-3 * u)) + 0.22 * (W.down - W.up) * Math.exp(-1.2 * u) * Math.sin(2 * Math.PI * u * 2.5);
    return W.up + (W.down - W.up) * smooth(u / 0.55);
  };
  const Y = d => yb - Math.max(d * s, 3);
  const pts = [];
  for (let x = xL; x <= 630; x += 4) pts.push(x.toFixed(0) + "," + Y(depthAt(x)).toFixed(1));
  const surf = pts.join(" ");
  const rollerOn = (W.state === "jump" || W.state === "toe" || W.state === "swept") && !undular;
  const Y2 = Y(W.down);
  const foam = [];
  if (rollerOn) for (let i = 0; i < 10; i++) {
    const x = W.toe + i * 0.06 * Lpx;
    foam.push(<circle key={i} cx={x} cy={Y(depthAt(x)) + 3} r={2.2 + 1.4 * Math.abs(Math.sin((reduced ? 0 : t) * 7 + i * 1.7))} className="fv-foam" />);
  }
  const nPart = 6 + Math.round(FrToe * 2), w = 0.45 + 0.07 * FrToe;
  const E1y = yb - j.E1 * s, E2y = yb - j.E2 * s;

  return (
    <svg viewBox="0 0 640 270" className="fv fv--wide" role="img" aria-label="Side view of a hydraulic jump">
      {mode === "where" && (() => {
        const res = Math.min(j.E1 * s, 205);
        const gb = yb - Math.max(j.y1 * s * 1.3, j.y1 * s + 7);
        return (
          <g>
            <rect x="10" y={yb - res} width={xG - 14} height={res} className="fv-water" />
            <rect x={xG - 4} y="20" width="7" height={gb - 20} className="fv-gate" />
            <text x="12" y={yb - res - 6} className="fv-lbl">pool</text>
          </g>
        );
      })()}
      <polygon points={`${surf} 630,${yb} ${xL},${yb}`} className="fv-water" />
      <polyline points={surf} className="fv-surface" fill="none" />
      <rect x="10" y={yb} width="620" height="16" className="fv-bed" />
      {rollerOn && <Particles cx={W.toe + 0.27 * Lpx} cy={Y2 + 0.3 * (yb - Y2)} rx={0.28 * Lpx} ry={0.24 * (yb - Y2)} n={nPart} w={w} t={t} reduced={reduced} />}
      {W.state === "drowned" && <Particles cx={120} cy={Y2 + 0.45 * (yb - Y2)} rx={55} ry={0.3 * (yb - Y2)} n={14} w={0.5} t={t} reduced={reduced} />}
      {foam}
      {mode === "jump" && showE && (
        <g>
          <line x1="10" x2="620" y1={E1y} y2={E1y} className="fv-egl" />
          <line x1={W.toe + Lpx} x2="630" y1={E2y} y2={E2y} className="fv-egl" />
          <line x1={W.toe} y1={E1y} x2={W.toe + Lpx} y2={E2y} className="fv-egl fv-egl--link" />
          <line x1="612" x2="612" y1={E1y} y2={E2y} className="fv-dim" />
          <text x="606" y={(E1y + E2y) / 2 + 4} textAnchor="end" className="fv-lbl fv-lbl--egl">{"energy lost " + f2(j.dE) + " m"}</text>
          <text x="14" y={E1y - 5} className="fv-lbl fv-lbl--egl">energy line</text>
        </g>
      )}
      {mode === "jump" && <text x="14" y={Math.min(Y(j.y1) - 8, 200)} className="fv-lbl">{"y₁ = " + f2(j.y1) + " m  (fast, shallow)"}</text>}
      {mode === "jump" && <text x="626" y={Y2 + 20} textAnchor="end" className="fv-lbl">{"y₂ = " + f2(j.y2) + " m  (slow, deep)"}</text>}
      {mode === "where" && <text x="626" y={Y2 + 20} textAnchor="end" className="fv-lbl">{"tailwater = " + f2(W.yt) + " m  (the jump needs " + f2(j.y2) + " m)"}</text>}
      <text x="14" y="262" className="fv-lbl fv-lbl--dim">{"Schematic. Heights are to one scale; the length of the jump is squeezed to fit."}</text>
    </svg>
  );
}

const MyPlot = memo(function MyPlot({ j }) {
  const Wd = 320, Ht = 240, L = 44, R = 12, T = 14, B = 38;
  const q = j.q, M1 = H.specificForce(j.y1, q), Mmax = M1 * 1.2;
  const dmax = Math.max(1, Math.ceil(j.y2 * 1.25 * 2) / 2);
  const Mmin = H.specificForce(H.criticalDepth(q), q);
  const px = m => L + ((m - Mmin * 0.7) / (Mmax - Mmin * 0.7)) * (Wd - L - R);
  const py = d => Ht - B - (d / dmax) * (Ht - B - T);
  const pts = [];
  for (let d = j.y1 * 0.6; d <= dmax; d += dmax / 150) { const m = H.specificForce(d, q); if (m <= Mmax) pts.push(px(m).toFixed(1) + "," + py(d).toFixed(1)); }
  return (
    <svg viewBox={`0 0 ${Wd} ${Ht}`} className="fv" role="img" aria-label="Specific force versus depth: both depths of a jump sit on the same value">
      <line x1={L} y1={Ht - B} x2={Wd - R} y2={Ht - B} className="fv-axis" />
      <line x1={L} y1={T} x2={L} y2={Ht - B} className="fv-axis" />
      <text x={(L + Wd - R) / 2} y={Ht - 6} textAnchor="middle" className="fv-lbl">Push of the flow (specific force M)</text>
      <text x={12} y={(T + Ht - B) / 2} transform={`rotate(-90 12 ${(T + Ht - B) / 2})`} textAnchor="middle" className="fv-lbl">Depth y</text>
      <polyline points={pts.join(" ")} className="fv-curve" />
      <line x1={px(M1)} x2={px(M1)} y1={py(j.y1)} y2={py(j.y2)} className="fv-same" />
      <circle cx={px(M1)} cy={py(j.y1)} r="6" className="fv-dot fv-dot--sup" />
      <circle cx={px(M1)} cy={py(j.y2)} r="6" className="fv-dot fv-dot--sub" />
      <text x={px(M1) - 10} y={py(j.y1) + 4} textAnchor="end" className="fv-lbl">{"before: y₁"}</text>
      <text x={px(M1) - 10} y={py(j.y2) + 4} textAnchor="end" className="fv-lbl">{"after: y₂"}</text>
    </svg>
  );
});

export default function JumpLab() {
  const [Fr, setFr] = useState(4);
  const [y1, setY1] = useState(0.3);
  const [mode, setMode] = useState("jump");
  const [ratio, setRatio] = useState(1);
  const [showE, setShowE] = useState(false);
  const [more, setMore] = useState(false);
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref);
  const t = useClock(inView && !reduced);

  const j = useMemo(() => H.jump(y1, Fr), [y1, Fr]);
  const yc = H.criticalDepth(j.q);
  const status = (() => {
    const yt = ratio * j.y2;
    if (yt <= yc * 1.001) return ["warn", "The tailwater is below critical depth. No jump can form; the water stays fast."];
    if (ratio > 1.04) return ["warn", "Tailwater too high: the jump is drowned. It sits right at the gate and does less work."];
    if (ratio >= 1) return ["good", "Tailwater matches what the jump needs. The jump forms right at the toe of the gate."];
    return ["warn", "Tailwater too low: the jump is swept downstream, away from the basin floor."];
  })();

  return (
    <div ref={ref}>
      <Sim title="Build a hydraulic jump">
        <Seg label="View" value={mode} onChange={setMode} options={[["jump", "The jump"], ["where", "Where does it form?"]]} />
        <div className="sl-wrap">
          <Slider label="How fast is the incoming flow? (Froude number Fr₁)" value={Fr} min={1.1} max={10} step={0.1} onChange={setFr} format={f1} />
          {mode === "where" && <Slider label="Tailwater depth ÷ depth the jump needs" value={ratio} min={0.6} max={1.4} step={0.01} onChange={setRatio} format={f2} />}
          {more && <Slider label="Incoming depth y₁" value={y1} min={0.1} max={0.6} step={0.05} unit="m" onChange={setY1} format={f2} />}
          <div className="sl-row">
            {mode === "jump" && <label className="chk2"><input type="checkbox" checked={showE} onChange={e => setShowE(e.target.checked)} /> Show the energy line</label>}
            <button type="button" className="btn ghost" onClick={() => setMore(m => !m)} aria-expanded={more}>{more ? "Hide" : "Show"} more controls</button>
          </div>
        </div>

        <JumpSide j={j} mode={mode} ratio={ratio} showE={showE} t={t} reduced={reduced} />

        {mode === "jump" ? (
          <>
            <div className="k2-row">
              <Kpi v={f1(j.y2 / j.y1) + " ×"} l={"Depth grows: y₂ ÷ y₁"} />
              <Kpi v={Math.round(j.lossFrac * 100) + " %"} l="Energy lost" tone={j.lossFrac > 0.4 ? "sup" : ""} />
              <Kpi v={j.type.name} l="Type of jump" />
            </div>
            <p className="fv-regime">{NOTE[j.type.key]}</p>
            <div className="fv-grid2">
              <div>
                <MyPlot j={j} />
                <p className="sim__note">Both depths carry the same push (M). That is why momentum, not energy, tells us the depth after a jump.</p>
              </div>
              <details className="nums">
                <summary>Show all the numbers</summary>
                <table><tbody>
                  <tr><td>Speed before / after</td><td>{f2(j.V1)} / {f2(j.V2)} m/s</td></tr>
                  <tr><td>Froude number after</td><td>{f2(j.Fr2)}</td></tr>
                  <tr><td>Energy before / after</td><td>{f2(j.E1)} / {f2(j.E2)} m</td></tr>
                  <tr><td>Energy lost ΔE</td><td>{f2(j.dE)} m</td></tr>
                  <tr><td>Jump length (about 6 y₂)</td><td>{f1(j.length)} m</td></tr>
                  <tr><td>Power burnt off</td><td>{f1(j.powerKWperM)} kW per metre width</td></tr>
                </tbody></table>
              </details>
            </div>
          </>
        ) : (
          <p className={"fv-regime fv-regime--" + (status[0] === "good" ? "sub" : "sup")} aria-live="polite">{status[1]}</p>
        )}
      </Sim>
    </div>
  );
}
