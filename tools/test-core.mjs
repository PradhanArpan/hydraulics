import test from "node:test";
import assert from "node:assert/strict";
import * as H from "../src/core/hydraulics.mjs";

const near = (a, b, tol = 1e-6) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b}`);

test("sequent depth ratio at Fr1 = 3 is 3.772", () => {
  near(H.sequentDepth(1, 3), 0.5 * (Math.sqrt(73) - 1), 1e-12);
  near(H.sequentDepth(1, 3), 3.772, 1e-3);
});

test("critical depth: Ec = 1.5 yc and E is minimum there", () => {
  const q = 2.4, yc = H.criticalDepth(q);
  near(H.specificEnergy(yc, q), 1.5 * yc, 1e-9);
  near(H.froude(q, yc), 1, 1e-9);
  assert.ok(H.specificEnergy(yc * 0.9, q) > H.specificEnergy(yc, q));
  assert.ok(H.specificEnergy(yc * 1.1, q) > H.specificEnergy(yc, q));
});

test("alternate depths share the same energy, one each side of yc", () => {
  const q = 1.5, yc = H.criticalDepth(q);
  for (const y of [0.25, 0.4, 0.9, 1.5, 2.4]) {
    const a = H.alternateDepth(y, q);
    near(H.specificEnergy(a, q), H.specificEnergy(y, q), 1e-7);
    assert.ok((y - yc) * (a - yc) < 0, `y=${y} alt=${a} should straddle yc=${yc}`);
  }
});

test("hump: subcritical depth falls, supercritical depth rises, choking at E1 - Ec", () => {
  const q = 2, sub = 1.5, sup = 0.3;
  const r1 = H.humpResponse(q, sub, 0.2);
  assert.ok(!r1.choked && r1.y2 < sub);
  near(H.specificEnergy(r1.y2, q), r1.E2, 1e-7);
  const r2 = H.humpResponse(q, sup, 0.2);
  assert.ok(!r2.choked && r2.y2 > sup);
  const ok = H.humpResponse(q, sub, r1.dzMax - 1e-6);
  const bad = H.humpResponse(q, sub, r1.dzMax + 1e-3);
  assert.ok(!ok.choked && bad.choked);
});

test("jump: momentum and energy are consistent", () => {
  for (const [y1, Fr] of [[0.3, 3], [0.3, 4], [0.2, 7.5], [0.5, 1.4]]) {
    const j = H.jump(y1, Fr);
    near(H.specificForce(j.y1, j.q), H.specificForce(j.y2, j.q), 1e-9); // equal specific force
    near(j.E1 - j.E2, j.dE, 1e-9);                                       // loss formula = energy balance
    assert.ok(j.Fr2 < 1);
  }
});

test("conjugate depth matches the sequent-depth formula in both directions", () => {
  const j = H.jump(0.3, 4);
  near(H.conjugateDepth(j.y1, j.q), j.y2, 1e-6);
  near(H.conjugateDepth(j.y2, j.q), j.y1, 1e-6);
});

test("jump classification boundaries", () => {
  assert.equal(H.jumpType(1.5).key, "undular");
  assert.equal(H.jumpType(2).key, "weak");
  assert.equal(H.jumpType(3).key, "oscillating");
  assert.equal(H.jumpType(6).key, "steady");
  assert.equal(H.jumpType(10).key, "strong");
});

test("economical sections: rectangle b = 2y, R = y/2; trapezoid half-hexagon R = y/2", () => {
  const A = 18;
  const rect = H.economicalRect(A);
  near(rect.b, 2 * rect.y, 1e-7);
  near(rect.R, rect.y / 2, 1e-7);
  near(rect.A, A, 1e-7);

  const trap = H.economicalTrap(A);
  near(trap.R, trap.y / 2, 1e-7);
  near(trap.A, A, 1e-7);
  near(trap.m, 1 / Math.sqrt(3), 1e-7); // side slope 60 deg
});

test("circular section: peak discharge around y/D = 0.938 and peak velocity around 0.81", () => {
  const D = 2.0;
  let maxQ = 0, yMaxQ = 0;
  let maxV = 0, yMaxV = 0;
  for (let y = 0.1; y < D; y += 0.005) {
    const g = H.circGeometry(D, y);
    const V = Math.pow(g.R, 2 / 3);
    const Q = g.A * V;
    if (Q > maxQ) { maxQ = Q; yMaxQ = y; }
    if (V > maxV) { maxV = V; yMaxV = y; }
  }
  near(yMaxQ / D, 0.938, 0.015);
  near(yMaxV / D, 0.810, 0.015);
});

test("normal depth computation matches Manning discharge", () => {
  const Q = 10, b = 4, S = 0.001, n = 0.015;
  const yn = H.solveNormalDepthRect(Q, b, S, n);
  const geom = H.rectGeometry(b, yn);
  const Qcalc = H.manningQ(geom.A, geom.R, S, n);
  near(Qcalc, Q, 1e-4);
});

test("qMax: at E the critical depth is 2E/3 and q = qMax(E)", () => {
  const E = 1.6, q = H.qMax(E);
  near(H.criticalDepth(q), (2 * E) / 3, 1e-9);
  near(H.specificEnergy(H.criticalDepth(q), q), E, 1e-9);
});

test("depthAtEnergy round-trips on both branches and rejects E below minimum", () => {
  const q = 2, yc = H.criticalDepth(q);
  const sub = H.depthAtEnergy(1.8, q, "sub"), sup = H.depthAtEnergy(1.8, q, "sup");
  assert.ok(sub > yc && sup < yc);
  near(H.specificEnergy(sub, q), 1.8, 1e-7);
  near(H.specificEnergy(sup, q), 1.8, 1e-7);
  assert.ok(Number.isNaN(H.depthAtEnergy(1.0, q, "sub")));
});

test("contraction: subcritical depth falls, supercritical depth rises, choked below bMin", () => {
  const Q = 6, b1 = 3;
  const sub = H.contractionResponse(Q, b1, 1.5, 2.5);
  assert.ok(!sub.choked && sub.y2 < 1.5);
  const sup = H.contractionResponse(Q, b1, 0.4, 2.5);
  assert.ok(!sup.choked && sup.y2 > 0.4);
  const edge = H.contractionResponse(Q, b1, 1.5, sub.bMin + 1e-6);
  assert.ok(!edge.choked);
  near(edge.y2, H.criticalDepth(Q / sub.bMin), 1e-3); // critical at the throat
  assert.ok(H.contractionResponse(Q, b1, 1.5, sub.bMin - 0.01).choked);
});

test("choked hump: upstream depth equals y1 exactly at dzMax, and rises above it", () => {
  const q = 2, y1 = 1.5, r = H.humpResponse(q, y1, 0.2);
  near(H.chokedUpstream(q, r.dzMax), y1, 1e-6);
  assert.ok(H.chokedUpstream(q, r.dzMax + 0.2) > y1);
});

