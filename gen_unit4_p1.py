import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S28: Classification of Hydraulic Machines, Heads & Efficiencies
# =========================================================================
s28 = r"""<!--tab:Theory & Derivations-->
> [!note] The Hydro-Mechanical Energy Cascade
> Hydraulic turbines convert the potential and kinetic energy of water into shaft mechanical power to drive electrical generators. Understanding the energy loss breakdown—from gross reservoir head down to electrical terminal output—is essential for thermodynamic plant design.

## 1. Classification of Hydraulic Turbines

```
Hydraulic Turbines
 ├── Action Principle ────┬── Impulse Turbines (Pressure constant at 1 atm): Pelton, Turgo, Crossflow
 │                        └── Reaction Turbines (Pressure drops across runner): Francis, Kaplan, Propeller
 ├── Direction of Flow ───┬── Tangential Flow: Pelton wheel
 │                        ├── Mixed Inward Flow: Francis turbine
 │                        └── Axial Flow: Kaplan & Propeller turbines
 └── Head & Specific Speed ┬── High Head (> 250 m, Low N_s 10-35): Pelton wheel
                           ├── Medium Head (60-250 m, Med N_s 60-300): Francis turbine
                           └── Low Head (< 60 m, High N_s 300-1000): Kaplan turbine
```

## 2. Heads and Energy Conversion Definitions
1. **Gross Head ($H_g$):** Difference between headrace and tailrace water levels under zero flow.
2. **Net (Effective) Head ($H$):** Head available at turbine entrance:
   $$H = H_g - h_f = H_g - \frac{4 f L V^2}{2 g D}$$
3. **Hydraulic Power Supplied by Water:**
   $$P_{water} = \gamma Q H = \rho g Q H$$
4. **Runner (Rotor) Power ($P_{runner}$):** Work transferred to runner via Euler equation:
   $$P_{runner} = \rho Q [u_1 V_{w1} \pm u_2 V_{w2}]$$
5. **Shaft Power ($P_{shaft}$):** Useful brake power available at generator coupling:
   $$P_{shaft} = P_{runner} - P_{mechanical\_friction}$$

## 3. Four Interlinked Efficiencies
- **Hydraulic Efficiency ($\eta_h$):**
  $$\eta_h = \frac{P_{runner}}{P_{water}} = \frac{u_1 V_{w1} \pm u_2 V_{w2}}{g H}$$
- **Mechanical Efficiency ($\eta_m$):**
  $$\eta_m = \frac{P_{shaft}}{P_{runner}}$$
- **Volumetric Efficiency ($\eta_v$):** Ratio of water doing useful work to total water supplied:
  $$\eta_v = \frac{Q - \Delta Q_{leakage}}{Q}$$
- **Overall Plant Efficiency ($\eta_o$):**
  $$\eta_o = \frac{P_{shaft}}{P_{water}} = \eta_h \cdot \eta_m \cdot \eta_v$$

<!--tab:Worked Examples-->
### Example 28.1: Plant Energy Audit & Efficiency Cascade
**Problem:** A hydroelectric power station operates under a gross reservoir head of $H_g = 220 \text{ m}$. A penstock of length $L = 400 \text{ m}$ and diameter $D = 1.0 \text{ m}$ ($f = 0.0075$) conveys $Q = 2.4 \text{ m}^3/\text{s}$ to a Francis turbine.
The turbine runner power is measured at $4250 \text{ kW}$ and the shaft output is $4050 \text{ kW}$. Assuming volumetric efficiency $\eta_v = 0.98$:
1. Calculate penstock head loss $h_f$ and net operating head $H$.
2. Determine hydraulic power supplied $P_{water}$.
3. Calculate $\eta_h, \eta_m$, and overall efficiency $\eta_o$.

**Solution:**
1. **Penstock Velocity and Head Loss:**
   $$A = \frac{\pi}{4}(1.0)^2 = 0.7854 \text{ m}^2$$
   $$V = \frac{Q}{A} = \frac{2.4}{0.7854} = 3.056 \text{ m/s}$$
   $$h_f = \frac{4 f L V^2}{2 g D} = \frac{4 \times 0.0075 \times 400 \times (3.056)^2}{2 \times 9.81 \times 1.0} = \frac{12 \times 9.339}{19.62} = \frac{112.07}{19.62} = 5.71 \text{ m}$$
   Net Head:
   $$H = H_g - h_f = 220 - 5.71 = \mathbf{214.29 \text{ m}}$$

2. **Hydraulic Power Supplied:**
   $$P_{water} = \rho g Q H = 1000 \times 9.81 \times 2.4 \times 214.29 = 5,045,213 \text{ W} = \mathbf{5045.2 \text{ kW}}$$

3. **Efficiencies:**
   - Hydraulic Efficiency:
     $$\eta_h = \frac{P_{runner}}{P_{water} \times \eta_v} = \frac{4250}{5045.2 \times 0.98} = \frac{4250}{4944.3} = 0.8596 = \mathbf{85.96\%}$$
   - Mechanical Efficiency:
     $$\eta_m = \frac{P_{shaft}}{P_{runner}} = \frac{4050}{4250} = 0.9529 = \mathbf{95.29\%}$$
   - Overall Efficiency:
     $$\eta_o = \frac{P_{shaft}}{P_{water}} = \frac{4050}{5045.2} = 0.8027 = \mathbf{80.27\%}$$
     Verification: $\eta_h \cdot \eta_m \cdot \eta_v = 0.8596 \times 0.9529 \times 0.98 = 0.8027$.

<!--tab:Interactive Workbench-->
### Pelton & Turbine Performance Simulator
Examine the head cascade and compute turbine power output:

::widget[peltondesign]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c28_1",
    "question": "If P_shaft = 800 kW and P_water = 1000 kW, calculate the overall efficiency eta_o in percent.",
    "answer": 80.0,
    "tol": 0.5,
    "unit": "%",
    "hint": "eta_o = P_shaft / P_water * 100.",
    "solution": "eta_o = (800 / 1000) * 100 = 80.0%."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which of the following is an impulse turbine where the water pressure remains atmospheric throughout the runner?",
    "options": [
      "Francis turbine",
      "Kaplan turbine",
      "Pelton wheel",
      "Propeller turbine"
    ],
    "answer": 2,
    "explanation": "In a Pelton wheel, all available head is converted into kinetic energy at the nozzle, and the jet strikes buckets in open atmospheric air without pressure change across the runner."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Governing Response Time (IEEE Std 1207):**
   Hydropower governors must respond within $0.2 \text{ s}$ to load rejections. Rapid needle closure causes penstock water hammer pressure spikes ($\Delta P = \rho c \Delta V$). A jet deflector plate is mechanically triggered in $0.1 \text{ s}$ to deflect the jet away from the buckets while the spear needle closes slowly over $20-30 \text{ s}$.
"""

# =========================================================================
# S29: Pelton Wheel Working, Components & Velocity Diagrams
# =========================================================================
s29 = r"""<!--tab:Theory & Derivations-->
> [!note] Lester Pelton's Innovation (1880)
> Lester Pelton revolutionized waterwheels by replacing flat cups with **double-hemispherical split buckets**. The central splitter ridge divides the high-speed jet into two equal halves, which are deflected sideways by $165^\circ$, completely balancing axial thrust while recovering nearly all kinetic energy.

## 1. Primary Components of a Pelton Installation
1. **Spear (Needle) Valve & Nozzle:** Regulates water discharge without causing separation. Moving the needle forward throttles flow smoothly while preserving high jet velocity:
   $$V_1 = C_v \sqrt{2 g H} \quad (C_v \approx 0.98 - 0.99)$$
2. **Runner & Buckets:** Forged manganese bronze or stainless steel disc holding 18 to 26 double-cup buckets. A notch in the bucket lip prevents the incoming jet from hitting the bucket back prematurely.
3. **Jet Deflector Plate:** Intercepts the jet during sudden electrical load rejections, preventing catastrophic turbine overspeed (runaway speed $N_r \approx 1.8 N$).
4. **Braking Jet:** A small secondary nozzle directing a reverse jet against the bucket backs to bring the massive spinning runner to rest quickly during shutdown.

## 2. Velocity Triangles for a Pelton Bucket
At the pitch diameter circle $D$, bucket speed is $u = \frac{\pi D N}{60}$:

```
Inlet: (1D tangential alignment)
──► V_1 (Absolute jet velocity)
──► u   (Bucket pitch line speed)
──► V_r1 = V_1 - u (Relative entrance velocity)

Outlet: (Deflected through 180° - φ, typically φ ≈ 15°)
       ▲ V_r2 = k V_r1
      /
     / φ
    ◄───────── 
       u
Whirl velocity at outlet: V_w2 = V_r2 cos φ - u
```

Euler Head:
$$H_e = \frac{u [V_1 - u](1 + k \cos \phi)}{g}$$
Overall Hydraulic Efficiency:
$$\eta_h = \frac{2 u (V_1 - u)(1 + k \cos \phi)}{V_1^2}$$

<!--tab:Worked Examples-->
### Example 29.1: Pelton Wheel Velocity Triangle Analysis
**Problem:** A Pelton wheel operates under an effective net head of $H = 450 \text{ m}$ at $N = 500 \text{ rpm}$. The nozzle velocity coefficient is $C_v = 0.98$, bucket speed ratio is $k_u = 0.46$, bucket deflection angle is $165^\circ$ ($\phi = 15^\circ$), and blade friction reduces relative velocity by $10\%$ ($k = 0.90$). The nozzle discharges $Q = 0.80 \text{ m}^3/\text{s}$.
Calculate:
1. Jet velocity $V_1$ and runner pitch diameter $D$.
2. Relative velocity at entrance and exit.
3. Absolute velocity leaving the bucket $V_2$ and its direction $\beta$.
4. Hydraulic efficiency $\eta_h$ and power developed.

**Solution:**
1. **Velocities and Diameter:**
   $$V_1 = C_v \sqrt{2 g H} = 0.98 \sqrt{2 \times 9.81 \times 450} = 0.98 \sqrt{8829} = 0.98 \times 93.96 = 92.08 \text{ m/s}$$
   $$u = k_u \sqrt{2 g H} = 0.46 \times 93.96 = 43.22 \text{ m/s}$$
   $$u = \frac{\pi D N}{60} \implies D = \frac{60 u}{\pi N} = \frac{60 \times 43.22}{\pi \times 500} = \frac{2593.2}{1570.8} = \mathbf{1.651 \text{ m}}$$

2. **Relative Velocities:**
   $$V_{r1} = V_1 - u = 92.08 - 43.22 = 48.86 \text{ m/s}$$
   $$V_{r2} = k V_{r1} = 0.90 \times 48.86 = 43.97 \text{ m/s}$$

3. **Outlet Triangle:**
   Component of $V_{r2}$ along blade direction:
   $$V_{r2} \cos 15^\circ = 43.97 \times 0.9659 = 42.47 \text{ m/s}$$
   Whirl velocity at outlet:
   $$V_{w2} = V_{r2} \cos 15^\circ - u = 42.47 - 43.22 = -0.75 \text{ m/s} \quad (\text{acts in direction of } u)$$
   Vertical flow velocity:
   $$V_{f2} = V_{r2} \sin 15^\circ = 43.97 \times 0.2588 = 11.38 \text{ m/s}$$
   Absolute exit velocity:
   $$V_2 = \sqrt{V_{w2}^2 + V_{f2}^2} = \sqrt{(-0.75)^2 + 11.38^2} = \sqrt{0.56 + 129.5} = \mathbf{11.41 \text{ m/s}}$$

4. **Power and Hydraulic Efficiency:**
   Whirl change: $\Delta V_w = V_1 - u + V_{r2} \cos 15^\circ = 92.08 - (-0.75) ...$
   $$F_x = \rho Q [V_{w1} + V_{w2}] = 1000 \times 0.80 \times [92.08 + (-0.75)] = 800 \times 91.33 = 73,064 \text{ N}$$
   $$P = F_x \cdot u = 73,064 \times 43.22 = 3,157,826 \text{ W} = \mathbf{3157.8 \text{ kW}}$$
   Input Power:
   $$P_{in} = \rho g Q H = 1000 \times 9.81 \times 0.80 \times 450 = 3,531,600 \text{ W} = 3531.6 \text{ kW}$$
   $$\eta_h = \frac{3157.8}{3531.6} = 0.8942 = \mathbf{89.42\%}$$

<!--tab:Interactive Workbench-->
### Pelton Wheel Design Workbench
Design runner pitch diameter, bucket dimensions, and check efficiency:

::widget[peltondesign]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c29_1",
    "question": "For a net head H = 200 m with Cv = 0.98, calculate the theoretical jet velocity V1 in m/s.",
    "answer": 61.39,
    "tol": 0.3,
    "unit": "m/s",
    "hint": "V1 = 0.98 * sqrt(2 * 9.81 * 200).",
    "solution": "V1 = 0.98 * sqrt(3924) = 0.98 * 62.64 = 61.389 m/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the function of the notch on the outer rim of a Pelton wheel bucket?",
    "options": [
      "To reduce the weight of the bucket",
      "To allow the incoming jet to strike the preceding bucket without being cut off prematurely by the succeeding bucket",
      "To provide an exit for air entrainment",
      "To balance dynamic vibration"
    ],
    "answer": 1,
    "explanation": "The bucket notch allows the circular jet to enter cleanly without striking the back lip of the advancing bucket, preserving smooth perpendicular impingement on the splitter ridge."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Multi-Jet Configurations:**
   When high discharge is required under a moderate head, a single jet would require an impractically large diameter ($d > D/6$). Up to 6 nozzles spaced equally around the vertical runner periphery are used, multiplying power without increasing runner size.
"""

# =========================================================================
# S30: Pelton Runner Design: Speed Ratio, Jet Ratio & Multi-Jet Setup
# =========================================================================
s30 = r"""<!--tab:Theory & Derivations-->
> [!note] Standardized CAD Proportions
> Designing a commercial Pelton wheel runner involves determining five interconnected geometric parameters: runner diameter ($D$), jet diameter ($d$), number of buckets ($Z$), bucket proportions ($L, B, T$), and number of nozzles ($n_j$).

## 1. Governing Design Parameters & Ratios
1. **Speed Ratio ($k_u$ or $\phi$):**
   $$k_u = \frac{u}{\sqrt{2 g H}} \approx 0.44 \text{ to } 0.46 \quad (\text{Nominal practical value } 0.45)$$
2. **Jet Ratio ($m$):**
   $$m = \frac{D}{d} \quad (\text{Permissible range: } 10 \le m \le 16; \text{ standard design } m \approx 12)$$
   - If $m < 10$: Buckets are too crowded, leading to severe jet interference.
   - If $m > 16$: Wheel is oversized, increasing windage losses and capital cost.
3. **Number of Buckets (Tygun's Empirical Formula):**
   $$Z = 15 + \frac{D}{2 d} = 15 + 0.5 m$$
4. **Standard Bucket CAD Proportions (in terms of jet diameter $d$):**
   - Bucket Width ($B$): $3.0 d \text{ to } 4.0 d$ (typically $3.5 d$)
   - Bucket Length ($L$): $2.5 d \text{ to } 3.0 d$ (typically $2.8 d$)
   - Bucket Depth ($T$): $0.8 d \text{ to } 1.2 d$ (typically $0.95 d$)
   - Cutout Notch Width: $1.1 d \text{ to } 1.2 d$

## 2. Multi-Jet Design Mechanics
Total turbine discharge is divided equally across $n_j$ nozzles:
$$Q = n_j \cdot q_{jet} = n_j \cdot \frac{\pi}{4}d^2 V_1$$
Total shaft power:
$$P = \eta_o \cdot \rho g Q H$$

<!--tab:Worked Examples-->
### Example 30.1: Complete Design of a Multi-Jet Pelton Turbine
**Problem:** Design a Pelton wheel power plant to generate $12,000 \text{ kW}$ of shaft power under a net head of $H = 360 \text{ m}$ at a synchronous speed of $N = 600 \text{ rpm}$. The overall efficiency is $\eta_o = 88\%$, $C_v = 0.98$, speed ratio $k_u = 0.45$, and the jet ratio is selected as $m = 12$.
Determine:
1. Total discharge required $Q$.
2. Runner pitch circle diameter $D$.
3. Diameter of each jet $d$ and number of nozzles $n_j$ required.
4. Total number of buckets $Z$ and physical bucket dimensions ($L, B, T$).

**Solution:**
1. **Total Discharge:**
   $$P = \eta_o \rho g Q H \implies 12,000,000 = 0.88 \times 9810 \times Q \times 360 = 3,107,808 \times Q$$
   $$Q = \frac{12,000,000}{3,107,808} = \mathbf{3.861 \text{ m}^3/\text{s}}$$

2. **Runner Pitch Circle Diameter $D$:**
   $$V_1 = C_v \sqrt{2 g H} = 0.98 \sqrt{2 \times 9.81 \times 360} = 0.98 \times 84.04 = 82.36 \text{ m/s}$$
   $$u = k_u \sqrt{2 g H} = 0.45 \times 84.04 = 37.82 \text{ m/s}$$
   $$u = \frac{\pi D N}{60} \implies D = \frac{60 \times 37.82}{\pi \times 600} = \frac{2269.2}{1884.96} = \mathbf{1.204 \text{ m}} \approx 1.20 \text{ m}$$

3. **Jet Diameter and Number of Nozzles:**
   With jet ratio $m = 12$:
   $$d = \frac{D}{m} = \frac{1.204}{12} = 0.1003 \text{ m} \approx 100 \text{ mm}$$
   Discharge per nozzle:
   $$q_{jet} = \frac{\pi}{4}d^2 V_1 = \frac{\pi}{4}(0.1003)^2 \times 82.36 = 7.901 \times 10^{-3} \times 82.36 = 0.6507 \text{ m}^3/\text{s}$$
   Number of nozzles:
   $$n_j = \frac{Q}{q_{jet}} = \frac{3.861}{0.6507} = 5.93 \implies \mathbf{n_j = 6 \text{ nozzles}}$$
   Adjusted exact jet diameter for 6 nozzles:
   $$d_{exact} = \sqrt{\frac{4 \times (3.861 / 6)}{\pi \times 82.36}} = \sqrt{\frac{2.574}{258.74}} = \sqrt{0.009948} = 0.0997 \text{ m} = \mathbf{99.7 \text{ mm}}$$

4. **Buckets and Dimensions:**
   - Number of buckets: $Z = 15 + 0.5 m = 15 + 0.5(12) = 15 + 6 = \mathbf{21 \text{ buckets}}$.
   - Width: $B = 3.5 d = 3.5 \times 100 = \mathbf{350 \text{ mm}}$.
   - Length: $L = 2.8 d = 2.8 \times 100 = \mathbf{280 \text{ mm}}$.
   - Depth: $T = 0.95 d = 0.95 \times 100 = \mathbf{95 \text{ mm}}$.

<!--tab:Interactive Workbench-->
### Pelton Runner Parameter CAD Configurator
Adjust jet ratio, speed ratio, and nozzle count to verify Pelton proportions:

::widget[peltondesign]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c30_1",
    "question": "For a Pelton runner with jet ratio m = D/d = 14, calculate the number of buckets Z using Tygun's formula.",
    "answer": 22,
    "tol": 0,
    "unit": "",
    "hint": "Z = 15 + 0.5 * m.",
    "solution": "Z = 15 + 0.5 * 14 = 15 + 7 = 22."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the maximum number of nozzles on a vertical-shaft Pelton turbine typically limited to 6?",
    "options": [
      "The generator cannot support higher torque",
      "Additional nozzles cause overlapping jet spray interference and hydraulic discharge congestion inside the casing",
      "Water velocity drops too low",
      "Cavitation occurs at the nozzle tips"
    ],
    "answer": 1,
    "explanation": "Beyond 6 nozzles, the spent deflected water spray from one bucket violently interferes with the incoming jet of adjacent nozzles, degrading hydraulic performance."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Runner Fastening (Integral Casting vs Bolted):**
   In early Pelton turbines, individual buckets were bolted to the disc. Under cyclical fatigue ($> 10^8$ cycles/year), bolt shearing caused catastrophic failures. Modern Pelton runners are forged and CNC-milled as a single monobloc component out of 13Cr-4Ni stainless steel.
"""

# =========================================================================
# S31: Francis Turbine Working, Wicket Gates & Runner Velocity Triangles
# =========================================================================
s31 = r"""<!--tab:Theory & Derivations-->
> [!note] The Mixed-Flow Reaction Turbine
> Invented by **James B. Francis (1849)**, the Francis turbine is an inward mixed-flow reaction machine where water enters radially through a spiral scroll casing and guide vanes under pressure, turning into axial direction as it exits through the runner into a draft tube.

## 1. Components & Mechanics
1. **Spiral (Scroll) Casing:** Logarithmic cross-sectional area reduction maintains uniform radial velocity entering the runner around the entire $360^\circ$ perimeter.
2. **Stay Ring & Guide Vanes (Wicket Gates):** Aerodynamic pivoting vanes that accelerate flow and impart the exact whirl velocity $V_{w1}$ required by the Euler equation.
3. **Runner:** Curved complex 3D vanes where static pressure drops continuously ($P_1 > P_2$), converting pressure into kinetic torque.
4. **Draft Tube:** Diffuser pipe connecting the runner exit to the tailrace to recover discharge kinetic energy.

## 2. Velocity Triangles & Radial Exit Condition

```
Inlet Triangle:                           Outlet Triangle (Radial Discharge: β = 90°):
       ▲ V_1                                     ▲ V_2 = V_f2 (Axial/Radial)
      /|                                         |
  V_r1/| V_f1                                    | 
     / |                                         | V_r2
    /θ | α                                       | 
   ────┴─────►                                   |  φ
    u_1  V_w1                                 ───┴────►
                                               u_2
```

1. **Euler Head:**
   $$H_e = \frac{u_1 V_{w1} - u_2 V_{w2}}{g}$$
2. **Radial Exit Design Condition:**
   To minimize kinetic energy rejected into the tailrace, the runner is designed so that water leaves **strictly radially** (or axially):
   $$\beta = 90^\circ \implies V_{w2} = 0 \quad \text{and} \quad V_2 = V_{f2}$$
   Under this optimal condition:
   $$H_e = \frac{u_1 V_{w1}}{g} \implies \eta_h = \frac{u_1 V_{w1}}{g H}$$

<!--tab:Worked Examples-->
### Example 31.1: Francis Turbine Velocity Triangle Analysis
**Problem:** A Francis turbine operates under a net head of $H = 70 \text{ m}$ at $N = 600 \text{ rpm}$. The guide blade angle is $\alpha = 18^\circ$, runner outer diameter is $D_1 = 0.80 \text{ m}$, inner diameter is $D_2 = 0.40 \text{ m}$, and flow velocity remains constant at $V_{f1} = V_{f2} = 8.5 \text{ m/s}$. Water leaves the runner radially ($\beta = 90^\circ$).
Calculate:
1. Runner blade inlet angle $\theta$.
2. Runner blade outlet angle $\phi$.
3. Hydraulic efficiency $\eta_h$ and power developed for $Q = 1.5 \text{ m}^3/\text{s}$.

**Solution:**
1. **Inlet Velocities:**
   Peripheral speed at inlet:
   $$u_1 = \frac{\pi D_1 N}{60} = \frac{\pi \times 0.80 \times 600}{60} = 8.0 \pi = \mathbf{25.13 \text{ m/s}}$$
   From the inlet triangle:
   $$V_{w1} = \frac{V_{f1}}{\tan \alpha} = \frac{8.5}{\tan 18^\circ} = \frac{8.5}{0.3249} = \mathbf{26.16 \text{ m/s}}$$
   Vane inlet angle $\theta$:
   $$\tan \theta = \frac{V_{f1}}{V_{w1} - u_1} = \frac{8.5}{26.16 - 25.13} = \frac{8.5}{1.03} = 8.252 \implies \mathbf{\theta = 83.1^\circ}$$

2. **Outlet Velocities & Angle:**
   Peripheral speed at outlet:
   $$u_2 = \frac{\pi D_2 N}{60} = \frac{\pi \times 0.40 \times 600}{60} = 4.0 \pi = \mathbf{12.57 \text{ m/s}}$$
   Since discharge is radial ($\beta = 90^\circ, V_{w2} = 0$):
   $$\tan \phi = \frac{V_{f2}}{u_2} = \frac{8.5}{12.57} = 0.6762 \implies \mathbf{\phi = 34.1^\circ}$$

3. **Hydraulic Efficiency & Power:**
   $$H_e = \frac{u_1 V_{w1}}{g} = \frac{25.13 \times 26.16}{9.81} = \frac{657.4}{9.81} = \mathbf{67.01 \text{ m}}$$
   $$\eta_h = \frac{H_e}{H} = \frac{67.01}{70.0} = 0.9573 = \mathbf{95.73\%}$$
   Power:
   $$P = \rho Q g H_e = 1000 \times 1.5 \times 9.81 \times 67.01 = 986,050 \text{ W} = \mathbf{986.1 \text{ kW}}$$

<!--tab:Interactive Workbench-->
### Francis Turbine Velocity Triangle Simulator
Explore Francis runner angles and check radial exit conditions:

::widget[peltondesign]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c31_1",
    "question": "If u1 = 25 m/s, Vw1 = 28 m/s, and net head H = 75 m for a Francis turbine with radial discharge, compute eta_h in percent.",
    "answer": 95.14,
    "tol": 0.5,
    "unit": "%",
    "hint": "eta_h = (u1 * Vw1) / (g * H) * 100.",
    "solution": "eta_h = (25 * 28) / (9.81 * 75) * 100 = 700 / 735.75 * 100 = 95.14%."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the primary thermodynamic reason for designing reaction turbines with radial discharge (β = 90°)?",
    "options": [
      "To maximize whirl velocity at the outlet",
      "To reduce the swirl kinetic energy lost into the tailrace to zero (Vw2 = 0)",
      "To prevent cavitation in the scroll case",
      "To increase mechanical friction"
    ],
    "answer": 1,
    "explanation": "The exit kinetic energy loss is V2²/2g = (Vw2² + Vf2²)/2g. Setting Vw2 = 0 eliminates whirl kinetic energy loss, leaving only the minimum necessary axial discharge velocity Vf2."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Labyrinth Seals (IS: 12837):**
   Because pressure inside the runner exceeds tailrace pressure, water tends to leak between the rotating runner crown and stationary head cover. Precision multi-tooth stepped labyrinth seals restrict leakage loss to $< 1.5\%$ of plant discharge.
"""

# =========================================================================
# S32: Kaplan Turbine Working & Draft Tube Theory
# =========================================================================
s32 = r"""<!--tab:Theory & Derivations-->
> [!note] Viktor Kaplan's Variable-Pitch Propeller (1913)
> The **Kaplan turbine** is an axial-flow reaction machine designed for low heads ($2 \text{ to } 70 \text{ m}$) and large discharges. By automatically coordinating wicket gate opening with **runner blade pitch angle** (double regulation), the Kaplan turbine achieves a remarkably flat efficiency curve across $20\% \text{ to } 100\%$ load variations!

## 1. Draft Tube Theory & Pressure Recovery
Because Kaplan turbines operate under low heads with huge velocities exiting the runner ($V_2$), the kinetic energy rejected can exceed **$25\% \text{ to } 40\%$ of the total available head**! The **draft tube** is a diverging diffuser that connects the runner exit (section 1) to the tailrace (section 2):

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Runner Hub & Blades -->
    <rect x="330" y="20" width="80" height="30" fill="#4a5568" rx="4"/>
    <text x="370" y="40" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">Runner Exit (1)</text>

    <!-- Diverging Draft Tube -->
    <path d="M 330,50 L 220,180 L 520,180 L 410,50 Z" fill="#ebf8ff" stroke="#2b6cb0" stroke-width="2.5"/>

    <!-- Tailrace Water Line -->
    <line x1="120" y1="160" x2="620" y2="160" stroke="#3182ce" stroke-width="2" stroke-dasharray="6,3"/>
    <text x="180" y="152" fill="#2b6cb0" font-size="11" font-weight="700">Tailrace Level</text>

    <!-- Height Hs -->
    <line x1="280" y1="50" x2="280" y2="160" stroke="#e53e3e" stroke-width="1.5"/>
    <text x="270" y="110" fill="#e53e3e" font-size="12" font-weight="700" text-anchor="end">Suction Height H_s</text>

    <!-- Submergence y -->
    <line x1="280" y1="160" x2="280" y2="180" stroke="#4a5568" stroke-width="1.5"/>
    <text x="270" y="174" fill="#4a5568" font-size="10" text-anchor="end">Submergence y</text>
  </svg>
</div>

Applying Bernoulli's equation between runner exit (1) and draft tube discharge into tailrace (2):
$$\frac{P_1}{\gamma} + \frac{V_1^2}{2g} + H_s = \frac{P_{atm}}{\gamma} + \frac{V_2^2}{2g} + h_f$$
Solving for the pressure head at runner exit:
$$\frac{P_1}{\gamma} = \frac{P_{atm}}{\gamma} - H_s - \left(\frac{V_1^2 - V_2^2}{2g} - h_f\right)$$
**Two Critical Functions of the Draft Tube:**
1. **Permits Elevated Installation:** Allows the turbine to be set at height $H_s$ above the tailrace without sacrificing effective head.
2. **Kinetic Energy Recovery:** Converts exit kinetic head $\frac{V_1^2 - V_2^2}{2g}$ into useful suction pressure, increasing net head across the runner.

**Draft Tube Efficiency ($\eta_d$):**
$$\eta_d = \frac{\frac{V_1^2 - V_2^2}{2g} - h_f}{\frac{V_1^2}{2g}}$$

<!--tab:Worked Examples-->
### Example 32.1: Draft Tube Pressure & Efficiency Analysis
**Problem:** A Kaplan turbine draft tube has an inlet diameter of $D_1 = 2.5 \text{ m}$ and an exit diameter of $D_2 = 4.0 \text{ m}$. Discharge is $Q = 35 \text{ m}^3/\text{s}$. The runner inlet is set at $H_s = 2.8 \text{ m}$ above the tailrace. Penstock/tube friction loss is $h_f = 0.15 \left(\frac{V_1^2 - V_2^2}{2g}\right)$. Atmospheric pressure head is $\frac{P_{atm}}{\gamma} = 10.3 \text{ m}$.
Calculate:
1. Velocities $V_1$ and $V_2$.
2. Draft tube efficiency $\eta_d$.
3. Absolute pressure head and vacuum pressure head at runner exit.

**Solution:**
1. **Velocities:**
   $$A_1 = \frac{\pi}{4}(2.5)^2 = 4.9087 \text{ m}^2 \implies V_1 = \frac{35}{4.9087} = \mathbf{7.130 \text{ m/s}}$$
   $$\frac{V_1^2}{2g} = \frac{7.130^2}{19.62} = \mathbf{2.591 \text{ m}}$$
   $$A_2 = \frac{\pi}{4}(4.0)^2 = 12.566 \text{ m}^2 \implies V_2 = \frac{35}{12.566} = \mathbf{2.785 \text{ m/s}}$$
   $$\frac{V_2^2}{2g} = \frac{2.785^2}{19.62} = \mathbf{0.395 \text{ m}}$$

2. **Draft Tube Efficiency:**
   Theoretical kinetic recovery:
   $$\Delta h_v = \frac{V_1^2 - V_2^2}{2g} = 2.591 - 0.395 = 2.196 \text{ m}$$
   Actual recovery:
   $$\Delta h_{actual} = 2.196 - (0.15 \times 2.196) = 0.85 \times 2.196 = \mathbf{1.867 \text{ m}}$$
   $$\eta_d = \frac{1.867}{2.591} = 0.7206 = \mathbf{72.06\%}$$

3. **Pressure Head at Runner Exit:**
   $$\frac{P_1}{\gamma} = \frac{P_{atm}}{\gamma} - H_s - \Delta h_{actual} = 10.3 - 2.8 - 1.867 = 10.3 - 4.667 = \mathbf{5.633 \text{ m (absolute)}}$$
   Vacuum head:
   $$H_{vac} = 10.3 - 5.633 = \mathbf{4.667 \text{ m of water vacuum}}$$

<!--tab:Interactive Workbench-->
### Kaplan Performance & Draft Tube Simulator
Simulate draft tube diffusion, suction head, and cavitation limit:

::widget[peltondesign]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c32_1",
    "question": "If V1 = 6.0 m/s and V2 = 2.0 m/s with zero friction, calculate the kinetic head recovery in meters.",
    "answer": 1.631,
    "tol": 0.05,
    "unit": "m",
    "hint": "Recovery = (V1² - V2²) / (2*g) = (36 - 4) / 19.62.",
    "solution": "Recovery = 32 / 19.62 = 1.631 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the primary difference between a Propeller turbine and a Kaplan turbine?",
    "options": [
      "Propeller turbine has fixed runner blades, while Kaplan turbine has variable-pitch adjustable blades",
      "Propeller turbine is impulse, Kaplan is reaction",
      "Kaplan turbine has no draft tube",
      "Propeller turbine runs at lower speed"
    ],
    "answer": 0,
    "explanation": "A propeller turbine has fixed blades and drops sharply in efficiency at partial loads; a Kaplan turbine adjusts blade pitch continuously via internal hydraulic servomotors to maintain peak efficiency across wide flow variations."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Elbow Draft Tube Design (IS: 4410):**
   Straight conical draft tubes require immense vertical excavation. Most hydroelectric power plants utilize an **elbow-type draft tube** with an elliptical horizontal discharge section. The flare angle must not exceed $7^\circ \text{ to } 8^\circ$ to prevent boundary layer separation and violent draft-tube surging.
"""

write_session("S28", s28)
write_session("S29", s29)
write_session("S30", s30)
write_session("S31", s31)
write_session("S32", s32)
print("Part 1 (S28-S32) generated successfully!")
