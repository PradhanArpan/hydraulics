<!--tab:Framework-->
# CE432P Hydraulic Engineering Mini-Project
**Format:** Collaborative team project (3–4 students per group)  
**Total Weightage:** 70 Marks (Stage I: 10 Marks in CIA I; Stage II: 10 Marks in CIA III; Stage III: 50 Marks in Overall CIA)

## Three-Stage Integration Architecture
```
Stage I (CIA I: 10 Marks)        -->  Stage II (CIA III: 10 Marks)       -->  Stage III (Overall CIA: 50 Marks)
Analytical Formulation &              Laboratory Flume / Field Data           HEC-RAS 2D / OpenFOAM Model
Governing Equations Solution           Error Analysis & Comparison             3-Way Validation & Viva Defense
```

### Stage I: Analytical Formulation (Assessed in CIA I — 10 Marks)
- Formulate the engineering problem statement and identify governing hydraulic equations (Manning's uniform flow, specific energy, momentum conservation, or GVF dynamic equation).
- Assemble geometric dimensions, channel roughness, discharge ranges, and boundary conditions.
- Implement an analytical spreadsheet solver with tables, curves, and sensitivity checks.
- **Deliverable:** *Concept Note & Preliminary Calculation Sheet* (due Week 5).

### Stage II: Experimental / Field Data (Assessed in CIA III — 10 Marks)
- Collect laboratory flume measurements (Exp 1 to 8), field drain survey data, or 1D baseline model data for the identical problem geometry.
- Record water depths, discharges, head losses, and compute empirical coefficients ($C_d, n$).
- Perform quantitative error and deviation comparison against Stage I analytical calculations.
- **Deliverable:** *Data Workbook & Progress Report* (due Week 12).

### Stage III: 2D/3D Hydrodynamic Simulation & Validation (Assessed in Overall CIA — 50 Marks)
- Construct a full 2D hydrodynamic model in **HEC-RAS 2D** (or 3D OpenFOAM via SimFlow).
- Generate a structured computational mesh, assign roughness, and establish boundary hydrographs.
- Perform 3-way quantitative validation: **Analytical vs Experimental vs 2D Simulation** with percentage error and RMSE calculation.
- **Deliverable:** *Formal Technical Report, Team Slide Presentation, and Viva-Voce Defense* (Week 15).

<!--tab:Topics Catalog-->
## Approved Mini-Project Topic Catalog (15 Topics)

| # | Topic Title | Focus & Governing Theory | Laboratory / Field Connection | 2D / 3D Simulation Target |
|:---:|:---|:---|:---|:---|
| **1** | Uniform Flow in Laboratory Flume | Manning's formula, normal depth $y_n$ | Flume depth measurements at 3 discharges | HEC-RAS 2D velocity & depth validation |
| **2** | Economical Trapezoidal Canal | Minimum wetted perimeter, optimal $m$ | Flume comparison of rectangular vs trapezoidal | 2D boundary shear stress distribution |
| **3** | Hydraulic Jump in Rectangular Channel | Belanger momentum balance, sequent depths | Sluice gate jump in flume; $y_1, y_2, L_j$ | HEC-RAS 2D full momentum jump position |
| **4** | Flow over Broad-Crested Weir | Critical depth $y_c = \frac{2}{3} H$, modular limit | Exp 4 flume readings to obtain $C_d$ | HEC-RAS 2D weir profile & rating |
| **5** | Flow over Ogee Spillway Crest | WES crest geometry, $Q = C_d L H^{3/2}$ | Exp 3 flume measurements for $C_d$ | HEC-RAS 2D rating; SimFlow crest pressure |
| **6** | Venturi / Parshall Flume Meter | Channel transition & choking throat | Flume throat head & discharge rating | HEC-RAS 2D critical drawdown through throat |
| **7** | Backwater (M1) Profile Behind Weir | GVF dynamic equation, Direct Step method | Point gauge water surface profile upstream | HEC-RAS 1D and 2D backwater curve extent |
| **8** | Drawdown (M2) Profile at Free Overfall | Brink depth $y_e \approx 0.715 y_c$, curvature | Tilting flume overfall depth measurement | HEC-RAS 2D overfall profile validation |
| **9** | Flow over Bed Hump & Contraction | Specific energy curve, choking limits | Flume tests for unchoked vs choked flow | HEC-RAS 2D upstream water level backing |
| **10** | Estimation of Manning's $n$ | Bed lining roughness calibration | Smooth glass vs gravel flume bed tests | HEC-RAS 2D roughness calibration |
| **11** | Flow in Compound Channels | Divided channel method, shear layers | Flume main channel + floodplain tests | HEC-RAS 2D eddy viscosity at interface |
| **12** | Hydraulic Capacity of Road Culvert | Inlet vs outlet control capacity | Culvert apparatus or field culvert survey | HEC-RAS 2D barrel flow & overtopping risk |
| **13** | Bengaluru Urban Drain Capacity | Urban stormwater conveyance & GVF | Field survey of section, slope & float velocity | HEC-RAS 2D flood inundation routing |
| **14** | Flow Around Bridge Piers | Afflux, boundary layer separation, vortices | Flume pier model afflux measurement | HEC-RAS 2D velocity vectors & wake zone |
| **15** | Flow Under Sluice Gate | Contraction coefficient $C_c$, vena contracta | Upstream head, opening & vena contracta | HEC-RAS 2D inline gate discharge rating |
