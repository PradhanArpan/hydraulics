import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S10: Fundamentals of Open Channel Flow, Geometric Elements & Velocity Distribution
# =========================================================================
s10 = r"""<!--tab:Theory & Derivations-->
> [!note] Fundamental Distinction
> While pipe flow is driven by an internal **piezometric pressure gradient** within a closed conduit, **open channel flow** possesses a free liquid surface exposed to the atmosphere. Flow is driven purely by the **gravity component** parallel to the channel bed slope ($S_0 = \sin \theta$).

## 1. Flow Classification & Free Surface Physics
Open channel flow is governed by the state and variation of flow parameters ($y, V, Q$) with respect to space $x$ and time $t$:

```
                             ┌─ Steady (∂y/∂t = 0) ─── Uniform Flow (∂y/∂x = 0)
                             │                      └─ Varied Flow (∂y/∂x ≠ 0) ─┬─ Gradually Varied (GVF)
Open Channel Flow ───────────┤                                                  └─ Rapidly Varied (RVF)
                             │
                             └─ Unsteady (∂y/∂t ≠ 0) ─┬─ Gradually Varied Unsteady (Flood waves)
                                                      └─ Rapidly Varied Unsteady (Surges / Bores)
```

## 2. Geometric Elements of Prismatic Channels
For a channel with constant cross-section and bed slope (prismatic), key geometric properties include:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Trapezoidal cross section -->
    <defs>
      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#63b3ed" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#2b6cb0" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <!-- Ground / Channel boundary -->
    <polygon points="120,40 240,170 500,170 620,40 640,40 510,185 230,185 100,40" fill="#a0aec0"/>
    <!-- Water Polygon -->
    <polygon points="135,55 240,170 500,170 605,55" fill="url(#waterGrad)"/>
    <!-- Water surface line -->
    <line x1="135" y1="55" x2="605" y2="55" stroke="#2b6cb0" stroke-width="2.5"/>
    <text x="370" y="45" fill="#2b6cb0" font-size="12" font-weight="700" text-anchor="middle">Top Width T</text>
    <line x1="135" y1="50" x2="605" y2="50" stroke="#2b6cb0" stroke-width="1.5" stroke-dasharray="4,4"/>

    <!-- Depth y -->
    <line x1="370" y1="55" x2="370" y2="170" stroke="#e53e3e" stroke-width="2"/>
    <text x="385" y="115" fill="#e53e3e" font-size="12" font-weight="700">Depth y</text>

    <!-- Bed Width B -->
    <line x1="240" y1="195" x2="500" y2="195" stroke="#2d3748" stroke-width="2"/>
    <text x="370" y="210" fill="#2d3748" font-size="12" font-weight="700" text-anchor="middle">Bed Width B</text>

    <!-- Side Slope 1:m -->
    <line x1="170" y1="95" x2="205" y2="95" stroke="#4a5568" stroke-width="1.5"/>
    <line x1="205" y1="95" x2="205" y2="135" stroke="#4a5568" stroke-width="1.5"/>
    <text x="187" y="90" fill="#4a5568" font-size="10" text-anchor="middle">m</text>
    <text x="215" y="118" fill="#4a5568" font-size="10">1</text>
  </svg>
</div>

1. **Flow Area ($A$):** Cross-sectional area occupied by fluid:
   $$A = (B + my)y$$
2. **Wetted Perimeter ($P$):** Boundary length in direct contact with fluid:
   $$P = B + 2y\sqrt{1 + m^2}$$
3. **Hydraulic Radius ($R$):** Ratio of flow area to wetted perimeter:
   $$R = \frac{A}{P} = \frac{(B + my)y}{B + 2y\sqrt{1 + m^2}}$$
4. **Hydraulic Depth ($D$):** Ratio of flow area to water surface top width $T$:
   $$D = \frac{A}{T} = \frac{(B + my)y}{B + 2my}$$

## 3. Kinetic Energy ($\alpha$) and Momentum ($\beta$) Correction Coefficients
Because velocity is zero at solid boundaries and maximum slightly below the free surface, the true kinetic energy and momentum differ from 1D plug flow values:
$$\alpha = \frac{\int u^3 dA}{V^3 A} \ge 1.0 \quad \text{(Coriolis coeff, typically } 1.05 - 1.20\text{)}$$
$$\beta = \frac{\int u^2 dA}{V^2 A} \ge 1.0 \quad \text{(Boussinesq coeff, typically } 1.02 - 1.08\text{)}$$
By Cauchy-Schwarz inequality, $\alpha > \beta > 1.0$ always holds.

<!--tab:Worked Examples-->
### Example 10.1: Geometric Properties of a Trapezoidal Canal
**Problem:** A trapezoidal irrigation canal has a bed width $B = 5.0 \text{ m}$, side slopes of $1.5\text{H} : 1\text{V}$ ($m = 1.5$), and carries water at a depth of $y = 2.4 \text{ m}$.
Calculate:
1. Cross-sectional flow area $A$.
2. Wetted perimeter $P$.
3. Hydraulic radius $R$.
4. Top surface width $T$ and hydraulic depth $D$.

**Solution:**
1. **Flow Area $A$:**
   $$A = (B + my)y = [5.0 + (1.5 \times 2.4)] \times 2.4 = [5.0 + 3.6] \times 2.4 = 8.6 \times 2.4 = 20.64 \text{ m}^2$$
2. **Wetted Perimeter $P$:**
   $$P = B + 2y\sqrt{1 + m^2} = 5.0 + 2(2.4)\sqrt{1 + 1.5^2} = 5.0 + 4.8\sqrt{3.25} = 5.0 + 4.8(1.8028) = 13.65 \text{ m}$$
3. **Hydraulic Radius $R$:**
   $$R = \frac{A}{P} = \frac{20.64}{13.65} = 1.512 \text{ m}$$
4. **Top Width $T$ and Hydraulic Depth $D$:**
   $$T = B + 2my = 5.0 + 2(1.5 \times 2.4) = 5.0 + 7.2 = 12.20 \text{ m}$$
   $$D = \frac{A}{T} = \frac{20.64}{12.20} = 1.692 \text{ m}$$

---

### Example 10.2: Energy & Momentum Correction Coefficients
**Problem:** The velocity distribution in a wide rectangular open channel is given by $u = U_{max}\left(\frac{y}{y_0}\right)^{1/6}$. Determine:
1. Mean cross-sectional velocity $V$.
2. Kinetic energy correction factor $\alpha$.
3. Momentum correction factor $\beta$.

**Solution:**
1. Mean velocity $V$:
   $$V = \frac{1}{y_0}\int_0^{y_0} U_{max}\left(\frac{y}{y_0}\right)^{1/6} dy = \frac{U_{max}}{y_0} \left[\frac{y^{7/6}}{7/6}\right]_0^{y_0} = \frac{6}{7}U_{max} \approx 0.857 U_{max}$$
2. Momentum correction factor $\beta$:
   $$\beta = \frac{\int_0^{y_0} u^2 dy}{V^2 y_0} = \frac{U_{max}^2 \int_0^{y_0} (y/y_0)^{1/3} dy}{(6/7 U_{max})^2 y_0} = \frac{3/4}{(36/49)} = \frac{147}{144} \approx 1.021$$
3. Kinetic energy correction factor $\alpha$:
   $$\alpha = \frac{\int_0^{y_0} u^3 dy}{V^3 y_0} = \frac{U_{max}^3 \int_0^{y_0} (y/y_0)^{1/2} dy}{(6/7 U_{max})^3 y_0} = \frac{2/3}{(216/343)} = \frac{686}{648} \approx 1.059$$

<!--tab:Interactive Workbench-->
### Open Channel Geometry & Normal Flow Solver
Use the live workbench below to interactively vary channel width, side slope, discharge, and roughness to evaluate geometric elements.

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c10_1",
    "question": "A rectangular channel of width B = 4 m has water depth y = 2 m. Calculate its hydraulic radius R in meters.",
    "answer": 1.0,
    "tol": 0.02,
    "unit": "m",
    "hint": "A = B*y = 8 m², P = B + 2y = 8 m. R = A/P.",
    "solution": "R = 8 / 8 = 1.0 m."
  },
  {
    "id": "c10_2",
    "question": "For a triangular channel with 90° notch (m = 1) at depth y = 1.5 m, calculate the hydraulic depth D in meters.",
    "answer": 0.75,
    "tol": 0.02,
    "unit": "m",
    "hint": "A = m*y² = 1.5² = 2.25 m², T = 2*m*y = 3.0 m. D = A/T.",
    "solution": "D = 2.25 / 3.0 = 0.75 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the point of maximum velocity in an open channel typically located at 0.05 to 0.25 depth below the free surface rather than at the very top?",
    "options": [
      "Due to hydrostatic pressure gradient",
      "Secondary circulation currents and air-water interface resistance (dip phenomenon)",
      "Gravitational acceleration",
      "Surface tension pulling fluid downwards"
    ],
    "answer": 1,
    "explanation": "Secondary transverse currents driven by corner vorticity and slight air resistance cause the 'velocity dip', displacing the maximum velocity below the free surface."
  },
  {
    "question": "Which inequality relationship between Coriolis (α) and Boussinesq (β) coefficients is always physically valid?",
    "options": [
      "β > α > 1.0",
      "α > β > 1.0",
      "α = β < 1.0",
      "α < 1.0 and β > 1.0"
    ],
    "answer": 1,
    "explanation": "Because velocity is cubed in kinetic energy (α) versus squared in momentum (β), velocity non-uniformities amplify α significantly more than β: α > β > 1.0."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Freeboard Allowance (IS: 7112 / USBR):**
   Unlined and lined irrigation channels must always be designed with a safety margin between the full supply water level (FSL) and the top of the canal bank (freeboard). USBR empirical guideline recommends:
   $$F_b = \sqrt{C y_0} \quad (C \approx 0.5 \text{ to } 0.75)$$
   For a $2.5 \text{ m}$ deep canal, minimum freeboard is $0.75 \text{ m}$ to prevent wind-wave overtopping.
"""

# =========================================================================
# S11: Uniform Flow Dynamics, Chezy & Manning Formulations & Conveyance (K)
# =========================================================================
s11 = r"""<!--tab:Theory & Derivations-->
> [!note] Force Equilibrium in Uniform Flow
> In steady uniform flow, the depth, cross-sectional area, and velocity remain strictly constant along the channel ($dy/dx = 0, dV/dx = 0$). This occurs when the downstream component of gravity is in **exact balance** with the total boundary friction resistance.

## 1. Derivation of Chezy's Equation
Consider a control volume of length $L$ in a channel with bed slope $S_0 = \sin \theta$:
1. Weight component down the slope: $W_x = \gamma A L \sin \theta \approx \rho g A L S_0$.
2. Hydrostatic pressure forces at inlet and outlet balance identically since depth is constant ($F_1 = F_2$).
3. Boundary shear resistance: $F_f = \tau_0 P L$.

Equating forces:
$$\rho g A L S_0 = \tau_0 P L \implies \tau_0 = \gamma R S_0$$
where $R = A/P$ is the hydraulic radius.
Adopting the quadratic shear stress law $\tau_0 = k \rho V^2$:
$$V = \sqrt{\frac{g}{k}} \sqrt{R S_0} = C \sqrt{R S_0}$$
This is **Chezy's Equation**, where $C = \sqrt{g/k}$ is the Chezy resistance coefficient ($\text{m}^{1/2}/\text{s}$).

## 2. Manning's Equation & Gauckler-Strickler Relation
Robert Manning (1889) correlated extensive flume and river datasets, establishing that $C \propto R^{1/6}$:
$$C = \frac{1}{n} R^{1/6} \implies V = \frac{1}{n} R^{2/3} S_0^{1/2} \quad \text{(SI Units)}$$
The total volumetric discharge is:
$$Q = A V = \frac{1}{n} A R^{2/3} S_0^{1/2} = K \sqrt{S_0}$$
where $K = \frac{1}{n} A R^{2/3}$ is termed the **Channel Conveyance** ($\text{m}^3/\text{s}$).

## 3. Composite Roughness (Einstein-Horton Formula)
When a channel has different roughness values along its perimeter (e.g. concrete bed with $n_1$, rip-rap side walls with $n_2$):
$$n = \left(\frac{\sum P_i n_i^{3/2}}{P}\right)^{2/3}$$

<!--tab:Worked Examples-->
### Example 11.1: Discharge Capacity of an Lined Channel
**Problem:** A rectangular concrete-lined channel ($n = 0.014$) has a bed width $B = 3.5 \text{ m}$ and bed slope $S_0 = 1 \text{ in } 2000$ ($0.0005$). Water flows at a uniform normal depth of $y = 1.6 \text{ m}$.
Calculate:
1. Hydraulic radius $R$.
2. Flow velocity $V$ using Manning's equation.
3. Discharge capacity $Q$.
4. Average boundary shear stress $\tau_0$.

**Solution:**
1. Flow Area and Perimeter:
   $$A = B \cdot y = 3.5 \times 1.6 = 5.60 \text{ m}^2$$
   $$P = B + 2y = 3.5 + 2(1.6) = 6.70 \text{ m}$$
   $$R = \frac{A}{P} = \frac{5.60}{6.70} = 0.8358 \text{ m}$$
2. Velocity:
   $$V = \frac{1}{0.014} \times (0.8358)^{2/3} \times (0.0005)^{1/2}$$
   $$V = \frac{1}{0.014} \times (0.8872) \times (0.02236) = 1.417 \text{ m/s}$$
3. Discharge:
   $$Q = A \cdot V = 5.60 \times 1.417 = 7.935 \text{ m}^3/\text{s}$$
4. Boundary Shear Stress:
   $$\tau_0 = \gamma R S_0 = (9810 \text{ N/m}^3) \times 0.8358 \times 0.0005 = 4.10 \text{ N/m}^2$$

---

### Example 11.2: Bed Slope Determination for Specified Discharge
**Problem:** A trapezoidal channel with $B = 4.0 \text{ m}, m = 2.0$, and Manning $n = 0.022$ must convey $Q = 15.0 \text{ m}^3/\text{s}$ at normal depth $y_0 = 1.5 \text{ m}$. Compute the required longitudinal bed slope $S_0$.

**Solution:**
1. Geometry:
   $$A = (B + my)y = [4.0 + (2.0 \times 1.5)] \times 1.5 = [4.0 + 3.0] \times 1.5 = 10.50 \text{ m}^2$$
   $$P = B + 2y\sqrt{1+m^2} = 4.0 + 2(1.5)\sqrt{1 + 4} = 4.0 + 3.0\sqrt{5} = 4.0 + 6.708 = 10.708 \text{ m}$$
   $$R = \frac{10.50}{10.708} = 0.9806 \text{ m}$$
2. Conveyance $K$:
   $$K = \frac{1}{n} A R^{2/3} = \frac{1}{0.022} \times 10.50 \times (0.9806)^{2/3} = 45.45 \times 10.50 \times 0.9870 = 471.05 \text{ m}^3/\text{s}$$
3. Required Slope:
   $$S_0 = \left(\frac{Q}{K}\right)^2 = \left(\frac{15.0}{471.05}\right)^2 = (0.03184)^2 = 0.001014 \approx \frac{1}{986}$$

<!--tab:Interactive Workbench-->
### Uniform Flow & Conveyance Calculator
Interact with the Manning equation to examine parameter sensitivity:

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c11_1",
    "question": "A wide rectangular canal (R ≈ y = 2.0 m) has S0 = 0.0004 and n = 0.02. Calculate the Manning flow velocity in m/s.",
    "answer": 1.587,
    "tol": 0.02,
    "unit": "m/s",
    "hint": "V = (1/n) * y^(2/3) * S0^(1/2) = (1/0.02) * 2^(2/3) * 0.02.",
    "solution": "V = 50 * 1.5874 * 0.02 = 1.5874 m/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the physical meaning of the Channel Conveyance K = (1/n) A R^(2/3)?",
    "options": [
      "The discharge carrying capacity per unit energy head",
      "The discharge capacity of the channel cross-section under a unit bed slope (S0 = 1.0)",
      "The ratio of wetted perimeter to flow area",
      "The critical velocity of the flume"
    ],
    "answer": 1,
    "explanation": "Since Q = K √S0, when S0 = 1, Q = K. Hence conveyance represents the intrinsic discharge-carrying efficiency of the geometric cross section."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Cowan's Method for Estimating Manning's $n$ (USGS / IS: 4986):**
   $$n = (n_0 + n_1 + n_2 + n_3 + n_4) \cdot m_5$$
   where $n_0$ is base material, $n_1$ surface irregularity, $n_2$ cross-section variation, $n_3$ obstructions, $n_4$ vegetation density, and $m_5$ meandering multiplier ($1.00 - 1.30$).
"""

# =========================================================================
# S12: Most Economical (Hydraulically Efficient) Channel Sections
# =========================================================================
s12 = r"""<!--tab:Theory & Derivations-->
> [!note] Design Optimization Criterion
> A channel section is defined as **most economical** (or hydraulically most efficient) when it delivers the **maximum discharge $Q$ for a given cross-sectional area $A$**, slope $S_0$, and roughness $n$. By Manning's formula ($Q \propto R^{2/3}$), this is mathematically identical to **minimizing the wetted perimeter $P$** for a given area $A$, minimizing excavation and lining costs.

## 1. Rectangular Section Optimization
For a rectangular channel of width $B$ and depth $y$:
$$A = B y \implies B = \frac{A}{y}$$
$$P = B + 2y = \frac{A}{y} + 2y$$
To find minimum $P$ for constant $A$:
$$\frac{dP}{dy} = -\frac{A}{y^2} + 2 = 0 \implies \frac{B y}{y^2} = 2 \implies B = 2y$$
Hydraulic radius:
$$R = \frac{A}{P} = \frac{(2y)y}{2y + 2y} = \frac{2y^2}{4y} = \frac{y}{2}$$
**Golden Rules for Most Economical Rectangular Section:**
1. Bed width is twice the depth: $B = 2y$.
2. Hydraulic radius is half the depth: $R = \frac{y}{2}$.

## 2. Trapezoidal Section Optimization
For a trapezoidal section with side slope $m$ ($\text{horizontal} : 1 \text{vertical}$):
$$A = (B + my)y \implies B = \frac{A}{y} - my$$
$$P = B + 2y\sqrt{1+m^2} = \frac{A}{y} - my + 2y\sqrt{1+m^2}$$

1. **Optimizing for depth $y$ ($\frac{\partial P}{\partial y} = 0$):**
   $$-\frac{A}{y^2} - m + 2\sqrt{1+m^2} = 0 \implies \frac{B + 2my}{2} = y\sqrt{1+m^2}$$
   *Physical Meaning:* The top width half equals one sloping side ($T/2 = \text{sloping side}$).
   Hydraulic radius:
   $$R = \frac{A}{P} = \frac{y}{2}$$

2. **Optimizing for side slope $m$ ($\frac{\partial P}{\partial m} = 0$):**
   $$-y + 2y\frac{2m}{2\sqrt{1+m^2}} = 0 \implies 2m = \sqrt{1+m^2} \implies 4m^2 = 1 + m^2 \implies 3m^2 = 1$$
   $$m = \frac{1}{\sqrt{3}} \iff \theta = 60^\circ$$
   *Profound Theorem:* The most economical of **all** trapezoidal sections is a **half-hexagon**!

## 3. Triangular Section Optimization
For a symmetrical V-notch triangular channel of side slope $m$:
$$A = m y^2 \implies y = \sqrt{\frac{A}{m}}$$
$$P = 2y\sqrt{1+m^2} = 2\sqrt{A}\sqrt{\frac{1+m^2}{m}} = 2\sqrt{A}(m^{-1/2} + m^{1/2})^{1/2}$$
Minimizing $P$ with respect to $m$ yields $m = 1 \iff \theta = 45^\circ$ (Semi-vertex angle $45^\circ$, total included notch angle $90^\circ$).

<!--tab:Worked Examples-->
### Example 12.1: Designing the Most Economical Trapezoidal Canal
**Problem:** An unlined irrigation canal in stable earth ($n = 0.020, S_0 = 0.0004$) must convey a design discharge of $Q = 20.0 \text{ m}^3/\text{s}$. Design the most economical trapezoidal cross-section.

**Solution:**
1. **Best Hydraulic Geometry Conditions:**
   For a half-hexagon:
   - Side slope angle: $\theta = 60^\circ \implies m = \frac{1}{\sqrt{3}} \approx 0.5774$
   - Hydraulic radius: $R = \frac{y}{2}$
   - Bed width: $B = \frac{2}{\sqrt{3}}y \approx 1.1547 y$
   - Flow area: $A = (B + my)y = (\frac{2}{\sqrt{3}} + \frac{1}{\sqrt{3}})y^2 = \sqrt{3}y^2 \approx 1.7321 y^2$
2. **Manning Discharge Equation:**
   $$Q = \frac{1}{n} A R^{2/3} S_0^{1/2}$$
   $$20.0 = \frac{1}{0.020} (\sqrt{3}y^2) \left(\frac{y}{2}\right)^{2/3} \sqrt{0.0004}$$
   $$20.0 = 50 \times 1.7321 \times 0.02 \times \frac{y^{8/3}}{2^{2/3}} = \frac{1.7321}{1.5874} y^{8/3} = 1.0911 y^{8/3}$$
   $$y^{8/3} = \frac{20.0}{1.0911} = 18.33 \implies y = (18.33)^{3/8} = (18.33)^{0.375} = 2.977 \text{ m} \approx 2.98 \text{ m}$$
3. **Dimensions:**
   - Normal depth: $y = 2.98 \text{ m}$
   - Bed width: $B = 1.1547 \times 2.98 = 3.44 \text{ m}$
   - Top width: $T = B + 2my = 3.44 + 2(0.5774)(2.98) = 6.88 \text{ m}$
   - Flow velocity: $V = \frac{Q}{A} = \frac{20.0}{\sqrt{3}(2.98)^2} = \frac{20.0}{15.38} = 1.30 \text{ m/s}$ (Non-scouring & non-silting for concrete/hard soil).

<!--tab:Interactive Workbench-->
### Efficient Channel Section Optimizer
Interact with channel geometry parameters to verify the half-depth hydraulic radius principle ($R = y/2$).

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c12_1",
    "question": "For a most economical rectangular section with flow area A = 18 m², calculate the required bed width B in meters.",
    "answer": 6.0,
    "tol": 0.05,
    "unit": "m",
    "hint": "B = 2y, A = 2y² = 18 m² => y = 3 m => B = 6 m.",
    "solution": "A = 2y² = 18 => y = 3 m. B = 2*y = 6.0 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "In the most economical trapezoidal section, a circle drawn with center on the water surface and radius equal to depth y is tangent to:",
    "options": [
      "The bed only",
      "The two side slopes only",
      "All three sides (bed and both side slopes)",
      "The water surface only"
    ],
    "answer": 2,
    "explanation": "A fundamental geometric property of the best hydraulic trapezoidal section is that a semicircle of radius R = y inscribed on the water surface is exactly tangent to the bed and both side slopes."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Soil Angle of Repose Limitations:**
   While $\theta = 60^\circ$ ($m = 0.577$) is mathematically the most economical trapezoidal section, unlined earth canals in sandy or silty loam cannot sustain slopes steeper than the natural angle of repose ($\phi \approx 30^\circ - 33^\circ$, requiring $m \ge 1.5$ to $2.0$). Applying $m = 0.577$ in such soils would cause bank collapse.
"""

# =========================================================================
# S13: Practical Uniform Flow Design & Computation of Normal Depth (Newton-Raphson)
# =========================================================================
s13 = r"""<!--tab:Theory & Derivations-->
> [!note] The Implicit Nonlinear Challenge
> In real engineering design, discharge $Q$, bed slope $S_0$, and roughness $n$ are specified, and the engineer must find the **normal depth $y_0$**. Because $y_0$ appears nonlinearly in both area $A(y)$ and wetted perimeter $P(y)$, the governing equation is implicit and transcendental, requiring robust numerical root-finding algorithms.

## 1. Formulation of the Residual Function
From Manning's equation:
$$Q = \frac{1}{n} \frac{A^{5/3}}{P^{2/3}} S_0^{1/2} \iff f(y) = A(y)^{5/3} - \left(\frac{n Q}{S_0^{1/2}}\right) P(y)^{2/3} = 0$$

## 2. Newton-Raphson Iterative Scheme
Starting with an initial estimate $y^{(0)}$, the successive approximations iterate via:
$$y^{(k+1)} = y^{(k)} - \frac{f(y^{(k)})}{f'(y^{(k)})}$$
Differentiating $f(y)$ using the chain rule ($\frac{dA}{dy} = T$ and $\frac{dP}{dy} = 2\sqrt{1+m^2}$):
$$f'(y) = \frac{5}{3} A^{2/3} T - \frac{2}{3} \left(\frac{n Q}{S_0^{1/2}}\right) P^{-1/3} \frac{dP}{dy}$$
This scheme achieves quadratic convergence, determining $y_0$ to 6 decimal places in 3 to 4 iterations!

<!--tab:Worked Examples-->
### Example 13.1: Computing Normal Depth via Newton-Raphson Method
**Problem:** A trapezoidal canal with $B = 6.0 \text{ m}, m = 1.5, n = 0.015$, and $S_0 = 0.0008$ carries $Q = 25.0 \text{ m}^3/\text{s}$. Compute the normal depth $y_0$ using the Newton-Raphson method starting with $y^{(0)} = 1.5 \text{ m}$.

**Solution:**
Target constant:
$$C_Q = \frac{n Q}{S_0^{1/2}} = \frac{0.015 \times 25.0}{\sqrt{0.0008}} = \frac{0.375}{0.028284} = 13.2583$$

**Iteration 1 ($y = 1.5 \text{ m}$):**
- $A = (6.0 + 1.5 \times 1.5)(1.5) = 8.25 \times 1.5 = 12.375 \text{ m}^2$
- $P = 6.0 + 2(1.5)\sqrt{1 + 1.5^2} = 6.0 + 3.0(1.8028) = 11.408 \text{ m}$
- $T = 6.0 + 2(1.5)(1.5) = 10.5 \text{ m}$
- $\frac{dP}{dy} = 2\sqrt{1 + 1.5^2} = 3.6056$
- $f(y) = A^{5/3} - C_Q P^{2/3} = (12.375)^{1.6667} - 13.2583 \times (11.408)^{0.6667} = 66.402 - 13.2583 \times 5.0689 = 66.402 - 67.205 = -0.803$
- $f'(y) = \frac{5}{3} A^{2/3} T - \frac{2}{3} C_Q P^{-1/3} \frac{dP}{dy} = \frac{5}{3}(5.365)(10.5) - \frac{2}{3}(13.2583)(0.444)(3.6056) = 93.88 - 14.16 = 79.72$
- Correction: $\Delta y = -\frac{-0.803}{79.72} = +0.0101 \text{ m} \implies y^{(1)} = 1.510 \text{ m}$.

Convergence is achieved virtually on the first step: **$y_0 \approx 1.51 \text{ m}$**!

<!--tab:Interactive Workbench-->
### Newton-Raphson Normal Depth Workbench
Solve normal depth for any arbitrary channel geometry in real time.

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c13_1",
    "question": "For a wide channel (R ≈ y) with Q/B = q = 4 m²/s, n = 0.02, S0 = 0.001, compute y0 in meters.",
    "answer": 1.638,
    "tol": 0.03,
    "unit": "m",
    "hint": "q = (1/n) * y^(5/3) * S0^(1/2) => y = [q * n / S0^(1/2)]^(3/5).",
    "solution": "y = [4 * 0.02 / 0.03162]^(0.6) = [2.5298]^0.6 ≈ 1.638 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the Newton-Raphson method preferred over trial-and-error for normal depth computation in commercial hydraulic software (like HEC-RAS)?",
    "options": [
      "It requires no derivative computations",
      "It provides quadratic convergence near the root and converges in very few iterations",
      "It works only for rectangular sections",
      "It eliminates the need for Manning's n"
    ],
    "answer": 1,
    "explanation": "Newton-Raphson exhibits second-order (quadratic) convergence, doubling the number of accurate decimal places with each iteration."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Lining Degradation with Time (IS: 3873):**
   When designing canals, engineers must evaluate normal depth for both **initial clean condition** ($n = 0.013$, determining maximum velocity to check for scour) and **aged condition** ($n = 0.018$ due to algae, determining maximum water level to set bank height).
"""

# =========================================================================
# S14: Specific Energy (E), Critical Flow (Fr = 1) & Alternate Depths
# =========================================================================
s14 = r"""<!--tab:Theory & Derivations-->
> [!note] Bakhmeteff's Paradigm of Specific Energy
> Introduced by **Boris Bakhmeteff (1912)**, **Specific Energy ($E$)** is the energy head measured relative to the channel bottom as the datum, separating total energy into depth of flow and kinetic head:
> $$E = y + \frac{\alpha V^2}{2g} = y + \frac{\alpha Q^2}{2g A^2}$$

## 1. The $E-y$ Curve & Minimum Specific Energy
Plotting $E$ versus depth $y$ for a constant discharge $Q$ reveals two branches asymptotically approaching $E = y$ (as $y \to \infty$) and $E \to \infty$ (as $y \to 0$):

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 260" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Axes -->
    <line x1="80" y1="220" x2="680" y2="220" stroke="#4a5568" stroke-width="2"/>
    <line x1="80" y1="220" x2="80" y2="30" stroke="#4a5568" stroke-width="2"/>
    <text x="380" y="250" fill="#2d3748" font-size="12" font-weight="700" text-anchor="middle">Specific Energy E (m)</text>
    <text x="45" y="125" fill="#2d3748" font-size="12" font-weight="700" transform="rotate(-90 45 125)" text-anchor="middle">Depth y (m)</text>

    <!-- 45 degree line E = y -->
    <line x1="80" y1="220" x2="260" y2="40" stroke="#a0aec0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="270" y="45" fill="#718096" font-size="11">E = y</text>

    <!-- Specific Energy Curve -->
    <path d="M 600,45 C 320,60 220,110 220,135 C 220,160 320,205 600,216" fill="none" stroke="#2b6cb0" stroke-width="3"/>

    <!-- Critical point E_min -->
    <circle cx="220" cy="135" r="5" fill="#e53e3e"/>
    <line x1="220" y1="135" x2="220" y2="220" stroke="#e53e3e" stroke-dasharray="3,3"/>
    <line x1="80" y1="135" x2="220" y2="135" stroke="#e53e3e" stroke-dasharray="3,3"/>
    <text x="220" y="235" fill="#e53e3e" font-size="11" font-weight="700" text-anchor="middle">E_min</text>
    <text x="65" y="138" fill="#e53e3e" font-size="11" font-weight="700" text-anchor="end">y_c</text>

    <!-- Regimes -->
    <text x="400" y="90" fill="#2b6cb0" font-size="12" font-weight="600">Subcritical Flow (y > y_c, Fr < 1)</text>
    <text x="400" y="190" fill="#c53030" font-size="12" font-weight="600">Supercritical Flow (y < y_c, Fr > 1)</text>
  </svg>
</div>

To find the condition for minimum energy at constant $Q$:
$$\frac{dE}{dy} = 1 - \frac{Q^2}{g A^3}\frac{dA}{dy} = 0$$
Since $\frac{dA}{dy} = T$ (top width):
$$1 - \frac{Q^2 T_c}{g A_c^3} = 0 \implies \frac{Q^2 T_c}{g A_c^3} = 1 \iff \frac{V_c^2}{g D_c} = 1 \iff Fr_c = \frac{V_c}{\sqrt{g D_c}} = 1$$
This is the universal criterion for **Critical Flow**!

For a rectangular channel of width $B$ and discharge per unit width $q = Q/B$:
$$A_c = B y_c, \quad T_c = B \implies \frac{q^2}{g y_c^3} = 1 \implies y_c = \left(\frac{q^2}{g}\right)^{1/3}$$
$$E_{min} = y_c + \frac{V_c^2}{2g} = y_c + \frac{g y_c}{2g} = \frac{3}{2}y_c$$

## 2. Alternate Depths
For any energy $E > E_{min}$, the horizontal line intersects the curve at two distinct depths:
1. **$y_1 < y_c$ (Supercritical):** High velocity, small depth, shooting flow ($Fr > 1$).
2. **$y_2 > y_c$ (Subcritical):** Low velocity, large depth, tranquil flow ($Fr < 1$).
These two depths possessing identical specific energy are called **Alternate Depths**.

<!--tab:Worked Examples-->
### Example 14.1: Critical Depth and Alternate Depths
**Problem:** A rectangular flume carries a unit discharge $q = 3.2 \text{ m}^3/(\text{s}\cdot\text{m})$.
1. Determine critical depth $y_c$ and minimum specific energy $E_{min}$.
2. If the operating specific energy is $E = 2.4 \text{ m}$, find the two alternate depths of flow.

**Solution:**
1. **Critical Parameters:**
   $$y_c = \left(\frac{q^2}{g}\right)^{1/3} = \left(\frac{3.2^2}{9.81}\right)^{1/3} = \left(\frac{10.24}{9.81}\right)^{1/3} = (1.0438)^{1/3} = 1.014 \text{ m}$$
   $$E_{min} = \frac{3}{2}y_c = 1.5 \times 1.014 = 1.521 \text{ m}$$
   Since $E = 2.4 \text{ m} > E_{min}$, two real alternate depths exist.

2. **Alternate Depths Equation:**
   $$E = y + \frac{q^2}{2g y^2} \implies 2.4 = y + \frac{3.2^2}{2(9.81)y^2} = y + \frac{0.5219}{y^2}$$
   $$y^3 - 2.4 y^2 + 0.5219 = 0$$
   - Subcritical depth ($y_2 > y_c = 1.014$): Try $y \approx 2.3 \text{ m}$:
     $y_2 = 2.298 \text{ m} \approx 2.30 \text{ m}$ (Velocity $V_2 = 3.2/2.30 = 1.39 \text{ m/s}, Fr_2 = 0.29$).
   - Supercritical depth ($y_1 < y_c = 1.014$):
     $y_1 = 0.505 \text{ m}$ (Velocity $V_1 = 3.2/0.505 = 6.34 \text{ m/s}, Fr_1 = 2.85$).

<!--tab:Interactive Workbench-->
### Specific Energy & Alternate Depth Simulator
Explore critical flow conditions and trace alternate depths interactively:

::widget[specificenergy]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c14_1",
    "question": "For a rectangular channel with q = 2.0 m²/(s*m), compute the critical depth y_c in meters.",
    "answer": 0.741,
    "tol": 0.015,
    "unit": "m",
    "hint": "y_c = (q² / g)^(1/3) = (4.0 / 9.81)^(1/3).",
    "solution": "y_c = (0.4077)^(1/3) = 0.7415 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the wave celerity c of an infinitesimal gravity wave in an open channel of hydraulic depth D?",
    "options": [
      "c = √(g / D)",
      "c = √(g D)",
      "c = g D²",
      "c = V² / 2g"
    ],
    "answer": 1,
    "explanation": "Infinitesimal shallow water gravity waves propagate at celerity c = √(g D). When V = c, Fr = V/c = 1, defining the critical state."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Instability Near Critical Flow ($0.85 < Fr < 1.15$):**
   Canals and flumes must never be designed to operate within the trans-critical zone ($Fr \approx 0.85 - 1.15$). In this regime, $\frac{dE}{dy} \approx 0$, meaning infinitesimal boundary imperfections cause violent surface undulations and surging.
"""

write_session("S10", s10)
write_session("S11", s11)
write_session("S12", s12)
write_session("S13", s13)
write_session("S14", s14)
print("Part 1 (S10-S14) generated successfully!")
