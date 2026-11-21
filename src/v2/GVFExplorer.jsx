import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

const PROFILES = {
  M1: { slope: "Mild (yₙ > y_c)", zone: 1, type: "Backwater curve", cond: "y > yₙ > y_c", dydx: "+ (Depth rises downstream)", control: "Downstream (Weir/Reservoir)" },
  M2: { slope: "Mild (yₙ > y_c)", zone: 2, type: "Drawdown curve", cond: "yₙ > y > y_c", dydx: "− (Depth falls downstream)", control: "Downstream (Free overfall / Drop)" },
  M3: { slope: "Mild (yₙ > y_c)", zone: 3, type: "Hydraulic jump feed", cond: "yₙ > y_c > y", dydx: "+ (Depth rises toward jump)", control: "Upstream (Sluice gate outlet)" },
  S1: { slope: "Steep (y_c > yₙ)", zone: 1, type: "Subcritical swell", cond: "y > y_c > yₙ", dydx: "+ (Backwater after jump)", control: "Downstream" },
  S2: { slope: "Steep (y_c > yₙ)", zone: 2, type: "Drawdown to normal", cond: "y_c > y > yₙ", dydx: "− (Accelerates toward yₙ)", control: "Upstream (Spillway crest / gate)" },
  S3: { slope: "Steep (y_c > yₙ)", zone: 3, type: "Supercritical deceleration", cond: "y_c > yₙ > y", dydx: "+ (Spreading supercritical)", control: "Upstream" }
};

export default function GVFExplorer() {
  const [profileKey, setProfileKey] = useState("M1");
  const [b, setB] = useState(4.0); // m
  const [q, setQ] = useState(2.5); // m^2/s

  const yc = H.criticalDepth(q);
  const yn = profileKey.startsWith("M") ? yc * 1.6 : yc * 0.65;

  const prof = PROFILES[profileKey] || PROFILES.M1;

  // Direct step method calculation sample (for M1 curve from y1 to y2)
  const yStart = profileKey === "M1" ? yn * 1.05 : (profileKey === "M2" ? yn * 0.95 : yc * 0.5);
  const steps = [];
  let curY = yStart;
  const dyStep = profileKey === "M1" ? 0.15 : -0.12;
  const S0 = profileKey.startsWith("M") ? 0.0008 : 0.006;
  const n = 0.015;

  let totalDist = 0;
  for (let i = 0; i < 4; i++) {
    const nextY = curY + dyStep;
    const E1 = H.specificEnergy(curY, q);
    const E2 = H.specificEnergy(nextY, q);
    const R1 = (b * curY) / (b + 2 * curY);
    const R2 = (b * nextY) / (b + 2 * nextY);
    const V1 = q / curY, V2 = q / nextY;
    const Sf1 = Math.pow(n * V1 / Math.pow(R1, 2 / 3), 2);
    const Sf2 = Math.pow(n * V2 / Math.pow(R2, 2 / 3), 2);
    const SfAvg = (Sf1 + Sf2) / 2;
    const dx = Math.abs((E2 - E1) / (S0 - SfAvg));
    totalDist += dx;
    steps.push({ step: i + 1, y1: curY, y2: nextY, E1, E2, dx, totalDist });
    curY = nextY;
  }

  const svgW = 540, svgH = 200;

  return (
    <Sim title="Gradually Varied Flow (GVF) & Surface Profiles">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={profileKey}
          onChange={setProfileKey}
          label="Profile Class"
          options={[
            ["M1", "M1 (Backwater)"],
            ["M2", "M2 (Drawdown)"],
            ["M3", "M3 (Sluice S</span>)"],
            ["S1", "S1 (Steep Pond)"],
            ["S2", "S2 (Steep Draw)"],
            ["S3", "S3 (Steep Sluice)"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          yc = {f2(yc)} m | yn = {f2(yn)} m ({profileKey.startsWith("M") ? "Mild Slope: yₙ > y_c" : "Steep Slope: y_c > yₙ"})
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Channel bed */}
            <line x1="30" y1="160" x2="510" y2="175" stroke="#78350f" strokeWidth="6" />
            <text x="30" y="190" fontSize="10" fill="#78350f" fontWeight="bold">Channel Bed (Slope S₀)</text>

            {/* Normal Depth Line (NDL) */}
            <line x1="30" y1={160 - yn * 40} x2="510" y2={175 - yn * 40} stroke="#16a34a" strokeWidth="2" strokeDasharray="5 3" />
            <text x="420" y={170 - yn * 40} fontSize="10" fill="#16a34a" fontWeight="bold">NDL (y = yₙ)</text>

            {/* Critical Depth Line (CDL) */}
            <line x1="30" y1={160 - yc * 40} x2="510" y2={175 - yc * 40} stroke="#dc2626" strokeWidth="2" strokeDasharray="2 2" />
            <text x="420" y={170 - yc * 40} fontSize="10" fill="#dc2626" fontWeight="bold">CDL (y = y_c)</text>

            {/* Water surface curve */}
            {profileKey === "M1" && (
              <path
                d={`M 30,${160 - yn * 1.05 * 40} C 200,${160 - yn * 1.12 * 40} 380,${160 - yn * 1.35 * 40} 510,${160 - yn * 1.7 * 40}`}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
              />
            )}
            {profileKey === "M2" && (
              <path
                d={`M 30,${160 - yn * 0.98 * 40} C 250,${160 - yn * 0.95 * 40} 420,${160 - yc * 1.15 * 40} 510,${160 - yc * 1.01 * 40}`}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
              />
            )}
            {profileKey === "M3" && (
              <path
                d={`M 30,${160 - 0.3 * 40} C 180,${160 - 0.45 * 40} 320,${160 - 0.7 * 40} 440,${160 - yc * 0.95 * 40}`}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
              />
            )}
            {(profileKey === "S1" || profileKey === "S2" || profileKey === "S3") && (
              <path
                d={`M 30,${160 - (profileKey === "S1" ? 1.8 : (profileKey === "S2" ? 1.1 : 0.3)) * 40} Q 280,${160 - (profileKey === "S1" ? 1.5 : (profileKey === "S2" ? 0.8 : 0.5)) * 40} 510,${160 - (profileKey === "S1" ? 1.2 : (profileKey === "S2" ? 0.65 : 0.6)) * 40}`}
                fill="none"
                stroke="#0284c7"
                strokeWidth="3.5"
              />
            )}

            {/* Profile Label */}
            <rect x="230" y="20" width="80" height="26" rx="4" fill="#0284c7" />
            <text x="270" y="38" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="bold">
              {profileKey} Profile
            </text>

            {/* Structure icon */}
            {profileKey === "M1" && (
              <g transform="translate(485, 90)">
                <rect x="0" y="0" width="20" height="80" fill="#64748b" />
                <text x="-35" y="-6" fontSize="10" fill="#475569" fontWeight="bold">Weir / Dam</text>
              </g>
            )}
            {profileKey === "M2" && (
              <g transform="translate(490, 140)">
                <line x1="0" y1="0" x2="0" y2="40" stroke="#dc2626" strokeWidth="3" />
                <text x="-50" y="-8" fontSize="10" fill="#dc2626" fontWeight="bold">Free Overfall</text>
              </g>
            )}
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11px" }}>
            <b style={{ color: "var(--navy)" }}>{prof.type} ({profileKey}):</b>
            <div style={{ marginTop: 4 }}>Condition: <b>{prof.cond}</b></div>
            <div style={{ marginTop: 2 }}>Surface slope dy/dx: <b>{prof.dydx}</b></div>
            <div style={{ marginTop: 2 }}>Hydraulic Control: <b style={{ color: "#dc2626" }}>{prof.control}</b></div>
          </div>

          <div style={{ background: "#ffffff", padding: "8px", borderRadius: 6, border: "1px solid var(--g200)", fontSize: "10.5px" }}>
            <b style={{ color: "var(--navy)" }}>Direct Step Reach Calculation (M1):</b>
            <div style={{ maxHeight: "80px", overflowY: "auto", marginTop: 4 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "right" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #cbd5e1", color: "var(--tl)" }}>
                    <th style={{ textAlign: "left" }}>#</th>
                    <th>y (m)</th>
                    <th>Δx (m)</th>
                    <th>Σx (m)</th>
                  </tr>
                </thead>
                <tbody>
                  {steps.map(s => (
                    <tr key={s.step}>
                      <td style={{ textAlign: "left" }}>{s.step}</td>
                      <td>{f2(s.y2)}</td>
                      <td>{f1(s.dx)}</td>
                      <td><b>{f1(s.totalDist)}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <Kpi v={profileKey.startsWith("M") ? "Mild" : "Steep"} l="Bed Class" />
            <Kpi v={prof.control.split(" ")[0]} l="Control" tone="warn" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
