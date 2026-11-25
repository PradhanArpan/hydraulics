import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function FlatPlateBL() {
  const [mode, setMode] = useState("concept"); // "concept", "laminar", "drag"
  const [U, setU] = useState(2.0); // m/s
  const [L, setL] = useState(2.0); // m
  const [xSample, setXSample] = useState(1.0); // m
  const [profileType, setProfileType] = useState("parabolic");

  const nu = 1e-6; // m^2/s (water)
  const rho = 1000; // kg/m^3
  const ReL = H.reynolds(U, L, nu);
  const Rex = H.reynolds(U, xSample, nu);

  const lam = H.blLaminar(xSample, U, nu, rho);
  const turb = H.blTurbulent(xSample, U, nu, rho);
  const dragRes = H.plateDrag(L, 1.0, U, nu, rho);

  const svgW = 540, svgH = 210, bedY = 175;

  return (
    <Sim title="Boundary Layer on a Flat Plate">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={mode}
          onChange={setMode}
          label="Display Mode"
          options={[
            ["concept", "1. BL Growth δ(x)"],
            ["laminar", "2. Profiles vs Blasius"],
            ["drag", "3. Friction & Drag F_D"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          Free-stream U = {f1(U)} m/s | Re_L = {(ReL / 1e5).toFixed(1)} × 10⁵
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {/* Flat plate boundary */}
            <rect x="50" y={bedY} width="440" height="12" fill="#78350f" stroke="#451a03" strokeWidth="1" />
            <line x1="50" y1="40" x2="50" y2={bedY} stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
            <text x="50" y="32" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">Leading Edge (x=0)</text>

            {/* Boundary layer curve delta(x) */}
            <path
              d={`M 50,${bedY} C 120,${bedY - 25} 250,${bedY - 60} 490,${bedY - 95}`}
              fill="rgba(14, 165, 233, 0.18)"
              stroke="#0284c7"
              strokeWidth="2.5"
            />
            <text x="350" y={bedY - 75} fontSize="11" fill="#0284c7" fontWeight="bold">
              δ(x) ∝ √x (Laminar)
            </text>

            {/* Velocity vectors entering */}
            <g transform="translate(15, 60)">
              <line x1="0" y1="0" x2="25" y2="0" stroke="#0284c7" strokeWidth="2" />
              <polygon points="25,0 20,-3 20,3" fill="#0284c7" />
              <line x1="0" y1="30" x2="25" y2="30" stroke="#0284c7" strokeWidth="2" />
              <polygon points="25,30 20,27 20,33" fill="#0284c7" />
              <line x1="0" y1="60" x2="25" y2="60" stroke="#0284c7" strokeWidth="2" />
              <polygon points="25,60 20,57 20,63" fill="#0284c7" />
              <text x="0" y="-8" fontSize="10" fill="#0284c7" fontWeight="bold">Free-stream U</text>
            </g>

            {/* Velocity profile at xSample */}
            {(() => {
              const xPos = 50 + (xSample / L) * 440;
              const deltaPix = 15 + Math.sqrt(xSample / L) * 80;
              return (
                <g>
                  <line x1={xPos} y1="35" x2={xPos} y2={bedY} stroke="#94a3b8" strokeDasharray="2 2" />
                  <circle cx={xPos} cy={bedY - deltaPix} r="4" fill="#dc2626" />
                  <text x={xPos + 5} y={bedY - deltaPix - 4} fontSize="10" fill="#dc2626" fontWeight="bold">
                    δ = {(lam.delta * 1000).toFixed(1)} mm
                  </text>
                  {/* Arrows showing u(y) */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map(frac => {
                    const yP = bedY - frac * deltaPix;
                    const uFrac = mode === "laminar" && profileType === "linear" ? frac : (2 * frac - frac * frac);
                    const arrowLen = Math.min(45, uFrac * 45);
                    return (
                      <g key={frac}>
                        <line x1={xPos} y1={yP} x2={xPos + arrowLen} y2={yP} stroke="#0369a1" strokeWidth="1.5" />
                        <polygon points={`${xPos + arrowLen},${yP} ${xPos + arrowLen - 4},${yP - 2} ${xPos + arrowLen - 4},${yP + 2}`} fill="#0369a1" />
                      </g>
                    );
                  })}
                </g>
              );
            })()}

            <text x="50" y="200" fontSize="11" fill="var(--tl)">
              Inside the boundary layer (y &lt; δ): fluid friction slows the flow. Outside (y &gt; δ): u = U (inviscid flow).
            </text>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Free-stream Speed (U)" value={U} min={0.5} max={5.0} step={0.25} unit="m/s" onChange={setU} format={f2} />
          <Slider label="Plate Length (L)" value={L} min={0.5} max={4.0} step={0.25} unit="m" onChange={setL} format={f2} />
          <Slider label="Probe Position (x)" value={xSample} min={0.1} max={L} step={0.1} unit="m" onChange={setXSample} format={f2} />

          {mode === "laminar" && (
            <Seg
              value={profileType}
              onChange={setProfileType}
              label="Assumed Profile"
              options={[
                ["linear", "Linear (u=y)"],
                ["parabolic", "Parabolic (2y-y²)"],
                ["cubic", "Cubic"]
              ]}
            />
          )}

          <div style={{ background: "#f1f5f9", padding: "8px 10px", borderRadius: 6, fontSize: "11.5px" }}>
            <b style={{ color: "var(--navy)" }}>At x = {f2(xSample)} m:</b>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span>Local Reynolds Re_x:</span>
              <b>{(Rex / 1e5).toFixed(2)} × 10⁵</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Layer thickness δ:</span>
              <b style={{ color: "#0284c7" }}>{(lam.delta * 1000).toFixed(1)} mm</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Wall shear stress τ₀:</span>
              <b>{f2(lam.tau0)} Pa</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span>Total Drag Force (1m wide):</span>
              <b style={{ color: "#16a34a" }}>{f2(dragRes.dragOneSide)} N</b>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Kpi v={(Rex < 5e5 ? "Laminar" : "Turbulent")} l="Flow State" tone={Rex < 5e5 ? "good" : "warn"} />
            <Kpi v={f2(lam.H)} l="Shape Factor H" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
