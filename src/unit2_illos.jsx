import React, { useState, useMemo, useRef } from "react";
import { Illo } from "./illos.jsx";

const f1 = v => (isFinite(v) ? (+v).toFixed(1) : "-");
const f2 = v => (isFinite(v) ? (+v).toFixed(2) : "-");
const f3 = v => (isFinite(v) ? (+v).toFixed(3) : "-");

/* Common markers & gradients */
function CommonDefs() {
  return (
    <defs>
      <marker id="u2-arr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="#0f1f3d" />
      </marker>
      <marker id="u2-arr-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="#1f6f8f" />
      </marker>
      <marker id="u2-arr-gold" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="#c8973a" />
      </marker>
      <linearGradient id="u2-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dcecf5" />
        <stop offset="100%" stopColor="#f4f8fb" />
      </linearGradient>
      <linearGradient id="u2-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#48a9c5" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#1a5f7a" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="u2-soil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c29b68" />
        <stop offset="100%" stopColor="#8d6b42" />
      </linearGradient>
      <linearGradient id="u2-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7fa85b" />
        <stop offset="100%" stopColor="#557c35" />
      </linearGradient>
      <linearGradient id="u2-pipe" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#718096" />
        <stop offset="50%" stopColor="#4a5568" />
        <stop offset="100%" stopColor="#2d3748" />
      </linearGradient>
      <linearGradient id="u2-foam" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
        <stop offset="50%" stopColor="#bee3f8" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#48a9c5" stopOpacity="0.85" />
      </linearGradient>
    </defs>
  );
}

/* =========================================================================
   1. S10: PIPE FLOW VS OPEN CHANNEL CUTAWAY COMPARISON
   ========================================================================= */
export function IlloPipeVsChannel() {
  const [mode, setMode] = useState("compare"); // "pipe", "channel", "compare"
  const [activeTab, setActiveTab] = useState("hgl");

  const notes = {
    hgl: {
      title: "Hydraulic Grade Line (HGL) Difference",
      body: "In Pipe Flow, HGL represents the piezometric elevation (z + P/γ) and rises above the crown inside a piezometer tube. In Open Channel Flow, the water surface IS the HGL because surface pressure is atmospheric (gauge P = 0)."
    },
    egl: {
      title: "Energy Grade Line (EGL) & Slopes",
      body: "The EGL sits at z + y + V²/(2g). In uniform open-channel flow, Bed Slope (S₀), Water Surface Slope (Sw), and Friction Energy Slope (Sf) are completely parallel: S₀ = Sw = Sf = S."
    },
    driving: {
      title: "Driving Mechanism: Pressure Gradient vs Gravity",
      body: "Pipe flow is pushed by a longitudinal pressure gradient (ΔP/L) created by pumps or elevated reservoirs. Channel flow is powered directly by the component of fluid weight down the channel slope: W·sin θ."
    }
  };

  return (
    <Illo title="Pipe Flow vs. Open Channel Flow: The Fundamental Cutaway" kind="Interactive Vector Illustration"
          cap="Click the hotspots or tabs below to compare the pressure prisms, piezometer heights, and free-surface physics that govern both conduits.">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        {[["hgl", "1. HGL & Water Surface"], ["egl", "2. EGL & Parallel Slopes"], ["driving", "3. Driving Force Balance"]].map(([k, lbl]) => (
          <button key={k} onClick={() => setActiveTab(k)}
                  style={{
                    padding: "4px 12px", borderRadius: "16px", fontSize: "0.8rem", cursor: "pointer",
                    border: "1px solid " + (activeTab === k ? "#1a5f7a" : "#cbd5e1"),
                    background: activeTab === k ? "#1a5f7a" : "#ffffff",
                    color: activeTab === k ? "#ffffff" : "#334155", fontWeight: 600
                  }}>
            {lbl}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 920 380" style={{ width: "100%", background: "#fbfcfd", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* LEFT PANEL: PRESSURE PIPE FLOW */}
        <g transform="translate(15, 20)">
          <rect x="0" y="0" width="430" height="340" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="20" y="30" fontSize="15" fontWeight="700" fill="#0f1f3d">Pressure Pipe Flow (Full Conduit)</text>
          <text x="20" y="48" fontSize="11" fill="#64748b">Rigid boundary confinement • No free atmospheric surface</text>

          {/* Pipe Conduit */}
          <rect x="40" y="190" width="350" height="70" rx="4" fill="url(#u2-pipe)" stroke="#1a202c" strokeWidth="2" />
          {/* Flow inside pipe */}
          <rect x="42" y="196" width="346" height="58" fill="url(#u2-water)" />

          {/* Flow streamlines */}
          <line x1="60" y1="210" x2="360" y2="210" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          <line x1="60" y1="225" x2="360" y2="225" stroke="#bee3f8" strokeWidth="2.5" strokeDasharray="8 6" className="anim-flow" />
          <line x1="60" y1="240" x2="360" y2="240" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />

          {/* Piezometer tube */}
          <rect x="185" y="70" width="22" height="120" fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <rect x="187" y="105" width="18" height="85" fill="url(#u2-water)" />
          {/* Water meniscus */}
          <ellipse cx="196" cy="105" rx="9" ry="3" fill="#63b3ed" stroke="#2b6cb0" />

          {/* HGL and EGL lines */}
          <line x1="30" y1="100" x2="400" y2="120" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 4" />
          <text x="310" y="112" fontSize="11" fontWeight="700" fill="#dc2626">HGL (z + P/γ)</text>

          <line x1="30" y1="72" x2="400" y2="92" stroke="#2563eb" strokeWidth="2.5" />
          <text x="310" y="82" fontSize="11" fontWeight="700" fill="#2563eb">EGL (HGL + V²/2g)</text>

          {/* Pressure head dimension */}
          <line x1="220" y1="105" x2="220" y2="190" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="228" y="152" fontSize="11" fontWeight="700" fill="#dc2626">Pressure Head P/γ &gt; 0</text>

          {/* Velocity head dimension */}
          <line x1="165" y1="78" x2="165" y2="105" stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="100" y="94" fontSize="10" fontWeight="600" fill="#2563eb">V²/2g</text>

          {/* Labels & Callouts */}
          <rect x="40" y="275" width="350" height="48" rx="6" fill="#edf2f7" />
          <text x="50" y="293" fontSize="11" fontWeight="600" fill="#2d3748">Driving Force: Longitudinal Pressure Drop (P₁ - P₂)</text>
          <text x="50" y="310" fontSize="10.5" fill="#4a5568">Independent of conduit incline; can flow uphill under pressure!</text>
        </g>

        {/* RIGHT PANEL: OPEN CHANNEL FLOW */}
        <g transform="translate(475, 20)">
          <rect x="0" y="0" width="430" height="340" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="20" y="30" fontSize="15" fontWeight="700" fill="#0f1f3d">Open Channel Flow (Free Surface)</text>
          <text x="20" y="48" fontSize="11" fill="#64748b">Atmospheric boundary • Water surface forms the natural HGL</text>

          {/* Sloping Channel Bed & Soil Bank */}
          <path d="M 30,225 L 390,265 L 390,320 L 30,320 Z" fill="url(#u2-soil)" />
          <line x1="30" y1="225" x2="390" y2="265" stroke="#5c3d1e" strokeWidth="4" />

          {/* Flowing Water Body */}
          <path d="M 30,150 L 390,190 L 390,265 L 30,225 Z" fill="url(#u2-water)" />

          {/* Free Water Surface Ripples / HGL */}
          <line x1="28" y1="150" x2="392" y2="190" stroke="#dc2626" strokeWidth="2.5" />
          <text x="270" y="180" fontSize="11" fontWeight="700" fill="#dc2626">WSL ≡ HGL (P_gauge = 0)</text>

          {/* EGL Line */}
          <line x1="28" y1="118" x2="392" y2="158" stroke="#2563eb" strokeWidth="2.5" />
          <text x="280" y="148" fontSize="11" fontWeight="700" fill="#2563eb">EGL (HGL + V²/2g)</text>

          {/* Flow Streamlines with animations */}
          <line x1="50" y1="175" x2="370" y2="215" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          <line x1="50" y1="195" x2="370" y2="235" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />

          {/* Atmospheric pressure arrows pointing onto free surface */}
          {[90, 160, 230, 300].map((xx, i) => (
            <g key={i}>
              <line x1={xx} y1={115 + i * 8} x2={xx} y2={145 + i * 8} stroke="#0f1f3d" strokeWidth="1.8" markerEnd="url(#u2-arr)" />
              <text x={xx - 12} y={110 + i * 8} fontSize="9" fontWeight="700" fill="#0f1f3d">P_atm</text>
            </g>
          ))}

          {/* Depth dimension y */}
          <line x1="130" y1="162" x2="130" y2="238" stroke="#0f1f3d" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="136" y="204" fontSize="11" fontWeight="700" fill="#0f1f3d">Depth y</text>

          {/* Parallel slope indicator */}
          <text x="40" y="258" fontSize="10" fontWeight="700" fill="#ffffff" transform="rotate(6, 40, 258)">
            Bed Slope S₀ = Sw = Sf
          </text>

          {/* Gravity Vector Decomposition */}
          <g transform="translate(230, 220)">
            <circle cx="0" cy="0" r="4" fill="#c8973a" />
            <line x1="0" y1="0" x2="0" y2="38" stroke="#c8973a" strokeWidth="2.5" markerEnd="url(#u2-arr-gold)" />
            <text x="6" y="36" fontSize="10" fontWeight="700" fill="#c8973a">Weight W</text>
            <line x1="0" y1="0" x2="36" y2="5" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
            <text x="24" y="-3" fontSize="10" fontWeight="700" fill="#16a34a">W·sin θ (Gravity Drive)</text>
          </g>

          {/* Bottom Summary Box */}
          <rect x="40" y="275" width="350" height="48" rx="6" fill="#edf2f7" />
          <text x="50" y="293" fontSize="11" fontWeight="600" fill="#2d3748">Driving Force: Component of Weight down slope (W·sin θ)</text>
          <text x="50" y="310" fontSize="10.5" fill="#4a5568">Requires downhill slope (S₀ &gt; 0) to sustain uniform gravity flow.</text>
        </g>
      </svg>

      {/* Interactive Explanation Banner */}
      <div style={{ marginTop: "10px", padding: "10px 14px", background: "#f0fdf4", borderLeft: "4px solid #16a34a", borderRadius: 4 }}>
        <b style={{ color: "#166534", fontSize: "0.95rem" }}>{notes[activeTab].title}:</b>
        <p style={{ margin: "4px 0 0", color: "#14532d", fontSize: "0.88rem", lineHeight: 1.5 }}>
          {notes[activeTab].body}
        </p>
      </div>
    </Illo>
  );
}

/* =========================================================================
   2. S11: 3D VELOCITY DIP & ISOTHERM PROFILE ILLUSTRATION
   ========================================================================= */
export function IlloVelocityDip() {
  const [aspectRatio, setAspectRatio] = useState("narrow"); // "narrow" (b/y < 5) or "wide" (b/y > 10)
  const isNarrow = aspectRatio === "narrow";

  return (
    <Illo title="The Velocity Dip Phenomenon: Secondary Circulation in Open Channels" kind="Vector Simulation"
          cap="In open channels, max velocity does NOT occur at the free surface but dips 0.05y to 0.25y below it due to transverse corner vortices and surface air resistance.">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}>Channel Aspect Ratio:</span>
        <button onClick={() => setAspectRatio("narrow")}
                style={{
                  padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                  background: isNarrow ? "#1a5f7a" : "#f1f5f9", color: isNarrow ? "#fff" : "#334155",
                  border: "1px solid " + (isNarrow ? "#1a5f7a" : "#cbd5e1"), fontWeight: 600
                }}>
          Narrow Flume (B/y ≈ 2 to 3) — Strong Dip
        </button>
        <button onClick={() => setAspectRatio("wide")}
                style={{
                  padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                  background: !isNarrow ? "#1a5f7a" : "#f1f5f9", color: !isNarrow ? "#fff" : "#334155",
                  border: "1px solid " + (!isNarrow ? "#1a5f7a" : "#cbd5e1"), fontWeight: 600
                }}>
          Wide River (B/y &gt; 10) — Dip Vanishes
        </button>
      </div>

      <svg viewBox="0 0 920 360" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* LEFT PANEL: CROSS-SECTION ISOTACHS (CONTOURS OF EQUAL VELOCITY) */}
        <g transform="translate(25, 20)">
          <text x="10" y="24" fontSize="14" fontWeight="700" fill="#0f1f3d">
            Cross-Section Isotachs ({isNarrow ? "Narrow Channel B/y = 2.5" : "Wide Channel B/y = 12"})
          </text>
          <text x="10" y="42" fontSize="11" fill="#64748b">Contour lines of equal velocity u(y, z)</text>

          {/* Channel boundaries */}
          {isNarrow ? (
            /* Narrow cross section */
            <g>
              <rect x="60" y="80" width="340" height="190" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              {/* Channel bed and side walls */}
              <line x1="50" y1="70" x2="60" y2="270" stroke="#78350f" strokeWidth="6" />
              <line x1="57" y1="270" x2="403" y2="270" stroke="#78350f" strokeWidth="6" />
              <line x1="400" y1="270" x2="410" y2="70" stroke="#78350f" strokeWidth="6" />
              {/* Free surface */}
              <line x1="60" y1="80" x2="400" y2="80" stroke="#0284c7" strokeWidth="3" />

              {/* Nested Isotach rings */}
              <ellipse cx="230" cy="125" rx="55" ry="25" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" opacity="0.9" />
              <text x="215" y="129" fontSize="10" fontWeight="700" fill="#854d0e">V_max = 2.2 m/s</text>

              <ellipse cx="230" cy="140" rx="95" ry="48" fill="none" stroke="#38a169" strokeWidth="2" strokeDasharray="4 2" />
              <text x="218" y="98" fontSize="9" fontWeight="600" fill="#276749">2.0 m/s</text>

              <ellipse cx="230" cy="160" rx="135" ry="75" fill="none" stroke="#3182ce" strokeWidth="2" />
              <text x="218" y="222" fontSize="9" fontWeight="600" fill="#2b6cb0">1.6 m/s</text>

              {/* Secondary Transverse Circulation Vortex Loops */}
              <path d="M 120,105 Q 100,160 140,200 Q 180,160 150,115" fill="none" stroke="#e53e3e" strokeWidth="2" strokeDasharray="5 3" className="anim-flow" />
              <text x="95" y="160" fontSize="9" fontWeight="700" fill="#c53030">Circulation</text>

              <path d="M 340,105 Q 360,160 320,200 Q 280,160 310,115" fill="none" stroke="#e53e3e" strokeWidth="2" strokeDasharray="5 3" className="anim-flow" />
              <text x="325" y="160" fontSize="9" fontWeight="700" fill="#c53030">Circulation</text>

              {/* Dip indicator */}
              <line x1="230" y1="80" x2="230" y2="125" stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#u2-arr)" />
              <text x="236" y="105" fontSize="10" fontWeight="700" fill="#dc2626">Dip ~ 0.15 y</text>
            </g>
          ) : (
            /* Wide cross section */
            <g>
              <rect x="20" y="120" width="410" height="150" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              <line x1="10" y1="270" x2="435" y2="270" stroke="#78350f" strokeWidth="6" />
              <line x1="20" y1="120" x2="430" y2="120" stroke="#0284c7" strokeWidth="3" />

              {/* Wide flat isotach bands */}
              <path d="M 60,135 Q 225,130 390,135" fill="none" stroke="#ca8a04" strokeWidth="3" />
              <text x="205" y="132" fontSize="10" fontWeight="700" fill="#854d0e">V_max = 2.4 m/s (at surface)</text>

              <path d="M 50,170 Q 225,165 400,170" fill="none" stroke="#38a169" strokeWidth="2.5" />
              <text x="210" y="165" fontSize="9" fontWeight="600" fill="#276749">2.1 m/s</text>

              <path d="M 40,215 Q 225,210 410,215" fill="none" stroke="#3182ce" strokeWidth="2" />
              <text x="210" y="210" fontSize="9" fontWeight="600" fill="#2b6cb0">1.7 m/s</text>
            </g>
          )}

          <text x="60" y="300" fontSize="11" fill="#4a5568">
            {isNarrow ? "Corner sidewall friction drives transverse secondary cells towards the center." : "In wide channels, sidewall effects are negligible across central 80%."}
          </text>
        </g>

        {/* RIGHT PANEL: VERTICAL VELOCITY PROFILE WITH SAMPLING DEPTHS */}
        <g transform="translate(500, 20)">
          <text x="10" y="24" fontSize="14" fontWeight="700" fill="#0f1f3d">Vertical Velocity Profile & Current Metering</text>
          <text x="10" y="42" fontSize="11" fill="#64748b">IS 1192 standard two-point and one-point depth rules</text>

          {/* Coordinate grid */}
          <line x1="80" y1="70" x2="80" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x="50" y="75" fontSize="11" fontWeight="700" fill="#334155">y (depth)</text>

          <line x1="80" y1="280" x2="380" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x="350" y="300" fontSize="11" fontWeight="700" fill="#334155">Velocity u</text>

          {/* Water Surface and Bed lines */}
          <line x1="80" y1="90" x2="370" y2="90" stroke="#0284c7" strokeWidth="2" strokeDasharray="5 3" />
          <text x="270" y="84" fontSize="10" fontWeight="700" fill="#0284c7">Free Surface (y = d)</text>

          <line x1="80" y1="280" x2="370" y2="280" stroke="#78350f" strokeWidth="3" />
          <text x="270" y="275" fontSize="10" fontWeight="700" fill="#78350f">Bed (y = 0, u = 0)</text>

          {/* Velocity Profile Curve */}
          {isNarrow ? (
            /* Dips below surface */
            <path d="M 80,280 C 220,270 290,160 300,125 C 295,105 285,95 275,90" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          ) : (
            /* Max right at surface */
            <path d="M 80,280 C 220,270 290,160 310,90" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          )}

          {/* V_max point */}
          {isNarrow && (
            <g>
              <circle cx="300" cy="125" r="5" fill="#ca8a04" />
              <text x="312" y="128" fontSize="10" fontWeight="700" fill="#854d0e">V_max (Dipped!)</text>
            </g>
          )}

          {/* Standard Measurement Points */}
          {/* 0.2 d from surface -> y = 280 - (280-90)*0.8 = 280 - 152 = 128 */}
          <circle cx="295" cy="128" r="4" fill="#dc2626" />
          <line x1="80" y1="128" x2="295" y2="128" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
          <text x="306" y="146" fontSize="10" fontWeight="700" fill="#dc2626">v_0.2 (at 0.2 d from top)</text>

          {/* 0.6 d from surface -> y = 280 - (280-90)*0.4 = 280 - 76 = 204 */}
          <circle cx="250" cy="204" r="5" fill="#16a34a" />
          <line x1="80" y1="204" x2="250" y2="204" stroke="#16a34a" strokeWidth="1" strokeDasharray="3 3" />
          <text x="262" y="208" fontSize="10" fontWeight="700" fill="#16a34a">v_0.6 ≈ V_mean (Single-Point)</text>

          {/* 0.8 d from surface -> y = 280 - (280-90)*0.2 = 280 - 38 = 242 */}
          <circle cx="195" cy="242" r="4" fill="#dc2626" />
          <line x1="80" y1="242" x2="195" y2="242" stroke="#dc2626" strokeWidth="1" strokeDasharray="3 3" />
          <text x="205" y="246" fontSize="10" fontWeight="700" fill="#dc2626">v_0.8 (at 0.8 d from top)</text>

          {/* Formulas box */}
          <rect x="80" y="305" width="300" height="32" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
          <text x="90" y="325" fontSize="11" fontWeight="700" fill="#1e40af">
            Two-Point Rule: V_mean = (v_0.2 + v_0.8) / 2
          </text>
        </g>
      </svg>
    </Illo>
  );
}

/* =========================================================================
   3. S12: CHEZY CONTROL VOLUME SHEAR FORCE BALANCE
   ========================================================================= */
export function IlloChezyDerivation() {
  const [theta, setTheta] = useState(8); // Slope angle in degrees for visualization

  return (
    <Illo title="Chezy Equation Derivation: Control Volume Shear Equilibrium" kind="Interactive Free-Body Diagram"
          cap="Uniform flow occurs when gravity component W·sin θ exactly balances the total boundary shear resistance τ₀·P·L along the wetted perimeter.">
      <svg viewBox="0 0 920 360" style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* Sloping channel prism */}
        <g transform="translate(60, 40)">
          {/* Channel Bed with hatching */}
          <line x1="20" y1="230" x2="680" y2="300" stroke="#78350f" strokeWidth="6" />
          <line x1="20" y1="235" x2="680" y2="305" stroke="#cbd5e1" strokeWidth="8" strokeDasharray="3 5" />
          <text x="560" y="325" fontSize="11" fontWeight="700" fill="#78350f">Channel Bed (Slope S₀ = sin θ)</text>

          {/* Fluid Control Volume Body */}
          <path d="M 120,135 L 560,180 L 560,287 L 120,241 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />

          {/* Water Surface */}
          <line x1="50" y1="128" x2="650" y2="189" stroke="#0284c7" strokeWidth="2.5" />
          <text x="350" y="150" fontSize="11" fontWeight="700" fill="#0284c7">Free Water Surface (S_w = S₀)</text>

          {/* Control Volume Boundaries (Section 1 and Section 2) */}
          <line x1="120" y1="110" x2="120" y2="255" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x="90" y="105" fontSize="12" fontWeight="700" fill="#dc2626">Section 1</text>

          <line x1="560" y1="155" x2="560" y2="305" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x="540" y="150" fontSize="12" fontWeight="700" fill="#dc2626">Section 2</text>

          {/* Length L dimension */}
          <line x1="120" y1="80" x2="560" y2="125" stroke="#475569" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="330" y="98" fontSize="12" fontWeight="700" fill="#334155">Reach Length L</text>

          {/* Hydrostatic Pressure Prisms F1 and F2 */}
          {/* F1 acting to right */}
          <polygon points="60,135 120,135 120,241" fill="#fca5a5" opacity="0.6" stroke="#ef4444" />
          <line x1="40" y1="205" x2="115" y2="205" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
          <text x="30" y="195" fontSize="11" fontWeight="700" fill="#dc2626">F₁ = γ·A·ȳ</text>

          {/* F2 acting to left */}
          <polygon points="620,180 560,180 560,287" fill="#fca5a5" opacity="0.6" stroke="#ef4444" />
          <line x1="640" y1="250" x2="565" y2="250" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
          <text x="615" y="240" fontSize="11" fontWeight="700" fill="#dc2626">F₂ = γ·A·ȳ</text>

          {/* Equal depth callout */}
          <text x="280" y="135" fontSize="10" fontWeight="600" fill="#15803d">
            Uniform Flow: y₁ = y₂ ⇒ F₁ = F₂ (Hydrostatic forces cancel exactly!)
          </text>

          {/* Weight Vector at Centroid */}
          <g transform="translate(340, 215)">
            <circle cx="0" cy="0" r="5" fill="#ca8a04" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="#ca8a04" strokeWidth="3" markerEnd="url(#u2-arr-gold)" />
            <text x="8" y="55" fontSize="11" fontWeight="700" fill="#ca8a04">Weight W = γ·A·L</text>

            {/* Resolved component down bed */}
            <line x1="0" y1="0" x2="58" y2="6" stroke="#16a34a" strokeWidth="3" markerEnd="url(#u2-arr)" />
            <text x="45" y="-5" fontSize="11" fontWeight="700" fill="#16a34a">W·sin θ = γ·A·L·S₀</text>
          </g>

          {/* Bed Shear Resistance Force τ₀·P·L acting UP the slope */}
          <line x1="440" y1="285" x2="220" y2="262" stroke="#dc2626" strokeWidth="3.5" markerEnd="url(#u2-arr)" />
          <text x="240" y="255" fontSize="11" fontWeight="700" fill="#dc2626">Shear Resistance = τ₀·P·L</text>
        </g>

        {/* EQUILIBRIUM CARD ON RIGHT */}
        <g transform="translate(710, 40)">
          <rect x="0" y="0" width="190" height="280" rx="8" fill="#f8fafc" stroke="#cbd5e1" />
          <text x="14" y="26" fontSize="13" fontWeight="700" fill="#0f1f3d">Force Equilibrium</text>

          <text x="14" y="52" fontSize="10.5" fill="#475569">Along bed direction (ΣFx = 0):</text>
          <text x="14" y="74" fontSize="11" fontWeight="700" fill="#16a34a">W·sin θ - τ₀·P·L = 0</text>

          <text x="14" y="102" fontSize="10.5" fill="#475569">Substitute W = γ·A·L and sin θ ≈ S₀:</text>
          <text x="14" y="124" fontSize="11" fontWeight="700" fill="#0f1f3d">γ·A·L·S₀ = τ₀·P·L</text>

          <rect x="10" y="140" width="170" height="42" rx="4" fill="#fef3c7" stroke="#f59e0b" />
          <text x="18" y="158" fontSize="10" fontWeight="600" fill="#92400e">Mean Boundary Shear:</text>
          <text x="18" y="174" fontSize="12" fontWeight="800" fill="#b45309">τ₀ = γ · R · S₀</text>

          <text x="14" y="204" fontSize="10" fill="#475569">Where R = A/P (Hydraulic Radius).</text>

          <rect x="10" y="222" width="170" height="46" rx="4" fill="#eff6ff" stroke="#93c5fd" />
          <text x="18" y="238" fontSize="10" fontWeight="600" fill="#1e40af">Chezy Formula:</text>
          <text x="18" y="256" fontSize="12" fontWeight="800" fill="#1d4ed8">V = C √(R · S₀)</text>
        </g>
      </svg>
    </Illo>
  );
}

/* =========================================================================
   4. S13: COWAN METHOD INTERACTIVE RIVER LANDSCAPE
   ========================================================================= */
export function IlloCowanLandscape() {
  const [mat, setMat] = useState(0.020); // Earth
  const [irreg, setIrreg] = useState(0.005); // Minor
  const [crossVar, setCrossVar] = useState(0.005); // Occasional
  const [obstr, setObstr] = useState(0.010); // Appreciable
  const [veg, setVeg] = useState(0.010); // Medium
  const [mBend, setMBend] = useState(1.15); // Severe

  const totalN = (mat + irreg + crossVar + obstr + veg) * mBend;

  return (
    <Illo title="Cowan's Formula: Visualizing Channel Roughness Factors" kind="Interactive River Landscape"
          cap="Manning's n increases dramatically with bed roughness, vegetation, and meandering. Adjust the natural features to see the channel transform in real time.">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
        {/* Sliders */}
        <div style={{ background: "#f8fafc", padding: "12px", borderRadius: 6, border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1f3d", marginBottom: "8px" }}>
            Natural Reach Characteristics:
          </div>

          <label className="f" style={{ display: "block", fontSize: "0.8rem", marginBottom: "6px" }}>
            Base Material (n₀): <b>{mat === 0.020 ? "Earth (0.020)" : mat === 0.028 ? "Gravel (0.028)" : "Cobble/Rock (0.035)"}</b>
            <select value={mat} onChange={e => setMat(+e.target.value)} style={{ width: "100%", padding: "4px" }}>
              <option value={0.020}>Smooth Earth (0.020)</option>
              <option value={0.025}>Firm Soil / Sand (0.025)</option>
              <option value={0.028}>Gravelly Soil (0.028)</option>
              <option value={0.035}>Cobbles / Boulders (0.035)</option>
            </select>
          </label>

          <label className="f" style={{ display: "block", fontSize: "0.8rem", marginBottom: "6px" }}>
            Vegetation Density (n₄): <b>{veg === 0 ? "None" : veg === 0.010 ? "Medium Bushes" : "Dense Willows (0.050)"}</b>
            <input type="range" min="0" max="0.050" step="0.005" value={veg} onChange={e => setVeg(+e.target.value)} />
          </label>

          <label className="f" style={{ display: "block", fontSize: "0.8rem", marginBottom: "6px" }}>
            Meandering Ratio (m₅): <b>{mBend === 1.0 ? "Straight (1.0)" : mBend === 1.15 ? "Appreciable (1.15)" : "Severe Bends (1.30)"}</b>
            <input type="range" min="1.0" max="1.30" step="0.15" value={mBend} onChange={e => setMBend(+e.target.value)} />
          </label>
        </div>

        {/* Calculated KPI display */}
        <div style={{ background: "#eff6ff", padding: "14px", borderRadius: 6, border: "1px solid #bfdbfe", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e40af" }}>Composite Cowan Manning's n:</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1d4ed8", fontFamily: "monospace", margin: "4px 0" }}>
            n = {totalN.toFixed(4)}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#3b82f6" }}>
            Formula: n = (n₀ + n₁ + n₂ + n₃ + n₄) · m₅
          </div>
          <div style={{ marginTop: "8px", fontSize: "0.8rem", color: "#1e3a8a", lineHeight: 1.4 }}>
            {totalN < 0.030 ? "Clean, straight earthen canal. High velocity, low resistance." :
             totalN < 0.050 ? "Natural stream with scattered brush and minor winding. Typical river reach." :
             "Heavily choked natural floodway with dense brush, boulders, and tortuous meanders."}
          </div>
        </div>
      </div>

      {/* DYNAMIC SVG RIVER REACH */}
      <svg viewBox="0 0 920 280" style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* Textured Countryside background */}
        <rect x="0" y="0" width="920" height="280" fill="#e2ecd8" />

        {/* Meandering River Path */}
        {mBend === 1.0 ? (
          /* Straight */
          <path d="M 0,110 L 920,110 L 920,170 L 0,170 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        ) : mBend === 1.15 ? (
          /* Moderate Meander */
          <path d="M 0,100 Q 230,50 460,140 T 920,140 L 920,200 Q 690,200 460,200 T 0,160 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        ) : (
          /* Severe S-curve meanders */
          <path d="M 0,70 C 250,-10 200,240 460,140 C 720,40 680,270 920,180 L 920,250 C 680,330 650,110 460,200 C 230,290 180,60 0,130 Z"
                fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        )}

        {/* Dynamic Vegetation Icons along banks */}
        {veg > 0 && [80, 220, 360, 520, 680, 820].map((xx, i) => (
          <g key={i} transform={`translate(${xx}, ${i % 2 === 0 ? 45 : 210}) scale(${0.7 + (veg * 10)})`}>
            <circle cx="0" cy="0" r="14" fill="#38a169" opacity="0.9" />
            <circle cx="-6" cy="-4" r="10" fill="#48bb78" />
            <circle cx="6" cy="-4" r="11" fill="#2f855a" />
          </g>
        ))}

        {/* Bed Materials: Boulders / Gravel */}
        {mat > 0.025 && [120, 280, 440, 620, 780].map((xx, i) => (
          <g key={i} transform={`translate(${xx}, ${120 + (i % 3) * 15})`}>
            <ellipse cx="0" cy="0" rx={mat > 0.030 ? 12 : 6} ry={mat > 0.030 ? 7 : 4} fill="#78716c" stroke="#44403c" />
          </g>
        ))}

        {/* Animated flow stream lines */}
        <line x1="30" y1="130" x2="890" y2="130" stroke="#bee3f8" strokeWidth="2" strokeDasharray="10 6" className="anim-flow" />

        <text x="30" y="30" fontSize="13" fontWeight="700" fill="#1f2937">
          Natural Reach Visualization: {mat > 0.030 ? "Boulder Bed • " : mat > 0.025 ? "Gravel Bed • " : "Smooth Bed • "}
          {veg > 0.025 ? "Dense Bush Choking • " : veg > 0 ? "Scattered Vegetation • " : "Cleared Banks • "}
          {mBend > 1.2 ? "Severe Tortuosity" : mBend > 1.05 ? "Gentle Meander" : "Straight Cut"}
        </text>
      </svg>
    </Illo>
  );
}

/* =========================================================================
   5. S14 & S15: MOST ECONOMIC HYDRAULIC SECTIONS ARCHITECTURAL CARD
   ========================================================================= */
export function IlloEconomicSections() {
  const [selectedSec, setSelectedSec] = useState("trap");

  const specs = {
    rect: {
      name: "Rectangular Channel",
      rule: "Bed Width B = 2y • Hydraulic Radius R = y/2",
      prop: "A = 2y² • P = 4y • R = y/2",
      semiCircle: "A semi-circle described on water surface with radius r = y touches bottom bed at midpoint.",
      use: "Concrete lined flumes, laboratory flumes, urban drainage aqueducts."
    },
    tri: {
      name: "Triangular Channel",
      rule: "Vertex Semi-angle θ = 45° (Total vertex angle = 90°) • Side slope m = 1",
      prop: "A = y² • P = 2√2 y • R = y / (2√2) ≈ 0.3535 y",
      semiCircle: "Side slopes are at 45° to vertical. Each sloping wall is tangent to a semi-circle of radius y/√2.",
      use: "Roadside drains, small discharge ditches, gullies."
    },
    trap: {
      name: "Trapezoidal Channel (Half-Hexagon)",
      rule: "Side slope m = 1/√3 (60° to horizontal) • Top width T = 2 · Side slope leg",
      prop: "B = 2y/√3 ≈ 1.155y • P = 2√3 y ≈ 3.464y • R = y/2",
      semiCircle: "The bottom bed and both side slopes are all tangent to a semi-circle drawn with center on water surface and radius = y.",
      use: "Large earthen and lined irrigation canals, navigation canals."
    },
    circ: {
      name: "Circular Sewer Conduit",
      rule: "Max Velocity at y = 0.81 D • Max Discharge at y = 0.95 D",
      prop: "For Q_max: θ = 308° (y/D = 0.95) • For V_max: θ = 257.5° (y/D = 0.81)",
      semiCircle: "Full-flowing circular pipes have lower velocity than 81% full pipes because the top arch adds perimeter friction without proportional area!",
      use: "Storm sewers, combined sewers, culverts, drainage outfalls."
    }
  };

  const cur = specs[selectedSec];

  return (
    <Illo title="Architectural Atlas: The Most Economical Hydraulic Cross-Sections" kind="Geometric Blueprint"
          cap="A section is economically optimal when it delivers maximum discharge Q for a given cross-sectional area A (minimum wetted perimeter P, minimizing excavation and lining costs).">
      {/* Tab Selector */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
        {[["trap", "1. Trapezoidal (Half-Hexagon)"], ["rect", "2. Rectangular (B = 2y)"], ["tri", "3. Triangular (90° V-Notch)"], ["circ", "4. Circular Sewer (0.81D / 0.95D)"]].map(([k, lbl]) => (
          <button key={k} onClick={() => setSelectedSec(k)}
                  style={{
                    padding: "6px 14px", borderRadius: "16px", fontSize: "0.82rem", cursor: "pointer",
                    border: "1px solid " + (selectedSec === k ? "#1a5f7a" : "#cbd5e1"),
                    background: selectedSec === k ? "#1a5f7a" : "#ffffff",
                    color: selectedSec === k ? "#ffffff" : "#334155", fontWeight: 700
                  }}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "14px", alignItems: "center" }}>
        {/* SVG DRAWING PANEL */}
        <svg viewBox="0 0 500 320" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <CommonDefs />

          {selectedSec === "trap" && (
            <g transform="translate(250, 160)">
              {/* Half-Hexagon Trapezoid */}
              <polygon points="-160,-80 160,-80 80,60 -80,60" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              {/* Ground & Bed */}
              <line x1="-190" y1="-80" x2="-160" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="-160" y1="-80" x2="-80" y2="60" stroke="#78350f" strokeWidth="4" />
              <line x1="-80" y1="60" x2="80" y2="60" stroke="#78350f" strokeWidth="4" />
              <line x1="80" y1="60" x2="160" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="160" y1="-80" x2="190" y2="-80" stroke="#78350f" strokeWidth="4" />

              {/* Water Surface Line */}
              <line x1="-160" y1="-80" x2="160" y2="-80" stroke="#0284c7" strokeWidth="3" />

              {/* Inscribed Semi-circle with radius y */}
              <path d="M -140,-80 A 140,140 0 0,0 140,-80 Z" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
              <circle cx="0" cy="-80" r="4" fill="#dc2626" />
              <line x1="0" y1="-80" x2="0" y2="60" stroke="#dc2626" strokeWidth="1.8" markerEnd="url(#u2-arr)" />
              <text x="6" y="-5" fontSize="12" fontWeight="700" fill="#dc2626">Radius r = y</text>

              {/* 60 degree angle callout */}
              <path d="M 120,60 A 40,40 0 0,0 100,20" fill="none" stroke="#0f1f3d" strokeWidth="1.5" />
              <text x="110" y="45" fontSize="11" fontWeight="700" fill="#0f1f3d">60°</text>

              {/* Bed Width B = 2y/√3 */}
              <line x1="-80" y1="80" x2="80" y2="80" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
              <text x="-45" y="96" fontSize="11" fontWeight="700" fill="#0f1f3d">B = 1.155 y</text>

              {/* Top Width T = 4y/√3 */}
              <line x1="-160" y1="-105" x2="160" y2="-105" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
              <text x="-35" y="-112" fontSize="11" fontWeight="700" fill="#0f1f3d">T = 2.309 y</text>
            </g>
          )}

          {selectedSec === "rect" && (
            <g transform="translate(250, 160)">
              {/* Rectangle: B = 2y */}
              <rect x="-140" y="-70" width="280" height="140" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              {/* Side walls and bed */}
              <line x1="-140" y1="-80" x2="-140" y2="70" stroke="#78350f" strokeWidth="4" />
              <line x1="-140" y1="70" x2="140" y2="70" stroke="#78350f" strokeWidth="4" />
              <line x1="140" y1="70" x2="140" y2="-80" stroke="#78350f" strokeWidth="4" />

              {/* Water surface */}
              <line x1="-140" y1="-70" x2="140" y2="-70" stroke="#0284c7" strokeWidth="3" />

              {/* Inscribed Semi-Circle */}
              <path d="M -140,-70 A 140,140 0 0,0 140,-70 Z" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
              <circle cx="0" cy="-70" r="4" fill="#dc2626" />
              <text x="10" y="0" fontSize="12" fontWeight="700" fill="#dc2626">Radius r = y</text>

              {/* B = 2y dimension */}
              <line x1="-140" y1="92" x2="140" y2="92" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
              <text x="-30" y="108" fontSize="12" fontWeight="700" fill="#0f1f3d">B = 2 y</text>

              {/* Depth y */}
              <line x1="165" y1="-70" x2="165" y2="70" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
              <text x="175" y="5" fontSize="12" fontWeight="700" fill="#0f1f3d">Depth y</text>
            </g>
          )}

          {selectedSec === "tri" && (
            <g transform="translate(250, 150)">
              {/* 90 degree V-notch triangle */}
              <polygon points="-120,-70 120,-70 0,50" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              <line x1="-135" y1="-85" x2="0" y2="50" stroke="#78350f" strokeWidth="4" />
              <line x1="0" y1="50" x2="135" y2="-85" stroke="#78350f" strokeWidth="4" />

              {/* Water surface */}
              <line x1="-120" y1="-70" x2="120" y2="-70" stroke="#0284c7" strokeWidth="3" />

              {/* Vertex angle 90 degrees */}
              <rect x="-10" y="25" width="20" height="20" fill="none" stroke="#dc2626" strokeWidth="1.5" transform="rotate(45, 0, 35)" />
              <text x="-25" y="80" fontSize="12" fontWeight="700" fill="#dc2626">Vertex = 90° (m = 1)</text>

              {/* Side angle 45 */}
              <text x="-70" y="-10" fontSize="11" fontWeight="700" fill="#0f1f3d">θ = 45°</text>
              <text x="45" y="-10" fontSize="11" fontWeight="700" fill="#0f1f3d">θ = 45°</text>
            </g>
          )}

          {selectedSec === "circ" && (
            <g transform="translate(250, 160)">
              {/* Circular Sewer Pipe Outline */}
              <circle cx="0" cy="0" r="110" fill="#f1f5f9" stroke="#334155" strokeWidth="5" />

              {/* Water Level for Q_max: y = 0.95 D */}
              <path d="M -50,-98 A 110,110 0 1,0 50,-98 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              <line x1="-50" y1="-98" x2="50" y2="-98" stroke="#16a34a" strokeWidth="2.5" />
              <text x="60" y="-94" fontSize="10" fontWeight="700" fill="#16a34a">y = 0.95 D (Q_max)</text>

              {/* Line for V_max: y = 0.81 D */}
              <line x1="-92" y1="-68" x2="92" y2="-68" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
              <text x="98" y="-64" fontSize="10" fontWeight="700" fill="#dc2626">y = 0.81 D (V_max)</text>

              {/* Diameter D */}
              <line x1="0" y1="-110" x2="0" y2="110" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="-25" y="5" fontSize="11" fontWeight="700" fill="#334155">Dia D</text>
            </g>
          )}
        </svg>

        {/* SPECIFICATION CARD */}
        <div style={{ background: "#ffffff", padding: "16px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <h4 style={{ margin: "0 0 6px", color: "#0f1f3d", fontSize: "1.05rem" }}>{cur.name}</h4>
          <div style={{ padding: "6px 10px", background: "#fef3c7", borderRadius: 4, color: "#92400e", fontSize: "0.82rem", fontWeight: 700, marginBottom: "10px" }}>
            ⭐ {cur.rule}
          </div>

          <div style={{ fontSize: "0.85rem", color: "#334155", marginBottom: "8px" }}>
            <b>Geometric Formulas:</b>
            <div style={{ fontFamily: "monospace", background: "#f1f5f9", padding: "6px 8px", borderRadius: 4, marginTop: "4px", fontSize: "0.82rem" }}>
              {cur.prop}
            </div>
          </div>

          <div style={{ fontSize: "0.83rem", color: "#475569", marginBottom: "8px", lineHeight: 1.45 }}>
            <b>Semi-Circle Theorem:</b> {cur.semiCircle}
          </div>

          <div style={{ fontSize: "0.82rem", color: "#166534", background: "#f0fdf4", padding: "6px 8px", borderRadius: 4, borderLeft: "3px solid #16a34a" }}>
            <b>Field Applications:</b> {cur.use}
          </div>
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   6. S16: SPECIFIC ENERGY E-Y DIAGRAM & CRITICAL FLOW LAB
   ========================================================================= */
export function IlloSpecificEnergyCurve() {
  const [q, setQ] = useState(2.5); // discharge per unit width m^2/s
  const [targetY, setTargetY] = useState(1.4);

  const g = 9.81;
  const yc = Math.cbrt((q * q) / g);
  const Ec = 1.5 * yc;

  // Compute E for current targetY
  const currentE = targetY + (q * q) / (2 * g * targetY * targetY);
  const currentFr = (q / targetY) / Math.sqrt(g * targetY);

  // Generate curve coordinates
  const W = 460, H = 300;
  const maxE = 4.5, maxY = 3.5;
  const sx = e => (e / maxE) * (W - 80) + 60;
  const sy = y => H - 40 - (y / maxY) * (H - 60);

  const points = [];
  for (let y = 0.25; y <= 3.4; y += 0.05) {
    const E = y + (q * q) / (2 * g * y * y);
    if (E <= maxE) {
      points.push(`${sx(E)},${sy(y)}`);
    }
  }

  return (
    <Illo title="The Specific Energy (E-y) Curve & Critical Flow Regime" kind="Interactive Dynamic Curve"
          cap="Specific Energy E = y + V²/(2g). For any energy E > Ec, there exist two alternate depths: one supercritical (shooting) and one subcritical (tranquil). At minimum energy Ec, flow is critical (Fr = 1).">
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", alignItems: "center" }}>
        {/* SVG Plot */}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <CommonDefs />

          {/* Grid lines */}
          <line x1="60" y1={H - 40} x2={W - 20} y2={H - 40} stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x={W - 40} y={H - 18} fontSize="11" fontWeight="700" fill="#334155">Energy E (m)</text>

          <line x1="60" y1={H - 40} x2="60" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x="20" y="30" fontSize="11" fontWeight="700" fill="#334155">Depth y (m)</text>

          {/* 45 degree asymptote (E = y) */}
          <line x1={sx(0)} y1={sy(0)} x2={sx(maxY)} y2={sy(maxY)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x={sx(2.8) - 10} y={sy(2.8) - 10} fontSize="10" fill="#64748b">E = y (Potential Asymptote)</text>

          {/* E-y Curve */}
          <polyline points={points.join(" ")} fill="none" stroke="#2563eb" strokeWidth="3" />

          {/* Critical Point (Ec, yc) */}
          <circle cx={sx(Ec)} cy={sy(yc)} r="6" fill="#dc2626" />
          <line x1={sx(Ec)} y1={sy(yc)} x2={sx(Ec)} y2={H - 40} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="60" y1={sy(yc)} x2={sx(Ec)} y2={sy(yc)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={sx(Ec) - 20} y={H - 24} fontSize="10" fontWeight="700" fill="#dc2626">Ec = {f2(Ec)}m</text>
          <text x="15" y={sy(yc) + 4} fontSize="10" fontWeight="700" fill="#dc2626">yc={f2(yc)}</text>

          {/* Current Probed Point */}
          <circle cx={sx(currentE)} cy={sy(targetY)} r="7" fill={currentFr > 1 ? "#ea580c" : "#16a34a"} stroke="#ffffff" strokeWidth="2" />
          <line x1="60" y1={sy(targetY)} x2={sx(currentE)} y2={sy(targetY)} stroke="#64748b" strokeDasharray="2 2" />
          <line x1={sx(currentE)} y1={sy(targetY)} x2={sx(currentE)} y2={H - 40} stroke="#64748b" strokeDasharray="2 2" />

          {/* Flow Regime Shading Labels */}
          <rect x="260" y="45" width="160" height="45" rx="4" fill="#f0fdf4" stroke="#86efac" />
          <text x="270" y="62" fontSize="10" fontWeight="700" fill="#166534">Subcritical Regime (Tranquil)</text>
          <text x="270" y="78" fontSize="9.5" fill="#15803d">y &gt; yc • Fr &lt; 1 • Governed from downstream</text>

          <rect x="260" y="195" width="160" height="45" rx="4" fill="#fff7ed" stroke="#fdba74" />
          <text x="270" y="212" fontSize="10" fontWeight="700" fill="#9a3412">Supercritical Regime (Rapid)</text>
          <text x="270" y="228" fontSize="9.5" fill="#c2410c">y &lt; yc • Fr &gt; 1 • Governed from upstream</text>
        </svg>

        {/* Interactive Controls & KPIs */}
        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <label className="f" style={{ display: "block", fontSize: "0.85rem", marginBottom: "8px" }}>
            Discharge intensity q: <b>{q} m²/(s·m)</b>
            <input type="range" min="1.0" max="5.0" step="0.25" value={q} onChange={e => setQ(+e.target.value)} />
          </label>

          <label className="f" style={{ display: "block", fontSize: "0.85rem", marginBottom: "12px" }}>
            Probe Depth y: <b>{targetY.toFixed(2)} m</b>
            <input type="range" min="0.3" max="3.0" step="0.05" value={targetY} onChange={e => setTargetY(+e.target.value)} />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
            <div style={{ background: "#ffffff", padding: "8px", borderRadius: 4, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Critical Depth yc</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#dc2626" }}>{f2(yc)} m</div>
            </div>
            <div style={{ background: "#ffffff", padding: "8px", borderRadius: 4, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Min Specific Energy Ec</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#dc2626" }}>{f2(Ec)} m</div>
            </div>
          </div>

          <div style={{
            padding: "10px", borderRadius: 6,
            background: currentFr > 1.05 ? "#fff7ed" : currentFr < 0.95 ? "#f0fdf4" : "#fef3c7",
            border: "1px solid " + (currentFr > 1.05 ? "#fdba74" : currentFr < 0.95 ? "#86efac" : "#fcd34d")
          }}>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: currentFr > 1.05 ? "#9a3412" : currentFr < 0.95 ? "#166534" : "#92400e" }}>
              Froude Number Fr = {f2(currentFr)} ({currentFr > 1.05 ? "Supercritical" : currentFr < 0.95 ? "Subcritical" : "Critical Flow!"})
            </div>
            <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "3px" }}>
              Velocity head V²/(2g) = {f3((q * q) / (2 * g * targetY * targetY))} m • Pressure head y = {f2(targetY)} m
            </div>
          </div>
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   7. S17: CHANNEL TRANSITIONS (BED HUMPS & WIDTH CONSTRICTIONS)
   ========================================================================= */
export function IlloChannelTransitions() {
  const [transitionType, setTransitionType] = useState("hump"); // "hump" or "width"
  const [initialRegime, setInitialRegime] = useState("sub"); // "sub" or "super"
  const [deltaVal, setDeltaVal] = useState(0.25); // deltaZ or deltaB

  const isHump = transitionType === "hump";
  const isSub = initialRegime === "sub";

  return (
    <Illo title="Channel Transitions: Flow Response over Humps & Width Contractions" kind="Physical Flume Simulation"
          cap="Subcritical flow dips over a bed hump and contracts through a width constriction. In contrast, supercritical flow heaves upwards! If Δz exceeds Δz_max, the flow chokes.">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => setTransitionType("hump")}
                  style={{
                    padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                    background: isHump ? "#1a5f7a" : "#f1f5f9", color: isHump ? "#fff" : "#334155",
                    border: "1px solid " + (isHump ? "#1a5f7a" : "#cbd5e1"), fontWeight: 700
                  }}>
            Channel Bed Hump (Δz)
          </button>
          <button onClick={() => setTransitionType("width")}
                  style={{
                    padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                    background: !isHump ? "#1a5f7a" : "#f1f5f9", color: !isHump ? "#fff" : "#334155",
                    border: "1px solid " + (!isHump ? "#1a5f7a" : "#cbd5e1"), fontWeight: 700
                  }}>
            Width Contraction (Flume Throat B₂)
          </button>
        </div>

        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => setInitialRegime("sub")}
                  style={{
                    padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                    background: isSub ? "#16a34a" : "#f1f5f9", color: isSub ? "#fff" : "#334155",
                    border: "1px solid " + (isSub ? "#16a34a" : "#cbd5e1"), fontWeight: 700
                  }}>
            Subcritical Inflow (Fr₁ &lt; 1)
          </button>
          <button onClick={() => setInitialRegime("super")}
                  style={{
                    padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer",
                    background: !isSub ? "#ea580c" : "#f1f5f9", color: !isSub ? "#fff" : "#334155",
                    border: "1px solid " + (!isSub ? "#ea580c" : "#cbd5e1"), fontWeight: 700
                  }}>
            Supercritical Inflow (Fr₁ &gt; 1)
          </button>
        </div>
      </div>

      <svg viewBox="0 0 920 300" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {isHump ? (
          /* LONGITUDINAL SECTION WITH BED HUMP */
          <g transform="translate(60, 30)">
            <text x="20" y="20" fontSize="14" fontWeight="700" fill="#0f1f3d">
              Longitudinal Section: {isSub ? "Subcritical Flow DIPS over Hump" : "Supercritical Flow HEAVES over Hump"}
            </text>

            {/* Flat channel bed with hump in middle */}
            <path d="M 0,220 L 300,220 Q 400,160 500,220 L 800,220 L 800,260 L 0,260 Z" fill="url(#u2-soil)" stroke="#78350f" strokeWidth="3" />

            {/* Hump annotation */}
            <line x1="400" y1="220" x2="400" y2="175" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="408" y="202" fontSize="11" fontWeight="700" fill="#dc2626">Hump Δz</text>

            {/* Water Surface profile */}
            {isSub ? (
              /* Subcritical dips */
              <path d="M 0,90 Q 250,90 400,125 Q 550,90 800,90 L 800,220 L 500,220 Q 400,160 300,220 L 0,220 Z"
                    fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
            ) : (
              /* Supercritical heaves */
              <path d="M 0,160 Q 250,160 400,105 Q 550,160 800,160 L 800,220 L 500,220 Q 400,160 300,220 L 0,220 Z"
                    fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
            )}

            {/* Surface Line & Dips */}
            {isSub ? (
              <g>
                <line x1="0" y1="90" x2="800" y2="90" stroke="#94a3b8" strokeDasharray="3 3" />
                <line x1="400" y1="90" x2="400" y2="125" stroke="#dc2626" strokeWidth="2" markerEnd="url(#u2-arr)" />
                <text x="410" y="112" fontSize="11" fontWeight="700" fill="#dc2626">Surface Dip Δy</text>
                <text x="60" y="75" fontSize="11" fontWeight="700" fill="#16a34a">Approach Depth y₁ (Fr₁ &lt; 1)</text>
                <text x="350" y="145" fontSize="11" fontWeight="700" fill="#1d4ed8">Throat Depth y₂ &lt; y₁</text>
              </g>
            ) : (
              <g>
                <line x1="0" y1="160" x2="800" y2="160" stroke="#94a3b8" strokeDasharray="3 3" />
                <line x1="400" y1="160" x2="400" y2="105" stroke="#ea580c" strokeWidth="2" markerEnd="url(#u2-arr)" />
                <text x="410" y="132" fontSize="11" fontWeight="700" fill="#ea580c">Surface Rise Δy</text>
                <text x="60" y="185" fontSize="11" fontWeight="700" fill="#ea580c">Shooting Inflow y₁ (Fr₁ &gt; 1)</text>
                <text x="350" y="95" fontSize="11" fontWeight="700" fill="#c2410c">Heaved Throat y₂ &gt; y₁</text>
              </g>
            )}

            {/* Animated Flow Arrows */}
            <line x1="80" y1={isSub ? 140 : 190} x2="720" y2={isSub ? 140 : 190} stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          </g>
        ) : (
          /* PLAN VIEW OF WIDTH CONTRACTION */
          <g transform="translate(60, 30)">
            <text x="20" y="20" fontSize="14" fontWeight="700" fill="#0f1f3d">
              Plan View: Venturi Flume Width Constriction (B₁ → B₂ → B₁)
            </text>

            {/* Channel Bank Contraction */}
            <path d="M 0,40 L 250,40 L 350,90 L 450,90 L 550,40 L 800,40 L 800,260 L 550,260 L 450,210 L 350,210 L 250,260 L 0,260 Z"
                  fill="#e2e8f0" stroke="#475569" strokeWidth="3" />

            {/* Water flowing between banks */}
            <path d="M 0,40 L 250,40 L 350,90 L 450,90 L 550,40 L 800,40 L 800,260 L 550,260 L 450,210 L 350,210 L 250,260 L 0,260 Z"
                  fill="url(#u2-water)" />

            {/* Throat Width B2 */}
            <line x1="400" y1="90" x2="400" y2="210" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="410" y="155" fontSize="11" fontWeight="700" fill="#dc2626">Throat B₂ (Constricted)</text>

            {/* Normal Width B1 */}
            <line x1="120" y1="40" x2="120" y2="260" stroke="#0f1f3d" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="130" y="155" fontSize="11" fontWeight="700" fill="#0f1f3d">Inlet Width B₁</text>

            {/* Flow Streamlines accelerating into throat */}
            <line x1="50" y1="120" x2="750" y2="120" stroke="#bee3f8" strokeWidth="2" strokeDasharray="6 4" className="anim-flow" />
            <line x1="50" y1="150" x2="750" y2="150" stroke="#bee3f8" strokeWidth="2.5" strokeDasharray="6 4" className="anim-flow" />
            <line x1="50" y1="180" x2="750" y2="180" stroke="#bee3f8" strokeWidth="2" strokeDasharray="6 4" className="anim-flow" />
          </g>
        )}
      </svg>
    </Illo>
  );
}

/* =========================================================================
   8. S18: DRAMATIC HYDRAULIC JUMP ROLLER & STILLING BASIN ANATOMY
   ========================================================================= */
export function IlloHydraulicJumpAnatomy() {
  const [froude, setFroude] = useState(4.5); // Fr1

  const y1 = 0.5; // initial depth in m
  const y2 = (y1 / 2) * (Math.sqrt(1 + 8 * froude * froude) - 1); // Belanger formula
  const el = Math.pow(y2 - y1, 3) / (4 * y1 * y2);
  const efficiency = ((y1 + (froude * froude * y1) / 2 - (y2 + (froude * froude * y1 * y1) / (2 * y2 * y2))) / (y1 + (froude * froude * y1) / 2)) * 100;

  return (
    <Illo title="Anatomy of a Hydraulic Jump: Aerated Roller & Energy Dissipation" kind="Hydrodynamic Simulation"
          cap="When high-velocity shooting water (Fr₁ > 1) decelerates to tranquil subcritical flow (Fr₂ < 1), an intense standing shockwave forms with violent roller vortices, air entrainment, and high energy dissipation.">
      {/* Interactive Controls */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap", background: "#f8fafc", padding: "10px 14px", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <div style={{ flex: "1 1 280px" }}>
          <label className="f" style={{ display: "block", fontSize: "0.85rem" }}>
            Incoming Froude Number Fr₁: <b style={{ color: "#ea580c" }}>{froude.toFixed(1)}</b>
            <input type="range" min="1.5" max="9.0" step="0.5" value={froude} onChange={e => setFroude(+e.target.value)} />
          </label>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ background: "#ffffff", padding: "4px 10px", borderRadius: 4, border: "1px solid #cbd5e1" }}>
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Sequent Depth y₂:</span>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#1d4ed8" }}>{f2(y2)} m ({f1(y2 / y1)} × y₁)</div>
          </div>

          <div style={{ background: "#ffffff", padding: "4px 10px", borderRadius: 4, border: "1px solid #cbd5e1" }}>
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Energy Head Loss ΔE:</span>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#dc2626" }}>{f2(el)} m</div>
          </div>

          <div style={{ background: "#ffffff", padding: "4px 10px", borderRadius: 4, border: "1px solid #cbd5e1" }}>
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Jump Classification:</span>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400e" }}>
              {froude < 2.5 ? "Weak Jump" : froude < 4.5 ? "Oscillating Jump" : froude < 9.0 ? "Steady Jump (Ideal)" : "Strong Choppy Jump"}
            </div>
          </div>
        </div>
      </div>

      {/* SVG JUMP ILLUSTRATION */}
      <svg viewBox="0 0 920 340" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* Concrete Channel Bed */}
        <rect x="40" y="270" width="840" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <line x1="40" y1="270" x2="880" y2="270" stroke="#334155" strokeWidth="4" />
        <text x="750" y="295" fontSize="11" fontWeight="700" fill="#ffffff">Concrete Apron</text>

        {/* Water Body Shape */}
        {/* Rapid incoming supercritical sheet -> roller expansion -> high subcritical tailwater */}
        <path d="M 40,240 L 220,240 C 320,240 360,110 540,110 L 880,110 L 880,270 L 40,270 Z" fill="url(#u2-water)" />

        {/* Aerated White-Foam Surface Roller */}
        <path d="M 230,238 C 300,160 380,95 530,108 C 450,130 380,190 230,238 Z" fill="url(#u2-foam)" stroke="#ffffff" strokeWidth="2" />

        {/* Swirling Vortex Roller Arrows */}
        {[300, 370, 440].map((xx, i) => (
          <g key={i} transform={`translate(${xx}, ${170 - i * 20})`}>
            <circle cx="0" cy="0" r="16" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="14 6" className="anim-flow" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        ))}
        <text x="320" y="130" fontSize="12" fontWeight="800" fill="#ffffff">Turbulent Roller Vortices</text>

        {/* Entrained Air Bubbles rising */}
        {[270, 310, 350, 390, 430, 470, 510].map((xx, i) => (
          <circle key={i} cx={xx} cy={160 + (i % 3) * 20} r="3" fill="#ffffff" opacity="0.8" className="anim-rise" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}

        {/* Supercritical Incoming Jet Streamlines */}
        <line x1="50" y1="255" x2="230" y2="255" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="10 4" className="anim-flow" />
        <text x="60" y="225" fontSize="11" fontWeight="700" fill="#ea580c">Supercritical Sheet (Fr₁ = {froude})</text>
        <line x1="50" y1="240" x2="50" y2="270" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
        <text x="56" y="258" fontSize="10" fontWeight="700" fill="#dc2626">y₁ = {f1(y1)}m</text>

        {/* Subcritical Outflow Streamlines */}
        <line x1="560" y1="150" x2="860" y2="150" stroke="#bee3f8" strokeWidth="2" strokeDasharray="10 6" className="anim-flow" />
        <line x1="560" y1="190" x2="860" y2="190" stroke="#bee3f8" strokeWidth="2" strokeDasharray="10 6" className="anim-flow" />
        <text x="640" y="95" fontSize="12" fontWeight="700" fill="#1d4ed8">Subcritical Tailwater (Fr₂ &lt; 1)</text>
        <line x1="860" y1="110" x2="860" y2="270" stroke="#1d4ed8" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
        <text x="800" y="195" fontSize="11" fontWeight="700" fill="#1d4ed8">y₂ = {f2(y2)}m</text>

        {/* Jump Length Lj annotation */}
        <line x1="220" y1="55" x2="540" y2="55" stroke="#0f1f3d" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
        <text x="320" y="45" fontSize="12" fontWeight="700" fill="#0f1f3d">Jump Length L_j ≈ 5 to 7 (y₂ - y₁)</text>

        {/* EGL Drop (Head Loss ΔE) */}
        <line x1="50" y1="20" x2="220" y2="20" stroke="#dc2626" strokeWidth="2.5" />
        <text x="60" y="15" fontSize="10" fontWeight="700" fill="#dc2626">EGL₁ = y₁ + V₁²/2g</text>

        <line x1="540" y1="80" x2="860" y2="80" stroke="#dc2626" strokeWidth="2.5" />
        <text x="700" y="75" fontSize="10" fontWeight="700" fill="#dc2626">EGL₂ = y₂ + V₂²/2g</text>

        <line x1="535" y1="20" x2="535" y2="80" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
        <text x="470" y="52" fontSize="11" fontWeight="800" fill="#dc2626">Head Loss ΔE</text>

        {/* Stilling Basin Chute Block / Baffle Pier Option */}
        <rect x="250" y="245" width="20" height="25" fill="#475569" stroke="#1e293b" />
        <rect x="420" y="235" width="22" height="35" fill="#475569" stroke="#1e293b" />
        <rect x="520" y="250" width="16" height="20" fill="#475569" stroke="#1e293b" />
        <text x="390" y="260" fontSize="9" fontWeight="700" fill="#ffffff">Baffle Pier</text>
      </svg>
    </Illo>
  );
}

/* =========================================================================
   EXPORT UNIT2 ILLUSTRATION COMPONENTS
   ========================================================================= */
export const UNIT2_ILLOS = {
  illo_pipe_vs_channel: IlloPipeVsChannel,
  illo_velocity_dip: IlloVelocityDip,
  illo_chezy_shear: IlloChezyDerivation,
  illo_cowan_landscape: IlloCowanLandscape,
  illo_economic_sections: IlloEconomicSections,
  illo_specific_energy: IlloSpecificEnergyCurve,
  illo_channel_transitions: IlloChannelTransitions,
  illo_hydraulic_jump: IlloHydraulicJumpAnatomy
};

