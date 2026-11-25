import fs from 'fs';

const labGuides = {
  'L01.md': `<!--tab:Pre-Lab Simulator-->
# L01: Verification of Boundary Layer Velocity Profiles
**Unit I: Boundary Layer Theory** · **Course Outcome:** CO1 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Before entering the lab, explore the boundary layer growth and velocity profile across a flat plate:

::widget[flat_plate_bl]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=52sXk37W5qQ
tag: real
caption: Hydrogen bubble visualization of the boundary layer forming over a flat plate (NCFMF / MIT).
notice: Note zero velocity at wall; Observe the parabolic velocity gradient; Track downstream boundary layer growth
credit: NCFMF
creditUrl: https://www.youtube.com/watch?v=52sXk37W5qQ
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Wind tunnel or hydrodynamic flume with flat plate model, traversing Pitot-static tube, inclined manometer, and digital micrometer.
- **Governing Equations:**
  $$u(y) = \\sqrt{\\frac{2 \\Delta p}{\\rho}} = \\sqrt{2 g \\Delta h \\frac{\\rho_m}{\\rho}}$$
  $$\\text{Displacement Thickness: } \\delta^* = \\int_0^\\delta \\left(1 - \\frac{u}{U_\\infty}\\right) dy \\approx \\sum \\left(1 - \\frac{u_i}{U_\\infty}\\right) \\Delta y_i$$
  $$\\text{Momentum Thickness: } \\theta = \\int_0^\\delta \\frac{u}{U_\\infty}\\left(1 - \\frac{u}{U_\\infty}\\right) dy \\approx \\sum \\frac{u_i}{U_\\infty}\\left(1 - \\frac{u_i}{U_\\infty}\\right) \\Delta y_i$$

## 3. Step-by-Step Experimental Procedure
1. Zero the inclined manometer and align the Pitot-static tube at distance $x = 0.5\\text{ m}$ from the plate leading edge.
2. Turn on the wind tunnel blower and adjust to free-stream speed $U_\\infty \\approx 12\\text{ m/s}$.
3. Traverse the Pitot tube vertically from the wall ($y = 0.5\\text{ mm}$) in steps of $1\\text{ mm}$ up to $y = 20\\text{ mm}$.
4. Record dynamic pressure head $\\Delta h$ at each vertical distance $y$.
5. Plot $u/U_\\infty$ vs $y$ and evaluate $\\delta^*, \\theta,$ and shape factor $H = \\delta^* / \\theta$.

<!--tab:Data & Calculations-->
## 4. Observation Table & Live Data Checker
| Distance $y$ (mm) | Manometer $\\Delta h$ (mm) | Velocity $u$ (m/s) | $u / U_\\infty$ | $(1 - u/U_\\infty)$ |
|:---:|:---:|:---:|:---:|:---:|
| 1.0 | 2.5 | 6.32 | 0.527 | 0.473 |
| 2.0 | 5.2 | 9.12 | 0.760 | 0.240 |
| 4.0 | 7.8 | 11.16 | 0.930 | 0.070 |
| 6.0 | 8.8 | 11.85 | 0.988 | 0.012 |
| 8.0 | 9.0 | 11.98 | 0.998 | 0.002 |

\`\`\`calc
name: Local Velocity
formula: sqrt(2 * 9.81 * (dh / 1000) * (820 / 1.2))
inputs:
  - name: dh
    label: Manometer reading dh (mm)
    value: 5.2
    step: 0.1
target: 9.12
unit: m/s
tolerance: 0.1
hint: "Use u = sqrt(2 * g * dh * (rho_fluid / rho_air))."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why is the shape factor H = delta* / theta higher in laminar flow (H ≈ 2.6) than in turbulent flow (H ≈ 1.3)?
o: Turbulent flow is warmer
o: Turbulent mixing creates a fuller velocity profile, so displacement thickness delta* is much smaller relative to momentum thickness
o: Air disappears in turbulent flow
a: 2
why: In turbulent flow, high momentum fluid is mixed right down close to the wall, making the velocity profile much squarer and reducing delta*.
\`\`\`
`,

  'L04.md': `<!--tab:Pre-Lab Simulator-->
# L04: Uniform Flow & Manning's Roughness Determination
**Unit II: Open Channel Flow** · **Course Outcome:** CO2 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Before running the tilting flume, experiment with the normal depth solver and force balance:

::widget[normal_depth_solver]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** 10-metre tilting glass-sided flume, motorized slope adjustment jack, pointer gauge calipers, electromagnetic flow meter / collecting tank.
- **Governing Equations:**
  $$Q = \\frac{1}{n} A R^{2/3} S_0^{1/2} \\implies n = \\frac{A R^{2/3} S_0^{1/2}}{Q}$$
  $$\\text{For rectangular flume: } A = b y_0, \\quad P = b + 2 y_0, \\quad R = \\frac{b y_0}{b + 2 y_0}$$

## 3. Step-by-Step Procedure
1. Measure flume bottom width $b$ ($0.30\\text{ m}$). Set bed slope to $S_0 = 0.001$ using the mechanical tilt jack.
2. Start the centrifugal supply pump and set steady discharge $Q$.
3. Measure water depths at three stations along the flume length ($x = 2\\text{ m}, 5\\text{ m}, 8\\text{ m}$).
4. Adjust downstream tailgate until water depth is completely uniform along the flume ($y_1 = y_2 = y_3 = y_0$).
5. Record volumetric tank filling time for measured volume $\\Delta V$ to determine actual discharge $Q$.
6. Calculate Manning's roughness coefficient $n$ and Chezy's $C$.

<!--tab:Data & Calculations-->
## 4. Observation Table & Live Data Checker
| Trial | Slope $S_0$ | Depth $y_0$ (m) | Volume $V$ (m³) | Time $t$ (s) | Discharge $Q$ (m³/s) | Manning $n$ |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | 0.0010 | 0.085 | 0.150 | 18.2 | 0.00824 | 0.0102 |
| 2 | 0.0015 | 0.078 | 0.150 | 15.6 | 0.00962 | 0.0104 |
| 3 | 0.0020 | 0.072 | 0.150 | 13.8 | 0.01087 | 0.0103 |

\`\`\`calc
name: Manning n Calculator
formula: (0.30 * y * pow((0.30 * y) / (0.30 + 2 * y), 2/3) * sqrt(S0)) / Q
inputs:
  - name: y
    label: Normal depth y0 (m)
    value: 0.085
    step: 0.005
  - name: S0
    label: Bed slope S0
    value: 0.001
    step: 0.0005
  - name: Q
    label: Discharge Q (m3/s)
    value: 0.00824
    step: 0.0005
target: 0.0102
unit: "s/m^(1/3)"
tolerance: 0.001
hint: "Use n = (A * R^(2/3) * S0^(1/2)) / Q."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why is glass-walled flume roughness (n ≈ 0.010) lower than natural river bed roughness (n = 0.030 - 0.040)?
o: Glass is colder
o: Glass is hydraulically smooth with microscopic roughness, whereas rivers have gravel, boulders, and bank vegetation
o: Water flows backward in flumes
a: 2
why: Boundary roughness height ks in glass is sub-millimeter, keeping the bed completely submerged within the viscous sublayer.
\`\`\`
`,

  'L05.md': `<!--tab:Pre-Lab Simulator-->
# L05: Specific Energy & Critical Depth Verification
**Unit II: Open Channel Flow** · **Course Outcome:** CO2 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Explore the $E-y$ curve and critical depth $y_c$ on the virtual flume:

::widget[specific_energy_flume]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Tilting glass flume with adjustable sluice gate, downstream weir, and pointer gauges.
- **Governing Equations:**
  $$E = y + \\frac{V^2}{2g} = y + \\frac{Q^2}{2g b^2 y^2}$$
  $$y_c = \\sqrt[3]{\\frac{q^2}{g}} = \\sqrt[3]{\\frac{Q^2}{g b^2}}, \\quad E_c = 1.5 y_c$$
  $$Fr = \\frac{V}{\\sqrt{gy}}$$

## 3. Step-by-Step Procedure
1. Measure flume width $b$ ($0.30\\text{ m}$). Maintain a constant discharge $Q = 0.012\\text{ m}^3/\\text{s}$.
2. Using the upstream sluice gate and downstream tailgate, establish different flow depths ($y = 0.03\\text{ m}$ to $0.18\\text{ m}$).
3. Measure depth $y$ and calculate mean velocity $V = Q/(by)$ and specific energy $E = y + V^2/(2g)$.
4. Plot $E$ on the horizontal axis vs $y$ on the vertical axis to trace the complete specific energy curve.
5. Identify the critical depth $y_c$ where specific energy hits minimum $E_c$.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Critical Depth
formula: pow((Q * Q) / (9.81 * b * b), 1/3)
inputs:
  - name: Q
    label: Discharge Q (m3/s)
    value: 0.012
    step: 0.001
  - name: b
    label: Flume width b (m)
    value: 0.30
    step: 0.05
target: 0.0546
unit: m
tolerance: 0.002
hint: "Use yc = (q^2 / g)^(1/3) = (Q^2 / (g * b^2))^(1/3)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: At critical depth yc, what is the value of the Froude number Fr?
o: Fr = 0
o: Fr = 1.0
o: Fr = 2.5
a: 2
why: Critical flow represents the balance where flow velocity equals shallow water wave speed: V = sqrt(gy), so Fr = 1.0.
\`\`\`
`,

  'L06.md': `<!--tab:Pre-Lab Simulator-->
# L06: Hydraulic Jump & Energy Dissipation
**Unit II: Open Channel Flow** · **Course Outcome:** CO2 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Test your conjugate depth and energy loss before opening the flume sluice gate:

::widget[jump_lab]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=gsQATrCZKMM
tag: real
caption: Victor Ponce CIV E 530 flume demonstration of the hydraulic jump.
notice: Note incoming thin supercritical jet; Observe sudden turbulent standing wave; See turbulent surface rollers dissipating energy
credit: Victor Ponce Open Channel Flume
creditUrl: https://www.youtube.com/watch?v=gsQATrCZKMM
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Laboratory flume with upstream adjustable vertical sluice gate, tailgate, and movable pointer gauges.
- **Governing Equations:**
  $$\\frac{y_2}{y_1} = \\frac{1}{2}\\left(\\sqrt{1 + 8 Fr_1^2} - 1\\right), \\quad Fr_1 = \\frac{V_1}{\\sqrt{g y_1}}$$
  $$E_L = E_1 - E_2 = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}$$
  $$\\text{Jump Length: } L_j \\approx 5 \\text{ to } 7 (y_2 - y_1)$$

## 3. Step-by-Step Procedure
1. Open the upstream sluice gate by a small opening ($a = 15 - 25\\text{ mm}$) to produce a high-speed supercritical sheet.
2. Slowly raise the downstream tailgate until a stable hydraulic jump forms inside the viewing glass test section.
3. Measure initial depth $y_1$ immediately before the jump toe, and conjugate depth $y_2$ downstream of the roller.
4. Record jump length $L_j$ using a graduated scale along the flume wall.
5. Compute theoretical $y_{2,\\text{theo}}$ from the Bélanger equation and compare with experimental $y_{2,\\text{meas}}$.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Sequent Depth y2
formula: 0.5 * y1 * (sqrt(1 + 8 * Fr1 * Fr1) - 1)
inputs:
  - name: y1
    label: Initial depth y1 (m)
    value: 0.025
    step: 0.005
  - name: Fr1
    label: Inflow Froude number Fr1
    value: 3.5
    step: 0.2
target: 0.112
unit: m
tolerance: 0.005
hint: "Use y2 = (y1/2) * (sqrt(1 + 8*Fr1^2) - 1)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why cannot Bernoulli energy equation be used across a hydraulic jump to find y2?
o: Water is too cold
o: Energy loss in the violent turbulent roller is completely unknown beforehand; only momentum is conserved
o: Gravity does not act on jumps
a: 2
why: Intense turbulent mixing and air entrainment dissipate unknown amounts of kinetic energy into heat, violating energy conservation.
\`\`\`
`,

  'L08.md': `<!--tab:Pre-Lab Simulator-->
# L08: Impact of Jet on Flat & Curved Vanes
**Unit III: Impact of Jets** · **Course Outcome:** CO3 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Test the striking force of the water jet on flat, inclined, and curved vanes:

::widget[jet_force_lab]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=7X1F3c5P4j0
tag: real
caption: Impact of a jet test rig demonstrating jet strike against flat and curved vanes.
notice: Note nozzle diameter; Observe water deflecting by 90 deg off flat plate; See complete 180 deg reversal off curved cup
credit: Fluid Mechanics Educational Rigs
creditUrl: https://www.youtube.com/watch?v=7X1F3c5P4j0
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Impact of Jet apparatus with transparent cylinder, vertical nozzle ($d = 8\\text{ mm}$ or $10\\text{ mm}$), spring-loaded weight pan or load cell, and interchangeable vanes (Flat, $60^\\circ$ cone, $180^\\circ$ cup).
- **Governing Equations:**
  $$\\text{Flat Plate } (90^\\circ): \\quad F = \\rho Q V = \\rho a V^2$$
  $$\\text{Curved Cup } (180^\\circ): \\quad F = 2 \\rho Q V = 2 \\rho a V^2$$
  $$\\text{Discharge: } Q = \\frac{\\Delta V}{\\Delta t}, \\quad V = \\frac{Q}{a} = \\frac{4Q}{\\pi d^2}$$

## 3. Step-by-Step Procedure
1. Mount the flat plate on the vertical spindle and adjust the pointer to tare the spring balance.
2. Start the supply pump and adjust flow until the target mass weight (e.g. $200\\text{ g}, 400\\text{ g}$) on the pan is balanced.
3. Measure collecting tank discharge time to calculate exact discharge $Q$ and jet speed $V$.
4. Replace the flat plate with the $180^\\circ$ hemispherical cup and repeat measurements.
5. Compare measured spring force $F_{\\text{meas}} = m g$ against theoretical momentum thrust $F_{\\text{theo}}$.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Hemispherical Cup Force
formula: 2 * 1000 * ((pi * 0.01 * 0.01) / 4) * V * V
inputs:
  - name: V
    label: Jet velocity V (m/s)
    value: 8.5
    step: 0.5
target: 11.35
unit: N
tolerance: 0.2
hint: "Use F = 2 * rho * a * V^2 where a = pi * d^2 / 4."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why does a 180-degree hemispherical cup experience twice the force of a flat plate under the same jet?
o: The cup is made of heavier metal
o: The cup reverses fluid momentum by 180 degrees, creating a momentum change of 2*m*V instead of m*V
o: Water sticks to the cup
a: 2
why: Stopping the forward momentum produces force rho*Q*V, and firing it backward produces an additional reaction force rho*Q*V.
\`\`\`
`,

  'L10.md': `<!--tab:Pre-Lab Simulator-->
# L10: Performance Characteristics of Pelton Turbine
**Unit IV: Hydraulic Machines** · **Course Outcome:** CO4 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Test Pelton runner sizing, speed ratio, and power before running the test rig:

::widget[pelton_designer]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=3BCiFeyGefE
tag: simulation
caption: Pelton wheel turbine working and bucket splitting animation.
notice: High-pressure jet striking bucket splitter; Water split symmetrically into twin bowls; Deflector plate load control
credit: Hydropower Visualizations
creditUrl: https://www.youtube.com/watch?v=3BCiFeyGefE
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Pelton turbine test rig with spear valve nozzle, rope brake dynamometer / electrical generator, pressure gauge, tachometer, and Venturimeter/notch for discharge.
- **Governing Equations:**
  $$\\text{Water Power (Input): } P_{\\text{in}} = \\gamma Q H = \\rho g Q H$$
  $$\\text{Brake Power (Output): } P_{\\text{out}} = \\frac{2 \\pi N T}{60} = \\frac{2 \\pi N (W - S) R_{\\text{eff}} g}{60}$$
  $$\\text{Overall Efficiency: } \\eta_o = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\%$$

## 3. Step-by-Step Procedure
1. Prime and start the high-pressure centrifugal supply pump. Establish constant test head $H$ (e.g. $2.5\\text{ bar} = 25.5\\text{ m}$).
2. Run the turbine at no load and record runaway speed $N_{\\max}$.
3. Progressively apply brake load using the rope brake drum weights ($W = 1, 2, 3, 4, 5\\text{ kg}$).
4. Record spring balance reading $S$, shaft speed $N$ (RPM), and Venturimeter manometer head $\\Delta h$.
5. Plot Main Characteristics ($Q, P, \\eta$ vs speed $N$) and Operating Characteristics (Efficiency vs Power at constant speed).

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Turbine Overall Efficiency
formula: (P_out / (1000 * 9.81 * Q * H)) * 100
inputs:
  - name: P_out
    label: Shaft brake power (W)
    value: 1250
    step: 50
  - name: Q
    label: Discharge Q (m3/s)
    value: 0.0065
    step: 0.0005
  - name: H
    label: Net head H (m)
    value: 24.0
    step: 1.0
target: 81.67
unit: "%"
tolerance: 1.0
hint: "Use eta = P_out / (rho * g * Q * H) * 100."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: What is the purpose of the central splitter in a Pelton bucket?
o: To make the wheel look balanced
o: To cleanly divide incoming jet into two equal streams, canceling axial thrust forces on the shaft bearings
o: To increase air resistance
a: 2
why: Dividing the jet symmetrically balances axial momentum, preventing catastrophic bearing failure.
\`\`\`
`,

  'L12.md': `<!--tab:Pre-Lab Simulator-->
# L12: Operating Characteristics of Centrifugal Pump
**Unit IV: Hydraulic Machines** · **Course Outcome:** CO4 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Explore centrifugal pump head-discharge curves, operating point, and cavitation NPSH:

::widget[pump_matcher]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=sI9pA7qR6C8
tag: real
caption: High-speed video of cavitation inception inside a transparent centrifugal pump casing.
notice: Note low pressure at impeller eye; Observe vapor bubbles forming; See violent bubble implosion at tip
credit: Turbomachinery Lab
creditUrl: https://www.youtube.com/watch?v=sI9pA7qR6C8
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Variable speed centrifugal pump test rig, suction vacuum gauge, delivery pressure gauge, energy meter / torque sensor, and volumetric collecting tank.
- **Governing Equations:**
  $$\\text{Manometric Head: } H_m = \\frac{p_d}{\\gamma} - \\frac{p_s}{\\gamma} + z_d - z_s + \\frac{V_d^2 - V_s^2}{2g}$$
  $$\\text{Water Power: } P_w = \\rho g Q H_m$$
  $$\\text{Overall Efficiency: } \\eta_o = \\frac{P_w}{P_{\\text{elec}}} \\times 100\\%$$

## 3. Step-by-Step Procedure
1. Prime the pump completely by filling the casing with water until all air is expelled through the air-bleed valve.
2. Start the motor with delivery valve completely closed (shut-off condition). Record shut-off head $H_0$.
3. Gradually open the delivery regulating valve in 6 distinct stages.
4. Record suction vacuum $p_s$ (negative head), delivery gauge $p_d$, discharge collecting tank time $t$, and motor power $P_{\\text{input}}$.
5. Plot the pump characteristic curves: $H_m$ vs $Q$, $P_{\\text{in}}$ vs $Q$, and $\\eta$ vs $Q$.
6. Identify the Best Efficiency Point (BEP).

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Pump Water Power
formula: 9810 * Q * Hm
inputs:
  - name: Q
    label: Discharge Q (m3/s)
    value: 0.0085
    step: 0.0005
  - name: Hm
    label: Manometric head Hm (m)
    value: 18.5
    step: 0.5
target: 1542.6
unit: W
tolerance: 10
hint: "Use Pw = rho * g * Q * Hm."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why must a centrifugal pump delivery valve be closed when starting the motor?
o: To keep the water cold
o: At zero discharge (Q = 0), power consumption is minimum, preventing motor overload and tripping during startup
o: Because pumps cannot start with water moving
a: 2
why: Centrifugal pump power consumption rises with discharge; starting with valve closed minimizes starting current.
\`\`\`
`,

  'L14.md': `<!--tab:Pre-Lab Simulator-->
# L14: HEC-RAS 2D Unsteady Flow & Flood Inundation
**Unit V: Computational Hydraulics** · **Course Outcome:** CO5 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Test mesh cell dimensions and time step stability before running HEC-RAS 2D:

::widget[mesh_lab]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=x7eH5N4DqV8
tag: simulation
caption: HEC-RAS 2D unsteady dam-break simulation and flood wave routing over terrain.
notice: Note breach expanding; Observe positive bore wave; See roadway embankments deflecting lateral flood spread
credit: USACE HEC Training
creditUrl: https://www.youtube.com/watch?v=x7eH5N4DqV8
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Software:** US Army Corps of Engineers HEC-RAS 2D (v6.5+), GIS Digital Elevation Model (DEM).
- **Governing Equations:**
  $$\\text{2D Diffusion Wave / Full Shallow Water Equations (SWE)}$$
  $$\\text{CFL Stability Condition: } Cr = \\frac{(|u| + \\sqrt{gy})\\Delta t}{\\Delta x} \\le 1.0 \\text{ (Explicit)} \\quad \\le 2.0 \\text{ (Implicit)}$$

## 3. Step-by-Step Procedure
1. Launch HEC-RAS 2D and set project coordinate projection (UTM Zone 43N for Bengaluru).
2. Create RAS Terrain from the provided 1-metre LiDAR bare-earth DEM.
3. Draw 2D Flow Area polygon ($500\\text{ m} \\times 200\\text{ m}$) with nominal cell spacing $\\Delta x = 10\\text{ m}$.
4. Enforce breaklines along river channel bank lines and road embankments.
5. Apply upstream boundary condition: Flow hydrograph $Q(t)$ ($Q_{\\text{peak}} = 85\\text{ m}^3/\\text{s}$).
6. Apply downstream boundary condition: Normal depth friction slope $S_f = 0.0008$.
7. Set computational time step $\\Delta t = 1.0\\text{ s}$ to maintain $Cr \\le 1.5$.
8. Compute unsteady simulation and visualize depth, velocity vectors, and flood arrival contours in RAS Mapper.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Wave Celerity
formula: sqrt(9.81 * y)
inputs:
  - name: y
    label: Maximum flood depth y (m)
    value: 3.2
    step: 0.2
target: 5.60
unit: m/s
tolerance: 0.05
hint: "Use c = sqrt(g * y)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why are breaklines essential along levees and road embankments in HEC-RAS 2D?
o: To change cell colors
o: To force cell faces to align along the crest of the barrier, preventing artificial water leakage before overtopping
o: To make the river wider
a: 2
why: If a cell spans across a levee, water would calculate across the average ground height, leaking floodwater prematurely.
\`\`\`
`
};

for (const [file, content] of Object.entries(labGuides)) {
  const p = 'labs/' + file;
  fs.writeFileSync(p, content, 'utf8');
  console.log('Successfully upgraded lab guide:', file);
}
