import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S33: Specific Speed, Unit Quantities & Turbine Selection Nomograms
# =========================================================================
s33 = r"""<!--tab:Theory & Derivations-->
> [!note] Geometric & Kinematic Similarity
> To compare turbines of completely different physical sizes operating under vastly different heads, engineers utilize non-dimensional parameters and **Specific Speed ($N_s$)**. Specific speed is the single most important parameter determining which turbine type must be selected for a given site.

## 1. Unit Quantities (Performance under $H = 1 \text{ m}$)
For a given turbine runner of fixed diameter $D$:
1. **Unit Speed ($N_u$):**
   $$u \propto \sqrt{H} \implies \frac{\pi D N}{60} \propto \sqrt{H} \implies N_u = \frac{N}{\sqrt{H}}$$
2. **Unit Discharge ($Q_u$):**
   $$Q = A V \propto D^2 \sqrt{H} \implies Q_u = \frac{Q}{\sqrt{H}}$$
3. **Unit Power ($P_u$):**
   $$P = \rho g Q H \propto \sqrt{H} \cdot H \implies P_u = \frac{P}{H^{3/2}}$$

## 2. Derivation of Specific Speed of a Turbine ($N_s$)
Specific speed is defined as the speed of a geometrically similar model turbine that produces **$1 \text{ kW}$ of shaft power under a net head of $1 \text{ m}$**:
- From Unit Speed: $N \propto \frac{\sqrt{H}}{D} \implies D \propto \frac{\sqrt{H}}{N}$
- From Power: $P \propto D^2 H^{3/2}$
- Substituting $D$:
  $$P \propto \left(\frac{\sqrt{H}}{N}\right)^2 H^{3/2} = \frac{H^{5/2}}{N^2} \implies N^2 \propto \frac{H^{5/2}}{P} \implies N \propto \frac{H^{5/4}}{\sqrt{P}}$$
Setting $P = 1 \text{ kW}$ and $H = 1 \text{ m}$ yields the celebrated **Specific Speed Formula**:
$$N_s = \frac{N \sqrt{P}}{H^{5/4}} \quad \text{($P$ in kW, $H$ in m, $N$ in rpm)}$$

## 3. Turbine Selection Nomogram

| Turbine Type | Head Range ($H$, m) | Specific Speed ($N_s$, SI Units) | Flow Direction |
| :--- | :--- | :--- | :--- |
| **Pelton (Single Jet)** | $> 300 \text{ m}$ | $10 \le N_s \le 30$ | Tangential impulse |
| **Pelton (Multi-Jet)** | $150 - 400 \text{ m}$ | $30 \le N_s \le 65$ | Tangential impulse |
| **Francis (Slow)** | $100 - 300 \text{ m}$ | $60 \le N_s \le 120$ | Mixed inward |
| **Francis (Medium/Fast)**| $30 - 150 \text{ m}$ | $120 \le N_s \le 300$ | Mixed inward |
| **Kaplan / Propeller** | $3 - 50 \text{ m}$ | $300 \le N_s \le 1000$ | Axial reaction |

<!--tab:Worked Examples-->
### Example 33.1: Turbine Selection for a Hydroelectric Scheme
**Problem:** A proposed hydroelectric station has an available net head of $H = 160 \text{ m}$ and an estimated discharge of $Q = 22.0 \text{ m}^3/\text{s}$. The generator requires a synchronous speed of $N = 375 \text{ rpm}$ ($50 \text{ Hz}$, 16 poles). Assuming an overall efficiency of $\eta_o = 89\%$:
1. Calculate the total power potential.
2. Determine the specific speed $N_s$ if a single turbine is installed, and identify the required turbine type.
3. If two identical units are installed instead, calculate the revised specific speed per unit.

**Solution:**
1. **Total Power:**
   $$P = \eta_o \rho g Q H = 0.89 \times 9810 \times 22.0 \times 160 = 30,729,561 \text{ W} \approx \mathbf{30,730 \text{ kW} = 30.73 \text{ MW}}$$

2. **Single Unit Option ($P = 30,730 \text{ kW}$):**
   $$H^{5/4} = 160^{1.25} = (160^5)^{0.25} = 571.93$$
   $$N_s = \frac{N \sqrt{P}}{H^{5/4}} = \frac{375 \times \sqrt{30,730}}{571.93} = \frac{375 \times 175.30}{571.93} = \frac{65,737.5}{571.93} = \mathbf{114.9}$$
   *Decision:* Since $N_s = 114.9$ falls precisely within the range $60 \le N_s \le 300$, a **medium-head Francis turbine** is the optimal engineering choice!

3. **Two Units Option ($P_{unit} = 15,365 \text{ kW}$ each):**
   $$N_{s,unit} = \frac{375 \times \sqrt{15,365}}{571.93} = \frac{375 \times 123.95}{571.93} = \frac{46,483}{571.93} = \mathbf{81.3}$$
   *Decision:* Still a Francis turbine, but operating at a slower specific speed with higher peak efficiency and greater operational flexibility during low-flow seasons.

<!--tab:Interactive Workbench-->
### Turbine Selection & Specific Speed Workbench
Calculate unit quantities and identify optimal turbine types dynamically:

::widget[pumpcharacteristics]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c33_1",
    "question": "For N = 500 rpm, P = 4000 kW, and H = 100 m, calculate the specific speed Ns.",
    "answer": 100.0,
    "tol": 1.0,
    "unit": "",
    "hint": "H^(1.25) = 100^(1.25) = 316.23. Ns = 500 * sqrt(4000) / 316.23.",
    "solution": "Ns = 500 * 63.245 / 316.227 = 31622.7 / 316.227 = 100.0."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which turbine type is uniquely suited for heads below 20 meters with huge river discharge?",
    "options": [
      "Pelton wheel",
      "Francis turbine",
      "Kaplan turbine",
      "Turgo impulse turbine"
    ],
    "answer": 2,
    "explanation": "Kaplan turbines have large specific speeds (300 to 1000) with axial flow through broad adjustable blades, making them ideal for high-flow low-head run-of-the-river installations."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Muschel (Shell) Curves (IEC 60193):**
   Turbine manufacturers deliver performance hill charts (Muschel curves) plotting unit discharge $Q_{11}$ vs unit speed $n_{11}$ with iso-efficiency contours. These curves identify the operating zones to avoid cavitation and draft-tube vortex power swings.
"""

# =========================================================================
# S34: Centrifugal Pumps Operating Mechanics & Manometric Head
# =========================================================================
s34 = r"""<!--tab:Theory & Derivations-->
> [!note] Reversed Reaction Turbine Mechanics
> A **centrifugal pump** is a dynamic turbomachine that converts mechanical input torque into hydraulic pressure head through centrifugal acceleration in a rotating impeller, discharging into a spiral volute casing.

## 1. Impeller Blade Curvature: Why Backward-Curved?
Impeller vanes can be curved in three ways:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Case 1: Forward -->
    <g transform="translate(60, 20)">
      <circle cx="80" cy="80" r="60" fill="none" stroke="#a0aec0" stroke-width="2"/>
      <path d="M 80,40 C 95,45 110,65 115,80" fill="none" stroke="#e53e3e" stroke-width="3"/>
      <text x="80" y="165" fill="#c53030" font-size="11" font-weight="700" text-anchor="middle">Forward Curved (β₂ > 90°)</text>
      <text x="80" y="180" fill="#718096" font-size="10" text-anchor="middle">Unstable: Rising H-Q</text>
    </g>

    <!-- Case 2: Radial -->
    <g transform="translate(280, 20)">
      <circle cx="80" cy="80" r="60" fill="none" stroke="#a0aec0" stroke-width="2"/>
      <line x1="80" y1="40" x2="80" y2="80" stroke="#dd6b20" stroke-width="3"/>
      <text x="80" y="165" fill="#c05621" font-size="11" font-weight="700" text-anchor="middle">Radial Vanes (β₂ = 90°)</text>
      <text x="80" y="180" fill="#718096" font-size="10" text-anchor="middle">Constant Theoretical Head</text>
    </g>

    <!-- Case 3: Backward -->
    <g transform="translate(500, 20)">
      <circle cx="80" cy="80" r="60" fill="none" stroke="#a0aec0" stroke-width="2"/>
      <path d="M 80,40 C 65,45 50,65 45,80" fill="none" stroke="#38a169" stroke-width="3"/>
      <text x="80" y="165" fill="#22543d" font-size="11" font-weight="700" text-anchor="middle">Backward Curved (β₂ < 90°)</text>
      <text x="80" y="180" fill="#276749" font-size="10" font-weight="600" text-anchor="middle">STANDARD! Stable Self-Governing</text>
    </g>
  </svg>
</div>

Theoretical Euler head produced by pump:
$$H_e = \frac{u_2 V_{w2} - u_1 V_{w1}}{g}$$
Assuming radial entry at impeller eye ($\alpha_1 = 90^\circ \implies V_{w1} = 0$):
$$H_e = \frac{u_2 V_{w2}}{g} = \frac{u_2 (u_2 - V_{f2}\cot \beta_2)}{g} = \frac{u_2^2}{g} - \left(\frac{u_2 \cot \beta_2}{g \pi D_2 b_2}\right) Q$$
- **Backward-curved vanes ($\beta_2 < 90^\circ, \cot \beta_2 > 0$):** As discharge $Q$ increases, head decreases smoothly. The power curve flattens, **preventing motor overloading**! Hence, all water pumps use backward-curved vanes ($\beta_2 \approx 20^\circ - 30^\circ$).

## 2. Manometric Head ($H_m$) & Efficiencies
1. **Manometric Head ($H_m$):** Total effective head against which the pump works:
   $$H_m = h_s + h_d + h_{fs} + h_{fd} + \frac{V_d^2}{2g}$$
   where $h_s$ is suction lift, $h_d$ delivery lift, $h_{fs}, h_{fd}$ pipe friction losses.
2. **Manometric Efficiency ($\eta_{mano}$):**
   $$\eta_{mano} = \frac{H_m}{H_e} = \frac{g H_m}{u_2 V_{w2}}$$
3. **Overall Efficiency ($\eta_o$):**
   $$\eta_o = \frac{\rho g Q H_m}{P_{shaft}}$$

<!--tab:Worked Examples-->
### Example 34.1: Centrifugal Pump Head and Efficiency
**Problem:** A centrifugal pump impeller has an outer diameter of $D_2 = 400 \text{ mm}$, width $b_2 = 30 \text{ mm}$, and runs at $N = 1450 \text{ rpm}$. The impeller has backward-curved blades with exit angle $\beta_2 = 25^\circ$. Water enters radially, and flow velocity is constant at $V_{f2} = 3.0 \text{ m/s}$. The manometric head is measured as $H_m = 38 \text{ m}$.
Calculate:
1. Whirl velocity at outlet $V_{w2}$.
2. Theoretical Euler head $H_e$.
3. Manometric efficiency $\eta_{mano}$.
4. Pump discharge $Q$ and hydraulic power delivered to water.

**Solution:**
1. **Peripheral Speed and Whirl Velocity:**
   $$u_2 = \frac{\pi D_2 N}{60} = \frac{\pi \times 0.400 \times 1450}{60} = \frac{1822.1}{60} = \mathbf{30.37 \text{ m/s}}$$
   From the outlet velocity triangle:
   $$V_{w2} = u_2 - \frac{V_{f2}}{\tan \beta_2} = 30.37 - \frac{3.0}{\tan 25^\circ} = 30.37 - \frac{3.0}{0.4663} = 30.37 - 6.43 = \mathbf{23.94 \text{ m/s}}$$

2. **Euler Head:**
   $$H_e = \frac{u_2 V_{w2}}{g} = \frac{30.37 \times 23.94}{9.81} = \frac{727.06}{9.81} = \mathbf{74.11 \text{ m}}$$

3. **Manometric Efficiency:**
   $$\eta_{mano} = \frac{H_m}{H_e} = \frac{38.0}{74.11} = 0.5127 = \mathbf{51.27\%}$$

4. **Discharge & Water Power:**
   $$Q = \pi D_2 b_2 V_{f2} = \pi \times 0.400 \times 0.030 \times 3.0 = 0.1131 \text{ m}^3/\text{s} = \mathbf{113.1 \text{ L/s}}$$
   $$P_{water} = \rho g Q H_m = 1000 \times 9.81 \times 0.1131 \times 38 = \mathbf{42,160 \text{ W} = 42.16 \text{ kW}}$$

<!--tab:Interactive Workbench-->
### Centrifugal Pump Characteristics Simulator
Examine pump H-Q curves and determine operating efficiency:

::widget[pumpcharacteristics]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c34_1",
    "question": "For a pump with u2 = 30 m/s and Vw2 = 20 m/s, compute the theoretical Euler head He in meters.",
    "answer": 61.16,
    "tol": 0.5,
    "unit": "m",
    "hint": "He = (u2 * Vw2) / g = 600 / 9.81.",
    "solution": "He = 600 / 9.81 = 61.162 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why do centrifugal water pumps strictly use backward-curved vanes (β2 < 90°)?",
    "options": [
      "To maximize head at zero discharge",
      "They produce a declining H-Q curve that prevents motor overloading at high discharges and stabilizes operation",
      "They are cheaper to manufacture",
      "They do not require priming"
    ],
    "answer": 1,
    "explanation": "Backward-curved vanes provide a negative slope dH/dQ < 0, ensuring self-limiting power consumption and stable hydraulic operation without surging."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Volute Casing Design (IS: 5120):**
   The volute casing is a spiral with gradually increasing cross-sectional area proportional to circumferential angle $\theta$: $A(\theta) = A_0 \frac{\theta}{360^\circ}$. This maintains constant flow velocity around the impeller periphery, transforming $30-40\%$ of exit kinetic energy into static pressure.
"""

# =========================================================================
# S35: Minimum Starting Speed, Multistage Pumps & Affinity Laws
# =========================================================================
s35 = r"""<!--tab:Theory & Derivations-->
> [!note] Centrifugal Pressure Head & Delivery Threshold
> A centrifugal pump will not begin delivering water until the pressure head generated by the forced vortex of the spinning impeller overcomes the total manometric head. Furthermore, when extreme heads or huge discharges are needed, multiple impellers are connected in **series** or **parallel**.

## 1. Minimum Starting Speed ($N_{min}$)
The pressure head developed across an impeller of outer diameter $D_2$ and inner diameter $D_1$ rotating at angular speed $\omega$ with zero discharge (closed delivery valve) is:
$$\Delta H_{centrifugal} = \frac{u_2^2 - u_1^2}{2g}$$
For water to start flowing into the delivery pipe:
$$\frac{u_2^2 - u_1^2}{2g} \ge H_m$$
Substituting $u = \frac{\pi D N}{60}$:
$$\frac{\pi^2 N_{min}^2}{3600 \times 2g} (D_2^2 - D_1^2) = H_m \implies N_{min} = \frac{60 \sqrt{2g H_m}}{\pi \sqrt{D_2^2 - D_1^2}} \cdot \frac{1}{\sqrt{\eta_{mano}}}$$

## 2. Multistage Configurations
1. **Pumps in Series (High Head):**
   Impellers are mounted on a single common shaft; discharge from one impeller feeds into the suction eye of the next:
   $$H_{total} = n \cdot H_m, \quad Q_{total} = Q$$
2. **Pumps in Parallel (High Discharge):**
   Multiple pumps discharge into a common manifold header:
   $$Q_{total} = \sum Q_i, \quad H_{total} = H_m$$

## 3. Centrifugal Pump Affinity Laws
For geometrically similar pumps or variable speed operation:
$$\frac{Q_1}{Q_2} = \left(\frac{N_1}{N_2}\right)\left(\frac{D_1}{D_2}\right)^3, \quad \frac{H_1}{H_2} = \left(\frac{N_1}{N_2}\right)^2\left(\frac{D_1}{D_2}\right)^2, \quad \frac{P_1}{P_2} = \left(\frac{N_1}{N_2}\right)^3\left(\frac{D_1}{D_2}\right)^5$$

<!--tab:Worked Examples-->
### Example 35.1: Minimum Starting Speed Calculation
**Problem:** A centrifugal pump has an impeller with inner diameter $D_1 = 180 \text{ mm}$ and outer diameter $D_2 = 360 \text{ mm}$. The pump must lift water against a manometric head of $H_m = 25 \text{ m}$. Assuming manometric efficiency $\eta_{mano} = 75\%$, calculate the minimum speed $N_{min}$ required to start delivery.

**Solution:**
1. Manometric condition:
   $$\frac{u_2^2 - u_1^2}{2g} = H_m \implies u_2^2 - u_1^2 = 2 g H_m$$
   $$u_2^2 - u_1^2 = 2 \times 9.81 \times 25 = 490.5 \text{ m}^2/\text{s}^2$$
2. Expressing in terms of $N$:
   $$u_2 = \frac{\pi D_2 N}{60} = \frac{\pi \times 0.360 \times N}{60} = 0.01885 N$$
   $$u_1 = \frac{\pi D_1 N}{60} = \frac{\pi \times 0.180 \times N}{60} = 0.009425 N$$
   $$u_2^2 - u_1^2 = [(0.01885)^2 - (0.009425)^2] N^2 = [0.0003553 - 0.0000888] N^2 = 0.0002665 N^2$$
3. Solving for $N_{min}$:
   $$0.0002665 N_{min}^2 = 490.5 \implies N_{min}^2 = \frac{490.5}{0.0002665} = 1,840,525$$
   $$N_{min} = \sqrt{1,840,525} = \mathbf{1356.7 \text{ rpm}}$$
   Accounting for manometric efficiency ($1/\sqrt{0.75} \approx 1.155$):
   $$N_{min,actual} \approx \mathbf{1567 \text{ rpm}}$$

<!--tab:Interactive Workbench-->
### Multistage Pump & Affinity Laws Simulator
Simulate pump scaling and examine series vs parallel operating points:

::widget[pumpcharacteristics]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c35_1",
    "question": "A pump running at N1 = 1450 rpm delivers Q1 = 50 L/s. If speed is increased to N2 = 1740 rpm, what is the new discharge Q2 in L/s?",
    "answer": 60.0,
    "tol": 0.5,
    "unit": "L/s",
    "hint": "Q2 = Q1 * (N2 / N1) = 50 * (1740 / 1450).",
    "solution": "Q2 = 50 * 1.2 = 60.0 L/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "If the rotational speed of a centrifugal pump is doubled, the power required to drive the pump increases by a factor of:",
    "options": [
      "2×",
      "4×",
      "8×",
      "16×"
    ],
    "answer": 2,
    "explanation": "According to the pump affinity laws, power scales with the cube of speed: P2/P1 = (N2/N1)³ = 2³ = 8."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Pump Priming (IS: 9694):**
   Centrifugal pumps cannot pump air because the centrifugal head developed is proportional to fluid density: $\Delta P = \rho \frac{u_2^2 - u_1^2}{2}$. For air ($\rho \approx 1.2 \text{ kg/m}^3$), the pressure head is $1/800\text{th}$ of water—insufficient to suck water up the suction pipe. Pumps must be primed (casing completely filled with water) before starting.
"""

# =========================================================================
# S36: NPSH, Pump Cavitation, System Operating Point & Reciprocating Pumps
# =========================================================================
s36 = r"""<!--tab:Theory & Derivations-->
> [!note] Suction Limitations & Cavitation
> The maximum height to which a pump can lift water is strictly constrained by **atmospheric pressure** and liquid **vapor pressure**. If suction pressure drops too low, cavitation explodes inside the impeller eye, destroying efficiency and eroding metal vanes.

## 1. Net Positive Suction Head (NPSH)
**Available NPSH ($NPSH_{avail}$):** Head available above vapor pressure at the suction flange:
$$NPSH_{avail} = \frac{P_{atm}}{\rho g} - h_s - h_{fs} - \frac{P_v}{\rho g}$$
where $h_s$ is suction lift, $h_{fs}$ suction pipe friction head loss, and $P_v$ saturation vapor pressure.
**Required NPSH ($NPSH_{req}$):** Characteristic head drop inside the impeller eye specified by the manufacturer.
**Universal Cavitation Avoidance Criterion:**
$$NPSH_{avail} \ge NPSH_{req} + \text{Safety Margin } (0.5 \text{ to } 1.0 \text{ m})$$
Maximum permissible suction lift:
$$h_{s,max} = \frac{P_{atm} - P_v}{\rho g} - h_{fs} - NPSH_{req}$$

## 2. System Head Curve & Pump Operating Point
A piping system requires a head that increases quadratically with discharge due to pipe friction:
$$H_{system} = H_{static} + K Q^2 \quad \text{where } K = \frac{8 f L}{\pi^2 g D^5} + \sum \frac{K_m}{2g A^2}$$
The stable **operating point** $(Q_o, H_o)$ occurs at the intersection of the pump manufacturer characteristic curve $H_{pump}(Q)$ and the piping system curve $H_{system}(Q)$.

## 3. Reciprocating Pumps & Air Vessels
Positive displacement reciprocating pumps utilize a piston or plunger moving inside a cylinder. Because piston motion is simple harmonic ($v = \omega r \sin \theta$), the acceleration head is massive:
$$h_a = \frac{L}{g}\frac{A}{a}\omega^2 r \cos \theta$$
**Air Vessels:** Large cast iron chambers containing compressed air installed on suction and delivery pipes. They absorb fluid during peak acceleration and supply fluid during deceleration, converting fluctuating discharge into a **steady uniform stream**, reducing friction power loss by up to **$84.8\%$**!

<!--tab:Worked Examples-->
### Example 36.1: NPSH & Maximum Suction Lift
**Problem:** A centrifugal pump with $NPSH_{req} = 3.2 \text{ m}$ delivers water at $20^\circ\text{C}$ ($P_v = 2.34 \text{ kPa}$, vapor head $H_v = 0.24 \text{ m}$). Atmospheric pressure is $101.3 \text{ kPa}$ ($H_{atm} = 10.3 \text{ m}$). The suction pipe has friction loss $h_{fs} = 1.1 \text{ m}$.
1. Determine the maximum permissible suction lift $h_s$ to prevent cavitation with a $0.5 \text{ m}$ safety margin.
2. If the pump is relocated to a mountain site at $2000 \text{ m}$ elevation where $H_{atm} = 8.0 \text{ m}$, find the revised allowable suction lift.

**Solution:**
1. **At Sea Level ($H_{atm} = 10.3 \text{ m}$):**
   $$NPSH_{avail} \ge NPSH_{req} + \text{Margin} = 3.2 + 0.5 = 3.7 \text{ m}$$
   $$H_{atm} - h_s - h_{fs} - H_v \ge 3.7$$
   $$10.3 - h_s - 1.1 - 0.24 \ge 3.7 \implies 8.96 - h_s \ge 3.7$$
   $$h_{s,max} = 8.96 - 3.7 = \mathbf{5.26 \text{ m}}$$
   *Engineering Recommendation:* Install pump no more than $5.2 \text{ m}$ above the sump water level.

2. **At High Altitude ($2000 \text{ m}, H_{atm} = 8.0 \text{ m}$):**
   $$8.0 - h_s - 1.1 - 0.24 \ge 3.7 \implies 6.66 - h_s \ge 3.7$$
   $$h_{s,max} = 6.66 - 3.7 = \mathbf{2.96 \text{ m}}$$
   *Critical Takeaway:* The pump must be lowered by $2.3 \text{ m}$ to prevent catastrophic cavitation boiling at high altitudes!

<!--tab:Interactive Workbench-->
### Pump-System Curve & NPSH Simulator
Plot system head vs pump curve and verify NPSH margin:

::widget[pumpcharacteristics]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c36_1",
    "question": "If H_atm = 10.3 m, Hv = 0.3 m, hs = 4.0 m, and hfs = 1.2 m, calculate NPSH_avail in meters.",
    "answer": 4.8,
    "tol": 0.1,
    "unit": "m",
    "hint": "NPSH_avail = H_atm - hs - hfs - Hv = 10.3 - 4.0 - 1.2 - 0.3.",
    "solution": "NPSH_avail = 10.3 - 5.5 = 4.8 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What happens if a pump's available NPSH falls below the manufacturer's required NPSH (NPSH_avail < NPSH_req)?",
    "options": [
      "The motor runs faster",
      "Liquid vaporizes into bubbles at the impeller eye, which collapse violently causing acoustic noise, vibration, and severe pitting erosion",
      "Discharge increases exponentially",
      "The pipe burst pressure is exceeded"
    ],
    "answer": 1,
    "explanation": "When pressure drops below saturation vapor pressure, vapor bubbles form and implode against the metal blades at gigapascal pressures, causing cavitation pitting damage and total loss of head."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Foot Valve & Strainer Maintenance:**
   A foot valve (spring-loaded check valve) with an integrated wire mesh strainer must be fitted at the suction pipe bottom. The strainer prevents gravel from entering the impeller, while the check valve prevents back-drainage, keeping the pump primed indefinitely.
"""

write_session("S33", s33)
write_session("S34", s34)
write_session("S35", s35)
write_session("S36", s36)
print("Part 2 (S33-S36) generated successfully!")
