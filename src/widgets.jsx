import React, { useState, useMemo } from "react";
import { Plot, path, Legend, C } from "./charts.jsx";
import { ILLOS } from "./illos.jsx";

const f1 = v => (isFinite(v) ? (+v).toFixed(1) : "-");
const f2 = v => (isFinite(v) ? (+v).toFixed(2) : "-");
const f3 = v => (isFinite(v) ? (+v).toFixed(3) : "-");
const f4 = v => (isFinite(v) ? (+v).toFixed(4) : "-");

function Box({ title, kind = "Interactive Workbench", children }) {
  return (
    <div className="wg">
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
      <span style={{ flex: "0 0 160px", color: "#4a5568", fontWeight: 500 }}>{label}:</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ flex: 1, accentColor: "#1a5f7a" }}
      />
      <span style={{ flex: "0 0 75px", textAlign: "right", fontFamily: "monospace", fontWeight: 600 }}>
        {value} {unit}
      </span>
    </div>
  );
}

/* =========================================================================
   1. BOUNDARY LAYER & SKIN FRICTION SIMULATOR (blprofile)
   ========================================================================= */
export function BoundaryLayerWorkbench() {
  const [U, setU] = useState(5.0);
  const [L, setL] = useState(2.0);
  const [nu] = useState(1.0e-6);
  const [regime, setRegime] = useState("auto");

  const rho = 1000;
  const Re_L = (U * L) / nu;
  const Re_cr = 5.0e5;
  const x_tr = Math.min(L, (Re_cr * nu) / U);

  const delta_lam_L = (5.0 * L) / Math.sqrt(Re_L);
  const delta_turb_L = (0.37 * L) / Math.pow(Re_L, 0.2);
  const isTurb = regime === "turbulent" || (regime === "auto" && Re_L > Re_cr);
  const delta_L = isTurb ? delta_turb_L : delta_lam_L;

  const Cd_lam = 1.328 / Math.sqrt(Re_L);
  const Cd_turb = 0.074 / Math.pow(Re_L, 0.2) - (regime === "auto" ? 1740 / Re_L : 0);
  const Cd = Math.max(0.001, isTurb ? Cd_turb : Cd_lam);
  const FD_one_side = 0.5 * rho * U * U * (L * 1.0) * Cd;

  const nPts = 30;
  const ptsLaminar = [];
  const ptsTurbulent = [];
  for (let i = 0; i <= nPts; i++) {
    const eta = i / nPts;
    const u_lam = Math.min(1.0, 1.5 * eta - 0.5 * Math.pow(eta, 3));
    const u_turb = Math.min(1.0, Math.pow(Math.max(0, eta), 1 / 7));
    ptsLaminar.push([u_lam, eta]);
    ptsTurbulent.push([u_turb, eta]);
  }

  return (
    <Box title="Boundary Layer Velocity Profile & Drag Workbench" kind="Unit I Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={Re_L.toExponential(2)} l="Reynolds No. Re_L" tone={Re_L > Re_cr ? "warn" : ""} />
        <Kpi v={f2(x_tr) + " m"} l="Transition x_tr" />
        <Kpi v={f1(delta_L * 1000) + " mm"} l="BL Thickness δ(L)" />
        <Kpi v={f4(Cd)} l="Skin Drag Coeff Cd" />
        <Kpi v={f1(FD_one_side * 2) + " N"} l="Total Drag (2 sides)" tone="good" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Free-stream Velocity U∞" value={U} min={0.5} max={15} step={0.5} unit="m/s" onChange={setU} />
        <SliderRow label="Plate Length L" value={L} min={0.2} max={10} step={0.2} unit="m" onChange={setL} />
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
          <span style={{ fontSize: "0.85rem", color: "#4a5568", fontWeight: 500 }}>Boundary Layer Regime:</span>
          <Seg
            value={regime}
            options={[
              ["auto", "Auto Transition"],
              ["laminar", "Force Laminar"],
              ["turbulent", "Turbulent (Tripped)"]
            ]}
            onChange={setRegime}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Plot w={600} h={240} x={[0, 1.05]} y={[0, 1.05]} xLabel="Non-dimensional Velocity (u / U∞)" yLabel="Height ratio (y / δ)">
          {(sx, sy) => (
            <>
              <path d={path(ptsLaminar, sx, sy)} fill="none" stroke="#2d6a4f" strokeWidth="2.5" />
              <path d={path(ptsTurbulent, sx, sy)} fill="none" stroke="#1a5f7a" strokeWidth="2.5" strokeDasharray={isTurb ? "" : "4 3"} />
              <Legend
                items={[
                  { color: "#2d6a4f", label: "Laminar Profile (Cubic Approximation)" },
                  { color: "#1a5f7a", label: isTurb ? "Active Turbulent (1/7th Power Law)" : "Turbulent (1/7th Power Law ref)" }
                ]}
                x={70}
                y={25}
              />
            </>
          )}
        </Plot>
      </div>
    </Box>
  );
}

/* =========================================================================
   2. MANNINGS UNIFORM FLOW & NORMAL DEPTH SOLVER (normaldepth)
   ========================================================================= */
export function NormalDepthWorkbench() {
  const [shape, setShape] = useState("trapezoidal");
  const [Q, setQ] = useState(12.0);
  const [b, setB] = useState(4.0);
  const [z, setZ] = useState(1.5);
  const [S0, setS0] = useState(0.001);
  const [n, setN] = useState(0.025);

  const { y0, yc, Fr, V, A, P, R, state } = useMemo(() => {
    const g = 9.81;
    let y = 1.0;
    for (let iter = 0; iter < 40; iter++) {
      let area = 0, perim = 0;
      if (shape === "rectangular") { area = b * y; perim = b + 2 * y; }
      else if (shape === "triangular") { area = z * y * y; perim = 2 * y * Math.sqrt(1 + z * z); }
      else { area = (b + z * y) * y; perim = b + 2 * y * Math.sqrt(1 + z * z); }
      const Rh = area / perim;
      const f = (1 / n) * area * Math.pow(Rh, 2 / 3) * Math.sqrt(S0) - Q;
      if (Math.abs(f) < 1e-6) break;
      const dy = 1e-4;
      const yUp = y + dy;
      let aUp = 0, pUp = 0;
      if (shape === "rectangular") { aUp = b * yUp; pUp = b + 2 * yUp; }
      else if (shape === "triangular") { aUp = z * yUp * yUp; pUp = 2 * yUp * Math.sqrt(1 + z * z); }
      else { aUp = (b + z * yUp) * yUp; pUp = b + 2 * yUp * Math.sqrt(1 + z * z); }
      const fUp = (1 / n) * aUp * Math.pow(aUp / pUp, 2 / 3) * Math.sqrt(S0) - Q;
      const df = (fUp - f) / dy;
      y = Math.max(0.05, y - f / df);
    }

    let area = 0, perim = 0, topW = 0;
    if (shape === "rectangular") { area = b * y; perim = b + 2 * y; topW = b; }
    else if (shape === "triangular") { area = z * y * y; perim = 2 * y * Math.sqrt(1 + z * z); topW = 2 * z * y; }
    else { area = (b + z * y) * y; perim = b + 2 * y * Math.sqrt(1 + z * z); topW = b + 2 * z * y; }
    const Rh = area / perim;
    const vel = Q / area;
    const froude = vel / Math.sqrt(g * (area / topW));
    const yc_val = Math.pow((Q * Q) / (g * Math.max(1, b * b)), 1 / 3);

    return {
      y0: y,
      yc: yc_val,
      Fr: froude,
      V: vel,
      A: area,
      P: perim,
      R: Rh,
      state: froude < 1 ? "Subcritical (Mild)" : froude > 1 ? "Supercritical (Steep)" : "Critical"
    };
  }, [shape, Q, b, z, S0, n]);

  return (
    <Box title="Manning's Uniform Flow & Normal Depth Solver" kind="Unit II Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f3(y0) + " m"} l="Normal Depth y0" tone="good" />
        <Kpi v={f3(yc) + " m"} l="Critical Depth yc" />
        <Kpi v={f2(V) + " m/s"} l="Mean Velocity V" />
        <Kpi v={f2(Fr)} l="Froude Number Fr" tone={Fr > 1 ? "warn" : ""} />
        <Kpi v={state} l="Flow Regime" tone={Fr < 1 ? "good" : "warn"} />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Channel Shape:</span>
          <Seg
            value={shape}
            options={[
              ["rectangular", "Rectangular"],
              ["trapezoidal", "Trapezoidal"],
              ["triangular", "Triangular (V)"]
            ]}
            onChange={setShape}
          />
        </div>
        <SliderRow label="Discharge Q" value={Q} min={1} max={50} step={1} unit="m³/s" onChange={setQ} />
        {shape !== "triangular" && <SliderRow label="Bed Width b" value={b} min={1} max={12} step={0.5} unit="m" onChange={setB} />}
        {shape !== "rectangular" && <SliderRow label="Side Slope z (1V:zH)" value={z} min={0.5} max={3.0} step={0.25} unit="" onChange={setZ} />}
        <SliderRow label="Bed Slope S0" value={S0 * 1000} min={0.1} max={10} step={0.1} unit="×10⁻³" onChange={v => setS0(v / 1000)} />
        <SliderRow label="Manning's n" value={n} min={0.012} max={0.045} step={0.001} unit="" onChange={setN} />
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <svg viewBox="0 0 500 140" style={{ width: "100%", maxHeight: "140px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          <polygon
            points={
              shape === "rectangular"
                ? "150,110 150,45 350,45 350,110"
                : shape === "triangular"
                ? "250,110 170,40 330,40"
                : "160,110 110,45 390,45 340,110"
            }
            fill="rgba(26,95,122,0.25)"
            stroke="#1a5f7a"
            strokeWidth="2"
          />
          <polyline
            points={
              shape === "rectangular"
                ? "130,25 150,110 350,110 370,25"
                : shape === "triangular"
                ? "150,20 250,110 350,20"
                : "90,20 160,110 340,110 410,20"
            }
            fill="none"
            stroke="#4a5568"
            strokeWidth="4"
          />
          <text x="250" y="38" fill="#1a5f7a" fontSize="11" textAnchor="middle" fontWeight="600">
            y₀ = {f3(y0)} m | A = {f2(A)} m² | R = {f2(R)} m
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   3. SPECIFIC ENERGY & CHANNEL TRANSITION SIMULATOR (specificenergy)
   ========================================================================= */
export function SpecificEnergyWorkbench() {
  const [Q, setQ] = useState(10.0);
  const [b, setB] = useState(3.0);
  const [y1, setY1] = useState(2.0);
  const [dz, setDz] = useState(0.2);

  const g = 9.81;
  const q = Q / b;
  const yc = Math.pow((q * q) / g, 1 / 3);
  const Emin = 1.5 * yc;

  const V1 = Q / (b * y1);
  const E1 = y1 + (V1 * V1) / (2 * g);
  const dzMax = Math.max(0, E1 - Emin);
  const isChoked = dz > dzMax;

  const E2 = E1 - dz;
  let y2 = yc;
  if (!isChoked) {
    let cur = Math.max(yc, y1 - dz);
    for (let i = 0; i < 20; i++) {
      const f = cur + (q * q) / (2 * g * cur * cur) - E2;
      const df = 1 - (q * q) / (g * Math.pow(cur, 3));
      cur -= f / df;
    }
    y2 = Math.max(yc, cur);
  }

  const eyPts = [];
  for (let y = 0.3; y <= 3.5; y += 0.05) {
    const E = y + (q * q) / (2 * g * y * y);
    if (E < 5.0) eyPts.push([E, y]);
  }

  return (
    <Box title="Specific Energy & Channel Transition Workbench" kind="Unit II Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f3(yc) + " m"} l="Critical Depth yc" />
        <Kpi v={f3(Emin) + " m"} l="Min Specific Energy Emin" />
        <Kpi v={f3(E1) + " m"} l="Upstream Energy E1" />
        <Kpi v={f3(dzMax) + " m"} l="Max Hump Δz_max" tone={isChoked ? "warn" : "good"} />
        <Kpi v={isChoked ? "CHOKED!" : f3(y2) + " m"} l="Depth over Hump y2" tone={isChoked ? "warn" : "good"} />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Discharge Q" value={Q} min={2} max={30} step={1} unit="m³/s" onChange={setQ} />
        <SliderRow label="Channel Width b" value={b} min={1} max={6} step={0.5} unit="m" onChange={setB} />
        <SliderRow label="Upstream Depth y1" value={y1} min={0.5} max={3.5} step={0.1} unit="m" onChange={setY1} />
        <SliderRow label="Hump Step Δz" value={dz} min={0.0} max={1.0} step={0.05} unit="m" onChange={setDz} />
        {isChoked && (
          <div style={{ color: "#c53030", fontSize: "0.8rem", fontWeight: 600, marginTop: "0.35rem" }}>
            ⚠️ Choking Alert: Δz ({dz} m) &gt; Δz_max ({f3(dzMax)} m). Upstream afflux occurs!
          </div>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Plot w={600} h={240} x={[0.5, 4.5]} y={[0, 3.5]} xLabel="Specific Energy E (m)" yLabel="Water Depth y (m)">
          {(sx, sy) => (
            <>
              <path d={path(eyPts, sx, sy)} fill="none" stroke="#1a5f7a" strokeWidth="2.5" />
              <line x1={sx(0.5)} x2={sx(4.5)} y1={sy(yc)} y2={sy(yc)} stroke="#e53e3e" strokeDasharray="3 3" strokeWidth="1.5" />
              <circle cx={sx(E1)} cy={sy(y1)} r="5" fill="#2b6cb0" />
              <text x={sx(E1) + 8} y={sy(y1) - 6} fontSize="10" fill="#2b6cb0" fontWeight="bold">
                State 1 ({f2(E1)}, {f2(y1)})
              </text>
              {!isChoked && (
                <>
                  <circle cx={sx(E2)} cy={sy(y2)} r="5" fill="#2f855a" />
                  <text x={sx(E2) + 8} y={sy(y2) + 12} fontSize="10" fill="#2f855a" fontWeight="bold">
                    Hump ({f2(E2)}, {f2(y2)})
                  </text>
                </>
              )}
              <Legend
                items={[
                  { color: "#1a5f7a", label: "E - y Curve (q = " + f2(q) + " m²/s)" },
                  { color: "#e53e3e", label: "Critical Depth yc = " + f2(yc) + " m" }
                ]}
                x={70}
                y={25}
              />
            </>
          )}
        </Plot>
      </div>
    </Box>
  );
}

/* =========================================================================
   4. HYDRAULIC JUMP & STILLING BASIN SIMULATOR (hydraulicjump)
   ========================================================================= */
export function HydraulicJumpWorkbench() {
  const [y1, setY1] = useState(0.4);
  const [V1, setV1] = useState(8.0);

  const g = 9.81;
  const Fr1 = V1 / Math.sqrt(g * y1);
  const y2 = (y1 / 2) * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1);
  const V2 = (V1 * y1) / y2;

  const E1 = y1 + (V1 * V1) / (2 * g);
  const dE = Math.pow(y2 - y1, 3) / (4 * y1 * y2);
  const efficiency = (dE / E1) * 100;
  const Lj = 6.9 * (y2 - y1);

  let jumpClass = "Undular Jump";
  if (Fr1 >= 1.7 && Fr1 < 2.5) jumpClass = "Weak Jump";
  else if (Fr1 >= 2.5 && Fr1 < 4.5) jumpClass = "Oscillating Jump";
  else if (Fr1 >= 4.5 && Fr1 < 9.0) jumpClass = "Steady Jump (Best Basin)";
  else if (Fr1 >= 9.0) jumpClass = "Strong / Choppy Jump";

  return (
    <Box title="Hydraulic Jump & Energy Dissipation Simulator" kind="Unit II Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f2(Fr1)} l="Initial Froude Fr1" tone="warn" />
        <Kpi v={f3(y2) + " m"} l="Sequent Depth y2" tone="good" />
        <Kpi v={f2(dE) + " m"} l="Head Loss ΔE" />
        <Kpi v={f1(efficiency) + "%"} l="Dissipation Eff. η" tone="good" />
        <Kpi v={f2(Lj) + " m"} l="Jump Length Lj" />
        <Kpi v={jumpClass} l="USBR Jump Type" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Initial Depth y1" value={y1} min={0.1} max={1.5} step={0.05} unit="m" onChange={setY1} />
        <SliderRow label="Initial Velocity V1" value={V1} min={2.0} max={16.0} step={0.5} unit="m/s" onChange={setV1} />
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <svg viewBox="0 0 500 150" style={{ width: "100%", maxHeight: "150px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          <line x1="40" y1="120" x2="460" y2="120" stroke="#4a5568" strokeWidth="4" />
          <polygon
            points="50,120 50,105 180,105 260,50 450,50 450,120"
            fill="rgba(26,95,122,0.3)"
            stroke="#1a5f7a"
            strokeWidth="2"
          />
          <path d="M 180,105 Q 220,40 260,50 Q 230,85 180,105 Z" fill="rgba(226, 232, 240, 0.7)" stroke="#a0aec0" strokeWidth="1" />
          <text x="90" y="95" fill="#1a5f7a" fontSize="11" fontWeight="bold">
            y₁ = {f2(y1)} m (Fr₁ = {f2(Fr1)})
          </text>
          <text x="340" y="42" fill="#1a5f7a" fontSize="11" fontWeight="bold">
            y₂ = {f2(y2)} m (Subcritical)
          </text>
          <text x="220" y="75" fill="#e53e3e" fontSize="10" fontWeight="bold">
            Turbulent Roller (ΔE = {f2(dE)} m)
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   5. IMPACT OF JET & MOVING VANE SIMULATOR (jetimpact)
   ========================================================================= */
export function JetImpactWorkbench() {
  const [d, setD] = useState(40);
  const [V, setV] = useState(25);
  const [u, setU] = useState(10);
  const [theta, setTheta] = useState(165);
  const [vaneType, setVaneType] = useState("series");

  const rho = 1000;
  const a = (Math.PI / 4) * Math.pow(d / 1000, 2);
  const Vr1 = Math.max(0, V - u);
  const rad = (theta * Math.PI) / 180;

  const mdot = vaneType === "series" ? rho * a * V : rho * a * Vr1;
  const Fx = mdot * Vr1 * (1 - Math.cos(rad));
  const Fy = mdot * Vr1 * Math.sin(rad);
  const W = Fx * u;
  const KE_jet = 0.5 * rho * a * Math.pow(V, 3);
  const eff = Math.min(100, Math.max(0, (W / KE_jet) * 100));

  return (
    <Box title="Impact of Jet & Moving Vane Momentum Simulator" kind="Unit III Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f1(Fx) + " N"} l="Dynamic Force Fx" tone="good" />
        <Kpi v={f1(Fy) + " N"} l="Normal Force Fy" />
        <Kpi v={f2(W / 1000) + " kW"} l="Power Output W" tone="good" />
        <Kpi v={f1(eff) + "%"} l="Hydraulic Efficiency" tone={eff > 80 ? "good" : ""} />
        <Kpi v={f1(Vr1) + " m/s"} l="Relative Velocity Vr1" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#4a5568" }}>Vane Mounting:</span>
          <Seg
            value={vaneType}
            options={[
              ["series", "Series of Vanes on Wheel (ṁ = ρaV)"],
              ["single", "Single Moving Vane (ṁ = ρa(V-u))"]
            ]}
            onChange={setVaneType}
          />
        </div>
        <SliderRow label="Jet Nozzle Diameter d" value={d} min={15} max={80} step={5} unit="mm" onChange={setD} />
        <SliderRow label="Absolute Jet Velocity V" value={V} min={10} max={50} step={2} unit="m/s" onChange={setV} />
        <SliderRow label="Vane Tangential Speed u" value={u} min={0} max={30} step={1} unit="m/s" onChange={setU} />
        <SliderRow label="Deflection Angle θ" value={theta} min={60} max={180} step={5} unit="°" onChange={setTheta} />
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <svg viewBox="0 0 500 130" style={{ width: "100%", maxHeight: "130px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          <polygon points="40,60 90,62 90,68 40,70" fill="#718096" />
          <line x1="90" y1="65" x2="240" y2="65" stroke="#3182ce" strokeWidth="8" strokeLinecap="round" />
          <text x="160" y="55" fill="#2b6cb0" fontSize="10" fontWeight="bold">
            V = {V} m/s
          </text>
          <path d="M 270,25 Q 235,65 270,105" fill="none" stroke="#c53030" strokeWidth="8" strokeLinecap="round" />
          <line x1="270" y1="65" x2="320" y2="65" stroke="#2f855a" strokeWidth="3" />
          <text x="300" y="58" fill="#2f855a" fontSize="10" fontWeight="bold">
            u = {u} m/s
          </text>
          <text x="360" y="95" fill="#4a5568" fontSize="10">
            Fx = {f1(Fx)} N | Eff = {f1(eff)}%
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   6. PELTON WHEEL TURBINE DESIGN WORKBENCH (peltondesign)
   ========================================================================= */
export function PeltonWheelWorkbench() {
  const [H, setH] = useState(300);
  const [Q, setQ] = useState(1.5);
  const [N, setN] = useState(600);
  const [phi, setPhi] = useState(0.46);

  const g = 9.81;
  const rho = 1000;
  const Cv = 0.985;
  const V1 = Cv * Math.sqrt(2 * g * H);
  const u = phi * Math.sqrt(2 * g * H);
  const D = (60 * u) / (Math.PI * N);
  const d_jet = Math.sqrt((4 * Q) / (Math.PI * V1));
  const jetRatio = D / d_jet;
  const Z_buckets = Math.round(15 + 0.5 * jetRatio);

  const beta2 = 165;
  const k_bucket = 0.88;
  const rad2 = (beta2 * Math.PI) / 180;
  const Vr1 = Math.max(0, V1 - u);
  const P_mech = (rho * Q * u * (Vr1 * (1 - k_bucket * Math.cos(rad2)))) / 1000;
  const P_hyd = (rho * g * Q * H) / 1000;
  const eta_h = Math.min(96, (P_mech / P_hyd) * 100);

  const effCurve = [];
  for (let p = 0.35; p <= 0.60; p += 0.01) {
    const u_test = p * Math.sqrt(2 * g * H);
    const vr1_test = Math.max(0, V1 - u_test);
    const p_test = (rho * Q * u_test * (vr1_test * (1 - k_bucket * Math.cos(rad2)))) / 1000;
    const e_test = Math.max(0, Math.min(96, (p_test / P_hyd) * 100));
    effCurve.push([p, e_test]);
  }

  return (
    <Box title="Pelton Wheel Impulse Turbine Design Simulator" kind="Unit IV Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f1(V1) + " m/s"} l="Jet Velocity V1" />
        <Kpi v={f2(D) + " m"} l="Pitch Diameter D" tone="good" />
        <Kpi v={f1(d_jet * 1000) + " mm"} l="Jet Diameter d" />
        <Kpi v={f1(jetRatio)} l="Jet Ratio (D/d)" />
        <Kpi v={Z_buckets} l="No. of Buckets Z" />
        <Kpi v={f2(P_mech / 1000) + " MW"} l="Power Output" tone="good" />
        <Kpi v={f1(eta_h) + "%"} l="Hydraulic Eff. ηh" tone="good" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Net Available Head H" value={H} min={80} max={800} step={20} unit="m" onChange={setH} />
        <SliderRow label="Total Flow Discharge Q" value={Q} min={0.2} max={10} step={0.2} unit="m³/s" onChange={setQ} />
        <SliderRow label="Runner Speed N" value={N} min={200} max={1500} step={50} unit="rpm" onChange={setN} />
        <SliderRow label="Speed Ratio φ" value={phi} min={0.4} max={0.52} step={0.01} unit="" onChange={setPhi} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Plot w={600} h={220} x={[0.35, 0.6]} y={[60, 100]} xLabel="Speed Ratio φ" yLabel="Hydraulic Efficiency ηh (%)">
          {(sx, sy) => (
            <>
              <path d={path(effCurve, sx, sy)} fill="none" stroke="#1a5f7a" strokeWidth="2.5" />
              <circle cx={sx(phi)} cy={sy(eta_h)} r="5" fill="#e53e3e" />
              <text x={sx(phi) + 8} y={sy(eta_h) - 6} fontSize="10" fill="#e53e3e" fontWeight="bold">
                Operating φ = {phi} (η = {f1(eta_h)}%)
              </text>
              <Legend
                items={[
                  { color: "#1a5f7a", label: "Efficiency Characteristic (Peak at φ ≈ 0.46)" }
                ]}
                x={70}
                y={25}
              />
            </>
          )}
        </Plot>
      </div>
    </Box>
  );
}

/* =========================================================================
   7. CENTRIFUGAL PUMP OPERATING POINT WORKBENCH (pumpcharacteristics)
   ========================================================================= */
export function CentrifugalPumpWorkbench() {
  const [N, setN] = useState(1450);
  const [Hstat, setHstat] = useState(18.0);
  const [kPipe, setKPipe] = useState(120);

  const H0 = 36 * Math.pow(N / 1450, 2);
  const pumpCurve = [];
  const sysCurve = [];
  let Q_duty = 0;
  let H_duty = 0;

  for (let q = 0; q <= 0.08; q += 0.002) {
    const H_p = Math.max(0, H0 - 1500 * Math.pow(q, 1.8));
    const H_s = Hstat + (kPipe * Math.pow(q * 100, 2)) / 100;
    pumpCurve.push([q * 1000, H_p]);
    sysCurve.push([q * 1000, H_s]);
    if (Math.abs(H_p - H_s) < 0.6 && q > 0.005) {
      Q_duty = q * 1000;
      H_duty = H_p;
    }
  }

  const P_hyd = (1000 * 9.81 * (Q_duty / 1000) * H_duty) / 1000;
  const eta_pump = 0.76;
  const P_shaft = P_hyd / eta_pump;
  const NPSH_A = 6.15;

  return (
    <Box title="Centrifugal Pump Operating Point & System Head Simulator" kind="Unit IV Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f1(Q_duty) + " L/s"} l="Operating Flow Q" tone="good" />
        <Kpi v={f1(H_duty) + " m"} l="Operating Head H" tone="good" />
        <Kpi v={f2(P_shaft) + " kW"} l="Shaft Power Required" />
        <Kpi v={f2(NPSH_A) + " m"} l="Available NPSH_A" tone="good" />
        <Kpi v="Safe (> 3.0 m)" l="Cavitation Risk" tone="good" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Pump Speed N" value={N} min={1000} max={2000} step={50} unit="rpm" onChange={setN} />
        <SliderRow label="Static Lift H_stat" value={Hstat} min={5} max={30} step={1} unit="m" onChange={setHstat} />
        <SliderRow label="Pipe Friction Parameter k" value={kPipe} min={50} max={250} step={10} unit="" onChange={setKPipe} />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <Plot w={600} h={220} x={[0, 75]} y={[0, 45]} xLabel="Discharge Q (Litres/second)" yLabel="Total Head H (m)">
          {(sx, sy) => (
            <>
              <path d={path(pumpCurve, sx, sy)} fill="none" stroke="#1a5f7a" strokeWidth="2.5" />
              <path d={path(sysCurve, sx, sy)} fill="none" stroke="#c53030" strokeWidth="2" />
              {Q_duty > 0 && (
                <>
                  <circle cx={sx(Q_duty)} cy={sy(H_duty)} r="5" fill="#2f855a" />
                  <text x={sx(Q_duty) + 8} y={sy(H_duty) - 8} fontSize="10" fill="#2f855a" fontWeight="bold">
                    Duty Point ({f1(Q_duty)} L/s, {f1(H_duty)} m)
                  </text>
                </>
              )}
              <Legend
                items={[
                  { color: "#1a5f7a", label: "Pump H - Q Curve (N = " + N + " rpm)" },
                  { color: "#c53030", label: "System Head Curve (Hstat + hf)" }
                ]}
                x={70}
                y={25}
              />
            </>
          )}
        </Plot>
      </div>
    </Box>
  );
}

/* =========================================================================
   8. 2D CFD HYDRODYNAMIC MESH & COURANT NUMBER SIMULATOR (cfdmesh)
   ========================================================================= */
export function CFDMeshWorkbench() {
  const [dx, setDx] = useState(0.5);
  const [dt, setDt] = useState(0.04);
  const [h, setH] = useState(1.8);
  const [u, setU] = useState(2.2);

  const g = 9.81;
  const celerity = Math.sqrt(g * h);
  const waveSpeed = u + celerity;
  const CFL = (waveSpeed * dt) / dx;
  const isStable = CFL <= 1.0;
  const dt_max = (1.0 * dx) / waveSpeed;

  return (
    <Box title="2D Hydrodynamic Mesh & Courant (CFL) Stability Simulator" kind="Unit V Simulator">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <Kpi v={f2(celerity) + " m/s"} l="Wave Celerity c = √(gh)" />
        <Kpi v={f2(waveSpeed) + " m/s"} l="Characteristic Speed (u+c)" />
        <Kpi v={f3(CFL)} l="Courant Number CFL" tone={isStable ? "good" : "warn"} />
        <Kpi v={isStable ? "STABLE (≤ 1.0)" : "UNSTABLE (> 1.0)"} l="Stability Status" tone={isStable ? "good" : "warn"} />
        <Kpi v={f3(dt_max) + " s"} l="Max Stable Δt" tone="good" />
      </div>

      <div style={{ background: "#f8f9fa", padding: "0.75rem", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <SliderRow label="Grid Cell Size Δx" value={dx} min={0.1} max={2.0} step={0.1} unit="m" onChange={setDx} />
        <SliderRow label="Time Step Δt" value={dt} min={0.01} max={0.2} step={0.01} unit="s" onChange={setDt} />
        <SliderRow label="Water Depth h" value={h} min={0.5} max={5.0} step={0.1} unit="m" onChange={setH} />
        <SliderRow label="Flow Velocity u" value={u} min={0.5} max={8.0} step={0.5} unit="m/s" onChange={setU} />
      </div>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <svg viewBox="0 0 500 120" style={{ width: "100%", maxHeight: "130px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
          {[60, 100, 140, 180, 220, 260, 300, 340, 380, 420].map(x => (
            <line key={"x" + x} x1={x} y1="20" x2={x} y2="90" stroke="#cbd5e0" strokeWidth="1" />
          ))}
          {[20, 40, 60, 80].map(y => (
            <line key={"y" + y} x1="60" y1={y} x2="420" y2={y} stroke="#cbd5e0" strokeWidth="1" />
          ))}
          <rect x="180" y="40" width="40" height="20" fill={isStable ? "rgba(72, 187, 120, 0.3)" : "rgba(245, 101, 101, 0.4)"} stroke={isStable ? "#38a169" : "#e53e3e"} strokeWidth="2" />
          <line x1="180" y1="50" x2="240" y2="50" stroke="#1a5f7a" strokeWidth="3" />
          <polygon points="240,47 248,50 240,53" fill="#1a5f7a" />
          <text x="250" y="110" fill="#4a5568" fontSize="11" textAnchor="middle" fontWeight="600">
            Cell Δx = {dx} m | Δt = {dt} s | CFL = {f3(CFL)} ({isStable ? "Numerically Stable" : "Risk of Numerical Blowup"})
          </text>
        </svg>
      </div>
    </Box>
  );
}

/* =========================================================================
   EXPORT WIDGETS MAP
   ========================================================================= */
export const WIDGETS = {
  blprofile: BoundaryLayerWorkbench,
  normaldepth: NormalDepthWorkbench,
  specificenergy: SpecificEnergyWorkbench,
  hydraulicjump: HydraulicJumpWorkbench,
  jetimpact: JetImpactWorkbench,
  peltondesign: PeltonWheelWorkbench,
  pumpcharacteristics: CentrifugalPumpWorkbench,
  cfdmesh: CFDMeshWorkbench,
  ...ILLOS
};
