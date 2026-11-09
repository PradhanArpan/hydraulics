import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S04: Momentum Integral Equation (Von Kármán) & Approximate Solutions
# =========================================================================
s04 = r"""<!--tab:Theory & Derivations-->
> [!note] Engineering Significance
> While the Blasius exact solution is restricted to laminar flow with zero pressure gradient, **Theodore von Kármán (1921)** formulated an integral momentum balance that applies universally to both laminar and turbulent flows, with or without arbitrary pressure gradients, allowing engineers to determine drag forces using approximate velocity profiles.

## 1. Derivation of the Von Kármán Integral Equation
Consider a 2D control volume of length $dx$, unit width $b=1$, extending from the solid plate $y=0$ to outside the boundary layer $y=h > \delta(x)$:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 240" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#2b6cb0"/>
      </marker>
      <marker id="redArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#e53e3e"/>
      </marker>
    </defs>
    <!-- Plate -->
    <rect x="60" y="190" width="660" height="12" fill="#4a5568" rx="2"/>
    <line x1="60" y1="202" x2="720" y2="202" stroke="#cbd5e0" stroke-width="2"/>

    <!-- Control Volume -->
    <rect x="240" y="50" width="280" height="140" fill="#ebf8ff" fill-opacity="0.6" stroke="#3182ce" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="380" y="42" fill="#2b6cb0" font-size="12" font-weight="700" text-anchor="middle">Control Volume [dx × h]</text>

    <!-- Boundary layer edge δ(x) -->
    <path d="M 60,190 Q 240,110 520,80 T 720,65" fill="none" stroke="#2b6cb0" stroke-width="2"/>
    <text x="535" y="82" fill="#2b6cb0" font-size="11" font-weight="600">y = δ(x)</text>

    <!-- Fluxes -->
    <!-- Left face -->
    <line x1="160" y1="120" x2="235" y2="120" stroke="#2b6cb0" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="150" y="105" fill="#2b6cb0" font-size="11" font-weight="600">Mass in: ṁ₁ = ∫ ρu dy</text>
    <text x="150" y="138" fill="#2b6cb0" font-size="11">Mom in: M₁ = ∫ ρu² dy</text>

    <!-- Right face -->
    <line x1="520" y1="120" x2="595" y2="120" stroke="#2b6cb0" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="605" y="105" fill="#2b6cb0" font-size="11" font-weight="600">ṁ₂ = ṁ₁ + (∂ṁ/∂x)dx</text>
    <text x="605" y="138" fill="#2b6cb0" font-size="11">M₂ = M₁ + (∂M/∂x)dx</text>

    <!-- Top face mass & momentum -->
    <line x1="380" y1="20" x2="380" y2="48" stroke="#2b6cb0" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="390" y="30" fill="#2b6cb0" font-size="11">Top influx: (ṁ₂ - ṁ₁) at vel U</text>

    <!-- Wall shear stress -->
    <line x1="420" y1="184" x2="340" y2="184" stroke="#e53e3e" stroke-width="2.5" marker-end="url(#redArr)"/>
    <text x="380" y="176" fill="#e53e3e" font-size="12" font-weight="700" text-anchor="middle">Wall Shear Force: τ₀ · dx</text>

    <!-- Dimension dx -->
    <line x1="240" y1="215" x2="520" y2="215" stroke="#718096" stroke-width="1.5"/>
    <text x="380" y="230" fill="#4a5568" font-size="11" font-weight="600" text-anchor="middle">dx</text>
  </svg>
</div>

1. **Mass conservation:**
   The mass entering through the left face is $\dot{m}_1 = \int_0^h \rho u \, dy$.
   The mass leaving through the right face is $\dot{m}_2 = \dot{m}_1 + \frac{\partial}{\partial x}\left[\int_0^h \rho u \, dy\right] dx$.
   By continuity, the mass influx entering across the upper boundary $y=h$ is:
   $$d\dot{m}_{top} = \dot{m}_2 - \dot{m}_1 = \frac{\partial}{\partial x}\left(\int_0^h \rho u \, dy\right) dx$$

2. **Momentum balance in $x$-direction:**
   $$\sum F_x = \text{Net flux of momentum out of CV}$$
   $$- \tau_0 \, dx - h \frac{dP}{dx} \, dx = \frac{\partial}{\partial x}\left(\int_0^h \rho u^2 \, dy\right)dx - U_\infty \, d\dot{m}_{top}$$
   Substituting $d\dot{m}_{top}$ and dividing by $\rho \, dx$:
   $$\frac{\tau_0}{\rho} = \frac{d}{dx} \int_0^\delta u (U_\infty - u) \, dy + \frac{dU_\infty}{dx} \int_0^\delta (U_\infty - u) \, dy$$
   Recalling definitions of displacement thickness $\delta^*$ and momentum thickness $\theta$:
   $$\frac{\tau_0}{\rho U_\infty^2} = \frac{d\theta}{dx} + (2\theta + \delta^*) \frac{1}{U_\infty}\frac{dU_\infty}{dx}$$
   For flow over a flat plate with zero pressure gradient ($\frac{dU_\infty}{dx} = 0$), this simplifies to the famous **Von Kármán Momentum Integral Equation**:
   $$\frac{\tau_0}{\rho U_\infty^2} = \frac{d\theta}{dx} = \frac{C_{fx}}{2}$$

## 2. Approximate Velocity Profiles Comparison
By assuming an approximate polynomial profile satisfying physical boundary conditions:
1. At $y=0$: $u=0$, $\mu \frac{\partial^2 u}{\partial y^2} = \frac{dP}{dx} = 0$
2. At $y=\delta$: $u=U_\infty$, $\frac{\partial u}{\partial y} = 0$

| Profile Form $\eta = y/\delta$ | $\frac{\delta^*}{\delta}$ | $\frac{\theta}{\delta}$ | Shape Factor $H$ | $\delta(x) / \sqrt{\frac{\nu x}{U_\infty}}$ | Local Skin Friction $C_{fx} \sqrt{Re_x}$ | Error vs Blasius |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Linear:** $\frac{u}{U} = \eta$ | $0.500$ | $0.167$ | $3.00$ | $3.46$ | $0.578$ | $-13.1\%$ ($C_f$) |
| **Parabolic:** $2\eta - \eta^2$ | $0.333$ | $0.133$ | $2.50$ | $5.48$ | $0.730$ | $+9.9\%$ ($C_f$) |
| **Cubic:** $\frac{3}{2}\eta - \frac{1}{2}\eta^3$ | $0.375$ | $0.139$ | $2.69$ | $4.64$ | $0.646$ | $-2.7\%$ ($C_f$) |
| **Sinusoidal:** $\sin(\frac{\pi}{2}\eta)$ | $0.363$ | $0.137$ | $2.66$ | $4.79$ | $0.655$ | $-1.4\%$ ($C_f$) |
| **Blasius (Exact)** | $0.344$ | $0.133$ | $2.59$ | $4.91$ | $0.664$ | Exact benchmark |

The **cubic profile** provides an exceptionally close match to exact theory with an error under $3\%$, confirming the power of integral analysis!

<!--tab:Worked Examples-->
### Example 4.1: Boundary Layer Parameters using Cubic Velocity Profile
**Problem:** A laminar boundary layer over a flat plate is approximated by the cubic profile $\frac{u}{U_\infty} = \frac{3}{2}\left(\frac{y}{\delta}\right) - \frac{1}{2}\left(\frac{y}{\delta}\right)^3$.
1. Derive expressions for $\delta(x)$, $\tau_0(x)$, and local skin friction coefficient $C_{fx}$.
2. If air ($\rho = 1.225 \text{ kg/m}^3, \nu = 1.50 \times 10^{-5} \text{ m}^2/\text{s}$) flows at $U_\infty = 4.0 \text{ m/s}$ along a $1.8 \text{ m}$ plate, compute $\delta$ and $\tau_0$ at the mid-point ($x = 0.9 \text{ m}$).

**Solution:**
1. **Integration for $\theta$:**
   $$\theta = \delta \int_0^1 \left(\frac{3}{2}\eta - \frac{1}{2}\eta^3\right)\left(1 - \frac{3}{2}\eta + \frac{1}{2}\eta^3\right) d\eta = \frac{39}{280}\delta \approx 0.1393 \delta$$
   From Newton's Law of Viscosity at $y=0$:
   $$\tau_0 = \mu \left.\frac{\partial u}{\partial y}\right|_{y=0} = \frac{\mu U_\infty}{\delta} \left[\frac{3}{2} - \frac{3}{2}\eta^2\right]_{\eta=0} = \frac{3 \mu U_\infty}{2 \delta}$$
   Equating with Von Kármán equation $\tau_0 = \rho U_\infty^2 \frac{d\theta}{dx}$:
   $$\frac{3 \mu U_\infty}{2 \delta} = \rho U_\infty^2 \left(\frac{39}{280}\right) \frac{d\delta}{dx} \implies \delta \, d\delta = \frac{140 \nu}{13 U_\infty} dx$$
   Integrating with initial condition $\delta(0) = 0$:
   $$\frac{\delta^2}{2} = \frac{140 \nu x}{13 U_\infty} \implies \delta(x) = \sqrt{\frac{280}{13}} \sqrt{\frac{\nu x}{U_\infty}} = 4.64 \sqrt{\frac{\nu x}{U_\infty}} = \frac{4.64 x}{\sqrt{Re_x}}$$
   Substituting $\delta(x)$ into wall shear stress:
   $$\tau_0(x) = \frac{3 \mu U_\infty}{2 (4.64 x / \sqrt{Re_x})} = 0.323 \frac{\rho U_\infty^2}{\sqrt{Re_x}} \implies C_{fx} = \frac{\tau_0}{\frac{1}{2}\rho U_\infty^2} = \frac{0.646}{\sqrt{Re_x}}$$

2. **Numerical Computation at $x = 0.9 \text{ m}$:**
   $$Re_x = \frac{U_\infty x}{\nu} = \frac{4.0 \times 0.9}{1.50 \times 10^{-5}} = 2.40 \times 10^5 \quad (\text{Laminar regime since } Re_x < 5 \times 10^5)$$
   $$\delta(0.9) = \frac{4.64 \times 0.9}{\sqrt{2.40 \times 10^5}} = \frac{4.176}{489.9} = 0.00852 \text{ m} = 8.52 \text{ mm}$$
   $$\tau_0(0.9) = 0.323 \times \frac{1.225 \times 4.0^2}{489.9} = \frac{6.331}{489.9} = 0.0129 \text{ N/m}^2 = 12.9 \text{ mPa}$$

---

### Example 4.2: Total Frictional Drag Force on Both Sides of a Signboard
**Problem:** A smooth thin rectangular signboard measuring $2.0 \text{ m}$ length (parallel to wind) and $1.2 \text{ m}$ height is mounted on a highway. Wind blows at $U_\infty = 12 \text{ m/s}$ ($\rho = 1.20 \text{ kg/m}^3, \nu = 1.50 \times 10^{-5} \text{ m}^2/\text{s}$). Calculate the total skin friction drag force acting on **both sides** using the cubic profile.

**Solution:**
1. Trailing-edge Reynolds number:
   $$Re_L = \frac{U_\infty L}{\nu} = \frac{12 \times 2.0}{1.50 \times 10^{-5}} = 1.60 \times 10^6$$
   *Note:* Critical transition occurs at $x_{cr} = \frac{5 \times 10^5 \times 1.50 \times 10^{-5}}{12} = 0.625 \text{ m}$. For the purely laminar zone up to $x_{cr}$:
   Average drag coefficient $C_{DF} = 2 \times C_{fx}(x_{cr}) = \frac{1.292}{\sqrt{Re_{cr}}} = \frac{1.292}{\sqrt{5 \times 10^5}} = 0.001827$.
   Laminar drag force on one side:
   $$F_{D,lam} = C_{DF} \cdot \frac{1}{2}\rho U_\infty^2 \cdot (b \cdot x_{cr}) = 0.001827 \times \frac{1}{2}(1.20)(12)^2 \times (1.2 \times 0.625) = 0.118 \text{ N}$$

<!--tab:Interactive Workbench-->
### Boundary Layer Momentum & Profile Simulator
Use the interactive simulation below to examine how the shape factor $H$, boundary layer growth $\delta(x)$, and wall shear stress $\tau_0$ vary with velocity, fluid properties, and downstream distance.

::widget[blprofile]

> [!tip] Exploration Challenge
> 1. Set free-stream velocity to $U_\infty = 3.0 \text{ m/s}$ and note $\delta$ at $x = 1.0 \text{ m}$.
> 2. Increase viscosity 4-fold (e.g. from water to engine oil). Observe how $\delta$ scales as $\sqrt{\nu}$.
> 3. Verify that the ratio $\delta^* / \theta$ remains locked at the theoretical shape factor $H$ for laminar conditions.

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c4_1",
    "question": "For a laminar boundary layer with cubic profile, what is the theoretical value of the shape factor H = δ*/θ?",
    "answer": 2.69,
    "tol": 0.05,
    "unit": "",
    "hint": "Divide δ*/δ = 3/8 by θ/δ = 39/280.",
    "solution": "H = (3/8) / (39/280) = (0.375) / (0.1393) ≈ 2.69."
  },
  {
    "id": "c4_2",
    "question": "Water (ν = 1.0e-6 m²/s) flows at U = 2 m/s over a plate. Using Blasius scaling δ = 4.91√(ν x / U), compute δ at x = 0.5 m in millimeters.",
    "answer": 2.455,
    "tol": 0.05,
    "unit": "mm",
    "hint": "Calculate √(1e-6 * 0.5 / 2.0) = √(2.5e-7) = 0.0005 m. Multiply by 4.91 and convert to mm.",
    "solution": "δ = 4.91 * √(1.0e-6 * 0.5 / 2.0) = 4.91 * 0.0005 = 0.002455 m = 2.455 mm."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "In the Von Kármán momentum integral equation for zero pressure gradient, τ₀/(ρ U²) equals which of the following?",
    "options": [
      "dδ/dx",
      "dδ*/dx",
      "dθ/dx",
      "dH/dx"
    ],
    "answer": 2,
    "explanation": "By conservation of momentum across the control volume, wall shear stress τ₀ is directly proportional to the spatial rate of change of momentum thickness: τ₀ = ρ U² (dθ/dx)."
  },
  {
    "question": "Why does a linear velocity profile underpredict the boundary layer thickness compared to the Blasius solution?",
    "options": [
      "It assumes zero shear stress at the plate surface",
      "It fails to satisfy the zero shear stress condition ∂u/∂y = 0 at y = δ",
      "It violates the no-slip condition at the wall",
      "It violates mass conservation across the boundary layer"
    ],
    "answer": 1,
    "explanation": "A linear profile has a constant gradient ∂u/∂y = U/δ everywhere, which abruptly drops to zero at y = δ without satisfying the physical boundary condition ∂u/∂y(δ) = 0."
  },
  {
    "question": "If the free-stream velocity over a plate increases by a factor of 4, the laminar boundary layer thickness δ at a fixed x:",
    "options": [
      "Doubles",
      "Is halved",
      "Quadruples",
      "Decreases by a factor of 4"
    ],
    "answer": 1,
    "explanation": "Since δ ∝ 1/√U_∞, quadrupling U_∞ reduces δ by a factor of √4 = 2 (i.e. halved)."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Real-World Field Nuances & Standards
1. **Ship Hull Friction Drag (ITTC 1957 Line):**
   Naval architects designing supertankers and container vessels use the International Towing Tank Conference (ITTC 1957) skin friction correlation derived from momentum integral analysis:
   $$C_F = \frac{0.075}{(\log_{10} Re_L - 2)^2}$$
   Over $70\%$ of the total fuel consumption of large commercial cargo vessels is expended purely to overcome boundary layer friction drag!

2. **Wind Tunnel Divergence Angle:**
   In closed-circuit subsonic wind tunnels, the test section side-walls are manufactured with an intentional divergence of $0.5^\circ \text{ to } 1.0^\circ$. This widening exactly offsets the boundary layer displacement thickness $\delta^*(x)$ along the walls, ensuring that the effective core cross-sectional area remains strictly constant, preventing artificial axial pressure drops ($dP/dx = 0$).
"""

# =========================================================================
# S05: Turbulent Boundary Layer Dynamics, Reynolds Stresses & 1/7th Power Law
# =========================================================================
s05 = r"""<!--tab:Theory & Derivations-->
> [!note] The Physics of Turbulence
> When the Reynolds number exceeds critical values ($Re_x > 5 \times 10^5$), laminar flow succumbs to non-linear hydrodynamic instability. The velocity field decomposes into mean and fluctuating components: $u = \bar{u} + u'$, $v = \bar{v} + v'$. This erratic 3D eddy churning transfers momentum across fluid layers orders of magnitude faster than molecular diffusion.

## 1. Turbulent Velocity Architecture: Three Distinct Sub-Layers
Unlike the gentle parabolic profile of laminar flow, the turbulent boundary layer exhibits a very steep gradient near the wall and a relatively flat profile across the core:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 260" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Wall -->
    <rect x="80" y="220" width="620" height="12" fill="#4a5568" rx="2"/>
    <text x="390" y="248" fill="#718096" font-size="12" font-weight="700" text-anchor="middle">Solid Impermeable Wall (y = 0)</text>

    <!-- Layers -->
    <!-- 1. Viscous Sublayer -->
    <rect x="80" y="196" width="620" height="24" fill="#fed7d7" fill-opacity="0.6"/>
    <line x1="80" y1="196" x2="700" y2="196" stroke="#e53e3e" stroke-dasharray="4,4"/>
    <text x="710" y="210" fill="#c53030" font-size="11" font-weight="600">Viscous Sublayer (y⁺ < 5)</text>

    <!-- 2. Buffer Layer -->
    <rect x="80" y="160" width="620" height="36" fill="#feebc8" fill-opacity="0.5"/>
    <line x1="80" y1="160" x2="700" y2="160" stroke="#dd6b20" stroke-dasharray="4,4"/>
    <text x="710" y="180" fill="#c05621" font-size="11" font-weight="600">Buffer Layer (5 < y⁺ < 30)</text>

    <!-- 3. Log-law Overlap Layer -->
    <rect x="80" y="80" width="620" height="80" fill="#c6f6d5" fill-opacity="0.4"/>
    <line x1="80" y1="80" x2="700" y2="80" stroke="#38a169" stroke-dasharray="4,4"/>
    <text x="710" y="125" fill="#276749" font-size="11" font-weight="600">Log-Law Inertial Sublayer (30 < y⁺ < 500)</text>

    <!-- Outer Wake Layer -->
    <rect x="80" y="30" width="620" height="50" fill="#ebf8ff" fill-opacity="0.4"/>
    <text x="710" y="55" fill="#2b6cb0" font-size="11" font-weight="600">Outer Wake Core (y⁺ > 500)</text>

    <!-- Velocity Profile Curve -->
    <path d="M 80,220 C 140,210 240,195 380,140 C 460,100 520,60 560,30" fill="none" stroke="#2b6cb0" stroke-width="3"/>
    <text x="570" y="30" fill="#2b6cb0" font-size="12" font-weight="700">Turbulent Mean Profile ū(y)</text>
  </svg>
</div>

1. **Viscous (Laminar) Sublayer ($y^+ = \frac{y u_*}{\nu} < 5$):**
   Adjacent to the solid boundary, turbulent fluctuations are physically damped by the wall. Reynolds stresses vanish ($-\rho \overline{u'v'} \to 0$) and shear is purely molecular:
   $$u^+ = y^+ \quad \text{where } u^+ = \frac{\bar{u}}{u_*}, \quad u_* = \sqrt{\frac{\tau_0}{\rho}} \text{ (friction velocity)}$$
   The sublayer thickness is microscopically small: $\delta' \approx \frac{11.6 \nu}{u_*}$.

2. **Buffer Transition Zone ($5 < y^+ < 30$):**
   Both molecular shear stresses and turbulent Reynolds stresses contribute comparably.

3. **Logarithmic Overlap Region ($30 < y^+ < 500$):**
   Turbulent eddy viscosity completely dwarfs molecular viscosity ($\epsilon_m \gg \nu$). Prandtl's mixing length model ($l = \kappa y$) yields von Kármán's Universal Law of the Wall:
   $$u^+ = \frac{1}{\kappa} \ln y^+ + B \approx 2.5 \ln y^+ + 5.5 \quad (\kappa \approx 0.41)$$

## 2. The 1/7th Power Law Approximation (Prandtl)
For moderate Reynolds numbers ($5 \times 10^5 < Re_x < 10^7$), the turbulent velocity distribution is accurately captured by Prandtl's empirical 1/7th power law:
$$\frac{u}{U_\infty} = \left(\frac{y}{\delta}\right)^{1/7}$$

Applying Von Kármán's integral formulation with Blasius pipe resistance law $\tau_0 = 0.0225 \rho U_\infty^2 \left(\frac{\nu}{U_\infty \delta}\right)^{1/4}$:
$$\frac{\delta^*}{\delta} = \int_0^1 (1 - \eta^{1/7}) d\eta = \frac{1}{8} = 0.125$$
$$\frac{\theta}{\delta} = \int_0^1 \eta^{1/7}(1 - \eta^{1/7}) d\eta = \frac{7}{72} \approx 0.0972$$
$$\text{Shape factor } H = \frac{\delta^*}{\theta} = \frac{1/8}{7/72} = \frac{9}{7} \approx 1.286$$

Equating $\tau_0 = \rho U_\infty^2 \frac{d\theta}{dx}$:
$$\delta(x) = \frac{0.37 x}{Re_x^{1/5}} = \frac{0.37 x}{Re_x^{0.2}}$$
$$C_{fx} = \frac{0.059}{Re_x^{1/5}}, \quad C_{DF} = \frac{0.074}{Re_L^{1/5}}$$

Notice that while laminar boundary layers grow as $\delta \propto x^{0.5}$, turbulent boundary layers expand much faster as $\delta \propto x^{0.8}$!

<!--tab:Worked Examples-->
### Example 5.1: Turbulent Boundary Layer Growth on a Commercial Barge
**Problem:** A flat-bottomed commercial barge of length $L = 40 \text{ m}$ travels through fresh water ($\rho = 1000 \text{ kg/m}^3, \nu = 1.05 \times 10^{-6} \text{ m}^2/\text{s}$) at $U_\infty = 5.0 \text{ m/s}$. Assuming the boundary layer is turbulent from the leading edge:
1. Calculate the boundary layer thickness $\delta$ and displacement thickness $\delta^*$ at the stern ($x = 40 \text{ m}$).
2. Determine the local wall shear stress $\tau_0$ at the stern.
3. Compute the total skin friction drag force per meter width on the bottom surface.

**Solution:**
1. **Stern Reynolds number:**
   $$Re_L = \frac{U_\infty L}{\nu} = \frac{5.0 \times 40}{1.05 \times 10^{-6}} = 1.905 \times 10^8$$
   Boundary layer thickness $\delta$:
   $$\delta(40) = \frac{0.37 \times 40}{(1.905 \times 10^8)^{0.2}} = \frac{14.8}{45.47} = 0.3255 \text{ m} = 325.5 \text{ mm}$$
   Displacement thickness $\delta^*$:
   $$\delta^* = \frac{1}{8} \delta = \frac{325.5}{8} = 40.69 \text{ mm}$$

2. **Stern Wall Shear Stress $\tau_0$:**
   $$C_{fL} = \frac{0.059}{(1.905 \times 10^8)^{0.2}} = \frac{0.059}{45.47} = 1.298 \times 10^{-3}$$
   $$\tau_0(L) = \frac{1}{2}\rho U_\infty^2 C_{fL} = \frac{1}{2}(1000)(5.0)^2 (1.298 \times 10^{-3}) = 16.22 \text{ N/m}^2$$

3. **Total Skin Friction Drag Force per Meter Width ($b = 1.0 \text{ m}$):**
   $$C_{DF} = \frac{0.074}{(1.905 \times 10^8)^{0.2}} = \frac{0.074}{45.47} = 1.627 \times 10^{-3}$$
   $$F_D = C_{DF} \cdot \frac{1}{2}\rho U_\infty^2 \cdot (L \cdot b) = (1.627 \times 10^{-3}) \times 0.5 \times 1000 \times 25 \times (40 \times 1) = 813.5 \text{ N/m}$$

---

### Example 5.2: Viscous Sublayer Thickness
**Problem:** In the barge flow of Example 5.1, determine:
1. The shear velocity $u_*$ at the stern.
2. The nominal physical thickness of the laminar/viscous sublayer $\delta'$.

**Solution:**
1. Shear velocity:
   $$u_* = \sqrt{\frac{\tau_0}{\rho}} = \sqrt{\frac{16.22}{1000}} = \sqrt{0.01622} = 0.1274 \text{ m/s}$$
2. Viscous sublayer thickness:
   $$\delta' = \frac{11.6 \nu}{u_*} = \frac{11.6 \times (1.05 \times 10^{-6})}{0.1274} = 9.56 \times 10^{-5} \text{ m} = 0.0956 \text{ mm} \approx 96 \ \mu\text{m}$$
   *Engineering Insight:* Even though the total turbulent boundary layer is over $32 \text{ cm}$ thick, the viscous sublayer is less than a tenth of a millimeter thick! Any surface roughness asperities taller than $96 \ \mu\text{m}$ will protrude through this sublayer, drastically increasing form drag.

<!--tab:Interactive Workbench-->
### Turbulent Boundary Layer Simulator
Interact with the live solver to contrast laminar versus turbulent boundary layer growth rates and shear distributions.

::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c5_1",
    "question": "For a turbulent boundary layer following the 1/7th power law, what is the theoretical Shape Factor H?",
    "answer": 1.286,
    "tol": 0.02,
    "unit": "",
    "hint": "Calculate (1/8) / (7/72) = 72 / 56.",
    "solution": "H = δ*/θ = (1/8) / (7/72) = 9/7 ≈ 1.286."
  },
  {
    "id": "c5_2",
    "question": "If Re_x = 1.0e7, calculate the local skin friction coefficient C_fx * 1000 using C_fx = 0.059 / (Re_x^0.2).",
    "answer": 2.349,
    "tol": 0.05,
    "unit": "×10⁻³",
    "hint": "(10^7)^0.2 = 10^(1.4) ≈ 25.119. C_fx = 0.059 / 25.119.",
    "solution": "C_fx = 0.059 / (1e7)^0.2 = 0.059 / 25.1189 = 0.002349 = 2.349 × 10⁻³."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the velocity profile of a turbulent boundary layer fuller (flatter) than that of a laminar boundary layer?",
    "options": [
      "Molecular viscosity increases by several orders of magnitude",
      "Violent turbulent eddy momentum exchange rapidly mixes high-velocity fluid downward toward the wall",
      "Turbulent flow experiences zero wall shear stress",
      "Static pressure decreases drastically normal to the plate"
    ],
    "answer": 1,
    "explanation": "Turbulent eddies generate large Reynolds stresses (-ρ u'v') that transport fluid momentum between adjacent layers far more effectively than molecular diffusion, flattening the core velocity profile."
  },
  {
    "question": "A boundary layer has a measured shape factor of H = 1.30. What flow regime does this indicate?",
    "options": [
      "Laminar boundary layer",
      "Turbulent boundary layer",
      "Separated boundary layer",
      "Inviscid potential flow"
    ],
    "answer": 1,
    "explanation": "Laminar boundary layers have H ≈ 2.59 (Blasius), while turbulent boundary layers have H ≈ 1.28 to 1.40. A shape factor of 1.30 indicates a healthy turbulent boundary layer."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Marine Biofouling:**
   In ocean engineering and coastal structures, barnacle and algae growth creates surface roughness $k_s$ exceeding several millimeters. This pierces the $96 \ \mu\text{m}$ viscous sublayer, transitioning the hull into the "hydraulically rough" regime where friction drag becomes independent of Reynolds number and increases fuel consumption by up to $40\%$. Anti-fouling self-polishing copolymer coatings are mandated by IMO standards to maintain hydrodynamic smoothness.
"""

# =========================================================================
# S06: Hydrodynamically Smooth vs. Rough Boundaries & Friction Drag Formulations
# =========================================================================
s06 = r"""<!--tab:Theory & Derivations-->
> [!note] Nikuradse's Landmark Experiment (1933)
> Johann Nikuradse coated the inside of commercial pipes with uniformly graded sand grains of diameter $k$ to discover whether a boundary is "smooth" or "rough". He proved that surface roughness is not an absolute physical dimension, but rather a **hydrodynamic ratio** comparing grain height $k$ to the thickness of the laminar viscous sublayer $\delta'$.

## 1. Physical Criteria: Smooth, Transition, and Rough Boundaries

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 200" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Case 1: Smooth -->
    <g transform="translate(20, 10)">
      <rect x="0" y="110" width="220" height="10" fill="#4a5568"/>
      <!-- Sand grains -->
      <circle cx="20" cy="110" r="3" fill="#a0aec0"/>
      <circle cx="50" cy="110" r="4" fill="#a0aec0"/>
      <circle cx="90" cy="110" r="3" fill="#a0aec0"/>
      <circle cx="130" cy="110" r="4" fill="#a0aec0"/>
      <circle cx="170" cy="110" r="3" fill="#a0aec0"/>
      <!-- Sublayer covering grains -->
      <rect x="0" y="80" width="220" height="30" fill="#c6f6d5" fill-opacity="0.6"/>
      <line x1="0" y1="80" x2="220" y2="80" stroke="#38a169" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="110" y="70" fill="#22543d" font-size="11" font-weight="700" text-anchor="middle">Hydraulically Smooth</text>
      <text x="110" y="145" fill="#2d3748" font-size="11" text-anchor="middle">k < δ' / 4 (or k⁺ < 5)</text>
      <text x="110" y="162" fill="#718096" font-size="10" text-anchor="middle">Grains submerged inside sublayer</text>
    </g>

    <!-- Case 2: Transition -->
    <g transform="translate(270, 10)">
      <rect x="0" y="110" width="220" height="10" fill="#4a5568"/>
      <circle cx="30" cy="110" r="9" fill="#a0aec0"/>
      <circle cx="80" cy="110" r="8" fill="#a0aec0"/>
      <circle cx="130" cy="110" r="10" fill="#a0aec0"/>
      <circle cx="180" cy="110" r="8" fill="#a0aec0"/>
      <rect x="0" y="80" width="220" height="30" fill="#feebc8" fill-opacity="0.6"/>
      <line x1="0" y1="80" x2="220" y2="80" stroke="#dd6b20" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="110" y="70" fill="#7b341e" font-size="11" font-weight="700" text-anchor="middle">Transition Regime</text>
      <text x="110" y="145" fill="#2d3748" font-size="11" text-anchor="middle">δ'/4 ≤ k ≤ 6δ' (5 ≤ k⁺ ≤ 70)</text>
      <text x="110" y="162" fill="#718096" font-size="10" text-anchor="middle">Grains protrude partially</text>
    </g>

    <!-- Case 3: Rough -->
    <g transform="translate(520, 10)">
      <rect x="0" y="110" width="220" height="10" fill="#4a5568"/>
      <polygon points="10,110 30,70 50,110" fill="#718096"/>
      <polygon points="60,110 85,65 110,110" fill="#718096"/>
      <polygon points="120,110 145,60 170,110" fill="#718096"/>
      <polygon points="175,110 195,75 215,110" fill="#718096"/>
      <rect x="0" y="95" width="220" height="15" fill="#fed7d7" fill-opacity="0.6"/>
      <line x1="0" y1="95" x2="220" y2="95" stroke="#e53e3e" stroke-width="2" stroke-dasharray="4,3"/>
      <text x="110" y="50" fill="#742a2a" font-size="11" font-weight="700" text-anchor="middle">Completely Rough</text>
      <text x="110" y="145" fill="#2d3748" font-size="11" text-anchor="middle">k > 6δ' (k⁺ > 70)</text>
      <text x="110" y="162" fill="#718096" font-size="10" text-anchor="middle">Sublayer destroyed by form drag</text>
    </g>
  </svg>
</div>

The non-dimensional roughness Reynolds number is defined as:
$$k^+ = \frac{k_s u_*}{\nu}$$

1. **Hydraulically Smooth Regime ($k^+ < 5$ or $k < \frac{\delta'}{4}$):**
   Roughness projections are completely submerged within the laminar sublayer. Flow outside feels no roughness effects; resistance depends solely on Reynolds number: $C_f = f(Re)$.
2. **Transition Regime ($5 \le k^+ \le 70$):**
   Roughness peaks puncture the sublayer, shedding micro-vortices. Resistance depends on both Reynolds number and relative roughness: $C_f = f(Re, k/x)$.
3. **Completely Rough Regime ($k^+ > 70$ or $k > 6\delta'$):**
   The viscous sublayer is completely demolished. Individual asperities experience direct form (pressure) drag. Friction becomes strictly independent of viscosity and Reynolds number, depending purely on geometry:
   $$C_f = f\left(\frac{k_s}{x}\right)$$

## 2. Friction Drag Formulas for Flat Plates
For a flat plate of length $L$:
- **Smooth Turbulent Plate (Prandtl-Schlichting):**
  $$C_{DF} = \frac{0.455}{(\log_{10} Re_L)^{2.58}} - \frac{1700}{Re_L} \quad (\text{accounting for initial laminar zone})$$
- **Rough Turbulent Plate (Schlichting):**
  $$C_{DF} = \left(1.89 + 1.62 \log_{10} \frac{L}{k_s}\right)^{-2.5}$$

<!--tab:Worked Examples-->
### Example 6.1: Determining Boundary Regime of a Water Canal Lining
**Problem:** Water ($\nu = 1.0 \times 10^{-6} \text{ m}^2/\text{s}, \rho = 1000 \text{ kg/m}^3$) flows along a smooth concrete surface at shear stress $\tau_0 = 4.0 \text{ N/m}^2$. The average sand grain roughness of the concrete is $k_s = 0.25 \text{ mm}$.
1. Calculate the shear velocity $u_*$ and viscous sublayer thickness $\delta'$.
2. Determine whether the surface behaves as hydrodynamically smooth, transition, or rough.

**Solution:**
1. **Shear velocity:**
   $$u_* = \sqrt{\frac{\tau_0}{\rho}} = \sqrt{\frac{4.0}{1000}} = 0.06325 \text{ m/s}$$
   Viscous sublayer thickness:
   $$\delta' = \frac{11.6 \nu}{u_*} = \frac{11.6 \times 1.0 \times 10^{-6}}{0.06325} = 1.834 \times 10^{-4} \text{ m} = 0.1834 \text{ mm}$$

2. **Roughness Reynolds number $k^+$:**
   $$k^+ = \frac{k_s u_*}{\nu} = \frac{(0.25 \times 10^{-3}) \times 0.06325}{1.0 \times 10^{-6}} = 15.81$$
   Since $5 < k^+ < 70$, the concrete boundary operates in the **transition regime**. The roughness elements protrude through the laminar sublayer, causing extra eddy shedding.

---

### Example 6.2: Drag Force on a Rough Ship Hull
**Problem:** A vessel of length $L = 60 \text{ m}$ and wetted bottom area $A = 750 \text{ m}^2$ sails at $U = 8 \text{ m/s}$ in seawater ($\rho = 1025 \text{ kg/m}^3$). If the hull has aged with equivalent sand roughness $k_s = 1.5 \text{ mm}$, calculate the total skin friction drag force using Schlichting's rough plate formula.

**Solution:**
1. Relative roughness ratio:
   $$\frac{L}{k_s} = \frac{60}{0.0015} = 40,000$$
   $$\log_{10}\left(\frac{L}{k_s}\right) = \log_{10}(40,000) = 4.602$$

2. Total drag coefficient:
   $$C_{DF} = \left[1.89 + 1.62 (4.602)\right]^{-2.5} = [1.89 + 7.455]^{-2.5} = [9.345]^{-2.5} = 0.00366$$

3. Total skin friction drag:
   $$F_D = C_{DF} \cdot \frac{1}{2}\rho U^2 A = 0.00366 \times \frac{1}{2}(1025)(8.0)^2 \times 750 = 90,043 \text{ N} \approx 90.04 \text{ kN}$$

<!--tab:Interactive Workbench-->
### Hydrodynamic Roughness Simulator
Evaluate the impact of surface roughness and shear velocity on boundary classification and drag coefficient.

::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c6_1",
    "question": "If tau_0 = 9.0 N/m² in water (rho = 1000 kg/m³), what is the shear velocity u_* in m/s?",
    "answer": 0.0949,
    "tol": 0.002,
    "unit": "m/s",
    "hint": "u_* = sqrt(tau_0 / rho) = sqrt(9.0 / 1000).",
    "solution": "u_* = sqrt(0.009) ≈ 0.09487 m/s."
  },
  {
    "id": "c6_2",
    "question": "Calculate the roughness Reynolds number k⁺ for k_s = 0.1 mm, u_* = 0.08 m/s, and ν = 1.0e-6 m²/s.",
    "answer": 8.0,
    "tol": 0.1,
    "unit": "",
    "hint": "k⁺ = k_s * u_* / ν with k_s in meters.",
    "solution": "k⁺ = (0.1e-3 * 0.08) / 1.0e-6 = 8.0e-6 / 1.0e-6 = 8.0."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "A pipe boundary is classified as 'hydraulically rough' when the roughness Reynolds number k⁺ satisfies:",
    "options": [
      "k⁺ < 5",
      "5 ≤ k⁺ ≤ 70",
      "k⁺ > 70",
      "k⁺ > 500"
    ],
    "answer": 2,
    "explanation": "For k⁺ > 70, roughness asperities extend far beyond the viscous sublayer into the turbulent zone, making friction drag purely pressure-dominated and independent of Reynolds number."
  },
  {
    "question": "When a fluid flow transitions into the 'completely rough' regime, what happens to the Darcy friction factor f?",
    "options": [
      "It approaches zero",
      "It becomes inversely proportional to Reynolds number (f = 64/Re)",
      "It becomes independent of Reynolds number and depends solely on relative roughness k/D",
      "It fluctuates chaotically"
    ],
    "answer": 2,
    "explanation": "In the completely rough regime, viscous forces are completely overwhelmed by form drag across the asperities, so f becomes constant for a given k/D (represented by horizontal lines on the Moody diagram)."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Concrete Penstock Ageing:**
   In hydroelectric penstocks and large municipal aqueducts, smooth newly placed concrete typically exhibits $k_s \approx 0.18 \text{ mm}$. Over 15 years of mineral deposition and mild cavitation pitting, $k_s$ escalates to $1.2 - 2.5 \text{ mm}$. Hydraulic engineers must design turbines with adequate head contingency to accommodate this $25-35\%$ rise in conduit friction loss over the design lifespan.
"""

# =========================================================================
# S07: Adverse Pressure Gradients, Boundary Layer Separation & Bluff Body Aerodynamics
# =========================================================================
s07 = r"""<!--tab:Theory & Derivations-->
> [!note] The Genesis of Flow Separation
> Flow separation is the primary cause of aerodynamic stall in aircraft, hydraulic surge in expanding diffusers, and destructive vortex-induced vibration (VIV) on bridge piers. It occurs exclusively when fluid encounters an **adverse (decelerating) pressure gradient** ($dP/dx > 0$).

## 1. Physical Mechanism of Boundary Layer Separation
Consider flow over a curved surface such as a cylinder or an expanding diffuser:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 260" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <defs>
      <marker id="sArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#3182ce"/>
      </marker>
      <marker id="revArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#e53e3e"/>
      </marker>
    </defs>
    <!-- Surface contour -->
    <path d="M 40,210 C 200,210 260,180 400,180 C 540,180 620,220 740,230" fill="none" stroke="#4a5568" stroke-width="4"/>

    <!-- Profile 1: Favorable (dP/dx < 0) -->
    <g transform="translate(100, 210)">
      <line x1="0" y1="0" x2="0" y2="-100" stroke="#a0aec0" stroke-dasharray="2,2"/>
      <path d="M 0,0 C 40,-10 65,-50 70,-100" fill="none" stroke="#3182ce" stroke-width="2"/>
      <text x="0" y="20" fill="#2b6cb0" font-size="11" font-weight="700" text-anchor="middle">dP/dx < 0</text>
      <text x="0" y="34" fill="#718096" font-size="10" text-anchor="middle">(Accelerating)</text>
    </g>

    <!-- Profile 2: Zero gradient (dP/dx = 0) -->
    <g transform="translate(300, 185)">
      <line x1="0" y1="0" x2="0" y2="-100" stroke="#a0aec0" stroke-dasharray="2,2"/>
      <path d="M 0,0 C 25,-15 50,-55 60,-100" fill="none" stroke="#3182ce" stroke-width="2"/>
      <text x="0" y="20" fill="#2b6cb0" font-size="11" font-weight="700" text-anchor="middle">dP/dx = 0</text>
      <text x="0" y="34" fill="#718096" font-size="10" text-anchor="middle">Point of Max Vel</text>
    </g>

    <!-- Profile 3: Incipient Separation (Point S) -->
    <g transform="translate(480, 182)">
      <line x1="0" y1="0" x2="0" y2="-100" stroke="#e53e3e" stroke-width="1.5" stroke-dasharray="3,3"/>
      <!-- Tangent is vertical at wall -->
      <path d="M 0,0 C 0,-30 40,-60 55,-100" fill="none" stroke="#e53e3e" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="5" fill="#e53e3e"/>
      <text x="0" y="20" fill="#c53030" font-size="11" font-weight="700" text-anchor="middle">Point S (Separation)</text>
      <text x="0" y="34" fill="#c53030" font-size="10" font-weight="600" text-anchor="middle">(∂u/∂y)₀ = 0</text>
    </g>

    <!-- Profile 4: Reverse Flow Region -->
    <g transform="translate(640, 215)">
      <line x1="0" y1="0" x2="0" y2="-100" stroke="#a0aec0" stroke-dasharray="2,2"/>
      <path d="M 0,0 C -15,-15 -5,-30 35,-65 C 50,-80 55,-95 55,-100" fill="none" stroke="#e53e3e" stroke-width="2"/>
      <!-- Reverse arrow -->
      <line x1="-2" y1="-12" x2="-18" y2="-12" stroke="#e53e3e" stroke-width="1.5" marker-end="url(#revArr)"/>
      <text x="0" y="20" fill="#c53030" font-size="11" font-weight="700" text-anchor="middle">Reverse Flow</text>
      <text x="0" y="34" fill="#718096" font-size="10" text-anchor="middle">(∂u/∂y)₀ < 0</text>
    </g>
  </svg>
</div>

1. **Favorable Gradient ($\frac{dP}{dx} < 0$):**
   Pressure decreases downstream. Fluid accelerates. The boundary layer is energized, stable, and thin.
2. **Adverse Gradient ($\frac{dP}{dx} > 0$):**
   Pressure increases downstream. Fluid near the wall has low kinetic energy due to viscous friction. It is forced to decelerate under the opposing adverse pressure force.
3. **Point of Inflection Criterion:**
   From the Prandtl boundary layer equation evaluated at the wall $y=0$:
   $$\mu \left(\frac{\partial^2 u}{\partial y^2}\right)_{y=0} = \frac{dP}{dx}$$
   - When $\frac{dP}{dx} > 0$, $\left(\frac{\partial^2 u}{\partial y^2}\right)_{y=0} > 0$.
   - Since $\frac{\partial^2 u}{\partial y^2} < 0$ near the outer edge $y=\delta$, there **must exist a point of inflection** ($\frac{\partial^2 u}{\partial y^2} = 0$) inside the boundary layer.
   - Lord Rayleigh proved that a point of inflection is a necessary condition for inviscid hydrodynamic instability!

4. **Separation Criterion:**
   $$\left(\frac{\partial u}{\partial y}\right)_{y=0} = 0 \iff \tau_0 = 0 \quad \text{(Point of Separation)}$$
   Downstream of this point, $\left(\frac{\partial u}{\partial y}\right)_{y=0} < 0$, giving rise to backflow, eddy shedding, and massive energy dissipation.

| Condition | Wall Shear Stress $\tau_0$ | Physical Status |
| :--- | :--- | :--- |
| $\left(\frac{\partial u}{\partial y}\right)_{y=0} > 0$ | $\tau_0 > 0$ | Stable boundary layer attached to wall |
| $\left(\frac{\partial u}{\partial y}\right)_{y=0} = 0$ | $\tau_0 = 0$ | **Incipient Separation Point (Point S)** |
| $\left(\frac{\partial u}{\partial y}\right)_{y=0} < 0$ | $\tau_0 < 0$ | Flow detached; recirculating wake zone |

<!--tab:Worked Examples-->
### Example 7.1: Testing for Separation on Velocity Distributions
**Problem:** Test whether the following boundary layer velocity distributions satisfy the physical requirements of attached flow, separation, or detached backflow:
1. $\frac{u}{U} = 2\left(\frac{y}{\delta}\right) - \left(\frac{y}{\delta}\right)^2$
2. $\frac{u}{U} = -\frac{3}{2}\left(\frac{y}{\delta}\right) + \frac{1}{2}\left(\frac{y}{\delta}\right)^3$
3. $\frac{u}{U} = 2\left(\frac{y}{\delta}\right)^2 - \left(\frac{y}{\delta}\right)^3$

**Solution:**
We evaluate the velocity gradient at the solid boundary ($y=0$):
1. **Profile 1:**
   $$\left.\frac{\partial u}{\partial y}\right|_{y=0} = \frac{U}{\delta}\left[2 - 2\frac{y}{\delta}\right]_{y=0} = \frac{2U}{\delta} > 0$$
   *Conclusion:* Since the wall velocity gradient is positive ($\tau_0 > 0$), flow is **firmly attached** and no separation occurs.

2. **Profile 2:**
   $$\left.\frac{\partial u}{\partial y}\right|_{y=0} = \frac{U}{\delta}\left[-\frac{3}{2} + \frac{3}{2}\left(\frac{y}{\delta}\right)^2\right]_{y=0} = -\frac{3U}{2\delta} < 0$$
   *Conclusion:* Negative wall shear gradient indicates **detached backflow / separated zone**.

3. **Profile 3:**
   $$\left.\frac{\partial u}{\partial y}\right|_{y=0} = \frac{U}{\delta}\left[4\frac{y}{\delta} - 3\left(\frac{y}{\delta}\right)^2\right]_{y=0} = 0$$
   *Conclusion:* The wall shear stress is identically zero ($\tau_0 = 0$). This precisely identifies the **point of separation**!

---

### Example 7.2: Pressure Drag vs Skin Friction Drag on a Circular Cylinder
**Problem:** A bridge pier model (circular cylinder of diameter $D = 0.3 \text{ m}$ and height $H = 2.0 \text{ m}$) is tested in water ($U_\infty = 3.0 \text{ m/s}, \rho = 1000 \text{ kg/m}^3$).
1. For laminar boundary layer separation at $\theta \approx 82^\circ$, the measured total drag coefficient is $C_D = 1.20$. Calculate the total drag force.
2. In a turbulent boundary layer tripped with roughness, separation is delayed to $\theta \approx 120^\circ$, reducing $C_D$ to $0.35$. Calculate the drag reduction in Newtons.

**Solution:**
1. Projected frontal area:
   $$A = D \times H = 0.3 \times 2.0 = 0.60 \text{ m}^2$$
   Dynamic pressure:
   $$q = \frac{1}{2}\rho U_\infty^2 = \frac{1}{2}(1000)(3.0)^2 = 4500 \text{ N/m}^2$$
   Laminar drag force:
   $$F_{D,lam} = C_D \cdot q \cdot A = 1.20 \times 4500 \times 0.60 = 3240 \text{ N} = 3.24 \text{ kN}$$

2. Tripped turbulent drag force:
   $$F_{D,turb} = 0.35 \times 4500 \times 0.60 = 945 \text{ N} = 0.945 \text{ kN}$$
   Net drag force reduction:
   $$\Delta F_D = 3240 - 945 = 2295 \text{ N} \quad (70.8\% \text{ reduction!})$$
   *Physical Reason:* Turbulent mixing energizes near-wall fluid with high momentum from the outer stream, enabling it to push deeper into the adverse pressure gradient and delaying separation from $82^\circ$ to $120^\circ$, shrinking the low-pressure wake.

<!--tab:Interactive Workbench-->
### Boundary Layer Separation & Adverse Gradient Analyzer
Explore boundary layer detachment criteria and watch profile curvature under adverse pressure gradients.

::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c7_1",
    "question": "What is the mathematical condition for boundary layer separation at a solid wall y = 0?",
    "answer": 0,
    "tol": 0.001,
    "unit": "",
    "hint": "Wall shear stress τ₀ = μ (∂u/∂y) must equal zero.",
    "solution": "(∂u/∂y)_{y=0} = 0."
  },
  {
    "id": "c7_2",
    "question": "A cylinder of frontal area 0.5 m² has C_D = 1.2 in air flow (rho = 1.2 kg/m³, U = 20 m/s). Compute the total drag force in Newtons.",
    "answer": 144.0,
    "tol": 1.0,
    "unit": "N",
    "hint": "F_D = C_D * 0.5 * rho * U² * A = 1.2 * 0.5 * 1.2 * 400 * 0.5.",
    "solution": "F_D = 1.2 * 0.5 * 1.2 * 400 * 0.5 = 144 N."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Under which pressure gradient condition is boundary layer separation mathematically possible?",
    "options": [
      "Favorable gradient (dP/dx < 0)",
      "Zero pressure gradient (dP/dx = 0)",
      "Adverse pressure gradient (dP/dx > 0)",
      "Constant hydrostatic pressure (dP/dx = constant)"
    ],
    "answer": 2,
    "explanation": "Separation requires fluid particles near the wall to be decelerated to a standstill and forced in reverse. Only an adverse pressure gradient (dP/dx > 0) creates this opposing pressure force."
  },
  {
    "question": "Why does a golf ball with dimples travel significantly further than a completely smooth ball?",
    "options": [
      "Dimples reduce the skin friction drag coefficient",
      "Dimples trip the boundary layer to turbulent, delaying separation and dramatically shrinking the low-pressure wake",
      "Dimples create aerostatic buoyancy",
      "Dimples eliminate all lift force"
    ],
    "answer": 1,
    "explanation": "Dimples act as vortex generators that trip the boundary layer into turbulence. The turbulent boundary layer resists adverse pressure gradients much longer, delaying separation and shrinking the wide separated wake, slashing form drag by over 50%."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Hydraulic Conduit Expansion (Diffuser Divergence Angle):**
   In civil engineering conduits and pump discharge manifolds, diffusers must never exceed an included conical angle of $2\theta = 7^\circ \text{ to } 8^\circ$. If the expansion angle exceeds $10^\circ$, severe asymmetric boundary layer separation occurs along the walls, inducing catastrophic flow pulsations, acoustic vibrations, and head losses exceeding $60\%$ of velocity head.
"""

# =========================================================================
# S08: Separation Control Technologies & Hydraulic Applications
# =========================================================================
s08 = r"""<!--tab:Theory & Derivations-->
> [!note] Active and Passive Flow Control
> Because boundary layer separation incurs massive energy losses, hydraulic engineers employ **boundary layer control (BLC)** techniques to keep flow attached. These fall into two broad engineering categories: **energy replenishment** (energizing retarded fluid) and **adverse gradient reduction** (streamlining geometry).

## 1. Engineering Classification of Separation Control

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 240" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Method 1: Suction -->
    <g transform="translate(30, 20)">
      <rect x="0" y="80" width="160" height="8" fill="#4a5568"/>
      <!-- Porous slots -->
      <line x1="40" y1="88" x2="40" y2="120" stroke="#3182ce" stroke-width="2" stroke-dasharray="3,2"/>
      <line x1="80" y1="88" x2="80" y2="120" stroke="#3182ce" stroke-width="2" stroke-dasharray="3,2"/>
      <line x1="120" y1="88" x2="120" y2="120" stroke="#3182ce" stroke-width="2" stroke-dasharray="3,2"/>
      <!-- Streamline -->
      <path d="M 0,40 Q 80,60 160,78" fill="none" stroke="#2b6cb0" stroke-width="2"/>
      <text x="80" y="25" fill="#2b6cb0" font-size="12" font-weight="700" text-anchor="middle">1. Boundary Layer Suction</text>
      <text x="80" y="145" fill="#718096" font-size="10" text-anchor="middle">Extracts tired fluid</text>
    </g>

    <!-- Method 2: Blowing -->
    <g transform="translate(220, 20)">
      <rect x="0" y="80" width="160" height="8" fill="#4a5568"/>
      <path d="M 30,80 L 50,70 L 60,80 Z" fill="#dd6b20"/>
      <!-- High speed jet -->
      <line x1="50" y1="72" x2="130" y2="72" stroke="#dd6b20" stroke-width="3"/>
      <text x="80" y="25" fill="#c05621" font-size="12" font-weight="700" text-anchor="middle">2. Tangential Blowing</text>
      <text x="80" y="145" fill="#718096" font-size="10" text-anchor="middle">Injects high-speed momentum</text>
    </g>

    <!-- Method 3: Vortex Generators -->
    <g transform="translate(410, 20)">
      <rect x="0" y="80" width="160" height="8" fill="#4a5568"/>
      <polygon points="40,80 50,55 58,80" fill="#38a169"/>
      <!-- Swirling vortex lines -->
      <ellipse cx="90" cy="65" rx="15" ry="8" fill="none" stroke="#38a169" stroke-width="2"/>
      <text x="80" y="25" fill="#22543d" font-size="12" font-weight="700" text-anchor="middle">3. Vortex Generators</text>
      <text x="80" y="145" fill="#718096" font-size="10" text-anchor="middle">Mixes outer high KE fluid</text>
    </g>

    <!-- Method 4: Guide Vanes -->
    <g transform="translate(600, 20)">
      <!-- 90 deg bend -->
      <path d="M 20,20 Q 20,80 80,80" fill="none" stroke="#4a5568" stroke-width="4"/>
      <path d="M 60,20 Q 60,120 160,120" fill="none" stroke="#4a5568" stroke-width="4"/>
      <!-- Splitter vane -->
      <path d="M 40,20 Q 40,100 120,100" fill="none" stroke="#805ad5" stroke-width="2.5"/>
      <text x="90" y="25" fill="#553c9e" font-size="12" font-weight="700" text-anchor="middle">4. Splitters & Vanes</text>
      <text x="90" y="145" fill="#718096" font-size="10" text-anchor="middle">Subdivides diffuser angle</text>
    </g>
  </svg>
</div>

1. **Boundary Layer Suction:**
   Porous walls or suction slots connected to an internal vacuum pump continuously extract the low-kinetic-energy fluid from the inner boundary layer before the adverse gradient can reverse its direction.
2. **Tangential Blowing (Jet Injection):**
   High-velocity fluid is discharged tangentially along the solid surface through narrow nozzles. This injects fresh momentum directly into the wall sublayer, empowering it to overcome steep adverse pressure gradients.
3. **Vortex Generators (Passive):**
   Small triangular or rectangular fins mounted obliquely on turbine runner blades or aircraft wings generate pairs of counter-rotating longitudinal streamwise vortices. These vortices sweep high-momentum fluid from the outer stream down into the viscous sublayer.
4. **Geometric Streamlining:**
   Gradually tapering the trailing edges of bridge piers and submarine bodies eliminates blunt geometry, ensuring the adverse pressure recovery occurs over a long distance ($dP/dx \ll 1$), suppressing separation.

<!--tab:Worked Examples-->
### Example 8.1: Streamlining Drag Reduction for a Bridge Pier
**Problem:** A bridge pier of thickness $t = 1.2 \text{ m}$ and depth $H = 6.0 \text{ m}$ is situated in a river flowing at $U_\infty = 2.5 \text{ m/s}$ ($\rho = 1000 \text{ kg/m}^3$).
1. If the pier has blunt rectangular ends ($C_D = 2.05$), calculate the total drag force exerted on the pier structure.
2. If the pier is retrofitted with streamlined semicircular cutwaters and an elliptical tail ($C_D = 0.28$), determine the drag force reduction and energy savings at an operational power cost of \$0.12 per kWh.

**Solution:**
1. Projected frontal area:
   $$A = t \times H = 1.2 \times 6.0 = 7.20 \text{ m}^2$$
   Dynamic pressure:
   $$q = \frac{1}{2}\rho U_\infty^2 = \frac{1}{2}(1000)(2.5)^2 = 3125 \text{ N/m}^2$$
   Blunt pier drag force:
   $$F_{D,blunt} = C_D \cdot q \cdot A = 2.05 \times 3125 \times 7.20 = 46,125 \text{ N} = 46.13 \text{ kN}$$

2. Streamlined pier drag force:
   $$F_{D,streamlined} = 0.28 \times 3125 \times 7.20 = 6,300 \text{ N} = 6.30 \text{ kN}$$
   Net force reduction:
   $$\Delta F_D = 46,125 - 6,300 = 39,825 \text{ N} \approx 39.83 \text{ kN} \quad (86.3\% \text{ reduction!})$$
   Hydraulic hydrodynamic power dissipation avoided:
   $$P_{saved} = \Delta F_D \times U_\infty = 39,825 \times 2.5 = 99,563 \text{ W} \approx 99.56 \text{ kW}$$

<!--tab:Interactive Workbench-->
### Streamlining & Drag Force Comparison Workbench
Compare bluff versus streamlined body drag and examine separation delay mechanisms.

::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c8_1",
    "question": "If streamlining reduces C_D from 1.8 to 0.3 for a body of area 4.0 m² at U = 5 m/s in water (rho = 1000 kg/m³), what is the drag reduction in Newtons?",
    "answer": 75000.0,
    "tol": 500.0,
    "unit": "N",
    "hint": "ΔF_D = (1.8 - 0.3) * 0.5 * 1000 * 25 * 4.0.",
    "solution": "ΔF_D = 1.5 * 0.5 * 1000 * 25 * 4.0 = 75,000 N."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which of the following is an active boundary layer control technique requiring an external energy source?",
    "options": [
      "Streamlining the trailing edge",
      "Mounting fixed vortex generator fins",
      "Suction of the boundary layer through porous walls",
      "Installing turning guide vanes in pipe bends"
    ],
    "answer": 2,
    "explanation": "Suction requires continuous auxiliary pump work to maintain an internal depression and extract low-energy fluid through the porous wall, making it an active control method."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Hydraulic Draft Tube Splitters (IS: 4410):**
   In Francis turbine draft tubes where the flow diffuses into a wide tailrace, steel splitter vanes are installed. By bisecting the divergent expansion angle, splitters suppress violent draft tube vortex rope formation and eliminate structural power swings.
"""

# =========================================================================
# S09: Cavitation Inception, Dynamics & Damage Prevention in Conduits
# =========================================================================
s09 = r"""<!--tab:Theory & Derivations-->
> [!note] The Menace of Cavitation
> Cavitation is the localized boiling and explosive collapse of vapor cavities in a flowing liquid occurring **at ambient temperature** whenever local static pressure drops below the saturation vapor pressure of the liquid: $P \le P_v$.

## 1. Rayleigh-Plesset Bubble Dynamics & Shock Micro-Jets
When a microscopic vapor nucleus enters a low-pressure zone (e.g. turbine blade suction side, orifice throat), it expands violently into a macro-bubble. As it sweeps into a downstream high-pressure region ($P > P_v$):

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 780 200" style="width:100%; max-width:740px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Stage 1 -->
    <g transform="translate(60, 20)">
      <circle cx="50" cy="70" r="35" fill="#ebf8ff" stroke="#3182ce" stroke-width="2"/>
      <text x="50" y="75" fill="#2b6cb0" font-size="11" text-anchor="middle">Vapor Cavity</text>
      <text x="50" y="130" fill="#2d3748" font-size="11" font-weight="700" text-anchor="middle">1. Growth</text>
      <text x="50" y="145" fill="#718096" font-size="10" text-anchor="middle">Local P ≤ P_v</text>
    </g>

    <!-- Stage 2 -->
    <g transform="translate(260, 20)">
      <!-- Asymmetric collapse indented -->
      <path d="M 20,70 C 20,45 80,45 80,70 C 80,95 60,85 50,75 C 40,85 20,95 20,70 Z" fill="#feebc8" stroke="#dd6b20" stroke-width="2"/>
      <text x="50" y="60" fill="#c05621" font-size="11" text-anchor="middle">Indentation</text>
      <text x="50" y="130" fill="#2d3748" font-size="11" font-weight="700" text-anchor="middle">2. Asymmetric Collapse</text>
      <text x="50" y="145" fill="#718096" font-size="10" text-anchor="middle">P > P_v compression</text>
    </g>

    <!-- Stage 3 -->
    <g transform="translate(460, 20)">
      <circle cx="50" cy="70" r="18" fill="#fed7d7" stroke="#e53e3e" stroke-width="2"/>
      <line x1="50" y1="35" x2="50" y2="105" stroke="#c53030" stroke-width="4"/>
      <polygon points="46,105 50,115 54,105" fill="#c53030"/>
      <text x="50" y="130" fill="#2d3748" font-size="11" font-weight="700" text-anchor="middle">3. Micro-Jet Formation</text>
      <text x="50" y="145" fill="#718096" font-size="10" text-anchor="middle">Jet speeds > 1000 m/s</text>
    </g>

    <!-- Stage 4: Wall Pitting -->
    <g transform="translate(620, 20)">
      <!-- Metal boundary with pit -->
      <rect x="0" y="90" width="120" height="20" fill="#4a5568"/>
      <path d="M 45,90 Q 60,105 75,90 Z" fill="#cbd5e0"/>
      <!-- Shockwaves -->
      <circle cx="60" cy="90" r="15" fill="none" stroke="#e53e3e" stroke-width="1.5" stroke-dasharray="2,2"/>
      <circle cx="60" cy="90" r="28" fill="none" stroke="#e53e3e" stroke-width="1.5" stroke-dasharray="3,3"/>
      <text x="60" y="130" fill="#c53030" font-size="11" font-weight="700" text-anchor="middle">4. Severe Pitting</text>
      <text x="60" y="145" fill="#718096" font-size="10" text-anchor="middle">Impact pressures > 1000 MPa</text>
    </g>
  </svg>
</div>

The **Rayleigh-Plesset equation** governs the radial dynamics of a spherical cavity:
$$R \ddot{R} + \frac{3}{2}\dot{R}^2 = \frac{1}{\rho}\left[P_v - P_\infty(t) - \frac{2\gamma}{R} - \frac{4\mu \dot{R}}{R}\right]$$
During the final picoseconds of collapse near a solid wall, spherical symmetry shatters: the surrounding liquid pierces the bubble, forming a supersonic **liquid micro-jet** ($V > 1000 \text{ m/s}$) that slams into the metal boundary at localized pressures reaching **$1000 \text{ to } 4000 \text{ MPa}$**, causing severe mechanical fatigue pitting and material erosion.

## 2. Thoma's Cavitation Factor ($\sigma$)
To predict cavitation in hydraulic turbines and pumps, **Dieter Thoma** defined the non-dimensional cavitation parameter:
$$\sigma = \frac{H_{atm} - H_{vap} - H_s}{H}$$
where:
- $H_{atm} = \frac{P_{atm}}{\rho g} \approx 10.3 \text{ m}$ of water
- $H_{vap} = \frac{P_{vap}}{\rho g} \approx 0.24 \text{ m}$ (at $20^\circ\text{C}$)
- $H_s$ = Suction height of runner above tailrace level (positive if above, negative if submerged)
- $H$ = Net operating head across turbine

**Incipient Cavitation Threshold:**
$$\sigma \le \sigma_c \implies \text{Cavitation Occurs!}$$
To prevent cavitation, the operating condition must always satisfy $\sigma > \sigma_c$, which dictates the **maximum allowable elevation** of the machine above the tailrace:
$$H_{s,max} = H_{atm} - H_{vap} - \sigma_c H$$

<!--tab:Worked Examples-->
### Example 9.1: Safe Setting Height of a Francis Turbine
**Problem:** A Francis turbine develops $8000 \text{ kW}$ under a net head of $H = 65 \text{ m}$. The critical cavitation factor for this turbine is determined to be $\sigma_c = 0.12$. Atmospheric pressure is $101.3 \text{ kPa}$ ($H_{atm} = 10.3 \text{ m}$ of water) and water temperature is $25^\circ\text{C}$ ($P_v = 3.17 \text{ kPa}$, $H_v = 0.32 \text{ m}$).
1. Calculate the maximum permissible installation height of the turbine runner relative to the tailrace water level ($H_{s,max}$).
2. If the plant site is located at an altitude of $1500 \text{ m}$ above sea level where atmospheric pressure drops to $H_{atm} = 8.60 \text{ m}$, find the revised runner setting height.

**Solution:**
1. **At Sea Level ($H_{atm} = 10.3 \text{ m}$):**
   $$H_{s,max} = H_{atm} - H_v - \sigma_c H$$
   $$H_{s,max} = 10.3 - 0.32 - (0.12 \times 65) = 9.98 - 7.80 = +2.18 \text{ m}$$
   *Engineering Decision:* The turbine runner can safely be placed up to $2.18 \text{ m}$ **above** the tailrace water level without risking cavitation.

2. **At High Altitude ($1500 \text{ m}, H_{atm} = 8.60 \text{ m}$):**
   $$H_{s,max} = 8.60 - 0.32 - (0.12 \times 65) = 8.28 - 7.80 = +0.48 \text{ m}$$
   The runner must be lowered to within $0.48 \text{ m}$ of the tailrace. If $\sigma_c H > H_{atm} - H_v$, $H_s$ becomes negative, requiring the turbine to be completely submerged below the tailrace surface.

<!--tab:Interactive Workbench-->
### Cavitation & Vapor Pressure Simulator
Analyze the relationship between static head, flow velocity, elevation, and cavitation inception index.

::widget[blprofile]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c9_1",
    "question": "If H_atm = 10.3 m, H_v = 0.3 m, sigma_c = 0.15, and H = 40 m, calculate H_s(max) in meters.",
    "answer": 4.0,
    "tol": 0.1,
    "unit": "m",
    "hint": "H_s(max) = 10.3 - 0.3 - 0.15 * 40 = 10.0 - 6.0.",
    "solution": "H_s(max) = 10.0 - 6.0 = 4.0 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Cavitation in a hydraulic turbine primarily occurs in which component?",
    "options": [
      "Spiral scroll casing",
      "Wicket guide vanes",
      "Suction side of the runner blades near draft tube inlet",
      "Penstock emergency valve"
    ],
    "answer": 2,
    "explanation": "Static pressure reaches its absolute minimum at the discharge exit of the runner blades adjacent to the entrance of the draft tube, where fluid velocity is high and elevation is above the tailrace."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Aeration Grooves on Spillways (IS: 13551):**
   High-head dam spillways (velocities $> 30 \text{ m/s}$) experience severe cavitation erosion. To eliminate this without costly structural rebuilding, engineers install **aeration ramps (aerators)**. By entraining just $6\% \text{ to } 8\%$ air volume into the bottom water layer, the compressibility of air bubbles cushions micro-jet impacts, completely mitigating cavitation damage!
"""

write_session("S04", s04)
write_session("S05", s05)
write_session("S06", s06)
write_session("S07", s07)
write_session("S08", s08)
write_session("S09", s09)
print("Part 2 (S04-S09) generated successfully!")
