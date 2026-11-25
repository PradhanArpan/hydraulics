import React, { useState } from "react";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function RecipCrank() {
  const [crankDeg, setCrankDeg] = useState(60); // crank angle theta (deg)
  const [actionType, setActionType] = useState("single"); // "single", "double"
  const [airVessel, setAirVessel] = useState("on"); // "on", "off"

  const thetaRad = (crankDeg * Math.PI) / 180;
  const isSuction = crankDeg >= 0 && crankDeg < 180;
  const isDelivery = crankDeg >= 180 && crankDeg < 360;

  // Crank radius r = 0.15m, connecting rod L = 0.60m
  const r = 40, L = 120;
  const crankX = 90 + r * Math.cos(thetaRad);
  const crankY = 110 - r * Math.sin(thetaRad); // SVG y goes down

  // Piston position
  const pistonX = 90 + r * Math.cos(thetaRad) + Math.sqrt(L * L - Math.pow(r * Math.sin(thetaRad), 2));

  // Instantaneous discharge
  const sinTheta = Math.sin(thetaRad);
  let instFlowRate = 0;
  if (actionType === "single") {
    // Single-acting delivers only during delivery stroke (0 to 180 or 180 to 360 depending on convention)
    instFlowRate = Math.max(0, sinTheta);
  } else {
    // Double-acting delivers on both strokes
    instFlowRate = Math.abs(sinTheta);
  }

  const workSaved = actionType === "single" ? 84.8 : 39.2;
  const svgW = 540, svgH = 220;

  return (
    <Sim title="Reciprocating Pump Kinematics & Air Vessel Smoothing">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={actionType}
          onChange={setActionType}
          label="Pump Action"
          options={[
            ["single", "Single Acting"],
            ["double", "Double Acting"]
          ]}
        />
        <Seg
          value={airVessel}
          onChange={setAirVessel}
          label="Air Vessel"
          options={[
            ["on", "Air Vessel (Fitted)"],
            ["off", "No Air Vessel"]
          ]}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* SVG Mechanism and Waveform */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Crank Center and Circle */}
            <circle cx="90" cy="110" r={r} fill="none" stroke="#cbd5e1" strokeDasharray="3 3" />
            <circle cx="90" cy="110" r="4" fill="#0f172a" />

            {/* Crank Arm */}
            <line x1="90" y1="110" x2={crankX} y2={crankY} stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
            <circle cx={crankX} cy={crankY} r="5" fill="#dc2626" />

            {/* Connecting Rod */}
            <line x1={crankX} y1={crankY} x2={pistonX} y2="110" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx={pistonX} cy="110" r="5" fill="#0284c7" />

            {/* Cylinder Housing */}
            <rect x="230" y="80" width="130" height="60" fill="none" stroke="#334155" strokeWidth="3" />
            {/* Piston */}
            <rect x={pistonX - 10} y="85" width="20" height="50" rx="3" fill="#64748b" stroke="#1e293b" strokeWidth="2" />
            {/* Piston Rod */}
            <line x1={pistonX - 10} y1="110" x2={pistonX} y2="110" stroke="#1e293b" strokeWidth="6" />

            {/* Air Vessel dome on delivery pipe */}
            {airVessel === "on" && (
              <g transform="translate(320, 30)">
                <path d="M 0 50 C -15 50, -15 10, 0 5 C 15 10, 15 50, 0 50 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <rect x="-10" y="25" width="20" height="25" fill="#bae6fd" opacity="0.6" />
                <text x="0" y="22" fontSize="8" fill="#a16207" textAnchor="middle" fontWeight="bold">Air Cushion</text>
              </g>
            )}

            {/* Suction and Delivery Valves */}
            <g transform="translate(320, 80)">
              {/* Delivery Pipe upwards */}
              <line x1="0" y1="0" x2="0" y2="-35" stroke="#475569" strokeWidth="4" />
              {/* Delivery valve flap */}
              <line x1="-6" y1="-10" x2={sinTheta > 0 ? "8" : "6"} y2={sinTheta > 0 ? "-20" : "-10"} stroke={sinTheta > 0 ? "#16a34a" : "#dc2626"} strokeWidth="2.5" />
              <text x="14" y="-14" fontSize="8" fill={sinTheta > 0 ? "#16a34a" : "#dc2626"} fontWeight="bold">
                {sinTheta > 0 ? "Delivery OPEN" : "Delivery Closed"}
              </text>
            </g>

            <g transform="translate(320, 140)">
              {/* Suction Pipe downwards */}
              <line x1="0" y1="0" x2="0" y2="40" stroke="#475569" strokeWidth="4" />
              {/* Suction valve flap */}
              <line x1="-6" y1="10" x2={sinTheta <= 0 ? "8" : "6"} y2={sinTheta <= 0 ? "20" : "10"} stroke={sinTheta <= 0 ? "#16a34a" : "#dc2626"} strokeWidth="2.5" />
              <text x="14" y="25" fontSize="8" fill={sinTheta <= 0 ? "#16a34a" : "#dc2626"} fontWeight="bold">
                {sinTheta <= 0 ? "Suction OPEN" : "Suction Closed"}
              </text>
            </g>

            {/* Discharge Waveform Preview on the bottom right */}
            <g transform="translate(380, 150)">
              <rect x="0" y="0" width="140" height="60" rx="4" fill="#ffffff" stroke="#cbd5e1" />
              <text x="10" y="14" fontSize="9" fontWeight="bold" fill="#475569">Delivery Discharge Q(θ)</text>
              {airVessel === "off" ? (
                <path d="M 10 50 Q 40 20 70 50 L 130 50" fill="none" stroke="#dc2626" strokeWidth="2" />
              ) : (
                <line x1="10" y1="36" x2="130" y2="36" stroke="#16a34a" strokeWidth="3" />
              )}
              <text x="70" y="56" fontSize="8" fill={airVessel === "off" ? "#dc2626" : "#16a34a"} textAnchor="middle" fontWeight="bold">
                {airVessel === "off" ? "Pulsating (High friction loss!)" : "Steady Flow (Work Saved!)"}
              </text>
            </g>
          </svg>
        </div>

        {/* Sliders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Crank Angle θ (deg)"
            value={crankDeg}
            min={0}
            max={360}
            step={5}
            onChange={setCrankDeg}
          />

          <div style={{ background: "#f8fafc", padding: "10px", borderRadius: 6, border: "1px solid var(--g200)" }}>
            <span style={{ fontSize: "12px", fontWeight: "bold", color: "#0f172a" }}>Stroke State:</span>
            <p style={{ margin: "4px 0 0", fontSize: "11px", color: "var(--tl)" }}>
              {sinTheta > 0 ? "💧 Delivery Stroke: Water is forced out into the delivery pipe." : "🔄 Suction Stroke: Piston pulls water from the sump."}
            </p>
          </div>

          <div style={{ background: "#fef9c3", padding: "8px 10px", borderRadius: 6, fontSize: "11px", color: "#854d0e" }}>
            💡 <b>Friction Power Saving:</b> Fitting an air vessel saves <b>{workSaved}%</b> of the work lost to pipe friction in {actionType}-acting pumps!
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Crank Angle θ"
          value={`${crankDeg}°`}
          sub={sinTheta > 0 ? "Delivery" : "Suction"}
        />
        <Kpi
          label="Piston Velocity"
          value={`${(Math.abs(sinTheta)).toFixed(2)} ωr`}
          sub="Sinusoidal variation"
        />
        <Kpi
          label="Work Saved by Vessel"
          value={airVessel === "on" ? `${workSaved}%` : "0%"}
          sub="Against pipe friction"
        />
        <Kpi
          label="Flow Type"
          value={airVessel === "on" ? "Uniform" : "Pulsating"}
          sub={actionType === "single" ? "Single acting" : "Double acting"}
        />
      </div>
    </Sim>
  );
}
