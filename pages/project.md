<!--tab:Framework-->
# CE432P Hydraulic Engineering Mini-Project
**Format:** Collaborative team project (3–4 students per group)  
**Total Weightage:** 70 Marks (Stage I: 10 Marks in CIA I; Stage II: 10 Marks in CIA III; Stage III: 50 Marks in Overall CIA)  
**Lead Faculty:** Dr. Arpan Pradhan · Department of Civil Engineering, CHRIST (Deemed to be University)

---

## 1. Outcome-Based Education (OBE) Mapping

| Project Stage | Marks | Course Outcomes (CO) | Program Outcomes (PO) | Bloom's Taxonomy Level |
| :--- | :---: | :--- | :--- | :---: |
| **Stage I: Analytical Formulation** | 10 | **CO2** (Open Channel Flow) / **CO4** (Turbomachinery) | **PO1** (Engg Knowledge), **PO2** (Problem Analysis) | Level 3 (Apply), Level 4 (Analyze) |
| **Stage II: Experimental Verification** | 10 | **CO2** / **CO3** (Impact of Jets) | **PO1**, **PO2**, **PO4** (Conduct Investigations) | Level 4 (Analyze) |
| **Stage III: 2D Simulation & Validation**| 50 | **CO5** (Computational Hydraulics & 2D Modeling) | **PO3** (Design/Development), **PO5** (Modern Tool Usage), **PO10** (Communication) | Level 5 (Evaluate), Level 6 (Create) |

---

## 2. Three-Stage Integration Architecture

```
Stage I (CIA I: 10 Marks)        ──►  Stage II (CIA III: 10 Marks)       ──►  Stage III (Overall CIA: 50 Marks)
Analytical Formulation &              Laboratory Flume / Field Data           HEC-RAS 2D / OpenFOAM Model
Governing Equations Solution           Error Analysis & Comparison             3-Way Validation & Viva Defense
```

### Stage I: Analytical Formulation & Concept Note (Week 5 · 10 Marks)
- Formulate the engineering problem statement and identify governing hydraulic equations (Manning's uniform flow, specific energy, momentum conservation, or GVF dynamic equation).
- Assemble geometric dimensions, channel roughness, discharge ranges, and boundary conditions.
- Implement an analytical spreadsheet solver with tables, curves, and sensitivity checks.
- **Deliverables:** *Concept Note & Preliminary Calculation Sheet* (due Week 5).

### Stage II: Experimental / Laboratory Verification (Week 12 · 10 Marks)
- Collect laboratory flume measurements (Exp L01 to L12), field drain survey data, or 1D baseline model data for the identical problem geometry.
- Record water depths, discharges, head losses, and compute empirical coefficients ($C_d, n$).
- Perform quantitative error and deviation comparison against Stage I analytical calculations.
- **Deliverables:** *Data Workbook & Progress Report* (due Week 12).

### Stage III: 2D/3D Hydrodynamic Simulation & Capstone Defense (Week 15 · 50 Marks)
- Construct a full 2D hydrodynamic model in **HEC-RAS 2D** (or 3D OpenFOAM via SimFlow).
- Generate an unstructured computational mesh, assign breaklines along embankments, assign land cover roughness, and establish boundary hydrographs.
- Perform 3-way quantitative validation: **Analytical vs Experimental vs 2D Simulation** with percentage error and RMSE calculation.
- **Deliverables:** *Formal Technical Report (IEEE format), Team Presentation, and Viva-Voce Defense* (Week 15).

---

<!--tab:Design Scenarios-->
## Realistic Catchment Design Scenarios (Bengaluru & Karnataka)

Students may select one of the following local engineering benchmark scenarios for their project:

### Scenario A: Vrishabhavathi Valley Stormwater Outfall (Rajarajeshwari Nagar, Bengaluru)
- **Problem Statement:** Rapid urbanization has increased peak runoff into the Vrishabhavathi primary stormwater drain (Rajakaluve). During extreme monsoon events, backwater effects cause urban inundation near road bridges.
- **Design Parameters:**
  - Design Catchment Area: $18.5\text{ km}^2$
  - Design Peak Discharge ($Q_{50}$): $85.0\text{ m}^3/\text{s}$
  - Channel Geometry: Trapezoidal lined canal ($b = 12.0\text{ m}$, side slope $m = 1.0\text{ H:1.0V}$)
  - Bed Slope: $S_0 = 0.0008$
  - Roughness: Concrete invert ($n = 0.016$), stone masonry walls with weed growth ($n = 0.028$)
- **Simulation Deliverable:** 2D water surface elevation profile across bridge constrictions; identify minimum levee freeboard required to prevent overtopping.

### Scenario B: Arkavathi Basin Diversion Weir & Sluice Gate Chute (Hesaraghatta Catchment)
- **Problem Statement:** Design a river diversion weir and energy dissipation stilling basin downstream of an irrigation reservoir to protect agricultural soil from high-velocity scouring.
- **Design Parameters:**
  - Peak Inflow: $Q = 140\text{ m}^3/\text{s}$
  - Broad-Crested Weir Crest Height: $P = 2.5\text{ m}$, Crest Length: $L = 25.0\text{ m}$
  - Downstream Chute Slope: $S_0 = 0.04$ (Steep)
  - Tailwater Depth in River: $y_t = 2.80\text{ m}$
- **Simulation Deliverable:** Compute conjugate depth $y_2$ and energy loss $E_L$; model hydraulic jump stability inside the USBR Type II stilling basin using HEC-RAS 2D and compare with flume experiment L06.

### Scenario C: Cauvery Water Supply Pipeline Surge & Pump Duty Matching
- **Problem Statement:** Model multi-stage centrifugal pumping station lifting water from T.K. Halli water treatment plant to Bengaluru master balancing reservoirs against static lift and pipe friction.
- **Design Parameters:**
  - Static Lift: $H_{\text{stat}} = 380\text{ m}$
  - Delivery Pipeline: Mild steel mortar-lined ($D = 1800\text{ mm}$, Length $L = 28\text{ km}$, Hazen-Williams $C = 130$)
  - Required Delivery Discharge: $Q = 3.5\text{ m}^3/\text{s}$
- **Simulation Deliverable:** Select number of pumps in parallel/series, determine operating duty point, calculate Net Positive Suction Head ($\text{NPSH}_{\text{avail}}$ vs $\text{NPSH}_{\text{req}}$), and model friction work savings with surge vessels.

---

<!--tab:Evaluation Rubrics-->
## Comprehensive NAAC / NBA Assessment Rubrics (Total: 70 Marks)

### Stage I Rubric: Analytical Formulation (10 Marks)
| Criteria | Below Expectations (0–2) | Satisfactory (3–5) | Good (6–8) | Exemplary (9–10) |
| :--- | :--- | :--- | :--- | :--- |
| **Problem Formulation & Theory (PO1, PO2)** | Vague problem statement; incorrect or incomplete governing equations. | Basic problem stated; standard equations identified without parameter justification. | Clear engineering context; correct governing equations with physical assumptions noted. | Rigorous civil engineering formulation; complete boundary conditions and sensitivity bounds. |
| **Spreadsheet Architecture & Accuracy (PO5)** | Manual arithmetic with syntax errors; no automated formulas. | Basic Excel sheet; formulas hardcoded without dynamic cell references. | Well-organized workbook with parameter inputs, solver tables, and parametric charts. | Fully dynamic parametric solver with iterative macro/goal-seek, error trapping, and clean UI. |

### Stage II Rubric: Laboratory / Experimental Verification (10 Marks)
| Criteria | Below Expectations (0–2) | Satisfactory (3–5) | Good (6–8) | Exemplary (9–10) |
| :--- | :--- | :--- | :--- | :--- |
| **Data Collection & Accuracy (PO4)** | Missing observation records; unexplained outliers; no replication. | Raw readings taken but missing calibration checks or units. | Clean observation tables with repeated trials and proper instrument zeroing. | High-fidelity experimental data; uncertainty error propagation ($\pm \Delta x$); flawless documentation. |
| **Analytical vs Experimental Comparison (PO2)** | No quantitative comparison; superficial narrative. | Percentage error reported without explaining discrepancies. | Error tabulated; friction losses and non-ideal velocity distributions discussed. | Rigorous discrepancy analysis explaining 3D streamline curvature, boundary friction, and vena contracta losses. |

### Stage III Rubric: 2D Simulation, Technical Report & Defense (50 Marks)
| Criteria | Weight | Unsatisfactory (0–40%) | Developing (41–60%) | Proficient (61–80%) | Exemplary (81–100%) |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **2D Mesh & Terrain Preprocessing (PO3, PO5)** | 10 | Distorted cells; no breaklines; mesh crashes during run. | Structured grid with boundary leakage; coarse resolution. | Aligned unstructured mesh; breaklines along levees; stable run. | Subgrid bathymetry enabled; high-resolution refinement zones; zero levee seepage; stable run. |
| **Boundary Conditions & Stability (PO1, PO5)** | 10 | Unphysical boundary reflections; Courant number $Cr > 5.0$; solver divergence. | Fixed boundaries cause oscillations; excessive time step smearing. | Well-posed boundary hydrographs; $Cr \le 1.0$ explicit or $Cr \le 2.0$ implicit. | Mathematically well-posed; adaptive time-stepping; mass conservation error $< 0.1\%$. |
| **3-Way Validation Analysis (PO2, PO4)** | 10 | Only simulation presented; no comparison with Stage I & II. | Basic side-by-side plot; large unexplained discrepancies. | Tabulated comparison of depths and velocities with RMSE and NSE metric. | Comprehensive 3-way error matrix (Analytical vs Lab vs 2D CFD); Nash-Sutcliffe $\text{NSE} > 0.85$. |
| **Technical Report Quality (PO10)** | 10 | Incomplete sections; missing citations; poor formatting. | Standard report with basic figures; grammatical errors. | Formatted IEEE/ASCE style report with high-res velocity vector plots and tables. | Publication-grade report; clear executive summary; professional vector graphics; complete code/data appendices. |
| **Oral Presentation & Viva Defense (PO10)** | 10 | Unable to explain basic physics or simulation mechanics. | Relies heavily on slides; partial understanding of equations. | Clear team presentation; answers technical questions with confidence. | Mastery of fluid mechanics; effortless defense of boundary conditions, mesh convergence, and design limits. |

---

<!--tab:Deliverables Checklist-->
## Submission Checklists & Formatting Guidelines

### Final Report Structure (PDF Submission)
1. **Title Page:** Project title, student names, register numbers, course code CE432P, instructor name.
2. **Executive Summary:** 250-word synthesis of problem, methodology, key findings, and percentage error.
3. **Introduction & Engineering Context:** Problem significance to Karnataka / Indian water resources.
4. **Governing Hydraulic Equations:** Rigorous mathematical statements with "in words" descriptions.
5. **Stage I: Analytical Formulation:** Spreadsheet architecture, governing curves, and sensitivity analysis.
6. **Stage II: Experimental Observations:** Laboratory flume procedures, raw tables, and empirical coefficients.
7. **Stage III: 2D Hydrodynamic Model:** DEM source, mesh cell count, breakline layout, Manning's $n$ zones, and CFL stability parameters.
8. **3-Way Validation & Discussion:** Comparative water surface profiles, velocity vector plots, RMSE, and NSE goodness-of-fit.
9. **Engineering Recommendations:** Concrete channel sizing, stilling basin baffle dimensions, or pump station schedule.
10. **References:** Standard ASCE/IS code citations (IS:4410, USACE HEC-RAS Manual, Modi & Seth).
