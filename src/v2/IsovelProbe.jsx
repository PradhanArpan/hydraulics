import React, { useState } from "react";
import { Sim, Slider, Kpi, f1, f2 } from "./ui.jsx";

export default function IsovelProbe() {
  const [aspect, setAspect] = useState(3.0); // b/y
  const [probeFrac, setProbeFrac] = useState(0.6); // y_probe / y from surface down (0 = surface, 1 = bed)
  const [channelDepth, setChannelDepth] = useState(2.0); // m

  const isDip = aspect < 6.0;
  // Maximum velocity occurs at depth fraction dipDepth from surface
  const dipDepth = isDip ? 0.05 + 0.20 * (1 - aspect / 6.0) : 0.0;

  // Approximate velocity profile u(y') where y' is fraction from bed up (0 at bed, 1 at surface)
  const calcU = (yFromBedFrac) => {
    // Prandtl 1/7 power law modified for velocity dip
    if (yFromBedFrac <= 0) return 0;
    const base = Math.pow(Math.max(0, yFromBedFrac), 1 / 6.5);
    const yFromSurf = 1 - yFromBedFrac;
    // dip suppression near surface if narrow
    const dipFactor = isDip && yFromSurf < dipDepth ? 1 - 0.12 * Math.pow((dipDepth - yFromSurf) / dipDepth, 2) : 1.0;
    return 2.2 * base * dipFactor;
  };

  const vSurf = calcU(1.0);
  const v02 = calcU(0.8);
  const v06 = calcU(0.4);
  const v08 = calcU(0.2);
  const vTwoPoint = (v02 + v08) / 2;
  const vMean = v06 * 0.99 + vTwoPoint * 0.01; // actual true section mean

  // Sampled point velocity
  const sampledU = calcU(1 - probeFrac);

  // Alpha and Beta estimation
  const alpha = 1.05 + 0.12 / Math.max(1, aspect);
  const beta = 1 + (alpha - 1) / 3.1;

  const svgW = 540, svgH = 220;

  return (
    <Sim title="Isovels (Velocity Contours) & Mean Velocity Measurement">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Channel bounds */}
            <rect x="30" y="25" width="300" height="150" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <line x1="30" y1="25" x2="330" y2="25" stroke="#0284c7" strokeWidth="3" />
            <line x1="25" y1="175" x2="335" y2="175" stroke="#78350f" strokeWidth="5" />
            <line x1="30" y1="20" x2="30" y2="175" stroke="#78350f" strokeWidth="5" />
            <line x1="330" y1="20" x2="330" y2="175" stroke="#78350f" strokeWidth="5" />

            {/* Isovel contours */}
            <ellipse cx="180" cy={25 + dipDepth * 150} rx="110" ry={25 + dipDepth * 20} fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
            <ellipse cx="180" cy={35 + dipDepth * 130} rx="70" ry={20 + dipDepth * 15} fill="none" stroke="#0284c7" strokeWidth="2" />
            <ellipse cx="180" cy={45 + dipDepth * 100} rx="35" ry="14" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
            <text x="180" y={49 + dipDepth * 100} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">
              u_max ({f2(calcU(1 - dipDepth))} m/s)
            </text>

            {/* Probe depth line */}
            <line x1="30" y1={25 + probeFrac * 150} x2="330" y2={25 + probeFrac * 150} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx="180" cy={25 + probeFrac * 150} r="5" fill="#dc2626" />
            <text x="335" y={30 + probeFrac * 150} fill="#dc2626" fontSize="11" fontWeight="bold">
              {f2(probeFrac)}y: u = {f2(sampledU)} m/s
            </text>

            {/* 1D vertical velocity profile graph on the right */}
            <g transform="translate(390, 25)">
              <rect x="0" y="0" width="130" height="150" fill="#ffffff" stroke="#cbd5e1" />
              <line x1="15" y1="0" x2="15" y2="150" stroke="#94a3b8" />
              <line x1="0" y1="150" x2="130" y2="150" stroke="#94a3b8" />
              <text x="5" y="165" fontSize="10" fill="var(--tl)">0</text>
              <text x="65" y="165" fontSize="10" fill="var(--tl)">u (m/s)</text>
              <text x="120" y="165" fontSize="10" fill="var(--tl)">2.5</text>

              {/* Curve u(y) */}
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                points={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
                  .map(yf => `${15 + (calcU(yf) / 2.5) * 110},${150 - yf * 150}`)
                  .join(" ")}
              />

              {/* Probe marker on profile */}
              <circle
                cx={15 + (sampledU / 2.5) * 110}
                cy={150 - (1 - probeFrac) * 150}
                r="4"
                fill="#dc2626"
              />
              <line
                x1="15"
                y1={150 - (1 - probeFrac) * 150}
                x2={15 + (sampledU / 2.5) * 110}
                y2={150 - (1 - probeFrac) * 150}
                stroke="#dc2626"
                strokeDasharray="2 2"
              />
              <text x="20" y="14" fontSize="10" fill="#0284c7" fontWeight="bold">u(y) profile</text>
            </g>

            <text x="30" y="200" fontSize="11" fill="var(--tl)">
              {isDip ? `Narrow Channel (b/y = ${f1(aspect)} < 5): Max velocity dipped ${(dipDepth * 100).toFixed(0)}% below surface by secondary currents.` : `Wide Channel (b/y = ${f1(aspect)} ≥ 5): Max velocity is right at the free surface.`}
            </text>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Aspect Ratio (b/y)" value={aspect} min={1.5} max={12.0} step={0.5} unit="" onChange={setAspect} format={f1} />
          <Slider label="Probe Depth from Surface" value={probeFrac} min={0.0} max={0.95} step={0.05} unit="y" onChange={setProbeFrac} format={f2} />

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>IS:1192 Current-Meter Standards:</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>Single point (0.6y from surface):</span>
              <b>{f2(v06)} m/s</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Two point (0.2y + 0.8y)/2:</span>
              <b>{f2(vTwoPoint)} m/s</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Surface float (0.85 × v_surf):</span>
              <b>{f2(0.85 * vSurf)} m/s</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, borderTop: "1px solid #cbd5e1", paddingTop: 4 }}>
              <span style={{ color: "var(--navy)", fontWeight: 600 }}>True Mean Velocity V = Q/A:</span>
              <b style={{ color: "#0284c7" }}>{f2(vMean)} m/s</b>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f2(alpha)} l="Coriolis α (KE)" tone={alpha > 1.1 ? "warn" : "good"} />
            <Kpi v={f2(beta)} l="Boussinesq β (Mom)" tone="good" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
