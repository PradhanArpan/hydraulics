import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function TurbineCutaway() {
  const [turbineType, setTurbineType] = useState("francis"); // "francis", "kaplan"
  const [vaneOpening, setVaneOpening] = useState(65); // % guide vane opening
  const [draftHeight, setDraftHeight] = useState(3.0); // suction height Hs above tailrace (m)

  // Fluid dynamics of the reaction machine
  const head = turbineType === "francis" ? 120 : 30; // net head
  const baseQ = turbineType === "francis" ? 10 : 35; // nominal flow
  const Q = baseQ * (vaneOpening / 100);
  const alpha1Deg = 10 + (vaneOpening / 100) * 25; // guide vane angle (deg)

  // Draft tube velocities
  const V3 = (turbineType === "francis" ? 8.5 : 11.0) * (vaneOpening / 100); // runner exit speed (m/s)
  const V4 = V3 * 0.35; // draft tube exit speed (expanded area ~ 3x)
  const dt = H.draftTubeRecovery(V3, V4, 0.82);

  // Pressure head at runner exit: p3/gamma = patm/gamma - Hs - (V3^2 - V4^2)/(2g) + hf
  // p3/gamma = 10.3 - Hs - dt.h_rec
  const pAtmHead = 10.33; // atmospheric pressure in m of water
  const p3Head = pAtmHead - draftHeight - dt.h_rec;
  const isCavitationRisk = p3Head < 2.5; // vapour pressure head ~ 0.25 to 2.5 m

  const svgW = 540, svgH = 230;

  return (
    <Sim title="Reaction Turbine Cutaway & Draft Tube Pressure Recovery">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={turbineType}
          onChange={setTurbineType}
          label="Turbine Type"
          options={[
            ["francis", "Francis (Inward Mixed)"],
            ["kaplan", "Kaplan (Axial Propeller)"]
          ]}
        />
        <span style={{ fontSize: "12px", color: isCavitationRisk ? "#dc2626" : "var(--navy)", fontWeight: 600 }}>
          Runner Exit Pressure: <b>{f2(p3Head)} m vacuum</b> {isCavitationRisk ? "⚠️ (Cavitation Risk!)" : "✅ (Safe)"}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* Cutaway SVG Diagram */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Spiral Casing Left Section */}
            <path d="M 40 40 C 20 40, 20 100, 40 100 L 90 90 L 90 50 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
            <text x="35" y="75" fontSize="9" fill="#ffffff" fontWeight="bold">Spiral</text>

            {/* Spiral Casing Right Section (smaller diameter due to continuous flow feed) */}
            <path d="M 270 50 C 285 50, 285 90, 270 90 L 220 85 L 220 55 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2" />

            {/* Stay Ring & Guide Vanes (Wicket Gates) */}
            <g transform="translate(90, 48)">
              {/* Left guide vanes */}
              <line x1="10" y1="5" x2={10 + 12 * Math.cos(alpha1Deg * Math.PI / 180)} y2={5 + 12 * Math.sin(alpha1Deg * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="20" x2={10 + 12 * Math.cos(alpha1Deg * Math.PI / 180)} y2={20 + 12 * Math.sin(alpha1Deg * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
              <line x1="10" y1="35" x2={10 + 12 * Math.cos(alpha1Deg * Math.PI / 180)} y2={35 + 12 * Math.sin(alpha1Deg * Math.PI / 180)} stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            </g>
            <text x="120" y="32" fontSize="9" fill="#0284c7" fontWeight="bold">Guide Vanes (α₁ = {alpha1Deg.toFixed(0)}°)</text>

            {/* Turbine Runner */}
            {turbineType === "francis" ? (
              <g transform="translate(155, 70)">
                <rect x="-35" y="-18" width="70" height="36" rx="4" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
                {/* Curved Francis runner blades */}
                <path d="M -25 -15 C -15 0, -20 15, -15 15" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M -5 -15 C 5 0, 0 15, 5 15" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <path d="M 15 -15 C 25 0, 20 15, 25 15" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                <text x="0" y="3" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="bold">Francis Runner</text>
              </g>
            ) : (
              <g transform="translate(155, 70)">
                <ellipse cx="0" cy="0" rx="14" ry="20" fill="#334155" />
                {/* Kaplan blades */}
                <path d="M -14 -6 L -35 -2 L -14 2 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                <path d="M 14 -6 L 35 -2 L 14 2 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2" />
                <text x="0" y="3" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="bold">Kaplan</text>
              </g>
            )}

            {/* Draft Tube (Expanding elbow diffuser) */}
            <path
              d="M 120 88 L 120 140 C 120 180, 150 200, 240 200 L 320 200 L 320 170 C 230 170, 190 150, 190 88 Z"
              fill="#e2e8f0"
              stroke="#475569"
              strokeWidth="2"
            />
            {/* Water flow arrows in draft tube */}
            <path d="M 155 95 L 155 145 C 155 170, 180 185, 270 185" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 3" />
            
            {/* Tailrace Water Level */}
            <rect x="290" y="165" width="220" height="45" fill="#bae6fd" opacity="0.6" />
            <line x1="280" y1="165" x2="520" y2="165" stroke="#0284c7" strokeWidth="2" />
            <text x="360" y="160" fontSize="10" fill="#0284c7" fontWeight="bold">Tailrace Water Level</text>

            {/* Suction Height Hs annotation */}
            <line x1="105" y1="88" x2="105" y2="165" stroke="#dc2626" strokeWidth="1.5" />
            <polygon points="105,88 102,96 108,96" fill="#dc2626" />
            <polygon points="105,165 102,157 108,157" fill="#dc2626" />
            <text x="65" y="130" fontSize="9" fill="#dc2626" fontWeight="bold">Hs = {draftHeight.toFixed(1)}m</text>

            {/* Velocity vectors V3 and V4 */}
            <text x="160" y="112" fontSize="9" fill="#0f172a" fontWeight="bold">V₃ = {f1(V3)} m/s</text>
            <text x="260" y="180" fontSize="9" fill="#0f172a" fontWeight="bold">V₄ = {f1(V4)} m/s</text>
          </svg>
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Guide Vane Opening (%)"
            value={vaneOpening}
            min={20}
            max={100}
            step={5}
            onChange={setVaneOpening}
          />
          <Slider
            label="Suction Height Hs (m)"
            value={draftHeight}
            min={1.0}
            max={7.5}
            step={0.5}
            onChange={setDraftHeight}
          />

          <div style={{ background: "#e0f2fe", padding: "8px 10px", borderRadius: 6, fontSize: "11px", color: "#0369a1" }}>
            💡 <b>Draft Tube Magic:</b> As water expands through the tube, velocity drops from $V_3$ to $V_4$. This velocity head drop creates a **suction vacuum** below the runner, pulling more energy from the water!
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Flow Rate Q"
          value={`${f1(Q)} m³/s`}
          sub={`At ${vaneOpening}% gate`}
        />
        <Kpi
          label="Head Regained h_dt"
          value={`${f2(dt.h_rec)} m`}
          sub={`Efficiency 82%`}
        />
        <Kpi
          label="Runner Exit Pressure"
          value={`${f2(p3Head)} m`}
          sub={p3Head > 2.5 ? "Sub-atmospheric safe" : "Danger: Cavitation!"}
        />
        <Kpi
          label="Exit Kinetic Loss"
          value={`${((V4 * V4) / (2 * 9.81)).toFixed(2)} m`}
          sub="Dumped to tailrace"
        />
      </div>
    </Sim>
  );
}
