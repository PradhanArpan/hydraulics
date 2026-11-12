import React, { useState, useMemo } from "react";
import { Plot, path, Legend, C } from "./charts.jsx";

const f1 = v => (isFinite(v) ? (+v).toFixed(1) : "-");
const f2 = v => (isFinite(v) ? (+v).toFixed(2) : "-");
const f3 = v => (isFinite(v) ? (+v).toFixed(3) : "-");
const f4 = v => (isFinite(v) ? (+v).toFixed(4) : "-");
const big = v => (isFinite(v) ? Math.round(v).toLocaleString("en-IN") : "-");

function Box({ title, kind = "Interactive Workbench", children }) {
  return (
    <div className="wg" style={{ margin: "1.2rem 0", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <div className="wg-h">
        <b>{title}</b>
        <span>{kind}</span>
      </div>
      <div className="wg-b">{children}</div>
    </div>
  );
}

function Kpi({ v, l, tone }) {
  return (
    <div className={"kpi " + (tone || "")}>
      <div className="v">{v}</div>
      <div className="l">{l}</div>
    </div>
  );
}

function Seg({ value, options, onChange }) {
  return (
    <div className="seg">
      {options.map(([v, l]) => (
        <button
          key={v}
          type="button"
          className={v === value ? "on" : ""}
          onClick={() => onChange(v)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function SliderRow({ label, value, min, max, step, unit = "", onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "0.35rem 0", fontSize: "0.85rem" }}>
      <span style={{ flex: "0 0 170px", color: "var(--navy, #0f1f3d)", fontWeight: 600 }}>{label}:</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ flex: 1, accentColor: "#1a5f7a" }}
      />
      <span style={{ flex: "0 0 65px", fontFamily: "var(--mono, monospace)", textAlign: "right", fontSize: "0.85rem" }}>
        {value} {unit}
      </span>
    </div>
  );
}

/* =========================================================================
   1. S10: PIPE FLOW VS OPEN CHANNEL SIMULATOR WITH CROSS SECTIONS (ocf_pipe_compare)
   ========================================================================= */
export function OcfPipeCompare() {
  const [dia, setDia] = useState(2.0); // Pipe diameter or Channel Bed width (m)
  const [slope, setSlope] = useState(1.5); // per 1000
  const [pressureHead, setPressureHead] = useState(3.5); // m for pipe
  const [depthRatio, setDepthRatio] = useState(0.7); // y/D for channel

  const g = 9.81;
  const S0 = slope / 1000;
  const n = 0.015;

  // Channel Hydraulics (Trapezoidal with 1V:1.5H)
  const y_chan = dia * depthRatio;
  const m = 1.5;
  const A_chan = (dia + m * y_chan) * y_chan;
  const P_chan = dia + 2 * y_chan * Math.sqrt(1 + m * m);
  const R_chan = A_chan / P_chan;
  const V_chan = Math.max(0.4, (1 / n) * Math.pow(R_chan, 2 / 3) * Math.sqrt(S0));
  const Q_chan = A_chan * V_chan;
  const velHead_chan = (V_chan * V_chan) / (2 * g);

  // Pipe Hydraulics (Circular Pipe running 100% full under pressure)
  const A_pipe = (Math.PI / 4) * dia * dia;
  const P_pipe = Math.PI * dia;
  const R_pipe = dia / 4;
  const V_pipe = 2.4; // Controlled by pump / reservoir gradient
  const Q_pipe = A_pipe * V_pipe;
  const velHead_pipe = (V_pipe * V_pipe) / (2 * g);

  return (
    <Box title="Pipe Flow vs. Open Channel Flow Dual Simulator (With Cross Sections)" kind="S10 Interactive Lab">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "0.75rem" }}>
        <div style={{ background: "#eff6ff", padding: "10px", borderRadius: 6, border: "1px solid #bfdbfe" }}>
          <b style={{ color: "#1e40af", fontSize: "0.95rem" }}>Closed Pipe Flow (Under Pressure)</b>
          <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "2px" }}>
            Rigid full conduit • Piezometer head rises to HGL = z + P/γ (above crown)
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap", fontSize: "0.78rem" }}>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>D = {f2(dia)} m</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700, color: "#dc2626" }}>P/γ = {f2(pressureHead)} m</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4 }}>Q = {f2(Q_pipe)} m³/s</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, color: "#166534" }}>R = {f2(R_pipe)} m</span>
          </div>
        </div>

        <div style={{ background: "#f0fdf4", padding: "10px", borderRadius: 6, border: "1px solid #bbf7d0" }}>
          <b style={{ color: "#166534", fontSize: "0.95rem" }}>Open Channel Flow (Free Surface)</b>
          <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "2px" }}>
            Atmospheric interface • WSL strictly equals HGL (Gauge P = 0)
          </div>
          <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap", fontSize: "0.78rem" }}>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>y = {f2(y_chan)} m</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, fontWeight: 700, color: "#dc2626" }}>P_surf = 0 (atm)</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4 }}>Q = {f2(Q_chan)} m³/s</span>
            <span style={{ background: "#fff", padding: "2px 6px", borderRadius: 4, color: "#166534" }}>R = {f2(R_chan)} m</span>
          </div>
        </div>
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Conduit Dimension (D or B)" value={dia} min={1.0} max={4.0} step={0.25} unit="m" onChange={setDia} />
        <SliderRow label="Longitudinal Slope S0" value={slope} min={0.2} max={4.0} step={0.1} unit="‰" onChange={setSlope} />
        <SliderRow label="Pipe Pressure Head (P/γ)" value={pressureHead} min={1.0} max={6.0} step={0.5} unit="m" onChange={setPressureHead} />
        <SliderRow label="Channel Depth Ratio (y/D)" value={depthRatio} min={0.2} max={1.0} step={0.05} unit="" onChange={setDepthRatio} />
      </div>

      {/* DUAL SVG: SIDE BY SIDE WITH CROSS SECTIONS */}
      <svg viewBox="0 0 920 280" style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 6 }}>
        <defs>
          <linearGradient id="wbWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6fb4d0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#1a5f7a" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="wbPipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#718096" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>
          <marker id="wbArr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" fill="#0f1f3d" />
          </marker>
        </defs>

        {/* LEFT HALF: PIPE FLOW PROFILE + CROSS SECTION */}
        <g transform="translate(15, 10)">
          <rect x="0" y="0" width="435" height="260" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="15" y="22" fontSize="13" fontWeight="700" fill="#0f1f3d">Pressure Pipe: Profile &amp; Section</text>

          {/* Longitudinal pipe */}
          <rect x="20" y="160" width="240" height="40" rx="3" fill="url(#wbPipe)" />
          <rect x="22" y="164" width="236" height="32" fill="url(#wbWater)" />
          <line x1="25" y1="180" x2="255" y2="180" stroke="#bee3f8" strokeWidth="1.8" strokeDasharray="6 4" className="anim-flow" />

          {/* Piezometer tap */}
          <rect x="130" y={160 - pressureHead * 18} width="16" height={pressureHead * 18} fill="#fff" stroke="#475569" strokeWidth="1.5" />
          <rect x="132" y={160 - pressureHead * 18} width="12" height={pressureHead * 18} fill="url(#wbWater)" />
          <ellipse cx="138" cy={160 - pressureHead * 18} rx="6" ry="2" fill="#63b3ed" stroke="#2b6cb0" />

          {/* HGL and EGL */}
          <line x1="15" y1={160 - pressureHead * 18} x2="265" y2={160 - pressureHead * 18 + 12} stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
          <text x="150" y={160 - pressureHead * 18 - 4} fontSize="9.5" fontWeight="700" fill="#dc2626">HGL (z + P/γ)</text>

          <line x1="15" y1={160 - pressureHead * 18 - 20} x2="265" y2={160 - pressureHead * 18 + 12 - 20} stroke="#2563eb" strokeWidth="2" />
          <text x="150" y={160 - pressureHead * 18 - 24} fontSize="9.5" fontWeight="700" fill="#2563eb">EGL = HGL + V²/2g</text>

          {/* Pipe Cross Section on right */}
          <g transform="translate(320, 150)">
            <circle cx="45" cy="30" r="38" fill="url(#wbPipe)" stroke="#1a202c" strokeWidth="2" />
            <circle cx="45" cy="30" r="32" fill="url(#wbWater)" />
            <line x1="45" y1="-8" x2="45" y2="68" stroke="#cbd5e1" strokeDasharray="2 2" />
            <line x1="7" y1="30" x2="83" y2="30" stroke="#cbd5e1" strokeDasharray="2 2" />
            <text x="45" y="34" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">100% Full</text>
            <text x="45" y="85" fontSize="10" fontWeight="700" fill="#0f1f3d" textAnchor="middle">Pipe Section (Dia {f1(dia)}m)</text>
            <text x="45" y="98" fontSize="8.5" fill="#475569" textAnchor="middle">P = πD = {f2(P_pipe)}m • R = D/4</text>
          </g>
        </g>

        {/* RIGHT HALF: OPEN CHANNEL PROFILE + CROSS SECTION */}
        <g transform="translate(470, 10)">
          <rect x="0" y="0" width="435" height="260" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
          <text x="15" y="22" fontSize="13" fontWeight="700" fill="#0f1f3d">Open Channel: Profile &amp; Section</text>

          {/* Sloping Channel bed */}
          <line x1="20" y1="180" x2="260" y2="195" stroke="#78350f" strokeWidth="4" />
          <polygon points={`20,180 260,195 260,${195 - y_chan * 22} 20,${180 - y_chan * 22}`} fill="url(#wbWater)" />

          {/* Water Surface Line = HGL */}
          <line x1="15" y1={180 - y_chan * 22} x2="265" y2={195 - y_chan * 22} stroke="#dc2626" strokeWidth="2.5" />
          <text x="130" y={175 - y_chan * 22} fontSize="9.5" fontWeight="700" fill="#dc2626">WSL ≡ HGL (P = 0)</text>

          {/* EGL parallel */}
          <line x1="15" y1={180 - y_chan * 22 - velHead_chan * 25} x2="265" y2={195 - y_chan * 22 - velHead_chan * 25} stroke="#2563eb" strokeWidth="2" />
          <text x="140" y={175 - y_chan * 22 - velHead_chan * 25 - 4} fontSize="9.5" fontWeight="700" fill="#2563eb">EGL = WSL + V²/2g</text>

          {/* Channel Cross Section on right */}
          <g transform="translate(300, 120)">
            <polygon points={`
              ${60 - (dia * 10 + m * y_chan * 14)},${100 - y_chan * 24}
              ${60 + (dia * 10 + m * y_chan * 14)},${100 - y_chan * 24}
              ${60 + dia * 10},100
              ${60 - dia * 10},100
            `} fill="url(#wbWater)" stroke="#2b6cb0" />
            {/* Banks */}
            <line x1={60 - dia * 10 - 20} y1="100" x2={60 - dia * 10} y2="100" stroke="#78350f" strokeWidth="3" />
            <line x1={60 - dia * 10} y1="100" x2={60 - (dia * 10 + m * y_chan * 14) - 10} y2={100 - y_chan * 24 - 10} stroke="#78350f" strokeWidth="3" />
            <line x1={60 + dia * 10} y1="100" x2={60 + (dia * 10 + m * y_chan * 14) + 10} y2={100 - y_chan * 24 - 10} stroke="#78350f" strokeWidth="3" />
            <line x1={60 + dia * 10} y1="100" x2={60 + dia * 10 + 20} y2="100" stroke="#78350f" strokeWidth="3" />
            {/* Free Surface */}
            <line x1={60 - (dia * 10 + m * y_chan * 14)} y1={100 - y_chan * 24} x2={60 + (dia * 10 + m * y_chan * 14)} y2={100 - y_chan * 24} stroke="#0284c7" strokeWidth="2" />
            <text x="60" y="115" fontSize="10" fontWeight="700" fill="#0f1f3d" textAnchor="middle">Channel Section (y = {f2(y_chan)}m)</text>
            <text x="60" y="128" fontSize="8.5" fill="#475569" textAnchor="middle">P = {f2(P_chan)}m • R = {f2(R_chan)}m</text>
          </g>
        </g>
      </svg>
    </Box>
  );
}

/* =========================================================================
   2. S10: VELOCITY DISTRIBUTION & SURFACE "VELOCITY DIP" (velocity_dip_sim)
   ========================================================================= */
export function VelocityDipVisualizer() {
  const [aspectRatio, setAspectRatio] = useState(2.0); // b/y
  const [vMax, setVMax] = useState(2.4); // m/s
  const yTotal = 2.0; // m depth

  // The velocity dip: max velocity occurs at depth (0.05 + 0.20 / aspectRatio) * y below free surface
  const dipDepth = Math.min(0.28, Math.max(0.04, 0.05 + 0.35 / (aspectRatio + 0.5))); // fraction below surface
  const yMaxPos = yTotal * (1 - dipDepth); // distance from bed

  // Velocity profile calculation at fractional depths
  const getV = (yVal) => {
    const eta = yVal / yTotal;
    if (eta <= 0) return 0;
    const base = vMax * Math.pow(eta, 1 / 6);
    const dipFactor = 1 - 0.22 * Math.exp(-Math.pow((1 - eta) / (dipDepth * 1.5), 2)) * (1.2 / Math.sqrt(aspectRatio));
    return Math.max(0, base * dipFactor);
  };

  const vSurface = getV(yTotal);
  const v02 = getV(yTotal * 0.8);
  const v06 = getV(yTotal * 0.4);
  const v08 = getV(yTotal * 0.2);
  const vMeanTwoPt = (v02 + v08) / 2;
  const vMeanOnePt = v06;

  return (
    <Box title="Open Channel Velocity Distribution & Surface Velocity Dip" kind="S10 Visual Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f2(vMax) + " m/s"} l="Max Velocity Vmax" tone="good" />
        <Kpi v={f2(dipDepth * 100) + "% below surface"} l="Dip Position" />
        <Kpi v={f2(vSurface) + " m/s"} l="Surface Velocity" />
        <Kpi v={f2(vMeanOnePt) + " m/s"} l="1-Point Mean (v₀.₆)" />
        <Kpi v={f2(vMeanTwoPt) + " m/s"} l="2-Point Mean (v₀.₂+v₀.₈)/2" tone="good" />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Aspect Ratio (B / y)" value={aspectRatio} min={0.8} max={8.0} step={0.2} unit="" onChange={setAspectRatio} />
        <SliderRow label="Centerline Max Velocity Vmax" value={vMax} min={1.0} max={4.0} step={0.1} unit="m/s" onChange={setVMax} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10px", alignItems: "center" }}>
        <svg viewBox="0 0 340 190" style={{ width: "100%", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Axis */}
          <line x1="50" y1="170" x2="310" y2="170" stroke="#718096" strokeWidth="1.5" />
          <line x1="50" y1="170" x2="50" y2="20" stroke="#718096" strokeWidth="1.5" />
          <text x="300" y="185" fontSize="9" fill="#4a5568">u (m/s)</text>
          <text x="25" y="30" fontSize="9" fill="#4a5568">y</text>
          <line x1="50" y1="30" x2="310" y2="30" stroke="#1a5f7a" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="260" y="26" fontSize="8.5" fill="#1a5f7a">Water Surface</text>

          {/* Profile curve */}
          {(() => {
            const pts = [];
            for (let step = 0; step <= 30; step++) {
              const yVal = (step / 30) * yTotal;
              const vVal = getV(yVal);
              const px = 50 + (vVal / (vMax * 1.2)) * 180;
              const py = 170 - (yVal / yTotal) * 140;
              pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
            }
            return <polyline points={pts.join(" ")} fill="none" stroke="#1a5f7a" strokeWidth="3" />;
          })()}

          {/* Measurement Points */}
          <circle cx={50 + (v06 / (vMax * 1.2)) * 180} cy={170 - 0.4 * 140} r="4" fill="#c8973a" stroke="#fff" strokeWidth="1.5" />
          <text x={50 + (v06 / (vMax * 1.2)) * 180 + 6} y={170 - 0.4 * 140 + 3} fontSize="8.5" fill="#c8973a" fontWeight="700">v₀.₆ = {f2(v06)}</text>

          <circle cx={50 + (getV(yMaxPos) / (vMax * 1.2)) * 180} cy={170 - (1 - dipDepth) * 140} r="4" fill="#e53e3e" stroke="#fff" strokeWidth="1.5" />
          <text x={50 + (getV(yMaxPos) / (vMax * 1.2)) * 180 + 6} y={170 - (1 - dipDepth) * 140 + 3} fontSize="8.5" fill="#e53e3e" fontWeight="700">Vmax dip</text>
        </svg>

        <div style={{ background: "#f8fafc", padding: "12px", borderRadius: 6, border: "1px solid #cbd5e1" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1f3d" }}>IS:1192 Current Metering Standards</div>
          <div style={{ fontSize: "0.8rem", color: "#334155", marginTop: "4px", lineHeight: 1.45 }}>
            • <b>Shallow streams (&lt; 0.6m):</b> Single point reading at 0.6 depth: <b>V ≈ v₀.₆</b>.<br/>
            • <b>Deep streams (≥ 0.6m):</b> Two-point average at 0.2 and 0.8 depth: <b>V ≈ (v₀.₂ + v₀.₈)/2</b>.<br/>
            Notice that both rules closely match the integrated true average of the non-uniform profile!
          </div>
        </div>
      </div>
    </Box>
  );
}

/* =========================================================================
   3. S11: KINETIC ENERGY & MOMENTUM CORRECTION FACTORS (alpha_beta_integrator)
   ========================================================================= */
export function AlphaBetaExplorer() {
  const [profileType, setProfileType] = useState("power"); // "power" | "compound" | "linear"
  const [mExponent, setMExponent] = useState(6); // for power law v = v_max (y/y0)^(1/m)
  const [floodplainRatio, setFloodplainRatio] = useState(0.4); // V_fp / V_mc

  const { alpha, beta, meanVelRatio, why } = useMemo(() => {
    if (profileType === "power") {
      const m = mExponent;
      const vRatio = m / (m + 1);
      const b = Math.pow(m + 1, 2) / (m * (m + 2));
      const a = Math.pow(m + 1, 3) / (m * m * (m + 3));
      return {
        alpha: a,
        beta: b,
        meanVelRatio: vRatio,
        why: `For power law exponent 1/m = 1/${m}: Mean V = ${f3(vRatio)} Vmax, β = ${f3(b)}, α = ${f3(a)}. Notice α > β > 1.0!`
      };
    } else if (profileType === "compound") {
      const A1 = 0.6, A2 = 0.4, V1 = 1.0, V2 = floodplainRatio;
      const Vmean = A1 * V1 + A2 * V2;
      const b = (A1 * V1 * V1 + A2 * V2 * V2) / (Vmean * Vmean);
      const a = (A1 * Math.pow(V1, 3) + A2 * Math.pow(V2, 3)) / Math.pow(Vmean, 3);
      return {
        alpha: a,
        beta: b,
        meanVelRatio: Vmean,
        why: `Compound channel with floodplain velocity ${f2(floodplainRatio)}: severe velocity contrast gives high α = ${f3(a)} and β = ${f3(b)}!`
      };
    } else {
      return {
        alpha: 1.333,
        beta: 1.155,
        meanVelRatio: 0.5,
        why: "Linear Couette shear distribution v = Vmax (y/y0): analytical α = 1.333, β = 1.155."
      };
    }
  }, [profileType, mExponent, floodplainRatio]);

  return (
    <Box title="Kinetic Energy (α) & Momentum (β) Integration Explorer" kind="S11 Visual Simulator">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <Seg
          value={profileType}
          options={[
            ["power", "Turbulent Power-Law Profile (v ∝ y^(1/m))"],
            ["compound", "Compound Channel (Main + Floodplain)"],
            ["linear", "Linear Shear Profile (v ∝ y)"]
          ]}
          onChange={setProfileType}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f3(alpha)} l="Coriolis Coeff α (Energy)" tone="good" />
        <Kpi v={f3(beta)} l="Boussinesq Coeff β (Momentum)" />
        <Kpi v={f3(alpha - beta)} l="Difference (α - β ≥ 0)" />
        <Kpi v={f3(meanVelRatio)} l="Mean V / Vmax" />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        {profileType === "power" ? (
          <SliderRow label="Power Law Exponent m" value={mExponent} min={2} max={10} step={1} unit="" onChange={setMExponent} />
        ) : profileType === "compound" ? (
          <SliderRow label="Floodplain Velocity Ratio (V_fp / V_mc)" value={floodplainRatio} min={0.1} max={0.9} step={0.05} unit="" onChange={setFloodplainRatio} />
        ) : (
          <div style={{ fontSize: "0.85rem", color: "#5a5048" }}>Linear laminar shear: analytical constants α = 4/3 ≈ 1.333, β = 7/6 ≈ 1.155.</div>
        )}
      </div>

      <p className="note" style={{ fontSize: "0.82rem", margin: "0.4rem 0 0 0", color: "#5a5048" }}>{why}</p>
    </Box>
  );
}
export function CowanRoughnessExplorer() {
  const [n0, setN0] = useState(0.020); // base material
  const [n1, setN1] = useState(0.005); // surface irregularity
  const [n2, setN2] = useState(0.005); // cross-section variation
  const [n3, setN3] = useState(0.010); // obstructions
  const [n4, setN4] = useState(0.010); // vegetation
  const [m5, setM5] = useState(1.15); // meandering

  // Cowan formula: n = (n0 + n1 + n2 + n3 + n4) * m5
  const sumBase = n0 + n1 + n2 + n3 + n4;
  const nTotal = sumBase * m5;

  // Hydraulic impact on a standard trapezoidal canal
  const B = 4.0, y = 1.5, z = 1.5, S0 = 0.001;
  const A = (B + z * y) * y;
  const P = B + 2 * y * Math.sqrt(1 + z * z);
  const R = A / P;
  const Q = (1 / nTotal) * A * Math.pow(R, 2 / 3) * Math.sqrt(S0);
  const V = Q / A;

  return (
    <Box title="Cowan's 10-Factor Manning's n Calculator & Simulator" kind="S12 & S13 Interactive Tool">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f4(nTotal)} l="Composite Manning n" tone="good" />
        <Kpi v={f2(Q) + " m³/s"} l="Canal Discharge Q" tone="good" />
        <Kpi v={f2(V) + " m/s"} l="Mean Velocity V" />
        <Kpi v={f3(nTotal * m5)} l="Meander Adjusted" />
        <Kpi v={f1((nTotal / 0.015) * 100) + "%"} l="vs. Smooth Concrete" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.6rem", background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <label className="f">
          <b>n₀: Channel Base Material</b>
          <select value={n0} onChange={e => setN0(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={0.012}>Smooth Concrete / Metal Flume (0.012)</option>
            <option value={0.020}>Clean Earth / Firm Soil (0.020)</option>
            <option value={0.025}>Rock Cut / Clean Jagged Stone (0.025)</option>
            <option value={0.024}>Fine Gravel Bed (0.024)</option>
            <option value={0.028}>Coarse Gravel / Cobbles (0.028)</option>
          </select>
        </label>

        <label className="f">
          <b>n₁: Surface Irregularity</b>
          <select value={n1} onChange={e => setN1(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={0.000}>Smooth - Best finish (0.000)</option>
            <option value={0.005}>Minor - Slight erosion / scalloping (0.005)</option>
            <option value={0.010}>Moderate - Eroded earth banks (0.010)</option>
            <option value={0.020}>Severe - Badly sloughed / jagged rock (0.020)</option>
          </select>
        </label>

        <label className="f">
          <b>n₂: Variations in Channel Cross Section</b>
          <select value={n2} onChange={e => setN2(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={0.000}>Gradual - Uniform prismatic canal (0.000)</option>
            <option value={0.005}>Alternating - Occasional pools and shallows (0.005)</option>
            <option value={0.012}>Frequent - Large variations in shape (0.012)</option>
          </select>
        </label>

        <label className="f">
          <b>n₃: Effect of Obstructions</b>
          <select value={n3} onChange={e => setN3(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={0.000}>Negligible - No debris or bridge piers (0.000)</option>
            <option value={0.010}>Minor - Small debris / isolated rocks (0.010)</option>
            <option value={0.025}>Appreciable - Submerged logs / boulders (0.025)</option>
            <option value={0.050}>Severe - Choked with fallen trees / jams (0.050)</option>
          </select>
        </label>

        <label className="f">
          <b>n₄: Vegetation Density</b>
          <select value={n4} onChange={e => setN4(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={0.000}>None - Paved or un-vegetated (0.000)</option>
            <option value={0.008}>Low - Short grass / flexible weeds (0.008)</option>
            <option value={0.020}>Medium - Dense weeds / bushy banks (0.020)</option>
            <option value={0.040}>High - Dense reeds / willow saplings (0.040)</option>
            <option value={0.080}>Very High - Trees and thickets in floodway (0.080)</option>
          </select>
        </label>

        <label className="f">
          <b>m₅: Meandering Ratio (Curvature)</b>
          <select value={m5} onChange={e => setM5(+e.target.value)} style={{ width: "100%", padding: "4px", borderRadius: "4px", border: "1px solid #cbd5e0" }}>
            <option value={1.00}>Straight Reach (Length ratio &lt; 1.2) - 1.00</option>
            <option value={1.15}>Appreciable Meanders (Ratio 1.2 to 1.5) - 1.15</option>
            <option value={1.30}>Severe Meanders (Ratio &gt; 1.5) - 1.30</option>
          </select>
        </label>
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 540 100" style={{ width: "100%", maxHeight: "100px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Bed profile with water */}
          <path d="M20 75 Q150 78 280 73 T520 76 L520 95 L20 95Z" fill={n0 > 0.024 ? "#8d8273" : "#c9a878"} />
          <path d="M20 40 Q150 42 280 39 T520 41 L520 76 Q380 74 280 73 T20 75Z" fill="rgba(26,95,122,0.3)" />
          {/* Flow waves */}
          <path d="M30 40 Q150 42 280 39 T510 41" fill="none" stroke="#1a5f7a" strokeWidth="2" />
          {/* Animated weeds if n4 > 0 */}
          {n4 > 0.005 && [60, 110, 170, 230, 310, 390, 470].map(x => (
            <path key={x} d={`M${x} 74 Q${x + 8} 50 ${x + (V > 1.5 ? 18 : 6)} 45`} fill="none" stroke="#2d6a4f" strokeWidth={n4 > 0.02 ? 3 : 1.8} strokeLinecap="round" />
          ))}
          {/* Obstruction rocks if n3 > 0 */}
          {n3 > 0.005 && [140, 270, 420].map(x => (
            <ellipse key={x} cx={x} cy="73" rx={n3 > 0.02 ? 14 : 8} ry={n3 > 0.02 ? 8 : 5} fill="#4a5568" stroke="#333" />
          ))}
          <text x="270" y="24" fill="#0f1f3d" fontSize="11" textAnchor="middle" fontWeight="700">
            Cowan Formula: n = (n₀ + n₁ + n₂ + n₃ + n₄) × m₅ = ({f3(n0)} + {f3(n1)} + {f3(n2)} + {f3(n3)} + {f3(n4)}) × {f2(m5)} = {f4(nTotal)}
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   5. S13: COMPOSITE ROUGHNESS CHANNEL LAB (composite_roughness_lab)
   ========================================================================= */
export function CompositeRoughnessLab() {
  const [bedWidth, setBedWidth] = useState(3.0);
  const [depth, setDepth] = useState(1.2);
  const [sideSlope, setSideSlope] = useState(1.5); // 1V : zH
  const [nBed, setNBed] = useState(0.015); // concrete
  const [nBank, setNBank] = useState(0.035); // rip-rap or vegetated

  const P_bed = bedWidth;
  const P_bank = 2 * depth * Math.sqrt(1 + sideSlope * sideSlope);
  const P_total = P_bed + P_bank;
  const A = (bedWidth + sideSlope * depth) * depth;
  const R = A / P_total;

  // 1. Horton & Einstein: n_e = [ (sum Pi ni^1.5) / P ]^(2/3)
  const sumHE = P_bed * Math.pow(nBed, 1.5) + P_bank * Math.pow(nBank, 1.5);
  const n_HE = Math.pow(sumHE / P_total, 2 / 3);

  // 2. Pavlovskij: n_e = [ (sum Pi ni^2) / P ]^(1/2)
  const sumPav = P_bed * Math.pow(nBed, 2) + P_bank * Math.pow(nBank, 2);
  const n_Pav = Math.sqrt(sumPav / P_total);

  // 3. Lotter: n_e = P R^(5/3) / [ sum (Pi Ri^(5/3) / ni) ] (approximating Ri = R)
  const sumLotter = (P_bed / nBed) + (P_bank / nBank);
  const n_Lotter = P_total / sumLotter;

  return (
    <Box title="Composite Channel Roughness Multi-Method Solver" kind="S13 Engineering Tool">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f4(n_HE)} l="Horton-Einstein n_e" tone="good" />
        <Kpi v={f4(n_Pav)} l="Pavlovskij n_e" tone="good" />
        <Kpi v={f4(n_Lotter)} l="Lotter n_e" />
        <Kpi v={f2(P_bed) + " m"} l="Bed Perimeter P₁" />
        <Kpi v={f2(P_bank) + " m"} l="Bank Perimeter P₂" />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Bed Width B" value={bedWidth} min={1.5} max={8.0} step={0.5} unit="m" onChange={setBedWidth} />
        <SliderRow label="Water Depth y" value={depth} min={0.5} max={3.0} step={0.1} unit="m" onChange={setDepth} />
        <SliderRow label="Side Slope z (1V:zH)" value={sideSlope} min={0.5} max={2.5} step={0.25} unit="" onChange={setSideSlope} />
        <SliderRow label="Bed Roughness n₁ (Paved)" value={nBed} min={0.010} max={0.025} step={0.001} unit="" onChange={setNBed} />
        <SliderRow label="Bank Roughness n₂ (Vegetated)" value={nBank} min={0.020} max={0.060} step={0.002} unit="" onChange={setNBank} />
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 500 130" style={{ width: "100%", maxHeight: "130px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Channel graphic with colored perimeters */}
          <polygon points="120,105 180,105 320,105 380,105 440,30 60,30" fill="none" stroke="#cbd5e0" strokeWidth="1" />
          <polygon points="135,105 365,105 425,35 75,35" fill="rgba(26,95,122,0.25)" stroke="#1a5f7a" strokeWidth="1.5" />
          {/* Bed segment (Paved - Blue) */}
          <line x1="135" y1="105" x2="365" y2="105" stroke="#1a5f7a" strokeWidth="4" />
          {/* Bank segments (Vegetated - Brown) */}
          <line x1="75" y1="35" x2="135" y2="105" stroke="#8a4b12" strokeWidth="4" />
          <line x1="365" y1="105" x2="425" y2="35" stroke="#8a4b12" strokeWidth="4" />

          <text x="250" y="122" fill="#1a5f7a" fontSize="10.5" textAnchor="middle" fontWeight="700">Bed: n₁ = {nBed} (P₁ = {f2(P_bed)} m)</text>
          <text x="60" y="25" fill="#8a4b12" fontSize="10" fontWeight="600">Bank n₂ = {nBank}</text>
          <text x="440" y="25" fill="#8a4b12" fontSize="10" textAnchor="end" fontWeight="600">Bank n₂ = {nBank} (P₂ = {f2(P_bank)} m)</text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   6. S14: MOST ECONOMICAL RECTANGULAR & TRIANGULAR CHANNELS (economic_rect_tri)
   ========================================================================= */
export function EconomicRectTriWorkbench() {
  const [shape, setShape] = useState("rectangular"); // "rectangular" | "triangular"
  const [area, setArea] = useState(8.0); // m^2 fixed area
  const [yDepth, setYDepth] = useState(2.0); // m
  const [vertexAngle, setVertexAngle] = useState(90); // deg for triangular

  // Rectangular: A = B*y -> B = A/y. P = B + 2y = A/y + 2y. Min P at B = 2y -> y = sqrt(A/2)
  const yOptRect = Math.sqrt(area / 2);
  const bOptRect = 2 * yOptRect;
  const bCurrent = area / yDepth;
  const pCurrentRect = bCurrent + 2 * yDepth;
  const pMinRect = bOptRect + 2 * yOptRect;
  const rCurrentRect = area / pCurrentRect;
  const isRectOptimal = Math.abs(yDepth - yOptRect) < 0.08;

  // Triangular: A = z*y^2. For given A, min P occurs when side slope z = 1 (vertex angle 90 deg, semi-vertex 45 deg)
  const thetaRad = ((vertexAngle / 2) * Math.PI) / 180;
  const zTri = Math.tan(thetaRad);
  const yTri = Math.sqrt(area / zTri);
  const pTri = 2 * yTri * Math.sqrt(1 + zTri * zTri);
  const isTriOptimal = vertexAngle === 90;

  return (
    <Box title="Most Economical Rectangular & Triangular Sections" kind="S14 Design Lab">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Seg
          value={shape}
          options={[
            ["rectangular", "Rectangular Section (B = 2y, R = y/2)"],
            ["triangular", "Triangular Section (Vertex = 90°, R = y/2√2)"]
          ]}
          onChange={setShape}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {shape === "rectangular" ? (
          <>
            <Kpi v={f2(yOptRect) + " m"} l="Optimal Depth y*" tone="good" />
            <Kpi v={f2(bOptRect) + " m"} l="Optimal Width B = 2y" tone="good" />
            <Kpi v={f2(pMinRect) + " m"} l="Minimum Perimeter P*" tone="good" />
            <Kpi v={f2(pCurrentRect) + " m"} l="Current Perimeter P" tone={isRectOptimal ? "good" : "warn"} />
            <Kpi v={f3(rCurrentRect) + " m"} l="Hydraulic Radius R" />
          </>
        ) : (
          <>
            <Kpi v="90° (Right Angle)" l="Optimal Total Vertex 2θ" tone="good" />
            <Kpi v="45° (z = 1.0)" l="Optimal Semi-Angle θ" tone="good" />
            <Kpi v={f2(pTri) + " m"} l="Current Perimeter P" tone={isTriOptimal ? "good" : "warn"} />
            <Kpi v={f3(area / pTri) + " m"} l="Hydraulic Radius R" />
            <Kpi v={isTriOptimal ? "OPTIMAL" : "SUB-OPTIMAL"} l="Section Status" tone={isTriOptimal ? "good" : "warn"} />
          </>
        )}
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Cross-Sectional Area A" value={area} min={2.0} max={20.0} step={1.0} unit="m²" onChange={setArea} />
        {shape === "rectangular" ? (
          <SliderRow label="Current Water Depth y" value={yDepth} min={0.5} max={5.0} step={0.1} unit="m" onChange={setYDepth} />
        ) : (
          <SliderRow label="Total Vertex Angle 2θ" value={vertexAngle} min={40} max={140} step={5} unit="°" onChange={setVertexAngle} />
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 500 150" style={{ width: "100%", maxHeight: "150px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {shape === "rectangular" ? (
            <g>
              {/* Dynamic Rectangle */}
              {(() => {
                const scale = 25;
                const rw = bCurrent * scale;
                const rh = yDepth * scale;
                const rx = 250 - rw / 2;
                const ry = 130 - rh;
                return (
                  <>
                    <rect x={rx} y={ry} width={rw} height={rh} fill="rgba(26,95,122,0.25)" stroke="#1a5f7a" strokeWidth="2.5" />
                    {/* Inscribed semicircle when optimal */}
                    {isRectOptimal && (
                      <path d={`M${rx},${ry} A${rh},${rh} 0 0 0 ${rx + rw},${ry}`} fill="none" stroke="#c8973a" strokeWidth="2" strokeDasharray="4 3" />
                    )}
                    <text x="250" y={ry + rh / 2 + 4} fill="#0f1f3d" fontSize="11" textAnchor="middle" fontWeight="700">
                      B = {f2(bCurrent)} m × y = {f2(yDepth)} m (P = {f2(pCurrentRect)} m)
                    </text>
                  </>
                );
              })()}
              <text x="250" y="20" fill={isRectOptimal ? "#2d6a4f" : "#8a4b12"} fontSize="11.5" textAnchor="middle" fontWeight="700">
                {isRectOptimal ? "★ MOST ECONOMICAL CONDITION SATISFIED (B = 2y, R = y/2) ★" : "Move slider to y = " + f2(yOptRect) + " m for minimum wetted perimeter"}
              </text>
            </g>
          ) : (
            <g>
              {/* Triangular V */}
              {(() => {
                const cy = 130;
                const h = 90;
                const halfW = h * zTri;
                return (
                  <>
                    <polygon points={`250,${cy} ${250 - halfW},${cy - h} ${250 + halfW},${cy - h}`} fill="rgba(26,95,122,0.25)" stroke="#1a5f7a" strokeWidth="2.5" />
                    <line x1="250" y1={cy} x2="250" y2={cy - h} stroke="#4a5568" strokeDasharray="3 3" />
                    <text x="250" y="20" fill={isTriOptimal ? "#2d6a4f" : "#8a4b12"} fontSize="11.5" textAnchor="middle" fontWeight="700">
                      {isTriOptimal ? "★ OPTIMAL HYDRAULIC SECTION: 2θ = 90° (z = 1.0, R = y/2√2) ★" : "Optimal angle is 90° (half-angle θ = 45°)"}
                    </text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   7. S15: MOST ECONOMICAL TRAPEZOIDAL & CIRCULAR SECTIONS (economic_trapezoid_circular)
   ========================================================================= */
export function EconomicTrapezoidCircularWorkbench() {
  const [secType, setSecType] = useState("trapezoid"); // "trapezoid" | "circular"
  const [Q, setQ] = useState(15.0); // m^3/s
  const [n, setN] = useState(0.020);
  const [S0, setS0] = useState(0.001);
  const [pipeYRatio, setPipeYRatio] = useState(0.95); // y/D

  // Most Economical Trapezoidal: half-hexagon (theta = 60 deg, z = 1/sqrt(3) = 0.57735)
  // Top width T = 2 * sloping side = 4y / sqrt(3)
  // Bed width B = 2y / sqrt(3)
  // Area A = sqrt(3) * y^2
  // R = y / 2
  // Q = (1/n) * A * R^(2/3) * S0^(1/2) = (1/n) * sqrt(3)*y^2 * (y/2)^(2/3) * S0^(1/2)
  // y^(8/3) = Q * n * 2^(2/3) / (sqrt(3) * sqrt(S0))
  const zTrap = 1 / Math.sqrt(3);
  const yTrap = Math.pow((Q * n * Math.pow(2, 2 / 3)) / (Math.sqrt(3) * Math.sqrt(S0)), 3 / 8);
  const bTrap = (2 * yTrap) / Math.sqrt(3);
  const tTrap = 2 * bTrap;
  const aTrap = Math.sqrt(3) * yTrap * yTrap;
  const rTrap = yTrap / 2;
  const vTrap = Q / aTrap;

  // Circular Pipe running partially full:
  // theta from y/D: y/D = (1 - cos(theta/2))/2
  // cos(theta/2) = 1 - 2*(y/D)
  const thetaPipe = 2 * Math.acos(Math.max(-1, Math.min(1, 1 - 2 * pipeYRatio)));
  const aPipeRatio = (thetaPipe - Math.sin(thetaPipe)) / (2 * Math.PI);
  const pPipeRatio = thetaPipe / (2 * Math.PI);
  const rPipeRatio = (1 - Math.sin(thetaPipe) / thetaPipe);
  const vPipeRatio = Math.pow(rPipeRatio, 2 / 3);
  const qPipeRatio = aPipeRatio * vPipeRatio;

  return (
    <Box title="Most Economical Trapezoidal & Circular Sections" kind="S15 Design Lab">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Seg
          value={secType}
          options={[
            ["trapezoid", "Trapezoidal Half-Hexagon (θ = 60°, R = y/2)"],
            ["circular", "Circular Conduit (Max Velocity y=0.81D, Max Q y=0.95D)"]
          ]}
          onChange={setSecType}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {secType === "trapezoid" ? (
          <>
            <Kpi v={f2(yTrap) + " m"} l="Optimal Depth y" tone="good" />
            <Kpi v={f2(bTrap) + " m"} l="Bed Width B = 2y/√3" tone="good" />
            <Kpi v={f2(tTrap) + " m"} l="Top Width T = 2B" />
            <Kpi v={f3(rTrap) + " m"} l="Hydraulic Radius R = y/2" tone="good" />
            <Kpi v={f2(vTrap) + " m/s"} l="Mean Velocity V" />
          </>
        ) : (
          <>
            <Kpi v={f2(pipeYRatio * 100) + "%"} l="Depth Ratio y/D" tone="good" />
            <Kpi v={f2(qPipeRatio * 100) + "%"} l="Discharge Q / Qfull" tone={pipeYRatio === 0.95 ? "good" : ""} />
            <Kpi v={f2(vPipeRatio * 100) + "%"} l="Velocity V / Vfull" tone={pipeYRatio === 0.81 ? "good" : ""} />
            <Kpi v={(thetaPipe * 180 / Math.PI).toFixed(1) + "°"} l="Subtended Angle θ" />
            <Kpi v={pipeYRatio >= 0.95 ? "MAX Q ACHIEVED" : pipeYRatio >= 0.81 ? "MAX V ZONE" : "STANDARD"} l="Regime Status" tone="good" />
          </>
        )}
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        {secType === "trapezoid" ? (
          <>
            <SliderRow label="Design Discharge Q" value={Q} min={1.0} max={60.0} step={1.0} unit="m³/s" onChange={setQ} />
            <SliderRow label="Manning's Roughness n" value={n} min={0.012} max={0.040} step={0.001} unit="" onChange={setN} />
            <SliderRow label="Bed Slope S0" value={S0 * 1000} min={0.2} max={5.0} step={0.1} unit="‰" onChange={v => setS0(v / 1000)} />
          </>
        ) : (
          <SliderRow label="Filling Ratio (y / D)" value={pipeYRatio} min={0.05} max={1.0} step={0.01} unit="" onChange={setPipeYRatio} />
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 500 160" style={{ width: "100%", maxHeight: "160px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {secType === "trapezoid" ? (
            <g>
              {/* Half-Hexagon Inscribed Semicircle */}
              <polygon points="120,135 380,135 440,35 60,35" fill="none" stroke="#cbd5e0" strokeWidth="1" />
              <polygon points="170,135 330,135 410,35 90,35" fill="rgba(26,95,122,0.25)" stroke="#1a5f7a" strokeWidth="2.5" />
              {/* Inscribed Semicircle */}
              <path d="M90,35 A100,100 0 0 0 410,35" fill="none" stroke="#c8973a" strokeWidth="2" strokeDasharray="5 3" />
              <circle cx="250" cy="35" r="3" fill="#c8973a" />
              <text x="250" y="24" fill="#0f1f3d" fontSize="11" textAnchor="middle" fontWeight="700">
                Half-Hexagon (Side Slope 60°): Top Width T = 2 × Sloping Side, Inscribed Semicircle Tangent to Bed and Sides!
              </text>
              <text x="250" y="150" fill="#1a5f7a" fontSize="10.5" textAnchor="middle" fontWeight="600">
                Bed Width B = {f2(bTrap)} m | Depth y = {f2(yTrap)} m | Hydraulic Radius R = y/2 = {f3(rTrap)} m
              </text>
            </g>
          ) : (
            <g>
              {/* Circular Conduit Running Partially Full */}
              <circle cx="250" cy="80" r="65" fill="#f8fafc" stroke="#333" strokeWidth="3" />
              {/* Water filling */}
              {(() => {
                const cy = 80 + 65 - pipeYRatio * 130;
                const dy = cy - 80;
                const halfChord = Math.sqrt(Math.max(0, 65 * 65 - dy * dy));
                return (
                  <>
                    <path
                      d={`M${250 - halfChord},${cy} A65,65 0 0 0 ${250 + halfChord},${cy} Z`}
                      fill="rgba(26,95,122,0.4)"
                      stroke="#1a5f7a"
                      strokeWidth="2"
                    />
                    <line x1={250 - halfChord} y1={cy} x2={250 + halfChord} y2={cy} stroke="#1a5f7a" strokeWidth="2" />
                  </>
                );
              })()}
              <text x="250" y="20" fill="#0f1f3d" fontSize="11" textAnchor="middle" fontWeight="700">
                Circular Gravity Sewer: Max Q occurs at y/D = 0.95 (Q = 1.07 Qfull); Max V at y/D = 0.81 (V = 1.14 Vfull)!
              </text>
            </g>
          )}
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   8. S16: SPECIFIC ENERGY & CHANNEL TRANSITIONS (specific_energy_interactive)
   ========================================================================= */
export function SpecificEnergyTransitions() {
  const [Q, setQ] = useState(12.0);
  const [B1, setB1] = useState(3.0);
  const [y1, setY1] = useState(2.2); // subcritical upstream depth
  const [dz, setDz] = useState(0.25); // bed hump
  const [B2, setB2] = useState(2.6); // throat width

  const g = 9.81;
  const q1 = Q / B1;
  const yc1 = Math.pow((q1 * q1) / g, 1 / 3);
  const Emin1 = 1.5 * yc1;

  const V1 = Q / (B1 * y1);
  const E1 = y1 + (V1 * V1) / (2 * g);
  const Fr1 = V1 / Math.sqrt(g * y1);

  // Critical conditions at contracted throat (B2)
  const q2 = Q / B2;
  const yc2 = Math.pow((q2 * q2) / g, 1 / 3);
  const Emin2 = 1.5 * yc2;

  // Max permissible hump without choking upstream
  const dzMax = Math.max(0, E1 - Emin2);
  const isChoked = dz > dzMax;

  // Compute depth over hump y2 (solving y2^3 - (E1 - dz)*y2^2 + q2^2 / 2g = 0)
  const E2 = E1 - dz;
  let y2 = yc2;
  if (!isChoked) {
    let yGuess = Fr1 < 1 ? y1 - dz : y1 + dz;
    for (let iter = 0; iter < 20; iter++) {
      const f = Math.pow(yGuess, 3) - E2 * Math.pow(yGuess, 2) + (q2 * q2) / (2 * g);
      const df = 3 * Math.pow(yGuess, 2) - 2 * E2 * yGuess;
      if (Math.abs(f) < 1e-5) break;
      yGuess = yGuess - f / df;
    }
    y2 = Math.max(0.1, yGuess);
  }

  return (
    <Box title="Specific Energy Curve & Bed Transition Simulator (Hump & Width Contraction)" kind="S16 Interactive Laboratory">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f3(E1) + " m"} l="Upstream Energy E₁" tone="good" />
        <Kpi v={f3(yc1) + " m"} l="Critical Depth yc₁" />
        <Kpi v={f3(dzMax) + " m"} l="Max Hump Δz_max" tone={isChoked ? "warn" : "good"} />
        <Kpi v={f3(y2) + " m"} l="Depth over Hump y₂" tone={isChoked ? "warn" : "good"} />
        <Kpi v={isChoked ? "CHOKED (Backwater!)" : "UN-CHOKED (Subcritical)"} l="Flow State" tone={isChoked ? "warn" : "good"} />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Discharge Q" value={Q} min={2.0} max={30.0} step={1.0} unit="m³/s" onChange={setQ} />
        <SliderRow label="Inflow Depth y₁" value={y1} min={0.6} max={4.0} step={0.1} unit="m" onChange={setY1} />
        <SliderRow label="Step Hump Height Δz" value={dz} min={0.0} max={1.0} step={0.05} unit="m" onChange={setDz} />
        <SliderRow label="Throat Width B₂" value={B2} min={1.5} max={3.0} step={0.1} unit="m" onChange={setB2} />
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 540 180" style={{ width: "100%", maxHeight: "180px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Bed profile with step hump */}
          <polygon points="30,150 180,150 240,120 300,120 360,150 510,150 510,175 30,175" fill="#c9a878" stroke="#8a4b12" strokeWidth="2" />
          {/* Water profile */}
          {(() => {
            const hBed1 = 150;
            const hBedHump = 150 - dz * 60;
            const y1Px = y1 * 35;
            const y2Px = y2 * 35;
            const ws1 = hBed1 - y1Px;
            const ws2 = isChoked ? hBedHump - yc2 * 35 : hBedHump - y2Px;
            return (
              <>
                <polygon
                  points={`30,150 180,150 240,${hBedHump} 300,${hBedHump} 360,150 510,150 510,${ws1} 360,${ws2} 240,${ws2} 180,${ws1} 30,${ws1}`}
                  fill="rgba(26,95,122,0.3)"
                  stroke="#1a5f7a"
                  strokeWidth="2"
                />
                <line x1="30" y1={ws1} x2="180" y2={ws1} stroke="#1a5f7a" strokeWidth="2" />
                <line x1="240" y1={ws2} x2="300" y2={ws2} stroke="#1a5f7a" strokeWidth="2" />
                {/* Surface dip annotation */}
                <text x="270" y={ws2 - 8} fill={isChoked ? "#e53e3e" : "#1a5f7a"} fontSize="10.5" textAnchor="middle" fontWeight="700">
                  {isChoked ? "CHOKED: Critical Depth yc reached!" : "Surface Dip: Δy = -" + f2(y1 - y2) + " m"}
                </text>
              </>
            );
          })()}
          <text x="270" y={150 - dz * 30 + 15} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">Hump Δz = {dz} m</text>
          <text x="100" y="140" fill="#0f1f3d" fontSize="11" fontWeight="600">Upstream Depth y₁ = {y1} m</text>
        </svg>
      </div>
      <p className="note" style={{ fontSize: "0.82rem", margin: "0.4rem 0 0 0", color: "#5a5048" }}>
        <b>Transition Theory:</b> When subcritical flow passes over a raised bed hump &Delta;z, the specific energy decreases (E₂ = E₁ - &Delta;z), causing the water surface to <b>dip</b> (&Delta;y &lt; 0). If &Delta;z &gt; &Delta;z_max = E₁ - E_min, the channel is <b>choked</b>: flow cannot pass at current energy, forcing a backwater rise upstream.
      </p>
    </Box>
  );
}

/* =========================================================================
   9. S17: BÉLANGER HYDRAULIC JUMP & ENERGY LOSS SIMULATOR (belanger_jump_sim)
   ========================================================================= */
export function BelangerJumpWorkbench() {
  const [y1, setY1] = useState(0.4);
  const [V1, setV1] = useState(8.5);

  const g = 9.81;
  const Fr1 = V1 / Math.sqrt(g * y1);
  // Bélanger equation: y2/y1 = 0.5 * (sqrt(1 + 8 Fr1^2) - 1)
  const y2 = (y1 / 2) * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1);
  const V2 = (V1 * y1) / y2;
  const Fr2 = V2 / Math.sqrt(g * y2);

  const E1 = y1 + (V1 * V1) / (2 * g);
  const E2 = y2 + (V2 * V2) / (2 * g);
  const dE = Math.pow(y2 - y1, 3) / (4 * y1 * y2);
  const relLoss = (dE / E1) * 100;
  const hj = y2 - y1;
  const Lj = 6.1 * hj;
  const powerDissipated = (9.81 * (y1 * V1) * dE); // kW per metre width

  return (
    <Box title="Bélanger Equation & Hydraulic Jump Momentum Simulator" kind="S17 & S18 Interactive Lab">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f2(Fr1)} l="Initial Froude Fr₁ (> 1)" tone="good" />
        <Kpi v={f3(y2) + " m"} l="Sequent Depth y₂" tone="good" />
        <Kpi v={f2(hj) + " m"} l="Jump Height hj" />
        <Kpi v={f2(dE) + " m"} l="Head Loss ΔE" tone="good" />
        <Kpi v={f1(relLoss) + "%"} l="Energy Dissipation" tone={relLoss > 50 ? "good" : ""} />
        <Kpi v={f1(powerDissipated) + " kW/m"} l="Dissipated Power" tone="good" />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Initial Depth y₁" value={y1} min={0.15} max={1.2} step={0.05} unit="m" onChange={setY1} />
        <SliderRow label="Initial Velocity V₁" value={V1} min={2.5} max={14.0} step={0.5} unit="m/s" onChange={setV1} />
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 540 180" style={{ width: "100%", maxHeight: "180px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Bed */}
          <line x1="20" y1="150" x2="520" y2="150" stroke="#8a4b12" strokeWidth="4" />
          {/* Supercritical inflow sheet */}
          <polygon points={`20,150 150,150 150,${150 - y1 * 60} 20,${150 - y1 * 60}`} fill="url(#waterGrad)" />
          {/* Jump roller zone */}
          <path
            d={`M150,${150 - y1 * 60} Q220,${150 - y2 * 55} 350,${150 - y2 * 55} L350,150 L150,150 Z`}
            fill="rgba(47,134,168,0.7)"
          />
          {/* Subcritical deep outflow */}
          <polygon points={`350,150 520,150 520,${150 - y2 * 55} 350,${150 - y2 * 55}`} fill="rgba(31,111,143,0.85)" />

          {/* Roller vortices */}
          <circle cx="210" cy={150 - (y1 + y2) * 28} r="14" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="250" cy={150 - (y1 + y2) * 26} r="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="8 4" />
          <circle cx="295" cy={150 - y2 * 45} r="12" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Labels & Dimensions */}
          <text x="75" y={150 - y1 * 60 - 6} fill="#1a5f7a" fontSize="10.5" textAnchor="middle" fontWeight="700">y₁ = {f2(y1)} m (Fr₁ = {f2(Fr1)})</text>
          <text x="430" y={150 - y2 * 55 - 6} fill="#1a5f7a" fontSize="10.5" textAnchor="middle" fontWeight="700">y₂ = {f2(y2)} m (Fr₂ = {f2(Fr2)})</text>
          <text x="250" y="35" fill="#c8973a" fontSize="11" textAnchor="middle" fontWeight="700">
            Turbulent Roller: Jump Length Lj ≈ {f1(Lj)} m | Height hj = {f2(hj)} m
          </text>
          <text x="250" y="55" fill="#e53e3e" fontSize="10.5" textAnchor="middle" fontWeight="600">
            Head Loss ΔE = (y₂ - y₁)³ / (4 y₁ y₂) = {f2(dE)} m ({f1(relLoss)}% Dissipated)
          </text>
        </svg>
      </div>
      <p className="note" style={{ fontSize: "0.82rem", margin: "0.4rem 0 0 0", color: "#5a5048" }}>
        <b>B&eacute;langer Principle:</b> Because of intense internal turbulent eddies and roller dissipation, mechanical energy is NOT conserved across a hydraulic jump (&Delta;E &gt; 0). The conjugate depths y₁ and y₂ are derived by equating the <b>Specific Force (Momentum Function)</b>: F_M1 = F_M2.
      </p>
    </Box>
  );
}

/* =========================================================================
   10. S18: JUMP CLASSIFICATION & STILLING BASIN DESIGN (jump_classification_basin)
   ========================================================================= */
export function JumpClassificationBasin() {
  const [Fr1, setFr1] = useState(6.0); // Froude number
  const [y1, setY1] = useState(0.5); // m

  const y2 = (y1 / 2) * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1);
  const hj = y2 - y1;

  // Jump classification
  let jumpType = "Steady Jump";
  let desc = "Classic well-balanced jump. Best energy dissipation (45-70%). Stable position in stilling basin.";
  let usbrType = "USBR Type III (or Type II if V > 15 m/s)";
  let L_basin = 2.7 * y2;

  if (Fr1 <= 1.7) {
    jumpType = "Undular Jump";
    desc = "Surface undulations / standing waves. Energy loss is negligible (< 5%). No stilling basin required.";
    usbrType = "Plain apron (No blocks needed)";
    L_basin = 4.0 * y2;
  } else if (Fr1 < 2.5) {
    jumpType = "Weak Jump";
    desc = "Small surface rollers develop. Velocity distribution uniform. Low dissipation (5-18%).";
    usbrType = "USBR Type I (Plain concrete apron)";
    L_basin = 5.0 * y2;
  } else if (Fr1 < 4.5) {
    jumpType = "Oscillating Jump";
    desc = "Jet oscillates from bed to surface, sending waves far downstream that damage earthen canal banks. Dissipation 18-45%.";
    usbrType = "USBR Type IV (Wave Suppressors and Deflectors)";
    L_basin = 6.0 * y2;
  } else if (Fr1 <= 9.0) {
    jumpType = "Steady Jump";
    desc = "The true engineering jump. High turbulence confined to roller. Energy dissipation 45-70%. Insensitive to tailwater variations.";
    usbrType = "USBR Type III (Chute blocks, Baffle piers & Dentated sill)";
    L_basin = 2.8 * y2;
  } else {
    jumpType = "Strong / Choppy Jump";
    desc = "Rough, violent jump with rough surface and high waves. Energy dissipation up to 85%. Requires heavy downstream rip-rap.";
    usbrType = "USBR Type II (Heavy chute blocks and dentated sills)";
    L_basin = 3.5 * y2;
  }

  return (
    <Box title="Hydraulic Jump USBR Classification & Stilling Basin Sizing" kind="S18 Interactive Lab">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f2(Fr1)} l="Froude Fr₁" tone="good" />
        <Kpi v={jumpType} l="Jump Regime" tone="good" />
        <Kpi v={usbrType} l="Recommended Basin" />
        <Kpi v={f2(L_basin) + " m"} l="Basin Length L_b" tone="good" />
        <Kpi v={f2(y2) + " m"} l="Tailwater y₂" />
      </div>

      <div style={{ background: "var(--g50, #f8f9fa)", padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--g200, #e2e8f0)", marginBottom: "0.75rem" }}>
        <SliderRow label="Initial Froude Number Fr₁" value={Fr1} min={1.1} max={12.0} step={0.1} unit="" onChange={setFr1} />
        <SliderRow label="Initial Depth y₁" value={y1} min={0.2} max={1.5} step={0.05} unit="m" onChange={setY1} />
        <div style={{ fontSize: "0.85rem", color: "#1a5f7a", fontWeight: 600, marginTop: "0.3rem" }}>
          {desc}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <svg viewBox="0 0 540 160" style={{ width: "100%", maxHeight: "160px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {/* Basin floor */}
          <rect x="30" y="130" width="480" height="20" fill="#a09080" />
          <line x1="30" y1="130" x2="510" y2="130" stroke="#4a5568" strokeWidth="2" />

          {/* Chute blocks at entrance if USBR II or III */}
          {(Fr1 >= 4.5 || (Fr1 >= 2.5 && Fr1 < 4.5)) && (
            <rect x="70" y="112" width="16" height="18" fill="#4a5568" />
          )}

          {/* Baffle piers in middle if USBR III */}
          {Fr1 >= 4.5 && Fr1 <= 9.0 && (
            <>
              <rect x="220" y="105" width="20" height="25" fill="#4a5568" />
              <rect x="260" y="105" width="20" height="25" fill="#4a5568" />
            </>
          )}

          {/* End sill */}
          <polygon points="460,130 475,115 490,130" fill="#4a5568" />

          {/* Water profile */}
          <path
            d={`M30,${130 - y1 * 40} L80,${130 - y1 * 40} Q220,${130 - y2 * 30} 490,${130 - y2 * 30} L490,130 L30,130 Z`}
            fill="rgba(26,95,122,0.3)"
            stroke="#1a5f7a"
            strokeWidth="2"
          />

          <text x="270" y="30" fill="#0f1f3d" fontSize="11" textAnchor="middle" fontWeight="700">
            {usbrType} Layout (Length L_b = {f2(L_basin)} m)
          </text>
          <text x="270" y="48" fill="#4a5568" fontSize="10" textAnchor="middle">
            Chute blocks split incoming jet into streams; Baffle piers dissipate energy by impact; Dentated sill stabilizes tailwater.
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* Export bundle for easy registration */
export const UNIT2_COMPONENTS = {
  ocf_pipe_compare: OcfPipeCompare,
  velocity_dip_sim: VelocityDipVisualizer,
  alpha_beta_integrator: AlphaBetaExplorer,
  manning_cowan_calc: CowanRoughnessExplorer,
  composite_roughness_lab: CompositeRoughnessLab,
  economic_rect_tri: EconomicRectTriWorkbench,
  economic_trapezoid_circular: EconomicTrapezoidCircularWorkbench,
  specific_energy_interactive: SpecificEnergyTransitions,
  belanger_jump_sim: BelangerJumpWorkbench,
  jump_classification_basin: JumpClassificationBasin
};
