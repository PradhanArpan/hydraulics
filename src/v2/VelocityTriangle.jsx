import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function VelocityTriangle() {
  const [V1, setV1] = useState(30); // jet speed (m/s)
  const [u, setU] = useState(14); // blade velocity (m/s)
  const [beta2Deg, setBeta2Deg] = useState(20); // vane outlet angle (degrees)
  const [kFriction, setKFriction] = useState(1.0); // friction factor (1.0 = smooth, 0.85 = rough)

  // Calculations
  const d = 0.05; // 50 mm jet
  const res = H.jetVelocityTriangle(V1, u, beta2Deg, kFriction, 1000, d);
  const beta2Rad = (beta2Deg * Math.PI) / 180;

  // Relative velocity leaving blade at angle beta2 relative to backwards tangent
  // Vr2x = Vr2 * cos(beta2) to the left
  // Vr2y = Vr2 * sin(beta2) upwards
  // Absolute velocity V2:
  // V2x = u - Vr2 * cos(beta2) (positive to the right, negative to the left)
  // In textbook convention: Vw2 is horizontal component. If V2x points left, Vw2 is in opposite direction to u, so momentum change is (Vw1 + Vw2_mag).
  const Vr2x = res.Vr2 * Math.cos(beta2Rad); // to the left
  const Vf2 = res.Vr2 * Math.sin(beta2Rad); // vertical flow velocity
  const V2x = u - Vr2x; // if < 0, points left (opposite to blade motion)
  const V2 = Math.hypot(V2x, Vf2);
  const beta2Display = beta2Deg;

  // Power and efficiency
  const speedRatio = V1 > 0 ? u / V1 : 0;
  const etaPercent = Math.min(100, Math.max(0, res.efficiency * 100));

  const svgW = 540, svgH = 240;

  // Visual scaling: pixels per m/s
  const scale = 5.2;

  // Inlet triangle origin
  const inX0 = 60;
  const inY0 = 60;
  const inV1Len = V1 * scale;
  const inULen = u * scale;
  const inVrLen = res.Vr1 * scale;

  // Outlet triangle origin (near top of vane)
  const outX0 = 340;
  const outY0 = 70;
  const outVrLen = res.Vr2 * scale;
  const outULen = u * scale;

  // Vane tip coordinates
  const tipX = outX0;
  const tipY = outY0;
  // Vr2 vector points back and up: dx = -Vr2 * cos(beta2), dy = -Vr2 * sin(beta2)
  const vr2Dx = -Vr2x * scale;
  const vr2Dy = -Vf2 * scale;
  // u vector points to the right: dx = +u, dy = 0
  const uDx = outULen;
  // V2 resultant vector = (tipX + vr2Dx + uDx, tipY + vr2Dy)
  const v2Dx = vr2Dx + uDx;
  const v2Dy = vr2Dy;

  return (
    <Sim title="Interactive Velocity Triangles for Moving Curved Vane / Pelton Bucket">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Seg
          value={kFriction.toString()}
          onChange={(val) => setKFriction(parseFloat(val))}
          label="Blade Surface"
          options={[
            ["1", "Smooth (k = 1.0)"],
            ["0.9", "Mild Friction (k = 0.9)"],
            ["0.8", "Rough (k = 0.8)"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Speed Ratio: <b>u / V₁ = {f2(speedRatio)}</b> {speedRatio >= 0.45 && speedRatio <= 0.52 ? "(⭐ Optimal)" : ""}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
              </marker>
              <marker id="arrow-purple" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#9333ea" />
              </marker>
            </defs>

            {/* Moving Vane Curve */}
            <path
              d={`M 170 200 C 170 140, 250 140, 250 80`}
              fill="none"
              stroke="#64748b"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Vane motion arrow */}
            <line x1="190" y1="218" x2={190 + Math.min(60, inULen * 0.6)} y2="218" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrow-green)" />
            <text x="195" y="232" fontSize="10" fill="#16a34a" fontWeight="bold">Blade Speed u</text>

            {/* --- INLET DIAGRAM (Tangential entry at bottom) --- */}
            <text x="40" y="25" fontSize="11" fontWeight="bold" fill="#0f172a">Inlet: Tangential Jet Entry (α₁ = 0°)</text>
            {/* Absolute Jet V1 */}
            <line x1={inX0} y1={inY0} x2={inX0 + inV1Len} y2={inY0} stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrow-red)" />
            <text x={inX0 + 10} y={inY0 - 8} fontSize="11" fill="#dc2626" fontWeight="bold">V₁ = {f1(V1)} m/s (Absolute)</text>

            {/* Blade speed u */}
            <line x1={inX0} y1={inY0 + 16} x2={inX0 + inULen} y2={inY0 + 16} stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrow-green)" />
            <text x={inX0 + 10} y={inY0 + 30} fontSize="10" fill="#16a34a" fontWeight="bold">u = {f1(u)} m/s</text>

            {/* Relative velocity Vr1 = V1 - u */}
            <line x1={inX0 + inULen} y1={inY0 + 16} x2={inX0 + inV1Len} y2={inY0 + 16} stroke="#2563eb" strokeWidth="3" markerEnd="url(#arrow-blue)" />
            <text x={inX0 + inULen + 5} y={inY0 + 30} fontSize="10" fill="#2563eb" fontWeight="bold">Vr₁ = {f1(res.Vr1)} m/s</text>

            {/* --- OUTLET VELOCITY TRIANGLE (Leaving vane tip) --- */}
            <text x="320" y="25" fontSize="11" fontWeight="bold" fill="#0f172a">Outlet Triangle (β₂ = {beta2Display}°)</text>
            
            {/* Vane tip anchor */}
            <circle cx={tipX} cy={tipY} r="4" fill="#0f172a" />

            {/* Relative Velocity Vector Vr2 */}
            <line
              x1={tipX}
              y1={tipY}
              x2={tipX + vr2Dx}
              y2={tipY + vr2Dy}
              stroke="#2563eb"
              strokeWidth="2.5"
              markerEnd="url(#arrow-blue)"
            />
            <text x={tipX + vr2Dx / 2 - 25} y={tipY + vr2Dy / 2 - 6} fontSize="10" fill="#2563eb" fontWeight="bold">
              Vr₂ = {f1(res.Vr2)}
            </text>

            {/* Blade Velocity vector u at tip */}
            <line
              x1={tipX + vr2Dx}
              y1={tipY + vr2Dy}
              x2={tipX + vr2Dx + uDx}
              y2={tipY + vr2Dy}
              stroke="#16a34a"
              strokeWidth="2.5"
              markerEnd="url(#arrow-green)"
            />
            <text x={tipX + vr2Dx + uDx / 2 - 10} y={tipY + vr2Dy - 6} fontSize="10" fill="#16a34a" fontWeight="bold">
              u
            </text>

            {/* Resultant Absolute Velocity V2 */}
            <line
              x1={tipX}
              y1={tipY}
              x2={tipX + v2Dx}
              y2={tipY + v2Dy}
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              markerEnd="url(#arrow-red)"
            />
            <text x={tipX + v2Dx / 2 + 10} y={tipY + v2Dy / 2 + 12} fontSize="10" fill="#dc2626" fontWeight="bold">
              V₂ = {f1(V2)}
            </text>

            {/* Flow Velocity Vf2 (vertical drop) */}
            <line
              x1={tipX + v2Dx}
              y1={tipY + v2Dy}
              x2={tipX + v2Dx}
              y2={tipY}
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <text x={tipX + v2Dx + 4} y={tipY + v2Dy / 2} fontSize="9" fill="#0284c7">
              Vf₂ = {f1(Vf2)}
            </text>

            {/* Whirl Velocity Vw2 (horizontal projection) */}
            <line
              x1={tipX}
              y1={tipY + 14}
              x2={tipX + v2Dx}
              y2={tipY + 14}
              stroke="#9333ea"
              strokeWidth="2"
              markerEnd="url(#arrow-purple)"
            />
            <text x={tipX + v2Dx / 2 - 15} y={tipY + 28} fontSize="9" fill="#9333ea" fontWeight="bold">
              Vw₂ = {f1(Math.abs(V2x))} ({V2x < 0 ? "Opposite" : "Forward"})
            </text>
          </svg>
        </div>

        {/* Sliders & Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Slider
            label="Jet Speed V₁ (m/s)"
            value={V1}
            min={10}
            max={50}
            step={1}
            onChange={setV1}
          />
          <Slider
            label="Blade Speed u (m/s)"
            value={u}
            min={2}
            max={35}
            step={1}
            onChange={setU}
          />
          <Slider
            label="Outlet Angle β₂ (deg)"
            value={beta2Deg}
            min={10}
            max={60}
            step={5}
            onChange={setBeta2Deg}
          />
          
          <div style={{ background: "#e0f2fe", padding: "8px 12px", borderRadius: 6, fontSize: "12px", color: "#0369a1" }}>
            💡 <b>Pelton Bucket Tip:</b> Real Pelton runners use deflection $\approx 165^\circ$ ($\beta_2 \approx 15^\circ$) so exiting water doesn't hit the back of the next bucket!
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 }}>
        <Kpi
          label="Relative Speed Vr₁"
          value={`${f1(res.Vr1)} m/s`}
          sub={`Vr₂ = ${f1(res.Vr2)} m/s`}
        />
        <Kpi
          label="Whirl Velocity Vw₂"
          value={`${f1(Math.abs(res.Vw2))} m/s`}
          sub={res.Vw2 > 0 ? "Adds to impulse" : "Opposite sign"}
        />
        <Kpi
          label="Work Done / sec"
          value={`${(res.workPerSec / 1000).toFixed(1)} kW`}
          sub="per unit mass flow"
        />
        <Kpi
          label="Hydraulic Efficiency"
          value={`${etaPercent.toFixed(1)}%`}
          sub={`Max at u = 0.5 V₁ (50%)`}
        />
      </div>
    </Sim>
  );
}
