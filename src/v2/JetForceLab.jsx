import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function JetForceLab() {
  const [plateType, setPlateType] = useState("flat_stat"); // "flat_stat", "inclined_stat", "curved_stat", "moving"
  const [dMm, setDMm] = useState(40); // nozzle diameter (mm)
  const [V, setV] = useState(20); // jet velocity (m/s)
  const [thetaDeg, setThetaDeg] = useState(45); // plate tilt (deg)
  const [deflectDeg, setDeflectDeg] = useState(180); // curved deflection (deg)
  const [uSpeed, setUSpeed] = useState(7); // plate speed (m/s)
  const [movingMode, setMovingMode] = useState("single"); // "single", "series"

  const d = dMm / 1000;
  const flat = H.jetForceStationaryFlat(d, V);
  const inc = H.jetForceStationaryInclined(d, V, thetaDeg);
  const curved = H.jetForceStationaryCurved(d, V, deflectDeg);
  const moving = H.jetForceMovingFlat(d, V, uSpeed, movingMode);

  const svgW = 540, svgH = 210;

  return (
    <Sim title="Impact of Water Jets on Plates & Vanes">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={plateType}
          onChange={setPlateType}
          label="Plate Configuration"
          options={[
            ["flat_stat", "1. Fixed Flat"],
            ["inclined_stat", "2. Fixed Inclined"],
            ["curved_stat", "3. Fixed Curved"],
            ["moving", "4. Moving Plates"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Jet: <b>d = {dMm} mm, V = {f1(V)} m/s</b> (Q = {(flat.Q * 1000).toFixed(1)} L/s)
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Nozzle on the left */}
            <polygon points="30,85 80,95 80,115 30,125" fill="#475569" stroke="#1e293b" />
            <rect x="80" y="97" width="10" height="16" fill="#334155" />
            <text x="35" y="145" fontSize="10" fill="var(--tl)" fontWeight="bold">Nozzle (d={dMm}mm)</text>

            {/* Horizontal incoming water jet */}
            <rect x="90" y="98" width="140" height="14" fill="#38bdf8" stroke="#0284c7" />
            <line x1="120" y1="105" x2="160" y2="105" stroke="#ffffff" strokeWidth="2" strokeDasharray="6 3" />
            <text x="130" y="90" fontSize="10" fill="#0284c7" fontWeight="bold">V = {f1(V)} m/s</text>

            {/* Target Plate */}
            {plateType === "flat_stat" && (
              <g>
                <rect x="230" y="40" width="14" height="130" fill="#64748b" stroke="#334155" strokeWidth="2" />
                {/* Deflected sheets up and down */}
                <polygon points="220,105 220,40 230,40 230,105" fill="#38bdf8" />
                <polygon points="220,105 220,170 230,170 230,105" fill="#38bdf8" />
                {/* Normal force arrow */}
                <line x1="244" y1="105" x2="310" y2="105" stroke="#dc2626" strokeWidth="3" />
                <polygon points="310,105 302,100 302,110" fill="#dc2626" />
                <text x="318" y="109" fontSize="11" fill="#dc2626" fontWeight="bold">F = {f1(flat.F)} N</text>
              </g>
            )}

            {plateType === "inclined_stat" && (
              <g>
                {/* Inclined plate */}
                <g transform={`translate(240, 105) rotate(${90 - thetaDeg})`}>
                  <rect x="-7" y="-70" width="14" height="140" fill="#64748b" stroke="#334155" strokeWidth="2" />
                </g>
                {/* Splitting flows */}
                <text x="210" y="35" fontSize="10" fill="#0284c7" fontWeight="bold">
                  Q₁ = {(inc.ratio1 * 100).toFixed(0)}% (Upward)
                </text>
                <text x="210" y="185" fontSize="10" fill="#0284c7" fontWeight="bold">
                  Q₂ = {(inc.ratio2 * 100).toFixed(0)}% (Downward)
                </text>
                {/* Normal force Fn */}
                <line x1="245" y1="105" x2={245 + 50 * Math.sin((thetaDeg * Math.PI) / 180)} y2={105 - 50 * Math.cos((thetaDeg * Math.PI) / 180)} stroke="#dc2626" strokeWidth="3" />
                <text x="285" y="80" fontSize="11" fill="#dc2626" fontWeight="bold">F_n = {f1(inc.Fn)} N</text>
              </g>
            )}

            {plateType === "curved_stat" && (
              <g>
                {/* Symmetrical curved vane */}
                <path d="M 280,45 A 60 60 0 0 0 230,105 A 60 60 0 0 0 280,165" fill="none" stroke="#64748b" strokeWidth="12" />
                {/* Reversed water streams */}
                <path d="M 90,100 L 230,100 A 55 55 0 0 0 275,50" fill="none" stroke="#38bdf8" strokeWidth="7" />
                <path d="M 90,110 L 230,110 A 55 55 0 0 1 275,160" fill="none" stroke="#38bdf8" strokeWidth="7" />
                {/* Reversing arrows */}
                <line x1="275" y1="50" x2="220" y2="50" stroke="#0284c7" strokeWidth="2" />
                <polygon points="220,50 225,47 225,53" fill="#0284c7" />
                <line x1="275" y1="160" x2="220" y2="160" stroke="#0284c7" strokeWidth="2" />
                <polygon points="220,160 225,157 225,163" fill="#0284c7" />
                {/* Force */}
                <line x1="240" y1="105" x2="330" y2="105" stroke="#dc2626" strokeWidth="3.5" />
                <polygon points="330,105 322,100 322,110" fill="#dc2626" />
                <text x="340" y="109" fontSize="11" fill="#dc2626" fontWeight="bold">F = {f1(curved.Fx)} N (2× Flat!)</text>
              </g>
            )}

            {plateType === "moving" && (
              <g>
                {/* Plate moving away with speed u */}
                <rect x="250" y="45" width="14" height="120" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <line x1="264" y1="105" x2="320" y2="105" stroke="#16a34a" strokeWidth="3" />
                <polygon points="320,105 312,100 312,110" fill="#16a34a" />
                <text x="270" y="90" fontSize="11" fill="#16a34a" fontWeight="bold">Blade u = {f1(uSpeed)} m/s</text>
                <text x="130" y="130" fontSize="10" fill="#ea580c" fontWeight="bold">Relative Speed V - u = {f1(Math.max(0, V - uSpeed))} m/s</text>

                {/* Efficiency curve preview */}
                <g transform="translate(380, 45)">
                  <rect x="0" y="0" width="130" height="110" fill="#ffffff" stroke="#cbd5e1" rx="4" />
                  <text x="65" y="16" textAnchor="middle" fontSize="9.5" fill="var(--navy)" fontWeight="bold">Efficiency vs u/V</text>
                  <line x1="15" y1="95" x2="115" y2="95" stroke="#94a3b8" />
                  <line x1="15" y1="25" x2="15" y2="95" stroke="#94a3b8" />
                  {/* Peak efficiency marker */}
                  <circle cx={15 + (movingMode === "single" ? 1 / 3 : 0.5) * 100} cy={95 - (movingMode === "single" ? 8 / 27 : 0.5) * 130} r="4" fill="#dc2626" />
                  <text x={15 + (movingMode === "single" ? 1 / 3 : 0.5) * 100 - 15} y="40" fontSize="9" fill="#dc2626" fontWeight="bold">
                    η_max = {movingMode === "single" ? "29.6%" : "50.0%"}
                  </text>
                </g>
              </g>
            )}

            <text x="30" y="200" fontSize="11" fill="var(--tl)">
              {plateType === "curved_stat"
                ? "Hemispherical vane turns the jet by 180°, doubling momentum change and producing twice the flat-plate force!"
                : plateType === "moving"
                ? `Moving Plate: Work = F × u. Peak efficiency for single plate is 8/27 (at u = V/3); for series of plates on a wheel it is 50% (at u = V/2).`
                : "Newton's Second Law: Force = Rate of change of momentum = mass flow rate × (V_in - V_out)."}
            </text>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Jet Speed (V)" value={V} min={5} max={40} step={1} unit="m/s" onChange={setV} format={f1} />
          <Slider label="Nozzle Diameter (d)" value={dMm} min={20} max={80} step={5} unit="mm" onChange={setDMm} format={f1} />

          {plateType === "inclined_stat" && (
            <Slider label="Plate Inclination θ" value={thetaDeg} min={15} max={90} step={5} unit="°" onChange={setThetaDeg} format={f1} />
          )}

          {plateType === "curved_stat" && (
            <Slider label="Deflection Angle" value={deflectDeg} min={60} max={180} step={10} unit="°" onChange={setDeflectDeg} format={f1} />
          )}

          {plateType === "moving" && (
            <div>
              <Seg
                value={movingMode}
                onChange={setMovingMode}
                label="Moving Configuration"
                options={[
                  ["single", "Single Moving Plate"],
                  ["series", "Series of Vanes (Wheel)"]
                ]}
              />
              <div style={{ marginTop: 8 }}>
                <Slider label="Blade Speed (u)" value={uSpeed} min={0} max={V} step={1} unit="m/s" onChange={setUSpeed} format={f1} />
              </div>
            </div>
          )}

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>Computed Forces & Work:</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>Mass flow rate ρQ:</span>
              <b>{(flat.Q * 1000).toFixed(1)} kg/s</b>
            </div>
            {plateType === "moving" ? (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <span>Pushing Force F:</span>
                  <b>{f1(moving.F)} N</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <span>Work Done / sec:</span>
                  <b>{f1(moving.work)} W</b>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, borderTop: "1px solid #cbd5e1", paddingTop: 4 }}>
                  <span style={{ fontWeight: 600, color: "var(--navy)" }}>Efficiency η:</span>
                  <b style={{ color: "#16a34a" }}>{(moving.efficiency * 100).toFixed(1)} %</b>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <span>Impact Force:</span>
                <b style={{ color: "#dc2626" }}>
                  {f1(plateType === "flat_stat" ? flat.F : plateType === "inclined_stat" ? inc.Fn : curved.Fx)} N
                </b>
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={f1(flat.F) + " N"} l="Flat Plate F" />
            <Kpi
              v={plateType === "moving" ? (moving.efficiency * 100).toFixed(1) + " %" : f1(plateType === "inclined_stat" ? inc.Fn : plateType === "curved_stat" ? curved.Fx : flat.F) + " N"}
              l={plateType === "moving" ? "Efficiency" : "Target Force"}
              tone="good"
            />
          </div>
        </div>
      </div>
    </Sim>
  );
}
