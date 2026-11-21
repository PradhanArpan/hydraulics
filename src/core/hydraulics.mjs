// hydraulics-core: pure functions shared by the lessons, widgets and quizzes.
// Rectangular channel, SI units, q = discharge per metre width (m^2/s).
// Tested in tools/test-core.mjs against textbook values. Keep this file free of UI code.

export const G = 9.81;

const bisect = (f, lo, hi, n = 80) => {
  let flo = f(lo);
  for (let i = 0; i < n; i++) {
    const mid = (lo + hi) / 2;
    const fm = f(mid);
    if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; }
  }
  return (lo + hi) / 2;
};

export const velocity = (q, y) => q / y;
export const froude = (q, y) => q / y / Math.sqrt(G * y);
export const criticalDepth = q => Math.cbrt((q * q) / G);
export const specificEnergy = (y, q) => y + (q * q) / (2 * G * y * y);
export const minEnergy = q => 1.5 * criticalDepth(q);

// The other depth that carries the same q at the same specific energy.
export function alternateDepth(y, q) {
  const E = specificEnergy(y, q);
  const yc = criticalDepth(q);
  const f = d => specificEnergy(d, q) - E;
  if (y >= yc) return bisect(f, 1e-4, yc); // supercritical partner
  return bisect(f, yc, E + 1);              // subcritical partner (y < E always)
}

// Flow over a bed step (hump) of height dz, starting at depth y1.
// Returns { choked, dzMax, y2, E1, E2 }.
export function humpResponse(q, y1, dz) {
  const E1 = specificEnergy(y1, q);
  const yc = criticalDepth(q);
  const dzMax = Math.max(0, E1 - 1.5 * yc);
  if (dz > dzMax + 1e-12) return { choked: true, dzMax, y2: yc, E1, E2: E1 - dz };
  const E2 = E1 - dz;
  const f = d => specificEnergy(d, q) - E2;
  const y2 = y1 >= yc ? bisect(f, yc, E2 + 1) : bisect(f, 1e-4, yc);
  return { choked: false, dzMax, y2, E1, E2 };
}

// ---- hydraulic jump (rectangular, horizontal) ----
export const sequentDepth = (y1, Fr1) => (y1 / 2) * (Math.sqrt(1 + 8 * Fr1 * Fr1) - 1);
export const jumpEnergyLoss = (y1, y2) => Math.pow(y2 - y1, 3) / (4 * y1 * y2);
export const jumpLength = y2 => 6 * y2; // rough rule of thumb; see the textbook chart for design
export const specificForce = (y, q) => (q * q) / (G * y) + (y * y) / 2; // per unit width, divided by gamma

// The depth on the other side of a jump: same q, same specific force M.
export function conjugateDepth(y, q) {
  const yc = criticalDepth(q);
  const M = specificForce(y, q);
  const f = d => specificForce(d, q) - M;
  return y >= yc ? bisect(f, 1e-4, yc) : bisect(f, yc, Math.sqrt(2 * M) + 1e-6);
}

export function jumpType(Fr1) {
  if (Fr1 < 1) return { key: "none", name: "No jump (flow is subcritical)" };
  if (Fr1 < 1.7) return { key: "undular", name: "Undular jump" };
  if (Fr1 < 2.5) return { key: "weak", name: "Weak jump" };
  if (Fr1 < 4.5) return { key: "oscillating", name: "Oscillating jump" };
  if (Fr1 <= 9) return { key: "steady", name: "Steady jump" };
  return { key: "strong", name: "Strong jump" };
}

// Everything about a jump from the supercritical state (y1, Fr1).
export function jump(y1, Fr1) {
  const V1 = Fr1 * Math.sqrt(G * y1);
  const q = V1 * y1;
  const y2 = sequentDepth(y1, Fr1);
  const V2 = q / y2;
  const E1 = y1 + (V1 * V1) / (2 * G);
  const E2 = y2 + (V2 * V2) / (2 * G);
  const dE = jumpEnergyLoss(y1, y2);
  return {
    V1, V2, q, y1, y2, E1, E2, dE,
    lossFrac: dE / E1,
    Fr2: V2 / Math.sqrt(G * y2),
    length: jumpLength(y2),
    powerKWperM: G * q * dE, // rho*g*q*dE in kW per metre width (rho = 1000 kg/m^3)
    type: jumpType(Fr1)
  };
}

// ---- channel geometry elements ----
export function rectGeometry(b, y) {
  const A = b * y;
  const P = b + 2 * y;
  const R = A / P;
  const T = b;
  const D = y;
  return { A, P, R, T, D };
}

export function trapGeometry(b, y, m) {
  const A = (b + m * y) * y;
  const P = b + 2 * y * Math.sqrt(1 + m * m);
  const R = A / P;
  const T = b + 2 * m * y;
  const D = A / T;
  return { A, P, R, T, D };
}

export function triGeometry(m, y) {
  const A = m * y * y;
  const P = 2 * y * Math.sqrt(1 + m * m);
  const R = A / P;
  const T = 2 * m * y;
  const D = y / 2;
  return { A, P, R, T, D };
}

export function circGeometry(dia, y) {
  y = Math.max(1e-4, Math.min(dia - 1e-4, y));
  const r = dia / 2;
  const theta = 2 * Math.acos(Math.max(-1, Math.min(1, 1 - 2 * y / dia)));
  const A = (dia * dia / 8) * (theta - Math.sin(theta));
  const P = (dia * theta) / 2;
  const R = A / P;
  const T = 2 * Math.sqrt(Math.max(0, y * (dia - y)));
  const D = A / (T || 1e-4);
  return { A, P, R, T, D, theta };
}

// ---- uniform flow (Manning & Chezy) ----
export const manningV = (R, S, n) => (1 / n) * Math.pow(R, 2 / 3) * Math.sqrt(S);
export const manningQ = (A, R, S, n) => A * manningV(R, S, n);
export const chezyV = (C, R, S) => C * Math.sqrt(R * S);

// Cowan's composite roughness: n = (n0 + n1 + n2 + n3 + n4) * m5
export const cowanN = (n0, n1, n2, n3, n4, m5 = 1.0) => (n0 + n1 + n2 + n3 + n4) * m5;

// ---- most economical sections ----
// Rectangular: b = 2y, R = y/2
export function economicalRect(A) {
  const y = Math.sqrt(A / 2);
  const b = 2 * y;
  const P = 4 * y;
  const R = y / 2;
  return { b, y, P, R, A };
}

// Trapezoidal: half-hexagon (m = 1/sqrt(3) = 0.57735, side angle 60 deg)
export function economicalTrap(A) {
  const m = 1 / Math.sqrt(3);
  const y = Math.sqrt(A / Math.sqrt(3));
  const b = (2 / Math.sqrt(3)) * y;
  const P = 2 * Math.sqrt(3) * y;
  const R = y / 2;
  return { b, y, m, P, R, A };
}

// Triangular: 90 deg vertex (m = 1)
export function economicalTri(A) {
  const m = 1;
  const y = Math.sqrt(A);
  const T = 2 * y;
  const P = 2 * Math.sqrt(2) * y;
  const R = y / (2 * Math.sqrt(2));
  return { m, y, T, P, R, A };
}

// Normal depth solver for rectangular channel: solve manningQ(A, R, S, n) - Q = 0
export function solveNormalDepthRect(Q, b, S, n) {
  const f = y => manningQ(b * y, (b * y) / (b + 2 * y), S, n) - Q;
  return bisect(f, 1e-4, 20);
}

// ---- transitions: hump and width contraction (Day 13; added by Claude) ----
// Largest discharge per metre width a rectangular section can pass at specific energy E (flow is critical).
export const qMax = E => Math.sqrt(G) * Math.pow((2 * E) / 3, 1.5);

// Depth that carries q at specific energy E, on the subcritical ("sub") or supercritical ("sup") branch.
// Returns NaN if E is below the minimum energy for q.
export function depthAtEnergy(E, q, branch) {
  const yc = criticalDepth(q);
  if (E < 1.5 * yc - 1e-12) return NaN;
  const f = d => specificEnergy(d, q) - E;
  return branch === "sup" ? bisect(f, 1e-4, yc) : bisect(f, yc, E + 1);
}

// Width contraction from b1 to b2 (no energy loss), upstream depth y1 carrying total discharge Q.
// Returns { choked, bMin, y2, q2, E1 }. bMin is the narrowest width that still passes Q.
export function contractionResponse(Q, b1, y1, b2) {
  const q1 = Q / b1, q2 = Q / b2;
  const E1 = specificEnergy(y1, q1);
  const branch = y1 >= criticalDepth(q1) ? "sub" : "sup";
  const bMin = Q / qMax(E1);
  if (b2 < bMin - 1e-12) return { choked: true, bMin, y2: criticalDepth(Q / bMin), q2, E1 };
  return { choked: false, bMin, y2: depthAtEnergy(E1, q2, branch), q2, E1 };
}

// Subcritical flow meets a hump too high to pass (dz > E1 - Ec): the water piles up upstream until
// E1' = Ec + dz. Returns the new upstream depth y1'. Afflux = y1' - y1.
export function chokedUpstream(q, dz) {
  return depthAtEnergy(1.5 * criticalDepth(q) + dz, q, "sub");
}

