import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function MeshLab() {
  const [dx, setDx] = useState(25); // grid cell size dx (m)
  const [dt, setDt] = useState(2.0); // time step dt (s)
  const [gridType, setGridType] = useState("subgrid"); // "subgrid", "standard"

  const u = 1.8; // flow velocity (m/s)
  const y = 2.5; // flow depth (m)
  const cfl = H.cflCondition(u, y, dx, dt);

  const Cr = cfl.Cr;
  const isStable = cfl.isStable;
  const celerity = cfl.c;
  const dtMax = cfl.dtMax;

  const svgW = 540, svgH = 220;

  // Generate wave profile points across 500m river reach
  const numCells = Math.floor(500 / dx);
  const pts = [];
  for (let i = 0; i <= numCells; i++) {
    const xCoord = i * dx;
    // Base Gaussian flood wave centered at x = 200m
    const dist = (xCoord - 200) / 40;
    let waveH = 2.5 + 2.0 * Math.exp(-dist * dist);

    // If unstable (Cr > 1.0), inject high-frequency numerical oscillations
    if (!isStable) {
      const blowup = Math.min(5, Math.pow(Cr, 1.8));
      const osc = Math.sin(i * Math.PI) * (Cr - 1.0) * 1.5;
      waveH = Math.max(0.5, waveH * blowup + osc);
    }

    const svgX = 40 + (xCoord / 500) * 440;
    const svgY = 170 - (Math.min(8.0, waveH) / 8.0) * 120;
    pts.push({ x: svgX, y: svgY, waveH });
  }

  const polylineStr = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Sim title="HEC-RAS 2D Mesh, CFL Stability & Flood Wave Routing">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={gridType}
          onChange={setGridType}
          label="Mesh Technology"
          options={[
            ["subgrid", "HEC-RAS 2D Subgrid Bathymetry"],
            ["standard", "Standard Flat-Bottom Grid"]
          ]}
        />
        <span style={{ fontSize: "12px", fontWeight: "bold", color: isStable ? "#16a34a" : "#dc2626" }}>
          Courant Number: <b>Cr = {f2(Cr)}</b> {isStable ? "✅ (Stable Cr ≤ 1.0)" : "❌ (Explosive Instability!)"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* SVG Reach & Wave Simulation */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* River Bed Profile */}
            <path d="M 40 180 L 480 180" stroke="#475569" strokeWidth="4" />
            <text x="40" y="198" fontSize="10" fill="#475569">x = 0 m</text>
            <text x="480" y="198" fontSize="10" fill="#475569" textAnchor="end">x = 500 m</text>

            {/* Grid cell vertical mesh lines */}
            {pts.map((p, i) => (
              <line key={i} x1={p.x} y1="60" x2={p.x} y2="180" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
            ))}

            {/* Subgrid bathymetry terrain contours inside cells */}
            {gridType === "subgrid" && (
              <g opacity="0.3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <circle key={i} cx={50 + i * 22} cy="180" r={4 + (i % 3) * 3} fill="#94a3b8" />
                ))}
              </g>
            )}

            {/* Water Wave Polygon */}
            <polygon
              points={`40,180 ${polylineStr} 480,180`}
              fill={isStable ? "#bae6fd" : "#fecaca"}
              stroke={isStable ? "#0284c7" : "#dc2626"}
              strokeWidth="2.5"
            />

            {/* CFL Status Banner inside SVG */}
            <rect
              x="50"
              y="20"
              width="260"
              height="30"
              rx="6"
              fill={isStable ? "#dcfce7" : "#fee2e2"}
              stroke={isStable ? "#16a34a" : "#dc2626"}
              strokeWidth="1.5"
            />
            <text x="60" y="40" fontSize="11" fontWeight="bold" fill={isStable ? "#15803d" : "#991b1b"}>
              {isStable ? "Stable Solution: Wave Advects Smoothly" : "💥 Numerical Blowup: Oscillations Exploding!"}
            </text>

            {/* Characteristic wave speed arrow */}
            <g transform="translate(200, 70)">
              <line x1="0" y1="0" x2="50" y2="0" stroke="#0f172a" strokeWidth="2" />
              <polygon points="50,-3 56,0 50,3" fill="#0f172a" />
              <text x="25" y="-6" fontSize="9" fill="#0f172a" textAnchor="middle" fontWeight="bold">
                Wave Celerity c = {f1(celerity)} m/s
              </text>
            </g>
          </svg>
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Grid Spacing Δx (m)"
            value={dx}
            min={10}
            max={50}
            step={5}
            onChange={setDx}
          />
          <Slider
            label="Time Step Δt (s)"
            value={dt}
            min={0.5}
            max={6.0}
            step={0.5}
            onChange={setDt}
          />

          <div style={{ background: isStable ? "#f0fdf4" : "#fef2f2", padding: "8px 10px", borderRadius: 6, fontSize: "11px", color: isStable ? "#16a34a" : "#b91c1c" }}>
            {isStable ? (
              <>✅ <b>CFL Satisfied:</b> Information travels at most one cell per time step ($\Delta t \le {f2(dtMax)}$ s).</>
            ) : (
              <>⚠️ <b>CFL Violated:</b> Signal skips over cells, causing mathematical instability! Reduce $\Delta t$ or increase $\Delta x$.</>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Courant Number Cr"
          value={f2(Cr)}
          sub={isStable ? "Cr ≤ 1.0 (Stable)" : "Cr > 1.0 (Blowup)"}
        />
        <Kpi
          label="Wave Celerity c = √(gy)"
          value={`${f2(celerity)} m/s`}
          sub={`Depth y = 2.5 m`}
        />
        <Kpi
          label="Max Stable Time Step"
          value={`${f2(dtMax)} s`}
          sub="dt_max = dx / (u + c)"
        />
        <Kpi
          label="Total Grid Cells"
          value={`${numCells} cells`}
          sub={`dx = ${dx} m`}
        />
      </div>
    </Sim>
  );
}
