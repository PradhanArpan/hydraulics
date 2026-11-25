import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Seg, Kpi, f2 } from "./ui.jsx";

export default function ThicknessAreas() {
  const [profile, setProfile] = useState("parabolic");

  const pData = H.blDeficitRatios(profile);
  const deltaMm = 20; // 20 mm display thickness
  const deltaStarMm = pData.deltaStarFrac * deltaMm;
  const thetaMm = pData.thetaFrac * deltaMm;

  // Function u(eta) where eta = y/delta
  const calcEta = eta => {
    if (profile === "linear") return eta;
    if (profile === "parabolic") return 2 * eta - eta * eta;
    if (profile === "cubic") return 1.5 * eta - 0.5 * Math.pow(eta, 3);
    if (profile === "power17") return Math.pow(Math.max(0, eta), 1 / 7);
    return Math.min(1, Math.sqrt(eta)); // fallback
  };

  const svgW = 540, svgH = 220, bedY = 180, scaleH = 140, scaleW = 200;

  // Build profile curve points
  const pts = [];
  const deficitPts = [`50,${bedY - scaleH}`];
  for (let i = 0; i <= 20; i++) {
    const eta = i / 20;
    const uFrac = calcEta(eta);
    const x = 50 + uFrac * scaleW;
    const y = bedY - eta * scaleH;
    pts.push(`${x},${y}`);
    deficitPts.push(`${x},${y}`);
  }
  deficitPts.push(`50,${bedY}`);

  return (
    <Sim title="Boundary Layer Deficit Thicknesses (δ*, θ, H)">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={profile}
          onChange={setProfile}
          label="Velocity Profile"
          options={[
            ["linear", "Linear (u/U = η)"],
            ["parabolic", "Parabolic (2η - η²)"],
            ["cubic", "Cubic (1.5η - 0.5η³)"],
            ["power17", "Turbulent 1/7th Power"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Shape Factor: <b>H = δ* / θ = {f2(pData.H)}</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Wall at bed */}
            <rect x="40" y={bedY} width="460" height="10" fill="#78350f" />
            <text x="45" y={bedY + 22} fontSize="10" fill="#78350f" fontWeight="bold">Solid Wall (No-Slip: u = 0)</text>

            {/* Free-stream line u = U */}
            <line x1={50 + scaleW} y1="30" x2={50 + scaleW} y2={bedY} stroke="#94a3b8" strokeDasharray="3 3" />
            <text x={50 + scaleW} y="22" textAnchor="middle" fontSize="10" fill="var(--tl)">u = U (Free-Stream)</text>

            {/* Shaded Deficit Area (Mass Deficit giving delta*) */}
            <polygon points={deficitPts.join(" ")} fill="rgba(220, 38, 38, 0.22)" stroke="#dc2626" strokeWidth="1" />

            {/* Actual velocity profile curve */}
            <polyline points={pts.join(" ")} fill="none" stroke="#0284c7" strokeWidth="3" />

            {/* Boundary layer edge y = delta */}
            <line x1="40" y1={bedY - scaleH} x2="350" y2={bedY - scaleH} stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="260" y={bedY - scaleH - 6} fontSize="10" fill="#0284c7" fontWeight="bold">y = δ (99% Edge)</text>

            {/* Equivalent Displacement Thickness bar delta* */}
            <g transform={`translate(${50 + scaleW + 40}, 0)`}>
              <rect x="0" y={bedY - pData.deltaStarFrac * scaleH} width="20" height={pData.deltaStarFrac * scaleH} fill="rgba(220, 38, 38, 0.5)" stroke="#dc2626" />
              <text x="26" y={bedY - (pData.deltaStarFrac * scaleH) / 2 + 4} fontSize="10" fill="#dc2626" fontWeight="bold">
                δ* = {(pData.deltaStarFrac * 100).toFixed(1)}% δ
              </text>
              <text x="0" y={bedY + 16} fontSize="9" fill="#dc2626">Mass Deficit</text>
            </g>

            {/* Equivalent Momentum Thickness bar theta */}
            <g transform={`translate(${50 + scaleW + 120}, 0)`}>
              <rect x="0" y={bedY - pData.thetaFrac * scaleH} width="20" height={pData.thetaFrac * scaleH} fill="rgba(234, 88, 12, 0.5)" stroke="#ea580c" />
              <text x="26" y={bedY - (pData.thetaFrac * scaleH) / 2 + 4} fontSize="10" fill="#ea580c" fontWeight="bold">
                θ = {(pData.thetaFrac * 100).toFixed(1)}% δ
              </text>
              <text x="0" y={bedY + 16} fontSize="9" fill="#ea580c">Momentum Deficit</text>
            </g>

            <text x="50" y={bedY - scaleH / 2} fontSize="11" fill="#dc2626" fontWeight="bold">
              Shaded: Mass Lost to Friction
            </text>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: "#f1f5f9", padding: "10px", borderRadius: 6, fontSize: "12px" }}>
            <b style={{ color: "var(--navy)" }}>{pData.name} Ratios:</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span>Displacement δ* / δ:</span>
              <b style={{ color: "#dc2626" }}>{(pData.deltaStarFrac * 100).toFixed(1)} %</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>Momentum θ / δ:</span>
              <b style={{ color: "#ea580c" }}>{(pData.thetaFrac * 100).toFixed(1)} %</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, borderTop: "1px solid #cbd5e1", paddingTop: 4 }}>
              <span>Shape Factor H = δ* / θ:</span>
              <b style={{ color: "#0284c7" }}>{f2(pData.H)}</b>
            </div>
          </div>

          <p style={{ fontSize: "11px", color: "var(--tl)", margin: 0 }}>
            <b>Physical meaning of H:</b> Fuller turbulent profiles have small $H \approx 1.3$. When a flow is about to separate under an adverse pressure gradient, $H$ balloons to $3.5 - 4.0$.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f2(pData.H)} l="Shape Factor H" tone={pData.H < 2.0 ? "good" : "warn"} />
            <Kpi v={f2(deltaStarMm) + " mm"} l="δ* (for δ=20mm)" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
