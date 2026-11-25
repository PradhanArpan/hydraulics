import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function PeltonDesigner() {
  const [powerKw, setPowerKw] = useState(3000); // Rated power (kW)
  const [head, setHead] = useState(250); // Net head (m)
  const [rpm, setRpm] = useState(500); // Speed (rpm)
  const [numJets, setNumJets] = useState("1"); // "1", "2", "4"

  const n_j = parseInt(numJets, 10);
  const design = H.peltonDesign(powerKw, head, rpm, 0.85, 0.98, 0.46, 12);
  // Override n_j with user selection
  const a_total = design.a_total;
  const d_jet = Math.sqrt((4 * a_total) / (Math.PI * n_j));
  const D_wheel = design.D;
  const m_ratio = D_wheel / d_jet;
  const Z_buckets = Math.round(15 + 0.5 * m_ratio);
  const B_width = 4.0 * d_jet;
  const L_len = 2.8 * d_jet;

  const svgW = 540, svgH = 220;

  return (
    <Sim title="Pelton Runner Sizing Wizard & Design Proportions">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={numJets}
          onChange={setNumJets}
          label="Nozzle Configuration"
          options={[
            ["1", "Single Jet"],
            ["2", "Twin Jets"],
            ["4", "4-Jet Multi-Nozzle"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Jet Ratio: <b>m = D / d = {f1(m_ratio)}</b> {m_ratio >= 10 && m_ratio <= 16 ? "✅ (Ideal 10–16)" : "⚠️ (Adjust jets)"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* Scaled SVG Diagram of Runner and Jets */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <g transform="translate(180, 110)">
              {/* Pitch Circle Diameter */}
              <circle cx="0" cy="0" r="70" fill="none" stroke="#94a3b8" strokeDasharray="4 3" strokeWidth="1.5" />
              <text x="0" y="85" fontSize="10" fill="#64748b" textAnchor="middle" fontWeight="bold">
                Pitch Circle D = {f2(D_wheel)} m
              </text>

              {/* Central Runner Hub */}
              <circle cx="0" cy="0" r="35" fill="#475569" stroke="#1e293b" strokeWidth="2" />
              <circle cx="0" cy="0" r="12" fill="#0f172a" />
              <text x="0" y="4" fontSize="9" fill="#ffffff" textAnchor="middle">{rpm} rpm</text>

              {/* Buckets around rim */}
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i * 360) / 16;
                return (
                  <g key={i} transform={`rotate(${angle}) translate(70, 0)`}>
                    <path
                      d="M -5 -8 C 0 -12, 10 -12, 10 0 C 10 12, 0 12, -5 8 Z"
                      fill="#64748b"
                      stroke="#1e293b"
                      strokeWidth="1.2"
                    />
                    {/* Splitter ridge */}
                    <line x1="0" y1="0" x2="10" y2="0" stroke="#38bdf8" strokeWidth="1" />
                  </g>
                );
              })}

              {/* Nozzles and Jets */}
              {/* Jet 1: Bottom horizontal */}
              <g transform="translate(-140, 70)">
                <polygon points="0,-12 40,-6 40,6 0,12" fill="#334155" />
                <rect x="40" y="-5" width="30" height="10" fill="#38bdf8" />
                <line x1="40" y1="0" x2="70" y2="0" stroke="#ffffff" strokeDasharray="3 2" />
              </g>

              {n_j >= 2 && (
                <g transform="translate(-140, -70)">
                  <polygon points="0,-12 40,-6 40,6 0,12" fill="#334155" />
                  <rect x="40" y="-5" width="30" height="10" fill="#38bdf8" />
                </g>
              )}

              {n_j >= 4 && (
                <>
                  <g transform="translate(70, -140) rotate(90)">
                    <polygon points="0,-12 40,-6 40,6 0,12" fill="#334155" />
                    <rect x="40" y="-5" width="30" height="10" fill="#38bdf8" />
                  </g>
                  <g transform="translate(70, 140) rotate(-90)">
                    <polygon points="0,-12 40,-6 40,6 0,12" fill="#334155" />
                    <rect x="40" y="-5" width="30" height="10" fill="#38bdf8" />
                  </g>
                </>
              )}
            </g>

            {/* Dimension callout annotations */}
            <g transform="translate(370, 30)">
              <rect x="0" y="0" width="150" height="150" rx="6" fill="#ffffff" stroke="#cbd5e1" />
              <text x="12" y="22" fontSize="11" fontWeight="bold" fill="#0f172a">Bucket Proportions</text>
              <text x="12" y="44" fontSize="10" fill="#475569">Width B = 4.0d: <b>{(B_width * 1000).toFixed(0)} mm</b></text>
              <text x="12" y="64" fontSize="10" fill="#475569">Length L = 2.8d: <b>{(L_len * 1000).toFixed(0)} mm</b></text>
              <text x="12" y="84" fontSize="10" fill="#475569">Depth T = 1.0d: <b>{(d_jet * 1000).toFixed(0)} mm</b></text>
              <text x="12" y="104" fontSize="10" fill="#475569">Jet Speed V₁: <b>{f1(design.V1)} m/s</b></text>
              <text x="12" y="124" fontSize="10" fill="#475569">Blade Speed u: <b>{f1(design.u)} m/s</b></text>
              <text x="12" y="142" fontSize="9" fill="#0284c7" fontWeight="bold">Taygun Z: {Z_buckets} buckets</text>
            </g>
          </svg>
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Target Power P (kW)"
            value={powerKw}
            min={500}
            max={15000}
            step={250}
            onChange={setPowerKw}
          />
          <Slider
            label="Net Head H (m)"
            value={head}
            min={100}
            max={800}
            step={25}
            onChange={setHead}
          />
          <Slider
            label="Rotational Speed N (rpm)"
            value={rpm}
            min={250}
            max={1000}
            step={50}
            onChange={setRpm}
          />

          <div style={{ background: "#e0f2fe", padding: "8px 10px", borderRadius: 6, fontSize: "11px", color: "#0369a1" }}>
            💡 <b>Multi-Jet Rule:</b> When a single jet yields m &lt; 10, add nozzles (n_j = 2 or 4) to keep the jet diameter d smaller without resizing the wheel!
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Wheel Pitch Dia D"
          value={`${f2(D_wheel)} m`}
          sub={`Perimeter ${(Math.PI * D_wheel).toFixed(2)} m`}
        />
        <Kpi
          label="Jet Diameter d"
          value={`${(d_jet * 1000).toFixed(1)} mm`}
          sub={`Total Q = ${(design.Q * 1000).toFixed(0)} L/s`}
        />
        <Kpi
          label="Jet Ratio m = D/d"
          value={f1(m_ratio)}
          sub={m_ratio >= 10 && m_ratio <= 16 ? "In sweet spot" : "Out of range"}
        />
        <Kpi
          label="Bucket Count Z"
          value={`${Z_buckets}`}
          sub="Taygun's 15 + 0.5m"
        />
      </div>
    </Sim>
  );
}
