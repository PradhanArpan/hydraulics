# CE432P — Hydraulic Engineering Course Delivery Hub
[![GitHub Pages](https://img.shields.io/badge/Live_Portal-GitHub_Pages-blue.svg)](https://pradhanarpan.github.io/hydraulics/)
[![Course](https://img.shields.io/badge/Course-CE432P_Hydraulic_Engineering-gold.svg)](https://pradhanarpan.github.io/hydraulics/)
[![Credits](https://img.shields.io/badge/Credits-3--0--1_(4)-green.svg)](https://pradhanarpan.github.io/hydraulics/)

Official course delivery portal and computational repository for **CE432P: Hydraulic Engineering**, offered in the BTech Civil Engineering curriculum at School of Engineering and Technology, Christ University.

---

## 🌐 Live Interactive Portal
Access the student course portal directly on GitHub Pages:  
👉 **[https://pradhanarpan.github.io/hydraulics/](https://pradhanarpan.github.io/hydraulics/)**

---

## 📚 Course Overview
- **Course Code:** CE432P
- **Course Title:** Hydraulic Engineering
- **Department:** Department of Civil Engineering, Christ University
- **Credits:** 4 (L:3, T:0, P:1)
- **Contact Hours:** 45 Hours Theory + 30 Hours Integrated Laboratory
- **Evaluation Scheme:** CIA 70 Marks | ESE 30 Marks | Total 100 Marks

### Course Outcomes (COs)
- **CO1:** Understand the fundamental concepts of boundary layer theory, laminar/turbulent profiles, and drag mechanics. (L2, L3)
- **CO2:** Determine the most economical channel section and calibrate open-channel flow measuring devices. (L3, L4)
- **CO3:** Analyse the hydrodynamic force exerted by jets on stationary and moving plates/vanes with velocity triangles. (L4)
- **CO4:** Analyse the operating characteristics of hydraulic machines (Pelton, Francis, Kaplan turbines; centrifugal & reciprocating pumps) for optimal efficiency. (L4)
- **CO5:** Explain and apply computational fluid dynamics (CFD) and 2D numerical hydrodynamic modeling (HEC-RAS 2D & OpenFOAM) in water resources engineering. (L2, L5)

---

## 🗂 Repository Structure
```
├── index.html                   # Interactive Course Delivery Portal (GitHub Pages)
├── sessions.json                # Instructor Session Unlock Config (JSON API)
├── .nojekyll                    # Ensures GitHub Pages serves all raw assets
├── Unit1_BoundaryLayer/         # Days 1–6: Boundary layer theory & drag mechanics
│   └── CE432P_U1_Day1.ipynb     # Jupyter notebook: Boundary layer velocity profiles
├── Unit2_OpenChannelFlow/       # Days 7–16: Open channel flow, Manning, jump & GVF
│   └── CE432P_U2_Day11.ipynb    # Jupyter notebook: Normal depth solver & specific energy
├── Unit3_ImpactOfJets/          # Days 17–26: Jet impulse-momentum & velocity triangles
│   └── CE432P_U3_Day21.ipynb    # Jupyter notebook: Moving vane dynamics & efficiency
├── Unit4_HydraulicMachines/     # Days 27–37: Turbines, centrifugal pumps & system matching
│   └── CE432P_U4_Day34.ipynb    # Jupyter notebook: Pump selection & operating point
├── Unit5_CFD/                   # Days 38–45: Hydrodynamic CFD, OpenFOAM & HEC-RAS 2D
│   └── CE432P_U5_Day43.ipynb    # Jupyter notebook: 1D hydrodynamic routing simulation
├── Laboratory/                  # 15-week lab schedule & 12 experiment guides
│   └── README.md
├── MiniProject/                 # 3-Stage mini-project guidelines & 15 topics catalog
│   └── README.md
└── README.md
```

---

## ⚙ Instructor Workflow (Unlocking Sessions)
1. Open [`sessions.json`](https://github.com/PradhanArpan/hydraulics/edit/main/sessions.json).
2. Locate the corresponding lecture Day (e.g. Day 8).
3. Change `"enabled": false` to `"enabled": true`.
4. Click **Commit changes**.
5. The live web portal at [https://pradhanarpan.github.io/hydraulics/](https://pradhanarpan.github.io/hydraulics/) automatically unlocks the session resources within ~60 seconds.

---

## 📖 Prescribed Textbooks & References
1. **Modi, P.N. and Seth, S.M.** (2017). *Hydraulics and Fluid Mechanics Including Hydraulics Machines*, Standard Book House, 21st Edition.
2. **Bansal, R.K.** (2018). *Fluid Mechanics and Hydraulic Machines*, Laxmi Publications, Revised 9th Edition.
3. **Chow, Ven Te** (1993). *Open-Channel Hydraulics*, McGraw-Hill, New Delhi.
4. **Subramanya, K.** *Flow in Open Channels*, Tata McGraw-Hill.
5. **Hoffmann, K.A.** *Computational Fluid Dynamics*, Engineering Education System.
