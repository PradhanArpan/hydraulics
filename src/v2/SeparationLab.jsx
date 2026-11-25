import React, { useState } from "react";
import { Sim, Slider, Seg, Kpi, f2 } from "./ui.jsx";

export default function SeparationLab() {
  const [dpdx, setDpdx] = useState(0.0); // -1.0 (favourable) to +1.5 (adverse)
  const [viewBody, setViewBody] = useState("profile"); // "profile", "cylinder"

  // Wall slope of velocity profile: du/dy at y=0
  // du/dy = 1.0 - dpdx (when dpdx > 1.0, du/dy < 0 meaning reversed flow)
  const wallSlope = Math.max(-0.6, 1.0 - dpdx);
  const isSeparated = dpdx >= 1.0;

  const svgW = 540, svgH = 210, bedY = 175;

  return (
    <Sim title="Boundary Layer Separation & Control">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={viewBody}
          onChange={setViewBody}
          label="View Mode"
          options={[
            ["profile", "1. Velocity Profile & Wall Shear"],
            ["cylinder", "2. Flow Past Bluff Cylinder"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Pressure Gradient: <b style={{ color: dpdx < 0 ? "#16a34a" : isSeparated ? "#dc2626" : "#ea580c" }}>
            {dpdx < 0 ? "Favourable (dp/dx < 0)" : isSeparated ? "SEPARATED! (Adverse dp/dx > 0)" : dpdx === 0 ? "Zero (Flat Plate)" : "Adverse (dp/dx > 0)"}
          </b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {viewBody === "profile" ? (
              <g>
                {/* Solid surface */}
                <rect x="40" y={bedY} width="460" height="12" fill="#475569" stroke="#1e293b" />
                <line x1="160" y1="20" x2="160" y2={bedY} stroke="#94a3b8" strokeDasharray="3 3" />
                <text x="160" y="15" textAnchor="middle" fontSize="10" fill="var(--tl)">u = 0 line</text>

                {/* Profile curve u(y) */}
                <path
                  d={(() => {
                    const pts = [];
                    for (let i = 0; i <= 20; i++) {
                      const eta = i / 20; // 0 to 1
                      const y = bedY - eta * 130;
                      // Base profile plus curvature from pressure gradient
                      let uFrac = 2 * eta - eta * eta - 0.5 * dpdx * eta * (1 - eta) * (1 - eta);
                      if (dpdx > 1.0 && eta < 0.3) {
                        uFrac = -0.3 * (dpdx - 1.0) * Math.sin((eta / 0.3) * Math.PI);
                      }
                      const x = 160 + uFrac * 120;
                      pts.push(`${x},${y}`);
                    }
                    return "M " + pts.join(" L ");
                  })()}
                  fill="none"
                  stroke={isSeparated ? "#dc2626" : "#0284c7"}
                  strokeWidth="3"
                />

                {/* Wall shear tangent arrow */}
                <line
                  x1="160"
                  y1={bedY}
                  x2={160 + wallSlope * 60}
                  y2={bedY - 45}
                  stroke={wallSlope <= 0 ? "#dc2626" : "#16a34a"}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
                <text x={165 + wallSlope * 60} y={bedY - 48} fontSize="10" fill={wallSlope <= 0 ? "#dc2626" : "#16a34a"} fontWeight="bold">
                  {wallSlope > 0 ? `τ₀ > 0 (Forward)` : wallSlope === 0 ? "τ₀ = 0 (Separation Point!)" : "τ₀ < 0 (Backflow!)"}
                </text>

                {/* Reverse flow eddy if separated */}
                {isSeparated && (
                  <g transform={`translate(110, ${bedY - 25})`}>
                    <circle cx="20" cy="0" r="14" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 2" />
                    <line x1="20" y1="14" x2="6" y2="14" stroke="#dc2626" strokeWidth="2" />
                    <polygon points="6,14 10,11 10,17" fill="#dc2626" />
                    <text x="-40" y="4" fontSize="10" fill="#dc2626" fontWeight="bold">Reverse Flow</text>
                  </g>
                )}

                <text x="40" y="200" fontSize="11" fill="var(--tl)">
                  {isSeparated ? "Separation: Fluid near the wall loses kinetic energy to adverse pressure and reverses direction!" : "Attached: Fluid moves forward across the entire boundary layer."}
                </text>
              </g>
            ) : (
              <g>
                {/* Circular cylinder bluff body */}
                <circle cx="160" cy="105" r="45" fill="#64748b" stroke="#334155" strokeWidth="3" />
                <text x="160" y="110" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="bold">Cylinder</text>

                {/* Streamlines wrapping and separating */}
                <path d="M 30,50 C 90,50 140,55 180,68 C 220,80 270,110 480,125" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                <path d="M 30,160 C 90,160 140,155 180,142 C 220,130 270,100 480,85" fill="none" stroke="#0284c7" strokeWidth="2.5" />

                {/* Separation points at top and bottom */}
                <circle cx="180" cy="68" r="4" fill="#dc2626" />
                <circle cx="180" cy="142" r="4" fill="#dc2626" />
                <text x="185" y="60" fontSize="10" fill="#dc2626" fontWeight="bold">Separation (θ ≈ 82°)</text>

                {/* Wide turbulent wake with vortices behind cylinder */}
                <g transform="translate(230, 75)">
                  <ellipse cx="60" cy="30" rx="60" ry="40" fill="rgba(220, 38, 38, 0.12)" stroke="#dc2626" strokeDasharray="3 3" />
                  <circle cx="40" cy="15" r="10" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                  <circle cx="80" cy="40" r="12" fill="none" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="50" y="34" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">Low Pressure Wake</text>
                </g>

                <text x="30" y="200" fontSize="11" fill="var(--tl)">
                  Bluff bodies suffer massive **Pressure Drag** (C_D ≈ 1.2) due to early separation. Streamlining delays separation to the tail (C_D ≈ 0.04).
                </text>
              </g>
            )}
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Pressure Gradient (dp/dx)" value={dpdx} min={-1.0} max={1.5} step={0.1} unit="" onChange={setDpdx} format={f2} />

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>Boundary Condition at Wall (y=0):</b>
            <div style={{ marginTop: 4 }}>• Wall shear stress: <b>τ₀ = μ (∂u/∂y)_{y=0}</b></div>
            <div style={{ marginTop: 2 }}>• At separation: <b style={{ color: "#dc2626" }}>τ₀ = 0</b></div>
            <div style={{ marginTop: 2 }}>• Beyond separation: <b>τ₀ &lt; 0 (Backflow)</b></div>
          </div>

          <div style={{ background: "#ffffff", padding: "8px 10px", borderRadius: 6, border: "1px solid var(--g200)", fontSize: "11px" }}>
            <b style={{ color: "var(--navy)" }}>Separation Control Methods:</b>
            <div style={{ marginTop: 3 }}>1. <b>Streamlining:</b> Avoid sudden expansion</div>
            <div>2. <b>Boundary Layer Suction:</b> Remove slow air</div>
            <div>3. <b>Vortex Generators:</b> Mix fast fluid to wall</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={isSeparated ? "Separated" : "Attached"} l="Flow State" tone={isSeparated ? "warn" : "good"} />
            <Kpi v={f2(Math.max(0, wallSlope))} l="Wall Shear τ₀" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
