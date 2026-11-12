import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Updated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S10: Directly from III_1 - Introduction.pptx
# =========================================================================
s10 = r"""<!--tab:Theory & Derivations-->
> [!note] Fundamental Core Definition
> Flow in an open channel or in a closed conduit having a free liquid surface is referred to as **free-surface flow** or **open-channel flow**. Open Channel Hydraulics deals with channels constructed for water supply, irrigation, drainage, sewers, culverts, tunnels flowing partially full, and natural streams and rivers.

## 1. Pipe Flow vs. Open Channel Flow: Comprehensive Comparison
The flow in a closed conduit is not necessarily pipe flow. If the liquid has a free surface, it must be classified as open channel flow:

| Parameter | Pipe Flow | Open Channel Flow |
| :--- | :--- | :--- |
| **Cross-Sectional Confinement** | Flow completely fills the closed pipe conduit under internal pressure. | Liquid has a free surface exposed to atmospheric pressure. |
| **Driving Mechanism** | Takes place due to a difference in piezometric pressure (pressure gradient: $\Delta P / L$). | Takes place due to the longitudinal slope of the channel bed under the action of **gravity** ($W \sin \theta$). |
| **Hydraulic Gradient Line (HGL)** | Sum of elevation and pressure head ($z + P/\gamma$), connecting water levels in piezometers. Can lie above or below pipe crown. | Corresponds directly to the **Water Surface Line (WSL)**, where gauge pressure is zero ($P_{atm}$ reference). |
| **Energy Gradient Line (EGL)** | Sum of HGL and velocity head ($z + P/\gamma + V^2/2g$). Drops in flow direction by head loss $h_L$. | Sum of WSL and velocity head ($z + y + V^2/2g$). Drops in flow direction by head loss $h_L$. |
| **Uniform Flow Gradient** | Drop in HGL equals the frictional head loss $h_L$. | The total energy line, water surface line, and channel bottom are all strictly parallel: **$S_f = S_w = S_0 = S$**. Drop in EGL equals drop in bed. |

## 2. Classification of Open Channels
1. **Based on Existence:**
   - **Natural Channels:** Streams, rivers, valleys, gullies, and tidal estuaries. These are inherently irregular in shape, alignment, and boundary surface roughness.
   - **Artificial Channels:** Built by engineers for specific purposes (irrigation canals, water supply aqueducts, sewers, wastewater flumes, power canals, spillway chutes). These have regular geometric shapes (trapezoidal for earth canals, circular for sewers) and uniform roughness.
2. **Based on Shape & Slope:**
   - **Prismatic Channels:** Cross-section geometry is uniform and bed slope $S_0$ is constant along the entire reach. Only artificial channels can be prismatic.
   - **Non-Prismatic Channels:** Cross-section, alignment, or bed slope (or all three) vary continuously along the channel length (e.g. natural rivers, reservoir reaches).

## 3. Classification of Open Channel Flows
- **Based on Time Criterion ($t$):**
  - **Steady Flow ($\frac{\partial y}{\partial t} = 0, \frac{\partial V}{\partial t} = 0$):** Conditions of flow (depth, discharge, velocity, cross-sectional area) remain constant with respect to time at any given section.
  - **Unsteady Flow ($\frac{\partial y}{\partial t} \ne 0, \frac{\partial V}{\partial t} \ne 0$):** Depth, velocity, or discharge vary with time at a given cross-section.
- **Based on Space Criterion ($x$):**
  - **Uniform Flow ($\frac{\partial y}{\partial x} = 0, \frac{\partial V}{\partial x} = 0$):** Depth and velocity remain identical from section to section along the channel reach.
  - **Non-Uniform (Varied) Flow ($\frac{\partial y}{\partial x} \ne 0$):** Depth and velocity change along the length of the channel.
    - **Gradually Varied Flow (GVF):** Depth changes smoothly and gradually over a long channel distance (e.g. backwater curve behind a weir).
    - **Rapidly Varied Flow (RVF):** Depth changes abruptly over a very short distance, accompanied by intense shock waves and roller vortices (e.g. hydraulic jump, sluice gate discharge).

### Four Practical Flow Combinations

```
                                  SPACE CRITERION
                       Uniform Flow             Non-Uniform (Varied) Flow
                 ┌────────────────────────┬──────────────────────────────────┐
     Steady Flow │ Steady Uniform:        │ Steady Non-Uniform:              │
                 │ Constant canal flow    │ Flow over a spillway crest;      │
TIME             │ at normal depth yn.    │ GVF backwater behind a dam.      │
CRITERION        ├────────────────────────┼──────────────────────────────────┤
   Unsteady Flow │ Unsteady Uniform:      │ Unsteady Non-Uniform:            │
                 │ Extremely rare in      │ Propagating flood wave;          │
                 │ nature/engineering.    │ tidal surge / bore in an estuary.│
                 └────────────────────────┴──────────────────────────────────┘
```

## 4. Forces & Governing Dimensionless Numbers
Fluid motion in open channels is governed by the interaction of six fundamental physical forces:
1. **Inertia Force ($F_i = \rho L^2 V^2$):** Mass times acceleration.
2. **Viscous Force ($F_\nu = \mu L V$):** Molecular shear resistance.
3. **Gravity Force ($F_g = \rho L^3 g$):** Weight of fluid down slope.
4. **Pressure Force ($F_p = \Delta P L^2$):** Hydrostatic thrust.
5. **Surface Tension Force ($F_s = \sigma L$):** Meniscus cohesive pull.
6. **Elastic Force ($F_e = K L^2$):** Compressibility resistance.

From these forces, five dimensionless parameters dictate hydrodynamic regimes:
- **Reynolds Number ($Re = \frac{F_i}{F_\nu} = \frac{V R}{\nu}$):** Differentiates **Laminar** ($Re < 500$), **Transition** ($500 \le Re \le 2000$), and **Turbulent** ($Re > 2000$) open channel flow.
- **Froude Number ($Fr = \sqrt{\frac{F_i}{F_g}} = \frac{V}{\sqrt{g D}}$):** Differentiates gravity wave regimes:
  - **Critical Flow ($Fr = 1$):** Flow velocity $V$ equals the celerity of an elementary surface gravity wave $c = \sqrt{g D}$.
  - **Sub-Critical Flow ($Fr < 1$, Tranquil or Streaming Flow):** Flow velocity is less than wave celerity ($V < \sqrt{g D}$). Surface waves can travel upstream. Control is downstream!
  - **Super-Critical Flow ($Fr > 1$, Shooting or Rapid Flow):** Flow velocity exceeds wave celerity ($V > \sqrt{g D}$). Disturbances cannot travel upstream. Control is upstream!

## 5. Geometric Parameters & Velocity Distribution
For any channel cross-section:
- **Flow Depth ($y$):** Vertical distance from channel bed to free surface.
- **Flow Area ($A$):** Cross-sectional area of the fluid stream.
- **Wetted Perimeter ($P$):** Boundary length in direct contact with fluid.
- **Hydraulic Radius ($R = A/P$):** Primary measure of hydraulic efficiency.
- **Top Width ($T$):** Width of the channel at the free surface.
- **Hydraulic Depth ($D = A/T$):** Characteristic depth for Froude number calculation.
- **Section Factor ($Z = A\sqrt{D} = A\sqrt{A/T}$):** Governing factor for critical flow.

**Velocity Distribution & Dip Phenomenon:**
Due to shear stresses along the channel bed and sidewalls, velocity is zero at the solid boundary. In addition, secondary circulation vortices and surface resistance pull the point of maximum velocity slightly below the free surface ($0.05 y \text{ to } 0.25 y$ below the surface), termed the **velocity dip**.

<!--tab:Worked Examples-->
### Example 10.1: Classification of Flow Regime (Re and Fr)
**Problem:** A rectangular concrete canal ($B = 4.0 \text{ m}$) carries water at depth $y = 1.2 \text{ m}$ at a discharge of $Q = 14.4 \text{ m}^3/\text{s}$. Water kinematic viscosity is $\nu = 1.0 \times 10^{-6} \text{ m}^2/\text{s}$.
1. Compute the hydraulic radius $R$ and hydraulic depth $D$.
2. Calculate the Reynolds number $Re$ and determine if the flow is laminar or turbulent.
3. Calculate the Froude number $Fr$ and determine whether the flow is subcritical (tranquil/streaming) or supercritical (shooting/rapid).

**Solution:**
1. **Geometric Elements:**
   - Flow Area: $A = B y = 4.0 \times 1.2 = 4.80 \text{ m}^2$
   - Wetted Perimeter: $P = B + 2y = 4.0 + 2(1.2) = 6.40 \text{ m}$
   - Hydraulic Radius: $R = \frac{A}{P} = \frac{4.80}{6.40} = \mathbf{0.750 \text{ m}}$
   - Top Width: $T = B = 4.0 \text{ m}$
   - Hydraulic Depth: $D = \frac{A}{T} = \frac{4.80}{4.0} = \mathbf{1.20 \text{ m}}$

2. **Reynolds Number:**
   - Velocity: $V = \frac{Q}{A} = \frac{14.4}{4.80} = 3.0 \text{ m/s}$
   - $Re = \frac{V R}{\nu} = \frac{3.0 \times 0.750}{1.0 \times 10^{-6}} = 2.25 \times 10^6$
   - *Regime:* Since $Re = 2.25 \times 10^6 \gg 2000$, flow is **fully turbulent**.

3. **Froude Number:**
   - Wave Celerity: $c = \sqrt{g D} = \sqrt{9.81 \times 1.20} = \sqrt{11.772} = 3.431 \text{ m/s}$
   - Froude Number: $Fr = \frac{V}{c} = \frac{3.0}{3.431} = \mathbf{0.874}$
   - *Regime:* Since $Fr = 0.874 < 1.0$, the flow is **Sub-Critical (Tranquil / Streaming)**. Small surface ripples can travel upstream against the flow.

---

### Example 10.2: Energy & Momentum Correction Factors
**Problem:** In a wide rectangular channel of depth $y_0 = 1.8 \text{ m}$, field gauging determines that the velocity profile follows the power law $u(y) = 2.4 \left(\frac{y}{y_0}\right)^{1/7} \text{ m/s}$.
Calculate:
1. Mean velocity $V$.
2. Kinetic energy correction coefficient $\alpha$ (Coriolis coefficient).
3. Momentum correction coefficient $\beta$ (Boussinesq coefficient).

**Solution:**
1. **Mean Velocity $V$:**
   $$V = \frac{1}{y_0}\int_0^{y_0} 2.4 \left(\frac{y}{y_0}\right)^{1/7} dy = \frac{2.4}{y_0} \left[\frac{y^{8/7}}{8/7}\right]_0^{y_0} = 2.4 \times \frac{7}{8} = \mathbf{2.10 \text{ m/s}}$$

2. **Momentum Correction Factor $\beta$:**
   $$\beta = \frac{1}{A V^2} \int u^2 dA = \frac{1}{y_0 V^2} \int_0^{y_0} (2.4)^2 \left(\frac{y}{y_0}\right)^{2/7} dy = \frac{5.76}{y_0 (2.10)^2} \left[\frac{y^{9/7}}{9/7}\right]_0^{y_0} = \frac{5.76}{4.41} \times \frac{7}{9} = \frac{40.32}{39.69} = \mathbf{1.016}$$

3. **Kinetic Energy Correction Factor $\alpha$:**
   $$\alpha = \frac{1}{A V^3} \int u^3 dA = \frac{1}{y_0 V^3} \int_0^{y_0} (2.4)^3 \left(\frac{y}{y_0}\right)^{3/7} dy = \frac{13.824}{y_0 (2.10)^3} \left[\frac{y^{10/7}}{10/7}\right]_0^{y_0} = \frac{13.824}{9.261} \times \frac{7}{10} = \mathbf{1.045}$$
   *Verification:* Notice that $\alpha (1.045) > \beta (1.016) > 1.00$, confirming Cauchy-Schwarz inequality.

<!--tab:Interactive Workbench-->
### Open Channel Geometric Elements & Flow Regime Workbench
Select channel shape (rectangular, trapezoidal, triangular, circular), enter dimensions, and view real-time geometric parameters and Froude/Reynolds flow classification:

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c10_1",
    "question": "A trapezoidal canal has bed width B = 5 m, side slopes m = 2 (1V:2H), and depth y = 2 m. Calculate the flow area A in m².",
    "answer": 18.0,
    "tol": 0.1,
    "unit": "m²",
    "hint": "A = (B + m*y)*y = (5 + 2*2)*2.",
    "solution": "A = (5 + 4)*2 = 9 * 2 = 18.0 m²."
  },
  {
    "id": "c10_2",
    "question": "For a channel with hydraulic depth D = 2.5 m, calculate the wave celerity c = sqrt(g*D) in m/s (use g = 9.81 m/s²).",
    "answer": 4.952,
    "tol": 0.05,
    "unit": "m/s",
    "hint": "c = sqrt(9.81 * 2.5) = sqrt(24.525).",
    "solution": "c = sqrt(24.525) ≈ 4.952 m/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the Hydraulic Gradient Line (HGL) in an open channel identical to the Water Surface Line (WSL)?",
    "options": [
      "Because the velocity is zero everywhere",
      "Because the water surface is exposed to the atmosphere, meaning the gauge pressure head is zero (P/γ = 0)",
      "Because gravity ceases to act",
      "Because friction losses are neglected"
    ],
    "answer": 1,
    "explanation": "In open channel flow, the free surface is open to the atmosphere. Since gauge pressure head is zero at the surface, the piezometric head z + P/γ equals the elevation of the water surface z + y, meaning HGL coincides with WSL."
  },
  {
    "question": "Which of the following represents a Steady Non-Uniform open channel flow?",
    "options": [
      "A constant discharge passing through a long uniform canal at normal depth",
      "Water flowing at a steady rate over a dam spillway crest",
      "A sudden flood wave propagating down a river valley",
      "A tidal bore advancing into an estuary"
    ],
    "answer": 1,
    "explanation": "Water flowing over a spillway has constant discharge over time (∂/∂t = 0, steady), but depth and velocity vary rapidly along the curved crest profile (∂/∂x ≠ 0, non-uniform)."
  },
  {
    "question": "In open channel hydraulics, flow is classified as 'Sub-Critical' (tranquil/streaming) when the Froude number is:",
    "options": [
      "Fr = 1.0",
      "Fr > 1.0",
      "Fr < 1.0",
      "Fr > 2000"
    ],
    "answer": 2,
    "explanation": "When Fr < 1.0, the flow velocity is lower than the gravity wave celerity (V < √gD), permitting surface waves to travel upstream, defining tranquil or streaming flow."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Real-World Field Nuances & Standards
1. **Partially Full Tunnels and Sewers (IS: 4111):**
   Sewers and road tunnels are closed circular conduits, but they are specifically designed to flow **partially full** under gravity ($y/D \approx 0.75 - 0.80$). This ensures an open free surface for sewer ventilation, preventing explosive buildup of hydrogen sulfide ($H_2S$) and methane gases.
2. **Velocity Dip Measurement Standards (IS: 1192 / USGS):**
   In field hydrometry, when measuring mean stream velocity with a current meter:
   - For shallow channels ($y < 0.6 \text{ m}$): Take reading at **$0.6 y$ depth** from the surface ($V_{mean} \approx V_{0.6}$).
   - For deep channels ($y \ge 0.6 \text{ m}$): Take the two-point average at **$0.2 y$ and $0.8 y$ depth**:
     $$V_{mean} = \frac{V_{0.2} + V_{0.8}}{2}$$
   This standard accounts for boundary shear and the surface velocity dip.
"""

# =========================================================================
# S11: Directly from III_2 - Conservation Laws and C.pptx
# =========================================================================
s11 = r"""<!--tab:Theory & Derivations-->
> [!note] Force Equilibrium in Uniform Flow
> Uniform flow represents the dynamic equilibrium state of open channel flow: the depth of flow, wetted area, velocity, and discharge remain constant at every section along the channel reach ($dy/dx = 0, dV/dx = 0$). The total energy line, water surface, and channel bottom are strictly parallel: **$S_f = S_w = S_0 = S$**. The constant depth is termed the **Normal Depth ($y_n$)**.

## 1. Fundamental Equation of Uniform Flow & Chezy's Formula
Applying Newton's Second Law of Motion to a control volume of fluid of length $L$ in a channel with bed slope $S_0 = \sin \theta \approx \tan \theta$:
- Since velocity is constant along the channel, acceleration is zero ($a_x = 0$).
- Therefore, the sum of all external forces in the direction of flow must be equal to zero: $\sum F_x = 0$.

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Sloping Bed -->
    <line x1="80" y1="120" x2="660" y2="200" stroke="#4a5568" stroke-width="4"/>
    <text x="640" y="218" fill="#4a5568" font-size="11" font-weight="700">Bed Slope S0 = sin θ</text>

    <!-- Water Surface -->
    <line x1="80" y1="50" x2="660" y2="130" stroke="#2b6cb0" stroke-width="2.5"/>
    <text x="640" y="125" fill="#2b6cb0" font-size="11" font-weight="700">WSL (Sw = S0)</text>

    <!-- Hydrostatic Pressure Forces P1 and P2 -->
    <line x1="160" y1="60" x2="160" y2="131" stroke="#e53e3e" stroke-width="2"/>
    <text x="145" y="95" fill="#e53e3e" font-size="11" font-weight="700">P₁</text>

    <line x1="540" y1="113" x2="540" y2="184" stroke="#e53e3e" stroke-width="2"/>
    <text x="555" y="148" fill="#e53e3e" font-size="11" font-weight="700">P₂</text>

    <!-- Gravity Force Component W sin θ -->
    <line x1="350" y1="105" x2="420" y2="114" stroke="#38a169" stroke-width="2.5"/>
    <text x="390" y="98" fill="#22543d" font-size="11" font-weight="700">W sin θ</text>

    <!-- Resisting Frictional Shear Force τ0 P L -->
    <line x1="420" y1="168" x2="330" y2="157" stroke="#dd6b20" stroke-width="2.5"/>
    <text x="380" y="184" fill="#c05621" font-size="11" font-weight="700">Shear Force: τ₀ P L</text>
  </svg>
</div>

1. Hydrostatic pressure forces at sections 1 and 2 balance out identically ($P_1 = P_2$) because the flow depth and cross-sectional area are constant.
2. Downstream component of fluid weight:
   $$W_x = W \sin \theta = (\rho g A L) S_0 = \gamma A L S_0$$
3. Opposing boundary shear resistance along the wetted perimeter:
   $$F_f = \tau_0 P L$$
4. Equating driving force to frictional resistance:
   $$\gamma A L S_0 = \tau_0 P L \implies \tau_0 = \gamma \left(\frac{A}{P}\right) S_0 = \gamma R S_0$$
   where $R = A/P$ is the hydraulic radius.

Adopting the fluid shear stress relationship $\tau_0 = \frac{f}{8}\rho V^2$:
$$\gamma R S_0 = \frac{f}{8}\rho V^2 \implies \rho g R S_0 = \frac{f}{8}\rho V^2 \implies V = \sqrt{\frac{8g}{f}} \sqrt{R S_0} = C \sqrt{R S_0}$$
This is **Chezy's Formula**, where $C = \sqrt{8g/f}$ is Chezy's resistance factor.
*Dimensions of Chezy's $C$:*
$$[C] = \left[\frac{V}{\sqrt{R S_0}}\right] = \frac{L T^{-1}}{L^{1/2}} = \mathbf{[L^{1/2} T^{-1}]} \quad (\text{SI units: } \text{m}^{1/2}/\text{s})$$

## 2. Manning's Equation & Conveyance ($K$)
Robert Manning (1889) demonstrated that $C = \frac{1}{n} R^{1/6}$, leading to **Manning's Formula**:
$$V = \frac{1}{n} R^{2/3} S_0^{1/2} \quad \text{(SI Units)}$$
$$Q = A V = \frac{1}{n} A R^{2/3} S_0^{1/2} = K \sqrt{S_0}$$
where $K = \frac{1}{n} A R^{2/3}$ is the **Channel Conveyance** ($\text{m}^3/\text{s}$).

## 3. Ten Primary Factors Affecting Manning's $n$ (Chow & Cowan)
In engineering practice, $n$ is not a fixed constant but depends dynamically on 10 interdependent physical factors:
1. **Vegetation:** Reduces channel capacity and retards flow. Dependent on vegetation height, density, distribution, and seasonal submergence on flood plains.
2. **Surface Roughness:** Size and shape of boundary grains. Fine grains (sand, clay, loam) produce low $n$; coarse gravel, cobbles, and boulders produce high $n$.
3. **Channel Irregularity:** Sand bars, sand waves, depressions, and humps on the bed introduce extra turbulent form loss, increasing $n$.
4. **Channel Alignment:** Smooth curves with large radii have minimal effect; severe meandering and sharp bends significantly increase $n$.
5. **Silting and Scouring:** Silting may smooth out uneven depressions and decrease $n$, whereas scouring may carve irregular gullies, increasing $n$.
6. **Obstructions:** Bridge piers, log jams, and trash racks generate eddy separation, increasing $n$.
7. **Size and Shape of Channel:** In compound channels, an increase in stage/depth changes hydraulic radius and boundary shear distribution, causing $n$ to vary across sub-sections.
8. **Stage and Discharge:** The $n$ value typically **decreases with increasing stage and discharge** because large depths drown out localized bottom irregularities.
9. **Seasonal Change:** Aquatic weeds and leafy willow growth increase $n$ during the summer growing season and diminish $n$ during the dormant winter.
10. **Suspended Material and Bed Load:** Sediment transport consumes stream energy, producing an apparent increase in channel flow resistance.

### Cowan's Formulation for Estimating $n$:
$$n = (n_0 + n_1 + n_2 + n_3 + n_4) \cdot m$$
where:
- $n_0$: Basic material roughness ($0.020$ for earth, $0.025$ for rock cut, $0.028$ for fine gravel).
- $n_1$: Surface irregularity ($0.000$ smooth to $0.020$ severe).
- $n_2$: Cross-section shape variations ($0.000$ gradual to $0.015$ frequent large/small alternations).
- $n_3$: Obstructions ($0.000$ negligible to $0.060$ severe).
- $n_4$: Vegetation ($0.005$ low grass to $0.100$ dense timber).
- $m$: Meandering correction factor ($1.00$ minor to $1.30$ severe meandering).

<!--tab:Worked Examples-->
### Example 11.1: Discharge through a Concrete-Lined Trapezoidal Channel (Slide 54)
**Problem:** A smooth concrete-lined channel has a trapezoidal cross-section with base width $B = 6.0 \text{ m}$ and side slopes $1\text{V} : 2\text{H}$ ($m = 2.0$). If the bed slope is $S_0 = 1 \text{ in } 500$ ($0.002$) and normal depth is $y_n = 2.0 \text{ m}$, calculate the quantity of flow (take Manning $n = 0.015$).

**Solution:**
1. **Cross-Sectional Flow Area $A$:**
   $$A = (B + my)y = [6.0 + (2.0 \times 2.0)] \times 2.0 = [6.0 + 4.0] \times 2.0 = 10.0 \times 2.0 = \mathbf{20.0 \text{ m}^2}$$

2. **Wetted Perimeter $P$:**
   $$P = B + 2y\sqrt{1 + m^2} = 6.0 + 2(2.0)\sqrt{1 + 2^2} = 6.0 + 4.0\sqrt{5} = 6.0 + 4.0(2.2361) = 6.0 + 8.944 = \mathbf{14.944 \text{ m}}$$

3. **Hydraulic Radius $R$:**
   $$R = \frac{A}{P} = \frac{20.0}{14.944} = \mathbf{1.3383 \text{ m}}$$
   $$R^{2/3} = (1.3383)^{0.6667} = \mathbf{1.2144 \text{ m}^{2/3}}$$

4. **Flow Velocity and Discharge:**
   $$S_0^{1/2} = \sqrt{0.002} = 0.04472$$
   $$V = \frac{1}{n} R^{2/3} S_0^{1/2} = \frac{1}{0.015} \times 1.2144 \times 0.04472 = 66.67 \times 0.05431 = \mathbf{3.621 \text{ m/s}}$$
   $$Q = A \cdot V = 20.0 \times 3.621 = \mathbf{72.42 \text{ m}^3/\text{s}}$$

---

### Example 11.2: Normal Depth for a Specified Discharge (Slide 55)
**Problem:** For the trapezoidal channel in Example 11.1 ($B = 6.0 \text{ m}, m = 2.0, S_0 = 1/500, n = 0.015$), if the discharge is $Q = 40.0 \text{ m}^3/\text{s}$, determine the normal depth $y_n$.

**Solution:**
Manning equation:
$$Q = \frac{1}{n} \frac{A^{5/3}}{P^{2/3}} S_0^{1/2} \implies \frac{A^{5/3}}{P^{2/3}} = \frac{n Q}{S_0^{1/2}} = \frac{0.015 \times 40.0}{\sqrt{0.002}} = \frac{0.60}{0.04472} = \mathbf{13.417}$$
We solve for $y_n$ iteratively where $A = (6 + 2y)y$ and $P = 6 + 2\sqrt{5}y = 6 + 4.472y$:
- **Trial 1 ($y = 1.50 \text{ m}$):**
  $A = (6 + 3)(1.5) = 13.5 \text{ m}^2$, $P = 6 + 4.472(1.5) = 12.708 \text{ m}$
  $\frac{A^{5/3}}{P^{2/3}} = \frac{13.5^{1.6667}}{12.708^{0.6667}} = \frac{76.32}{5.446} = 14.01 > 13.417$ (Depth too high).
- **Trial 2 ($y = 1.45 \text{ m}$):**
  $A = (6 + 2.9)(1.45) = 12.905 \text{ m}^2$, $P = 6 + 4.472(1.45) = 12.484 \text{ m}$
  $\frac{A^{5/3}}{P^{2/3}} = \frac{12.905^{1.6667}}{12.484^{0.6667}} = \frac{70.93}{5.382} = 13.18 < 13.417$ (Depth slightly low).
- **Interpolation:**
  $$y_n \approx 1.45 + (1.50 - 1.45)\left(\frac{13.417 - 13.18}{14.01 - 13.18}\right) = 1.45 + 0.05\left(\frac{0.237}{0.83}\right) = \mathbf{1.464 \text{ m}}$$
  *Answer:* The normal depth for $40 \text{ m}^3/\text{s}$ is **$y_n = 1.46 \text{ m}$**.

<!--tab:Interactive Workbench-->
### Uniform Flow & Manning Normal Depth Solver
Solve normal depth for trapezoidal, rectangular, and circular conduits using live root-finding:

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c11_1",
    "question": "A channel with bed slope S0 = 0.001 and hydraulic radius R = 1.5 m has Chezy coefficient C = 50. Calculate the flow velocity in m/s.",
    "answer": 1.936,
    "tol": 0.02,
    "unit": "m/s",
    "hint": "V = C * sqrt(R * S0) = 50 * sqrt(1.5 * 0.001).",
    "solution": "V = 50 * sqrt(0.0015) = 50 * 0.03873 = 1.936 m/s."
  },
  {
    "id": "c11_2",
    "question": "Using Cowan's method, if n0 = 0.025, n1 = 0.005, n2 = 0.005, n3 = 0.010, n4 = 0.015, and m = 1.15, compute Manning's n.",
    "answer": 0.069,
    "tol": 0.002,
    "unit": "",
    "hint": "n = (0.025 + 0.005 + 0.005 + 0.010 + 0.015) * 1.15 = 0.060 * 1.15.",
    "solution": "n = 0.060 * 1.15 = 0.069."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "In steady uniform open channel flow, the boundary shear stress τ₀ is expressed as:",
    "options": [
      "τ₀ = γ R S₀",
      "τ₀ = γ y S₀",
      "τ₀ = ρ V² / 2",
      "τ₀ = μ dV/dx"
    ],
    "answer": 0,
    "explanation": "Equating the gravity driving force down the bed (γ A L S₀) to the boundary resistance (τ₀ P L) gives τ₀ = γ (A/P) S₀ = γ R S₀."
  },
  {
    "question": "What are the dimensional units of Chezy's coefficient C in the SI system?",
    "options": [
      "Dimensionless",
      "m^(1/2) / s  [L^(1/2) T^(-1)]",
      "m / s",
      "m² / s"
    ],
    "answer": 1,
    "explanation": "Since V = C √(R S₀) and S₀ is dimensionless, [C] = [V] / [R^(1/2)] = (m/s) / m^(1/2) = m^(1/2)/s."
  },
  {
    "question": "Why does Manning's n typically decrease as river stage and discharge increase?",
    "options": [
      "Water becomes more viscous at higher discharge",
      "Deep water submerges and drowns out bottom bed grain and ripple irregularities, reducing relative roughness",
      "Gravity decreases with depth",
      "Channel slope increases"
    ],
    "answer": 1,
    "explanation": "As stage increases, the ratio of roughness height k to flow depth y drops drastically (relative roughness k/y << 1), diminishing boundary turbulent form drag and lowering effective n."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Real-World Field Nuances & Standards
1. **Lining Material Selection (IS: 3873 & IS: 4558):**
   - **Cast-in-situ concrete:** $n = 0.013 - 0.015$ (Permissible non-scouring velocity up to $2.5 - 3.0 \text{ m/s}$).
   - **Shotcrete / Gunite:** $n = 0.016 - 0.019$.
   - **Brick tile lining:** $n = 0.015 - 0.017$.
   - **Rip-rap stone pitching:** $n = 0.025 - 0.035$.
   Selecting the proper $n$ ensures the design avoids both **silting** (velocity must exceed self-cleansing velocity $V > 0.6 \text{ m/s}$) and **scouring** ($V < V_{permissible}$).
"""

# =========================================================================
# S12: Directly from III_3 - Economical Section.pptx
# =========================================================================
s12 = r"""<!--tab:Theory & Derivations-->
> [!note] Design Optimization Criterion
> A channel section is defined as **most economical** (or **best / most efficient section**) when the cost of construction (excavation and lining) is minimum.
> By Chezy's ($Q = A C \sqrt{R S_0}$) and Manning's ($Q = \frac{1}{n} A R^{2/3} S_0^{1/2}$) equations, for a given discharge $Q$, bed slope $S_0$, and resistance coefficient, the flow area $A$ is minimum when the **hydraulic radius $R$ is maximum**.
> Since $R = A/P$, this is mathematically identical to **minimizing the wetted perimeter $P$ for a given area $A$**.

## 1. Most Economical Rectangular Section
For a rectangular channel of bed width $B$ and depth $y$:
$$A = B y \implies B = \frac{A}{y}$$
$$P = B + 2y = \frac{A}{y} + 2y$$
Differentiating $P$ with respect to $y$ and setting $\frac{dP}{dy} = 0$:
$$\frac{dP}{dy} = -\frac{A}{y^2} + 2 = 0 \implies \frac{B y}{y^2} = 2 \implies \mathbf{B = 2y}$$
Hydraulic Radius:
$$R = \frac{A}{P} = \frac{(2y)y}{2y + 2y} = \frac{2y^2}{4y} = \mathbf{\frac{y}{2}}$$
**Two Fundamental Rules for Best Rectangular Section:**
1. Bed width is twice the depth: $B = 2y$.
2. Hydraulic radius is half the depth: $R = y/2$.

## 2. Most Economical Trapezoidal Section
For a trapezoidal channel with side slopes $1\text{V} : m\text{H}$:
$$A = (B + my)y \implies B = \frac{A}{y} - my$$
$$P = B + 2y\sqrt{1+m^2} = \frac{A}{y} - my + 2y\sqrt{1+m^2}$$

1. **Condition for Optimum Depth ($\frac{\partial P}{\partial y} = 0$):**
   $$\frac{\partial P}{\partial y} = -\frac{A}{y^2} - m + 2\sqrt{1+m^2} = 0 \implies \frac{B + my}{y} + m = 2\sqrt{1+m^2}$$
   $$\frac{B + 2my}{2} = y\sqrt{1+m^2} \iff \mathbf{\frac{T}{2} = \text{Sloping Side}}$$
   *Rule 1:* Half of the top width must equal the length of one sloping side!
   Hydraulic Radius:
   $$R = \frac{A}{P} = \frac{(B + my)y}{B + 2y\sqrt{1+m^2}} = \frac{(B + my)y}{B + (B + 2my)} = \mathbf{\frac{y}{2}}$$
   *Rule 2:* Hydraulic radius is half the depth ($R = y/2$).
   *Rule 3:* A semicircle drawn with center on the water surface and radius $R=y$ is tangent to the bed and both side slopes!

2. **Condition for Optimum Side Slope ($\frac{\partial P}{\partial m} = 0$):**
   $$\frac{\partial P}{\partial m} = -y + 2y \cdot \frac{2m}{2\sqrt{1+m^2}} = 0 \implies \frac{2m}{\sqrt{1+m^2}} = 1 \implies 4m^2 = 1 + m^2$$
   $$3m^2 = 1 \implies m = \frac{1}{\sqrt{3}} \iff \mathbf{\theta = 60^\circ}$$
   *Rule 4:* The most economical of all trapezoidal channels is a **half-hexagon**!

## 3. Most Economical Circular Section
For a circular conduit of diameter $D$ with wetted central angle $2\theta$:
1. **Condition for Maximum Velocity:**
   $$\theta = 128^\circ 45' \implies \mathbf{y = 0.81 D}, \quad R = 0.304 D$$
2. **Condition for Maximum Discharge:**
   $$\theta = 154^\circ \implies \mathbf{y = 0.95 D}, \quad R = 0.29 D$$

<!--tab:Worked Examples-->
### Example 12.1: Maximum Discharge in a Rectangular Channel (Slide 11)
**Problem:** A rectangular channel of width $B = 4.0 \text{ m}$ is laid on a bed slope of $1 \text{ in } 1500$. Find the maximum discharge through the channel. Take Chezy's $C = 50$.

**Solution:**
For a rectangular channel to carry maximum discharge, it must be the most economical section:
$$B = 2y \implies y = \frac{B}{2} = \frac{4.0}{2} = \mathbf{2.0 \text{ m}}$$
$$R = \frac{y}{2} = \frac{2.0}{2} = \mathbf{1.0 \text{ m}}$$
Flow Area:
$$A = B y = 4.0 \times 2.0 = \mathbf{8.0 \text{ m}^2}$$
Discharge via Chezy formula:
$$Q = A C \sqrt{R S_0} = 8.0 \times 50 \times \sqrt{1.0 \times \frac{1}{1500}} = 400 \times \sqrt{0.0006667} = 400 \times 0.02582 = \mathbf{10.33 \text{ m}^3/\text{s}}$$

---

### Example 12.2: Economical Dimensions from Given Discharge (Slide 12)
**Problem:** A rectangular channel carries water at the rate of $Q = 400 \text{ L/s}$ ($0.40 \text{ m}^3/\text{s}$) when the bed slope is $1 \text{ in } 2000$. Find the most economical dimensions of the channel if Chezy's $C = 50$.

**Solution:**
For the most economical section: $B = 2y$, $A = 2y^2$, and $R = y/2$.
$$Q = A C \sqrt{R S_0} \implies 0.40 = (2y^2) \times 50 \times \sqrt{\frac{y}{2} \times \frac{1}{2000}}$$
$$0.40 = 100 y^2 \times \frac{\sqrt{y}}{\sqrt{4000}} = \frac{100}{63.245} y^{2.5} = 1.581 y^{2.5}$$
$$y^{2.5} = \frac{0.40}{1.581} = 0.2530 \implies y = (0.2530)^{1/2.5} = (0.2530)^{0.4} = \mathbf{0.577 \text{ m}}$$
Bed Width:
$$B = 2y = 2 \times 0.577 = \mathbf{1.154 \text{ m}}$$

---

### Example 12.3: Redesigning a Channel to Maximize Discharge (Slide 13)
**Problem:** A rectangular channel $4.0 \text{ m}$ wide has depth of water $y = 1.5 \text{ m}$. Bed slope is $S_0 = 1/1000$ and $C = 55$. It is desired to increase discharge to a maximum by changing dimensions for the **same cross-sectional area, bed slope, and roughness**. Find the new dimensions and the percentage increase in discharge.

**Solution:**
1. **Existing Channel:**
   $$A = B y = 4.0 \times 1.5 = 6.0 \text{ m}^2$$
   $$P = B + 2y = 4.0 + 2(1.5) = 7.0 \text{ m} \implies R_1 = \frac{6.0}{7.0} = 0.8571 \text{ m}$$
   $$Q_1 = A C \sqrt{R_1 S_0} = 6.0 \times 55 \times \sqrt{0.8571 \times 0.001} = 330 \times \sqrt{0.0008571} = 330 \times 0.02928 = \mathbf{9.66 \text{ m}^3/\text{s}}$$

2. **Most Economical Redesign for Same Area ($A = 6.0 \text{ m}^2$):**
   $$A = 2y^2 = 6.0 \implies y^2 = 3.0 \implies \mathbf{y = \sqrt{3} \approx 1.732 \text{ m}}$$
   $$B = 2y = 2 \times 1.732 = \mathbf{3.464 \text{ m}}$$
   $$R_2 = \frac{y}{2} = \frac{1.732}{2} = \mathbf{0.8660 \text{ m}}$$
   $$Q_2 = A C \sqrt{R_2 S_0} = 6.0 \times 55 \times \sqrt{0.8660 \times 0.001} = 330 \times 0.02943 = \mathbf{9.71 \text{ m}^3/\text{s}}$$
   Discharge increase:
   $$\Delta Q = 9.71 - 9.66 = \mathbf{0.05 \text{ m}^3/\text{s}} \quad (+0.52\%)$$

---

### Example 12.4: Most Economical Trapezoidal Section (Slide 14)
**Problem:** A trapezoidal channel has side slopes of $1\text{H} : 2\text{V}$ ($m = 0.5$) and bed slope $1/1500$. Area of section is $A = 40.0 \text{ m}^2$. Find the dimensions of the section if it is most economical. Determine the discharge if $C = 50$.

**Solution:**
For an economical trapezoidal section:
$$\frac{T}{2} = y\sqrt{1+m^2} \implies \frac{B + 2my}{2} = y\sqrt{1 + 0.5^2} = y\sqrt{1.25} = 1.118 y$$
$$B + y = 2.236 y \implies \mathbf{B = 1.236 y}$$
Flow Area:
$$A = (B + my)y = (1.236y + 0.5y)y = 1.736 y^2 = 40.0$$
$$y^2 = \frac{40.0}{1.736} = 23.04 \implies \mathbf{y = 4.80 \text{ m}}$$
$$B = 1.236 \times 4.80 = \mathbf{5.933 \text{ m}}$$
Hydraulic radius:
$$R = \frac{y}{2} = \frac{4.80}{2} = \mathbf{2.40 \text{ m}}$$
Discharge:
$$Q = A C \sqrt{R S_0} = 40.0 \times 50 \times \sqrt{2.40 \times \frac{1}{1500}} = 2000 \times \sqrt{0.0016} = 2000 \times 0.040 = \mathbf{80.0 \text{ m}^3/\text{s}}$$

---

### Example 12.5: Trapezoidal Canal with Minimum Concrete Lining (Slide 15)
**Problem:** A trapezoidal channel with side slopes $1 : 1$ ($m = 1$) has to be designed to convey $Q = 10.0 \text{ m}^3/\text{s}$ at velocity $V = 2.0 \text{ m/s}$ so that the amount of concrete lining for the bed and sides is minimum. Calculate the area of lining required per meter length of canal.

**Solution:**
For minimum lining, the section must be most economical:
1. Flow Area:
   $$A = \frac{Q}{V} = \frac{10.0}{2.0} = \mathbf{5.0 \text{ m}^2}$$
2. Economical conditions with $m = 1$:
   $$\frac{B + 2my}{2} = y\sqrt{1+m^2} \implies \frac{B + 2y}{2} = y\sqrt{2} = 1.4142 y$$
   $$B + 2y = 2.8284 y \implies B = 0.8284 y$$
   Flow Area:
   $$A = (B + my)y = (0.8284 y + y)y = 1.8284 y^2 = 5.0$$
   $$y^2 = \frac{5.0}{1.8284} = 2.7346 \implies \mathbf{y = 1.654 \text{ m}}$$
   $$B = 0.8284 \times 1.654 = \mathbf{1.370 \text{ m}}$$
3. Wetted perimeter (Lining area per meter length):
   $$P = B + 2y\sqrt{1+m^2} = 1.370 + 2(1.654)\sqrt{2} = 1.370 + 4.678 = \mathbf{6.048 \text{ m}}$$
   *Answer:* The required lining area is **$6.05 \text{ m}^2$ per meter length of canal**.

---

### Example 12.6: Economic Feasibility: Lined vs. Unlined Canal (Slide 16)
**Problem:** A trapezoidal channel has side slopes $1 : 1$ ($m = 1$), carrying $Q = 13.75 \text{ m}^3/\text{s}$ on a bed slope of $1/1000$. If unlined, $C = 44$. If lined with concrete, $C = 60$. The cost per $\text{m}^3$ of excavation is 4 times the cost of a $\text{m}^2$ of lining ($C_{exc} = 4 C_{line}$). Assuming most efficient sections, find whether the lined or unlined canal is cheaper.

**Solution:**
Let cost of lining per $\text{m}^2$ be $C_L$. Then cost of excavation per $\text{m}^3$ is $C_E = 4 C_L$.
For an economical trapezoidal channel with $m = 1$:
$A = 1.8284 y^2$, $P = 3.6568 y$, $R = y/2$.
Discharge:
$$Q = A C \sqrt{R S_0} \implies 13.75 = (1.8284 y^2) C \sqrt{\frac{y}{2000}} = \frac{1.8284 C}{44.721} y^{2.5} = 0.04088 C y^{2.5}$$

1. **Unlined Canal ($C = 44$):**
   $$13.75 = 0.04088 \times 44 \times y^{2.5} = 1.7989 y^{2.5} \implies y^{2.5} = 7.643 \implies \mathbf{y_u = 2.253 \text{ m}}$$
   - Excavation Volume per meter: $A_u = 1.8284(2.253)^2 = 9.281 \text{ m}^3/\text{m}$
   - Lining Cost: $0$
   - Total Cost per meter:
     $$\text{Cost}_u = A_u \times C_E = 9.281 \times (4 C_L) = \mathbf{37.12 C_L}$$

2. **Lined Canal ($C = 60$):**
   $$13.75 = 0.04088 \times 60 \times y^{2.5} = 2.453 y^{2.5} \implies y^{2.5} = 5.605 \implies \mathbf{y_l = 1.992 \text{ m}}$$
   - Excavation Volume per meter: $A_l = 1.8284(1.992)^2 = 7.255 \text{ m}^3/\text{m}$
   - Lining Area per meter: $P_l = 3.6568(1.992) = 7.284 \text{ m}^2/\text{m}$
   - Total Cost per meter:
     $$\text{Cost}_l = (A_l \times C_E) + (P_l \times C_L) = (7.255 \times 4 C_L) + 7.284 C_L = 29.02 C_L + 7.284 C_L = \mathbf{36.30 C_L}$$

3. **Comparison:**
   Since $\text{Cost}_{lined} (36.30 C_L) < \text{Cost}_{unlined} (37.12 C_L)$, **the lined canal is cheaper by 2.2%** due to the substantial reduction in required excavation volume!
   - Dimensions of Lined Canal: Depth $y = 1.99 \text{ m}$, Bed width $B = 0.8284(1.992) = \mathbf{1.65 \text{ m}}$.

<!--tab:Interactive Workbench-->
### Most Economical Section Optimizer
Interactively verify the half-depth hydraulic radius condition ($R = y/2$) and side-slope optimization ($60^\circ$):

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c12_1",
    "question": "For a most economical rectangular channel with flow area A = 32 m², calculate the bed width B in meters.",
    "answer": 8.0,
    "tol": 0.05,
    "unit": "m",
    "hint": "A = 2*y² => y = sqrt(32/2) = 4 m. B = 2*y = 8 m.",
    "solution": "y = sqrt(16) = 4.0 m. B = 2 * 4.0 = 8.0 m."
  },
  {
    "id": "c12_2",
    "question": "For an economical trapezoidal section with depth y = 3 m, what is the value of the hydraulic radius R in meters?",
    "answer": 1.5,
    "tol": 0.01,
    "unit": "m",
    "hint": "For all economical trapezoidal sections, R = y / 2.",
    "solution": "R = 3.0 / 2 = 1.5 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "For a given cross-sectional area and bed slope, why does the most economical section yield the maximum discharge?",
    "options": [
      "Because it maximizes the wetted perimeter",
      "Because it minimizes the wetted perimeter P, thereby maximizing the hydraulic radius R = A/P and reducing frictional resistance",
      "Because gravity increases at the center",
      "Because water becomes inviscid"
    ],
    "answer": 1,
    "explanation": "Discharge Q is proportional to R^(2/3). For a constant area A, maximizing R requires minimizing wetted perimeter P, which directly minimizes boundary frictional shear retarding the flow."
  },
  {
    "question": "What is the optimal side slope angle θ for the most economical of all trapezoidal channel sections?",
    "options": [
      "30°",
      "45°",
      "60° (half-hexagon, m = 1/√3)",
      "90° (rectangular)"
    ],
    "answer": 2,
    "explanation": "Differentiating wetted perimeter with respect to side slope m gives 3m² = 1, leading to m = 1/√3, which corresponds to an inclination angle of 60° to the horizontal, forming a regular half-hexagon."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Practical Compromise on Side Slopes:**
   While $\theta = 60^\circ$ ($m = 0.577$) is mathematically the most economical trapezoidal section, unlined earth canals in sandy or silty soils cannot sustain slopes steeper than the natural angle of repose ($\phi \approx 30^\circ - 33^\circ$, requiring $m \ge 1.5$ to $2.0$). Applying $m = 0.577$ in such soils would cause bank collapse.
"""

# =========================================================================
# S13: Directly from III_3 Circular Section Numericals & Normal Depth
# =========================================================================
s13 = r"""<!--tab:Theory & Derivations-->
> [!note] Circular Conduits Flowing Partially Full
> In sanitary sewers and storm culverts, circular pipes operate under gravity as open channels. Unlike rectangular and trapezoidal sections, as water depth approaches the pipe crown ($y \to D$), the top wetted perimeter increases rapidly while flow area gains diminish, causing both velocity and discharge to reach their peaks **before the pipe becomes completely full**!

## 1. Circular Section Geometry & Hydraulic Elements
For a circular conduit of diameter $D$ carrying water at depth $y$:
Let $2\theta$ be the angle subtended by the water surface at the pipe center in radians:
$$\cos\left(\frac{2\theta}{2}\right) = \cos \theta = \frac{r - y}{r} = 1 - \frac{2y}{D}$$
- Depth of flow:
  $$y = r(1 - \cos \theta) = \frac{D}{2}(1 - \cos \theta)$$
- Wetted Area $A$:
  $$A = r^2 \theta - \frac{1}{2}r^2 \sin(2\theta) = \frac{D^2}{4}\left(\theta - \frac{\sin 2\theta}{2}\right)$$
- Wetted Perimeter $P$:
  $$P = 2r \theta = D \theta$$
- Hydraulic Radius $R$:
  $$R = \frac{A}{P} = \frac{D}{4}\left(1 - \frac{\sin 2\theta}{2\theta}\right)$$

## 2. Conditions for Maximum Velocity and Maximum Discharge
1. **Condition for Maximum Velocity ($y = 0.81 D$):**
   By Chezy's formula ($V = C \sqrt{R S_0}$), velocity is maximum when hydraulic radius $R$ is maximum:
   $$\frac{dR}{d\theta} = 0 \implies 2\theta - \tan 2\theta = 0 \implies 2\theta = 257^\circ 30' \quad (\theta = 128^\circ 45')$$
   $$y_{max\_V} = \frac{D}{2}(1 - \cos 128^\circ 45') = \mathbf{0.81 D}$$
   $$V_{max} \approx 1.14 V_{full}$$
2. **Condition for Maximum Discharge ($y = 0.95 D$):**
   $$Q = A C \sqrt{R S_0} \implies \frac{dQ}{d\theta} = 0 \implies 2\theta = 308^\circ \quad (\theta = 154^\circ)$$
   $$y_{max\_Q} = \frac{D}{2}(1 - \cos 154^\circ) = \mathbf{0.95 D}$$
   $$Q_{max} \approx 1.08 Q_{full}$$

<!--tab:Worked Examples-->
### Example 13.1: Flow through a Circular Pipe (Slide 18)
**Problem:** Find the discharge through a circular pipe of diameter $D = 3.0 \text{ m}$ if the depth of water in the pipe is $y = 1.0 \text{ m}$ and the pipe is laid at a slope of $S_0 = 1 \text{ in } 1000$. Take Chezy's $C = 70$.

**Solution:**
1. **Angle Subtended $2\theta$:**
   $$\cos \theta = 1 - \frac{2y}{D} = 1 - \frac{2(1.0)}{3.0} = 1 - 0.6667 = 0.3333$$
   $$\theta = \cos^{-1}(0.3333) = 70.53^\circ = 70.53 \times \frac{\pi}{180} = \mathbf{1.231 \text{ radians}}$$
   $$2\theta = 2 \times 70.53^\circ = 141.06^\circ \implies \sin(2\theta) = \sin(141.06^\circ) = 0.6285$$

2. **Flow Area $A$:**
   $$A = \frac{D^2}{4}\left(\theta - \frac{\sin 2\theta}{2}\right) = \frac{3.0^2}{4}\left(1.231 - \frac{0.6285}{2}\right) = 2.25 \times (1.231 - 0.3143) = 2.25 \times 0.9167 = \mathbf{2.063 \text{ m}^2}$$

3. **Wetted Perimeter $P$ & Hydraulic Radius $R$:**
   $$P = D \theta = 3.0 \times 1.231 = \mathbf{3.693 \text{ m}}$$
   $$R = \frac{A}{P} = \frac{2.063}{3.693} = \mathbf{0.5586 \text{ m}}$$

4. **Discharge $Q$:**
   $$Q = A C \sqrt{R S_0} = 2.063 \times 70 \times \sqrt{0.5586 \times 0.001} = 144.41 \times \sqrt{0.0005586} = 144.41 \times 0.02363 = \mathbf{3.413 \text{ m}^3/\text{s}}$$

---

### Example 13.2: Circular Sewer at 0.9m Depth (Slide 19)
**Problem:** Calculate the quantity of water that will be discharged at a uniform depth of $y = 0.90 \text{ m}$ in a $D = 1.20 \text{ m}$ diameter pipe which is laid at a slope of $S_0 = 1 \text{ in } 1000$. Assume Chezy's $C = 58$.

**Solution:**
1. **Angle Subtended $2\theta$:**
   $$\cos \theta = 1 - \frac{2y}{D} = 1 - \frac{2(0.90)}{1.20} = 1 - 1.50 = -0.50$$
   $$\theta = \cos^{-1}(-0.50) = 120^\circ = 120 \times \frac{\pi}{180} = \mathbf{2.0944 \text{ radians}}$$
   $$2\theta = 240^\circ \implies \sin(2\theta) = \sin(240^\circ) = -0.8660$$

2. **Flow Area $A$:**
   $$A = \frac{D^2}{4}\left(\theta - \frac{\sin 2\theta}{2}\right) = \frac{1.20^2}{4}\left(2.0944 - \frac{-0.8660}{2}\right) = 0.36 \times (2.0944 + 0.4330) = 0.36 \times 2.5274 = \mathbf{0.9099 \text{ m}^2}$$

3. **Wetted Perimeter $P$ & Hydraulic Radius $R$:**
   $$P = D \theta = 1.20 \times 2.0944 = \mathbf{2.5133 \text{ m}}$$
   $$R = \frac{A}{P} = \frac{0.9099}{2.5133} = \mathbf{0.3620 \text{ m}}$$

4. **Discharge $Q$:**
   $$Q = A C \sqrt{R S_0} = 0.9099 \times 58 \times \sqrt{0.3620 \times 0.001} = 52.774 \times \sqrt{0.0003620} = 52.774 \times 0.01903 = \mathbf{1.004 \text{ m}^3/\text{s}}$$
   *Answer:* The discharge is **$1.004 \text{ m}^3/\text{s}$ (approx $1004 \text{ L/s}$)**.

<!--tab:Interactive Workbench-->
### Partially Full Circular Conduit Solver
Analyze depth ratios $y/D$, wetted angle $2\theta$, hydraulic radius $R$, and velocity/discharge ratios:

::widget[normaldepth]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c13_1",
    "question": "At what depth ratio y/D does a circular conduit achieve its maximum discharge capacity?",
    "answer": 0.95,
    "tol": 0.01,
    "unit": "",
    "hint": "Discharge is maximum when y = 0.95 D.",
    "solution": "y/D = 0.95."
  },
  {
    "id": "c13_2",
    "question": "At what depth ratio y/D does a circular conduit achieve its maximum flow velocity?",
    "answer": 0.81,
    "tol": 0.01,
    "unit": "",
    "hint": "Velocity is maximum when hydraulic radius R is maximum at y = 0.81 D.",
    "solution": "y/D = 0.81."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why does a circular sewer pipe carry more discharge at y = 0.95 D than when flowing completely full (y = 1.0 D)?",
    "options": [
      "Water density changes when exposed to air",
      "Between 0.95 D and 1.0 D, the wetted perimeter increases rapidly (adding high boundary wall friction) while flow area increases by only a negligible fraction",
      "Atmospheric pressure forces the water out faster",
      "Pipe roughness drops to zero"
    ],
    "answer": 1,
    "explanation": "As the water level reaches the pipe crown, the perimeter in contact with the pipe increases sharply without a commensurate increase in flow area, reducing hydraulic radius R and slowing velocity due to extra friction."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Self-Cleansing Velocity in Circular Sewers (CPHEEO Manual):**
   In municipal sanitary sewers, pipes must never be oversized so much that dry-weather flow drops below the **self-cleansing velocity of $0.60 \text{ to } 0.80 \text{ m/s}$**, otherwise heavy sewage grit deposits along the invert, decomposing and choking the line.
"""

# =========================================================================
# S14: Directly from III_4 - Specific Energy and Hyd. Jump.pptx
# =========================================================================
s14 = r"""<!--tab:Theory & Derivations-->
> [!note] Bakhmeteff's Specific Energy Concept
> Introduced by **Boris Bakhmeteff (1912)**, **Specific Energy ($E$)** is the total energy head of flowing water calculated relative to the channel bed as the datum:
> $$E = y + \frac{\alpha V^2}{2g} = y + \frac{\alpha Q^2}{2g A^2}$$
> Taking Coriolis coefficient $\alpha = 1.0$ for convenience:
> $$E = y + \frac{Q^2}{2g A^2}$$

## 1. The $E-y$ Specific Energy Curve
For a constant discharge $Q$, plotting Specific Energy $E$ as the abscissa and flow depth $y$ as the ordinate yields a unique two-branched curve:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 260" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Axes -->
    <line x1="80" y1="220" x2="680" y2="220" stroke="#4a5568" stroke-width="2"/>
    <line x1="80" y1="220" x2="80" y2="30" stroke="#4a5568" stroke-width="2"/>
    <text x="380" y="250" fill="#2d3748" font-size="12" font-weight="700" text-anchor="middle">Specific Energy E (m)</text>
    <text x="45" y="125" fill="#2d3748" font-size="12" font-weight="700" transform="rotate(-90 45 125)" text-anchor="middle">Depth y (m)</text>

    <!-- 45 degree line E = y -->
    <line x1="80" y1="220" x2="260" y2="40" stroke="#a0aec0" stroke-width="1.5" stroke-dasharray="4,4"/>
    <text x="270" y="45" fill="#718096" font-size="11">Potential Energy: E = y</text>

    <!-- Specific Energy Curve -->
    <path d="M 600,45 C 320,60 220,110 220,135 C 220,160 320,205 600,216" fill="none" stroke="#2b6cb0" stroke-width="3"/>

    <!-- Critical point E_min -->
    <circle cx="220" cy="135" r="5" fill="#e53e3e"/>
    <line x1="220" y1="135" x2="220" y2="220" stroke="#e53e3e" stroke-dasharray="3,3"/>
    <line x1="80" y1="135" x2="220" y2="135" stroke="#e53e3e" stroke-dasharray="3,3"/>
    <text x="220" y="235" fill="#e53e3e" font-size="11" font-weight="700" text-anchor="middle">E_min</text>
    <text x="65" y="138" fill="#e53e3e" font-size="11" font-weight="700" text-anchor="end">hc (Critical)</text>

    <!-- Regimes -->
    <text x="400" y="90" fill="#2b6cb0" font-size="12" font-weight="600">Sub-Critical / Tranquil / Streaming (y > hc, Fr < 1)</text>
    <text x="400" y="190" fill="#c53030" font-size="12" font-weight="600">Super-Critical / Shooting / Rapid (y < hc, Fr > 1)</text>
  </svg>
</div>

1. **Upper Branch (Potential Head Dominant):** As $y \to \infty$, velocity $V \to 0$, kinetic head vanishes, and the curve approaches the $45^\circ$ line $E = y$ asymptotically. Flow is **Sub-Critical (Tranquil / Streaming)**.
2. **Lower Branch (Kinetic Head Dominant):** As $y \to 0$, velocity $V \to \infty$, kinetic energy explodes, and the curve approaches the horizontal axis asymptotically. Flow is **Super-Critical (Shooting / Rapid)**.

## 2. Derivation of Critical Depth ($h_c$) & Critical Velocity ($V_c$)
The depth of flow of water at which the specific energy is minimum is called the **Critical Depth ($h_c$)**.
Differentiating $E$ with respect to $y$ at constant $Q$:
$$\frac{dE}{dy} = 1 - \frac{Q^2}{g A^3}\frac{dA}{dy} = 0$$
Since $\frac{dA}{dy} = T$ (top water surface width):
$$1 - \frac{Q^2 T}{g A^3} = 0 \iff \mathbf{\frac{Q^2 T_c}{g A_c^3} = 1 \iff \frac{V_c^2}{g D_c} = 1 \iff Fr_c = 1}$$
This is the **Universal Criterion for Critical Flow** in any channel!

### For Rectangular Channels:
Let $q = Q/B$ be the discharge per unit width: $A = B y$, $T = B$.
$$\frac{q^2 B^2 \cdot B}{g B^3 h_c^3} = 1 \implies \frac{q^2}{g h_c^3} = 1 \implies \mathbf{h_c = \left(\frac{q^2}{g}\right)^{1/3}}$$
Critical Velocity:
$$V_c = \frac{q}{h_c} = \frac{\sqrt{g h_c^3}}{h_c} = \mathbf{\sqrt{g h_c}}$$
Minimum Specific Energy in terms of Critical Depth:
$$E_{min} = h_c + \frac{V_c^2}{2g} = h_c + \frac{g h_c}{2g} = h_c + 0.5 h_c = \mathbf{\frac{3}{2} h_c = 1.5 h_c}$$

## 3. Alternate Depths
For any specific energy $E > E_{min}$, the horizontal line intersects the curve at two distinct depths:
- **$y_1 < h_c$:** Supercritical shooting depth ($Fr_1 > 1$).
- **$y_2 > h_c$:** Subcritical streaming depth ($Fr_2 < 1$).
These two depths possessing identical specific energy are called **Alternate Depths**.

<!--tab:Worked Examples-->
### Example 14.1: Critical Depth and Energy in a Rectangular Flume
**Problem:** A rectangular channel $3.0 \text{ m}$ wide carries a discharge of $Q = 9.0 \text{ m}^3/\text{s}$.
1. Compute the critical depth $h_c$, critical velocity $V_c$, and minimum specific energy $E_{min}$.
2. If the operating depth is $y = 1.8 \text{ m}$, calculate the Froude number and state the flow regime.
3. Find the alternate depth corresponding to $y = 1.8 \text{ m}$.

**Solution:**
1. **Critical Parameters:**
   Unit discharge:
   $$q = \frac{Q}{B} = \frac{9.0}{3.0} = \mathbf{3.0 \text{ m}^2/\text{s}}$$
   Critical depth:
   $$h_c = \left(\frac{q^2}{g}\right)^{1/3} = \left(\frac{3.0^2}{9.81}\right)^{1/3} = \left(\frac{9.0}{9.81}\right)^{1/3} = (0.9174)^{0.3333} = \mathbf{0.972 \text{ m}}$$
   Critical velocity:
   $$V_c = \sqrt{g h_c} = \sqrt{9.81 \times 0.972} = \sqrt{9.535} = \mathbf{3.088 \text{ m/s}}$$
   Minimum specific energy:
   $$E_{min} = 1.5 h_c = 1.5 \times 0.972 = \mathbf{1.458 \text{ m}}$$

2. **Operating Depth $y = 1.80 \text{ m}$:**
   $$V = \frac{q}{y} = \frac{3.0}{1.80} = 1.667 \text{ m/s}$$
   $$Fr = \frac{V}{\sqrt{g y}} = \frac{1.667}{\sqrt{9.81 \times 1.80}} = \frac{1.667}{4.202} = \mathbf{0.397}$$
   Since $Fr = 0.397 < 1.0$ (and $y = 1.80 > h_c = 0.972$), flow is **Sub-Critical (Tranquil / Streaming)**.
   Operating Specific Energy:
   $$E = y + \frac{V^2}{2g} = 1.80 + \frac{1.667^2}{19.62} = 1.80 + 0.1416 = \mathbf{1.9416 \text{ m}}$$

3. **Alternate Supercritical Depth ($y_1 < h_c$):**
   $$E = y_1 + \frac{q^2}{2g y_1^2} \implies 1.9416 = y_1 + \frac{3.0^2}{2(9.81)y_1^2} = y_1 + \frac{0.4587}{y_1^2}$$
   $$y_1^3 - 1.9416 y_1^2 + 0.4587 = 0$$
   Solving for the root $y_1 < 0.972 \text{ m}$ gives:
   $$\mathbf{y_1 = 0.548 \text{ m}}$$
   *Verification:* $V_1 = 3.0 / 0.548 = 5.474 \text{ m/s} \implies Fr_1 = 5.474 / \sqrt{9.81 \times 0.548} = 2.36 > 1$ (Supercritical).
   $E_1 = 0.548 + (5.474)^2 / 19.62 = 0.548 + 1.527 = 1.942 \text{ m} \approx E_2$.

<!--tab:Interactive Workbench-->
### Specific Energy & Alternate Depth Simulator
Trace the $E-y$ curve and locate alternate depths dynamically:

::widget[specificenergy]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c14_1",
    "question": "For a rectangular channel with unit discharge q = 2.5 m²/(s*m), compute critical depth hc in meters.",
    "answer": 0.86,
    "tol": 0.02,
    "unit": "m",
    "hint": "hc = (q² / g)^(1/3) = (6.25 / 9.81)^(1/3).",
    "solution": "hc = (0.6371)^(1/3) = 0.8605 m."
  },
  {
    "id": "c14_2",
    "question": "For critical depth hc = 1.2 m in a rectangular flume, calculate the minimum specific energy E_min in meters.",
    "answer": 1.8,
    "tol": 0.02,
    "unit": "m",
    "hint": "E_min = 1.5 * hc.",
    "solution": "E_min = 1.5 * 1.2 = 1.8 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "At critical depth in a rectangular open channel, what is the ratio of kinetic energy head to flow depth?",
    "options": [
      "V_c² / 2g = hc",
      "V_c² / 2g = hc / 2 = 0.5 hc",
      "V_c² / 2g = 2 hc",
      "V_c² / 2g = 0"
    ],
    "answer": 1,
    "explanation": "Since Fr = V_c / √ghc = 1, V_c² = g hc. Therefore, kinetic energy head is V_c² / 2g = (g hc) / 2g = hc / 2."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Critical Depth as a Flow Meter:**
   Because there is an exact one-to-one relationship between critical depth and discharge ($q = \sqrt{g h_c^3}$), hydraulic structures that force flow through critical depth (broad-crested weirs, Parshall flumes) allow discharge to be measured purely by reading a single water level gauge, without requiring velocity meters.
"""

# =========================================================================
# S16: Directly from III_4 & III_5 - Hydraulic Jump.pptx
# =========================================================================
s16 = r"""<!--tab:Theory & Derivations-->
> [!note] Physical Core Definition
> A **Hydraulic Jump** is the sudden rise of water level which takes place due to the transformation of **unstable shooting (super-critical) flow** to **stable streaming (sub-critical) flow**. It is a rapidly varied flow (RVF) phenomenon characterized by violent turbulent surface rollers and massive kinetic energy dissipation.

## 1. Assumptions in the Analysis of Hydraulic Jumps (Slide 13 PPT 4 & Slide 4 PPT 5)
In deriving the governing equations of a hydraulic jump, the following **three physical assumptions** are strictly made:
1. **Uniformity & Hydrostatic Pressure:** The flow is uniform and the pressure distribution is strictly **hydrostatic** immediately before and immediately after the jump.
2. **Negligible Surface Friction:** Losses due to friction on the surface of the bed of the channel over the short jump reach are very small and hence **neglected**.
3. **Small Channel Slope:** The slope of the bed of the channel is very small, so that the **component of the weight of fluid in the direction of flow is neglected**.

## 2. Forces Acting on the Control Volume (Slide 14 PPT 4 & Slide 5 PPT 5)
Consider a control volume of water between Section 1 (upstream supercritical shooting depth $y_1$) and Section 2 (downstream subcritical streaming depth $y_2$):
1. Upstream Hydrostatic Pressure Force:
   $$P_1 = \frac{1}{2}\gamma B y_1^2$$
2. Downstream Hydrostatic Pressure Force:
   $$P_2 = \frac{1}{2}\gamma B y_2^2$$
3. Frictional force on the channel floor is neglected ($F_f \approx 0$).

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Horizontal Bed -->
    <line x1="60" y1="180" x2="680" y2="180" stroke="#4a5568" stroke-width="4"/>
    <text x="370" y="205" fill="#4a5568" font-size="11" font-weight="700" text-anchor="middle">Horizontal Smooth Bed (Friction Neglected)</text>

    <!-- Water Profile of Hydraulic Jump -->
    <path d="M 60,150 L 220,150 Q 280,150 340,90 Q 400,60 500,60 L 680,60" fill="none" stroke="#2b6cb0" stroke-width="3"/>

    <!-- Upstream Supercritical Section 1 -->
    <line x1="160" y1="150" x2="160" y2="180" stroke="#e53e3e" stroke-width="2"/>
    <text x="145" y="168" fill="#e53e3e" font-size="12" font-weight="700">y₁</text>
    <text x="160" y="140" fill="#c53030" font-size="10" font-weight="700" text-anchor="middle">Shooting (Fr₁ > 1)</text>

    <!-- Downstream Subcritical Section 2 -->
    <line x1="580" y1="60" x2="580" y2="180" stroke="#2b6cb0" stroke-width="2"/>
    <text x="595" y="125" fill="#2b6cb0" font-size="12" font-weight="700">y₂</text>
    <text x="580" y="50" fill="#2b6cb0" font-size="10" font-weight="700" text-anchor="middle">Streaming (Fr₂ < 1)</text>

    <!-- Height of Jump hj = y2 - y1 -->
    <line x1="480" y1="150" x2="480" y2="60" stroke="#dd6b20" stroke-width="1.5" stroke-dasharray="3,3"/>
    <text x="490" y="105" fill="#dd6b20" font-size="11" font-weight="700">hj = y₂ - y₁</text>

    <!-- Pressure forces -->
    <line x1="90" y1="165" x2="140" y2="165" stroke="#e53e3e" stroke-width="2"/>
    <text x="115" y="160" fill="#e53e3e" font-size="11" font-weight="700">P₁</text>

    <line x1="650" y1="120" x2="600" y2="120" stroke="#2b6cb0" stroke-width="2"/>
    <text x="625" y="115" fill="#2b6cb0" font-size="11" font-weight="700">P₂</text>

    <!-- Roller vortex indication -->
    <ellipse cx="330" cy="115" rx="35" ry="18" fill="none" stroke="#63b3ed" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="330" y="118" fill="#3182ce" font-size="10" font-weight="600" text-anchor="middle">Turbulent Roller</text>
  </svg>
</div>

## 3. Derivation of Expression for Depth (Bélanger Equation)
Applying the Momentum Equation in the flow direction:
$$P_1 - P_2 = \text{Rate of change of momentum} = \rho Q (V_2 - V_1)$$
$$\frac{1}{2}\gamma B y_1^2 - \frac{1}{2}\gamma B y_2^2 = \rho Q (V_2 - V_1)$$
Substituting $Q = B q, V_1 = q/y_1, V_2 = q/y_2$, and $\gamma = \rho g$:
$$\frac{1}{2}\rho g B (y_1^2 - y_2^2) = \rho B q \left(\frac{q}{y_2} - \frac{q}{y_1}\right) = \rho B q^2 \left(\frac{y_1 - y_2}{y_1 y_2}\right)$$
Dividing by $\rho B$ and rearranging:
$$\frac{g}{2}(y_1 - y_2)(y_1 + y_2) = \frac{q^2 (y_1 - y_2)}{y_1 y_2}$$
Dividing both sides by $(y_1 - y_2) \ne 0$:
$$\frac{g}{2}(y_1 + y_2) = \frac{q^2}{y_1 y_2} \implies y_1 y_2 (y_1 + y_2) = \frac{2q^2}{g}$$
Multiplying by $1/y_1^3$:
$$\left(\frac{y_2}{y_1}\right)^2 + \left(\frac{y_2}{y_1}\right) - \frac{2q^2}{g y_1^3} = 0$$
Recognizing that $\frac{q^2}{g y_1^3} = \frac{V_1^2}{g y_1} = Fr_1^2$:
$$\left(\frac{y_2}{y_1}\right)^2 + \left(\frac{y_2}{y_1}\right) - 2 Fr_1^2 = 0$$
Solving this quadratic equation for the physically positive root yields the **Bélanger Equation**:
$$\mathbf{\frac{y_2}{y_1} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right)}$$
Conversely, to find initial depth $y_1$ from conjugate subcritical depth $y_2$:
$$\mathbf{\frac{y_1}{y_2} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_2^2} - 1\right)}$$

## 4. Expression for Loss of Energy ($\Delta E$)
The energy loss caused by turbulent shock dissipation across the jump is:
$$\Delta E = E_1 - E_2 = \left(y_1 + \frac{V_1^2}{2g}\right) - \left(y_2 + \frac{V_2^2}{2g}\right) = (y_1 - y_2) + \frac{q^2}{2g}\left(\frac{1}{y_1^2} - \frac{1}{y_2^2}\right)$$
Substituting $\frac{q^2}{g} = \frac{y_1 y_2 (y_1 + y_2)}{2}$:
$$\Delta E = (y_1 - y_2) + \frac{y_1 y_2 (y_1 + y_2)}{4}\left(\frac{y_2^2 - y_1^2}{y_1^2 y_2^2}\right) = (y_1 - y_2) + \frac{(y_1 + y_2)^2 (y_2 - y_1)}{4 y_1 y_2}$$
Factoring $(y_2 - y_1)$ yields the famous compact relation:
$$\mathbf{\Delta E = \frac{(y_2 - y_1)^3}{4 y_1 y_2}}$$

## 5. Height and Length of Hydraulic Jump (Slide 11 PPT 5)
1. **Height of Hydraulic Jump ($h_j$):**
   $$h_j = y_2 - y_1$$
2. **Length of Hydraulic Jump ($L_j$):**
   For a horizontal rectangular channel, experimental flume measurements demonstrate that the length of the hydraulic jump is **5 to 7 times the height of the jump**:
   $$\mathbf{L_j = 5 h_j \quad \text{to} \quad 7 h_j = (5 \text{ to } 7)(y_2 - y_1)}$$

<!--tab:Worked Examples-->
### Example 16.1: Hydraulic Jump in a Rectangular Channel (Slide 12 PPT 5)
**Problem:** The depth of flow of water at a certain section of a rectangular channel $4.0 \text{ m}$ wide is $y_1 = 0.50 \text{ m}$. The discharge through the channel is $Q = 16.0 \text{ m}^3/\text{s}$. If a hydraulic jump takes place on the downstream side, find the depth of flow after the jump ($y_2$).

**Solution:**
1. **Discharge per Unit Width $q$:**
   $$q = \frac{Q}{B} = \frac{16.0}{4.0} = \mathbf{4.0 \text{ m}^2/\text{s}}$$
2. **Initial Velocity and Froude Number:**
   $$V_1 = \frac{q}{y_1} = \frac{4.0}{0.50} = \mathbf{8.0 \text{ m/s}}$$
   $$Fr_1 = \frac{V_1}{\sqrt{g y_1}} = \frac{8.0}{\sqrt{9.81 \times 0.50}} = \frac{8.0}{\sqrt{4.905}} = \frac{8.0}{2.2147} = \mathbf{3.612}$$
   Since $Fr_1 = 3.612 > 1.0$, supercritical shooting flow exists.

3. **Depth of Flow After Jump ($y_2$):**
   $$y_2 = \frac{y_1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right) = \frac{0.50}{2}\left(\sqrt{1 + 8(3.612)^2} - 1\right)$$
   $$\sqrt{1 + 8(13.047)} = \sqrt{1 + 104.376} = \sqrt{105.376} = 10.265$$
   $$y_2 = 0.25 \times (10.265 - 1) = 0.25 \times 9.265 = \mathbf{2.316 \text{ m}}$$
   *Answer:* The depth of flow after the jump is **$y_2 = 2.32 \text{ m}$**.

---

### Example 16.2: Sluice Gate Outflow Jump & Head Loss (Slide 13 PPT 5)
**Problem:** A sluice gate discharges water into a horizontal rectangular channel with a velocity of $V_1 = 10.0 \text{ m/s}$ and depth of flow $y_1 = 1.0 \text{ m}$. Determine the depth of flow after the jump ($y_2$) and the consequent loss in total head ($\Delta E$).

**Solution:**
1. **Initial Froude Number $Fr_1$:**
   $$Fr_1 = \frac{V_1}{\sqrt{g y_1}} = \frac{10.0}{\sqrt{9.81 \times 1.0}} = \frac{10.0}{3.132} = \mathbf{3.193}$$

2. **Depth After Jump ($y_2$):**
   $$y_2 = \frac{y_1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right) = \frac{1.0}{2}\left(\sqrt{1 + 8(3.193)^2} - 1\right)$$
   $$\sqrt{1 + 8(10.195)} = \sqrt{1 + 81.56} = \sqrt{82.56} = 9.086$$
   $$y_2 = 0.5 \times (9.086 - 1) = 0.5 \times 8.086 = \mathbf{4.043 \text{ m}}$$

3. **Loss in Total Head ($\Delta E$):**
   $$\Delta E = \frac{(y_2 - y_1)^3}{4 y_1 y_2} = \frac{(4.043 - 1.0)^3}{4(1.0)(4.043)} = \frac{(3.043)^3}{16.172} = \frac{28.178}{16.172} = \mathbf{1.742 \text{ m}}$$
   *Answer:* The depth after the jump is **$4.04 \text{ m}$** and the energy head loss is **$1.74 \text{ m}$**.

<!--tab:Interactive Workbench-->
### Hydraulic Jump & Stilling Basin Simulator
Simulate conjugate depths, height of jump $h_j$, length $L_j = (5-7)h_j$, and power dissipation in real time:

::widget[hydraulicjump]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c16_1",
    "question": "For y1 = 0.5 m and y2 = 2.0 m in a rectangular channel, calculate the height of the jump hj in meters.",
    "answer": 1.5,
    "tol": 0.01,
    "unit": "m",
    "hint": "hj = y2 - y1 = 2.0 - 0.5.",
    "solution": "hj = 2.0 - 0.5 = 1.5 m."
  },
  {
    "id": "c16_2",
    "question": "For y1 = 0.5 m and y2 = 2.0 m, calculate the energy loss ΔE across the jump in meters.",
    "answer": 0.844,
    "tol": 0.02,
    "unit": "m",
    "hint": "ΔE = (y2 - y1)³ / (4 * y1 * y2) = (1.5)³ / (4 * 0.5 * 2.0).",
    "solution": "ΔE = 3.375 / 4.0 = 0.84375 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which of the following is NOT an assumption made in the derivation of the hydraulic jump Bélanger equation?",
    "options": [
      "Flow is uniform and pressure distribution is hydrostatic before and after the jump",
      "Losses due to friction on the channel bed over the jump length are neglected",
      "Energy loss across the jump is zero (E1 = E2)",
      "Channel bed slope is very small so fluid weight component down the slope is neglected"
    ],
    "answer": 2,
    "explanation": "Energy is NOT conserved across a hydraulic jump (E1 ≠ E2); extensive kinetic energy is dissipated by internal turbulent vortices, which is why the momentum equation must be used."
  },
  {
    "question": "What is the typical relationship between the length of a hydraulic jump Lj and the height of the jump hj for a rectangular channel?",
    "options": [
      "Lj = hj",
      "Lj = 2 to 3 hj",
      "Lj = 5 to 7 hj",
      "Lj = 20 hj"
    ],
    "answer": 2,
    "explanation": "Experimental flume measurements establish that the length of the turbulent roller and surface wave recovery is Lj = 5 to 7 times the height of the jump (hj = y2 - y1)."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Stilling Basin Length Sizing (IS: 4997):**
   In civil engineering design of spillway aprons and weir downstream aprons, if no appurtenances (chute blocks, baffle piers) are provided, the concrete apron length must equal the full jump length: $L_{apron} \approx 6 h_j = 6(y_2 - y_1)$. Installing chute blocks and baffle piers (USBR Type III) reduces this required length by over $55\%$ ($L_{basin} \approx 2.7 y_2$), saving substantial excavation and concrete costs.
"""

write_session("S10", s10)
write_session("S11", s11)
write_session("S12", s12)
write_session("S13", s13)
write_session("S14", s14)
write_session("S16", s16)
print("Updated Unit II sessions S10, S11, S12, S13, S14, S16 with exact content from the 5 PPTs!")
