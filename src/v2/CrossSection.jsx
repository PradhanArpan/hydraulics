import React, { useState } from "react";
import * as H from "../core/hydraulics.mjs";
import { Sim, Slider, Seg, Kpi, f1, f2 } from "./ui.jsx";

export default function CrossSection() {
  const [shape, setShape] = useState("trapezoid");
  const [b, setB] = useState(3.0);
  const [y, setY] = useState(1.5);
  const [m, setM] = useState(1.0);
  const [dia, setDia] = useState(2.0);

  let g = { A: 0, P: 0, R: 0, T: 0, D: 0 };
  if (shape === "rect") g = H.rectGeometry(b, y);
  else if (shape === "trapezoid") g = H.trapGeometry(b, y, m);
  else if (shape === "triangle") g = H.triGeometry(m, y);
  else if (shape === "circle") g = H.circGeometry(dia, y);

  // SVG dimensions & coordinate transforms
  const svgW = 540, svgH = 240, bedY = 200, cx = svgW / 2;
  const scale = 55; // pixels per metre

  let waterPath = "", bedPath = "";
  if (shape === "rect") {
    const hw = (b * scale) / 2;
    const h = y * scale;
    waterPath = `M ${cx - hw} ${bedY} L ${cx + hw} ${bedY} L ${cx + hw} ${bedY - h} L ${cx - hw} ${bedY - h} Z`;
    bedPath = `M ${cx - hw - 30} ${bedY - h - 20} L ${cx - hw} ${bedY} L ${cx + hw} ${bedY} L ${cx + hw + 30} ${bedY - h - 20}`;
  } else if (shape === "trapezoid") {
    const hw = (b * scale) / 2;
    const h = y * scale;
    const twHw = hw + m * h;
    waterPath = `M ${cx - hw} ${bedY} L ${cx + hw} ${bedY} L ${cx + twHw} ${bedY - h} L ${cx - twHw} ${bedY - h} Z`;
    bedPath = `M ${cx - twHw - 25} ${bedY - h - 25} L ${cx - hw} ${bedY} L ${cx + hw} ${bedY} L ${cx + twHw + 25} ${bedY - h - 25}`;
  } else if (shape === "triangle") {
    const h = y * scale;
    const twHw = m * h;
    waterPath = `M ${cx} ${bedY} L ${cx + twHw} ${bedY - h} L ${cx - twHw} ${bedY - h} Z`;
    bedPath = `M ${cx - twHw - 25} ${bedY - h - 25} L ${cx} ${bedY} L ${cx + twHw + 25} ${bedY - h - 25}`;
  } else if (shape === "circle") {
    const r = (dia * scale) / 2;
    const cy = bedY - r;
    const h = y * scale;
    const waterY = bedY - h;
    const dy = waterY - cy;
    const halfChord = Math.sqrt(Math.max(0, r * r - dy * dy));
    const startAng = Math.atan2(dy, -halfChord);
    const endAng = Math.atan2(dy, halfChord);
    waterPath = `M ${cx - halfChord} ${waterY} A ${r} ${r} 0 ${y > dia / 2 ? 1 : 0} 0 ${cx + halfChord} ${waterY} Z`;
    bedPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 0 ${cx} ${cy + r} A ${r} ${r} 0 1 0 ${cx} ${cy - r}`;
  }

  return (
    <Sim title="Channel Geometry & Section Elements">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <Seg
          value={shape}
          onChange={setShape}
          label="Channel Shape"
          options={[
            ["rect", "Rectangle"],
            ["trapezoid", "Trapezoid"],
            ["triangle", "Triangle"],
            ["circle", "Circular Pipe"]
          ]}
        />
        <span style={{ fontSize: "12px", color: "var(--tl)", fontWeight: 500 }}>
          Hydraulic Radius: <b>R = A / P = {f2(g.R)} m</b>
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 240px", gap: 16 }}>
        <div style={{ background: "#f8fafc", borderRadius: 8, padding: 8, border: "1px solid var(--g200)" }}>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }}>
            {shape === "circle" ? (
              <path d={bedPath} fill="none" stroke="#64748b" strokeWidth="4" />
            ) : (
              <path d={bedPath} fill="none" stroke="#78350f" strokeWidth="6" strokeLinecap="round" />
            )}
            <path d={waterPath} fill="rgba(14, 165, 233, 0.35)" stroke="#0284c7" strokeWidth="2" />

            {/* Free surface line */}
            {shape !== "circle" && (
              <line
                x1={shape === "rect" ? cx - (b * scale) / 2 : cx - (shape === "triangle" ? m * y * scale : (b * scale) / 2 + m * y * scale)}
                y1={bedY - y * scale}
                x2={shape === "rect" ? cx + (b * scale) / 2 : cx + (shape === "triangle" ? m * y * scale : (b * scale) / 2 + m * y * scale)}
                y2={bedY - y * scale}
                stroke="#0284c7"
                strokeWidth="3"
              />
            )}

            {/* Depth label */}
            <text x="24" y="32" fill="var(--navy)" fontSize="13" fontWeight="bold">
              {shape.toUpperCase()}: Depth y = {f2(y)} m
            </text>
            <text x="24" y="50" fill="var(--tl)" fontSize="11">
              Top Width T = {f2(g.T)} m | Hydraulic Depth D = A/T = {f2(g.D)} m
            </text>

            {/* Legend inside svg */}
            <g transform="translate(360, 24)">
              <rect width="12" height="12" fill="rgba(14, 165, 233, 0.4)" stroke="#0284c7" />
              <text x="18" y="10" fontSize="11" fill="var(--text)">Water Area (A)</text>
              <line x1="0" y1="24" x2="14" y2="24" stroke="#78350f" strokeWidth="3" />
              <text x="18" y="27" fontSize="11" fill="var(--text)">Wetted Perimeter (P)</text>
            </g>
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Slider label="Depth (y)" value={y} min={0.2} max={shape === "circle" ? dia * 0.95 : 3.0} step={0.05} unit="m" onChange={setY} format={f2} />
          {shape !== "triangle" && shape !== "circle" && (
            <Slider label="Bed Width (b)" value={b} min={1.0} max={6.0} step={0.2} unit="m" onChange={setB} format={f1} />
          )}
          {(shape === "trapezoid" || shape === "triangle") && (
            <Slider label="Side Slope (1:m)" value={m} min={0.2} max={2.5} step={0.1} unit="" onChange={setM} format={f1} />
          )}
          {shape === "circle" && (
            <Slider label="Diameter (D)" value={dia} min={1.0} max={4.0} step={0.2} unit="m" onChange={setDia} format={f1} />
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 4 }}>
            <Kpi v={f2(g.A) + " m²"} l="Area (A)" />
            <Kpi v={f2(g.P) + " m"} l="Wetted P" />
            <Kpi v={f2(g.R) + " m"} l="Hyd. Radius (R)" tone="good" />
            <Kpi v={f2(g.T) + " m"} l="Top Width (T)" />
          </div>
        </div>
      </div>
    </Sim>
  );
}
