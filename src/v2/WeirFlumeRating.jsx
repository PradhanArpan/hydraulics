import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function WeirFlumeRating() {
  const [device, setDevice] = useState("weir"); // "weir", "parshall"
  const [Hhead, setHhead] = useState(0.4); // m
  const [bWidth, setBWidth] = useState(1.5); // m
  const [Cd, setCd] = useState(0.95);

  // Broad-crested weir ideal Q = (2/3)^(3/2) * sqrt(g) * b * H^(3/2) = 1.705 * b * H^(1.5)
  const Qweir = 1.705 * Cd * bWidth * Math.pow(Hhead, 1.5);

  // Parshall flume empirical: Q = 2.2 * b * H^1.522 (standard approximation for medium throats)
  const Qparshall = 2.2 * bWidth * Math.pow(Hhead, 1.522);

  const Qcalc = device === "weir" ? Qweir : Qparshall;

  const svgW = 540, svgH = 200;

  return (
    <Sim title="Discharge Measurement: Broad-Crested Weir & Parshall Flume">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={device}
          onChange={setDevice}
          label="Measuring Device"
          options={[
            ["weir", "Broad-Crested Weir"],
            ["parshall", "Parshall Flume"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Measured Head: <b>H = {f2(Hhead)} m</b> ⟹ Discharge: <b>Q = {f2(Qcalc)} m³/s</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {device === "weir" ? (
              <g>
                {/* Channel bed */}
                <rect x="20" y="160" width="300" height="20" fill="#78350f" />
                {/* Weir block */}
                <rect x="130" y="100" width="90" height="60" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <text x="175" y="135" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="bold">Weir Crest</text>

                {/* Upstream water */}
                <polygon points={`20,${100 - Hhead * 70} 130,${100 - Hhead * 70} 130,160 20,160`} fill="rgba(14, 165, 233, 0.35)" />
                <line x1="20" y1={100 - Hhead * 70} x2="130" y2={100 - Hhead * 70} stroke="#0284c7" strokeWidth="2.5" />

                {/* Water passing over weir crest (critical flow) */}
                <path
                  d={`M 130,${100 - Hhead * 70} C 150,${100 - (2 / 3) * Hhead * 70} 180,${100 - (2 / 3) * Hhead * 70} 220,110 C 240,130 260,155 320,155`}
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                />

                {/* Head dimension arrow H */}
                <line x1="80" y1="100" x2="80" y2={100 - Hhead * 70} stroke="#dc2626" strokeWidth="2" />
                <text x="85" y={100 - (Hhead * 70) / 2 + 4} fontSize="11" fill="#dc2626" fontWeight="bold">H = {f2(Hhead)} m</text>
                <text x="175" y={100 - (2 / 3) * Hhead * 70 - 8} textAnchor="middle" fontSize="9.5" fill="#16a34a" fontWeight="bold">
                  y_c = ⅔ H (Critical control)
                </text>
              </g>
            ) : (
              <g>
                {/* Parshall flume plan view */}
                <polygon points="30,50 110,65 190,65 270,45 270,155 190,135 110,135 30,150" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                <rect x="110" y="65" width="80" height="70" fill="rgba(14, 165, 233, 0.35)" />
                <line x1="30" y1="100" x2="270" y2="100" stroke="#0284c7" strokeDasharray="4 2" />
                <text x="70" y="42" fontSize="10" fill="#475569">Converging</text>
                <text x="150" y="60" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="bold">Throat (W = {f1(bWidth)} m)</text>
                <text x="230" y="38" fontSize="10" fill="#475569">Diverging</text>
                <circle cx="90" cy="100" r="5" fill="#dc2626" />
                <text x="90" y="125" textAnchor="middle" fontSize="9.5" fill="#dc2626" fontWeight="bold">Gauge Well (H_a)</text>
              </g>
            )}

            {/* Rating curve Q vs H on the right */}
            <g transform="translate(360, 25)">
              <rect x="0" y="0" width="150" height="150" fill="#ffffff" stroke="#cbd5e1" rx="4" />
              <line x1="20" y1="10" x2="20" y2="135" stroke="#94a3b8" />
              <line x1="20" y1="135" x2="140" y2="135" stroke="#94a3b8" />
              <text x="15" y="146" fontSize="9" fill="var(--tl)">0</text>
              <text x="130" y="146" fontSize="9" fill="var(--tl)">1.0 m</text>
              <text x="10" y="10" fontSize="9" fill="var(--tl)">Q</text>
              <text x="50" y="18" fontSize="10" fill="#0284c7" fontWeight="bold">Rating Curve</text>

              {/* Curve */}
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                points={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map(hVal => {
                  const qVal = device === "weir" ? 1.705 * Cd * bWidth * Math.pow(hVal, 1.5) : 2.2 * bWidth * Math.pow(hVal, 1.522);
                  const x = 20 + (hVal / 1.0) * 115;
                  const yPix = 135 - (qVal / 3.5) * 115;
                  return `${x},${Math.max(15, yPix)}`;
                }).join(" ")}
              />

              {/* Marker at current head */}
              <circle
                cx={20 + (Hhead / 1.0) * 115}
                cy={135 - (Qcalc / 3.5) * 115}
                r="4.5"
                fill="#dc2626"
              />
            </g>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Measured Head (H)" value={Hhead} min={0.1} max={0.9} step={0.05} unit="m" onChange={setHhead} format={f2} />
          <Slider label="Throat/Crest Width (b)" value={bWidth} min={0.5} max={3.0} step={0.25} unit="m" onChange={setBWidth} format={f2} />
          {device === "weir" && (
            <Slider label="Discharge Coeff (C_d)" value={Cd} min={0.85} max={1.0} step={0.01} unit="" onChange={setCd} format={f2} />
          )}

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>Governing Formula:</b>
            <div style={{ marginTop: 4, fontFamily: "monospace" }}>
              {device === "weir" ? "Q = 1.705 · C_d · b · H^(1.5)" : "Q = C · W · H_a^(n)"}
            </div>
            <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "var(--tl)" }}>
              Critical depth occurs right on the crest/throat, creating a fixed, unique one-to-one relationship between water head and discharge!
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f2(Qcalc) + " m³/s"} l="Discharge Q" tone="good" />
            <Kpi v={f2(Hhead * 0.67) + " m"} l="Critical Depth y_c" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
