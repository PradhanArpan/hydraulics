import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S37: Foundations of CFD & 2D Depth-Averaged Shallow Water Equations (SWE)
# =========================================================================
s37 = r"""<!--tab:Theory & Derivations-->
> [!note] From 3D Navier-Stokes to 2D Shallow Water Equations
> While 3D Navier-Stokes equations capture every microscopic turbulent swirl, full 3D CFD over a $50 \text{ km}$ river reach would require billions of grid cells and months of supercomputing time. For broad, shallow natural rivers where vertical acceleration is negligible compared to gravity ($\lambda \gg h$), integrating the 3D Navier-Stokes equations across depth yields the **2D Depth-Averaged Shallow Water Equations (SWE)**—the mathematical engine behind HEC-RAS 2D, TELEMAC-2D, and TUFLOW.

## 1. Depth-Integration of Continuity and Momentum
Starting from the 3D incompressible Navier-Stokes equations:
$$\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0$$
Integrating vertically from the channel bed $z_b(x,y)$ to the water surface $z_s(x,y) = z_b + h$:
By applying Leibniz's Integral Rule and kinematic boundary conditions at the surface and bed:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Bed Topography -->
    <path d="M 60,180 Q 240,160 420,185 T 700,165" fill="none" stroke="#718096" stroke-width="3"/>
    <text x="680" y="195" fill="#718096" font-size="11" font-weight="700">Bed zb(x,y)</text>

    <!-- Water Surface -->
    <path d="M 60,70 Q 240,65 420,75 T 700,60" fill="none" stroke="#2b6cb0" stroke-width="2.5"/>
    <text x="680" y="55" fill="#2b6cb0" font-size="11" font-weight="700">Surface zs(x,y)</text>

    <!-- Depth h -->
    <line x1="380" y1="73" x2="380" y2="182" stroke="#e53e3e" stroke-width="2"/>
    <text x="390" y="130" fill="#e53e3e" font-size="13" font-weight="700">Depth h(x,y,t)</text>

    <!-- Velocity vector profile -->
    <g transform="translate(180, 70)">
      <line x1="0" y1="0" x2="0" y2="95" stroke="#cbd5e0" stroke-width="1.5"/>
      <path d="M 0,95 Q 60,60 70,0" fill="none" stroke="#3182ce" stroke-width="2"/>
      <text x="40" y="-10" fill="#2b6cb0" font-size="11" font-weight="700">Depth-Averaged ū</text>
    </g>
  </svg>
</div>

1. **Continuity Equation (Mass Conservation):**
   $$\frac{\partial h}{\partial t} + \frac{\partial (h \bar{u})}{\partial x} + \frac{\partial (h \bar{v})}{\partial y} = q_{source}$$

2. **$x$-Momentum Conservation:**
   $$\frac{\partial (h \bar{u})}{\partial t} + \frac{\partial (h \bar{u}^2 + \frac{1}{2}g h^2)}{\partial x} + \frac{\partial (h \bar{u}\bar{v})}{\partial y} = -g h \frac{\partial z_b}{\partial x} - \frac{\tau_{bx}}{\rho} + \nu_t \nabla^2(h \bar{u}) + f_{Cor} h \bar{v}$$

3. **$y$-Momentum Conservation:**
   $$\frac{\partial (h \bar{v})}{\partial t} + \frac{\partial (h \bar{u}\bar{v})}{\partial x} + \frac{\partial (h \bar{v}^2 + \frac{1}{2}g h^2)}{\partial y} = -g h \frac{\partial z_b}{\partial y} - \frac{\tau_{by}}{\rho} + \nu_t \nabla^2(h \bar{v}) - f_{Cor} h \bar{u}$$

where:
- $h$ is local water depth ($z_s - z_b$)
- $\bar{u}, \bar{v}$ are depth-averaged velocity components
- $\frac{1}{2}g h^2$ represents the depth-integrated hydrostatic pressure thrust
- $\tau_{bx} = \rho g n^2 \bar{u}\sqrt{\bar{u}^2 + \bar{v}^2} / h^{1/3}$ is the bottom boundary friction shear via Manning's formula
- $f_{Cor} = 2\Omega \sin \phi$ is the Coriolis frequency parameter

## 2. Vector Conservative Form
In matrix vector notation:
$$\frac{\partial \mathbf{U}}{\partial t} + \frac{\partial \mathbf{F}(\mathbf{U})}{\partial x} + \frac{\partial \mathbf{G}(\mathbf{U})}{\partial y} = \mathbf{S}(\mathbf{U})$$
where $\mathbf{U} = [h, hu, hv]^T$ is the conserved state vector, $\mathbf{F}, \mathbf{G}$ are advective/pressure flux vectors, and $\mathbf{S}$ represents bed slope, friction, and Coriolis source terms.

<!--tab:Worked Examples-->
### Example 37.1: Hydrostatic Pressure Thrust and Momentum Flux
**Problem:** A river flood plain channel of unit width ($b = 1.0 \text{ m}$) carries a depth of $h = 3.5 \text{ m}$ with depth-averaged velocity $\bar{u} = 2.2 \text{ m/s}$. Water density is $\rho = 1000 \text{ kg/m}^3$.
Calculate:
1. Total discharge per unit width $q$.
2. The dynamic momentum flux term $\rho h \bar{u}^2$.
3. The depth-integrated hydrostatic pressure thrust $\frac{1}{2}\rho g h^2$.
4. Total flux vector component in the $x$-direction.

**Solution:**
1. Unit Discharge:
   $$q = h \bar{u} = 3.5 \times 2.2 = \mathbf{7.70 \text{ m}^2/\text{s}}$$

2. Dynamic Momentum Flux:
   $$\Pi_{dyn} = \rho h \bar{u}^2 = 1000 \times 3.5 \times (2.2)^2 = 3500 \times 4.84 = \mathbf{16,940 \text{ N/m}}$$

3. Hydrostatic Pressure Thrust:
   $$\Pi_{press} = \frac{1}{2}\rho g h^2 = 0.5 \times 1000 \times 9.81 \times (3.5)^2 = 4905 \times 12.25 = \mathbf{60,086 \text{ N/m}}$$

4. Total Flux Component:
   $$\mathbf{F}_x = \Pi_{dyn} + \Pi_{press} = 16,940 + 60,086 = \mathbf{77,026 \text{ N/m} = 77.03 \text{ kN/m}}$$
   *Physical Observation:* In subcritical river flow ($Fr = 2.2/\sqrt{9.81 \times 3.5} = 0.376$), hydrostatic pressure thrust dwarfs dynamic momentum by a ratio of $3.5 : 1$!

<!--tab:Interactive Workbench-->
### 2D Hydrodynamic Mesh & Courant Simulator
Simulate 2D cell parameters, shallow water flux balances, and Courant numbers:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c37_1",
    "question": "For a depth h = 4.0 m and u = 2.0 m/s in water (rho = 1000 kg/m³), compute the hydrostatic pressure thrust 0.5*rho*g*h² in N/m.",
    "answer": 78480.0,
    "tol": 200.0,
    "unit": "N/m",
    "hint": "0.5 * 1000 * 9.81 * 16.0.",
    "solution": "0.5 * 1000 * 9.81 * 16.0 = 78,480 N/m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Under which hydrodynamic condition is the Shallow Water Equation (SWE) depth-integration physically valid?",
    "options": [
      "When flow depth is much larger than wavelength (h >> λ)",
      "When vertical accelerations are negligible compared to gravity (hydrostatic pressure distribution, h << λ)",
      "When flow is strictly laminar",
      "When viscosity is infinite"
    ],
    "answer": 1,
    "explanation": "SWE assumes that the horizontal length scale is much larger than vertical depth (shallow water assumption), ensuring vertical acceleration ∂w/∂t ≈ 0 and the vertical pressure distribution remains strictly hydrostatic."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Subgrid Bathymetry Innovation (HEC-RAS 2D):**
   Classical 2D models require microscopic cells to capture small ditches and road curbs. HEC-RAS 2D revolutionizes this by pre-computing hydraulic property tables ($A-z, V-z$) for high-resolution LiDAR subgrids inside each coarse computational cell, permitting cell sizes up to $50 \text{ m}$ while preserving millimeter-accurate storage.
"""

# =========================================================================
# S38: Mathematical Classification of PDEs & Finite Volume Discretization
# =========================================================================
s38 = r"""<!--tab:Theory & Derivations-->
> [!note] The Finite Volume Method (FVM)
> In computational hydraulics, the **Finite Volume Method (FVM)** is universally preferred over Finite Differences or Finite Elements because it guarantees **strict, conservative mass and momentum conservation** even on unstructured polygonal meshes with discontinuous shock waves (such as hydraulic jumps and dam-break bores).

## 1. Classification of Hydrodynamic PDEs
Second-order partial differential equations $A \frac{\partial^2 \phi}{\partial x^2} + B \frac{\partial^2 \phi}{\partial x \partial y} + C \frac{\partial^2 \phi}{\partial y^2} + \dots = 0$ are classified by their discriminant:

| Discriminant | PDE Type | Physical Nature | Numerical Example |
| :--- | :--- | :--- | :--- |
| **$B^2 - 4AC > 0$** | **Hyperbolic** | Wave propagation, directional characteristics | **Unsteady 2D Shallow Water Equations** |
| **$B^2 - 4AC = 0$** | **Parabolic** | Dissipation, diffusion, boundary layer growth | Boundary layer equation, heat diffusion |
| **$B^2 - 4AC < 0$** | **Elliptic** | Equilibrium, steady boundary value | Laplace potential flow $\nabla^2 \phi = 0$ |

Because the 2D SWE is **hyperbolic**, disturbances propagate along characteristic lines at wave speeds $\lambda = u \pm \sqrt{gh}$.

## 2. Finite Volume Discretization on an Arbitrary Polygonal Cell
Integrating the vector conservation equation over an arbitrary 2D cell $\Omega_i$ bounded by edges $j$:
$$\iint_{\Omega_i} \frac{\partial \mathbf{U}}{\partial t} dA + \iint_{\Omega_i} \nabla \cdot \mathbf{E} \, dA = \iint_{\Omega_i} \mathbf{S} \, dA$$
Applying Gauss's Divergence Theorem:
$$\Omega_i \frac{d\mathbf{U}_i}{dt} + \sum_{j=1}^{N_{faces}} \mathbf{F}_n(\mathbf{U}_{L}, \mathbf{U}_{R}) \Delta L_j = \mathbf{S}_i \Omega_i$$
where:
- $\Omega_i$ is the 2D cell area
- $\Delta L_j$ is the length of face $j$
- $\mathbf{F}_n = \mathbf{F} n_x + \mathbf{G} n_y$ is the normal numerical flux computed using a **Riemann solver** (such as Roe, HLL, or HLLC) that resolves discontinuous wave shocks between left cell state $\mathbf{U}_L$ and right cell state $\mathbf{U}_R$.

<!--tab:Worked Examples-->
### Example 38.1: FVM Mass Balance Across a Polygonal Cell
**Problem:** An irregular quadrilateral computational cell has surface area $\Omega = 400 \text{ m}^2$. Water depth at time $t_0$ is $h = 2.0 \text{ m}$. Four faces have the following normal unit discharges:
- Face 1 ($L_1 = 20 \text{ m}$): $q_{n1} = +1.5 \text{ m}^2/\text{s}$ (Inflow)
- Face 2 ($L_2 = 25 \text{ m}$): $q_{n2} = +0.8 \text{ m}^2/\text{s}$ (Inflow)
- Face 3 ($L_3 = 20 \text{ m}$): $q_{n3} = -1.8 \text{ m}^2/\text{s}$ (Outflow)
- Face 4 ($L_4 = 15 \text{ m}$): $q_{n4} = -1.2 \text{ m}^2/\text{s}$ (Outflow)
If rainfall adds a net source term of $P = 36 \text{ mm/hr}$, compute the water depth $h$ after a time step of $\Delta t = 10 \text{ s}$.

**Solution:**
1. **Total Net Boundary Inflow Rate:**
   $$\sum Q_{in} = (1.5 \times 20) + (0.8 \times 25) = 30.0 + 20.0 = 50.0 \text{ m}^3/\text{s}$$
   $$\sum Q_{out} = (1.8 \times 20) + (1.2 \times 15) = 36.0 + 18.0 = 54.0 \text{ m}^3/\text{s}$$
   $$\text{Net Boundary Volumetric Flux } \sum Q_{net} = 50.0 - 54.0 = \mathbf{-4.0 \text{ m}^3/\text{s}}$$

2. **Rainfall Inflow Rate:**
   $$P = \frac{36 \times 10^{-3} \text{ m}}{3600 \text{ s}} = 1.0 \times 10^{-5} \text{ m/s}$$
   $$Q_{rain} = P \times \Omega = (1.0 \times 10^{-5}) \times 400 = \mathbf{0.004 \text{ m}^3/\text{s}}$$

3. **Rate of Depth Change:**
   $$\frac{\Delta h}{\Delta t} = \frac{\sum Q_{net} + Q_{rain}}{\Omega} = \frac{-4.0 + 0.004}{400} = \frac{-3.996}{400} = -0.00999 \text{ m/s}$$

4. **New Depth after $\Delta t = 10 \text{ s}$:**
   $$h(t_0 + 10) = 2.0 + (-0.00999 \times 10) = 2.0 - 0.0999 = \mathbf{1.900 \text{ m}}$$

<!--tab:Interactive Workbench-->
### FVM Mesh & Flux Balance Simulator
Examine face normal flux summation and conservation balance:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c38_1",
    "question": "A cell of area 100 m² has net inflow of 5 m³/s for 20 seconds. What is the depth increase Δh in meters?",
    "answer": 1.0,
    "tol": 0.02,
    "unit": "m",
    "hint": "Δh = (Q_net * Δt) / Area = (5 * 20) / 100.",
    "solution": "Δh = 100 / 100 = 1.0 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the Finite Volume Method (FVM) uniquely superior to Finite Difference methods for modeling dam-break flood waves?",
    "options": [
      "FVM requires no computer memory",
      "FVM is intrinsically conservative in integral form, capturing discontinuities and shock waves without generating numerical mass errors",
      "FVM eliminates the need for boundary conditions",
      "FVM equations are linear"
    ],
    "answer": 1,
    "explanation": "Because FVM balances fluxes across cell faces, whatever leaves one cell enters the neighbor identically, guaranteeing exact mass and momentum conservation even across steep bores."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Cell Face Alignment with Flow (Mesh Orthogonality):**
   In 2D hydrodynamic meshes, cell faces must be aligned perpendicular to the dominant channel flow direction. Excessive non-orthogonality ($> 30^\circ$) generates false numerical diffusion, artificially attenuating flood peaks.
"""

# =========================================================================
# S39: Numerical Stability & Courant-Friedrichs-Lewy (CFL) Condition
# =========================================================================
s39 = r"""<!--tab:Theory & Derivations-->
> [!note] The Law of Numerical Stability
> In explicit hyperbolic numerical schemes, the computational time step $\Delta t$ is strictly bound by the **Courant-Friedrichs-Lewy (CFL) condition (1928)**. If information travels faster across the grid than the numerical scheme can sample it, numerical instabilities explode exponentially!

## 1. Physical Derivation of the CFL Condition
In shallow water flow, information propagates at the sum of fluid flow velocity and shallow water wave celerity:
$$c = \sqrt{g h}$$
Total wave propagation speed in 2D:
$$\lambda_{max} = \sqrt{u^2 + v^2} + \sqrt{g h} = V + c$$

The **Courant Number ($CFL$)** represents the ratio of physical wave travel distance in one time step to the spatial grid cell size $\Delta x$:
$$CFL = \frac{(V + \sqrt{g h})\Delta t}{\Delta x} \le CFL_{max}$$

- For **Explicit Schemes (e.g. classical FVM, TVD-MacCormack):**
  $$CFL \le 1.0 \implies \Delta t \le \frac{\Delta x}{V + \sqrt{g h}}$$
- For **Implicit / Semi-Implicit Schemes (e.g. HEC-RAS 2D Diffusion Wave):**
  Stable for $CFL \le 2.0 \text{ to } 5.0$, though accuracy diminishes as $CFL > 1$.

## 2. Adaptive Time-Stepping Algorithm
To maintain stability during flood surges without wasting computation during low flows, hydraulic engines employ **dynamic adaptive time stepping**:
$$\Delta t_{new} = CFL_{target} \cdot \min_{all\ cells}\left(\frac{\Delta x_i}{V_i + \sqrt{g h_i}}\right)$$

<!--tab:Worked Examples-->
### Example 39.1: Stability Audit and Time Step Determination
**Problem:** A 2D hydraulic flood model has a minimum grid cell size of $\Delta x = 12.0 \text{ m}$. During a dam-break simulation, maximum flood depth reaches $h = 6.0 \text{ m}$ with velocity $V = 4.5 \text{ m/s}$.
1. Calculate the shallow water wave celerity $c$.
2. Determine the maximum allowable time step $\Delta t_{max}$ for an explicit scheme ($CFL \le 0.90$).
3. If an engineer mistakenly runs the model at $\Delta t = 2.0 \text{ s}$, calculate the resulting Courant number and diagnose model behavior.

**Solution:**
1. **Wave Celerity:**
   $$c = \sqrt{g h} = \sqrt{9.81 \times 6.0} = \sqrt{58.86} = \mathbf{7.672 \text{ m/s}}$$
   Total maximum characteristic speed:
   $$\lambda_{max} = V + c = 4.5 + 7.672 = \mathbf{12.172 \text{ m/s}}$$

2. **Maximum Allowable Time Step:**
   $$\Delta t \le CFL \cdot \frac{\Delta x}{\lambda_{max}} = 0.90 \times \frac{12.0}{12.172} = 0.90 \times 0.9859 = \mathbf{0.887 \text{ s}}$$
   *Engineering Recommendation:* Set the model maximum time step to **$\Delta t = 0.85 \text{ s}$**.

3. **Crash Diagnosis for $\Delta t = 2.0 \text{ s}$:**
   $$CFL = \frac{\lambda_{max} \Delta t}{\Delta x} = \frac{12.172 \times 2.0}{12.0} = \frac{24.344}{12.0} = \mathbf{2.029}$$
   *Diagnosis:* Since $CFL = 2.03 \gg 1.0$, the scheme violates the physical domain of dependence. Numerical roundoff errors will amplify into catastrophic NaN ("Blow-up") oscillations, terminating the simulation with negative water depth errors!

<!--tab:Interactive Workbench-->
### CFL Stability & Courant Number Workbench
Interactively adjust grid spacing, flood depth, and time steps to monitor numerical stability:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c39_1",
    "question": "For h = 4.0 m (c = sqrt(9.81*4) = 6.264 m/s), V = 1.736 m/s, and Δx = 20 m, calculate the maximum stable Δt for CFL = 1.0.",
    "answer": 2.5,
    "tol": 0.05,
    "unit": "s",
    "hint": "λ = V + c = 1.736 + 6.264 = 8.0 m/s. Δt = 20 / 8.0.",
    "solution": "Δt = 20 / 8.0 = 2.5 s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What is the physical meaning of a Courant number CFL = 1.0 in a 2D hydrodynamic model?",
    "options": [
      "Water moves one meter per hour",
      "A fluid gravity wave travels exactly the distance of one cell width in one time step",
      "Discharge is at critical state",
      "Viscous dissipation equals zero"
    ],
    "answer": 1,
    "explanation": "CFL = (V + c)Δt / Δx = 1.0 means the physical wave front travels exactly across the width of a single computational grid cell during the span of one time step."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **HEC-RAS 2D Courant Rules of Thumb:**
   - For **Full Momentum (SWE):** Keep $CFL \le 1.0$ (typically $0.8 - 0.9$) for sharp wave fronts and dam-break surges.
   - For **Diffusion Wave (DWE):** The inertia terms are dropped, allowing stable execution at $CFL \le 2.0 - 3.0$ for slow river rises, speeding up multi-week simulations 10-fold.
"""

# =========================================================================
# S40: 2D Grid Generation, Mesh Types & Subgrid Bathymetry
# =========================================================================
s40 = r"""<!--tab:Theory & Derivations-->
> [!note] The Spatial Discretization Architecture
> A hydrodynamic model is only as good as its computational mesh. The grid defines how topography, bathymetry, and hydraulic obstructions (levees, road embankments) are transferred into mathematical calculation cells.

## 1. Mesh Topology: Structured vs Unstructured
1. **Structured Orthogonal Grids (Cartesian / Curvilinear):**
   Cells are indexed by regular $(i,j)$ arrays. Easy to compute, but cannot conform to meandering river bends and require billions of cells to resolve narrow levees.
2. **Unstructured Triangular / Polygonal Grids:**
   Cells have arbitrary shapes (triangles, quads, hexagons) and variable node connectivity. Can refine locally around bridge piers while keeping coarse cells on wide flood plains.

## 2. Breaklines and Hydraulic Alignment
A **breakline** is a 3D polyline defining linear topographic ridges (levee crests, road crowns, channel banks):
- When a mesh is generated **without breaklines**, cell faces cross the levee obliquely. The levee height is averaged down into the cell, creating "digital leaks" where flood water prematurely spills across high embankments!
- When **enforced with breaklines**, cell edges align strictly along the levee crest, ensuring the true barrier elevation is preserved.

## 3. The HEC-RAS 2D Subgrid Bathymetry Revolution
Rather than assuming a flat cell bottom, HEC-RAS extracts detailed elevation-volume ($V-z$) curves and face elevation-area ($A-z$) curves from underlying high-resolution LiDAR ($1 \times 1 \text{ m}$):

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Cell Boundary -->
    <rect x="120" y="30" width="500" height="150" fill="none" stroke="#2b6cb0" stroke-width="2" stroke-dasharray="6,4"/>
    <text x="370" y="22" fill="#2b6cb0" font-size="12" font-weight="700" text-anchor="middle">50m × 50m Computational Cell</text>

    <!-- Underlying high-res LiDAR contour -->
    <path d="M 120,150 Q 220,175 320,130 Q 420,80 500,140 L 620,160" fill="none" stroke="#a0aec0" stroke-width="2"/>
    <text x="560" y="130" fill="#718096" font-size="10">High-Res LiDAR (1m)</text>

    <!-- Partial Wetting -->
    <path d="M 170,165 Q 220,175 270,165 Z" fill="#63b3ed" fill-opacity="0.7"/>
    <text x="220" y="160" fill="#2b6cb0" font-size="11" font-weight="700">Subgrid Wetting</text>
  </svg>
</div>

A $50 \text{ m}$ cell can be **partially wet**, permitting water to pool in low ditches without wetting the entire cell!

<!--tab:Worked Examples-->
### Example 40.1: Subgrid Cell Storage Volume Computation
**Problem:** A $20 \text{ m} \times 20 \text{ m}$ computational cell ($\Omega = 400 \text{ m}^2$) has an underlying triangular ditch with bottom elevation $z_{min} = 100.0 \text{ m}$ and top flat terrace at $z = 102.0 \text{ m}$. The wetted area as a function of water stage $z$ is:
$$A_{wet}(z) = 100 (z - 100)^2 \quad \text{for } 100.0 \le z \le 102.0 \text{ m}$$
1. Compute the stored water volume $V(z)$ at stage $z = 101.5 \text{ m}$.
2. If water stage rises from $101.0 \text{ m}$ to $101.5 \text{ m}$, calculate the net volume absorbed by the subgrid cell.

**Solution:**
1. **Integrated Storage Volume:**
   $$V(z) = \int_{z_{min}}^z A_{wet}(\zeta) d\zeta = \int_{100.0}^z 100 (\zeta - 100)^2 d\zeta = \frac{100}{3}(z - 100)^3$$
   At stage $z = 101.5 \text{ m}$:
   $$V(101.5) = \frac{100}{3}(101.5 - 100)^3 = \frac{100}{3}(1.5)^3 = \frac{100}{3}(3.375) = \mathbf{112.5 \text{ m}^3}$$

2. **Volume Absorbed between $101.0 \text{ m}$ and $101.5 \text{ m}$:**
   $$V(101.0) = \frac{100}{3}(101.0 - 100)^3 = \frac{100}{3}(1.0)^3 = \mathbf{33.33 \text{ m}^3}$$
   $$\Delta V = V(101.5) - V(101.0) = 112.5 - 33.33 = \mathbf{79.17 \text{ m}^3}$$

<!--tab:Interactive Workbench-->
### Subgrid Bathymetry & Mesh Generation Simulator
Explore cell refinement and breakline alignment:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c40_1",
    "question": "For a flat cell of area 900 m², calculate the volume of water stored in m³ when water depth is 1.5 m.",
    "answer": 1350.0,
    "tol": 10.0,
    "unit": "m³",
    "hint": "Volume = Area * depth = 900 * 1.5.",
    "solution": "Volume = 900 * 1.5 = 1350 m³."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why must breaklines be enforced along road embankments and levees in a 2D mesh?",
    "options": [
      "To increase the speed of sound",
      "To align computational cell faces along the barrier crest, preventing artificial digital leakage across the levee",
      "To double the number of cells",
      "To convert 2D equations into 1D"
    ],
    "answer": 1,
    "explanation": "Enforcing breaklines guarantees that cell faces match the physical levee ridge, preserving the true barrier crest elevation in face property tables."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Cell Size Transition Ratios (USACE EM 1110-2-1601):**
   When transitioning from coarse flood plain cells ($40 \text{ m}$) to fine river channel cells ($10 \text{ m}$), adjacent cell dimension ratios should never exceed $2 : 1$. Abrupt $10 : 1$ cell size transitions trigger artificial numerical wave reflections.
"""

# =========================================================================
# S41: Hydraulic Boundary Conditions & Spatial Manning Roughness
# =========================================================================
s41 = r"""<!--tab:Theory & Derivations-->
> [!note] Driving the Numerical Engine
> A 2D hydrodynamic simulation is mathematically governed by its boundary conditions. Specifying physically incompatible boundary conditions is the number one cause of model instability and simulation failure.

## 1. Upstream & Downstream Boundary Condition Types
1. **Flow Hydrograph ($Q(t)$):** Prescribes discharge vs time. Applied at upstream inflows. The model calculates water surface elevation dynamically.
2. **Stage Hydrograph ($z(t)$):** Prescribes water level vs time. Mandatory for tidal estuaries and reservoir boundary connections.
3. **Rating Curve ($Q-z$):** Prescribes an empirical or calculated stage-discharge relationship (e.g. at a downstream weir or gauging station).
4. **Normal Depth ($S_0$):** Energy slope boundary. The model computes downstream depth using Manning's equation based on the specified friction slope. Excellent for open downstream flood plain exits!

## 2. Spatial Manning Roughness Mapping
Roughness is not uniform across a basin. Using GIS land-use layers (e.g. USGS NLCD, ESRI Land Cover), spatially variable Manning $n$ polygons are classified:

| Land Cover Classification | Typical Manning's $n$ | Hydraulic Resistance Impact |
| :--- | :--- | :--- |
| **Main River Channel (Clean, gravel)** | $0.030 - 0.035$ | Low resistance; high velocity conveyance |
| **Agricultural Crops (Pasture, wheat)** | $0.045 - 0.060$ | Moderate resistance |
| **Dense Riparian Forest / Trees** | $0.100 - 0.160$ | High drag; retards flood peak, increases depth |
| **Urban Built-up / Residential** | $0.080 - 0.120$ | Flow blockage by building envelopes |

<!--tab:Worked Examples-->
### Example 41.1: Downstream Normal Depth Boundary Setup
**Problem:** A 2D model boundary line of width $B = 150 \text{ m}$ exits into a wide agricultural flood plain. Bed slope is $S_0 = 0.0012$, composite Manning roughness is $n = 0.045$. During the flood peak, total boundary outflow is $Q = 450 \text{ m}^3/\text{s}$.
1. Compute the boundary normal water depth $y_0$ under wide-channel assumption ($R \approx y$).
2. Determine the boundary water velocity and Froude number.

**Solution:**
1. **Normal Depth:**
   Unit discharge:
   $$q = \frac{Q}{B} = \frac{450}{150} = 3.0 \text{ m}^2/\text{s}$$
   From Manning's equation:
   $$q = \frac{1}{n} y_0^{5/3} S_0^{1/2} \implies y_0 = \left(\frac{q \cdot n}{S_0^{1/2}}\right)^{3/5}$$
   $$S_0^{1/2} = \sqrt{0.0012} = 0.03464$$
   $$y_0 = \left(\frac{3.0 \times 0.045}{0.03464}\right)^{0.6} = \left(\frac{0.135}{0.03464}\right)^{0.6} = (3.897)^{0.6} = \mathbf{2.263 \text{ m}}$$

2. **Velocity & Froude Number:**
   $$V = \frac{q}{y_0} = \frac{3.0}{2.263} = \mathbf{1.326 \text{ m/s}}$$
   $$Fr = \frac{V}{\sqrt{g y_0}} = \frac{1.326}{\sqrt{9.81 \times 2.263}} = \frac{1.326}{\sqrt{22.20}} = \frac{1.326}{4.712} = \mathbf{0.281}$$
   Since $Fr = 0.281 < 1.0$, flow is subcritical and the downstream normal depth boundary is hydraulically valid!

<!--tab:Interactive Workbench-->
### Boundary Condition & Roughness Simulator
Simulate upstream hydrograph injection and evaluate downstream water levels:

::widget[cfdmesh]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c41_1",
    "question": "For a channel with q = 2.0 m²/s, n = 0.03, and S0 = 0.001, compute normal depth y0 in meters.",
    "answer": 1.433,
    "tol": 0.03,
    "unit": "m",
    "hint": "y0 = [(2.0 * 0.03) / sqrt(0.001)]^(0.6).",
    "solution": "y0 = (0.06 / 0.03162)^0.6 = (1.8974)^0.6 = 1.433 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What happens if a supercritical boundary condition (Fr > 1) is mistakenly applied to a subcritical downstream boundary in an unsteady hydrodynamic model?",
    "options": [
      "The model runs twice as fast",
      "Artificial numerical shock waves reflect upstream from the boundary, creating severe water level instabilities and model crashing",
      "Manning's n drops to zero",
      "The hydrograph is smoothed"
    ],
    "answer": 1,
    "explanation": "In subcritical flow, physical characteristics travel upstream. Setting a rigid downstream condition inconsistent with oncoming flow sends spurious reflective shock waves back into the model domain."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Warm-Up Period (Initial Conditions):**
   A common mistake is starting a 2D flood simulation with dry channels. Sudden inflow slams into dry cells, triggering infinite gradient crashes. Professional standard requires a **warm-up period** (e.g. 12 to 24 hours of baseflow) to establish initial steady water profiles before ramping up the flood hydrograph.
"""

write_session("S37", s37)
write_session("S38", s38)
write_session("S39", s39)
write_session("S40", s40)
write_session("S41", s41)
print("Part 1 (S37-S41) generated successfully!")
