import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S19: Impulse-Momentum Principle & Jet on Stationary Flat Vertical Plate
# =========================================================================
s19 = r"""<!--tab:Theory & Derivations-->
> [!note] The Genesis of Turbomachinery
> All hydraulic impulse turbines (such as the Pelton wheel) operate on Newton's Second Law of Motion: a high-velocity fluid jet exerts a continuous hydrodynamic force on solid surfaces equal to the **time rate of change of momentum**.

## 1. Impulse-Momentum Formulation
Consider a horizontal circular liquid jet of cross-sectional area $a = \frac{\pi}{4}d^2$ issuing from a nozzle at velocity $V$, striking normally against a fixed vertical flat plate:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <defs>
      <marker id="jetArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#3182ce"/>
      </marker>
      <marker id="forceArr" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M0,2 L8,5 L0,8 z" fill="#e53e3e"/>
      </marker>
    </defs>
    <!-- Nozzle -->
    <polygon points="60,90 140,100 140,120 60,130" fill="#718096"/>
    <text x="95" y="80" fill="#4a5568" font-size="11" font-weight="700">Nozzle (dia d)</text>

    <!-- Jet -->
    <rect x="140" y="102" width="260" height="16" fill="#63b3ed" fill-opacity="0.7"/>
    <line x1="200" y1="110" x2="320" y2="110" stroke="#2b6cb0" stroke-width="2" marker-end="url(#jetArr)"/>
    <text x="260" y="98" fill="#2b6cb0" font-size="12" font-weight="700" text-anchor="middle">Jet Velocity V</text>

    <!-- Plate -->
    <rect x="400" y="30" width="16" height="160" fill="#4a5568" rx="2"/>
    <pattern id="plateHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="6" stroke="#a0aec0" stroke-width="1.5"/>
    </pattern>
    <rect x="416" y="30" width="10" height="160" fill="url(#plateHatch)"/>

    <!-- Deflected Fluid Sheets -->
    <path d="M 390,102 Q 390,40 375,30 L 365,30 Q 375,40 375,102 Z" fill="#63b3ed" fill-opacity="0.7"/>
    <line x1="380" y1="80" x2="380" y2="40" stroke="#2b6cb0" stroke-width="1.5" marker-end="url(#jetArr)"/>
    <text x="350" y="55" fill="#2b6cb0" font-size="11">Q/2</text>

    <path d="M 390,118 Q 390,180 375,190 L 365,190 Q 375,180 375,118 Z" fill="#63b3ed" fill-opacity="0.7"/>
    <line x1="380" y1="140" x2="380" y2="180" stroke="#2b6cb0" stroke-width="1.5" marker-end="url(#jetArr)"/>
    <text x="350" y="165" fill="#2b6cb0" font-size="11">Q/2</text>

    <!-- Reaction Force F_x -->
    <line x1="480" y1="110" x2="570" y2="110" stroke="#e53e3e" stroke-width="3" marker-end="url(#forceArr)"/>
    <text x="525" y="95" fill="#e53e3e" font-size="13" font-weight="700" text-anchor="middle">F_x = ρ a V²</text>
  </svg>
</div>

1. Mass flow rate striking the stationary plate per second:
   $$\dot{m} = \rho Q = \rho a V$$
2. Initial velocity component normal to the plate (in $x$-direction): $V_{1x} = V$.
3. Final velocity component after deflection (fluid glides tangentially along the plate at $90^\circ$): $V_{2x} = 0$.
4. Dynamic hydrodynamic force exerted by the jet on the plate:
   $$F_x = \dot{m}(V_{1x} - V_{2x}) = (\rho a V)(V - 0) = \rho a V^2$$

## 2. Stagnation Pressure & Head
At the central stagnation point where fluid streamlines come to a complete rest ($V = 0$):
$$P_0 = P_\infty + \frac{1}{2}\rho V^2 \implies H_0 = \frac{V^2}{2g}$$
Because the plate is stationary ($u = 0$), the work done per second is identically zero:
$$W = F_x \cdot u = 0 \implies \text{Efficiency } \eta = 0\%$$

<!--tab:Worked Examples-->
### Example 19.1: Jet Impact on a Stationary Vertical Plate
**Problem:** A water jet of diameter $d = 50 \text{ mm}$ issues from a nozzle at velocity $V = 24 \text{ m/s}$ and strikes a stationary vertical plate normally. Calculate:
1. Mass flow rate of the jet $\dot{m}$.
2. Force exerted by the jet on the plate $F_x$.
3. Stagnation pressure head $H_0$ developed at the center of impingement.

**Solution:**
1. Cross-sectional area:
   $$a = \frac{\pi}{4}(0.050)^2 = 1.9635 \times 10^{-3} \text{ m}^2$$
   Discharge:
   $$Q = a V = (1.9635 \times 10^{-3}) \times 24 = 0.04712 \text{ m}^3/\text{s} = 47.12 \text{ L/s}$$
   Mass flow rate:
   $$\dot{m} = \rho Q = 1000 \times 0.04712 = 47.12 \text{ kg/s}$$

2. Dynamic Force:
   $$F_x = \rho a V^2 = \dot{m} V = 47.12 \times 24 = 1130.9 \text{ N} \approx 1.131 \text{ kN}$$

3. Stagnation Pressure Head:
   $$H_0 = \frac{V^2}{2g} = \frac{24^2}{2(9.81)} = \frac{576}{19.62} = 29.36 \text{ m of water}$$

<!--tab:Interactive Workbench-->
### Jet Impact Simulator
Simulate jet velocity, nozzle diameter, and target orientation dynamically:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c19_1",
    "question": "A water jet (rho = 1000 kg/m³) with area a = 0.002 m² strikes a stationary vertical wall at V = 30 m/s. Compute the normal force Fx in Newtons.",
    "answer": 1800.0,
    "tol": 10.0,
    "unit": "N",
    "hint": "Fx = rho * a * V² = 1000 * 0.002 * 900.",
    "solution": "Fx = 1000 * 0.002 * 900 = 1800 N."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "If the nozzle velocity of a liquid jet striking a stationary flat plate is doubled, by what factor does the force on the plate increase?",
    "options": [
      "Doubles (2×)",
      "Triples (3×)",
      "Quadruples (4×)",
      "Remains constant"
    ],
    "answer": 2,
    "explanation": "Because Fx = ρ a V², force is proportional to the square of velocity: (2V)² = 4 V²."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Nozzle Contraction Coefficient ($C_c$):**
   In real fire nozzles and Pelton spears, the actual jet area $a$ is slightly smaller than the physical orifice exit area $a_0$ due to boundary layer vena contracta: $a = C_c a_0$ ($C_c \approx 0.95 - 0.98$).
"""

# =========================================================================
# S20: Jet Impingement on Stationary Inclined Flat Plate
# =========================================================================
s20 = r"""<!--tab:Theory & Derivations-->
> [!note] Oblique Momentum Splitting
> When a jet strikes a flat plate inclined at an angle $\theta$ to the jet axis, the plate exerts a force strictly **normal** to its surface ($F_n$, assuming frictionless flow). This normal force splits the incoming discharge $Q$ into two unequal tangential streams $Q_1$ and $Q_2$.

## 1. Normal Force Derivation ($F_n$)
Let a jet of area $a$ and velocity $V$ strike a smooth stationary plate inclined at angle $\theta$:
- Component of incoming velocity perpendicular to the plate: $V_n = V \sin \theta$.
- Mass flow rate of jet striking plate: $\dot{m} = \rho a V$.
- After impact, fluid glides tangentially along the plate ($V_{n,final} = 0$).
By Newton's second law in the direction normal to the plate:
$$F_n = \dot{m}(V_n - 0) = (\rho a V)(V \sin \theta) = \rho a V^2 \sin \theta$$

Resolving $F_n$ into horizontal ($x$) and vertical ($y$) components:
$$F_x = F_n \sin \theta = \rho a V^2 \sin^2 \theta$$
$$F_y = F_n \cos \theta = \rho a V^2 \sin \theta \cos \theta = \frac{1}{2}\rho a V^2 \sin(2\theta)$$

## 2. Unequal Discharge Division ($Q_1$ and $Q_2$)
Because the plate is smooth ($\tau = 0$), there is **no shear force parallel to the plate**. Momentum in the tangential direction must be strictly conserved:
$$\rho Q V \cos \theta = \rho Q_1 V - \rho Q_2 V \implies Q \cos \theta = Q_1 - Q_2$$
By mass conservation:
$$Q_1 + Q_2 = Q$$
Solving the two simultaneous linear equations:
$$Q_1 = \frac{Q}{2}(1 + \cos \theta)$$
$$Q_2 = \frac{Q}{2}(1 - \cos \theta)$$
- When $\theta = 90^\circ$: $\cos 90^\circ = 0 \implies Q_1 = Q_2 = Q/2$ (symmetric split).
- When $\theta = 0^\circ$: $Q_1 = Q, Q_2 = 0$ (parallel grazing).

<!--tab:Worked Examples-->
### Example 20.1: Discharge Division on an Inclined Plate
**Problem:** A water jet of diameter $d = 40 \text{ mm}$ strikes a flat stationary plate at $V = 20 \text{ m/s}$. The plate is inclined at $\theta = 30^\circ$ to the axis of the jet. Calculate:
1. Normal force $F_n$ and axial horizontal force $F_x$.
2. The discharge division ($Q_1$ up the plate and $Q_2$ down the plate).

**Solution:**
1. Jet Area and Total Discharge:
   $$a = \frac{\pi}{4}(0.040)^2 = 1.2566 \times 10^{-3} \text{ m}^2$$
   $$Q = a V = (1.2566 \times 10^{-3}) \times 20 = 0.02513 \text{ m}^3/\text{s} = 25.13 \text{ L/s}$$
   Normal Force $F_n$:
   $$F_n = \rho a V^2 \sin \theta = 1000 \times (1.2566 \times 10^{-3}) \times (20)^2 \times \sin 30^\circ$$
   $$F_n = 1.2566 \times 400 \times 0.5 = 251.3 \text{ N}$$
   Horizontal Force $F_x$:
   $$F_x = F_n \sin 30^\circ = 251.3 \times 0.5 = 125.65 \text{ N}$$

2. Discharge Division:
   $$Q_1 = \frac{Q}{2}(1 + \cos 30^\circ) = \frac{25.13}{2}(1 + 0.8660) = 12.565 \times 1.8660 = 23.45 \text{ L/s}$$
   $$Q_2 = \frac{Q}{2}(1 - \cos 30^\circ) = \frac{25.13}{2}(1 - 0.8660) = 12.565 \times 0.1340 = 1.68 \text{ L/s}$$
   Check: $Q_1 + Q_2 = 23.45 + 1.68 = 25.13 \text{ L/s}$ (Exact match!).

<!--tab:Interactive Workbench-->
### Inclined Plate Jet Deflection Simulator
Vary the plate inclination angle and observe the momentum division:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c20_1",
    "question": "For a jet of Q = 50 L/s striking a plate at theta = 60°, calculate the forward discharge Q1 in L/s.",
    "answer": 37.5,
    "tol": 0.2,
    "unit": "L/s",
    "hint": "Q1 = (Q/2) * (1 + cos 60°) with cos 60° = 0.5.",
    "solution": "Q1 = 25 * (1 + 0.5) = 37.5 L/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the net hydrodynamic force acting on a smooth inclined plate always perpendicular to the plate surface?",
    "options": [
      "Gravity pulls perpendicular to the plate",
      "Because fluid shear friction is neglected, the fluid cannot sustain any shear stress parallel to the plate",
      "Atmospheric pressure forces it to be perpendicular",
      "Velocity of the jet is perpendicular to the plate"
    ],
    "answer": 1,
    "explanation": "On a frictionless surface, shear stress τ = 0 everywhere. Therefore, the only stress the fluid can exert on the solid boundary is normal compressive pressure."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Deflector Plate Erosion in Slurry Lines:**
   In mining tailings and dredge discharge pipes, deflector plates inclined at $45^\circ$ suffer severe abrasive gouging along the $Q_1$ trajectory. Hardened chromium-carbide overlay plates (60 HRC) are standard practice.
"""

# =========================================================================
# S21: Jet on Stationary Curved Vanes & Blade Friction (k)
# =========================================================================
s21 = r"""<!--tab:Theory & Derivations-->
> [!note] The Power of Curvature
> While a flat plate can deflect a jet by at most $90^\circ$, a **curved vane** can reverse the jet by up to $180^\circ$. By reversing the momentum vector, a curved vane exerts up to **twice the force** of a flat plate!

## 1. Symmetrical Curved Vane: Central Impingement
Let a jet strike the center of a symmetrical curved vane and deflect smoothly through angle $(180^\circ - \theta)$, where $\theta$ is the vane exit angle:
- Initial velocity in $x$-direction: $V_{1x} = V$.
- Exit velocity component in $x$-direction: $V_{2x} = -k V \cos \theta$, where $k \le 1.0$ is the blade friction factor ($k = 1.0$ for frictionless vanes).
- Force in $x$-direction:
  $$F_x = \rho a V [V - (-kV \cos \theta)] = \rho a V^2 (1 + k \cos \theta)$$
- For a semicircular vane ($\theta = 0^\circ$) with no friction ($k = 1$):
  $$F_x = \rho a V^2(1 + \cos 0^\circ) = 2 \rho a V^2$$
  *Key Finding:* A semicircular curved vane experiences **exactly $2\times$ the force** of a flat plate!

## 2. Tangential Impingement on Unsymmetrical Curved Vanes
When the jet enters tangentially at the tip at angle $\alpha$ and exits at angle $\beta$:
$$F_x = \rho a V [V \cos \alpha - (-k V \cos \beta)] = \rho a V^2 (\cos \alpha + k \cos \beta)$$
$$F_y = \rho a V [V \sin \alpha - k V \sin \beta] = \rho a V^2 (\sin \alpha - k \sin \beta)$$

<!--tab:Worked Examples-->
### Example 21.1: Semicircular Curved Vane Force
**Problem:** A water jet of diameter $d = 60 \text{ mm}$ with velocity $V = 30 \text{ m/s}$ impinges centrally on a stationary semicircular vane ($\theta = 0^\circ$).
1. Compute $F_x$ assuming smooth frictionless flow ($k = 1.0$).
2. Compute $F_x$ if blade surface friction reduces exit velocity by $15\%$ ($k = 0.85$).

**Solution:**
1. Jet Area:
   $$a = \frac{\pi}{4}(0.060)^2 = 2.8274 \times 10^{-3} \text{ m}^2$$
   Ideal Force ($k = 1.0$):
   $$F_{x,ideal} = 2 \rho a V^2 = 2 \times 1000 \times (2.8274 \times 10^{-3}) \times 30^2 = 5.6548 \times 900 = 5089.3 \text{ N} \approx 5.089 \text{ kN}$$

2. With Friction ($k = 0.85$):
   $$F_x = \rho a V^2(1 + k \cos 0^\circ) = \rho a V^2(1 + 0.85) = 1.85 \rho a V^2$$
   $$F_x = 1.85 \times \frac{5089.3}{2} = 1.85 \times 2544.65 = 4707.6 \text{ N} \approx 4.708 \text{ kN}$$

<!--tab:Interactive Workbench-->
### Curved Vane Deflection Simulator
Explore jet curvature forces with adjustable deflection angle and friction:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c21_1",
    "question": "For a jet of rho*a*V² = 1000 N striking a frictionless semicircular vane centrally, what is Fx in Newtons?",
    "answer": 2000.0,
    "tol": 5.0,
    "unit": "N",
    "hint": "Fx = rho * a * V² * (1 + cos 0°) = 2 * 1000.",
    "solution": "Fx = 2 * 1000 = 2000 N."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why does a semicircular bucket experience double the hydrodynamic thrust of a flat vertical plate?",
    "options": [
      "The mass flow rate is doubled",
      "The jet reverses direction by 180°, doubling the total change in momentum from V to -V",
      "Gravity adds extra force on the curve",
      "Pressure at the bucket tip drops to negative vacuum"
    ],
    "answer": 1,
    "explanation": "ΔV = V - (-V) = 2V. Because momentum change is doubled, the reaction force is precisely twice that of a plate that only arrests velocity to zero."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Pelton Bucket Splitter Ridge:**
   In Pelton turbines, the central splitter ridge splits the circular jet into two equal halves, turning each through $165^\circ \text{ to } 170^\circ$. A deflection of exactly $180^\circ$ is avoided so that the exiting water does not collide with the back of the succeeding bucket.
"""

# =========================================================================
# S22: Jet on Moving Flat Plate, Relative Velocity & Max Efficiency (29.6%)
# =========================================================================
s22 = r"""<!--tab:Theory & Derivations-->
> [!note] The Genesis of Mechanical Work
> When a vane moves at velocity $u$ under the action of a jet, it performs mechanical work ($W = F_x \cdot u$). However, because the vane recedes from the nozzle, the mass intercepted per second and the relative impact velocity are both reduced!

## 1. Single Moving Flat Plate
Let a plate move in the direction of the jet at velocity $u < V$:
1. **Relative velocity** at which jet strikes plate:
   $$V_r = V - u$$
2. **Mass of water striking the single plate per second:**
   Because the plate retreats at speed $u$, the length of the jet striking the plate in one second is $(V - u)$:
   $$\dot{m} = \rho a (V - u)$$
3. **Dynamic Force exerted:**
   $$F_x = \dot{m}(V_r - 0) = \rho a (V - u)^2$$
4. **Work Done per Second (Power):**
   $$P = F_x \cdot u = \rho a (V - u)^2 u$$

## 2. Derivation of Maximum Efficiency ($\eta_{max} = 29.6\%$)
The input kinetic energy supplied by the jet per second is:
$$E_{in} = \frac{1}{2}\dot{m}_{nozzle} V^2 = \frac{1}{2}(\rho a V) V^2 = \frac{1}{2}\rho a V^3$$
Mechanical efficiency:
$$\eta = \frac{P}{E_{in}} = \frac{\rho a (V - u)^2 u}{\frac{1}{2}\rho a V^3} = \frac{2 u (V - u)^2}{V^3} = 2\left[\frac{u}{V} - 2\left(\frac{u}{V}\right)^2 + \left(\frac{u}{V}\right)^3\right]$$
To find the blade speed $u$ for maximum efficiency:
$$\frac{d\eta}{du} = 0 \implies \frac{d}{du}[u (V - u)^2] = (V - u)^2 - 2u(V - u) = (V - u)(V - 3u) = 0$$
Since $u \ne V$, the optimum blade speed ratio is:
$$u = \frac{V}{3}$$
Substituting $u = V/3$ into the efficiency equation:
$$\eta_{max} = \frac{2 (V/3) (V - V/3)^2}{V^3} = \frac{2}{3} \cdot \left(\frac{2}{3}\right)^2 = \frac{8}{27} \approx 0.2963 = \mathbf{29.63\%}$$

<!--tab:Worked Examples-->
### Example 22.1: Power and Efficiency of a Moving Flat Plate
**Problem:** A water jet of diameter $d = 75 \text{ mm}$ moving at $V = 36 \text{ m/s}$ strikes a flat vertical plate moving in the same direction at $u = 12 \text{ m/s}$. Calculate:
1. Force on the plate $F_x$.
2. Work done per second (Power $P$).
3. Efficiency $\eta$ and verify that it matches the theoretical maximum.

**Solution:**
1. Jet Area:
   $$a = \frac{\pi}{4}(0.075)^2 = 4.418 \times 10^{-3} \text{ m}^2$$
   Relative Velocity:
   $$V_r = V - u = 36 - 12 = 24 \text{ m/s}$$
   Force $F_x$:
   $$F_x = \rho a (V - u)^2 = 1000 \times (4.418 \times 10^{-3}) \times 24^2 = 4.418 \times 576 = 2544.8 \text{ N} \approx 2.545 \text{ kN}$$

2. Power Developed:
   $$P = F_x \cdot u = 2544.8 \times 12 = 30,537 \text{ W} \approx 30.54 \text{ kW}$$

3. Efficiency:
   Jet Kinetic Energy per second:
   $$E_{in} = \frac{1}{2}\rho a V^3 = \frac{1}{2}(1000)(4.418 \times 10^{-3})(36)^3 = 2.209 \times 46656 = 103,063 \text{ W} \approx 103.06 \text{ kW}$$
   $$\eta = \frac{30.54}{103.06} = 0.2963 = \mathbf{29.63\%}$$
   Since $u = 12 \text{ m/s} = 36/3 = V/3$, the plate is operating at its theoretical peak efficiency of $8/27$!

<!--tab:Interactive Workbench-->
### Moving Plate Power Workbench
Adjust blade speed $u$ and observe how power peaks at $u = V/3$:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c22_1",
    "question": "What is the optimum blade speed u in m/s for a single flat plate struck by a jet at V = 45 m/s?",
    "answer": 15.0,
    "tol": 0.1,
    "unit": "m/s",
    "hint": "Optimum u = V / 3.",
    "solution": "u = 45 / 3 = 15.0 m/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the maximum theoretical efficiency of a single flat plate moving in the direction of a fluid jet?",
    "options": [
      "50.0%",
      "29.6%",
      "59.3% (Betz limit)",
      "100.0%"
    ],
    "answer": 1,
    "explanation": "For a single moving plate, maximum efficiency is mathematically 8/27 ≈ 29.63%, occurring strictly at blade speed ratio u = V/3."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Why Single Plates are Never Used:**
   In addition to dismal efficiency ($< 30\%$), a single plate quickly travels away from the nozzle, requiring a wheel with a **continuous series of vanes** to intercept the entire discharge.
"""

# =========================================================================
# S23: Dynamic Force on Moving Curved Vanes & Velocity Triangles
# =========================================================================
s23 = r"""<!--tab:Theory & Derivations-->
> [!note] The Heart of Turbomachinery Theory
> The interaction of a jet with a moving curved vane constitutes the mathematical foundation of all reaction and impulse turbines. Vector decomposition via **inlet and outlet velocity triangles** enables calculation of power via the **Euler Turbine Equation**.

## 1. Inlet and Outlet Velocity Triangles
Let a vane move horizontally at peripheral velocity $u$. The absolute fluid velocity is $\vec{V}$, blade velocity is $\vec{u}$, and relative velocity is $\vec{V}_r = \vec{V} - \vec{u}$:

```
Inlet Triangle:                          Outlet Triangle:
       ▲ V                                     ▲ V_r2
      /|                                      /|
  V_r1/| V_f1                             V_2/ | V_f2
     / |                                    /  |
    /θ |                                 β / φ |
   ────┴─────►                          ───┴───┴─────►
    u   V_w1                              u    V_w2
```

1. **Inlet Parameters:**
   - $\alpha$: Nozzle guide angle (angle of absolute velocity $\vec{V}_1$ with blade motion).
   - $\theta$: Vane entrance blade angle (angle of relative velocity $\vec{V}_{r1}$ with blade motion).
   - $V_{w1} = V_1 \cos \alpha$: Whirl velocity at inlet (produces useful torque).
   - $V_{f1} = V_1 \sin \alpha$: Flow velocity at inlet (controls mass throughput).

2. **Outlet Parameters:**
   - $\phi$: Vane exit blade angle.
   - $\beta$: Angle of leaving absolute velocity $\vec{V}_2$ with direction of motion.
   - $V_{r2} = k V_{r1}$: Relative velocity at exit ($k \le 1$ accounts for vane friction).
   - $V_{w2} = V_{r2} \cos \phi - u$: Whirl velocity at outlet.

## 2. Dynamic Force & Euler Turbine Equation
Applying the angular momentum theorem across the moving blade:
$$F_x = \dot{m}(V_{w1} \pm V_{w2})$$
*(Plus sign when $\beta$ is acute such that $V_{w2}$ opposes blade motion; minus sign when $\beta$ is obtuse).*

**Euler Head ($H_e$):** Work done per unit weight of fluid:
$$H_e = \frac{F_x \cdot u}{\rho Q g} = \frac{u (V_{w1} \pm V_{w2})}{g}$$
**Power Developed:**
$$P = \rho Q u (V_{w1} \pm V_{w2})$$

<!--tab:Worked Examples-->
### Example 23.1: Analysis of a Moving Curved Vane
**Problem:** A jet of water ($V_1 = 40 \text{ m/s}$) strikes a curved vane moving tangentially at $u = 18 \text{ m/s}$. The jet is inclined at $\alpha = 25^\circ$ to the direction of vane motion. The vane exit angle is $\phi = 30^\circ$, and vane friction reduces relative velocity by $10\%$ ($k = 0.90$).
Calculate:
1. Vane inlet angle $\theta$ for shockless entry.
2. Magnitude and direction ($\beta$) of absolute exit velocity $V_2$.
3. Work done per unit weight of water ($H_e$).
4. Vane hydraulic efficiency $\eta_h$.

**Solution:**
1. **Inlet Velocity Components:**
   - $V_{w1} = V_1 \cos 25^\circ = 40 \times 0.9063 = 36.25 \text{ m/s}$
   - $V_{f1} = V_1 \sin 25^\circ = 40 \times 0.4226 = 16.90 \text{ m/s}$
   - In the inlet triangle: $\tan \theta = \frac{V_{f1}}{V_{w1} - u} = \frac{16.90}{36.25 - 18} = \frac{16.90}{18.25} = 0.9260$
   - Vane inlet angle: **$\theta = 42.8^\circ$**
   - Relative velocity $V_{r1} = \frac{V_{f1}}{\sin \theta} = \frac{16.90}{\sin 42.8^\circ} = \frac{16.90}{0.6794} = 24.87 \text{ m/s}$.

2. **Outlet Velocity Triangle:**
   - $V_{r2} = k V_{r1} = 0.90 \times 24.87 = 22.38 \text{ m/s}$
   - Horizontal component: $V_{r2} \cos \phi = 22.38 \cos 30^\circ = 22.38 \times 0.8660 = 19.38 \text{ m/s}$
   - Since $V_{r2} \cos \phi = 19.38 \text{ m/s} > u = 18 \text{ m/s}$:
     $$V_{w2} = V_{r2} \cos \phi - u = 19.38 - 18.0 = +1.38 \text{ m/s} \quad (\text{opposes } u)$$
   - Vertical flow component: $V_{f2} = V_{r2} \sin \phi = 22.38 \sin 30^\circ = 11.19 \text{ m/s}$
   - Exit velocity: $V_2 = \sqrt{V_{w2}^2 + V_{f2}^2} = \sqrt{1.38^2 + 11.19^2} = \sqrt{1.90 + 125.2} = 11.27 \text{ m/s}$
   - Exit angle: $\tan \beta = \frac{V_{f2}}{V_{w2}} = \frac{11.19}{1.38} = 8.11 \implies \beta = 83.0^\circ$.

3. **Euler Head $H_e$:**
   $$H_e = \frac{u (V_{w1} + V_{w2})}{g} = \frac{18 \times (36.25 + 1.38)}{9.81} = \frac{18 \times 37.63}{9.81} = \frac{677.34}{9.81} = 69.05 \text{ m}$$

4. **Hydraulic Efficiency:**
   $$E_{in} = \frac{V_1^2}{2g} = \frac{40^2}{2(9.81)} = \frac{1600}{19.62} = 81.55 \text{ m}$$
   $$\eta_h = \frac{H_e}{E_{in}} = \frac{69.05}{81.55} = 0.8467 = \mathbf{84.67\%}$$

<!--tab:Interactive Workbench-->
### Velocity Triangles & Euler Head Simulator
Adjust inlet nozzle angle, vane speed, and vane curvature to visualize velocity triangles:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c23_1",
    "question": "If u = 20 m/s, Vw1 = 45 m/s, and Vw2 = 5 m/s (in opposite direction), compute Euler head He in meters.",
    "answer": 101.94,
    "tol": 0.5,
    "unit": "m",
    "hint": "He = u * (Vw1 + Vw2) / g = 20 * (45 + 5) / 9.81.",
    "solution": "He = 20 * 50 / 9.81 = 1000 / 9.81 = 101.937 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the condition for 'shockless entry' of a fluid jet onto a moving curved blade?",
    "options": [
      "The absolute velocity V1 must be parallel to the blade tip",
      "The relative velocity vector Vr1 must be exactly tangent to the blade surface at the inlet tip",
      "Blade speed u must equal jet velocity V1",
      "The nozzle angle α must be 90°"
    ],
    "answer": 1,
    "explanation": "If Vr1 is not aligned with the physical tangent of the blade (angle θ), fluid collides abruptly with the blade face, causing destructive shock losses and eddy separation."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Leading Edge Knife-Edge Profiling:**
   In high-head hydroelectric runners, blade entrance tips are hand-ground to sharp knife edges to eliminate stagnation separation bubbles, ensuring smooth shockless entry across varying head ranges.
"""

write_session("S19", s19)
write_session("S20", s20)
write_session("S21", s21)
write_session("S22", s22)
write_session("S23", s23)
print("Part 1 (S19-S23) generated successfully!")
