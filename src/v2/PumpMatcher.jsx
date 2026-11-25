import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function PumpMatcher() {
  const [activeTab, setActiveTab] = useState("system"); // "triangle", "system", "npsh"
  const [beta2, setBeta2] = useState(30); // blade exit angle (deg)
  const [hStat, setHStat] = useState(12); // static lift (m)
  const [kLoss, setKLoss] = useState(400); // pipe friction factor (m / (m3/s)^2)
  const [pumpConfig, setPumpConfig] = useState("single"); // "single", "series", "parallel"
  const [suctionLift, setSuctionLift] = useState(3.5); // suction lift Hs (m)

  // Pump characteristics: H = H0 - A * Q^2
  const H0 = 35; // shut-off head (m)
  const A_coeff = 250; // pump internal head loss coefficient

  const match = H.pumpSystemOperatingPoint(hStat, kLoss, H0, A_coeff);
  const currentOp = match[pumpConfig];

  // NPSH calculation
  const npshCalc = H.pumpCavitationNPSH(101.3, 2.34, suctionLift, 0.4);
  const npshRequired = 2.8; // typical NPSHr from manufacturer
  const npshMargin = npshCalc.NPSHa - npshRequired;
  const isCavitationSafe = npshMargin >= 0.5;

  const svgW = 540, svgH = 220;

  return (
    <Sim title="Centrifugal Pump Matcher, Blade Geometry & NPSH">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={activeTab}
          onChange={setActiveTab}
          label="Explorer Mode"
          options={[
            ["system", "1. System Curve & Matching"],
            ["triangle", "2. Impeller Vane Angle β₂"],
            ["npsh", "3. NPSH & Cavitation"]
          ]}
        />
        {activeTab === "system" && (
          <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
            Operating Duty Point: <b>Q = {(currentOp.Q * 1000).toFixed(1)} L/s, H = {f1(currentOp.H)} m</b>
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        {/* SVG Display */}
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {activeTab === "system" && (
              <g transform="translate(40, 20)">
                {/* Axes */}
                <line x1="20" y1="160" x2="440" y2="160" stroke="#475569" strokeWidth="2" />
                <line x1="20" y1="10" x2="20" y2="160" stroke="#475569" strokeWidth="2" />
                <text x="440" y="175" fontSize="10" fill="#475569" textAnchor="end">Discharge Q (L/s)</text>
                <text x="15" y="10" fontSize="10" fill="#475569" textAnchor="end">Head H (m)</text>

                {/* Static head line */}
                {(() => {
                  const statY = 160 - (hStat / 70) * 150;
                  return (
                    <g>
                      <line x1="20" y1={statY} x2="440" y2={statY} stroke="#94a3b8" strokeDasharray="3 3" />
                      <text x="25" y={statY - 4} fontSize="9" fill="#64748b">Static Lift H_stat = {hStat}m</text>
                    </g>
                  );
                })()}

                {/* System curve H_sys = H_stat + K * Q^2 */}
                {(() => {
                  const pts = [];
                  for (let q = 0; q <= 0.35; q += 0.01) {
                    const h = hStat + kLoss * q * q;
                    const x = 20 + (q / 0.35) * 400;
                    const y = 160 - (Math.min(70, h) / 70) * 150;
                    pts.push(`${x},${y}`);
                  }
                  return <polyline points={pts.join(" ")} fill="none" stroke="#dc2626" strokeWidth="2.5" />;
                })()}
                <text x="320" y="40" fontSize="10" fill="#dc2626" fontWeight="bold">System Curve (H = H_s + KQ²)</text>

                {/* Pump Curve Single */}
                {(() => {
                  const pts = [];
                  for (let q = 0; q <= 0.35; q += 0.01) {
                    const h = Math.max(0, H0 - A_coeff * q * q);
                    const x = 20 + (q / 0.35) * 400;
                    const y = 160 - (h / 70) * 150;
                    pts.push(`${x},${y}`);
                  }
                  return <polyline points={pts.join(" ")} fill="none" stroke="#0284c7" strokeWidth={pumpConfig === "single" ? 3 : 1.5} strokeDasharray={pumpConfig === "single" ? "" : "3 2"} />;
                })()}

                {/* Pump Curve Series (Double Head) */}
                {(() => {
                  const pts = [];
                  for (let q = 0; q <= 0.35; q += 0.01) {
                    const h = Math.max(0, 2 * H0 - 2 * A_coeff * q * q);
                    const x = 20 + (q / 0.35) * 400;
                    const y = 160 - (Math.min(70, h) / 70) * 150;
                    pts.push(`${x},${y}`);
                  }
                  return <polyline points={pts.join(" ")} fill="none" stroke="#9333ea" strokeWidth={pumpConfig === "series" ? 3 : 1.5} strokeDasharray={pumpConfig === "series" ? "" : "4 2"} />;
                })()}

                {/* Pump Curve Parallel (Double Flow) */}
                {(() => {
                  const pts = [];
                  for (let q = 0; q <= 0.35; q += 0.01) {
                    const h = Math.max(0, H0 - (A_coeff / 4) * q * q);
                    const x = 20 + (q / 0.35) * 400;
                    const y = 160 - (h / 70) * 150;
                    pts.push(`${x},${y}`);
                  }
                  return <polyline points={pts.join(" ")} fill="none" stroke="#16a34a" strokeWidth={pumpConfig === "parallel" ? 3 : 1.5} strokeDasharray={pumpConfig === "parallel" ? "" : "4 2"} />;
                })()}

                {/* Operating Point Marker */}
                {(() => {
                  const opX = 20 + (currentOp.Q / 0.35) * 400;
                  const opY = 160 - (currentOp.H / 70) * 150;
                  return (
                    <g>
                      <circle cx={opX} cy={opY} r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
                      <line x1={opX} y1={opY} x2={opX} y2="160" stroke="#f59e0b" strokeDasharray="3 2" />
                      <line x1="20" y1={opY} x2={opX} y2={opY} stroke="#f59e0b" strokeDasharray="3 2" />
                      <text x={opX + 8} y={opY - 8} fontSize="10" fontWeight="bold" fill="#78350f">Duty Point</text>
                    </g>
                  );
                })()}
              </g>
            )}

            {activeTab === "triangle" && (
              <g transform="translate(60, 30)">
                <text x="0" y="0" fontSize="12" fontWeight="bold" fill="#0f172a">Impeller Outlet Vane Angle β₂ = {beta2}°</text>
                
                {/* Impeller rim curvature */}
                <path d="M 50 140 C 150 120, 250 120, 350 140" fill="none" stroke="#94a3b8" strokeWidth="6" />
                <text x="200" y="160" fontSize="10" fill="#64748b" textAnchor="middle">Impeller Outer Periphery</text>

                {/* Blade tip */}
                <circle cx="200" cy="125" r="5" fill="#0f172a" />
                
                {/* Blade path according to beta2 */}
                {(() => {
                  const betaRad = (beta2 * Math.PI) / 180;
                  const dx = -60 * Math.cos(betaRad);
                  const dy = -60 * Math.sin(betaRad);
                  return (
                    <g>
                      <line x1="200" y1="125" x2={200 + dx} y2={125 + dy} stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                      <text x={200 + dx - 10} y={125 + dy - 6} fontSize="10" fill="#2563eb" fontWeight="bold">Blade Profile</text>
                    </g>
                  );
                })()}

                {/* Classification label */}
                <rect x="270" y="20" width="180" height="75" rx="6" fill="#ffffff" stroke="#cbd5e1" />
                <text x="280" y="40" fontSize="11" fontWeight="bold" fill={beta2 < 90 ? "#16a34a" : beta2 === 90 ? "#d97706" : "#dc2626"}>
                  {beta2 < 90 ? "Backward Curved (β₂ < 90°)" : beta2 === 90 ? "Radial Vane (β₂ = 90°)" : "Forward Curved (β₂ > 90°)"}
                </text>
                <text x="280" y="60" fontSize="10" fill="#475569">
                  {beta2 < 90 ? "Stable drooping H-Q curve, self-limiting power (Standard!)" : beta2 === 90 ? "Flat curve, high manufacturing ease" : "Rising curve, motor overload hazard"}
                </text>
              </g>
            )}

            {activeTab === "npsh" && (
              <g transform="translate(60, 30)">
                <text x="0" y="10" fontSize="12" fontWeight="bold" fill="#0f172a">Net Positive Suction Head (NPSH) Margin</text>
                
                {/* Traffic light indicator */}
                <rect x="50" y="40" width="320" height="90" rx="8" fill={isCavitationSafe ? "#f0fdf4" : "#fef2f2"} stroke={isCavitationSafe ? "#22c55e" : "#ef4444"} strokeWidth="2" />
                <circle cx="90" cy="85" r="22" fill={isCavitationSafe ? "#22c55e" : "#ef4444"} />
                <text x="90" y="90" fontSize="16" fill="#ffffff" textAnchor="middle" fontWeight="bold">
                  {isCavitationSafe ? "OK" : "STOP"}
                </text>
                <text x="130" y="70" fontSize="12" fontWeight="bold" fill="#0f172a">
                  {isCavitationSafe ? "Safe Against Cavitation" : "Severe Cavitation Alert!"}
                </text>
                <text x="130" y="92" fontSize="10" fill="#475569">
                  NPSH Available: <b>{f2(npshCalc.NPSHa)} m</b> &gt; Required: <b>{f2(npshRequired)} m</b>
                </text>
                <text x="130" y="112" fontSize="10" fill={isCavitationSafe ? "#15803d" : "#b91c1c"} fontWeight="bold">
                  Safety Margin: {f2(npshMargin)} m
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Sliders & Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {activeTab === "system" && (
            <>
              <Seg
                value={pumpConfig}
                onChange={setPumpConfig}
                label="Pump Combination"
                options={[
                  ["single", "1 Pump"],
                  ["series", "2 Series"],
                  ["parallel", "2 Parallel"]
                ]}
              />
              <Slider
                label="Static Lift H_stat (m)"
                value={hStat}
                min={0}
                max={30}
                step={1}
                onChange={setHStat}
              />
              <Slider
                label="Friction Loss K"
                value={kLoss}
                min={100}
                max={1200}
                step={50}
                onChange={setKLoss}
              />
            </>
          )}

          {activeTab === "triangle" && (
            <Slider
              label="Vane Outlet Angle β₂ (deg)"
              value={beta2}
              min={20}
              max={120}
              step={5}
              onChange={setBeta2}
            />
          )}

          {activeTab === "npsh" && (
            <Slider
              label="Suction Lift Hs (m)"
              value={suctionLift}
              min={0.5}
              max={7.5}
              step={0.5}
              onChange={setSuctionLift}
            />
          )}

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11px", color: "var(--tl)" }}>
            ⚡ <b>Civil Insight:</b> In high-friction long pipelines, two pumps in parallel give very little extra discharge. Use series pumps to boost head instead!
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Delivered Flow Q"
          value={`${(currentOp.Q * 1000).toFixed(1)} L/s`}
          sub={pumpConfig.toUpperCase()}
        />
        <Kpi
          label="Total Head H"
          value={`${f1(currentOp.H)} m`}
          sub={`Static: ${hStat}m`}
        />
        <Kpi
          label="NPSH Available"
          value={`${f2(npshCalc.NPSHa)} m`}
          sub={`Margin: ${f2(npshMargin)}m`}
        />
        <Kpi
          label="Vane Angle β₂"
          value={`${beta2}°`}
          sub={beta2 < 90 ? "Backward Curved" : "Non-standard"}
        />
      </div>
    </Sim>
  );
}
