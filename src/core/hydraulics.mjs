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

// ============================================================================
// UNIT I: BOUNDARY LAYER THEORY (CO1)
// ============================================================================

export const reynolds = (U, L, nu = 1e-6) => (U * L) / nu;

// Laminar boundary layer on a flat plate (Blasius solution)
export function blLaminar(x, U, nu = 1e-6, rho = 1000) {
  const Rex = reynolds(U, x, nu);
  if (Rex <= 0) return { Rex: 0, delta: 0, Cf: 0, tau0: 0, deltaStar: 0, theta: 0, H: 2.59 };
  const sqrtRe = Math.sqrt(Rex);
  const delta = (5.0 * x) / sqrtRe;
  const Cf = 0.664 / sqrtRe;
  const tau0 = Cf * 0.5 * rho * U * U;
  const deltaStar = (1.72 * x) / sqrtRe;
  const theta = (0.664 * x) / sqrtRe;
  const H = deltaStar / theta; // ~2.59
  return { Rex, delta, Cf, tau0, deltaStar, theta, H };
}

// Turbulent boundary layer (1/7th power law)
export function blTurbulent(x, U, nu = 1e-6, rho = 1000) {
  const Rex = reynolds(U, x, nu);
  if (Rex <= 0) return { Rex: 0, delta: 0, Cf: 0, tau0: 0, deltaStar: 0, theta: 0, H: 1.286, uStar: 0, deltaPrime: 0 };
  const reFifth = Math.pow(Rex, 0.2);
  const delta = (0.37 * x) / reFifth;
  const Cf = 0.059 / reFifth;
  const tau0 = Cf * 0.5 * rho * U * U;
  const uStar = Math.sqrt(tau0 / rho);
  const deltaPrime = uStar > 0 ? (11.6 * nu) / uStar : 0;
  const deltaStar = delta / 8;
  const theta = (7 * delta) / 72;
  const H = deltaStar / theta; // 1.2857
  return { Rex, delta, Cf, tau0, deltaStar, theta, H, uStar, deltaPrime };
}

// Theoretical deficit thickness ratios for assumed velocity profiles (u/U = f(eta))
export function blDeficitRatios(profile) {
  if (profile === "linear") {
    // u/U = eta
    return { name: "Linear", deltaStarFrac: 0.5, thetaFrac: 1 / 6, H: 3.0 };
  } else if (profile === "parabolic") {
    // u/U = 2*eta - eta^2
    return { name: "Parabolic", deltaStarFrac: 1 / 3, thetaFrac: 2 / 15, H: 2.5 };
  } else if (profile === "cubic") {
    // u/U = 1.5*eta - 0.5*eta^3
    return { name: "Cubic", deltaStarFrac: 3 / 8, thetaFrac: 39 / 280, H: 280 / 104 };
  } else if (profile === "power17") {
    // u/U = eta^(1/7)
    return { name: "1/7th Power Law", deltaStarFrac: 1 / 8, thetaFrac: 7 / 72, H: 72 / 56 };
  }
  return { name: "Blasius", deltaStarFrac: 1.72 / 5.0, thetaFrac: 0.664 / 5.0, H: 2.59 };
}

// Boundary classification (Nikuradse criteria: k vs deltaPrime)
export function classifyBoundary(k, deltaPrime) {
  if (deltaPrime <= 0) return { regime: "unknown", label: "Undefined", ratio: 0 };
  const ratio = k / deltaPrime;
  if (ratio < 0.25) return { regime: "smooth", label: "Hydraulically Smooth (k < 0.25 δ')", ratio };
  if (ratio <= 6.0) return { regime: "transitional", label: "Transitional Regime (0.25 δ' ≤ k ≤ 6.0 δ')", ratio };
  return { regime: "rough", label: "Hydraulically Rough (k > 6.0 δ')", ratio };
}

// Total drag on a flat plate with optional mixed laminar-turbulent boundary layer
export function plateDrag(L, W, U, nu = 1e-6, rho = 1000, Re_cr = 5e5) {
  const ReL = reynolds(U, L, nu);
  let CD = 0;
  let isMixed = false;
  if (ReL <= Re_cr) {
    CD = 1.328 / Math.sqrt(ReL);
  } else {
    isMixed = true;
    CD = 0.074 / Math.pow(ReL, 0.2) - 1740 / ReL;
  }
  const qDyn = 0.5 * rho * U * U;
  const area = W * L;
  const dragOneSide = CD * qDyn * area;
  return { ReL, CD, isMixed, dragOneSide, dragBothSides: 2 * dragOneSide };
}

// ============================================================================
// UNIT III: IMPACT OF JETS (CO3)
// ============================================================================

export function jetForceStationaryFlat(d, V, rho = 1000) {
  const a = (Math.PI / 4) * d * d;
  const Q = a * V;
  const F = rho * a * V * V;
  return { a, Q, F };
}

export function jetForceStationaryInclined(d, V, thetaDeg, rho = 1000) {
  const a = (Math.PI / 4) * d * d;
  const Q = a * V;
  const th = (thetaDeg * Math.PI) / 180;
  const Fn = rho * a * V * V * Math.sin(th);
  const Fx = Fn * Math.sin(th);
  const Fy = Fn * Math.cos(th);
  const Q1 = (Q / 2) * (1 + Math.cos(th));
  const Q2 = (Q / 2) * (1 - Math.cos(th));
  return { a, Q, Fn, Fx, Fy, Q1, Q2, ratio1: Q1 / Q, ratio2: Q2 / Q };
}

export function jetForceStationaryCurved(d, V, deflectionDeg = 180, rho = 1000) {
  const a = (Math.PI / 4) * d * d;
  const Q = a * V;
  const th = (deflectionDeg * Math.PI) / 180;
  // If jet enters center and deflects by (180 - th) or enters tangent:
  // For symmetrical vane entering tangent: Fx = rho * a * V^2 * (1 + cos(phi))
  const Fx = rho * a * V * V * (1 + Math.cos(Math.PI - th));
  const hemiRatio = Fx / (rho * a * V * V);
  return { a, Q, Fx, hemiRatio };
}

export function jetForceMovingFlat(d, V, u, mode = "single", rho = 1000) {
  const a = (Math.PI / 4) * d * d;
  const uRel = Math.max(0, V - u);
  if (mode === "single") {
    // Single moving plate: mass striking per sec = rho * a * (V - u)
    const F = rho * a * uRel * uRel;
    const work = F * u;
    const efficiency = V > 0 ? (2 * u * uRel * uRel) / (V * V * V) : 0;
    return { a, F, work, efficiency, optU: V / 3, maxEta: 8 / 27 };
  } else {
    // Series of moving plates on a wheel: all flow struck = rho * a * V
    const F = rho * a * V * uRel;
    const work = F * u;
    const efficiency = V > 0 ? (2 * u * uRel) / (V * V) : 0;
    return { a, F, work, efficiency, optU: V / 2, maxEta: 0.5 };
  }
}

export function jetVelocityTriangle(V1, u, beta2Deg, kFriction = 1.0, rho = 1000, d = 0.05) {
  const a = (Math.PI / 4) * d * d;
  const Q = a * V1;
  const Vr1 = Math.max(0, V1 - u);
  const Vw1 = V1;
  const Vr2 = kFriction * Vr1;
  const beta2Rad = (beta2Deg * Math.PI) / 180;
  const Vw2 = Vr2 * Math.cos(beta2Rad) - u;
  // Work done per unit mass = u * (Vw1 + Vw2) if Vw2 in same or reverse
  const workPerSec = rho * Q * u * (Vw1 + Vw2);
  const kineticPower = 0.5 * rho * Q * V1 * V1;
  const efficiency = kineticPower > 0 ? Math.max(0, workPerSec / kineticPower) : 0;
  return { a, Q, Vr1, Vw1, Vr2, Vw2, workPerSec, efficiency };
}



// ============================================================================
// UNIT IV: HYDRAULIC MACHINES (CO4)
// ============================================================================

export function unitQuantities(N, Q, P_kW, H) {
  const sqrtH = Math.sqrt(Math.max(1e-6, H));
  const Nu = N / sqrtH;
  const Qu = Q / sqrtH;
  const Pu = P_kW / Math.pow(Math.max(1e-6, H), 1.5);
  return { Nu, Qu, Pu };
}

export function specificSpeedTurbine(N, P_kW, H) {
  if (H <= 0) return 0;
  return (N * Math.sqrt(Math.max(0, P_kW))) / Math.pow(H, 1.25);
}

export function specificSpeedPump(N, Q_m3s, Hm) {
  if (Hm <= 0) return 0;
  return (N * Math.sqrt(Math.max(0, Q_m3s))) / Math.pow(Hm, 0.75);
}

export function classifyTurbine(H, Ns) {
  if (H >= 250 || Ns <= 35) {
    return { type: "Pelton", flow: "Tangential Impulse", rangeNs: "10 – 35", rangeHead: "> 250 m" };
  } else if (H >= 60 || Ns <= 300) {
    return { type: "Francis", flow: "Mixed Reaction", rangeNs: "60 – 300", rangeHead: "60 – 250 m" };
  } else {
    return { type: "Kaplan / Propeller", flow: "Axial Reaction", rangeNs: "300 – 1000", rangeHead: "< 60 m" };
  }
}

export function peltonDesign(P_kW, H, N, eta_o = 0.85, Cv = 0.98, phi = 0.46, m_target = 12) {
  const g = 9.81;
  const rho = 1000;
  const V1 = Cv * Math.sqrt(2 * g * H);
  const u = phi * Math.sqrt(2 * g * H);
  const Q = (P_kW * 1000) / (eta_o * rho * g * H);
  const D = (60 * u) / (Math.PI * N);
  const a_total = Q / V1;
  const d_single = Math.sqrt((4 * a_total) / Math.PI);
  const m_single = D / d_single;
  
  // Choose number of jets to approach target jet ratio m ~ 12
  let n_j = 1;
  if (m_single < 9) {
    n_j = Math.min(6, Math.max(1, Math.round(Math.pow(m_target / m_single, 2))));
  }
  const d = Math.sqrt((4 * a_total) / (Math.PI * n_j));
  const m = D / d;
  const Z = Math.round(15 + 0.5 * m); // Taygun's formula
  const B = 4.0 * d; // bucket width
  const L = 2.8 * d; // bucket length
  const T = 1.0 * d; // bucket depth

  return { V1, u, Q, D, d, n_j, m, Z, B, L, T, a_total };
}

export function draftTubeRecovery(V3, V4, eta_dt = 0.80, g = 9.81) {
  const h_rec_th = Math.max(0, (V3 * V3 - V4 * V4) / (2 * g));
  const h_rec = eta_dt * h_rec_th;
  const h_loss = (1 - eta_dt) * h_rec_th;
  return { h_rec_th, h_rec, h_loss };
}

export function pumpImpeller(D2, b2, N, beta2Deg, Q, g = 9.81) {
  const u2 = (Math.PI * D2 * N) / 60;
  const A2 = Math.PI * D2 * b2;
  const Vf2 = A2 > 0 ? Q / A2 : 0;
  const beta2Rad = (beta2Deg * Math.PI) / 180;
  const tanBeta2 = Math.tan(beta2Rad);
  const Vw2 = tanBeta2 !== 0 ? u2 - Vf2 / tanBeta2 : u2;
  const He = (Vw2 * u2) / g;
  const V2 = Math.hypot(Vw2, Vf2);
  return { u2, Vf2, Vw2, V2, He };
}

export function pumpSystemOperatingPoint(H_stat, K_sys, H0_pump, A_pump) {
  // H_pump = H0 - A * Q^2
  // H_sys = H_stat + K * Q^2
  // Intersection single: Q^2 = (H0 - H_stat) / (A + K)
  const calcQ = (H0, effA) => {
    const diff = H0 - H_stat;
    if (diff <= 0) return 0;
    return Math.sqrt(diff / (effA + K_sys));
  };

  const Q_single = calcQ(H0_pump, A_pump);
  const H_single = H_stat + K_sys * Q_single * Q_single;

  // Series: 2 identical pumps head doubles -> H0_series = 2*H0, A_series = 2*A
  const Q_series = calcQ(2 * H0_pump, 2 * A_pump);
  const H_series = H_stat + K_sys * Q_series * Q_series;

  // Parallel: 2 pumps flow splits -> H = H0 - A*(Q/2)^2 = H0 - (A/4)*Q^2
  const Q_parallel = calcQ(H0_pump, A_pump / 4);
  const H_parallel = H_stat + K_sys * Q_parallel * Q_parallel;

  return {
    single: { Q: Q_single, H: H_single },
    series: { Q: Q_series, H: H_series },
    parallel: { Q: Q_parallel, H: H_parallel }
  };
}

export function pumpCavitationNPSH(Patm_kPa, Pv_kPa, Hs, hfs, rho = 1000, g = 9.81) {
  const H_atm = (Patm_kPa * 1000) / (rho * g);
  const H_v = (Pv_kPa * 1000) / (rho * g);
  const NPSHa = H_atm - H_v - Hs - hfs;
  return { H_atm, H_v, NPSHa };
}

// ============================================================================
// UNIT V: COMPUTATIONAL HYDRAULICS & CFD (CO5)
// ============================================================================

export function cflCondition(u, y, dx, dt, g = 9.81) {
  const c = Math.sqrt(Math.max(1e-6, g * y));
  const sMax = Math.abs(u) + c;
  const Cr = dx > 0 ? (sMax * dt) / dx : 0;
  const dtMax = sMax > 0 ? dx / sMax : 0;
  const isStable = Cr <= 1.0;
  return { c, sMax, Cr, dtMax, isStable };
}

export function cellPeclet(u, dx, nu_t) {
  if (nu_t <= 0) return Infinity;
  return (Math.abs(u) * dx) / nu_t;
}
