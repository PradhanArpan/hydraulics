import fs from 'fs';

const labGuides = {
  'L02.md': `<!--tab:Pre-Lab Simulator-->
# L02: Flow Visualization & Boundary Layer Separation
**Unit I: Boundary Layer Theory** · **Course Outcome:** CO1 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Examine adverse pressure gradients, point of separation, and wake shedding:

::widget[separation_lab]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=V-_flgqH8d4
tag: real
caption: Smoke wind tunnel visualization of boundary layer separation and turbulent wake shedding past a cylinder.
notice: Note smooth streamlines upstream; Observe flow separation past the cylinder equator; See chaotic low-pressure vortex wake
credit: Flow Visualization Lab
creditUrl: https://www.youtube.com/watch?v=V-_flgqH8d4
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Flow visualization water channel / Hele-Shaw apparatus with dye injection needles, interchangeable test models (circular cylinder, aerofoil, expanding diffuser).
- **Governing Equations:**
  $$\\text{Favorable Gradient: } \\frac{dp}{dx} < 0 \\implies \\left(\\frac{\\partial u}{\\partial y}\\right)_w > 0 \\quad \\text{(No separation)}$$
  $$\\text{Separation Point: } \\left(\\frac{\\partial u}{\\partial y}\\right)_w = 0$$
  $$\\text{Adverse Gradient: } \\frac{dp}{dx} > 0 \\implies \\text{Inflection point, flow reversal and detachment}$$

## 3. Step-by-Step Procedure
1. Level the Hele-Shaw water flume and adjust dye supply reservoir so dye flows smoothly at fluid speed.
2. Place a circular cylinder model in the test channel. Establish low Reynolds number creeping flow ($Re < 1$). Observe symmetrical streamlines.
3. Increase flow rate to $Re \\approx 50 - 200$. Observe the separation point moving forward and the Karman vortex street shedding downstream.
4. Replace cylinder with an aerofoil model. Gradually increase angle of attack from $0^\\circ$ to $18^\\circ$.
5. Identify the critical stall angle of attack where boundary layer separation abruptly engulfs the entire suction surface.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Reynolds Number Cylinder
formula: (V * D) / 0.000001
inputs:
  - name: V
    label: Approach velocity V (m/s)
    value: 0.15
    step: 0.02
  - name: D
    label: Cylinder diameter D (m)
    value: 0.05
    step: 0.01
target: 7500
unit: "-"
tolerance: 100
hint: "Use Re = (V * D) / nu where nu = 1e-6 m2/s for water."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: What mathematical condition defines the exact point of boundary layer separation on a solid wall?
o: Velocity equals speed of sound
o: (du/dy) at the wall equals zero
o: Pressure equals zero
a: 2
why: At the separation point, the wall shear stress tau_0 = mu*(du/dy)_w drops to zero before flow reverses direction.
\`\`\`
`,

  'L03.md': `<!--tab:Pre-Lab Simulator-->
# L03: Cavitation Inception in a Venturi / Orifice
**Unit I: Boundary Layer Theory** · **Course Outcome:** CO1 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Explore pressure drop, throat vacuum, and Thoma cavitation factor:

::widget[wall_zoom]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=sI9pA7qR6C8
tag: real
caption: High-speed video of cavitation bubbles forming at low pressure and collapsing.
notice: Note local pressure drop; Observe vapor bubbles forming at room temperature; Hear snapping acoustic noise
credit: Fluid Dynamics Lab
creditUrl: https://www.youtube.com/watch?v=sI9pA7qR6C8
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Closed-loop cavitation test tunnel with transparent acrylic Venturi section, vacuum pump, pressure transducer, stroboscope, and sound level meter.
- **Governing Equations:**
  $$\\text{Bernoulli Equation: } \\frac{p_1}{\\gamma} + \\frac{V_1^2}{2g} = \\frac{p_{\\text{throat}}}{\\gamma} + \\frac{V_{\\text{throat}}^2}{2g} + h_L$$
  $$\\text{Cavitation Parameter } \\sigma: \\quad \\sigma = \\frac{p_1 - p_v}{\\frac{1}{2}\\rho V_1^2}$$
  $$\\text{Inception Condition: } p_{\\text{throat}} \\le p_{\\text{vap}} \\approx 2.34\\text{ kPa absolute (at } 20^\\circ\\text{C)}$$

## 3. Step-by-Step Procedure
1. Fill closed loop with de-aerated water. Open throttle valve and record upstream baseline pressure $p_1$.
2. Gradually increase circulation pump speed to accelerate flow through the constricted Venturi throat ($d_{\\text{throat}} = 12\\text{ mm}$).
3. Observe pressure drop at throat using the digital vacuum transducer.
4. Note the critical flow velocity where tiny milky vapor clouds first appear at the throat walls: **Cavitation Inception**.
5. Record sound level meter reading in decibels (dB) to detect the characteristic high-frequency crackling noise.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Thoma Cavitation Parameter
formula: (p1 - 2340) / (0.5 * 1000 * V1 * V1)
inputs:
  - name: p1
    label: Upstream pressure p1 (Pa abs)
    value: 180000
    step: 5000
  - name: V1
    label: Upstream velocity V1 (m/s)
    value: 4.2
    step: 0.2
target: 20.14
unit: "-"
tolerance: 0.5
hint: "Use sigma = (p1 - pv) / (0.5 * rho * V1^2) where pv = 2340 Pa."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why does cavitation cause severe pitting and erosion on metal boundaries?
o: Chemical acid reaction
o: Violent micro-jet impact during bubble implosion generating localized pressures up to 10,000 atmospheres
o: Rust from oxygen
a: 2
why: When vapor bubbles travel into higher pressure zones, they collapse asymmetrically, firing supersonic micro-jets that fatigue metal.
\`\`\`
`,

  'L07.md': `<!--tab:Pre-Lab Simulator-->
# L07: Gradually Varied Flow (GVF) Water Surface Profiles
**Unit II: Open Channel Flow** · **Course Outcome:** CO2 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Simulate M1, M2, and S1 surface profiles before taking point gauge readings:

::widget[gvf_explorer]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** 12-metre tilting glass flume, downstream sluice gate/weir barrier, traversing point gauge on carriage.
- **Governing Equations:**
  $$\\frac{dy}{dx} = \\frac{S_0 - S_f}{1 - Fr^2} = \\frac{S_0 - \\frac{n^2 V^2}{R^{4/3}}}{1 - \\frac{Q^2 T}{g A^3}}$$
  $$\\text{Direct Step Method: } \\Delta x = \\frac{E_2 - E_1}{S_0 - \\bar{S}_f}$$

## 3. Step-by-Step Procedure
1. Set flume to a mild slope ($S_0 = 0.001$, where $y_0 > y_c$). Establish steady discharge $Q = 0.015\\text{ m}^3/\\text{s}$.
2. Insert a vertical weir at the downstream end to create an **$M_1$ backwater curve**.
3. Measure water surface elevations with the point gauge at 0.5-metre intervals moving upstream.
4. Remove the weir and raise the tailgate to create an **$M_2$ drawdown curve** near a free overfall.
5. Compute the theoretical water surface profile using the Direct Step Method and plot measured vs simulated profiles.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: GVF Step Distance
formula: (E2 - E1) / (0.001 - Sf_avg)
inputs:
  - name: E2
    label: Specific energy E2 (m)
    value: 0.145
    step: 0.005
  - name: E1
    label: Specific energy E1 (m)
    value: 0.142
    step: 0.005
  - name: Sf_avg
    label: Average friction slope Sf
    value: 0.0006
    step: 0.0001
target: 7.5
unit: m
tolerance: 0.2
hint: "Use delta_x = (E2 - E1) / (S0 - Sf_avg)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: In a mild slope channel (y0 > yc), what type of GVF profile forms behind a dam or weir where y > y0?
o: S1 profile
o: M1 backwater profile
o: M3 profile
a: 2
why: When depth exceeds normal depth on a mild slope, flow is in Zone 1, producing an M1 backwater profile where dy/dx > 0.
\`\`\`
`,

  'L09.md': `<!--tab:Pre-Lab Simulator-->
# L09: Momentum Analysis of Moving Vanes & Series of Vanes
**Unit III: Impact of Jets** · **Course Outcome:** CO3 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Explore dynamic velocity triangles, blade speed ratios, and runner efficiency:

::widget[velocity_triangle]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Pelton wheel turbine demonstration rig with variable speed braking, stroboscope, tachometer, and spring balance.
- **Governing Equations:**
  $$\\text{Single Moving Vane Mass: } \\dot{m} = \\rho a (V - u)$$
  $$\\text{Series of Vanes on Wheel: } \\dot{m} = \\rho a V = \\rho Q$$
  $$\\text{Runner Power: } P = \\rho Q (V_{w1} \\pm V_{w2}) u$$
  $$\\text{Hydraulic Efficiency: } \\eta_h = \\frac{2(V_{w1} \\pm V_{w2}) u}{V_1^2}$$

## 3. Step-by-Step Procedure
1. Start the jet apparatus and direct high-pressure water jet onto the runner vanes.
2. Measure jet velocity $V_1 = C_v \\sqrt{2gH}$ using net head gauge.
3. Vary mechanical brake torque $T$ to alter wheel peripheral velocity $u = \\pi D N / 60$.
4. Record runner rotational speed $N$ and compute speed ratio $\\phi = u / V_1$.
5. Plot hydraulic efficiency $\\eta$ against speed ratio $\\phi$ and identify the optimum speed ratio (theoretically $\\phi \\approx 0.46 - 0.48$).

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Blade Speed u
formula: (pi * D * N) / 60
inputs:
  - name: D
    label: Runner pitch diameter D (m)
    value: 0.25
    step: 0.01
  - name: N
    label: Runner speed N (RPM)
    value: 750
    step: 25
target: 9.82
unit: m/s
tolerance: 0.1
hint: "Use u = (pi * D * N) / 60."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why is the theoretical maximum efficiency of a series of flat vanes capped at 50%?
o: Water loses temperature
o: Kinetic energy leaving in the exit velocity (V - u) carries away half of the initial jet energy
o: Flat vanes cause friction
a: 2
why: For flat vanes, exit absolute velocity cannot drop below blade speed u. At optimum u = V/2, exactly 50% of kinetic energy remains in the exit stream.
\`\`\`
`,

  'L11.md': `<!--tab:Pre-Lab Simulator-->
# L11: Performance Characteristics of Francis / Kaplan Turbine
**Unit IV: Hydraulic Machines** · **Course Outcome:** CO4 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Explore reaction turbine casing flow, draft tube pressure recovery, and machine selection:

::widget[turbine_cutaway]

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=0p03UTgpnDU
tag: schematic
caption: 3D cutaway animation of a Francis reaction turbine showing spiral casing and draft tube.
notice: Spiral casing maintaining uniform inward swirl; Adjustable wicket gates; Draft tube diffuser recovering vacuum head
credit: Hydro Power Generation Systems
creditUrl: https://www.youtube.com/watch?v=0p03UTgpnDU
\`\`\`

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Apparatus:** Closed Francis turbine test rig, spiral casing, adjustable guide vanes, rope brake / eddy current dynamometer, vacuum gauge on draft tube, differential manometer.
- **Governing Equations:**
  $$\\text{Input Power: } P_{\\text{in}} = \\rho g Q H$$
  $$\\text{Brake Power: } P_{\\text{out}} = \\frac{2 \\pi N T}{60}$$
  $$\\text{Overall Efficiency: } \\eta_o = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\%$$
  $$\\text{Unit Speed } N_u = \\frac{N}{\\sqrt{H}}, \\quad \\text{Unit Power } P_u = \\frac{P}{H^{3/2}}, \\quad \\text{Unit Flow } Q_u = \\frac{Q}{\\sqrt{H}}$$

## 3. Step-by-Step Procedure
1. Set guide vane opening to $50\\%$ and start circulation supply pump.
2. Maintain constant test head $H = 15.0\\text{ m}$.
3. Progressively load the turbine brake from zero load to full stall.
4. Record speed $N$, torque $T$, discharge $Q$, and draft tube inlet vacuum reading $p_2/\\gamma$.
5. Plot Main Characteristics ($Q, P, \\eta$ vs $N$) and Unit Characteristic Curves ($Q_u, P_u$ vs $N_u$).

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Unit Speed Nu
formula: N / sqrt(H)
inputs:
  - name: N
    label: Runner speed N (RPM)
    value: 650
    step: 25
  - name: H
    label: Net head H (m)
    value: 16.0
    step: 1.0
target: 162.5
unit: "RPM/m^(1/2)"
tolerance: 1.0
hint: "Use Nu = N / sqrt(H)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: What is the primary function of the divergent draft tube in a reaction turbine?
o: To silence the water noise
o: To recover kinetic energy leaving the runner as a sub-atmospheric suction head, increasing the net effective head
o: To store reserve water
a: 2
why: The expanding draft tube slows exit velocity, converting kinetic head into negative pressure suction that pulls water through the runner.
\`\`\`
`,

  'L13.md': `<!--tab:Pre-Lab Simulator-->
# L13: HEC-RAS 2D Mesh Generation & Terrain Setup
**Unit V: Computational Hydraulics** · **Course Outcome:** CO5 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Test subgrid bathymetry and unstructured polygon meshing on the virtual reach:

::widget[mesh_lab]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Software:** HEC-RAS 2D (v6.5+), QGIS / ArcGIS, 1-metre LiDAR bare-earth DEM geotiff.
- **Governing Equations:**
  $$\\text{Gauss Divergence Theorem: } \\int_\\Omega \\nabla \\cdot \\vec{F}\\,d\\Omega = \\sum_{\\text{faces } k} (\\vec{F}_k \\cdot \\vec{n}_k) A_k$$
  $$\\text{Subgrid Storage: } V(z) = \\int_0^z A_s(z')\\,dz'$$

## 3. Step-by-Step Procedure
1. Create a new HEC-RAS project and import the study area Digital Elevation Model in RAS Mapper.
2. Define a 2D Flow Area polygon covering the channel and 100-year floodplain.
3. Set nominal grid spacing to $\\Delta x = 20\\text{ m}$.
4. Generate the computational mesh and inspect polygon quality (check for cells with $> 8$ faces or severe acute angles).
5. Draw breaklines along levee crests and road embankments; enforce breakline cell face alignment.
6. Compute 2D Flow Area Hydraulic Tables ($V(z), A(z), P(z)$) and verify that no levee leaks exist.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: 2D Cell Count Estimate
formula: (L * W) / (dx * dy)
inputs:
  - name: L
    label: Domain length L (m)
    value: 1200
    step: 100
  - name: W
    label: Domain width W (m)
    value: 400
    step: 50
  - name: dx
    label: Cell size dx (m)
    value: 20
    step: 5
  - name: dy
    label: Cell size dy (m)
    value: 20
    step: 5
target: 1200
unit: cells
tolerance: 10
hint: "Use Total Cells = (L * W) / (dx * dy)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: In HEC-RAS 2D, what happens if an engineer fails to draw a breakline along a narrow road embankment?
o: The computer runs out of memory
o: The computational cell will straddle both sides of the embankment, averaging ground elevation and falsely leaking water through the road
o: The model becomes 100% accurate
a: 2
why: Breaklines enforce cell faces along high ridges, preventing artificial numerical flooding across levees until actual overtopping occurs.
\`\`\`
`,

  'L15.md': `<!--tab:Pre-Lab Simulator-->
# L15: SimFlow/OpenFOAM CFD Modeling of Hydraulic Structure
**Unit V: Computational Hydraulics** · **Course Outcome:** CO5 · **Duration:** 90 Minutes

## 1. Virtual Pre-Lab Simulation
Simulate free-surface multiphase plunging flow over an ogee crest and stilling basin:

::widget[jump_lab]

<!--tab:Procedure & Theory-->
## 2. Experimental Apparatus & Governing Theory
- **Software:** SimFlow (OpenFOAM GUI), multiphase interFoam solver with Volume of Fluid (VOF).
- **Governing Equations:**
  $$\\frac{\\partial \\alpha}{\\partial t} + \\nabla \\cdot (\\alpha \\vec{u}) = 0 \\quad (\\alpha = 1: \\text{water}, \\, \\alpha = 0: \\text{air})$$
  $$\\text{Navier-Stokes: } \\frac{\\partial (\\rho \\vec{u})}{\\partial t} + \\nabla \\cdot (\\rho \\vec{u} \\vec{u}) = -\\nabla p + \\nabla \\cdot \\vec{\\tau} + \\rho \\vec{g} + \\vec{f}_\\sigma$$

## 3. Step-by-Step Procedure
1. Launch SimFlow and import the 3D STL CAD geometry of an ogee spillway and stilling basin.
2. Create background hex mesh and apply snappyHexMesh surface refinement around the spillway crest.
3. Select interFoam solver with k-epsilon or k-omega SST turbulence model.
4. Establish boundary conditions: Upstream mass inflow, atmosphere top (open boundary), downstream free outfall.
5. Initialize the water phase fraction alpha = 1.0 in the upstream reservoir pool using setFields.
6. Run transient simulation with Courant limit $Cr \\le 0.8$ (automatic adaptive time stepping).
7. Post-process in ParaView: plot free-surface contours ($\\alpha = 0.5$) and crest pressure distributions.

<!--tab:Data & Calculations-->
## 4. Live Data Checker
\`\`\`calc
name: Crest Invert Pressure Head
formula: H - y - (V * V) / (2 * 9.81)
inputs:
  - name: H
    label: Total reservoir head H (m)
    value: 4.5
    step: 0.2
  - name: y
    label: Crest flowing depth y (m)
    value: 2.1
    step: 0.1
  - name: V
    label: Crest flow velocity V (m/s)
    value: 8.2
    step: 0.2
target: -1.03
unit: m of water
tolerance: 0.05
hint: "Use p/gamma = H - y - V^2/(2g)."
\`\`\`

<!--tab:Viva-Voce-->
## 5. Viva-Voce Questions
\`\`\`quiz
q: Why must a two-phase Volume of Fluid (VOF) model be used for spillways instead of single-phase liquid CFD?
o: Air is heavier than water
o: The location of the turbulent free surface is completely unknown beforehand and must be captured as a dynamic moving interface
o: OpenFOAM does not support single phase
a: 2
why: VOF tracks the dynamic deformational boundary separating water from atmosphere on a fixed Eulerian computational mesh.
\`\`\`
`
};

for (const [file, content] of Object.entries(labGuides)) {
  const p = 'labs/' + file;
  fs.writeFileSync(p, content, 'utf8');
  console.log('Successfully upgraded lab guide:', file);
}
