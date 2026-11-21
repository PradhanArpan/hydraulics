import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function NormalDepthSolver() {
  const [method, setMethod] = useState("bisection");
  const [Qtarget, setQtarget] = useState(12.0); // m^3/s
  const [b, setB] = useState(4.0); // m
  const [S0, setS0] = useState(0.001);
  const [n, setN] = useState(0.015);
  const [step, setStep] = useState(0);

  // Exact normal depth
  const exactYn = H.solveNormalDepthRect(Qtarget, b, S0, n);

  // Iteration trace for bisection
  const bisectionSteps = [];
  let lo = 0.2, hi = 4.0;
  for (let i = 0; i < 8; i++) {
    const mid = (lo + hi) / 2;
    const gMid = H.rectGeometry(b, mid);
    const qMid = H.manningQ(gMid.A, gMid.R, S0, n);
    const err = qMid - Qtarget;
    bisectionSteps.push({ iter: i + 1, lo, hi, val: mid, Qcalc: qMid, err });
    if (err < 0) lo = mid; else hi = mid;
  }

  // Iteration trace for Newton-Raphson
  const newtonSteps = [];
  let yCurr = 1.0;
  for (let i = 0; i < 6; i++) {
    const g = H.rectGeometry(b, yCurr);
    const qCalc = H.manningQ(g.A, g.R, S0, n);
    const fVal = qCalc - Qtarget;
    // Numerical derivative
    const dy = 0.001;
    const gPlus = H.rectGeometry(b, yCurr + dy);
    const qPlus = H.manningQ(gPlus.A, gPlus.R, S0, n);
    const df = (qPlus - qCalc) / dy;
    newtonSteps.push({ iter: i + 1, val: yCurr, Qcalc: qCalc, err: fVal });
    yCurr = Math.max(0.2, yCurr - fVal / df);
  }

  const activeSteps = method === "bisection" ? bisectionSteps : newtonSteps;
  const currentStep = activeSteps[Math.min(step, activeSteps.length - 1)];

  const svgW = 540, svgH = 210;

  return (
    <Sim title="Normal Depth Solver: Bisection & Newton-Raphson">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={method}
          onChange={m => { setMethod(m); setStep(0); }}
          label="Numerical Method"
          options={[
            ["bisection", "Bisection (Bracketing)"],
            ["newton", "Newton-Raphson (Gradient)"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Target Flow: <b>Q = {f1(Qtarget)} m³/s</b> ⟹ Normal Depth: <b>yₙ = {f2(exactYn)} m</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <text x="30" y="22" fontSize="12" fill="var(--navy)" fontWeight="bold">
              f(y) = Q(y) − Q_target = 0
            </text>

            {/* Zero line */}
            <line x1="50" y1="110" x2="480" y2="110" stroke="#94a3b8" strokeDasharray="3 3" />
            <text x="485" y="114" fontSize="10" fill="var(--tl)">f(y) = 0</text>

            <line x1="50" y1="25" x2="50" y2="185" stroke="#94a3b8" />
            <text x="30" y="35" fontSize="10" fill="var(--tl)">+Q</text>
            <text x="30" y="185" fontSize="10" fill="var(--tl)">-Q</text>
            <text x="50" y="200" fontSize="10" fill="var(--tl)">y = 0.5 m</text>
            <text x="260" y="200" fontSize="10" fill="var(--tl)">y = 2.0 m</text>
            <text x="460" y="200" fontSize="10" fill="var(--tl)">y = 3.5 m</text>

            {/* Q(y) - Qtarget curve */}
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              points={[0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, 2.9, 3.2, 3.5].map(yVal => {
                const g = H.rectGeometry(b, yVal);
                const qVal = H.manningQ(g.A, g.R, S0, n);
                const err = qVal - Qtarget;
                const x = 50 + ((yVal - 0.5) / 3.0) * 410;
                const yPix = 110 - (err / 25) * 80;
                return `${x},${Math.max(25, Math.min(185, yPix))}`;
              }).join(" ")}
            />

            {/* Exact solution point where f(y) = 0 */}
            <circle cx={50 + ((exactYn - 0.5) / 3.0) * 410} cy="110" r="5" fill="#16a34a" />
            <line x1={50 + ((exactYn - 0.5) / 3.0) * 410} y1="30" x2={50 + ((exactYn - 0.5) / 3.0) * 410} y2="185" stroke="#16a34a" strokeDasharray="3 3" />
            <text x={50 + ((exactYn - 0.5) / 3.0) * 410 + 6} y="45" fontSize="10" fill="#16a34a" fontWeight="bold">
              Root yₙ = {f2(exactYn)} m
            </text>

            {/* Current iteration marker */}
            <circle
              cx={50 + ((currentStep.val - 0.5) / 3.0) * 410}
              cy={110 - (currentStep.err / 25) * 80}
              r="6"
              fill="#dc2626"
            />
            <line
              x1={50 + ((currentStep.val - 0.5) / 3.0) * 410}
              y1="110"
              x2={50 + ((currentStep.val - 0.5) / 3.0) * 410}
              y2={110 - (currentStep.err / 25) * 80}
              stroke="#dc2626"
              strokeWidth="2"
            />

            {method === "bisection" && (
              <rect
                x={50 + ((currentStep.lo - 0.5) / 3.0) * 410}
                y="35"
                width={((currentStep.hi - currentStep.lo) / 3.0) * 410}
                height="145"
                fill="rgba(234, 88, 12, 0.12)"
                stroke="#ea580c"
                strokeDasharray="2 2"
              />
            )}
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Target Flow (Q)" value={Qtarget} min={4.0} max={25.0} step={1.0} unit="m³/s" onChange={setQtarget} format={f1} />
          <Slider label="Bed Width (b)" value={b} min={2.0} max={6.0} step={0.5} unit="m" onChange={setB} format={f1} />
          <Slider label="Bed Slope (S₀)" value={S0} min={0.0005} max={0.003} step={0.0005} unit="" onChange={setS0} format={v => v.toFixed(4)} />

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              type="button"
              className="fb-btn"
              style={{ flex: 1, padding: "6px", fontSize: "11px", background: "#0284c7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
              onClick={() => setStep(s => Math.max(0, s - 1))}
            >
              ◀ Prev Iter
            </button>
            <button
              type="button"
              className="fb-btn"
              style={{ flex: 1, padding: "6px", fontSize: "11px", background: "#0284c7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
              onClick={() => setStep(s => Math.min(activeSteps.length - 1, s + 1))}
            >
              Next Iter ▶
            </button>
          </div>

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>Iteration {currentStep.iter} of {activeSteps.length}:</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>Trial depth:</span>
              <b style={{ color: "#dc2626" }}>{f3(currentStep.val)} m</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Computed Q:</span>
              <b>{f2(currentStep.Qcalc)} m³/s</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Discharge Error:</span>
              <b>{f3(currentStep.err)} m³/s</b>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f3(currentStep.val) + " m"} l="Trial Depth" tone={Math.abs(currentStep.err) < 0.05 ? "good" : "warn"} />
            <Kpi v={f2(exactYn) + " m"} l="Exact yₙ" tone="good" />
          </div>
        </div>
      </div>
    </Sim>
  );
}

function f3(v) {
  return (isFinite(v) ? (+v).toFixed(3) : "-");
}
