import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Kpi, f1, f2 } from "./ui.jsx";

export default function WallZoom() {
  const [U, setU] = useState(2.0); // m/s
  const [kMm, setKMm] = useState(0.08); // mm sand grain roughness

  const nu = 1e-6; // m^2/s
  const rho = 1000;
  const x = 1.0; // 1 m from leading edge
  const turb = H.blTurbulent(x, U, nu, rho);

  const deltaPrimeMm = turb.deltaPrime * 1000; // mm
  const classRes = H.classifyBoundary(kMm / 1000, turb.deltaPrime);

  const svgW = 540, svgH = 210, bedY = 175;
  const scaleZoom = 80; // pixels per mm

  const sublayerHeightPix = Math.min(130, deltaPrimeMm * scaleZoom);
  const grainHeightPix = Math.min(140, kMm * scaleZoom);

  return (
    <Sim title="Microscopic Wall Zoom: Roughness k vs Laminar Sublayer δ'">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Regime: <b style={{ color: classRes.regime === "smooth" ? "#16a34a" : classRes.regime === "rough" ? "#dc2626" : "#ea580c" }}>{classRes.label}</b>
        </span>
        <span style={{ fontSize: "12px", color: "var(--tl)" }}>
          Ratio k / δ' = <b>{f2(kMm / deltaPrimeMm)}</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Solid metal/concrete wall */}
            <rect x="20" y={bedY} width="500" height="20" fill="#475569" stroke="#1e293b" />
            <text x="30" y={bedY + 14} fontSize="10" fill="#f8fafc" fontWeight="bold">Solid Wall (Zoomed 80×)</text>

            {/* Laminar viscous sublayer zone */}
            <rect
              x="20"
              y={bedY - sublayerHeightPix}
              width="500"
              height={sublayerHeightPix}
              fill="rgba(14, 165, 233, 0.25)"
              stroke="#0284c7"
              strokeDasharray="4 2"
            />
            <text x="350" y={bedY - sublayerHeightPix - 6} fontSize="11" fill="#0284c7" fontWeight="bold">
              Laminar Sublayer δ' = {f2(deltaPrimeMm)} mm
            </text>

            {/* Turbulent eddies swirling above the sublayer */}
            <g transform={`translate(80, ${bedY - sublayerHeightPix - 25})`}>
              <circle cx="20" cy="0" r="10" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="80" cy="-5" r="14" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 2" />
              <circle cx="150" cy="2" r="12" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
              <text x="180" y="4" fontSize="10" fill="#ea580c" fontWeight="bold">Turbulent Eddies (Main Stream)</text>
            </g>

            {/* Sand grains / Roughness projections of height k */}
            {[50, 95, 140, 185, 230, 275, 320, 365, 410, 455].map((gx, idx) => (
              <polygon
                key={idx}
                points={`${gx},${bedY} ${gx + 12},${bedY - grainHeightPix * (0.85 + 0.15 * Math.sin(idx))} ${gx + 24},${bedY}`}
                fill="#78350f"
                stroke="#451a03"
                strokeWidth="1"
              />
            ))}

            {/* Dimension arrow for k */}
            <line x1="495" y1={bedY} x2="495" y2={bedY - grainHeightPix} stroke="#dc2626" strokeWidth="2" />
            <text x="498" y={bedY - grainHeightPix / 2 + 4} fontSize="10" fill="#dc2626" fontWeight="bold">
              k = {f2(kMm)} mm
            </text>

            <text x="25" y={bedY - sublayerHeightPix / 2 + 4} fontSize="10.5" fill="#0369a1" fontWeight="bold">
              Calm Viscous Shearing Zone
            </text>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Roughness Height (k)" value={kMm} min={0.01} max={0.40} step={0.01} unit="mm" onChange={setKMm} format={f2} />
          <Slider label="Free-Stream Speed (U)" value={U} min={0.5} max={6.0} step={0.25} unit="m/s" onChange={setU} format={f2} />

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>Nikuradse's Criteria:</b>
            <div style={{ marginTop: 4 }}>• Smooth: k &lt; 0.25 δ' (Grains submerged)</div>
            <div>• Transition: 0.25 δ' ≤ k ≤ 6.0 δ'</div>
            <div>• Rough: k &gt; 6.0 δ' (Grains destroy sublayer)</div>
            <div style={{ marginTop: 4, borderTop: "1px solid #cbd5e1", paddingTop: 4 }}>
              Shear velocity u* = <b>{f2(turb.uStar * 1000)} mm/s</b>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f2(deltaPrimeMm) + " mm"} l="Sublayer δ'" tone="good" />
            <Kpi v={f2(kMm) + " mm"} l="Grain Height k" tone={kMm > deltaPrimeMm ? "warn" : ""} />
          </div>
        </div>
      </div>
    </Sim>
  );
}
