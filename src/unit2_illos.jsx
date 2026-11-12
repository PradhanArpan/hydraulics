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
   1. S10: PIPE FLOW VS OPEN CHANNEL: LONGITUDINAL PROFILE & GRADE LINES
   ========================================================================= */
export function IlloPipeVsChannel() {
  const [activeTab, setActiveTab] = useState("hgl");
  const [piezoH, setPiezoH] = useState(3.5); // piezometric head above crown (m)
  const [chanDepth, setChanDepth] = useState(1.8); // channel depth (m)

  const notes = {
    hgl: {
      title: "Hydraulic Grade Line (HGL) Comparison",
      body: "In Pipe Flow, HGL = z + P/γ and rises high above the pipe crown into piezometer tubes. In Open Channel Flow, gauge pressure at the surface is strictly zero (atmospheric reference), so the free water surface itself IS the Hydraulic Grade Line."
    },
    egl: {
      title: "Energy Grade Line (EGL) & Grade Parallels",
      body: "EGL = HGL + V²/(2g). In uniform open-channel flow, Bed Slope (S₀), Water Surface Slope (Sw), and Energy Slope (Sf) are strictly parallel (S₀ = Sw = Sf = S). For a pressure pipe, EGL can slope downward even if the physical conduit runs uphill!"
    },
    driving: {
      title: "Driving Mechanisms: Pressure Gradient vs Gravity Component",
      body: "Pipe flow is propelled by an axial pressure difference (P₁ - P₂)/L maintained by pumps or elevated heads. Open channel flow is powered by the downslope component of fluid weight (W·sin θ = γ·A·L·S₀)."
    }
  };

  return (
    <Illo title="Pipe Flow vs. Open Channel Flow: Comparative Cutaway & Grade Lines" kind="Interactive Vector Illustration"
          cap="Toggle the explanation tabs and adjust the sliders to observe how HGL, EGL, and boundary pressure behave between pressurized conduits and gravity-driven open channels.">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[["hgl", "1. HGL & Water Surface"], ["egl", "2. EGL & Slope Parallels"], ["driving", "3. Driving Force Balance"]].map(([k, lbl]) => (
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", background: "#f8fafc", padding: "8px 12px", borderRadius: 6, marginBottom: "8px", fontSize: "0.82rem" }}>
        <div>
          <span style={{ fontWeight: 600, color: "#0f1f3d" }}>Pipe Piezometer Head (P/γ): <b>{piezoH} m</b></span>
          <input type="range" min="1.0" max="5.0" step="0.5" value={piezoH} onChange={e => setPiezoH(+e.target.value)} style={{ width: "100%", accentColor: "#1a5f7a" }} />
        </div>
        <div>
          <span style={{ fontWeight: 600, color: "#0f1f3d" }}>Channel Water Depth (y): <b>{chanDepth} m</b></span>
          <input type="range" min="0.8" max="2.6" step="0.2" value={chanDepth} onChange={e => setChanDepth(+e.target.value)} style={{ width: "100%", accentColor: "#1a5f7a" }} />
        </div>
      </div>

      <svg viewBox="0 0 940 380" style={{ width: "100%", background: "#fbfcfd", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* LEFT PANEL: PRESSURE PIPE FLOW */}
        <g transform="translate(15, 15)">
          <rect x="0" y="0" width="445" height="350" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="20" y="26" fontSize="14" fontWeight="700" fill="#0f1f3d">Pressure Pipe Flow (Full Conduit)</text>
          <text x="20" y="42" fontSize="10.5" fill="#64748b">Solid boundary confinement • Hydrostatic pressure at boundary P &gt; 0</text>

          {/* Longitudinal pipe conduit */}
          <rect x="25" y="200" width="395" height="60" rx="4" fill="url(#u2-pipe)" stroke="#1a202c" strokeWidth="2" />
          <rect x="27" y="205" width="391" height="50" fill="url(#u2-water)" />

          {/* Streamlines */}
          <line x1="35" y1="220" x2="410" y2="220" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          <line x1="35" y1="230" x2="410" y2="230" stroke="#bee3f8" strokeWidth="2.5" strokeDasharray="8 6" className="anim-flow" />
          <line x1="35" y1="240" x2="410" y2="240" stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />

          {/* Piezometer tubes at Section 1 (x=120) and Section 2 (x=320) */}
          {/* Tube 1 */}
          <rect x="110" y={200 - piezoH * 25} width="20" height={piezoH * 25} fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <rect x="112" y={200 - piezoH * 25} width="16" height={piezoH * 25} fill="url(#u2-water)" />
          <ellipse cx="120" cy={200 - piezoH * 25} rx="8" ry="2.5" fill="#63b3ed" stroke="#2b6cb0" />
          <text x="75" y={195 - piezoH * 25} fontSize="10" fontWeight="700" fill="#dc2626">HGL₁</text>

          {/* Tube 2 (with friction loss hf = 18px) */}
          <rect x="310" y={200 - (piezoH * 25 - 18)} width="20" height={piezoH * 25 - 18} fill="#ffffff" stroke="#475569" strokeWidth="2" />
          <rect x="312" y={200 - (piezoH * 25 - 18)} width="16" height={piezoH * 25 - 18} fill="url(#u2-water)" />
          <ellipse cx="320" cy={200 - (piezoH * 25 - 18)} rx="8" ry="2.5" fill="#63b3ed" stroke="#2b6cb0" />
          <text x="335" y={195 - (piezoH * 25 - 18)} fontSize="10" fontWeight="700" fill="#dc2626">HGL₂</text>

          {/* HGL and EGL Lines */}
          <line x1="25" y1={200 - piezoH * 25 - 4} x2="415" y2={200 - (piezoH * 25 - 28)} stroke="#dc2626" strokeWidth="2.5" strokeDasharray="6 4" />
          <text x="250" y={185 - piezoH * 25} fontSize="10.5" fontWeight="700" fill="#dc2626">HGL (z + P/γ)</text>

          <line x1="25" y1={200 - piezoH * 25 - 32} x2="415" y2={200 - (piezoH * 25 - 28) - 28} stroke="#2563eb" strokeWidth="2.5" />
          <text x="250" y={155 - piezoH * 25} fontSize="10.5" fontWeight="700" fill="#2563eb">EGL = HGL + V²/2g</text>

          {/* Head loss indicator hf */}
          <line x1="320" y1={200 - piezoH * 25} x2="365" y2={200 - piezoH * 25} stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="360" y1={200 - piezoH * 25} x2="360" y2={200 - (piezoH * 25 - 18)} stroke="#dc2626" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="366" y={200 - piezoH * 25 + 12} fontSize="9.5" fontWeight="700" fill="#dc2626">h_f</text>

          {/* Cross section inset at bottom left */}
          <g transform="translate(45, 275)">
            <circle cx="35" cy="35" r="30" fill="url(#u2-pipe)" stroke="#1a202c" strokeWidth="2" />
            <circle cx="35" cy="35" r="26" fill="url(#u2-water)" />
            <text x="80" y="28" fontSize="10.5" fontWeight="700" fill="#0f1f3d">Pipe Cross Section</text>
            <text x="80" y="44" fontSize="9.5" fill="#475569">Wetted Perimeter P = π·D (100% solid contact)</text>
            <text x="80" y="58" fontSize="9.5" fill="#475569">Hydraulic Radius R = D / 4</text>
          </g>
        </g>

        {/* RIGHT PANEL: OPEN CHANNEL FLOW */}
        <g transform="translate(480, 15)">
          <rect x="0" y="0" width="445" height="350" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
          <text x="20" y="26" fontSize="14" fontWeight="700" fill="#0f1f3d">Open Channel Flow (Free Surface)</text>
          <text x="20" y="42" fontSize="10.5" fill="#64748b">Atmospheric boundary • Water surface itself IS the HGL (P_gauge = 0)</text>

          {/* Sloping Bed */}
          <path d="M 25,230 L 415,260 L 415,280 L 25,280 Z" fill="url(#u2-soil)" />
          <line x1="25" y1="230" x2="415" y2="260" stroke="#78350f" strokeWidth="4" />

          {/* Flowing water prism */}
          <path d={`M 25,${230 - chanDepth * 28} L 415,${260 - chanDepth * 28} L 415,260 L 25,230 Z`} fill="url(#u2-water)" />

          {/* Water Surface Line = HGL */}
          <line x1="25" y1={230 - chanDepth * 28} x2="415" y2={260 - chanDepth * 28} stroke="#dc2626" strokeWidth="3" />
          <text x="230" y={222 - chanDepth * 28} fontSize="11" fontWeight="700" fill="#dc2626">WSL ≡ HGL (P_gauge = 0)</text>

          {/* EGL parallel to WSL and Bed */}
          <line x1="25" y1={202 - chanDepth * 28} x2="415" y2={232 - chanDepth * 28} stroke="#2563eb" strokeWidth="2.5" />
          <text x="240" y={194 - chanDepth * 28} fontSize="11" fontWeight="700" fill="#2563eb">EGL (HGL + V²/2g)</text>

          {/* Velocity head V^2/2g dimension */}
          <line x1="160" y1={202 - chanDepth * 28 + 10} x2="160" y2={230 - chanDepth * 28 - 2} stroke="#2563eb" strokeWidth="1.5" markerEnd="url(#u2-arr)" markerStart="url(#u2-arr)" />
          <text x="170" y={218 - chanDepth * 28} fontSize="9.5" fontWeight="700" fill="#2563eb">V²/2g</text>

          {/* Atmospheric pressure downward vectors onto free surface */}
          {[80, 160, 240, 320].map((xx, i) => (
            <g key={i}>
              <line x1={xx} y1={230 - chanDepth * 28 - 25 + i * 4} x2={xx} y2={230 - chanDepth * 28 - 4 + i * 4} stroke="#0f1f3d" strokeWidth="1.6" markerEnd="url(#u2-arr)" />
              <text x={xx - 12} y={230 - chanDepth * 28 - 28 + i * 4} fontSize="8.5" fontWeight="700" fill="#0f1f3d">P_atm</text>
            </g>
          ))}

          {/* Streamlines */}
          <line x1="45" y1={245 - chanDepth * 18} x2="395" y2={275 - chanDepth * 18} stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          <line x1="45" y1={240 - chanDepth * 8} x2="395" y2={270 - chanDepth * 8} stroke="#bee3f8" strokeWidth="2.5" strokeDasharray="8 6" className="anim-flow" />

          {/* Parallel slope notation */}
          <text x="40" y="246" fontSize="10" fontWeight="700" fill="#ffffff" transform="rotate(4.5, 40, 246)">
            Bed S₀ = Water Sw = Friction Sf
          </text>

          {/* Channel Cross section inset at bottom left */}
          <g transform="translate(45, 275)">
            <polygon points="10,55 70,55 60,15 20,15" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="1.5" />
            <line x1="5" y1="15" x2="20" y2="15" stroke="#78350f" strokeWidth="3" />
            <line x1="20" y1="15" x2="30" y2="55" stroke="#78350f" strokeWidth="3" />
            <line x1="30" y1="55" x2="70" y2="55" stroke="#78350f" strokeWidth="3" />
            <line x1="70" y1="55" x2="80" y2="15" stroke="#78350f" strokeWidth="3" />
            <line x1="80" y1="15" x2="95" y2="15" stroke="#78350f" strokeWidth="3" />
            <line x1="20" y1="15" x2="80" y2="15" stroke="#0284c7" strokeWidth="2" />
            <text x="110" y="28" fontSize="10.5" fontWeight="700" fill="#0f1f3d">Channel Cross Section</text>
            <text x="110" y="44" fontSize="9.5" fill="#475569">Wetted Perimeter P = B + 2y√(1+m²) (only bed &amp; banks)</text>
            <text x="110" y="58" fontSize="9.5" fill="#475569">Top Width T exposed to atmospheric air!</text>
          </g>
        </g>
      </svg>

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
   2. S10: CLASSIFICATION OF OPEN CHANNELS (NATURAL VS ARTIFICIAL & PRISMATIC)
   ========================================================================= */
export function IlloChannelClassification() {
  const [cat, setCat] = useState("prismatic");

  return (
    <Illo title="Classification of Open Channels: Geometric & Alignment Types" kind="Architectural Vector Infographic"
          cap="Open channels are classified by origin (Natural vs. Artificial) and by longitudinal cross-sectional constancy (Prismatic vs. Non-Prismatic).">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[
          ["prismatic", "1. Prismatic Artificial Canal"],
          ["nonprismatic", "2. Non-Prismatic Natural River"],
          ["boundary", "3. Rigid vs. Mobile (Alluvial) Boundary"]
        ].map(([k, lbl]) => (
          <button key={k} onClick={() => setCat(k)}
                  style={{
                    padding: "4px 14px", borderRadius: "16px", fontSize: "0.82rem", cursor: "pointer",
                    border: "1px solid " + (cat === k ? "#1a5f7a" : "#cbd5e1"),
                    background: cat === k ? "#1a5f7a" : "#ffffff",
                    color: cat === k ? "#ffffff" : "#334155", fontWeight: 700
                  }}>
            {lbl}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 920 300" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {cat === "prismatic" && (
          <g transform="translate(40, 20)">
            <text x="10" y="24" fontSize="15" fontWeight="700" fill="#0f1f3d">Prismatic Artificial Channel (Engineered Irrigation Canal)</text>
            <text x="10" y="42" fontSize="11" fill="#64748b">Constant cross-section, uniform bed slope S₀, and straight alignment over reach L</text>

            {/* 3D Perspective Canal */}
            <path d="M 60,180 L 300,90 L 540,90 L 780,180 Z" fill="#e2ecd8" />
            {/* Lined Canal Bed */}
            <path d="M 120,240 L 360,120 L 480,120 L 720,240 Z" fill="url(#u2-soil)" stroke="#78350f" strokeWidth="2" />
            {/* Water volume */}
            <path d="M 180,210 L 390,105 L 450,105 L 660,210 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />

            {/* Cross Section 1 annotation */}
            <ellipse cx="420" cy="105" rx="30" ry="8" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
            <text x="400" y="90" fontSize="11" fontWeight="700" fill="#dc2626">Section 1 (A, P, y)</text>

            {/* Cross Section 2 annotation */}
            <ellipse cx="420" cy="210" rx="240" ry="18" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
            <text x="400" y="238" fontSize="11" fontWeight="700" fill="#dc2626">Section 2: Identical Cross-Section Geometry!</text>

            <line x1="80" y1="260" x2="760" y2="260" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="380" y="278" fontSize="11" fontWeight="700" fill="#0f1f3d">Reach Length L • S₀ = Constant</text>
          </g>
        )}

        {cat === "nonprismatic" && (
          <g transform="translate(40, 20)">
            <text x="10" y="24" fontSize="15" fontWeight="700" fill="#0f1f3d">Non-Prismatic Natural Channel (Meandering Stream / River)</text>
            <text x="10" y="42" fontSize="11" fill="#64748b">Varying cross-section, undulating bed slope, shoals, deep pools, and irregular vegetation</text>

            {/* Natural Terrain with irregular river reach */}
            <path d="M 20,80 Q 240,160 440,60 T 860,100 L 860,240 Q 640,180 440,240 T 20,200 Z" fill="url(#u2-water)" stroke="#1a5f7a" strokeWidth="2" />
            <path d="M 20,60 Q 240,140 440,40 T 860,80" stroke="#78350f" strokeWidth="6" fill="none" />
            <path d="M 20,220 Q 640,200 440,260 T 860,220" stroke="#78350f" strokeWidth="6" fill="none" />

            {/* Deep pool & gravel bar labels */}
            <circle cx="280" cy="140" r="14" fill="#ca8a04" opacity="0.4" />
            <text x="250" y="145" fontSize="10" fontWeight="700" fill="#78350f">Gravel Bar / Shoal</text>

            <ellipse cx="620" cy="160" rx="35" ry="20" fill="#0d3b52" opacity="0.5" />
            <text x="590" y="165" fontSize="10" fontWeight="700" fill="#ffffff">Deep Scour Pool</text>

            <text x="40" y="260" fontSize="11" fontWeight="600" fill="#475569">
              * Natural streams can never be prismatic: cross-section area A(x), bed elevation z(x), and width T(x) change continuously.
            </text>
          </g>
        )}

        {cat === "boundary" && (
          <g transform="translate(40, 20)">
            <text x="10" y="24" fontSize="15" fontWeight="700" fill="#0f1f3d">Rigid Boundary vs. Mobile (Alluvial) Boundary Channels</text>
            <text x="10" y="42" fontSize="11" fill="#64748b">Fixed concrete/masonry lining vs self-forming sand/silt bed that scours and silts</text>

            {/* Left: Rigid */}
            <g transform="translate(20, 60)">
              <rect x="0" y="0" width="380" height="180" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#1e293b">Rigid Boundary (Lined Canal / Flume)</text>
              <polygon points="40,50 340,50 280,140 100,140" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              <line x1="30" y1="50" x2="100" y2="140" stroke="#475569" strokeWidth="6" />
              <line x1="100" y1="140" x2="280" y2="140" stroke="#475569" strokeWidth="6" />
              <line x1="280" y1="140" x2="350" y2="50" stroke="#475569" strokeWidth="6" />
              <text x="110" y="165" fontSize="10" fontWeight="600" fill="#334155">Concrete / Masonry / Steel (No scour, 1 degree of freedom: y)</text>
            </g>

            {/* Right: Mobile */}
            <g transform="translate(440, 60)">
              <rect x="0" y="0" width="380" height="180" rx="6" fill="#fefce8" stroke="#fef08a" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#854d0e">Mobile Alluvial Boundary (Earthen / River)</text>
              <path d="M 40,60 Q 190,160 340,60 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              <path d="M 30,60 Q 190,165 350,60" stroke="#c29b68" strokeWidth="8" fill="none" />
              {/* Sediment ripple dots */}
              {[90, 150, 210, 270].map((xx, i) => (
                <circle key={i} cx={xx} cy={105 + (i % 2) * 10} r="3" fill="#a16207" />
              ))}
              <text x="70" y="165" fontSize="10" fontWeight="600" fill="#854d0e">Sand &amp; Silt: Scour, Siltation, Meandering (4 degrees of freedom!)</text>
            </g>
          </g>
        )}
      </svg>
    </Illo>
  );
}

/* =========================================================================
   3. S10: 6 FORCES & GOVERNING DIMENSIONLESS NUMBERS (RE & FR SIMULATOR)
   ========================================================================= */
export function IlloForcesDimensionless() {
  const [selectedNum, setSelectedNum] = useState("froude");

  return (
    <Illo title="The 6 Fundamental Forces & Governing Dimensionless Numbers" kind="Interactive Hydrodynamic Matrix"
          cap="Open channel flows are dominated by Gravity and Inertia (Froude Number Fr) alongside Viscous resistance (Reynolds Number Re).">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[
          ["froude", "Froude Number (Inertia vs Gravity)"],
          ["reynolds", "Reynolds Number (Inertia vs Viscosity)"],
          ["weber", "Weber Number (Surface Tension)"],
          ["mach", "Mach & Euler Numbers (Elasticity & Pressure)"]
        ].map(([k, lbl]) => (
          <button key={k} onClick={() => setSelectedNum(k)}
                  style={{
                    padding: "4px 14px", borderRadius: "16px", fontSize: "0.82rem", cursor: "pointer",
                    border: "1px solid " + (selectedNum === k ? "#1a5f7a" : "#cbd5e1"),
                    background: selectedNum === k ? "#1a5f7a" : "#ffffff",
                    color: selectedNum === k ? "#ffffff" : "#334155", fontWeight: 700
                  }}>
            {lbl}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 920 280" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {selectedNum === "froude" && (
          <g transform="translate(30, 20)">
            <text x="10" y="24" fontSize="15" fontWeight="700" fill="#0f1f3d">Froude Number: Fr = V / √(g·D) = √(Inertia Force / Gravity Force)</text>
            <text x="10" y="42" fontSize="11" fill="#64748b">Dictates whether surface gravity waves can propagate upstream against the current</text>

            {/* Three Wave Regimes Illustrated */}
            {/* 1. Subcritical */}
            <g transform="translate(10, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#f0fdf4" stroke="#86efac" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#166534">Subcritical (Fr &lt; 1, Tranquil)</text>
              <line x1="20" y1="70" x2="240" y2="70" stroke="#0284c7" strokeWidth="2.5" />
              {/* Concentric ripples spreading upstream AND downstream */}
              <circle cx="130" cy="70" r="15" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="130" cy="70" r="32" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx="130" cy="70" r="4" fill="#dc2626" />
              <line x1="130" y1="70" x2="60" y2="70" stroke="#16a34a" strokeWidth="2" markerEnd="url(#u2-arr)" />
              <text x="45" y="60" fontSize="9" fontWeight="700" fill="#16a34a">Wave travels UPSTREAM (c &gt; V)</text>
              <text x="15" y="140" fontSize="10" fill="#14532d">Control is downstream. Backwater curves propagate upstream from dams and weirs.</text>
            </g>

            {/* 2. Critical */}
            <g transform="translate(295, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#fefce8" stroke="#fde047" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#854d0e">Critical Flow (Fr = 1.0)</text>
              <line x1="20" y1="70" x2="240" y2="70" stroke="#0284c7" strokeWidth="2.5" />
              {/* Stationary wave standing at origin */}
              <circle cx="80" cy="70" r="4" fill="#dc2626" />
              <path d="M 80,70 Q 140,40 200,70" fill="none" stroke="#ca8a04" strokeWidth="2" />
              <line x1="80" y1="70" x2="160" y2="70" stroke="#ca8a04" strokeWidth="2" markerEnd="url(#u2-arr)" />
              <text x="80" y="105" fontSize="10" fontWeight="700" fill="#854d0e">Standing Wave (V = c = √(gD))</text>
              <text x="15" y="140" fontSize="10" fill="#713f12">Minimum specific energy Ec. Flow is unstable; water surface shows wavy undulations.</text>
            </g>

            {/* 3. Supercritical */}
            <g transform="translate(580, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#fff7ed" stroke="#fdba74" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#9a3412">Supercritical (Fr &gt; 1, Shooting)</text>
              <line x1="20" y1="70" x2="240" y2="70" stroke="#0284c7" strokeWidth="2.5" />
              {/* Mach-like wedge swept downstream */}
              <circle cx="50" cy="70" r="4" fill="#dc2626" />
              <path d="M 50,70 L 220,30 M 50,70 L 220,110" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="50" y1="70" x2="190" y2="70" stroke="#ea580c" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
              <text x="90" y="65" fontSize="10" fontWeight="700" fill="#c2410c">Wedge Swept Downstream</text>
              <text x="15" y="140" fontSize="10" fill="#7c2d12">Disturbances cannot travel upstream! Control is strictly upstream (e.g. sluice gate).</text>
            </g>
          </g>
        )}

        {selectedNum === "reynolds" && (
          <g transform="translate(30, 20)">
            <text x="10" y="24" fontSize="15" fontWeight="700" fill="#0f1f3d">Reynolds Number: Re = V·R / ν = Inertia Force / Viscous Force</text>
            <text x="10" y="42" fontSize="11" fill="#64748b">Open Channel Flow threshold limits differ from pipes because characteristic length is Hydraulic Radius R!</text>

            <g transform="translate(10, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#eff6ff" stroke="#bfdbfe" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#1e40af">Laminar Regime (Re &lt; 500)</text>
              <line x1="20" y1="60" x2="240" y2="60" stroke="#3b82f6" strokeWidth="2" />
              <line x1="20" y1="80" x2="240" y2="80" stroke="#3b82f6" strokeWidth="2" />
              <line x1="20" y1="100" x2="240" y2="100" stroke="#3b82f6" strokeWidth="2" />
              <text x="15" y="140" fontSize="10" fill="#1e3a8a">Fluid moves in parallel sheets without transverse mixing. Extremely rare (thin overland sheet flow).</text>
            </g>

            <g transform="translate(295, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#fdf4ff" stroke="#f0abfc" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#86198f">Transition Zone (500 ≤ Re ≤ 2000)</text>
              <path d="M 20,60 Q 80,45 140,75 T 240,60" fill="none" stroke="#a21caf" strokeWidth="2" />
              <path d="M 20,95 Q 80,110 140,80 T 240,95" fill="none" stroke="#a21caf" strokeWidth="2" />
              <text x="15" y="140" fontSize="10" fill="#701a75">Intermittent turbulent bursts amidst viscous damping.</text>
            </g>

            <g transform="translate(580, 60)">
              <rect x="0" y="0" width="260" height="175" rx="6" fill="#f0fdf4" stroke="#86efac" />
              <text x="15" y="24" fontSize="12" fontWeight="700" fill="#166534">Turbulent Regime (Re &gt; 2000)</text>
              {/* Chaotic vortex streamlines */}
              <path d="M 20,60 C 70,30 90,90 140,60 C 190,30 210,90 240,60" fill="none" stroke="#16a34a" strokeWidth="2" className="anim-flow" />
              <path d="M 20,90 C 70,120 90,60 140,90 C 190,120 210,60 240,90" fill="none" stroke="#16a34a" strokeWidth="2" className="anim-flow" />
              <text x="15" y="140" fontSize="10" fill="#14532d">Virtually all civil engineering channels and natural rivers operate here (Re ~ 10⁵ to 10⁷).</text>
            </g>
          </g>
        )}

        {(selectedNum === "weber" || selectedNum === "mach") && (
          <g transform="translate(40, 30)">
            <text x="10" y="24" fontSize="14" fontWeight="700" fill="#0f1f3d">Secondary Dimensionless Numbers in Hydraulic Modeling</text>
            <rect x="10" y="45" width="400" height="180" rx="6" fill="#ffffff" stroke="#e2e8f0" />
            <text x="25" y="70" fontSize="12" fontWeight="700" fill="#0284c7">Weber Number: We = V / √(σ / (ρ·L))</text>
            <text x="25" y="90" fontSize="10" fill="#475569">Ratio of Inertia Force to Surface Tension Force.</text>
            <text x="25" y="110" fontSize="10" fill="#334155">• Critical in physical hydraulic scale models of weirs and spillway crests.</text>
            <text x="25" y="130" fontSize="10" fill="#334155">• When water depth &lt; 50 mm, surface tension introduces scale effects!</text>

            <rect x="430" y="45" width="400" height="180" rx="6" fill="#ffffff" stroke="#e2e8f0" />
            <text x="445" y="70" fontSize="12" fontWeight="700" fill="#7c3aed">Euler &amp; Mach Numbers</text>
            <text x="445" y="90" fontSize="10" fill="#475569">Euler: Eu = ΔP / (ρ·V²) • Mach: M = V / c_sound</text>
            <text x="445" y="110" fontSize="10" fill="#334155">• Water is treated as incompressible in open channel flow (M ≪ 0.3).</text>
            <text x="445" y="130" fontSize="10" fill="#334155">• Compressibility is only vital during violent water hammer events in penstocks.</text>
          </g>
        )}
      </svg>
    </Illo>
  );
}

/* =========================================================================
   4. S10: GEOMETRIC PARAMETERS EXPLORER & CROSS-SECTION COMPARATOR
   ========================================================================= */
export function IlloGeometricParameters() {
  const [depthY, setDepthY] = useState(1.5);
  const [compSec, setCompSec] = useState("wide"); // compare with wide shallow vs deep narrow

  // Primary Section: Trapezoidal (B = 3.0 m, m = 1.5)
  const B1 = 3.0, m1 = 1.5;
  const A1 = (B1 + m1 * depthY) * depthY;
  const P1 = B1 + 2 * depthY * Math.sqrt(1 + m1 * m1);
  const R1 = A1 / P1;
  const T1 = B1 + 2 * m1 * depthY;
  const D1 = A1 / T1;

  // Secondary Section designed to have IDENTICAL Hydraulic Radius R = R1:
  // Option A: Wide Shallow rectangular (R ≈ y2 => y2 = R1, B2 very large)
  // Option B: Rectangular with B2 = 4.0 m
  const B2 = compSec === "wide" ? 10.0 : 2.0;
  // solve for y2 such that (B2*y2)/(B2 + 2*y2) = R1:
  // B2*y2 = R1*B2 + 2*R1*y2 => y2 * (B2 - 2*R1) = R1*B2 => y2 = (R1*B2)/(B2 - 2*R1)
  const y2 = (B2 - 2 * R1 > 0.05) ? (R1 * B2) / (B2 - 2 * R1) : 1.0;
  const A2 = B2 * y2;
  const P2 = B2 + 2 * y2;
  const R2 = A2 / P2;

  return (
    <Illo title="Interactive Geometric Parameters: Flow Elements & Multi-Section R Comparison" kind="Parametric Geometric Laboratory"
          cap="Slide the water depth to see how Area A, Perimeter P, and Hydraulic Radius R update in real time. Notice how two completely different channel shapes can share the identical Hydraulic Radius R!">
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "10px", marginBottom: "8px" }}>
        <div style={{ background: "#f8fafc", padding: "10px", borderRadius: 6, border: "1px solid #cbd5e1" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1f3d" }}>
            Adjust Primary Water Depth y: <b>{depthY.toFixed(2)} m</b>
          </span>
          <input type="range" min="0.5" max="3.0" step="0.1" value={depthY} onChange={e => setDepthY(+e.target.value)} style={{ width: "100%", accentColor: "#1a5f7a", margin: "6px 0" }} />
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", fontSize: "0.8rem" }}>
            <span style={{ background: "#eff6ff", padding: "3px 8px", borderRadius: 4, color: "#1e40af" }}>A₁ = {f2(A1)} m²</span>
            <span style={{ background: "#fef3c7", padding: "3px 8px", borderRadius: 4, color: "#92400e" }}>P₁ = {f2(P1)} m</span>
            <span style={{ background: "#dcfce7", padding: "3px 8px", borderRadius: 4, color: "#166534", fontWeight: 700 }}>R₁ = {f3(R1)} m</span>
            <span style={{ background: "#f3e8ff", padding: "3px 8px", borderRadius: 4, color: "#7e22ce" }}>T₁ = {f2(T1)} m</span>
            <span style={{ background: "#f1f5f9", padding: "3px 8px", borderRadius: 4, color: "#334155" }}>D₁ = {f2(D1)} m</span>
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "10px", borderRadius: 6, border: "1px solid #cbd5e1" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1f3d" }}>Compare with Second Channel (Matching R):</span>
          <div style={{ display: "flex", gap: "6px", margin: "6px 0" }}>
            <button onClick={() => setCompSec("wide")}
                    style={{ padding: "3px 10px", borderRadius: 12, fontSize: "0.78rem", cursor: "pointer", background: compSec === "wide" ? "#1a5f7a" : "#f1f5f9", color: compSec === "wide" ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 600 }}>
              Wide Shallow Rect (B = 10m)
            </button>
            <button onClick={() => setCompSec("narrow")}
                    style={{ padding: "3px 10px", borderRadius: 12, fontSize: "0.78rem", cursor: "pointer", background: compSec === "narrow" ? "#1a5f7a" : "#f1f5f9", color: compSec === "narrow" ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 600 }}>
              Narrow Deep Rect (B = 2m)
            </button>
          </div>
          <div style={{ fontSize: "0.8rem", color: "#475569" }}>
            Section 2 achieves the <b>exact same R = {f3(R2)} m</b> at depth <b>y₂ = {f2(y2)} m</b> with Area A₂ = {f2(A2)} m².
          </div>
        </div>
      </div>

      <svg viewBox="0 0 920 260" style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />

        {/* SECTION 1: TRAPEZOIDAL */}
        <g transform="translate(40, 20)">
          <text x="10" y="20" fontSize="13" fontWeight="700" fill="#0f1f3d">Section 1: Trapezoidal Canal (B = 3m, 1V:1.5H)</text>

          {/* Banks & Bed */}
          <line x1="20" y1="40" x2="80" y2="40" stroke="#78350f" strokeWidth="3" />
          <line x1="80" y1="40" x2="150" y2="180" stroke="#78350f" strokeWidth="4" />
          <line x1="150" y1="180" x2="270" y2="180" stroke="#78350f" strokeWidth="4" />
          <line x1="270" y1="180" x2="340" y2="40" stroke="#78350f" strokeWidth="4" />
          <line x1="340" y1="40" x2="400" y2="40" stroke="#78350f" strokeWidth="3" />

          {/* Water body calculated dynamically with depthY */}
          {/* Depth scale: 1m = 45px */}
          <polygon points={`
            ${210 - (1.5 + 1.5 * depthY) * 30},${180 - depthY * 45}
            ${210 + (1.5 + 1.5 * depthY) * 30},${180 - depthY * 45}
            270,180 150,180
          `} fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />

          {/* Water Surface Line */}
          <line x1={210 - (1.5 + 1.5 * depthY) * 30} y1={180 - depthY * 45}
                x2={210 + (1.5 + 1.5 * depthY) * 30} y2={180 - depthY * 45}
                stroke="#0284c7" strokeWidth="2.5" />

          {/* Dimension y */}
          <line x1="210" y1={180 - depthY * 45} x2="210" y2="180" stroke="#dc2626" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
          <text x="216" y={180 - (depthY * 45) / 2} fontSize="10" fontWeight="700" fill="#dc2626">y = {f2(depthY)}m</text>

          {/* Dimension B */}
          <line x1="150" y1="195" x2="270" y2="195" stroke="#0f1f3d" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
          <text x="195" y="210" fontSize="10" fontWeight="700" fill="#0f1f3d">B = 3.0 m</text>
        </g>

        {/* SECTION 2: RECTANGULAR COMPARISON */}
        <g transform="translate(480, 20)">
          <text x="10" y="20" fontSize="13" fontWeight="700" fill="#0f1f3d">
            Section 2: Rectangular Channel (B = {B2}m) with Same R = {f3(R2)}m
          </text>

          {/* Rectangular boundary */}
          {compSec === "wide" ? (
            <g>
              <line x1="10" y1="90" x2="10" y2="180" stroke="#78350f" strokeWidth="4" />
              <line x1="10" y1="180" x2="390" y2="180" stroke="#78350f" strokeWidth="4" />
              <line x1="390" y1="180" x2="390" y2="90" stroke="#78350f" strokeWidth="4" />
              {/* Water */}
              <rect x="12" y={180 - Math.min(85, y2 * 45)} width="376" height={Math.min(85, y2 * 45)} fill="url(#u2-water)" stroke="#2b6cb0" />
              <line x1="10" y1={180 - Math.min(85, y2 * 45)} x2="390" y2={180 - Math.min(85, y2 * 45)} stroke="#0284c7" strokeWidth="2.5" />
              <text x="140" y={170 - Math.min(85, y2 * 45)} fontSize="10" fontWeight="700" fill="#0284c7">y₂ = {f2(y2)} m</text>
            </g>
          ) : (
            <g>
              <line x1="120" y1="40" x2="120" y2="180" stroke="#78350f" strokeWidth="4" />
              <line x1="120" y1="180" x2="280" y2="180" stroke="#78350f" strokeWidth="4" />
              <line x1="280" y1="180" x2="280" y2="40" stroke="#78350f" strokeWidth="4" />
              {/* Water */}
              <rect x="122" y={180 - Math.min(130, y2 * 45)} width="156" height={Math.min(130, y2 * 45)} fill="url(#u2-water)" stroke="#2b6cb0" />
              <line x1="120" y1={180 - Math.min(130, y2 * 45)} x2="280" y2={180 - Math.min(130, y2 * 45)} stroke="#0284c7" strokeWidth="2.5" />
              <text x="175" y={170 - Math.min(130, y2 * 45)} fontSize="10" fontWeight="700" fill="#0284c7">y₂ = {f2(y2)} m</text>
            </g>
          )}

          <rect x="10" y="220" width="380" height="30" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
          <text x="20" y="240" fontSize="11" fontWeight="700" fill="#1e40af">
            Conveyance Equivalence: If bed slope S₀ and Manning n match, both carry identical unit flux!
          </text>
        </g>
      </svg>
    </Illo>
  );
}

/* =========================================================================
   5. S10: INTERACTIVE CROSS-SECTION ISOVELS WITH TRANSECT PROBE
   ========================================================================= */
export function IlloIsovelsProbe() {
  const [probeY, setProbeY] = useState(0.7); // 0 = bed, 1 = surface
  const [probeX, setProbeX] = useState(0.5); // 0 = left bank, 1 = right bank

  // Velocity profile calculation at (probeX, probeY)
  // Parabolic side boundary decay * power law vertical with dip near surface
  const sideFactor = Math.sin(probeX * Math.PI);
  const vertBase = Math.pow(Math.max(0.01, probeY), 1 / 6);
  // Velocity dip factor: pulls max velocity down to y ~ 0.8
  const dip = 1 - 0.20 * Math.exp(-Math.pow((probeY - 0.82) / 0.25, 2)) * (1 - 0.4 * Math.abs(probeX - 0.5));
  const localV = 2.4 * sideFactor * vertBase * (probeY > 0.82 ? 1 - (probeY - 0.82) * 0.8 : 1.0);

  return (
    <Illo title="Cross-Section Velocity Contours (Isovels) & Interactive Transect Probing" kind="Hydrodynamic Contour Map"
          cap="Click or drag anywhere in the cross-section to sample local point velocity u(y, z). Notice how boundary shear forces velocity to zero at the walls and how the peak core velocity dips below the free surface.">
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", alignItems: "center" }}>
        {/* ISOVEL CONTOUR SVG */}
        <svg viewBox="0 0 500 280"
             onPointerDown={e => {
               const rect = e.currentTarget.getBoundingClientRect();
               const x = (e.clientX - rect.left) / rect.width;
               const y = 1 - (e.clientY - rect.top) / rect.height;
               if (x >= 0.1 && x <= 0.9 && y >= 0.15 && y <= 0.85) {
                 setProbeX((x - 0.1) / 0.8);
                 setProbeY((y - 0.15) / 0.70);
               }
             }}
             style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #cbd5e1", cursor: "crosshair" }}>
          <CommonDefs />

          {/* Trapezoidal canal bank */}
          <polygon points="50,60 450,60 370,230 130,230" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
          <line x1="30" y1="60" x2="130" y2="230" stroke="#78350f" strokeWidth="6" />
          <line x1="130" y1="230" x2="370" y2="230" stroke="#78350f" strokeWidth="6" />
          <line x1="370" y1="230" x2="470" y2="60" stroke="#78350f" strokeWidth="6" />

          {/* Free Surface */}
          <line x1="50" y1="60" x2="450" y2="60" stroke="#0284c7" strokeWidth="3" />

          {/* Nested Isovel Contours */}
          {/* 0.5 m/s */}
          <path d="M 85,90 Q 250,110 415,90 Q 345,210 250,210 Q 155,210 85,90 Z" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="240" y="205" fontSize="9" fill="#1e40af" fontWeight="600">0.5 m/s</text>

          {/* 1.0 m/s */}
          <path d="M 115,85 Q 250,105 385,85 Q 325,185 250,185 Q 175,185 115,85 Z" fill="none" stroke="#3b82f6" strokeWidth="1.8" />
          <text x="240" y="180" fontSize="9" fill="#1d4ed8" fontWeight="600">1.0 m/s</text>

          {/* 1.5 m/s */}
          <path d="M 150,80 Q 250,98 350,80 Q 305,160 250,160 Q 195,160 150,80 Z" fill="none" stroke="#16a34a" strokeWidth="2" />
          <text x="240" y="155" fontSize="9" fill="#15803d" fontWeight="700">1.5 m/s</text>

          {/* 2.0 m/s Core */}
          <ellipse cx="250" cy="98" rx="60" ry="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" opacity="0.85" />
          <text x="225" y="102" fontSize="10" fill="#854d0e" fontWeight="800">2.0 m/s (Core)</text>

          {/* Max Velocity Point (Dipped) */}
          <circle cx="250" cy="95" r="4" fill="#dc2626" />
          <text x="256" y="92" fontSize="9.5" fill="#dc2626" fontWeight="800">V_max = 2.2 m/s</text>

          {/* Interactive Probe Crosshair */}
          {/* Mapping probeX (0 to 1) -> x in svg (130 + 120*probeY to 370 - 120*probeY) */}
          {(() => {
            const curY_svg = 230 - probeY * 170;
            const leftX = 130 - (curY_svg - 230) * (80 / 170);
            const rightX = 370 + (curY_svg - 230) * (80 / 170);
            const curX_svg = leftX + probeX * (rightX - leftX);

            return (
              <g>
                <circle cx={curX_svg} cy={curY_svg} r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                <line x1={curX_svg - 14} y1={curY_svg} x2={curX_svg + 14} y2={curY_svg} stroke="#dc2626" strokeWidth="1.5" />
                <line x1={curX_svg} y1={curY_svg - 14} x2={curX_svg} y2={curY_svg + 14} stroke="#dc2626" strokeWidth="1.5" />
              </g>
            );
          })()}
        </svg>

        {/* PROBE DATA READOUT */}
        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0f1f3d", marginBottom: "8px" }}>
            Point Velocity Probe at (z, y):
          </div>

          <label className="f" style={{ display: "block", fontSize: "0.8rem", marginBottom: "6px" }}>
            Vertical Depth Fraction (y/y_total): <b>{f2(probeY)}</b> ({probeY > 0.85 ? "Near Surface (Dipping)" : probeY < 0.2 ? "Near Bed Boundary Layer" : "Core Flow"})
            <input type="range" min="0.05" max="0.98" step="0.05" value={probeY} onChange={e => setProbeY(+e.target.value)} />
          </label>

          <label className="f" style={{ display: "block", fontSize: "0.8rem", marginBottom: "10px" }}>
            Lateral Position Fraction across width: <b>{f2(probeX)}</b> ({Math.abs(probeX - 0.5) < 0.15 ? "Centerline" : "Near Sidewall"})
            <input type="range" min="0.05" max="0.95" step="0.05" value={probeX} onChange={e => setProbeX(+e.target.value)} />
          </label>

          <div style={{ background: "#eff6ff", padding: "10px", borderRadius: 6, border: "1px solid #bfdbfe", textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", color: "#1e40af", fontWeight: 600 }}>Local Sampled Velocity u(y, z):</div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#1d4ed8", fontFamily: "monospace" }}>
              {f2(localV)} m/s
            </div>
            <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "4px" }}>
              {probeY > 0.85 ? "Surface Velocity Dip: u is lower than peak core due to transverse corner circulation!" :
               probeY < 0.15 ? "No-slip boundary shear dominates: u approaches zero at solid bed." :
               "High-momentum turbulent core flow."}
            </div>
          </div>
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   6. S11: THE 3 LAWS OF CONSERVATION (MASS, MOMENTUM & ENERGY)
   ========================================================================= */
export function IlloConservationLaws() {
  const [activeLaw, setActiveLaw] = useState("continuity");

  const laws = {
    continuity: {
      title: "1. Conservation of Mass (The Continuity Equation)",
      statement: "For steady, incompressible liquid flow, mass cannot be created or destroyed between two sections.",
      formula: "Q = A₁·V₁ = A₂·V₂ = Constant",
      consequence: "When flow depth or width contracts (A₂ < A₁), the mean velocity must accelerate inversely (V₂ > V₁)."
    },
    momentum: {
      title: "2. Conservation of Linear Momentum (Newton's 2nd Law)",
      statement: "The net external force acting on a fluid control volume equals the time rate of change of linear momentum.",
      formula: "ΣF_x = F₁ - F₂ + W·sin θ - F_shear = ρ·Q·(β₂·V₂ - β₁·V₁)",
      consequence: "Essential whenever internal energy dissipation is unknown or violent (e.g. across a Hydraulic Jump)."
    },
    energy: {
      title: "3. Conservation of Energy (The Bernoulli / Energy Principle)",
      statement: "Total energy head at section 1 equals total energy head at section 2 plus frictional and eddy head loss h_L.",
      formula: "H₁ = z₁ + y₁ + α₁·V₁²/(2g) = z₂ + y₂ + α₂·V₂²/(2g) + h_L",
      consequence: "Governs gradually varied flow (GVF) profiles, flow over weirs, sluice gate discharges, and channel transitions."
    }
  };

  const cur = laws[activeLaw];

  return (
    <Illo title="The Three Fundamental Conservation Laws of Open Channel Flow" kind="Interactive Physics Foundation"
          cap="All of open channel hydraulics derives from the three conservation principles: Mass (Continuity), Momentum (Newton's 2nd Law), and Energy (Bernoulli).">
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {[
          ["continuity", "1. Conservation of Mass (Continuity)"],
          ["energy", "2. Conservation of Energy (Bernoulli)"],
          ["momentum", "3. Conservation of Momentum (Newton)"]
        ].map(([k, lbl]) => (
          <button key={k} onClick={() => setActiveLaw(k)}
                  style={{
                    padding: "4px 14px", borderRadius: "16px", fontSize: "0.82rem", cursor: "pointer",
                    border: "1px solid " + (activeLaw === k ? "#1a5f7a" : "#cbd5e1"),
                    background: activeLaw === k ? "#1a5f7a" : "#ffffff",
                    color: activeLaw === k ? "#ffffff" : "#334155", fontWeight: 700
                  }}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", alignItems: "center" }}>
        {/* SVG SIMULATION */}
        <svg viewBox="0 0 520 280" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <CommonDefs />

          {/* Control Volume Channel */}
          <path d="M 40,80 L 220,120 L 480,120 L 480,220 L 220,240 L 40,240 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
          <line x1="40" y1="240" x2="480" y2="220" stroke="#78350f" strokeWidth="6" />

          {/* Section 1 */}
          <line x1="120" y1="70" x2="120" y2="245" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x="100" y="60" fontSize="11" fontWeight="700" fill="#dc2626">Section 1</text>
          <text x="70" y="160" fontSize="11" fontWeight="700" fill="#ffffff">A₁, V₁</text>

          {/* Section 2 */}
          <line x1="380" y1="90" x2="380" y2="230" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
          <text x="360" y="80" fontSize="11" fontWeight="700" fill="#dc2626">Section 2</text>
          <text x="400" y="160" fontSize="11" fontWeight="700" fill="#ffffff">A₂, V₂</text>

          {activeLaw === "continuity" && (
            <g>
              <line x1="60" y1="130" x2="180" y2="130" stroke="#bee3f8" strokeWidth="2.5" strokeDasharray="8 6" className="anim-flow" />
              <line x1="280" y1="150" x2="460" y2="150" stroke="#bee3f8" strokeWidth="4" strokeDasharray="8 6" className="anim-flow" />
              <text x="210" y="190" fontSize="11" fontWeight="800" fill="#ffffff">Constant Flux Q</text>
            </g>
          )}

          {activeLaw === "energy" && (
            <g>
              {/* EGL Line sloping down */}
              <line x1="80" y1="35" x2="450" y2="65" stroke="#2563eb" strokeWidth="2.5" />
              <text x="180" y="30" fontSize="10.5" fontWeight="700" fill="#2563eb">EGL Drop = Head Loss h_L</text>
              <line x1="420" y1="35" x2="420" y2="65" stroke="#dc2626" strokeWidth="1.5" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
              <text x="428" y="52" fontSize="9.5" fontWeight="700" fill="#dc2626">h_L</text>
            </g>
          )}

          {activeLaw === "momentum" && (
            <g>
              {/* Hydrostatic thrusts F1 and F2 */}
              <line x1="50" y1="180" x2="115" y2="180" stroke="#dc2626" strokeWidth="3" markerEnd="url(#u2-arr)" />
              <text x="50" y="170" fontSize="10" fontWeight="700" fill="#dc2626">F₁ (Thrust)</text>

              <line x1="450" y1="175" x2="385" y2="175" stroke="#dc2626" strokeWidth="3" markerEnd="url(#u2-arr)" />
              <text x="405" y="165" fontSize="10" fontWeight="700" fill="#dc2626">F₂ (Thrust)</text>

              {/* Boundary shear arrow */}
              <line x1="300" y1="245" x2="180" y2="245" stroke="#ca8a04" strokeWidth="3" markerEnd="url(#u2-arr-gold)" />
              <text x="200" y="260" fontSize="10" fontWeight="700" fill="#ca8a04">Boundary Shear τ₀·P·L</text>
            </g>
          )}
        </svg>

        {/* LAW DETAILS CARD */}
        <div style={{ background: "#ffffff", padding: "14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <h4 style={{ margin: "0 0 6px", color: "#0f1f3d", fontSize: "1rem" }}>{cur.title}</h4>
          <p style={{ fontSize: "0.82rem", color: "#475569", margin: "0 0 8px", lineHeight: 1.4 }}>{cur.statement}</p>

          <div style={{ background: "#eff6ff", padding: "8px 10px", borderRadius: 4, borderLeft: "3px solid #2563eb", marginBottom: "8px" }}>
            <span style={{ fontSize: "0.75rem", color: "#1e40af", fontWeight: 700 }}>Governing Equation:</span>
            <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#1d4ed8", fontWeight: 700, marginTop: "2px" }}>
              {cur.formula}
            </div>
          </div>

          <div style={{ fontSize: "0.8rem", color: "#166534", background: "#f0fdf4", padding: "6px 8px", borderRadius: 4 }}>
            <b>Engineering Role:</b> {cur.consequence}
          </div>
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   7. S12: CHEZY CONTROL VOLUME SHEAR FORCE BALANCE
   ========================================================================= */
export function IlloChezyDerivation() {
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
          <polygon points="60,135 120,135 120,241" fill="#fca5a5" opacity="0.6" stroke="#ef4444" />
          <line x1="40" y1="205" x2="115" y2="205" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
          <text x="30" y="195" fontSize="11" fontWeight="700" fill="#dc2626">F₁ = γ·A·ȳ</text>

          <polygon points="620,180 560,180 560,287" fill="#fca5a5" opacity="0.6" stroke="#ef4444" />
          <line x1="640" y1="250" x2="565" y2="250" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#u2-arr)" />
          <text x="615" y="240" fontSize="11" fontWeight="700" fill="#dc2626">F₂ = γ·A·ȳ</text>

          <text x="280" y="135" fontSize="10" fontWeight="600" fill="#15803d">
            Uniform Flow: y₁ = y₂ ⇒ F₁ = F₂ (Hydrostatic forces cancel exactly!)
          </text>

          {/* Weight Vector at Centroid */}
          <g transform="translate(340, 215)">
            <circle cx="0" cy="0" r="5" fill="#ca8a04" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="#ca8a04" strokeWidth="3" markerEnd="url(#u2-arr-gold)" />
            <text x="8" y="55" fontSize="11" fontWeight="700" fill="#ca8a04">Weight W = γ·A·L</text>

            <line x1="0" y1="0" x2="58" y2="6" stroke="#16a34a" strokeWidth="3" markerEnd="url(#u2-arr)" />
            <text x="45" y="-5" fontSize="11" fontWeight="700" fill="#16a34a">W·sin θ = γ·A·L·S₀</text>
          </g>

          {/* Bed Shear Resistance Force */}
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
   8. S12: COWAN METHOD INTERACTIVE RIVER LANDSCAPE
   ========================================================================= */
export function IlloCowanLandscape() {
  const [mat, setMat] = useState(0.020);
  const [veg, setVeg] = useState(0.010);
  const [mBend, setMBend] = useState(1.15);

  const totalN = (mat + 0.005 + 0.005 + 0.010 + veg) * mBend;

  return (
    <Illo title="Cowan's Formula: Visualizing Channel Roughness Factors" kind="Interactive River Landscape"
          cap="Manning's n increases dramatically with bed roughness, vegetation, and meandering. Adjust the natural features to see the channel transform in real time.">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
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

        <div style={{ background: "#eff6ff", padding: "14px", borderRadius: 6, border: "1px solid #bfdbfe", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1e40af" }}>Composite Cowan Manning's n:</div>
          <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#1d4ed8", fontFamily: "monospace", margin: "4px 0" }}>
            n = {totalN.toFixed(4)}
          </div>
          <div style={{ fontSize: "0.82rem", color: "#3b82f6" }}>Formula: n = (n₀ + n₁ + n₂ + n₃ + n₄) · m₅</div>
        </div>
      </div>

      <svg viewBox="0 0 920 260" style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />
        <rect x="0" y="0" width="920" height="260" fill="#e2ecd8" />

        {mBend === 1.0 ? (
          <path d="M 0,100 L 920,100 L 920,160 L 0,160 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        ) : mBend === 1.15 ? (
          <path d="M 0,90 Q 230,40 460,130 T 920,130 L 920,190 Q 690,190 460,190 T 0,150 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        ) : (
          <path d="M 0,60 C 250,-20 200,230 460,130 C 720,30 680,260 920,170 L 920,240 C 680,320 650,100 460,190 C 230,280 180,50 0,120 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
        )}

        {veg > 0 && [80, 220, 360, 520, 680, 820].map((xx, i) => (
          <g key={i} transform={`translate(${xx}, ${i % 2 === 0 ? 40 : 200}) scale(${0.7 + veg * 10})`}>
            <circle cx="0" cy="0" r="14" fill="#38a169" opacity="0.9" />
            <circle cx="-6" cy="-4" r="10" fill="#48bb78" />
            <circle cx="6" cy="-4" r="11" fill="#2f855a" />
          </g>
        ))}

        <line x1="30" y1="130" x2="890" y2="130" stroke="#bee3f8" strokeWidth="2" strokeDasharray="10 6" className="anim-flow" />
      </svg>
    </Illo>
  );
}

/* =========================================================================
   9. S13: MOST ECONOMIC HYDRAULIC SECTIONS ARCHITECTURAL CARD
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
        <svg viewBox="0 0 500 320" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <CommonDefs />

          {selectedSec === "trap" && (
            <g transform="translate(250, 160)">
              <polygon points="-160,-80 160,-80 80,60 -80,60" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              <line x1="-190" y1="-80" x2="-160" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="-160" y1="-80" x2="-80" y2="60" stroke="#78350f" strokeWidth="4" />
              <line x1="-80" y1="60" x2="80" y2="60" stroke="#78350f" strokeWidth="4" />
              <line x1="80" y1="60" x2="160" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="160" y1="-80" x2="190" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="-160" y1="-80" x2="160" y2="-80" stroke="#0284c7" strokeWidth="3" />
              <path d="M -140,-80 A 140,140 0 0,0 140,-80 Z" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
              <circle cx="0" cy="-80" r="4" fill="#dc2626" />
              <line x1="0" y1="-80" x2="0" y2="60" stroke="#dc2626" strokeWidth="1.8" markerEnd="url(#u2-arr)" />
              <text x="6" y="-5" fontSize="12" fontWeight="700" fill="#dc2626">Radius r = y</text>
            </g>
          )}

          {selectedSec === "rect" && (
            <g transform="translate(250, 160)">
              <rect x="-140" y="-70" width="280" height="140" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              <line x1="-140" y1="-80" x2="-140" y2="70" stroke="#78350f" strokeWidth="4" />
              <line x1="-140" y1="70" x2="140" y2="70" stroke="#78350f" strokeWidth="4" />
              <line x1="140" y1="70" x2="140" y2="-80" stroke="#78350f" strokeWidth="4" />
              <line x1="-140" y1="-70" x2="140" y2="-70" stroke="#0284c7" strokeWidth="3" />
              <path d="M -140,-70 A 140,140 0 0,0 140,-70 Z" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />
              <circle cx="0" cy="-70" r="4" fill="#dc2626" />
              <text x="10" y="0" fontSize="12" fontWeight="700" fill="#dc2626">Radius r = y</text>
            </g>
          )}

          {selectedSec === "tri" && (
            <g transform="translate(250, 150)">
              <polygon points="-120,-70 120,-70 0,50" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2.5" />
              <line x1="-135" y1="-85" x2="0" y2="50" stroke="#78350f" strokeWidth="4" />
              <line x1="0" y1="50" x2="135" y2="-85" stroke="#78350f" strokeWidth="4" />
              <line x1="-120" y1="-70" x2="120" y2="-70" stroke="#0284c7" strokeWidth="3" />
              <text x="-25" y="80" fontSize="12" fontWeight="700" fill="#dc2626">Vertex = 90° (m = 1)</text>
            </g>
          )}

          {selectedSec === "circ" && (
            <g transform="translate(250, 160)">
              <circle cx="0" cy="0" r="110" fill="#f1f5f9" stroke="#334155" strokeWidth="5" />
              <path d="M -50,-98 A 110,110 0 1,0 50,-98 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
              <line x1="-50" y1="-98" x2="50" y2="-98" stroke="#16a34a" strokeWidth="2.5" />
              <text x="60" y="-94" fontSize="10" fontWeight="700" fill="#16a34a">y = 0.95 D (Q_max)</text>
              <line x1="-92" y1="-68" x2="92" y2="-68" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
              <text x="98" y="-64" fontSize="10" fontWeight="700" fill="#dc2626">y = 0.81 D (V_max)</text>
            </g>
          )}
        </svg>

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
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   10. S15: SPECIFIC ENERGY E-Y DIAGRAM & CRITICAL FLOW LAB
   ========================================================================= */
export function IlloSpecificEnergyCurve() {
  const [q, setQ] = useState(2.5);
  const [targetY, setTargetY] = useState(1.4);

  const g = 9.81;
  const yc = Math.cbrt((q * q) / g);
  const Ec = 1.5 * yc;
  const currentE = targetY + (q * q) / (2 * g * targetY * targetY);
  const currentFr = (q / targetY) / Math.sqrt(g * targetY);

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
          cap="Specific Energy E = y + V²/(2g). For any energy E > Ec, there exist two alternate depths: one supercritical and one subcritical. At minimum energy Ec, flow is critical (Fr = 1).">
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "12px", alignItems: "center" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "#fdfefe", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <CommonDefs />
          <line x1="60" y1={H - 40} x2={W - 20} y2={H - 40} stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x={W - 40} y={H - 18} fontSize="11" fontWeight="700" fill="#334155">Energy E (m)</text>

          <line x1="60" y1={H - 40} x2="60" y2="20" stroke="#64748b" strokeWidth="2" markerEnd="url(#u2-arr)" />
          <text x="20" y="30" fontSize="11" fontWeight="700" fill="#334155">Depth y (m)</text>

          <line x1={sx(0)} y1={sy(0)} x2={sx(maxY)} y2={sy(maxY)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
          <polyline points={points.join(" ")} fill="none" stroke="#2563eb" strokeWidth="3" />

          <circle cx={sx(Ec)} cy={sy(yc)} r="6" fill="#dc2626" />
          <line x1={sx(Ec)} y1={sy(yc)} x2={sx(Ec)} y2={H - 40} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="60" y1={sy(yc)} x2={sx(Ec)} y2={sy(yc)} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={sx(Ec) - 20} y={H - 24} fontSize="10" fontWeight="700" fill="#dc2626">Ec = {f2(Ec)}m</text>
          <text x="15" y={sy(yc) + 4} fontSize="10" fontWeight="700" fill="#dc2626">yc={f2(yc)}</text>

          <circle cx={sx(currentE)} cy={sy(targetY)} r="7" fill={currentFr > 1 ? "#ea580c" : "#16a34a"} stroke="#ffffff" strokeWidth="2" />
        </svg>

        <div style={{ background: "#f8fafc", padding: "14px", borderRadius: 8, border: "1px solid #cbd5e1" }}>
          <label className="f" style={{ display: "block", fontSize: "0.85rem", marginBottom: "8px" }}>
            Discharge intensity q: <b>{q} m²/(s·m)</b>
            <input type="range" min="1.0" max="5.0" step="0.25" value={q} onChange={e => setQ(+e.target.value)} />
          </label>
          <label className="f" style={{ display: "block", fontSize: "0.85rem", marginBottom: "12px" }}>
            Probe Depth y: <b>{targetY.toFixed(2)} m</b>
            <input type="range" min="0.3" max="3.0" step="0.05" value={targetY} onChange={e => setTargetY(+e.target.value)} />
          </label>
          <div style={{ padding: "10px", borderRadius: 6, background: currentFr > 1.05 ? "#fff7ed" : currentFr < 0.95 ? "#f0fdf4" : "#fef3c7" }}>
            <b>Froude Number Fr = {f2(currentFr)} ({currentFr > 1.05 ? "Supercritical" : currentFr < 0.95 ? "Subcritical" : "Critical Flow!"})</b>
          </div>
        </div>
      </div>
    </Illo>
  );
}

/* =========================================================================
   11. S16: CHANNEL TRANSITIONS (BED HUMPS & WIDTH CONSTRICTIONS)
   ========================================================================= */
export function IlloChannelTransitions() {
  const [transitionType, setTransitionType] = useState("hump");
  const [initialRegime, setInitialRegime] = useState("sub");

  const isHump = transitionType === "hump";
  const isSub = initialRegime === "sub";

  return (
    <Illo title="Channel Transitions: Flow Response over Humps & Width Contractions" kind="Physical Flume Simulation"
          cap="Subcritical flow dips over a bed hump and contracts through a width constriction. Supercritical flow heaves upwards!">
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.85rem", flexWrap: "wrap" }}>
        <button onClick={() => setTransitionType("hump")} style={{ padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer", background: isHump ? "#1a5f7a" : "#f1f5f9", color: isHump ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 700 }}>
          Channel Bed Hump (Δz)
        </button>
        <button onClick={() => setTransitionType("width")} style={{ padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer", background: !isHump ? "#1a5f7a" : "#f1f5f9", color: !isHump ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 700 }}>
          Width Contraction (Flume Throat B₂)
        </button>
        <button onClick={() => setInitialRegime("sub")} style={{ padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer", background: isSub ? "#16a34a" : "#f1f5f9", color: isSub ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 700 }}>
          Subcritical Inflow (Fr₁ &lt; 1)
        </button>
        <button onClick={() => setInitialRegime("super")} style={{ padding: "4px 12px", borderRadius: "14px", fontSize: "0.8rem", cursor: "pointer", background: !isSub ? "#ea580c" : "#f1f5f9", color: !isSub ? "#fff" : "#334155", border: "1px solid #cbd5e1", fontWeight: 700 }}>
          Supercritical Inflow (Fr₁ &gt; 1)
        </button>
      </div>

      <svg viewBox="0 0 920 280" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />
        {isHump ? (
          <g transform="translate(60, 20)">
            <path d="M 0,200 L 300,200 Q 400,140 500,200 L 800,200 L 800,240 L 0,240 Z" fill="url(#u2-soil)" stroke="#78350f" strokeWidth="3" />
            <line x1="400" y1="200" x2="400" y2="155" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="408" y="182" fontSize="11" fontWeight="700" fill="#dc2626">Hump Δz</text>

            {isSub ? (
              <path d="M 0,80 Q 250,80 400,115 Q 550,80 800,80 L 800,200 L 500,200 Q 400,140 300,200 L 0,200 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
            ) : (
              <path d="M 0,150 Q 250,150 400,95 Q 550,150 800,150 L 800,200 L 500,200 Q 400,140 300,200 L 0,200 Z" fill="url(#u2-water)" stroke="#2b6cb0" strokeWidth="2" />
            )}
            <line x1="80" y1={isSub ? 130 : 170} x2="720" y2={isSub ? 130 : 170} stroke="#bee3f8" strokeWidth="2" strokeDasharray="8 6" className="anim-flow" />
          </g>
        ) : (
          <g transform="translate(60, 20)">
            <path d="M 0,30 L 250,30 L 350,80 L 450,80 L 550,30 L 800,30 L 800,250 L 550,250 L 450,200 L 350,200 L 250,250 L 0,250 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="3" />
            <path d="M 0,30 L 250,30 L 350,80 L 450,80 L 550,30 L 800,30 L 800,250 L 550,250 L 450,200 L 350,200 L 250,250 L 0,250 Z" fill="url(#u2-water)" />
            <line x1="400" y1="80" x2="400" y2="200" stroke="#dc2626" strokeWidth="2" markerStart="url(#u2-arr)" markerEnd="url(#u2-arr)" />
            <text x="410" y="145" fontSize="11" fontWeight="700" fill="#dc2626">Throat B₂ (Constricted)</text>
          </g>
        )}
      </svg>
    </Illo>
  );
}

/* =========================================================================
   12. S18: DRAMATIC HYDRAULIC JUMP ROLLER & STILLING BASIN ANATOMY
   ========================================================================= */
export function IlloHydraulicJumpAnatomy() {
  const [froude, setFroude] = useState(4.5);
  const y1 = 0.5;
  const y2 = (y1 / 2) * (Math.sqrt(1 + 8 * froude * froude) - 1);
  const el = Math.pow(y2 - y1, 3) / (4 * y1 * y2);

  return (
    <Illo title="Anatomy of a Hydraulic Jump: Aerated Roller & Energy Dissipation" kind="Hydrodynamic Simulation"
          cap="When high-velocity shooting water (Fr₁ > 1) decelerates to tranquil subcritical flow (Fr₂ < 1), an intense standing shockwave forms with violent roller vortices, air entrainment, and high energy dissipation.">
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
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>Head Loss ΔE:</span>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#dc2626" }}>{f2(el)} m</div>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 920 320" style={{ width: "100%", background: "#f8fafc", borderRadius: 8, border: "1px solid #e2e8f0" }}>
        <CommonDefs />
        <rect x="40" y="250" width="840" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
        <path d="M 40,220 L 220,220 C 320,220 360,90 540,90 L 880,90 L 880,250 L 40,250 Z" fill="url(#u2-water)" />
        <path d="M 230,218 C 300,140 380,75 530,88 C 450,110 380,170 230,218 Z" fill="url(#u2-foam)" stroke="#ffffff" strokeWidth="2" />

        {[300, 370, 440].map((xx, i) => (
          <g key={i} transform={`translate(${xx}, ${150 - i * 20})`}>
            <circle cx="0" cy="0" r="16" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="14 6" className="anim-flow" />
            <circle cx="0" cy="0" r="3" fill="#ffffff" />
          </g>
        ))}
        <text x="320" y="110" fontSize="12" fontWeight="800" fill="#ffffff">Turbulent Roller Vortices</text>

        <line x1="50" y1="235" x2="230" y2="235" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="10 4" className="anim-flow" />
        <line x1="560" y1="130" x2="860" y2="130" stroke="#bee3f8" strokeWidth="2" strokeDasharray="10 6" className="anim-flow" />
      </svg>
    </Illo>
  );
}

/* =========================================================================
   EXPORT UNIT2 ILLUSTRATION COMPONENTS
   ========================================================================= */
export const UNIT2_ILLOS = {
  illo_pipe_vs_channel: IlloPipeVsChannel,
  illo_channel_classification: IlloChannelClassification,
  illo_forces_dimensionless: IlloForcesDimensionless,
  illo_geometric_parameters: IlloGeometricParameters,
  illo_isovels_probe: IlloIsovelsProbe,
  illo_conservation_laws: IlloConservationLaws,
  illo_chezy_shear: IlloChezyDerivation,
  illo_cowan_landscape: IlloCowanLandscape,
  illo_economic_sections: IlloEconomicSections,
  illo_specific_energy: IlloSpecificEnergyCurve,
  illo_channel_transitions: IlloChannelTransitions,
  illo_hydraulic_jump: IlloHydraulicJumpAnatomy
};
