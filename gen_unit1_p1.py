import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S01: Physical Foundations of Boundary Layer Theory & Viscous Shear Flow
# =========================================================================
s01 = """<!--tab:Theory & Derivations-->
> [!note] Historical Paradigm Shift
> Prior to 1904, fluid mechanics was divided into two irreconcilable schools: **theoretical hydrodynamics** (which assumed inviscid fluids and predicted zero drag—d'Alembert's paradox) and **empirical hydraulics** (which relied entirely on practical curve-fitting without theoretical foundations). **Ludwig Prandtl (1904)** unified both by discovering that for fluids of low viscosity (such as water and air), viscous friction is confined entirely to a microscopically thin boundary zone adjacent to solid walls, while the external bulk flow behaves as an ideal, potential flow.

## 1. Physical Origin & The No-Slip Condition
When a real fluid flows past a stationary solid surface, intermolecular adhesive forces between fluid molecules and solid atoms prevent relative slip at the boundary. This physical constraint is the **no-slip condition**:
$$u(x, y=0) = 0, \quad v(x, y=0) = 0$$

Far from the wall ($y \\to \\infty$), the fluid travels at the undisturbed free-stream velocity $U_\\infty$. The transition from zero velocity at the wall to $99\\%$ of $U_\\infty$ occurs across a thin region of thickness $\\delta(x)$, termed the **boundary layer thickness**:
$$u(x, y = \\delta) = 0.99 U_\\infty$$

Due to the intense velocity gradient $\\frac{\\partial u}{\\partial y}$ inside this thin layer, internal viscous shear stresses are substantial:
$$\\tau(x, y) = \\mu \\frac{\\partial u}{\\partial y}$$

Outside the boundary layer ($y > \\delta$), $\\frac{\\partial u}{\\partial y} \\approx 0$, rendering viscous shear stresses negligible ($\\tau \\approx 0$). Consequently, the outer flow satisfies Euler's equation of motion and Bernoulli’s theorem.

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 800 240" style="width:100%; max-width:760px; height:auto; font-family:var(--sans,sans-serif);">
    <defs>
      <linearGradient id="blGrad" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#1a5f7a" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#1a5f7a" stop-opacity="0.02"/>
      </linearGradient>
      <marker id="arr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#1a5f7a"/>
      </marker>
    </defs>
    <!-- Solid Plate -->
    <rect x="80" y="180" width="680" height="14" fill="#4a5568" rx="2"/>
    <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="#cbd5e0" stroke-width="1.5" />
    </pattern>
    <rect x="80" y="194" width="680" height="10" fill="url(#hatch)"/>
    
    <!-- Boundary Layer Profile -->
    <path d="M 80,180 Q 280,120 400,105 T 760,40 L 760,180 Z" fill="url(#blGrad)"/>
    <path d="M 80,180 Q 280,120 400,105 T 760,40" fill="none" stroke="#1a5f7a" stroke-width="2.5" stroke-dasharray="6,3"/>
    
    <!-- Transition Indicator -->
    <line x1="380" y1="30" x2="380" y2="180" stroke="#e53e3e" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="380" y="24" fill="#c53030" font-size="11" font-weight="700" text-anchor="middle">Transition Zone (Re_x ≈ 5×10⁵)</text>

    <!-- Regimes Labels -->
    <text x="220" y="170" fill="#2b6cb0" font-size="12" font-weight="600">Laminar Regime (δ ∝ √x)</text>
    <text x="560" y="140" fill="#2c5282" font-size="12" font-weight="600">Turbulent Regime (δ ∝ x^0.8)</text>

    <!-- Free Stream Arrows -->
    <line x1="20" y1="50" x2="65" y2="50" stroke="#1a5f7a" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="20" y1="80" x2="65" y2="80" stroke="#1a5f7a" stroke-width="2" marker-end="url(#arr)"/>
    <line x1="20" y1="110" x2="65" y2="110" stroke="#1a5f7a" stroke-width="2" marker-end="url(#arr)"/>
    <text x="42" y="38" fill="#1a5f7a" font-size="12" font-weight="700" text-anchor="middle">U_∞</text>
  </svg>
  <div style="font-size:12px; color:var(--muted,#718096); margin-top:8px;">
    Figure 1.1: Development of boundary layer regimes along a horizontal smooth flat plate, showing laminar parabolic growth transitioning to turbulent profile with viscous sublayer.
  </div>
</div>

## 2. Order of Magnitude Derivation of Prandtl's Boundary Layer Equations
Consider steady, 2D, incompressible viscous flow past a flat surface aligned with the $x$-axis. The Navier-Stokes equations are:
$$\\text{Continuity: } \\frac{\\partial u}{\\partial x} + \\frac{\\partial v}{\\partial y} = 0$$
$$x\\text{-Momentum: } u \\frac{\\partial u}{\\partial x} + v \\frac{\\partial u}{\\partial y} = -\\frac{1}{\\rho}\\frac{\\partial p}{\\partial x} + \\nu \\left(\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2}\\right)$$
$$y\\text{-Momentum: } u \\frac{\\partial v}{\\partial x} + v \\frac{\\partial v}{\\partial y} = -\\frac{1}{\\rho}\\frac{\\partial p}{\\partial y} + \\nu \\left(\\frac{\\partial^2 v}{\\partial x^2} + \\frac{\\partial^2 v}{\\partial y^2}\\right)$$

### Scaling Parameters:
- Stream-wise characteristic length: $x \\sim L$
- Boundary layer normal thickness: $y \\sim \\delta$, with $\\delta \\ll L$
- Stream-wise velocity: $u \\sim U_\\infty$
- From continuity: $\\frac{\\partial v}{\\partial y} \\sim -\\frac{\\partial u}{\\partial x} \\implies \\frac{v}{\\delta} \\sim \\frac{U_\\infty}{L} \\implies v \\sim U_\\infty \\frac{\\delta}{L} \\ll u$

### Simplification of the $y$-Momentum Equation:
Evaluating order-of-magnitude terms in the $y$-direction:
$$u \\frac{\\partial v}{\\partial x} \\sim U_\\infty \\left(\\frac{U_\\infty \\delta/L}{L}\\right) = \\frac{U_\\infty^2 \\delta}{L^2}$$
$$-\\frac{1}{\\rho}\\frac{\\partial p}{\\partial y} \\sim O\\left(\\frac{\\delta}{L}\\right) \\approx 0$$

> [!important] Fundamental Invariant
> The normal pressure gradient through the thickness of the boundary layer is zero ($\\frac{\\partial p}{\\partial y} \\approx 0$). Consequently, the static pressure inside the boundary layer at any $x$ is dictated solely by the outer potential flow:
> $$p(x, y) = P_\\infty(x)$$

### The Simplified Prandtl Boundary Layer Equations:
$$u \\frac{\\partial u}{\\partial x} + v \\frac{\\partial u}{\\partial y} = -\\frac{1}{\\rho}\\frac{dP_\\infty}{dx} + \\nu \\frac{\\partial^2 u}{\\partial y^2}$$
$$\\frac{\\partial u}{\\partial x} + \\frac{\\partial v}{\\partial y} = 0$$

Subject to boundary conditions:
$$\\text{At } y = 0: \\quad u = 0, \\ v = 0$$
$$\\text{At } y = \\delta(x): \\quad u = U_\\infty(x), \\ \\frac{\\partial u}{\\partial y} = 0$$

<!--tab:Worked Examples-->
### Example 1.1: Boundary Layer Development Over an Aqueduct Wall
**Problem Statement:** Water at $20^\\circ\\text{C}$ ($\\rho = 998\\text{ kg/m}^3$, $\\nu = 1.004 \\times 10^{-6}\\text{ m}^2/\\text{s}$) flows along a smooth concrete approach flume wall of length $L = 4.0\\text{ m}$ at a steady velocity $U_\\infty = 1.8\\text{ m/s}$. Assuming critical transition occurs at $Re_{cr} = 5 \\times 10^5$:
1. Determine the distance $x_{cr}$ from the leading edge where the laminar boundary layer begins to transition into turbulence.
2. Calculate the Reynolds number at the trailing edge $x = L$.
3. Compute the nominal boundary layer thickness $\\delta$ at $x = 0.20\\text{ m}$ using Blasius laminar solution ($\\delta = 4.91 \\sqrt{\\frac{\\nu x}{U_\\infty}}$).
4. Compute the wall shear stress $\\tau_0$ at $x = 0.20\\text{ m}$ ($\\tau_0 = 0.332 \\rho U_\\infty^2 / \\sqrt{Re_x}$).

:::sol Step-by-Step Calculation
**Step 1: Distance to Transition ($x_{cr}$)**
$$Re_{cr} = \\frac{U_\\infty x_{cr}}{\\nu} \\implies x_{cr} = \\frac{Re_{cr} \\cdot \\nu}{U_\\infty}$$
$$x_{cr} = \\frac{5 \\times 10^5 \\times 1.004 \\times 10^{-6}\\text{ m}^2/\\text{s}}{1.8\\text{ m/s}} = 0.2789\\text{ m} \\approx 27.9\\text{ cm}$$

**Step 2: Trailing Edge Reynolds Number ($Re_L$)**
$$Re_L = \\frac{U_\\infty L}{\\nu} = \\frac{1.8 \\times 4.0}{1.004 \\times 10^{-6}} = 7.17 \\times 10^6$$
Since $Re_L > 5 \\times 10^5$, approximately $\\frac{4.0 - 0.279}{4.0} \\times 100\\% = 93.0\\%$ of the flume wall is covered by a turbulent boundary layer.

**Step 3: Laminar Boundary Layer Thickness at $x = 0.20\\text{ m}$**
At $x = 0.20\\text{ m} < x_{cr}$, the flow is purely laminar.
$$Re_x = \\frac{1.8 \\times 0.20}{1.004 \\times 10^{-6}} = 3.586 \\times 10^5$$
$$\\delta(0.20) = 4.91 \\times \\frac{0.20}{\\sqrt{3.586 \\times 10^5}} = \\frac{0.982}{598.8} = 1.64 \\times 10^{-3}\\text{ m} = 1.64\\text{ mm}$$

**Step 4: Wall Shear Stress at $x = 0.20\\text{ m}$**
$$\\tau_0 = 0.332 \\times \\frac{\\rho U_\\infty^2}{\\sqrt{Re_x}} = 0.332 \\times \\frac{998 \\times 1.8^2}{598.8} = 1.79\\text{ N/m}^2$$

**Engineering Commentary:**
Even at a rapid water velocity of $1.8\\text{ m/s}$, the laminar boundary layer thickness is only $1.64\\text{ mm}$ thick. However, this microscopic zone produces an intense velocity gradient of $\\frac{\\partial u}{\\partial y} \\sim \\frac{1.8}{0.00164} \\approx 1100\\text{ s}^{-1}$, generating the entire skin friction drag on the structure.
:::

---

### Example 1.2: Boundary Layer Scaling in Wind Tunnel & Flume Testing
**Problem Statement:** A 1:10 scale model of a canal barge is tested in a towing tank at $U_m = 1.2\\text{ m/s}$ in water ($\\nu = 1.0 \\times 10^{-6}\\text{ m}^2/\\text{s}$). The prototype barge operates at $U_p = 3.8\\text{ m/s}$. The model length is $L_m = 2.0\\text{ m}$ and width $B_m = 0.6\\text{ m}$. Calculate the ratio of boundary layer thickness at the model trailing edge compared to the prototype trailing edge ($L_p = 20.0\\text{ m}$).

:::sol Step-by-Step Calculation
For turbulent boundary layer scaling over a flat surface, the thickness scales as:
$$\\delta \\propto \\frac{x}{Re_x^{1/5}} = x \\left(\\frac{\\nu}{U x}\\right)^{1/5} = \\frac{x^{4/5} \\nu^{1/5}}{U^{1/5}}$$

Taking the ratio of model to prototype boundary layer thickness at trailing edge ($x = L$):
$$\\frac{\\delta_m}{\\delta_p} = \\left(\\frac{L_m}{L_p}\\right)^{4/5} \\left(\\frac{U_p}{U_m}\\right)^{1/5} \\left(\\frac{\\nu_m}{\\nu_p}\\right)^{1/5}$$

Given $\\nu_m = \\nu_p$ (both water):
$$\\frac{\\delta_m}{\\delta_p} = \\left(\\frac{2.0}{20.0}\\right)^{0.8} \\left(\\frac{3.8}{1.2}\\right)^{0.2} = (0.10)^{0.8} \\times (3.167)^{0.2} = 0.1585 \\times 1.259 = 0.200$$

**Engineering Commentary:**
The model boundary layer is $\\frac{1}{5}$ the thickness of the prototype boundary layer, whereas the geometric scale is $\\frac{1}{10}$. This reveals that boundary layers on laboratory scale models are **disproportionately thick** relative to geometric dimensions, explaining why boundary layer tripping and friction corrections are mandatory in scaled physical hydraulic modeling.
:::

<!--tab:Interactive Workbench-->
### Boundary Layer Velocity Profile & Shear Stress Simulator
Use this interactive workbench to examine how free-stream velocity ($U_\\infty$), kinematic viscosity ($\\nu$), and stream-wise coordinate ($x$) alter the boundary layer thickness $\\delta(x)$, local skin friction coefficient $C_{fx}$, and wall shear stress $\\tau_0$.

::widget[blprofile]

> [!tip] Simulation Exploration Guide
> 1. Set $U_\\infty = 2.0\\text{ m/s}$ and slide $x$ from $0.1\\text{ m}$ to $2.5\\text{ m}$. Notice that as the boundary layer grows thicker downstream ($\\delta \\uparrow$), the velocity gradient at the wall becomes flatter ($\\frac{\\partial u}{\\partial y} \\downarrow$), causing the wall shear stress $\\tau_0$ to drop!
> 2. Switch between **Water** ($\\nu = 1.0 \\times 10^{-6}\\text{ m}^2/\\text{s}$) and **Air** ($\\nu = 1.5 \\times 10^{-5}\\text{ m}^2/\\text{s}$). Why is the boundary layer in air nearly 4 times thicker than in water at identical velocities? Because kinematic viscosity $\\nu = \\mu/\\rho$ governs momentum diffusion!

<!--tab:Interactive Practice-->
### Interactive Numerical Problem Check
Solve the following numerical calculation on your notebook and enter your result to verify:

```check
[
  {
    "q": "Water (nu = 1.0e-6 m^2/s) flows over a flat plate at 2.5 m/s. Assuming Re_cr = 5.0e5, calculate the critical distance x_cr in meters where transition begins:",
    "answer": 0.20,
    "tol": 0.01,
    "unit": "m",
    "hint": "Use x_cr = (Re_cr * nu) / U_inf",
    "solution": "x_cr = (5.0e5 * 1.0e-6) / 2.5 = 0.20 m."
  },
  {
    "q": "For the same flow, calculate the laminar boundary layer thickness delta at x = 0.16 m in millimeters using Blasius formula delta = 4.91 * sqrt(nu * x / U_inf):",
    "answer": 1.24,
    "tol": 0.04,
    "unit": "mm",
    "hint": "First compute sqrt((1.0e-6 * 0.16) / 2.5) = 2.53e-4 m. Then multiply by 4.91.",
    "solution": "delta = 4.91 * sqrt(1e-6 * 0.16 / 2.5) = 4.91 * 2.5298e-4 = 1.242e-3 m = 1.24 mm."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "q": "What is the primary physical justification for neglecting the normal pressure gradient (dp/dy ≈ 0) across the boundary layer?",
    "options": [
      "The fluid is assumed to be completely compressible.",
      "The boundary layer thickness delta is orders of magnitude smaller than the stream-wise length L (delta << L), making normal accelerations negligible.",
      "The wall has infinite hydraulic roughness.",
      "Viscous stresses completely overwhelm pressure forces in both directions."
    ],
    "answer": 1,
    "why": "Because delta << L, continuity demands that vertical velocity v << u. The vertical momentum equation terms scale as O(delta/L), proving that pressure variations across the thickness are negligible: p(x,y) = P_inf(x)."
  },
  {
    "q": "At the solid boundary (y = 0), what is the value of the fluid velocity according to the no-slip condition?",
    "options": [
      "Equal to the acoustic sound speed",
      "Equal to half of the free-stream velocity",
      "Zero relative to the solid boundary",
      "Equal to the shear velocity u*"
    ],
    "answer": 2,
    "why": "Intermolecular forces between fluid and solid molecules prevent relative slip at the interface, forcing u(y=0) = 0 and v(y=0) = 0."
  },
  {
    "q": "How does the local wall shear stress tau_0 vary with distance x from the leading edge in a laminar boundary layer over a flat plate?",
    "options": [
      "Increases linearly with distance x",
      "Remains constant along the entire plate length",
      "Decreases inversely proportional to the square root of x (tau_0 ∝ 1/√x)",
      "Decreases exponentially as e^(-x)"
    ],
    "answer": 2,
    "why": "As the boundary layer thickens downstream (delta ∝ √x), the velocity gradient at the wall flattens: tau_0 = mu (du/dy)|_0 ∝ mu (U/delta) ∝ 1/√x."
  }
]
```

<!--tab:Field Nuances & Standards-->
> [!important] Field Practical Nuances: Pitot-Static Measurements & Wind Tunnel Testing
> 1. **Pitot Tube Displacement Correction:** When measuring velocity profiles inside boundary layers using micro-Pitot tubes in hydraulic flumes (Practical Lab L01), the physical presence of the tube creates a local stagnation disturbance that deflects streamlines away from the wall. Readings must be corrected using MacMillan's displacement factor:
>    $$y_{effective} = y_{geometric} + 0.15 d_{probe}$$
> 2. **Boundary Layer Displacement in Culverts and Flumes:** In high-velocity chutes and closed conduit wind tunnels, the growth of $\\delta^*(x)$ reduces the effective cross-sectional area of the channel, accelerating the central core flow ($U_\\infty(x) > U_{inlet}$) and introducing an artificial favorable pressure gradient unless sidewalls are designed with a slight divergence.
"""

# =========================================================================
# S02: Boundary Layer Thickness Metrics (delta, delta*, theta, delta**) & Shape Factor H
# =========================================================================
s02 = """<!--tab:Theory & Derivations-->
> [!note] Why Nominal Thickness $\\delta_{99}$ is Insufficient
> The nominal thickness $\\delta$ is defined arbitrarily at $u = 0.99 U_\\infty$. Because velocity approaches $U_\\infty$ asymptotically, measuring the precise location of $99\\%$ in a laboratory flume or wind tunnel is notoriously difficult and carries up to $15\\%$ experimental uncertainty. To overcome this, fluid dynamicists formulate **integral thickness metrics** based on conservation of mass, momentum, and kinetic energy.

## 1. Displacement Thickness ($\\delta^*$)
Displacement thickness represents the distance by which the external inviscid streamlines are deflected outwards from the wall due to the retardation of viscous fluid inside the boundary layer.

Consider a stream-tube of height $\\delta$. The mass flow rate that would pass through this height if the fluid were ideal (inviscid) is:
$$\\dot{m}_{ideal} = \\int_0^\\delta \\rho U_\\infty dy = \\rho U_\\infty \\delta$$

The actual mass flow rate passing through the boundary layer is:
$$\\dot{m}_{actual} = \\int_0^\\delta \\rho u dy$$

The mass flow deficit is:
$$\\Delta \\dot{m} = \\int_0^\\delta \\rho (U_\\infty - u) dy$$

If this missing mass flow rate were represented by an equivalent layer of zero velocity of thickness $\\delta^*$, moving at velocity $U_\\infty$:
$$\\rho U_\\infty \\delta^* = \\int_0^\\delta \\rho (U_\\infty - u) dy$$

Canceling constant density $\\rho$:
$$\\delta^* = \\int_0^\\delta \\left(1 - \\frac{u}{U_\\infty}\\right) dy$$

## 2. Momentum Thickness ($\\theta$)
Momentum thickness represents the loss of momentum flux per second caused by boundary friction, compared to ideal potential flow.

- Mass of fluid in a strip $dy$: $d\\dot{m} = \\rho u dy$
- Actual momentum flux: $dM_{actual} = (\\rho u dy) u = \\rho u^2 dy$
- Momentum flux if fluid had maintained potential velocity $U_\\infty$: $dM_{ideal} = (\\rho u dy) U_\\infty$
- Total momentum deficit across the layer:
$$\\Delta M = \\int_0^\\delta \\rho u (U_\\infty - u) dy$$

Equating this deficit to the momentum of an equivalent fluid layer of thickness $\\theta$ moving at $U_\\infty$:
$$\\rho U_\\infty^2 \\theta = \\int_0^\\delta \\rho u (U_\\infty - u) dy$$
$$\\theta = \\int_0^\\delta \\frac{u}{U_\\infty}\\left(1 - \\frac{u}{U_\\infty}\\right) dy$$

## 3. Energy Thickness ($\\delta^{**}$)
Energy thickness represents the deficit in kinetic energy flux caused by boundary friction:
$$E_{ideal} = \\frac{1}{2}(\\rho u dy) U_\\infty^2, \\quad E_{actual} = \\frac{1}{2}(\\rho u dy) u^2$$
$$\\frac{1}{2}\\rho U_\\infty^3 \\delta^{**} = \\frac{1}{2}\\int_0^\\delta \\rho u (U_\\infty^2 - u^2) dy$$
$$\\delta^{**} = \\int_0^\\delta \\frac{u}{U_\\infty}\\left(1 - \\frac{u^2}{U_\\infty^2}\\right) dy$$

## 4. Boundary Layer Shape Factor ($H$)
The shape factor $H$ is the non-dimensional ratio of displacement thickness to momentum thickness:
$$H = \\frac{\\delta^*}{\\theta}$$

- **Laminar Boundary Layer:** Velocity profile is gently curved $\\implies \\delta^*$ is relatively large $\\implies H \\approx 2.59$ (for Blasius profile).
- **Turbulent Boundary Layer:** Turbulent mixing flattens velocity near the center and steepens it near the wall $\\implies \\delta^*$ is much smaller $\\implies H \\approx 1.25 - 1.40$.
- **Separation Criterion:** When an adverse pressure gradient acts, near-wall fluid decelerates rapidly, inflating $\\delta^*$ while $\\theta$ remains relatively constant. Separation occurs when $H$ rises above $3.0 - 3.5$.

<!--tab:Worked Examples-->
### Example 2.1: Analytical Evaluation of Integral Metrics for a Parabolic Profile
**Problem Statement:** In a laminar boundary layer, the velocity profile is approximated by the parabola:
$$\\frac{u}{U} = 2\\left(\\frac{y}{\\delta}\\right) - \\left(\\frac{y}{\\delta}\\right)^2$$
Let $\\eta = y/\\delta$. Determine: (a) $\\delta^*/\\delta$, (b) $\\theta/\\delta$, (c) $\\delta^{**}/\\delta$, and (d) Shape factor $H$.

:::sol Step-by-Step Integration
**(a) Displacement Thickness:**
$$\\frac{\\delta^*}{\\delta} = \\int_0^1 (1 - 2\\eta + \\eta^2) d\\eta = \\left[\\eta - \\eta^2 + \\frac{\\eta^3}{3}\\right]_0^1 = 1 - 1 + \\frac{1}{3} = \\frac{1}{3}$$
$$\\delta^* = 0.3333 \\delta$$

**(b) Momentum Thickness:**
$$\\frac{\\theta}{\\delta} = \\int_0^1 (2\\eta - \\eta^2)(1 - 2\\eta + \\eta^2) d\\eta = \\int_0^1 (2\\eta - 5\\eta^2 + 4\\eta^3 - \\eta^4) d\\eta$$
$$= \\left[\\eta^2 - \\frac{5}{3}\\eta^3 + \\eta^4 - \\frac{\\eta^5}{5}\\right]_0^1 = 1 - 1.6667 + 1 - 0.200 = \\frac{2}{15} \\approx 0.1333$$
$$\\theta = 0.1333 \\delta$$

**(c) Energy Thickness:**
$$\\frac{\\delta^{**}}{\\delta} = \\int_0^1 (2\\eta - \\eta^2)[1 - (2\\eta - \\eta^2)^2] d\\eta = \\int_0^1 (2\\eta - \\eta^2)(1 - 4\\eta^2 + 4\\eta^3 - \\eta^4) d\\eta$$
$$= \\int_0^1 (2\\eta - 9\\eta^3 + 12\\eta^4 - 6\\eta^5 + \\eta^6) d\\eta = \\left[\\eta^2 - \\frac{9}{4}\\eta^4 + \\frac{12}{5}\\eta^5 - \\eta^6 + \\frac{\\eta^7}{7}\\right]_0^1$$
$$= 1 - 2.25 + 2.40 - 1 + 0.1428 = \\frac{22}{105} \\approx 0.2095$$

**(d) Shape Factor $H$:**
$$H = \\frac{\\delta^*}{\\theta} = \\frac{1/3}{2/15} = \\frac{15}{6} = 2.50$$
The value $H = 2.50$ is very close to the exact Blasius laminar value $2.59$.
:::

---

### Example 2.2: Flow Deficit in an Aerodynamic Wind Tunnel
**Problem Statement:** A wind tunnel has a square test section of initial dimensions $600\\text{ mm} \\times 600\\text{ mm}$. At a test speed $U = 30\\text{ m/s}$, the turbulent boundary layer thickness on each of the 4 walls at the downstream end is measured as $\\delta = 28\\text{ mm}$. The velocity profile follows the $1/7$th power law: $\\frac{u}{U} = (y/\\delta)^{1/7}$.
1. Calculate the displacement thickness $\\delta^*$ on each wall.
2. Determine the accelerated core velocity $U_{exit}$ at the downstream end if the tunnel walls are parallel.
3. Determine the outward tilt angle required on each wall to keep the core velocity exactly constant at $30\\text{ m/s}$.

:::sol Step-by-Step Calculation
**Step 1: Displacement Thickness for 1/7th Power Law**
$$\\frac{\\delta^*}{\\delta} = \\int_0^1 (1 - \\eta^{1/7}) d\\eta = \\left[\\eta - \\frac{7}{8}\\eta^{8/7}\\right]_0^1 = 1 - \\frac{7}{8} = \\frac{1}{8} = 0.125$$
$$\\delta^* = 0.125 \\times 28\\text{ mm} = 3.50\\text{ mm}$$

**Step 2: Effective Area and Core Velocity**
Effective inlet area: $A_1 = 0.600 \\times 0.600 = 0.360\\text{ m}^2$.
Effective exit area (reduced by $\\delta^*$ on all 4 walls):
$$W_{eff} = 0.600 - 2(0.0035) = 0.593\\text{ m}$$
$$A_{eff, 2} = 0.593^2 = 0.3516\\text{ m}^2$$
By continuity of potential core flow:
$$U_{exit} = U_{in} \\frac{A_1}{A_{eff, 2}} = 30 \\times \\frac{0.360}{0.3516} = 30.72\\text{ m/s}$$
The core accelerates by $2.4\\%$, creating an unintended favorable pressure gradient!

**Step 3: Wall Tilt Required**
To maintain $U = 30\\text{ m/s}$, each wall must expand outward by exactly $\\delta^* = 3.5\\text{ mm}$ over the test length $L = 2.0\\text{ m}$:
$$\\tan\\alpha = \\frac{\\delta^*}{L} = \\frac{0.0035}{2.0} = 0.00175 \\implies \\alpha = 0.10^\\circ$$
:::

<!--tab:Interactive Workbench-->
### Boundary Layer Shape Factor & Profile Comparative Workbench
Use this tool to compare how different mathematical profiles (linear, parabolic, cubic, sinusoidal, 1/7th power law) alter the displacement thickness $\\delta^*$, momentum thickness $\\theta$, and shape factor $H$.

::widget[blprofile]

> [!tip] Conceptual Exploration
> Observe that for turbulent profiles (1/7th power law), $H = \\frac{1/8}{7/72} = \\frac{9}{7} \\approx 1.286$. For laminar profiles, $H$ is around $2.55 - 2.60$. A sudden spike in $H$ from $1.3$ to $> 2.5$ during experimental flow tests signifies laminar separation or reverse flow onset!

<!--tab:Interactive Practice-->
```check
[
  {
    "q": "For a linear velocity profile u/U = y/delta, calculate the ratio delta*/delta:",
    "answer": 0.50,
    "tol": 0.01,
    "unit": "",
    "hint": "Integrate (1 - eta) from 0 to 1.",
    "solution": "delta*/delta = [eta - eta^2/2] from 0 to 1 = 1 - 0.5 = 0.50."
  },
  {
    "q": "For the same linear profile u/U = y/delta, calculate the shape factor H = delta*/theta:",
    "answer": 3.00,
    "tol": 0.05,
    "unit": "",
    "hint": "theta/delta = integrate eta(1 - eta) d_eta = [eta^2/2 - eta^3/3] = 1/6. H = (1/2)/(1/6) = 3.",
    "solution": "H = (1/2) / (1/6) = 3.00."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "q": "What physical quantity is conserved to define the displacement thickness delta*?",
    "options": [
      "Total kinetic energy flux",
      "Total mass flow rate deficit across the stream-tube",
      "Turbulent Reynolds stress",
      "Angular momentum about the leading edge"
    ],
    "answer": 1,
    "why": "Displacement thickness is derived by setting the mass flow rate deficit equal to rho * U_inf * delta*."
  },
  {
    "q": "How does the boundary layer shape factor H = delta*/theta compare between laminar and turbulent boundary layers on a flat plate?",
    "options": [
      "H is much larger in turbulent flow than in laminar flow.",
      "H is identical (H = 2.0) for both laminar and turbulent flows.",
      "H is significantly smaller in turbulent flow (H ≈ 1.3) than in laminar flow (H ≈ 2.6).",
      "H depends only on fluid density, independent of velocity profile."
    ],
    "answer": 2,
    "why": "In turbulent flow, the fuller near-wall velocity profile reduces the mass flow deficit delta* much more than theta, driving H down from ~2.59 to ~1.28."
  }
]
```

<!--tab:Field Nuances & Standards-->
> [!important] Practical Insight: Wind Tunnel & Hydraulic Model Calibration
> In experimental hydraulics (CE432P Practical Lab L01), when measuring $\\theta$ from discrete velocity point measurements across a Pitot traverse:
> $$\\theta = \\sum_{i=1}^N \\frac{u_i}{U_\\infty}\\left(1 - \\frac{u_i}{U_\\infty}\\right) \\Delta y_i$$
> Because $\\theta$ is directly related to skin friction drag ($C_D = 2\\theta(L)/L$ by the von Kármán momentum theorem), measuring the momentum thickness at the exit of a bridge pier or barge model provides the **exact total skin friction drag** without needing mechanical force balance load cells!
"""

# =========================================================================
# S03: Laminar Boundary Layer on a Flat Plate & Blasius Exact Solution
# =========================================================================
s03 = """<!--tab:Theory & Derivations-->
> [!note] The Triumph of Similarity Solutions
> In 1908, Heinrich Blasius, a doctoral student of Ludwig Prandtl, achieved the first analytical breakthrough in boundary layer theory by transforming the non-linear partial differential equations of Prandtl into a single, elegant ordinary differential equation using a **similarity variable**.

## 1. Mathematical Formulation
For 2D steady laminar flow over a semi-infinite flat plate with zero pressure gradient ($dP/dx = 0$):
$$\\text{Continuity: } \\frac{\\partial u}{\\partial x} + \\frac{\\partial v}{\\partial y} = 0$$
$$\\text{Momentum: } u \\frac{\\partial u}{\\partial x} + v \\frac{\\partial u}{\\partial y} = \\nu \\frac{\\partial^2 u}{\\partial y^2}$$

Boundary conditions:
$$y = 0: \\quad u = 0, \\ v = 0$$
$$y \\to \\infty: \\quad u = U_\\infty$$

## 2. Stream Function & The Blasius Similarity Transformation
Define the stream function $\\psi(x, y)$ such that continuity is identically satisfied:
$$u = \\frac{\\partial \\psi}{\\partial y}, \\quad v = -\\frac{\\partial \\psi}{\\partial x}$$

Blasius recognized that the non-dimensional velocity profiles at different locations $x$ are geometrically similar when plotted against a normalized coordinate $\\eta$:
$$\\eta = y \\sqrt{\\frac{U_\\infty}{\\nu x}}$$

The stream function is expressed as:
$$\\psi(x, y) = \\sqrt{\\nu x U_\\infty} \\cdot f(\\eta)$$

Differentiating using the chain rule:
$$u = \\frac{\\partial \\psi}{\\partial y} = \\sqrt{\\nu x U_\\infty} f'(\\eta) \\frac{\\partial \\eta}{\\partial y} = \\sqrt{\\nu x U_\\infty} f'(\\eta) \\sqrt{\\frac{U_\\infty}{\\nu x}} = U_\\infty f'(\\eta)$$
$$\\frac{u}{U_\\infty} = f'(\\eta)$$

Similarly, for the vertical velocity $v$:
$$v = -\\frac{\\partial \\psi}{\\partial x} = \\frac{1}{2}\\sqrt{\\frac{\\nu U_\\infty}{x}}[\\eta f'(\\eta) - f(\\eta)]$$

Calculating derivative terms:
$$\\frac{\\partial u}{\\partial x} = -\\frac{U_\\infty}{2x}\\eta f''(\\eta), \\quad \\frac{\\partial u}{\\partial y} = U_\\infty \\sqrt{\\frac{U_\\infty}{\\nu x}} f''(\\eta), \\quad \\frac{\\partial^2 u}{\\partial y^2} = \\frac{U_\\infty^2}{\\nu x} f'''(\\eta)$$

Substituting these into the momentum equation:
$$U_\\infty f' \\left(-\\frac{U_\\infty \\eta f''}{2x}\\right) + \\frac{1}{2}\\sqrt{\\frac{\\nu U_\\infty}{x}}(\\eta f' - f)\\left(U_\\infty \\sqrt{\\frac{U_\\infty}{\\nu x}} f''\\right) = \\nu \\left(\\frac{U_\\infty^2}{\\nu x} f'''\\right)$$

Simplifying yields the classical **Blasius Ordinary Differential Equation**:
$$2 f''' + f f'' = 0$$

Subject to boundary conditions:
- At wall ($y = 0 \\implies \\eta = 0$): $u = 0 \\implies f'(0) = 0$; $v = 0 \\implies f(0) = 0$
- In free stream ($y \\to \\infty \\implies \\eta \\to \\infty$): $u = U_\\infty \\implies f'(\\infty) = 1$

## 3. Key Numerical Results of Blasius Solution
Blasius solved this third-order non-linear ODE numerically (via series expansion and Runge-Kutta integration):
- At $\\eta = 0$: $f''(0) = 0.33206$ (governs wall shear stress)
- At $\\eta = 4.91$: $f'(\\eta) = 0.990$ (defines boundary layer edge $\\delta$)

### Resulting Engineering Formulae:
1. **Boundary Layer Thickness ($\\delta$):**
   $$\\eta = \\delta \\sqrt{\\frac{U_\\infty}{\\nu x}} = 4.91 \\implies \\delta(x) = \\frac{4.91 x}{\\sqrt{Re_x}}$$
2. **Displacement Thickness ($\\delta^*$):**
   $$\\delta^*(x) = \\int_0^\\infty [1 - f'(\\eta)] dy = \\sqrt{\\frac{\\nu x}{U_\\infty}} \\lim_{\\eta \\to \\infty}(\\eta - f) = \\frac{1.7208 x}{\\sqrt{Re_x}}$$
3. **Momentum Thickness ($\\theta$):**
   $$\\theta(x) = \\frac{0.664 x}{\\sqrt{Re_x}}$$
4. **Local Skin Friction Coefficient ($C_{fx}$):**
   $$\\tau_0(x) = \\mu \\left.\\frac{\\partial u}{\\partial y}\\right|_{y=0} = \\mu U_\\infty \\sqrt{\\frac{U_\\infty}{\\nu x}} f''(0) = 0.332 \\frac{\\rho U_\\infty^2}{\\sqrt{Re_x}}$$
   $$C_{fx} = \\frac{\\tau_0}{\\frac{1}{2}\\rho U_\\infty^2} = \\frac{0.664}{\\sqrt{Re_x}}$$
5. **Total Drag Coefficient ($C_D$) for Length $L$:**
   $$C_D = \\frac{1}{L}\\int_0^L C_{fx} dx = \\frac{1}{L}\\int_0^L \\frac{0.664}{\\sqrt{\\frac{U_\\infty x}{\\nu}}} dx = \\frac{1.328}{\\sqrt{Re_L}}$$

<!--tab:Worked Examples-->
### Example 3.1: Boundary Layer and Drag on a Thin Towing Plate
**Problem Statement:** A thin, smooth plate $2.0\\text{ m}$ long and $1.5\\text{ m}$ wide is towed horizontally in a freshwater flume ($\\rho = 1000\\text{ kg/m}^3$, $\\nu = 1.0 \\times 10^{-6}\\text{ m}^2/\\text{s}$) at $U = 0.80\\text{ m/s}$. Assuming laminar flow over the entire surface:
1. Calculate the Reynolds number at the trailing edge.
2. Determine boundary layer thickness $\\delta$, displacement thickness $\\delta^*$, and momentum thickness $\\theta$ at $x = 1.0\\text{ m}$ and $x = 2.0\\text{ m}$.
3. Calculate the local wall shear stress $\\tau_0$ at $x = 2.0\\text{ m}$.
4. Compute the total skin friction drag force acting on **both sides** of the plate and the power required to tow it.

:::sol Step-by-Step Calculation
**Step 1: Trailing Edge Reynolds Number**
$$Re_L = \\frac{U L}{\\nu} = \\frac{0.80 \\times 2.0}{1.0 \\times 10^{-6}} = 1.60 \\times 10^6$$
*(Note: In real un-tripped calm water, laminar flow can persist up to $Re \\approx 2 \\times 10^6$).*

**Step 2: Thickness Metrics**
At $x = 1.0\\text{ m}$:
$$Re_1 = \\frac{0.80 \\times 1.0}{10^{-6}} = 8.0 \\times 10^5, \\quad \\sqrt{Re_1} = 894.43$$
$$\\delta(1.0) = \\frac{4.91 \\times 1.0}{894.43} = 5.49\\text{ mm}$$
$$\\delta^*(1.0) = \\frac{1.72 \\times 1.0}{894.43} = 1.92\\text{ mm}$$
$$\\theta(1.0) = \\frac{0.664 \\times 1.0}{894.43} = 0.742\\text{ mm}$$

At $x = 2.0\\text{ m}$:
$$Re_2 = 1.60 \\times 10^6, \\quad \\sqrt{Re_2} = 1264.91$$
$$\\delta(2.0) = \\frac{4.91 \\times 2.0}{1264.91} = 7.76\\text{ mm}$$
$$\\delta^*(2.0) = \\frac{1.72 \\times 2.0}{1264.91} = 2.72\\text{ mm}$$
$$\\theta(2.0) = \\frac{0.664 \\times 2.0}{1264.91} = 1.05\\text{ mm}$$

**Step 3: Wall Shear Stress at $x = 2.0\\text{ m}$**
$$\\tau_0(2.0) = 0.332 \\times \\frac{\\rho U^2}{\\sqrt{Re_L}} = 0.332 \\times \\frac{1000 \\times 0.80^2}{1264.91} = 0.168\\text{ N/m}^2$$

**Step 4: Total Drag and Power (Both Sides)**
Total Drag Coefficient:
$$C_D = \\frac{1.328}{\\sqrt{1.60 \\times 10^6}} = \\frac{1.328}{1264.91} = 1.050 \\times 10^{-3}$$
Wetted surface area for both sides: $A_{total} = 2 \\times (L \\times B) = 2 \\times (2.0 \\times 1.5) = 6.0\\text{ m}^2$.
$$F_D = C_D \\times \\frac{1}{2}\\rho U^2 A_{total} = 1.050 \\times 10^{-3} \\times 0.5 \\times 1000 \\times 0.80^2 \\times 6.0 = 2.016\\text{ N}$$
Power required:
$$P = F_D \\times U = 2.016\\text{ N} \\times 0.80\\text{ m/s} = 1.613\\text{ W}$$
:::

---

### Example 3.2: Shear Force Integration Verification
**Problem Statement:** Using the local wall shear stress $\\tau_0(x) = 0.332 \\rho U^2 / \\sqrt{Re_x}$, integrate $\\tau_0(x)$ directly over the plate surface from $x=0$ to $x=L$ and prove that the total skin friction drag exactly equals $F_D = C_D \\frac{1}{2}\\rho U^2 (B L)$ where $C_D = 1.328 / \\sqrt{Re_L}$.

:::sol Mathematical Proof
$$F_{D, 1\\text{-side}} = B \\int_0^L \\tau_0(x) dx = B \\int_0^L 0.332 \\rho U^2 \\sqrt{\\frac{\\nu}{U x}} dx$$
$$= 0.332 B \\rho U^2 \\sqrt{\\frac{\\nu}{U}} \\int_0^L x^{-1/2} dx = 0.332 B \\rho U^2 \\sqrt{\\frac{\\nu}{U}} [2 \\sqrt{L}]$$
$$= 0.664 B \\rho U^2 \\sqrt{\\frac{\\nu L}{U}} = 0.664 \\rho U^2 (B L) \\sqrt{\\frac{\\nu}{U L}} = \\frac{0.664}{\\sqrt{Re_L}} \\rho U^2 (B L)$$
Multiplying and dividing by $2$:
$$F_{D, 1\\text{-side}} = \\left(\\frac{1.328}{\\sqrt{Re_L}}\\right) \\cdot \\frac{1}{2}\\rho U^2 (B L) = C_D \\frac{1}{2}\\rho U^2 A$$
This proves that the average drag coefficient $C_D$ over length $L$ is exactly **twice** the local skin friction coefficient at the trailing edge:
$$C_D = 2 \\cdot C_{fx}(L)$$
:::

<!--tab:Interactive Workbench-->
### Blasius Profile Velocity & Shear Calculator
::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "q": "For a laminar flat plate flow with Re_L = 4.0e5, calculate the total drag coefficient C_D:",
    "answer": 0.0021,
    "tol": 0.0001,
    "unit": "",
    "hint": "C_D = 1.328 / sqrt(Re_L) = 1.328 / 632.45.",
    "solution": "C_D = 1.328 / sqrt(400000) = 1.328 / 632.455 = 0.0020997 ≈ 0.0021."
  },
  {
    "q": "Calculate the ratio of average drag coefficient C_D to local skin friction coefficient C_fx at the trailing edge for laminar flow:",
    "answer": 2.0,
    "tol": 0.05,
    "unit": "",
    "hint": "C_D = 1.328/sqrt(Re), C_fx = 0.664/sqrt(Re). Divide the two.",
    "solution": "1.328 / 0.664 = 2.0."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "q": "In the Blasius equation 2f''' + f f'' = 0, what does the quantity f'(eta) physically represent?",
    "options": [
      "The dimensionless stream-wise velocity ratio u / U_inf",
      "The dimensionless vertical velocity v / U_inf",
      "The local shear stress ratio tau / tau_0",
      "The static pressure coefficient Cp"
    ],
    "answer": 0,
    "why": "From stream function differentiation, u = d_psi/dy = U_inf * f'(eta), meaning f'(eta) = u/U_inf."
  },
  {
    "q": "Why does the local skin friction coefficient C_fx decrease along the length of a flat plate in laminar flow?",
    "options": [
      "Fluid density increases downstream.",
      "The boundary layer thickens (delta ∝ √x), reducing the velocity gradient du/dy at the wall.",
      "Pressure drops to absolute vacuum at the trailing edge.",
      "Frictional energy is converted into kinetic energy."
    ],
    "answer": 1,
    "why": "Wall shear stress is proportional to the velocity gradient at the wall: tau_0 = mu * (du/dy)|_0 ~ mu * U_inf / delta. As delta increases, the gradient flattens."
  }
]
```

<!--tab:Field Nuances & Standards-->
> [!note] Laboratory Verification (Practical Lab L01)
> In lab testing of boundary layers over flat plates, students use an inclined manometer connected to a boundary layer traverse probe. When plotting $u/U_\\infty$ vs $y\\sqrt{U_\\infty/\\nu x}$, all experimental data points measured at different station locations $x = 10\\text{ cm}, 20\\text{ cm}, 40\\text{ cm}$ collapse onto a **single universal curve**—empirically verifying the Blasius similarity hypothesis!
"""

write_session("S01", s01)
write_session("S02", s02)
write_session("S03", s03)
print("Part 1: S01 to S03 generated successfully!")
