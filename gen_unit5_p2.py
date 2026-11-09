import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S42: HEC-RAS 2D: Shallow Water Equations vs Diffusion Wave Equations
# =========================================================================
s42 = r"""<!--tab:Theory & Derivations-->
> [!note] Equation Selection in 2D Hydrodynamic Modeling
> HEC-RAS 2D offers two distinct equation sets to solve 2D surface flow: the **Full Momentum Shallow Water Equations (SWE)** and the simplified **Diffusion Wave Equations (DWE)**. Choosing the wrong equation set can either waste weeks of computational time or produce dangerously inaccurate flood predictions.

## 1. Mathematical Breakdown of Terms in 2D Momentum
The full 2D momentum equation contains five distinct physical terms:
$$\underbrace{\frac{\partial \mathbf{V}}{\partial t}}_{\text{Local Acceleration}} + \underbrace{(\mathbf{V} \cdot \nabla)\mathbf{V}}_{\text{Convective Acceleration}} + \underbrace{g \nabla z_s}_{\text{Water Surface Slope}} + \underbrace{g \mathbf{S}_f}_{\text{Friction Slope}} - \underbrace{\nu_t \nabla^2 \mathbf{V}}_{\text{Turbulent Eddy Viscosity}} = 0$$

1. **Diffusion Wave Equation (DWE):**
   Assumes that inertial and turbulent acceleration terms are negligible compared to gravity and friction:
   $$\frac{\partial \mathbf{V}}{\partial t} \approx 0, \quad (\mathbf{V} \cdot \nabla)\mathbf{V} \approx 0, \quad \nu_t \nabla^2 \mathbf{V} \approx 0$$
   The momentum equation collapses to a simple balance between water surface slope and bed friction:
   $$\nabla z_s + \mathbf{S}_f = 0 \implies \mathbf{V} = \frac{R^{2/3}}{n \sqrt{|\nabla z_s|}} (-\nabla z_s)$$
   - *Advantages:* Highly stable, runs with large time steps ($CFL \le 2 - 5$), 10× faster execution.
   - *Limitations:* Cannot simulate wave reflections, hydraulic jumps, bridge contractions, or sharp dynamic wave fronts!

2. **Full Momentum Shallow Water Equations (SWE):**
   Retains all acceleration, pressure gradient, turbulence, and Coriolis terms.

## 2. When Does Diffusion Wave Fail?
Engineering criteria where **Full Momentum (SWE) is mandatory**:
- **Dam-Break & Levee Breaches:** Severe convective accelerations ($\partial V / \partial t \gg 1$).
- **Flow Around Sharp Structures:** Flow separating around bridge piers, sharp river bends, or abutments.
- **Wave Reflections & Tidal Dynamics:** Wave heaping, resonance, and super-elevation.
- **Transcritical Flows:** Any flow transitioning across critical depth ($Fr \approx 1$).

<!--tab:Worked Examples-->
### Example 42.1: Diagnosing DWE vs SWE Applicability
**Problem:** A flood wave surges down an urban concrete bypass channel ($n = 0.015, S_0 = 0.004$) following a flash flood. At a narrowing choke section, velocity increases from $V_1 = 2.0 \text{ m/s}$ to $V_2 = 5.5 \text{ m/s}$ over a distance of $\Delta x = 30 \text{ m}$ in a time span of $\Delta t = 20 \text{ s}$. Local water depth is $h = 2.5 \text{ m}$.
1. Evaluate the magnitude of local acceleration $\frac{\partial V}{\partial t}$ and convective acceleration $V \frac{\partial V}{\partial x}$.
2. Compare them against the water surface slope term $g S_0$.
3. Determine whether Diffusion Wave (DWE) is valid or if Full Momentum (SWE) is required.

**Solution:**
1. **Accelerations:**
   - Local Acceleration:
     $$\frac{\partial V}{\partial t} \approx \frac{\Delta V}{\Delta t} = \frac{5.5 - 2.0}{20} = \frac{3.5}{20} = \mathbf{0.175 \text{ m/s}^2}$$
   - Average velocity $\bar{V} = \frac{2.0 + 5.5}{2} = 3.75 \text{ m/s}$.
   - Convective Acceleration:
     $$V \frac{\partial V}{\partial x} \approx \bar{V} \frac{\Delta V}{\Delta x} = 3.75 \times \frac{5.5 - 2.0}{30} = 3.75 \times 0.1167 = \mathbf{0.4375 \text{ m/s}^2}$$
   - Total Inertial Force:
     $$a_{inertial} = 0.175 + 0.438 = \mathbf{0.6125 \text{ m/s}^2}$$

2. **Gravity Slope Term:**
   $$g S_0 = 9.81 \times 0.004 = \mathbf{0.03924 \text{ m/s}^2}$$

3. **Comparison & Engineering Decision:**
   $$\frac{\text{Inertial Acceleration}}{g S_0} = \frac{0.6125}{0.03924} = \mathbf{15.6}$$
   *Verdict:* Inertial acceleration is **15.6 times larger** than the slope gravity driving force!
   Neglecting inertia via Diffusion Wave would produce catastrophic errors (underpredicting water surface heaving and choke backing). **Full Momentum SWE is legally and hydraulically mandatory!**

<!--tab:Interactive Workbench-->
### SWE vs DWE Hydrodynamic Simulator
Compare velocity fields and water surface profiles under Full Momentum vs Diffusion Wave:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c42_1",
    "question": "If V1 = 2 m/s, V2 = 6 m/s over Δx = 40 m with V_avg = 4 m/s, calculate convective acceleration V*(∂V/∂x) in m/s².",
    "answer": 0.4,
    "tol": 0.02,
    "unit": "m/s²",
    "hint": "4 * (6 - 2) / 40.",
    "solution": "4 * 4 / 40 = 0.4 m/s²."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Under which hydraulic condition is the Diffusion Wave Equation (DWE) computationally justified?",
    "options": [
      "Dam-break shock wave",
      "Slowly rising, shallow flood waves on wide, mild-sloped river flood plains",
      "Supercritical flow over a spillway",
      "Hydraulic jump in a stilling basin"
    ],
    "answer": 1,
    "explanation": "On wide mild-sloped flood plains with gradual hydrographs, water surface slope balances friction closely, rendering inertia negligible and making DWE accurate and 10x faster."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **FEMA NFIP Regulatory Standards:**
   The Federal Emergency Management Agency (FEMA) mandates that 2D models for Base Flood Elevations (BFEs) in urban floodways involving bridge constrictions and road overtopping must use Full Momentum SWE. DWE is accepted only for unconfined flat overland sheet flow.
"""

# =========================================================================
# S43: 2D Dam-Break Modeling, Breach Dynamics & Flood Hazard Mapping
# =========================================================================
s43 = r"""<!--tab:Theory & Derivations-->
> [!note] Catastrophic Flood Hydraulics
> Dam-break modeling represents the most extreme scenario in hydraulic engineering: a reservoir of millions of cubic meters suddenly released into an downstream valley, generating a violent propagating hydrodynamic bore.

## 1. Breach Formation Mechanics (Froehlich Equations)
Earthen embankment dams fail predominantly via **overtopping erosion** or **internal piping**. Dr. David Froehlich (2008) derived empirical equations based on 74 historic dam failures:
1. **Average Breach Width ($\bar{B}_{avg}$ in meters):**
   $$\bar{B}_{avg} = 0.27 \cdot K_o \cdot V_w^{0.32} \cdot H_b^{0.04}$$
   where $K_o = 1.4$ for overtopping ($1.0$ for piping), $V_w$ is reservoir volume at failure ($\text{m}^3$), and $H_b$ is breach height ($\text{m}$).
2. **Breach Formation Time ($\tau_f$ in hours):**
   $$\tau_f = 63.2 \sqrt{\frac{V_w}{g H_b^2}} \quad \text{or} \quad \tau_f = 0.0179 \sqrt{\frac{V_w}{H_b^2}}$$

## 2. Flood Hazard Classification ($h \times v$)
Flood danger to human life and structures is governed not by depth alone, but by the hydrodynamic product of **depth ($h$) and velocity ($v$)**:

```
      ▲ Velocity v (m/s)
  4.0 ┤  Zone 4: Extreme Hazard (Structural Failure)
      │  [h·v > 1.5 m²/s]
  2.0 ┤  Zone 3: High Hazard (Adults Swept Away)
      │  [0.6 < h·v ≤ 1.5 m²/s]
  1.0 ┤  Zone 2: Moderate Hazard (Vehicles Float)
      │  [0.3 < h·v ≤ 0.6 m²/s]
  0.5 ┤  Zone 1: Low Hazard (Safe for Walking)
      └──────┬──────┬──────┬──────► Depth h (m)
            0.5    1.0    2.0
```

<!--tab:Worked Examples-->
### Example 43.1: Froehlich Breach Hydrograph & Hazard Rating
**Problem:** An earthen irrigation dam of height $H_b = 24 \text{ m}$ retains a reservoir storage volume $V_w = 1.8 \times 10^7 \text{ m}^3$ ($18 \text{ million m}^3$).
1. Estimate the average breach width $\bar{B}$ and formation time $\tau_f$ for an overtopping failure ($K_o = 1.4$).
2. At an urban community $12 \text{ km}$ downstream, 2D model simulation indicates peak flood depth $h = 2.4 \text{ m}$ and flow velocity $v = 1.8 \text{ m/s}$. Calculate the flood hazard index ($h \times v$) and determine the human life safety threat.

**Solution:**
1. **Froehlich Breach Geometry:**
   $$\bar{B} = 0.27 \times 1.4 \times (1.8 \times 10^7)^{0.32} \times (24)^{0.04}$$
   $$(1.8 \times 10^7)^{0.32} = 208.6$$
   $$(24)^{0.04} = 1.135$$
   $$\bar{B} = 0.378 \times 208.6 \times 1.135 = \mathbf{89.5 \text{ m}}$$
   Breach formation time:
   $$\tau_f = 0.0179 \sqrt{\frac{1.8 \times 10^7}{24^2}} = 0.0179 \sqrt{\frac{1.8 \times 10^7}{576}} = 0.0179 \sqrt{31,250} = 0.0179 \times 176.78 = \mathbf{3.16 \text{ hours}}$$

2. **Downstream Flood Hazard Index ($h \times v$):**
   $$HVI = h \times v = 2.4 \text{ m} \times 1.8 \text{ m/s} = \mathbf{4.32 \text{ m}^2/\text{s}}$$
   *Hazard Assessment:* Since $HVI = 4.32 \gg 1.5 \text{ m}^2/\text{s}$ and $h > 2.0 \text{ m}$, this location is in the **Extreme Hazard Zone (Zone 4)**. Standard brick/concrete residences will suffer structural collapse; immediate mandatory evacuation is required!

<!--tab:Interactive Workbench-->
### Dam-Break & Flood Hazard Simulator
Simulate breach propagation and evaluate flood hazard classification grids:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c43_1",
    "question": "For a flood wave of depth h = 1.5 m and velocity v = 2.0 m/s, calculate the hazard index h*v in m²/s.",
    "answer": 3.0,
    "tol": 0.05,
    "unit": "m²/s",
    "hint": "h * v = 1.5 * 2.0.",
    "solution": "h * v = 3.0 m²/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the primary physical reason an earthen dam breach hydrograph grows gradually over 1 to 4 hours rather than instantaneously releasing all water?",
    "options": [
      "Atmospheric pressure slows the water",
      "Breach expansion is governed by mechanical soil erosion rate (scour by high shear stress) of the earth embankment",
      "Reservoir water becomes turbulent",
      "Spillway gates open simultaneously"
    ],
    "answer": 1,
    "explanation": "Soil embankments fail progressively: overtopping water incises a small notch that deepens and widens as hydraulic shear stress erodes soil particles, taking several hours to reach full width."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Emergency Action Plans (EAP) / CWC Standards:**
   Dam safety guidelines by the Central Water Commission (CWC) mandate that all large dams maintain an updated Emergency Action Plan (EAP) featuring 2D flood inundation arrival time maps ($t_{arrival}$) to coordinate life-saving downstream evacuations.
"""

# =========================================================================
# S44: Multiphase Volume of Fluid (VOF) Method in SimFlow / OpenFOAM
# =========================================================================
s44 = r"""<!--tab:Theory & Derivations-->
> [!note] 3D Free Surface CFD for Spillways
> When flow features intense vertical acceleration, air entrainment, or complex 3D shock waves (such as ski-jump spillways, baffled drops, or morning-glory intakes), 2D shallow water assumptions fail completely. Engineers turn to full **3D Multiphase CFD using the Volume of Fluid (VOF) method** in OpenFOAM or SimFlow.

## 1. Volume of Fluid (VOF) Governing Principle
The VOF method (Hirt and Nichols, 1981) treats air and water as a single effective fluid possessing variable mixture density and viscosity across the computational mesh:
$$\rho_m = \alpha \rho_{water} + (1 - \alpha) \rho_{air}$$
$$\mu_m = \alpha \mu_{water} + (1 - \alpha) \mu_{air}$$
where $\alpha(x,y,z,t)$ is the **liquid volume fraction**:
- $\alpha = 1.0$: Cell is filled entirely with water.
- $\alpha = 0.0$: Cell is filled entirely with air.
- $0 < \alpha < 1.0$: Cell contains the **free liquid surface**!

The interface is tracked by solving the transport equation:
$$\frac{\partial \alpha}{\partial t} + \nabla \cdot (\alpha \mathbf{u}) + \nabla \cdot [\alpha (1 - \alpha) \mathbf{u}_r] = 0$$
where the third term is an artificial interface compression flux ensuring sharp air-water boundaries.

## 2. $k-\omega$ SST Turbulence Modeling
For high-speed spillway boundary layers, the **Shear Stress Transport ($k-\omega$ SST)** model combines Wilcox's $k-\omega$ formulation near solid walls with standard $k-\epsilon$ in the outer free stream, accurately capturing adverse pressure gradient separation without empirical wall functions.

<!--tab:Worked Examples-->
### Example 44.1: Spillway Crest Pressure & Cavitation Risk via 3D CFD
**Problem:** In an OpenFOAM / SimFlow 3D VOF simulation of an Ogee spillway crest, the cell values at the crest apex ($z = 120.0 \text{ m}$) reveal a liquid volume fraction $\alpha = 1.0$, water velocity magnitude $V = 16.5 \text{ m/s}$, and gauge pressure $P_g = -32.5 \text{ kPa}$ (sub-atmospheric depression). Water temperature is $25^\circ\text{C}$ ($P_v = 3.17 \text{ kPa}$, atmospheric pressure $P_{atm} = 101.3 \text{ kPa}$).
1. Calculate the absolute static pressure $P_{abs}$ at the crest.
2. Determine whether cavitation will occur at this operating head.
3. Compute the safety margin above saturation vapor pressure.

**Solution:**
1. **Absolute Pressure:**
   $$P_{abs} = P_{atm} + P_g = 101.3 + (-32.5) = \mathbf{68.8 \text{ kPa (absolute)}}$$

2. **Cavitation Assessment:**
   Cavitation criterion: $P_{abs} \le P_v$.
   Here $P_{abs} = 68.8 \text{ kPa} > P_v = 3.17 \text{ kPa}$.
   *Conclusion:* **No cavitation will occur** at this design operating condition!

3. **Safety Margin:**
   $$\Delta P_{margin} = P_{abs} - P_v = 68.8 - 3.17 = \mathbf{65.63 \text{ kPa}}$$
   Expressed in head of water:
   $$H_{margin} = \frac{\Delta P}{\rho g} = \frac{65,630}{9810} = \mathbf{6.69 \text{ m of water}}$$
   The crest design possesses an ample $6.69 \text{ m}$ safety cushion against vapor inception.

<!--tab:Interactive Workbench-->
### 3D VOF Multiphase Spillway Simulator
Examine phase fraction $\alpha$ interfaces and velocity profiles:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c44_1",
    "question": "If Patm = 101.3 kPa and gauge pressure Pg = -45.0 kPa, calculate the absolute pressure Pabs in kPa.",
    "answer": 56.3,
    "tol": 0.2,
    "unit": "kPa",
    "hint": "Pabs = Patm + Pg = 101.3 - 45.0.",
    "solution": "Pabs = 101.3 - 45.0 = 56.3 kPa."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the physical meaning of a volume fraction value α = 0.5 in a VOF multiphase CFD cell?",
    "options": [
      "The cell has 50% velocity",
      "The cell is located exactly on the air-water free surface interface",
      "Pressure is at half atmosphere",
      "Turbulent kinetic energy is zero"
    ],
    "answer": 1,
    "explanation": "In the Volume of Fluid (VOF) method, cells with 0 < α < 1 define the dynamic free surface interface between the liquid (α=1) and gas (α=0) phases."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Mesh Resolution at Spillway Lip ($y^+ < 1$):**
   When predicting cavitation on high-head spillways using $k-\omega$ SST turbulence, the first cell height adjacent to the concrete wall must be micro-refined to ensure non-dimensional wall distance $y^+ = \frac{y u_*}{\nu} < 1$, resolving the viscous sublayer without artificial wall functions.
"""

# =========================================================================
# S45: Model Verification, Calibration & Capstone Synthesis
# =========================================================================
s45 = r"""<!--tab:Theory & Derivations-->
> [!note] The Golden Rules of Hydrodynamic Modeling
> *"All models are wrong, but some are useful."* (George Box). A computational model is merely a numerical hypothesis until it undergoes rigorous **Verification** (checking that equations are solved correctly), **Calibration** (tuning parameters to match observed data), and **Validation** (confirming predictive accuracy against an independent storm event).

## 1. Statistical Goodness-of-Fit Performance Metrics
To quantitatively evaluate model accuracy between observed gauge values ($O_i$) and simulated model predictions ($S_i$):

1. **Root Mean Square Error (RMSE):**
   $$RMSE = \sqrt{\frac{1}{N}\sum_{i=1}^N (S_i - O_i)^2}$$
2. **Nash-Sutcliffe Efficiency (NSE):**
   $$NSE = 1 - \frac{\sum_{i=1}^N (O_i - S_i)^2}{\sum_{i=1}^N (O_i - \bar{O})^2} \quad (-\infty < NSE \le 1.0)$$
   - $NSE = 1.0$: Perfect model fit!
   - $NSE > 0.75$: Excellent hydraulic performance.
   - $NSE = 0.0$: Model predicts no better than the simple mean of observed data.
   - $NSE < 0.0$: Mean observed value is a better predictor than the model!
3. **Percent Bias (PBIAS):**
   $$PBIAS = \left[\frac{\sum_{i=1}^N (O_i - S_i)}{\sum_{i=1}^N O_i}\right] \times 100\%$$
   Measures average tendency of simulated values to be larger or smaller than observations (optimal $PBIAS = 0\%$; low bias $|\text{PBIAS}| < 10\%$).

## 2. Capstone Synthesis: The Complete Hydraulic Journey
Congratulations on mastering the 5 core pillars of Advanced Hydraulics & Hydraulic Machinery:
- **Unit I:** Boundary Layer Theory & Viscous Shear Flows
- **Unit II:** Open Channel Flow, Specific Energy & Hydraulic Jump
- **Unit III:** Impact of Free Jets & Hydraulic Propulsion
- **Unit IV:** Hydraulic Turbines & Centrifugal Pumps
- **Unit V:** Computational Fluid Dynamics (CFD) & 2D Hydrodynamic Modeling

<!--tab:Worked Examples-->
### Example 45.1: Model Calibration Audit & NSE Evaluation
**Problem:** A 2D HEC-RAS river model is calibrated against observed flood stage records across 5 hourly monitoring timestamps during peak flood:

| Time ($t$) | Observed Stage $O_i$ (m) | Simulated Stage $S_i$ (m) |
| :--- | :--- | :--- |
| **Hour 1** | $102.0$ | $102.1$ |
| **Hour 2** | $103.5$ | $103.4$ |
| **Hour 3** | $105.0$ | $105.2$ |
| **Hour 4** | $104.0$ | $103.9$ |
| **Hour 5** | $102.5$ | $102.4$ |

Calculate:
1. Mean observed stage $\bar{O}$.
2. Root Mean Square Error (RMSE).
3. Nash-Sutcliffe Efficiency (NSE) and evaluate performance quality.

**Solution:**
1. **Mean Observed Stage:**
   $$\bar{O} = \frac{102.0 + 103.5 + 105.0 + 104.0 + 102.5}{5} = \frac{517.0}{5} = \mathbf{103.40 \text{ m}}$$

2. **Residual Computations:**
   - Hour 1: $O_1 - S_1 = -0.1 \implies (O_1 - S_1)^2 = 0.01$; $(O_1 - \bar{O})^2 = (102.0 - 103.4)^2 = 1.96$
   - Hour 2: $O_2 - S_2 = +0.1 \implies (O_2 - S_2)^2 = 0.01$; $(O_2 - \bar{O})^2 = (103.5 - 103.4)^2 = 0.01$
   - Hour 3: $O_3 - S_3 = -0.2 \implies (O_3 - S_3)^2 = 0.04$; $(O_3 - \bar{O})^2 = (105.0 - 103.4)^2 = 2.56$
   - Hour 4: $O_4 - S_4 = +0.1 \implies (O_4 - S_4)^2 = 0.01$; $(O_4 - \bar{O})^2 = (104.0 - 103.4)^2 = 0.36$
   - Hour 5: $O_5 - S_5 = +0.1 \implies (O_5 - S_5)^2 = 0.01$; $(O_5 - \bar{O})^2 = (102.5 - 103.4)^2 = 0.81$

   Sum of squared model errors: $\sum (O_i - S_i)^2 = 0.01 + 0.01 + 0.04 + 0.01 + 0.01 = \mathbf{0.08 \text{ m}^2}$.
   Sum of squared observation variance: $\sum (O_i - \bar{O})^2 = 1.96 + 0.01 + 2.56 + 0.36 + 0.81 = \mathbf{5.70 \text{ m}^2}$.

3. **Statistical Metrics:**
   $$RMSE = \sqrt{\frac{0.08}{5}} = \sqrt{0.016} = \mathbf{0.1265 \text{ m} = 12.65 \text{ cm}}$$
   $$NSE = 1 - \frac{\sum (O_i - S_i)^2}{\sum (O_i - \bar{O})^2} = 1 - \frac{0.08}{5.70} = 1 - 0.0140 = \mathbf{0.986}$$
   *Evaluation:* An $NSE$ of $0.986$ ($> 0.90$) indicates **outstanding predictive capability**, meeting the most stringent international standards for flood insurance and dam safety!

<!--tab:Interactive Workbench-->
### Complete Hydrodynamic Synthesis Workbench
Explore full model calibration, mesh verification, and error statistics:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c45_1",
    "question": "If sum(O - S)² = 0.5 and sum(O - O_mean)² = 5.0, calculate the Nash-Sutcliffe Efficiency (NSE).",
    "answer": 0.9,
    "tol": 0.01,
    "unit": "",
    "hint": "NSE = 1 - (0.5 / 5.0).",
    "solution": "NSE = 1 - 0.1 = 0.90."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the critical difference between Model Calibration and Model Validation in engineering practice?",
    "options": [
      "Calibration changes equations, validation changes boundary conditions",
      "Calibration tunes empirical parameters (e.g. Manning's n) to match one historic dataset; Validation tests the locked calibrated model against a completely independent un-tuned event",
      "Calibration is for 1D, validation is for 2D",
      "There is no difference"
    ],
    "answer": 1,
    "explanation": "Calibration fits parameters to historic observations. Validation proves true predictive capability by running those frozen parameters against an independent storm event without any adjustment."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Equifinality in Hydrodynamic Modeling:**
   Different combinations of bed slope, subgrid bathymetry, and Manning's $n$ can yield identical water surface profiles. Field engineers must avoid compensating for bad bathymetric LiDAR by artificially inflating Manning's $n$ to unphysical values ($n > 0.20$).
"""

write_session("S42", s42)
write_session("S43", s43)
write_session("S44", s44)
write_session("S45", s45)
print("Part 2 (S42-S45) generated successfully!")
