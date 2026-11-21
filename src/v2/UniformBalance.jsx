import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

const COWAN_BASE = [
  { val: 0.020, label: "Concrete (troweled/smooth)" },
  { val: 0.025, label: "Firm gravel / earth" },
  { val: 0.028, label: "Coarse gravel" },
  { val: 0.035, label: "Rock cut (rough)" }
];

const COWAN_IRREG = [
  { val: 0.000, label: "Smooth / pristine" },
  { val: 0.005, label: "Minor scoured patches" },
  { val: 0.010, label: "Moderate erosion pockets" },
  { val: 0.020, label: "Severe jagged sloughing" }
];

const COWAN_VEG = [
  { val: 0.000, label: "None (bare channel)" },
  { val: 0.005, label: "Low grass on banks" },
  { val: 0.015, label: "Dense weeds / brush" },
  { val: 0.030, label: "Heavy choking trees & reeds" }
];

export default function UniformBalance() {
  const [tab, setTab] = useState("forces");
  const [S0, setS0] = useState(0.001); // slope
  const [b, setB] = useState(4.0); // m
  const [y, setY] = useState(1.5); // m
  const [n0, setN0] = useState(0.025);
  const [n1, setN1] = useState(0.005);
  const [n4, setN4] = useState(0.005);
  const [m5, setM5] = useState(1.0); // meandering

  const n = (n0 + n1 + n4) * m5;
  const geom = H.rectGeometry(b, y);
  const V = H.manningV(geom.R, S0, n);
  const Q = geom.A * V;
  const gamma = 9.81; // kN/m^3

  // Forces per metre of channel length (L = 10 m block)
  const L = 10; // m
  const W_down = gamma * geom.A * L * S0; // Gravity component downslope (kN)
  const tau0 = gamma * geom.R * S0; // kPa
  const F_shear = tau0 * geom.P * L; // Boundary shear resisting (kN)
  const F_hydro = 0.5 * gamma * y * y * b; // Hydrostatic thrust at section (kN)

  const svgW = 540, svgH = 220;

  return (
    <Sim title="Uniform Flow: Force Equilibrium & Cowan's Roughness n">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={tab}
          onChange={setTab}
          label="View Mode"
          options={[
            ["forces", "Force Equilibrium (Free Body)"],
            ["cowan", "Cowan's n Calculator"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Normal Discharge: <b>Q = {f2(Q)} m³/s</b> (V = {f2(V)} m/s)
        </span>
      </div>

      {tab === "forces" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
              {/* Sloped channel bed */}
              <line x1="40" y1="130" x2="480" y2="165" stroke="#78350f" strokeWidth="6" />
              <text x="40" y="155" fontSize="10" fill="#78350f" fontWeight="bold">Bed Slope S₀ = {S0}</text>

              {/* Water surface parallel to bed */}
              <line x1="40" y1="65" x2="480" y2="100" stroke="#0284c7" strokeWidth="3" />
              <polygon points="40,65 480,100 480,165 40,130" fill="rgba(14, 165, 233, 0.25)" />
              <text x="230" y="75" fontSize="11" fill="#0284c7" fontWeight="bold">Uniform Flow: Water Surface || Bed (y₁ = y₂ = yₙ)</text>

              {/* Upstream Hydrostatic Load Triangle (apex at surface, base at bed) */}
              <polygon points="40,65 40,130 95,130" fill="rgba(220, 38, 38, 0.25)" stroke="#dc2626" strokeWidth="1.5" />
              <line x1="40" y1="108" x2="70" y2="108" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="44" y="60" fontSize="10" fill="#dc2626" fontWeight="bold">p=0 (Apex)</text>
              <text x="44" y="142" fontSize="10" fill="#dc2626" fontWeight="bold">p=γy (Base)</text>
              <text x="100" y="112" fontSize="11" fill="#dc2626" fontWeight="bold">F₁ = {f1(F_hydro)} kN →</text>

              {/* Downstream Hydrostatic Load Triangle (apex at surface, base at bed, opposing F1) */}
              <polygon points="480,100 480,165 425,165" fill="rgba(220, 38, 38, 0.25)" stroke="#dc2626" strokeWidth="1.5" />
              <line x1="480" y1="143" x2="450" y2="143" stroke="#dc2626" strokeWidth="2" />
              <text x="345" y="147" fontSize="11" fill="#dc2626" fontWeight="bold">← F₂ = {f1(F_hydro)} kN</text>

              {/* Downslope gravity component vector W sin theta */}
              <line x1="260" y1="115" x2="330" y2="120" stroke="#16a34a" strokeWidth="3.5" />
              <polygon points="330,120 322,116 322,124" fill="#16a34a" />
              <text x="250" y="105" fontSize="11" fill="#16a34a" fontWeight="bold">
                W sin θ = {f1(W_down)} kN (Gravity pull)
              </text>

              {/* Resisting bed shear force tau_0 * P * L */}
              <line x1="280" y1="150" x2="210" y2="145" stroke="#ea580c" strokeWidth="3.5" />
              <polygon points="210,145 218,141 218,149" fill="#ea580c" />
              <text x="170" y="178" fontSize="11" fill="#ea580c" fontWeight="bold">
                τ₀ P L = {f1(F_shear)} kN (Friction drag)
              </text>

              {/* Equilibrium notice */}
              <rect x="110" y="190" width="320" height="24" rx="4" fill="#f1f5f9" stroke="#cbd5e1" />
              <text x="270" y="206" textAnchor="middle" fontSize="11" fill="var(--navy)" fontWeight="bold">
                F₁ - F₂ = 0 (Hydrostatic forces cancel) ⟹ W sin θ = τ₀ P L
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Slider label="Bed Slope (S₀)" value={S0} min={0.0002} max={0.005} step={0.0002} unit="" onChange={setS0} format={v => v.toFixed(4)} />
            <Slider label="Normal Depth (yₙ)" value={y} min={0.5} max={3.0} step={0.1} unit="m" onChange={setY} format={f1} />
            <Slider label="Channel Width (b)" value={b} min={2.0} max={8.0} step={0.5} unit="m" onChange={setB} format={f1} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
              <Kpi v={f2(tau0) + " kPa"} l="Mean Bed Shear (τ₀)" tone="good" />
              <Kpi v={f2(n)} l="Manning's n" />
              <Kpi v={f1(W_down) + " kN"} l="Downslope Gravity" />
              <Kpi v={f1(F_shear) + " kN"} l="Bed Friction" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "bold", color: "var(--navy)" }}>1. Base Material (n₀):</label>
              <select value={n0} onChange={e => setN0(+e.target.value)} style={{ width: "100%", padding: "6px", marginTop: 4, borderRadius: 4, border: "1px solid var(--g300)" }}>
                {COWAN_BASE.map(o => <option key={o.val} value={o.val}>{o.label} (n₀ = {o.val})</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "bold", color: "var(--navy)" }}>2. Surface Irregularity (n₁):</label>
              <select value={n1} onChange={e => setN1(+e.target.value)} style={{ width: "100%", padding: "6px", marginTop: 4, borderRadius: 4, border: "1px solid var(--g300)" }}>
                {COWAN_IRREG.map(o => <option key={o.val} value={o.val}>{o.label} (+{o.val})</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "bold", color: "var(--navy)" }}>3. Vegetation / Weed Growth (n₄):</label>
              <select value={n4} onChange={e => setN4(+e.target.value)} style={{ width: "100%", padding: "6px", marginTop: 4, borderRadius: 4, border: "1px solid var(--g300)" }}>
                {COWAN_VEG.map(o => <option key={o.val} value={o.val}>{o.label} (+{o.val})</option>)}
              </select>
            </div>
            <Slider label="Meander Alignment (m₅)" value={m5} min={1.0} max={1.3} step={0.05} unit="" onChange={setM5} format={f2} />
          </div>

          <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8, border: "1px solid var(--g200)" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "var(--navy)" }}>Cowan's Formula:</h4>
            <div style={{ fontFamily: "monospace", fontSize: "13px", background: "#ffffff", padding: "8px 12px", borderRadius: 4, border: "1px solid var(--g200)" }}>
              n = (n₀ + n₁ + n₂ + n₃ + n₄) × m₅<br />
              n = ({f3(n0)} + {f3(n1)} + 0.000 + 0.000 + {f3(n4)}) × {f2(m5)}<br />
              <b>Total Manning n = {f3(n)}</b>
            </div>

            <p style={{ fontSize: "12px", color: "var(--tl)", marginTop: 12 }}>
              Notice how weed growth and channel meandering can double the roughness, cutting canal carrying capacity nearly in half for the same depth!
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
              <Kpi v={f3(n)} l="Design Manning n" tone={n > 0.035 ? "warn" : "good"} />
              <Kpi v={f2(Q) + " m³/s"} l="Resulting Discharge" tone="good" />
            </div>
          </div>
        </div>
      )}
    </Sim>
  );
}

function f3(v) {
  return (isFinite(v) ? (+v).toFixed(3) : "-");
}
