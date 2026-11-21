import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function ShapeOptimizer() {
  const [mode, setMode] = useState("rect"); // "rect", "trap", "circle"
  const [A, setA] = useState(8.0); // m^2 fixed area
  const [byRatio, setByRatio] = useState(2.0); // b/y for rect
  const [sideAngle, setSideAngle] = useState(60); // deg for trap
  const [pipeYFrac, setPipeYFrac] = useState(0.938); // y/D

  const S0 = 0.001, n = 0.015;

  // Rectangular calculations
  const yRect = Math.sqrt(A / byRatio);
  const bRect = byRatio * yRect;
  const geomRect = H.rectGeometry(bRect, yRect);
  const QRect = H.manningQ(geomRect.A, geomRect.R, S0, n);

  // Trapezoid calculations (assume economical bottom width b = 2y(sec theta - tan theta))
  const m = 1 / Math.tan((sideAngle * Math.PI) / 180);
  const yTrap = Math.sqrt(A / (2 * Math.sqrt(1 + m * m) - m));
  const bTrap = 2 * yTrap * (Math.sqrt(1 + m * m) - m);
  const geomTrap = H.trapGeometry(bTrap, yTrap, m);
  const QTrap = H.manningQ(geomTrap.A, geomTrap.R, S0, n);

  // Circular calculations
  const D = 2.0;
  const yCirc = pipeYFrac * D;
  const geomCirc = H.circGeometry(D, yCirc);
  const geomFull = H.circGeometry(D, D * 0.999);
  const VFull = H.manningV(D / 4, S0, n);
  const QFull = (Math.PI * D * D / 4) * VFull;
  const VCirc = H.manningV(geomCirc.R, S0, n);
  const QCirc = geomCirc.A * VCirc;
  const qRatio = QCirc / QFull;
  const vRatio = VCirc / VFull;

  const svgW = 540, svgH = 210;

  return (
    <Sim title="Most Economical (Hydraulically Efficient) Sections">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={mode}
          onChange={setMode}
          label="Section Geometry"
          options={[
            ["rect", "Rectangular (b = 2y)"],
            ["trap", "Trapezoid (Half-Hexagon)"],
            ["circle", "Circular (Crown Effect)"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--navy)", fontWeight: 600 }}>
          {mode === "circle" ? `y/D = ${f2(pipeYFrac)} (Q/Q_full = ${f2(qRatio)})` : `Fixed Area A = ${f1(A)} m²`}
        </span>
      </div>

      {mode === "rect" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
              {/* Curve of P vs b/y */}
              <text x="30" y="24" fontSize="12" fill="var(--navy)" fontWeight="bold">
                Wetted Perimeter P vs Aspect Ratio (b/y):
              </text>
              <line x1="50" y1="165" x2="350" y2="165" stroke="#94a3b8" />
              <line x1="50" y1="40" x2="50" y2="165" stroke="#94a3b8" />
              <text x="50" y="180" fontSize="10" fill="var(--tl)">b/y = 0.5</text>
              <text x="180" y="180" fontSize="10" fill="var(--tl)" fontWeight="bold">b/y = 2.0 (Min P)</text>
              <text x="320" y="180" fontSize="10" fill="var(--tl)">b/y = 6.0</text>

              {/* Generate P curve */}
              <polyline
                fill="none"
                stroke="#ea580c"
                strokeWidth="2.5"
                points={[0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0].map(r => {
                  const yr = Math.sqrt(A / r);
                  const pr = r * yr + 2 * yr;
                  const x = 50 + ((r - 0.5) / 5.5) * 300;
                  const yPix = 165 - ((pr - 7.5) / 8) * 110;
                  return `${x},${yPix}`;
                }).join(" ")}
              />

              {/* Optimum marker at b/y = 2.0 */}
              <circle cx="132" cy={165 - ((4 * Math.sqrt(A / 2) - 7.5) / 8) * 110} r="5" fill="#16a34a" />
              <line x1="132" y1="40" x2="132" y2="165" stroke="#16a34a" strokeDasharray="3 3" />
              <text x="140" y="70" fontSize="10" fill="#16a34a" fontWeight="bold">Min P = 4y (Max Q)</text>

              {/* Current operating point */}
              <circle cx={50 + ((byRatio - 0.5) / 5.5) * 300} cy={165 - ((geomRect.P - 7.5) / 8) * 110} r="6" fill="#0284c7" />

              {/* Cross-section preview on the right */}
              <g transform="translate(380, 50)">
                <rect x="0" y="0" width="130" height="110" fill="#ffffff" stroke="#cbd5e1" rx="4" />
                <rect
                  x={65 - (bRect * 12) / 2}
                  y={95 - yRect * 24}
                  width={bRect * 12}
                  height={yRect * 24}
                  fill="rgba(14, 165, 233, 0.35)"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                <text x="65" y="105" textAnchor="middle" fontSize="10" fill="var(--tl)">
                  b = {f1(bRect)} m, y = {f1(yRect)} m
                </text>
              </g>

              <text x="30" y="200" fontSize="11" fill="var(--tl)">
                {Math.abs(byRatio - 2.0) < 0.1 ? "★ Economical: b = 2y and R = y/2 gives lowest wetted perimeter for maximum discharge!" : "Adjust b/y slider to reach the lowest perimeter point (b/y = 2.0)."}
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Slider label="Fixed Area (A)" value={A} min={4.0} max={16.0} step={1.0} unit="m²" onChange={setA} format={f1} />
            <Slider label="Aspect Ratio (b/y)" value={byRatio} min={0.5} max={6.0} step={0.1} unit="" onChange={setByRatio} format={f1} />
            <button
              type="button"
              className="fb-btn fb-btn--primary"
              style={{ padding: "6px 10px", fontSize: "11.5px", background: "#0284c7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
              onClick={() => setByRatio(2.0)}
            >
              Snap to Economical (b = 2y)
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Kpi v={f2(geomRect.P) + " m"} l="Wetted P" tone={Math.abs(byRatio - 2) < 0.1 ? "good" : ""} />
              <Kpi v={f2(geomRect.R) + " m"} l="Hyd. Radius R" tone="good" />
              <Kpi v={f2(QRect) + " m³/s"} l="Discharge Q" tone={Math.abs(byRatio - 2) < 0.1 ? "good" : ""} />
              <Kpi v={f2(geomRect.R / yRect)} l="R / y (Goal: 0.50)" />
            </div>
          </div>
        </div>
      )}

      {mode === "trap" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
              <text x="30" y="24" fontSize="12" fill="var(--navy)" fontWeight="bold">
                Trapezoidal Half-Hexagon: Side Angle θ = {sideAngle}° (m = {f2(m)})
              </text>
              <line x1="50" y1="165" x2="350" y2="165" stroke="#94a3b8" />
              <line x1="50" y1="40" x2="50" y2="165" stroke="#94a3b8" />
              <text x="50" y="180" fontSize="10" fill="var(--tl)">θ = 30°</text>
              <text x="180" y="180" fontSize="10" fill="var(--tl)" fontWeight="bold">θ = 60° (Half-Hexagon)</text>
              <text x="320" y="180" fontSize="10" fill="var(--tl)">θ = 85°</text>

              {/* Generate P curve vs side angle */}
              <polyline
                fill="none"
                stroke="#ea580c"
                strokeWidth="2.5"
                points={[30, 40, 50, 60, 70, 80, 85].map(deg => {
                  const mt = 1 / Math.tan((deg * Math.PI) / 180);
                  const yt = Math.sqrt(A / (2 * Math.sqrt(1 + mt * mt) - mt));
                  const bt = 2 * yt * (Math.sqrt(1 + mt * mt) - mt);
                  const pt = bt + 2 * yt * Math.sqrt(1 + mt * mt);
                  const x = 50 + ((deg - 30) / 55) * 300;
                  const yPix = 165 - ((pt - 6) / 8) * 110;
                  return `${x},${yPix}`;
                }).join(" ")}
              />

              {/* Marker at 60 deg */}
              <circle cx="213" cy={165 - ((2 * Math.sqrt(3) * Math.sqrt(A / Math.sqrt(3)) - 6) / 8) * 110} r="5" fill="#16a34a" />
              <line x1="213" y1="40" x2="213" y2="165" stroke="#16a34a" strokeDasharray="3 3" />
              <text x="220" y="60" fontSize="10" fill="#16a34a" fontWeight="bold">θ = 60°: Min P (R = y/2)</text>

              {/* Current operating marker */}
              <circle cx={50 + ((sideAngle - 30) / 55) * 300} cy={165 - ((geomTrap.P - 6) / 8) * 110} r="6" fill="#0284c7" />

              {/* Cross-section shape */}
              <g transform="translate(380, 45)">
                <rect x="0" y="0" width="135" height="115" fill="#ffffff" stroke="#cbd5e1" rx="4" />
                <polygon
                  points={`67,100 ${67 - (bTrap * 12) / 2},100 ${67 - (bTrap * 12) / 2 - m * yTrap * 12},${100 - yTrap * 22} ${67 + (bTrap * 12) / 2 + m * yTrap * 12},${100 - yTrap * 22} ${67 + (bTrap * 12) / 2},100`}
                  fill="rgba(14, 165, 233, 0.35)"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                <circle cx="67" cy={100 - yTrap * 22} r={yTrap * 22} fill="none" stroke="#16a34a" strokeDasharray="2 2" />
                <text x="67" y="110" textAnchor="middle" fontSize="9.5" fill="var(--tl)">Inscribed Semicircle</text>
              </g>

              <text x="30" y="200" fontSize="11" fill="var(--tl)">
                {sideAngle === 60 ? "★ The half-hexagon circumscribes a semicircle with center on the water surface and radius R = y/2!" : "A 60° side slope (m = 1/√3 = 0.577) minimizes lining perimeter and maximizes discharge."}
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Slider label="Side Angle θ" value={sideAngle} min={30} max={85} step={5} unit="°" onChange={setSideAngle} format={v => v.toFixed(0)} />
            <button
              type="button"
              className="fb-btn fb-btn--primary"
              style={{ padding: "6px 10px", fontSize: "11.5px", background: "#0284c7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
              onClick={() => setSideAngle(60)}
            >
              Snap to 60° (Half-Hexagon)
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Kpi v={f2(geomTrap.P) + " m"} l="Wetted P" tone={sideAngle === 60 ? "good" : ""} />
              <Kpi v={f2(geomTrap.R) + " m"} l="Hyd. Radius R" tone="good" />
              <Kpi v={f2(QTrap) + " m³/s"} l="Discharge Q" tone={sideAngle === 60 ? "good" : ""} />
              <Kpi v={f2(geomTrap.R / yTrap)} l="R / y (Goal: 0.50)" />
            </div>
          </div>
        </div>
      )}

      {mode === "circle" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
            <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
              <text x="30" y="22" fontSize="12" fill="var(--navy)" fontWeight="bold">
                Circular Pipe: Relative Q and V vs Depth Fraction (y/D):
              </text>

              {/* Axes */}
              <line x1="50" y1="165" x2="350" y2="165" stroke="#94a3b8" />
              <line x1="50" y1="35" x2="50" y2="165" stroke="#94a3b8" />
              <text x="50" y="180" fontSize="10" fill="var(--tl)">0.0</text>
              <text x="180" y="180" fontSize="10" fill="var(--tl)">0.5</text>
              <text x="280" y="180" fontSize="10" fill="#0284c7" fontWeight="bold">0.81 (V_max)</text>
              <text x="325" y="180" fontSize="10" fill="#16a34a" fontWeight="bold">0.938 (Q_max)</text>

              {/* Reference 1.0 line */}
              <line x1="50" y1={165 - (1.0 / 1.3) * 120} x2="350" y2={165 - (1.0 / 1.3) * 120} stroke="#cbd5e1" strokeDasharray="3 3" />
              <text x="355" y={168 - (1.0 / 1.3) * 120} fontSize="10" fill="var(--tl)">Full pipe (1.0)</text>

              {/* Q/Q_full curve */}
              <polyline
                fill="none"
                stroke="#16a34a"
                strokeWidth="2.5"
                points={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.938, 0.97, 1.0].map(yf => {
                  const g = H.circGeometry(D, yf * D);
                  const qr = (g.A * Math.pow(g.R, 2 / 3)) / ((Math.PI * D * D / 4) * Math.pow(D / 4, 2 / 3));
                  const x = 50 + yf * 300;
                  const yPix = 165 - (qr / 1.3) * 120;
                  return `${x},${yPix}`;
                }).join(" ")}
              />

              {/* V/V_full curve */}
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                points={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.81, 0.85, 0.9, 0.95, 1.0].map(yf => {
                  const g = H.circGeometry(D, yf * D);
                  const vr = Math.pow(g.R / (D / 4), 2 / 3);
                  const x = 50 + yf * 300;
                  const yPix = 165 - (vr / 1.3) * 120;
                  return `${x},${yPix}`;
                }).join(" ")}
              />

              {/* Peak points */}
              <circle cx={50 + 0.938 * 300} cy={165 - (1.075 / 1.3) * 120} r="5" fill="#16a34a" />
              <text x={50 + 0.938 * 300 - 35} y={165 - (1.075 / 1.3) * 120 - 8} fontSize="10" fill="#16a34a" fontWeight="bold">
                Q_max = 1.075 Q_full
              </text>

              <circle cx={50 + 0.81 * 300} cy={165 - (1.14 / 1.3) * 120} r="5" fill="#0284c7" />
              <text x={50 + 0.81 * 300 - 35} y={165 - (1.14 / 1.3) * 120 - 8} fontSize="10" fill="#0284c7" fontWeight="bold">
                V_max = 1.14 V_full
              </text>

              {/* Cross-section visualizer on the right */}
              <g transform="translate(390, 45)">
                <circle cx="60" cy="60" r="50" fill="#ffffff" stroke="#64748b" strokeWidth="3" />
                <path
                  d={`M ${60 - Math.sqrt(Math.max(0, 2500 - Math.pow(60 - (110 - pipeYFrac * 100), 2)))} ${110 - pipeYFrac * 100} A 50 50 0 ${pipeYFrac > 0.5 ? 1 : 0} 0 ${60 + Math.sqrt(Math.max(0, 2500 - Math.pow(60 - (110 - pipeYFrac * 100), 2)))} ${110 - pipeYFrac * 100} Z`}
                  fill="rgba(14, 165, 233, 0.4)"
                  stroke="#0284c7"
                />
                <text x="60" y="125" textAnchor="middle" fontSize="10" fill="var(--tl)">
                  Depth y = {f2(yCirc)} m
                </text>
              </g>

              <text x="30" y="200" fontSize="11" fill="var(--tl)">
                Why does flow peak before the pipe is full? Because the top roof adds heavy wetted perimeter friction while adding almost no extra area!
              </text>
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Slider label="Depth Fraction (y/D)" value={pipeYFrac} min={0.1} max={0.99} step={0.01} unit="" onChange={setPipeYFrac} format={f2} />
            <div style={{ display: "flex", gap: 6 }}>
              <button
                type="button"
                className="fb-btn"
                style={{ flex: 1, padding: "5px", fontSize: "11px", background: "#16a34a", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                onClick={() => setPipeYFrac(0.938)}
              >
                Max Q (0.938)
              </button>
              <button
                type="button"
                className="fb-btn"
                style={{ flex: 1, padding: "5px", fontSize: "11px", background: "#0284c7", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                onClick={() => setPipeYFrac(0.810)}
              >
                Max V (0.810)
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Kpi v={f2(qRatio) + " ×"} l="Q / Q_full" tone={qRatio > 1.0 ? "good" : ""} />
              <Kpi v={f2(vRatio) + " ×"} l="V / V_full" tone={vRatio > 1.0 ? "good" : ""} />
              <Kpi v={f2(QCirc) + " m³/s"} l="Actual Q" />
              <Kpi v={f2(geomCirc.R) + " m"} l="Hyd. Radius R" />
            </div>
          </div>
        </div>
      )}
    </Sim>
  );
}
