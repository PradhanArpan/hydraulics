import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function TurbineChooser() {
  const [head, setHead] = useState(150); // Net head (m)
  const [flow, setFlow] = useState(8); // Discharge (m3/s)
  const [speed, setSpeed] = useState(500); // Speed (rpm)

  // Calculations
  const eta = 0.88;
  const powerKw = eta * 1000 * 9.81 * flow * head / 1000;
  const powerMw = powerKw / 1000;
  const Ns = H.specificSpeedTurbine(speed, powerKw, head);
  const classification = H.classifyTurbine(head, Ns);

  const svgW = 540, svgH = 220;

  return (
    <Sim title="Turbine Selector & Specific Speed Explorer">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: "13px", fontWeight: "bold", color: "var(--navy)" }}>
          Recommended Turbine: <span style={{ color: "#0284c7", background: "#e0f2fe", padding: "2px 8px", borderRadius: 4 }}>{classification.type}</span> ({classification.flow})
        </span>
        <span style={{ fontSize: "12px", color: "var(--tl)" }}>
          Rated Power: <b>{powerMw >= 1 ? `${powerMw.toFixed(2)} MW` : `${powerKw.toFixed(0)} kW`}</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* Head-Q Selection Chart and Runner Silhouette */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Specific Speed Continuum Bar */}
            <text x="30" y="24" fontSize="11" fontWeight="bold" fill="#0f172a">Specific Speed (Ns) Spectrum</text>
            
            {/* Color-coded bands */}
            <rect x="30" y="32" width="100" height="18" fill="#fde68a" stroke="#d97706" />
            <text x="50" y="45" fontSize="9" fontWeight="bold" fill="#92400e">Pelton (10-35)</text>

            <rect x="130" y="32" width="220" height="18" fill="#bae6fd" stroke="#0284c7" />
            <text x="210" y="45" fontSize="9" fontWeight="bold" fill="#0369a1">Francis (60-300)</text>

            <rect x="350" y="32" width="160" height="18" fill="#bbf7d0" stroke="#16a34a" />
            <text x="390" y="45" fontSize="9" fontWeight="bold" fill="#15803d">Kaplan (300-1000)</text>

            {/* Current Ns Indicator Needle */}
            {(() => {
              // Map Ns to bar position: 10 to 1000
              const clampedNs = Math.min(1000, Math.max(10, Ns));
              let needleX = 30;
              if (clampedNs <= 35) {
                needleX = 30 + ((clampedNs - 10) / 25) * 100;
              } else if (clampedNs <= 300) {
                needleX = 130 + ((clampedNs - 35) / 265) * 220;
              } else {
                needleX = 350 + ((clampedNs - 300) / 700) * 160;
              }
              return (
                <g>
                  <polygon points={`${needleX},54 ${needleX - 6},66 ${needleX + 6},66`} fill="#dc2626" />
                  <line x1={needleX} y1={28} x2={needleX} y2={54} stroke="#dc2626" strokeWidth="2.5" />
                  <text x={needleX} y="78" fontSize="10" fontWeight="bold" fill="#dc2626" textAnchor="middle">
                    Ns = {Ns.toFixed(1)}
                  </text>
                </g>
              );
            })()}

            {/* Runner Silhouette Morphing */}
            <g transform="translate(140, 105)">
              <rect x="-100" y="0" width="360" height="100" rx="8" fill="#ffffff" stroke="#cbd5e1" />
              <text x="80" y="20" fontSize="11" fontWeight="bold" fill="#475569" textAnchor="middle">
                Runner Geometry for {classification.type}
              </text>

              {classification.type === "Pelton" && (
                <g transform="translate(80, 60)">
                  <circle cx="0" cy="0" r="28" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
                  <circle cx="0" cy="0" r="8" fill="#334155" />
                  {/* Outer double buckets */}
                  {[-45, 0, 45, 90, 135, 180, 225, 270].map((deg) => (
                    <g key={deg} transform={`rotate(${deg}) translate(34, 0)`}>
                      <path d="M -6 -5 C 0 -8, 6 -8, 6 0 C 6 8, 0 8, -6 5 Z" fill="#64748b" stroke="#1e293b" />
                    </g>
                  ))}
                  {/* Incoming jet */}
                  <line x1="-70" y1="34" x2="-35" y2="34" stroke="#0284c7" strokeWidth="4" />
                  <polygon points="-35,31 -28,34 -35,37" fill="#0284c7" />
                  <text x="0" y="38" fontSize="9" fill="#64748b" textAnchor="middle">High Head / Small Flow</text>
                </g>
              )}

              {classification.type === "Francis" && (
                <g transform="translate(80, 60)">
                  {/* Inward curved runner */}
                  <path d="M -35 -25 L 35 -25 L 20 25 L -20 25 Z" fill="#93c5fd" stroke="#0284c7" strokeWidth="2" />
                  <path d="M -15 -25 C -5 -5, -5 10, -8 25" fill="none" stroke="#1e293b" strokeWidth="2" />
                  <path d="M 0 -25 C 10 -5, 10 10, 8 25" fill="none" stroke="#1e293b" strokeWidth="2" />
                  <path d="M 15 -25 C 25 -5, 25 10, 20 25" fill="none" stroke="#1e293b" strokeWidth="2" />
                  <text x="0" y="38" fontSize="9" fill="#0369a1" textAnchor="middle">Medium Head / Radial Inward to Axial Exit</text>
                </g>
              )}

              {classification.type.includes("Kaplan") && (
                <g transform="translate(80, 60)">
                  {/* Central hub and propeller blades */}
                  <ellipse cx="0" cy="0" rx="14" ry="22" fill="#475569" />
                  {/* Adjustable propeller blades */}
                  <path d="M -14 -6 C -35 -14, -40 10, -14 6 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                  <path d="M 14 -6 C 35 -14, 40 10, 14 6 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                  <text x="0" y="38" fontSize="9" fill="#15803d" textAnchor="middle">Low Head / Huge Flow Propeller</text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Net Head H (m)"
            value={head}
            min={5}
            max={800}
            step={5}
            onChange={setHead}
          />
          <Slider
            label="Discharge Q (m³/s)"
            value={flow}
            min={0.2}
            max={50}
            step={0.2}
            onChange={setFlow}
          />
          <Slider
            label="Speed N (rpm)"
            value={speed}
            min={100}
            max={1000}
            step={25}
            onChange={setSpeed}
          />

          <div style={{ background: "#f1f5f9", padding: "8px 12px", borderRadius: 6, fontSize: "11px", color: "var(--tl)" }}>
            ⚡ <b>Rule of Thumb:</b> Pelton for mountain heads (&gt; 250 m), Francis for valley dams (60–250 m), Kaplan for flat barrage rivers (&lt; 60 m).
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Specific Speed Ns"
          value={f1(Ns)}
          sub={classification.type}
        />
        <Kpi
          label="Electrical Power"
          value={powerMw >= 1 ? `${f2(powerMw)} MW` : `${f1(powerKw)} kW`}
          sub="at 88% overall efficiency"
        />
        <Kpi
          label="Unit Speed Nu"
          value={f2(speed / Math.sqrt(head))}
          sub="rpm / sqrt(H)"
        />
        <Kpi
          label="Unit Discharge Qu"
          value={f2(flow / Math.sqrt(head))}
          sub="m³/s / sqrt(H)"
        />
      </div>
    </Sim>
  );
}
