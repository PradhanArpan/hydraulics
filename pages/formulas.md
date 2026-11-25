<!--tab:Unit I: Boundary Layer-->
# CE432P Master Hydraulic Formula Sheet & Exam Crunch
**Comprehensive reference for University Examinations (CIA & End-Sem), GATE, and ESE**

---

## Unit I: Boundary Layer Theory

### 1. Velocity Profiles & Boundary Layer Thicknesses
- **Nominal Boundary Layer Thickness ($\delta$):**
  $$u(y = \delta) = 0.99\,U_\infty$$
- **Displacement Thickness ($\delta^*$):**
  $$\delta^* = \int_0^\delta \left(1 - \frac{u}{U_\infty}\right) dy$$
  *Physical meaning: Distance the solid boundary must be displaced outward to account for mass flow reduction.*
- **Momentum Thickness ($\theta$):**
  $$\theta = \int_0^\delta \frac{u}{U_\infty}\left(1 - \frac{u}{U_\infty}\right) dy$$
  *Physical meaning: Equivalent thickness of free-stream fluid accounting for skin friction drag.*
- **Energy Thickness ($\delta^{**}$):**
  $$\delta^{**} = \int_0^\delta \frac{u}{U_\infty}\left(1 - \frac{u^2}{U_\infty^2}\right) dy$$
- **Shape Factor ($H$):**
  $$H = \frac{\delta^*}{\theta} \quad (\text{Laminar Blasius } H = 2.59; \quad \text{Turbulent } H \approx 1.286)$$

### 2. Standard Deficit Ratios for Common Velocity Profiles
| Profile $u/U_\infty$ | $\delta^* / \delta$ | $\theta / \delta$ | $\delta^{**} / \delta$ | Shape Factor $H$ |
| :--- | :---: | :---: | :---: | :---: |
| **Linear:** $y/\delta$ | $1/2 = 0.500$ | $1/6 = 0.167$ | $1/4 = 0.250$ | $3.00$ |
| **Parabolic:** $2(y/\delta) - (y/\delta)^2$ | $1/3 = 0.333$ | $2/15 = 0.133$ | $22/105 = 0.210$ | $2.50$ |
| **Sinusoidal:** $\sin(\frac{\pi y}{2\delta})$ | $1 - \frac{2}{\pi} = 0.363$ | $\frac{2}{\pi} - \frac{1}{2} = 0.137$ | $1 - \frac{4}{3\pi} = 0.576$ | $2.66$ |
| **Blasius (Exact Laminar):** | $1.72 / 5.0 = 0.344$ | $0.664 / 5.0 = 0.133$ | — | $2.59$ |
| **Turbulent ($1/7\text{th}$ Power Law):** | $1/8 = 0.125$ | $7/72 = 0.0972$ | $0.175$ | $1.286$ |

### 3. Von Kármán Momentum Integral Equation
$$\tau_0 = \rho U_\infty^2 \frac{d\theta}{dx}$$
- For zero pressure gradient ($dp/dx = 0$ over a flat plate).
- Total skin friction drag on one side of a plate of length $L$ and width $B$:
  $$F_D = \int_0^L \tau_0 B\,dx = \frac{1}{2} C_D \rho A U_\infty^2 \quad (A = B \cdot L)$$

### 4. Laminar vs Turbulent Flat Plate Formulas
| Parameter | Laminar Flow ($Re_x < 5 \times 10^5$) | Turbulent Flow ($Re_x > 5 \times 10^5$) |
| :--- | :---: | :---: |
| **Boundary Layer Thickness $\delta(x)$** | $\delta = \frac{5.0 x}{\sqrt{Re_x}}$ | $\delta = \frac{0.37 x}{Re_x^{0.2}}$ |
| **Local Skin Friction $c_f(x)$** | $c_f = \frac{0.664}{\sqrt{Re_x}}$ | $c_f = \frac{0.059}{Re_x^{0.2}}$ |
| **Total Drag Coefficient $C_D$** | $C_D = \frac{1.328}{\sqrt{Re_L}}$ | $C_D = \frac{0.074}{Re_L^{0.2}}$ |
| **Shear Stress $\tau_0(x)$ Dependency** | $\tau_0 \propto x^{-1/2}, \quad U_\infty^{1.5}$ | $\tau_0 \propto x^{-1/5}, \quad U_\infty^{1.8}$ |
| **Drag Force $F_D$ Dependency** | $F_D \propto L^{1/2}, \quad U_\infty^{1.5}$ | $F_D \propto L^{4/5}, \quad U_\infty^{1.8}$ |

### 5. Hydrodynamic Roughness (Nikuradse Scale)
- Shear velocity: $u^* = \sqrt{\tau_0 / \rho}$
- Viscous sublayer thickness: $\delta' = \frac{11.6\,\nu}{u^*}$
  - **Hydrodynamically Smooth:** $\frac{k_s}{\delta'} < 0.3 \quad \left(\text{or } \frac{u^* k_s}{\nu} < 5\right)$
  - **Transition Regime:** $0.3 \le \frac{k_s}{\delta'} \le 6.0 \quad \left(\text{or } 5 \le \frac{u^* k_s}{\nu} \le 70\right)$
  - **Hydrodynamically Rough:** $\frac{k_s}{\delta'} > 6.0 \quad \left(\text{or } \frac{u^* k_s}{\nu} > 70\right)$

---

<!--tab:Unit II: Open Channel Flow-->
## Unit II: Open Channel Flow

### 1. Geometric Elements
- Hydraulic Radius: $R = A / P$
- Hydraulic Depth: $D = A / T$
- Section Factor for Critical Flow: $Z = A \sqrt{D} = A \sqrt{A/T}$

### 2. Uniform Flow Equations
- **Chezy Formula:**
  $$V = C \sqrt{R S_0}, \quad Q = A C \sqrt{R S_0} \quad \left(C = \sqrt{\frac{8g}{f}} = \frac{1}{n} R^{1/6}\right)$$
- **Manning Formula (SI Units):**
  $$V = \frac{1}{n} R^{2/3} S_0^{1/2}, \quad Q = \frac{1}{n} A R^{2/3} S_0^{1/2} = K S_0^{1/2}$$
  where $K = \frac{1}{n} A R^{2/3}$ is channel **conveyance**.

### 3. Most Economical (Hydraulically Efficient) Sections
- **Rectangular Section:**
  $$b = 2y, \quad R = \frac{y}{2}, \quad A = 2y^2, \quad P = 4y$$
- **Trapezoidal Section (Half-Hexagon):**
  $$\text{Side slope } m = \frac{1}{\sqrt{3}} \quad (\theta = 60^\circ \text{ to horizontal})$$
  $$\text{Top width } T = 2 \times \text{Sloping side} = \frac{4}{\sqrt{3}}y$$
  $$\text{Hydraulic Radius: } R = \frac{y}{2}$$
  $$\text{Inscribed circle: } \text{A semicircle with radius } y \text{ touches all three sides!}$$
- **Triangular Section:**
  $$\text{Semi-vertex angle } \theta = 45^\circ \quad (m = 1.0), \quad R = \frac{y}{2\sqrt{2}}$$
- **Circular Conduit (Partially Full):**
  - Maximum Velocity occurs at depth: $y = 0.81\,D \quad (\theta = 257.5^\circ)$
  - Maximum Discharge occurs at depth: $y = 0.938\,D \quad (\theta = 308^\circ)$

### 4. Specific Energy & Critical Flow
- **Specific Energy:**
  $$E = y + \frac{V^2}{2g} = y + \frac{Q^2}{2g A^2}$$
- **Critical Flow Condition ($Fr = 1.0$):**
  $$\frac{Q^2 T}{g A^3} = 1.0 \implies \frac{V_c}{\sqrt{g D_c}} = 1.0$$
- **For Rectangular Channel of width $b$ ($q = Q/b$):**
  $$y_c = \sqrt[3]{\frac{q^2}{g}}, \quad V_c = \sqrt{g y_c}, \quad E_c = 1.5\,y_c, \quad q_{\max} = \sqrt{g} y_c^{3/2} = \sqrt{g} \left(\frac{2}{3}E\right)^{3/2}$$
- **Froude Number Regimes:**
  $$Fr = \frac{V}{\sqrt{gD}} \begin{cases} < 1.0 & \text{Subcritical / Tranquil flow (ripples travel upstream)} \\ = 1.0 & \text{Critical flow (ripples stand stationary)} \\ > 1.0 & \text{Supercritical / Rapid flow (ripples swept downstream)} \end{cases}$$

### 5. Channel Transitions & Choking Limits
- Flow over bed step $\Delta z$ (Rectangular channel):
  $$E_1 = E_2 + \Delta z \implies y_1 + \frac{q^2}{2gy_1^2} = y_2 + \frac{q^2}{2gy_2^2} + \Delta z$$
- **Maximum Step without Choking:**
  $$\Delta z_{\max} = E_1 - E_c = E_1 - 1.5\,y_c$$
  - Subcritical flow ($Fr_1 < 1$): Water surface **dips** over hump.
  - Supercritical flow ($Fr_1 > 1$): Water surface **rises** over hump.
  - If $\Delta z > \Delta z_{\max}$, flow is choked: upstream depth rises into a backwater curve.
- Flow through width contraction ($b_1 \to b_2$):
  $$b_{2,\min} = \frac{Q}{\sqrt{g}\,(2E_1 / 3)^{3/2}}$$

### 6. The Hydraulic Jump (Bélanger Equations)
- **Conjugate (Sequent) Depth Ratio:**
  $$\frac{y_2}{y_1} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right), \quad \frac{y_1}{y_2} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_2^2} - 1\right)$$
- **Energy Head Loss:**
  $$E_L = E_1 - E_2 = \frac{(y_2 - y_1)^3}{4 y_1 y_2}$$
- **Power Dissipated:**
  $$P_{\text{loss}} = \gamma Q E_L = \rho g Q \frac{(y_2 - y_1)^3}{4 y_1 y_2} \quad \text{[Watts]}$$
- **Jump Efficiency:** $\eta = E_2 / E_1$; **Relative Loss:** $E_L / E_1$
- **Jump Height:** $h_j = y_2 - y_1$; **Jump Length:** $L_j \approx 5 \text{ to } 7 (y_2 - y_1)$

### 7. Gradually Varied Flow (GVF) Dynamic Equation
$$\frac{dy}{dx} = \frac{S_0 - S_f}{1 - Fr^2} = \frac{S_0 - \frac{n^2 Q^2}{A^2 R^{4/3}}}{1 - \frac{Q^2 T}{g A^3}}$$
- Direct Step Method step length:
  $$\Delta x = \frac{E_2 - E_1}{S_0 - \bar{S}_f} \quad \text{where } \bar{S}_f = \frac{S_{f1} + S_{f2}}{2}$$

---

<!--tab:Unit III: Impact of Jets-->
## Unit III: Impact of Jets

### 1. Impulse-Momentum Principle
$$\sum \vec{F} = \rho Q (\vec{V}_{\text{out}} - \vec{V}_{\text{in}})$$

### 2. Stationary Vanes
- **Normal Flat Plate:**
  $$F_x = \rho a V^2$$
- **Inclined Flat Plate at Angle $\theta$ to Jet:**
  $$F_n = \rho a V^2 \sin\theta$$
  $$F_x = F_n \sin\theta = \rho a V^2 \sin^2\theta, \quad F_y = F_n \cos\theta = \rho a V^2 \sin\theta\cos\theta$$
  $$\text{Discharge Split: } Q_1 = \frac{Q}{2}(1 + \cos\theta), \quad Q_2 = \frac{Q}{2}(1 - \cos\theta)$$
- **Curved Vane (Deflection Angle $\theta$):**
  $$F_x = \rho a V^2 (1 + \cos\theta) \quad (\theta = 180^\circ \text{ hemispherical cup } \implies F_x = 2\rho a V^2)$$

### 3. Moving Vanes
| Target Type | Mass Striking $\dot{m}$ | Force $F_x$ | Work Done $W = F_x \cdot u$ | Maximum Efficiency $\eta_{\max}$ | Optimum Speed $u$ |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Single Moving Flat Plate** | $\rho a (V - u)$ | $\rho a (V - u)^2$ | $\rho a (V - u)^2 u$ | $\frac{8}{27} \approx 29.6\%$ | $u = V/3$ |
| **Single Moving Curved Cup** | $\rho a (V - u)$ | $\rho a (V - u)^2 (1 + \cos\theta)$ | $\rho a (V - u)^2 (1 + \cos\theta) u$ | $\frac{16}{27} \approx 59.3\%$ | $u = V/3$ |
| **Series of Flat Vanes on Wheel** | $\rho a V$ | $\rho a V (V - u)$ | $\rho a V (V - u) u$ | $50.0\%$ | $u = V/2$ |
| **Series of Curved Cups (Pelton)** | $\rho a V$ | $\rho a V (V - u) (1 + k\cos\phi)$ | $\rho a V (V - u) (1 + k\cos\phi) u$ | $\approx 100\% \text{ (ideal)}$ | $u = V/2$ |

### 4. Dynamic Velocity Triangles & Euler Equation
- Relative Velocity: $\vec{V} = \vec{u} + \vec{V}_r$
- Whirl Component: $V_w = V \cos\alpha$ (produces torque)
- Flow Component: $V_f = V \sin\alpha$ (carries mass)
- **Euler Turbine Equation:**
  $$\text{Torque: } T = \rho Q (V_{w1} r_1 \pm V_{w2} r_2)$$
  $$\text{Power: } P = T \omega = \rho Q (V_{w1} u_1 \pm V_{w2} u_2)$$
  $$\text{Euler Head: } H_e = \frac{V_{w1} u_1 \pm V_{w2} u_2}{g}$$

---

<!--tab:Unit IV: Turbines & Pumps-->
## Unit IV: Hydraulic Machines

### 1. Specific Speed ($N_s$) & Machine Selection
- **Turbine Specific Speed (Metric kW):**
  $$N_s = \frac{N \sqrt{P}}{H^{5/4}} \quad (N \text{ in RPM}, \, P \text{ in kW}, \, H \text{ in m})$$
  - Pelton Single Jet: $N_s = 10 - 35$ ($H > 250\text{ m}$)
  - Pelton Multi-Jet: $N_s = 35 - 60$ ($H: 150 - 300\text{ m}$)
  - Francis Reaction: $N_s = 60 - 300$ ($H: 30 - 300\text{ m}$)
  - Kaplan Propeller: $N_s = 300 - 1000$ ($H < 30\text{ m}$)
- **Pump Specific Speed (Metric $\text{m}^3/\text{s}$):**
  $$N_s = \frac{N \sqrt{Q}}{H_m^{3/4}}$$

### 2. Unit Quantities (Model Laws)
- Unit Speed: $N_u = \frac{N}{\sqrt{H}}$
- Unit Flow: $Q_u = \frac{Q}{\sqrt{H}}$
- Unit Power: $P_u = \frac{P}{H^{3/2}}$

### 3. Pelton Wheel Design Constants
- Theoretical Jet Velocity: $V_1 = C_v \sqrt{2gH} \quad (C_v \approx 0.98 - 0.99)$
- Peripheral Blade Velocity: $u = \phi \sqrt{2gH} \quad (\text{Speed ratio } \phi \approx 0.45 - 0.48)$
- Pitch Diameter: $D = \frac{60 u}{\pi N}$
- Jet Ratio: $m = \frac{D}{d} \approx 11 \text{ to } 14$
- Number of Buckets (Tygun Formula):
  $$Z = 15 + 0.5\,m = 15 + \frac{D}{2d}$$

### 4. Reaction Turbines & Draft Tube Theory
- Hydraulic Efficiency: $\eta_h = \frac{V_{w1} u_1}{g H}$ (for radial exit $V_{w2} = 0$)
- **Draft Tube Pressure Recovery:**
  $$\frac{p_2}{\gamma} = \frac{p_a}{\gamma} - h_s - \frac{V_2^2 - V_3^2}{2g} + h_f$$
  - Sub-atmospheric suction head increases effective head across runner.
  - Cavitation limit: $p_2/\gamma > -7.5\text{ to } -8.0\text{ m of water}$.

### 5. Centrifugal Pumps
- Manometric Head:
  $$H_m = \text{Total Static Lift } + \text{Pipe Losses} + \text{Exit Velocity Head} = \frac{p_d - p_s}{\gamma} + \frac{V_d^2 - V_s^2}{2g}$$
- Impeller Work Done per Unit Weight:
  $$W = \frac{u_2 V_{w2}}{g}$$
- Manometric Efficiency:
  $$\eta_m = \frac{g H_m}{u_2 V_{w2}} = \frac{g H_m}{u_2 (u_2 - V_{f2}\cot\beta_2)}$$
  - Backward curved vanes ($\beta_2 < 90^\circ$): Head drops with $Q$, preventing motor overload.
- Minimum Starting Speed:
  $$N_{\min} = \frac{120\,\eta_m\,u_2\,D_2}{\pi\,(D_2^2 - D_1^2)} = \frac{60}{\pi}\sqrt{\frac{2 g H_m}{D_2^2 - D_1^2}}$$
- Net Positive Suction Head:
  $$\text{NPSH}_{\text{avail}} = \frac{p_{\text{atm}}}{\gamma} - \frac{p_v}{\gamma} - h_s - h_{fs} > \text{NPSH}_{\text{req}}$$

### 6. Reciprocating Pumps
- Slip: $s = \frac{Q_{\text{theo}} - Q_{\text{act}}}{Q_{\text{theo}}} \times 100\%$
- Acceleration Head:
  $$h_a = \frac{l}{g}\frac{A}{a}\omega^2 r \cos\theta \quad (\text{Max at stroke start } \theta = 0^\circ)$$
- **Work Saved by Air Vessel:**
  - Single-acting pump: **$84.8\%$ friction work saved!**
  - Double-acting pump: **$39.2\%$ friction work saved!**

---

<!--tab:Unit V: CFD & River Modeling-->
## Unit V: Computational Hydraulics

### 1. 2D Shallow Water Equations (SWE) in Vector Form
$$\frac{\partial \mathbf{U}}{\partial t} + \frac{\partial \mathbf{F}(\mathbf{U})}{\partial x} + \frac{\partial \mathbf{G}(\mathbf{U})}{\partial y} = \mathbf{S}(\mathbf{U})$$
$$\mathbf{U} = \begin{pmatrix} h \\ uh \\ vh \end{pmatrix}, \quad \mathbf{F} = \begin{pmatrix} uh \\ u^2 h + \frac{1}{2}gh^2 \\ uvh \end{pmatrix}, \quad \mathbf{S} = \begin{pmatrix} 0 \\ gh(S_{0x} - S_{fx}) \\ gh(S_{0y} - S_{fy}) \end{pmatrix}$$

### 2. Numerical Stability & The CFL Condition
$$Cr = \frac{(|u| + \sqrt{gh})\,\Delta t}{\Delta x} \le Cr_{\max}$$
- Explicit Solvers: $Cr \le 1.0$
- Implicit Solvers (HEC-RAS 2D): $Cr \le 2.0 - 5.0$

### 3. Froehlich (2008) Dam Breach Equations
$$B_{\text{avg}} = 0.27\,K_0\,V_w^{0.32}\,h_b^{0.04} \quad (K_0 = 1.3 \text{ overtopping; } 1.0 \text{ piping})$$
$$t_f = 63.2\,\sqrt{\frac{V_w}{g h_b^2}} \quad \text{[seconds]}$$
- Hydrodynamic Hazard Rating:
  $$\text{Hazard Product} = y \times V \quad (\text{Extreme Danger if } y \times V > 1.5\text{ m}^2/\text{s})$$

### 4. Model Goodness-of-Fit Performance
- **Nash-Sutcliffe Efficiency (NSE):**
  $$\text{NSE} = 1 - \frac{\sum_{t=1}^N (O_t - S_t)^2}{\sum_{t=1}^N (O_t - \bar{O})^2} \quad (\text{Target } \text{NSE} > 0.75)$$
- **Root Mean Square Error (RMSE):**
  $$\text{RMSE} = \sqrt{\frac{1}{N}\sum_{t=1}^N (O_t - S_t)^2}$$

---

<!--tab:Interactive Calculators-->
## Instant Exam Calculators

### 1. Critical Depth & Minimum Energy (Rectangular Channel)
\`\`\`calc
name: Critical Depth yc
formula: pow((Q * Q) / (9.81 * b * b), 1/3)
inputs:
  - name: Q
    label: Channel discharge Q (m3/s)
    value: 15.0
    step: 1.0
  - name: b
    label: Bottom width b (m)
    value: 3.5
    step: 0.5
target: 1.233
unit: m
tolerance: 0.01
hint: "Compute yc = (Q^2 / (g * b^2))^(1/3)."
\`\`\`

### 2. Bélanger Sequent Depth Ratio
\`\`\`calc
name: Sequent Depth y2
formula: 0.5 * y1 * (sqrt(1 + 8 * Fr1 * Fr1) - 1)
inputs:
  - name: y1
    label: Initial depth y1 (m)
    value: 0.40
    step: 0.05
  - name: Fr1
    label: Inflow Froude number Fr1
    value: 4.5
    step: 0.5
target: 2.36
unit: m
tolerance: 0.05
hint: "Compute y2 = (y1/2) * (sqrt(1 + 8*Fr1^2) - 1)."
\`\`\`

### 3. Turbine Specific Speed
\`\`\`calc
name: Turbine Specific Speed Ns
formula: (N * sqrt(P)) / pow(H, 1.25)
inputs:
  - name: N
    label: Speed N (RPM)
    value: 500
    step: 25
  - name: P
    label: Shaft power P (kW)
    value: 4500
    step: 100
  - name: H
    label: Net head H (m)
    value: 240
    step: 10
target: 36.1
unit: "RPM (metric)"
tolerance: 0.5
hint: "Compute Ns = N * sqrt(P) / H^(5/4)."
\`\`\`

### 4. CFL Maximum Stable Time Step
\`\`\`calc
name: Max CFL Time Step
formula: dx / (u + sqrt(9.81 * y))
inputs:
  - name: dx
    label: Grid cell size dx (m)
    value: 10.0
    step: 2.0
  - name: u
    label: Velocity u (m/s)
    value: 3.2
    step: 0.2
  - name: y
    label: Depth y (m)
    value: 4.0
    step: 0.5
target: 1.057
unit: s
tolerance: 0.05
hint: "Compute dt_max = dx / (u + sqrt(g * y))."
\`\`\`
