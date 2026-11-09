import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S15: Channel Transitions: Bed Hump, Width Contraction & Choking Phenomena
# =========================================================================
s15 = r"""<!--tab:Theory & Derivations-->
> [!note] Channel Transitions & Choking
> When open channels encounter structural transitions such as **bed humps ($\Delta z$)** or **width contractions ($\Delta B$)**, the available specific energy and flow geometry change abruptly. If the constriction exceeds a critical physical limit, **hydraulic choking** occurs, creating an upstream backwater surge.

## 1. Flow Over a Bed Hump ($\Delta z$)
Consider a horizontal frictionless rectangular channel of width $B$ with an upward bed step of height $\Delta z$:

<div style="background:var(--card,#f8fafc); border:1px solid var(--border,#e2e8f0); border-radius:8px; padding:16px; margin:20px 0; text-align:center;">
  <svg viewBox="0 0 740 220" style="width:100%; max-width:700px; height:auto; font-family:var(--sans,sans-serif);">
    <!-- Channel Bed with Hump -->
    <path d="M 60,180 L 260,180 Q 320,180 340,140 L 420,140 Q 440,180 500,180 L 700,180" fill="none" stroke="#4a5568" stroke-width="4"/>

    <!-- Water Body Subcritical -->
    <path d="M 60,70 L 260,70 Q 340,70 380,95 Q 420,70 500,70 L 700,70" fill="none" stroke="#2b6cb0" stroke-width="2.5"/>
    <text x="160" y="55" fill="#2b6cb0" font-size="12" font-weight="700">Subcritical Water Surface (Dips over hump)</text>

    <!-- Water Body Supercritical (Dashed) -->
    <path d="M 60,150 L 260,150 Q 340,150 380,105 Q 420,150 500,150 L 700,150" fill="none" stroke="#e53e3e" stroke-width="2" stroke-dasharray="4,4"/>
    <text x="560" y="135" fill="#c53030" font-size="11" font-weight="600">Supercritical Surface (Rises over hump)</text>

    <!-- Hump Height Δz -->
    <line x1="380" y1="180" x2="380" y2="140" stroke="#4a5568" stroke-width="2"/>
    <text x="390" y="165" fill="#4a5568" font-size="12" font-weight="700">Δz</text>

    <!-- Depth Labels -->
    <text x="160" y="125" fill="#2d3748" font-size="11">y₁</text>
    <text x="380" y="125" fill="#2d3748" font-size="11" text-anchor="middle">y₂</text>
  </svg>
</div>

Energy balance between section 1 (upstream) and section 2 (over hump):
$$E_1 = E_2 + \Delta z \implies E_2 = E_1 - \Delta z$$
- In **Subcritical flow ($Fr_1 < 1$)**: As $E$ decreases, depth **drops** ($y_2 < y_1$). Water surface dips!
- In **Supercritical flow ($Fr_1 > 1$)**: As $E$ decreases, depth **rises** ($y_2 > y_1$). Water surface heaves!

**Maximum Permissible Hump without Choking ($\Delta z_{max}$):**
At section 2, the minimum possible energy is $E_{min} = E_c = \frac{3}{2}y_c$:
$$\Delta z_{max} = E_1 - E_c = E_1 - 1.5 y_c$$
If $\Delta z > \Delta z_{max}$, the flow is **choked**. The upstream water level must back up, increasing upstream depth to $y_1'$ and upstream energy to $E_1' = E_c + \Delta z$.

## 2. Channel Width Contraction ($\Delta B$)
When a rectangular channel narrows from width $B_1$ to $B_2$ without bed elevation change:
$$E_1 = E_2 \quad (\text{Energy is conserved})$$
The unit discharge increases from $q_1 = Q/B_1$ to $q_2 = Q/B_2 > q_1$.
Critical depth at throat:
$$y_{c2} = \left(\frac{q_2^2}{g}\right)^{1/3} = \left(\frac{Q^2}{g B_2^2}\right)^{1/3}$$
The minimum throat width before choking occurs ($B_{2,min}$) corresponds to critical flow at section 2 ($E_1 = E_{c2} = 1.5 y_{c2}$):
$$B_{2,min} = \frac{Q}{\sqrt{g \left(\frac{2}{3}E_1\right)^3}}$$

<!--tab:Worked Examples-->
### Example 15.1: Critical Bed Hump and Choking Analysis
**Problem:** A rectangular channel $B = 3.0 \text{ m}$ carries $Q = 6.0 \text{ m}^3/\text{s}$ at an upstream depth of $y_1 = 1.8 \text{ m}$.
1. Determine upstream specific energy $E_1$ and Froude number $Fr_1$.
2. Calculate the maximum hump height $\Delta z_{max}$ that will not cause choking.
3. If a hump of height $\Delta z = 0.60 \text{ m} > \Delta z_{max}$ is constructed, compute the new upstream depth $y_1'$.

**Solution:**
1. Upstream Conditions:
   $$V_1 = \frac{Q}{B y_1} = \frac{6.0}{3.0 \times 1.8} = \frac{6.0}{5.4} = 1.111 \text{ m/s}$$
   $$E_1 = y_1 + \frac{V_1^2}{2g} = 1.8 + \frac{1.111^2}{2(9.81)} = 1.8 + 0.0629 = 1.863 \text{ m}$$
   $$Fr_1 = \frac{V_1}{\sqrt{g y_1}} = \frac{1.111}{\sqrt{9.81 \times 1.8}} = \frac{1.111}{4.202} = 0.264 \quad (\text{Subcritical})$$

2. Maximum Hump $\Delta z_{max}$:
   $$q = \frac{Q}{B} = \frac{6.0}{3.0} = 2.0 \text{ m}^2/\text{s}$$
   $$y_c = \left(\frac{q^2}{g}\right)^{1/3} = \left(\frac{4.0}{9.81}\right)^{1/3} = 0.7415 \text{ m}$$
   $$E_c = 1.5 y_c = 1.5 \times 0.7415 = 1.112 \text{ m}$$
   $$\Delta z_{max} = E_1 - E_c = 1.863 - 1.112 = 0.751 \text{ m}$$
   *Answer:* Since $\Delta z = 0.60 \text{ m} < 0.751 \text{ m}$, the flow is **not choked** for $\Delta z = 0.60 \text{ m}$!
   Depth over hump $y_2$:
   $$E_2 = E_1 - \Delta z = 1.863 - 0.60 = 1.263 \text{ m}$$
   $$y_2 + \frac{2.0^2}{2(9.81)y_2^2} = 1.263 \implies y_2^3 - 1.263 y_2^2 + 0.2039 = 0$$
   Solving yields subcritical depth over hump: **$y_2 = 1.095 \text{ m}$**.

<!--tab:Interactive Workbench-->
### Channel Transition Simulator
Simulate upstream heading up and water surface variations across transitions:

::widget[specificenergy]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c15_1",
    "question": "If E1 = 2.0 m and y_c = 0.8 m in a rectangular channel, calculate Δz_max in meters.",
    "answer": 0.8,
    "tol": 0.02,
    "unit": "m",
    "hint": "Δz_max = E1 - 1.5 * y_c = 2.0 - 1.5 * 0.8.",
    "solution": "Δz_max = 2.0 - 1.2 = 0.8 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "What happens to the upstream water depth in subcritical flow when a bed hump exceeds Δz_max?",
    "options": [
      "Upstream depth remains unchanged",
      "Upstream depth decreases (water level drops)",
      "Upstream depth increases (heading up / backwater effect)",
      "Flow reverses direction completely"
    ],
    "answer": 2,
    "explanation": "When Δz > Δz_max, the channel is choked. The upstream water level must back up, increasing upstream depth to provide enough specific energy (E1' = Ec + Δz) to pass the discharge."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Bridge Pier Constriction Backwater (USGS / IS: 7784):**
   When multiple bridge piers constrict the natural river channel width ($B_2 < B_1$), highway engineers compute the backwater rise using Yarnell's formula:
   $$\frac{\Delta h}{y_3} = K Fr_3^2 \left(K + 5 Fr_3^2 - 0.6\right)\left(\alpha + 15\alpha^4\right)$$
   where $K$ depends on pier nose geometry (semicircular $K=0.90$, triangular $K=1.05$). Underestimating backwater causes highway approach embankment inundation.
"""

# =========================================================================
# S16: Specific Force (F) & Hydraulic Jump in Rectangular Channels
# =========================================================================
s16 = r"""<!--tab:Theory & Derivations-->
> [!note] The Hydraulic Jump
> A **hydraulic jump** is a rapidly varied flow (RVF) phenomenon where a high-velocity supercritical flow ($Fr_1 > 1$) abruptly decelerates into a low-velocity subcritical flow ($Fr_2 < 1$). Because intense turbulent rollers dissipate massive amounts of kinetic energy, the energy equation cannot be applied across the jump without knowing head loss; instead, the **momentum equation** must be used!

## 1. Specific Force ($F$) Formulation
Consider a horizontal rectangular channel of width $B$:
$$\sum F_x = \text{Net momentum efflux} \implies P_1 - P_2 = \rho Q (V_2 - V_1)$$
Hydrostatic pressure forces: $P_1 = \frac{1}{2}\gamma B y_1^2$, $P_2 = \frac{1}{2}\gamma B y_2^2$.
Rearranging into terms evaluated at sections 1 and 2:
$$\frac{1}{2}\gamma B y_1^2 + \rho Q V_1 = \frac{1}{2}\gamma B y_2^2 + \rho Q V_2$$
Dividing by $\gamma = \rho g$:
$$F_1 = F_2 \quad \text{where } F = \frac{y^2}{2} + \frac{q^2}{g y} \quad \text{(Specific Force per unit width)}$$
The two depths $y_1$ and $y_2$ that share the **exact same Specific Force** ($F_1 = F_2$) are called **Sequent Depths** (or Conjugate Depths).

## 2. Derivation of the Bélanger Hydraulic Jump Equation (1828)
Equating specific forces:
$$\frac{y_1^2}{2} + \frac{q^2}{g y_1} = \frac{y_2^2}{2} + \frac{q^2}{g y_2}$$
$$\frac{y_2^2 - y_1^2}{2} = \frac{q^2}{g}\left(\frac{1}{y_1} - \frac{1}{y_2}\right) = \frac{q^2 (y_2 - y_1)}{g y_1 y_2}$$
Dividing both sides by $(y_2 - y_1) \ne 0$:
$$\frac{y_2 + y_1}{2} = \frac{q^2}{g y_1 y_2}$$
Multiplying by $2/y_1^2$:
$$\left(\frac{y_2}{y_1}\right)^2 + \left(\frac{y_2}{y_1}\right) - \frac{2 q^2}{g y_1^3} = 0$$
Recognizing that $\frac{q^2}{g y_1^3} = \frac{V_1^2}{g y_1} = Fr_1^2$:
$$\left(\frac{y_2}{y_1}\right)^2 + \left(\frac{y_2}{y_1}\right) - 2 Fr_1^2 = 0$$
Solving the quadratic equation for the physically positive root yields the celebrated **Bélanger Equation**:
$$\frac{y_2}{y_1} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right)$$

## 3. Energy Dissipation in a Hydraulic Jump ($\Delta E$)
The head loss across the jump is:
$$\Delta E = E_1 - E_2 = \left(y_1 + \frac{V_1^2}{2g}\right) - \left(y_2 + \frac{V_2^2}{2g}\right)$$
Substituting $V_1 = q/y_1$ and $V_2 = q/y_2$ and combining with the Bélanger relation simplifies to:
$$\Delta E = \frac{(y_2 - y_1)^3}{4 y_1 y_2}$$
Efficiency of the jump: $\eta_j = \frac{E_2}{E_1}$. Relative energy loss: $\frac{\Delta E}{E_1}$.

<!--tab:Worked Examples-->
### Example 16.1: Hydraulic Jump at Sluice Gate Outflow
**Problem:** A sluice gate discharges water into a horizontal rectangular canal of width $B = 4.0 \text{ m}$ at depth $y_1 = 0.40 \text{ m}$ and velocity $V_1 = 8.0 \text{ m/s}$. A hydraulic jump forms downstream.
Determine:
1. Initial Froude number $Fr_1$.
2. Sequent depth $y_2$.
3. Energy head lost in the jump $\Delta E$.
4. Power dissipated by the jump in kilowatts.

**Solution:**
1. **Initial Froude Number $Fr_1$:**
   $$Fr_1 = \frac{V_1}{\sqrt{g y_1}} = \frac{8.0}{\sqrt{9.81 \times 0.40}} = \frac{8.0}{\sqrt{3.924}} = \frac{8.0}{1.981} = 4.039 \quad (\text{Supercritical})$$

2. **Sequent Depth $y_2$:**
   $$\frac{y_2}{y_1} = \frac{1}{2}\left(\sqrt{1 + 8 Fr_1^2} - 1\right) = \frac{1}{2}\left(\sqrt{1 + 8(4.039)^2} - 1\right)$$
   $$\sqrt{1 + 8(16.313)} = \sqrt{1 + 130.5} = \sqrt{131.5} = 11.468$$
   $$\frac{y_2}{y_1} = \frac{11.468 - 1}{2} = \frac{10.468}{2} = 5.234$$
   $$y_2 = 5.234 \times 0.40 = 2.094 \text{ m}$$

3. **Energy Loss $\Delta E$:**
   $$\Delta E = \frac{(y_2 - y_1)^3}{4 y_1 y_2} = \frac{(2.094 - 0.40)^3}{4(0.40)(2.094)} = \frac{(1.694)^3}{3.350} = \frac{4.861}{3.350} = 1.451 \text{ m}$$

4. **Power Dissipated:**
   Discharge $Q = B y_1 V_1 = 4.0 \times 0.40 \times 8.0 = 12.8 \text{ m}^3/\text{s}$.
   $$P_{diss} = \gamma Q \Delta E = (9810 \text{ N/m}^3) \times 12.8 \text{ m}^3/\text{s} \times 1.451 \text{ m} = 182,201 \text{ W} \approx 182.2 \text{ kW}$$

<!--tab:Interactive Workbench-->
### Hydraulic Jump & Stilling Basin Simulator
Simulate conjugate depths, Froude number transitions, and energy dissipation interactively:

::widget[hydraulicjump]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c16_1",
    "question": "If Fr1 = 3.0 and y1 = 0.5 m, calculate the sequent depth y2 in meters.",
    "answer": 1.886,
    "tol": 0.03,
    "unit": "m",
    "hint": "y2/y1 = 0.5 * (sqrt(1 + 8*9) - 1) = 0.5 * (sqrt(73) - 1).",
    "solution": "sqrt(73) ≈ 8.544. y2 = 0.5 * (8.544 - 1)/2 * 0.5... y2 = 0.5 * 3.772 = 1.886 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the Momentum Equation used to solve the hydraulic jump rather than the Bernoulli Energy Equation?",
    "options": [
      "Pressure is non-hydrostatic inside the jump",
      "Mass is not conserved across a jump",
      "Intense turbulent eddy roller dissipation causes an unknown internal energy loss ΔE",
      "Gravity ceases to act inside the jump"
    ],
    "answer": 2,
    "explanation": "Because the internal turbulent energy loss ΔE is an unknown ahead of time, Bernoulli cannot be applied directly. However, external boundary shear is negligible over the short jump length, making net momentum conserved."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Scour Protection Below Spillways:**
   Without a properly engineered hydraulic jump, high-velocity water plunging over a dam spillway ($V > 20 \text{ m/s}$) will rapidly dig massive plunge pools, undermining the concrete dam foundation. The hydraulic jump safely destroys over $60\%$ of this kinetic energy within a fortified concrete basin.
"""

# =========================================================================
# S17: Jump Classification & USBR Stilling Basins I–IV (IS: 4997)
# =========================================================================
s17 = r"""<!--tab:Theory & Derivations-->
> [!note] USBR Hydraulic Jump Classification
> The United States Bureau of Reclamation (USBR) classified hydraulic jumps into distinct regimes based on the upstream **Froude number ($Fr_1$)**, providing standardized stilling basin designs codified in Indian Standard **IS: 4997**.

## 1. Jump Classification by Froude Number ($Fr_1$)

| Froude Range | Jump Type | Characteristics & Performance | Energy Loss $\frac{\Delta E}{E_1}$ |
| :--- | :--- | :--- | :--- |
| **$Fr_1 = 1.0$** | **Critical Flow** | No jump forms. | $0\%$ |
| **$1.0 < Fr_1 \le 1.7$** | **Undular Jump** | Gentle surface undulations; negligible turbulence. | $< 5\%$ |
| **$1.7 < Fr_1 \le 2.5$** | **Weak Jump** | Uniform surface roller; low velocity throughout. | $5\% - 15\%$ |
| **$2.5 < Fr_1 \le 4.5$** | **Oscillating Jump** | Jet oscillates from bottom to surface, generating destructive periodic waves that travel miles downstream. **Avoid in design!** | $15\% - 45\%$ |
| **$4.5 < Fr_1 \le 9.0$** | **Steady Jump** | **Best engineering jump!** Extremely stable, insensitive to tailwater variations, dissipates maximum kinetic energy cleanly. | $45\% - 70\%$ |
| **$Fr_1 > 9.0$** | **Strong / Choppy Jump** | Violent intermittent spray and slugging action; requires heavy reinforced stilling basin walls. | $> 70\%$ |

## 2. Standardized USBR Stilling Basins (IS: 4997)
To drastically reduce the required basin length ($L_j \approx 6 y_2$ in a plain basin), standard appurtenances are installed:
1. **Chute Blocks:** Triangular blocks at basin entrance to split the incoming jet into narrow interweaving jets.
2. **Baffle Blocks (Piers):** Heavy concrete teeth anchored in the basin floor to exert a strong opposing drag force on the high-velocity jet.
3. **End Sill:** Sloped or dentated threshold at basin exit to deflect bottom bed currents upwards, preventing downstream bed scour.

- **USBR Type I:** Plain apron with no appurtenances ($Fr_1 < 1.7$ or temporary works). Basin length $L = 6 y_2$.
- **USBR Type II:** High-head dams ($H > 60 \text{ m}, Fr_1 > 4.5$). Chute blocks and dentated end sill. Basin length reduced by $33\%$ ($L = 4.3 y_2$).
- **USBR Type III:** Low-head structures ($V_1 < 18 \text{ m/s}, Fr_1 > 4.5$). Chute blocks, baffle piers, and solid end sill. Basin length reduced by over $55\%$ ($L = 2.7 y_2$).
- **USBR Type IV:** Oscillating jump regime ($2.5 < Fr_1 < 4.5$). Deflector chute blocks to damp surface waves.

<!--tab:Worked Examples-->
### Example 17.1: Design of a USBR Type III Stilling Basin
**Problem:** A diversion weir spillway discharges $q = 6.5 \text{ m}^3/(\text{s}\cdot\text{m})$ into a horizontal stilling basin. The depth at the toe of the spillway is $y_1 = 0.50 \text{ m}$. Design a USBR Type III stilling basin according to IS: 4997.

**Solution:**
1. Upstream velocity and Froude number:
   $$V_1 = \frac{q}{y_1} = \frac{6.5}{0.50} = 13.0 \text{ m/s}$$
   $$Fr_1 = \frac{V_1}{\sqrt{g y_1}} = \frac{13.0}{\sqrt{9.81 \times 0.50}} = \frac{13.0}{2.215} = 5.87$$
   Since $Fr_1 = 5.87 > 4.5$ and $V_1 = 13.0 \text{ m/s} < 18 \text{ m/s}$, **USBR Type III is the mandatory optimal design**!

2. Sequent depth $y_2$:
   $$y_2 = \frac{y_1}{2}\left(\sqrt{1 + 8(5.87)^2} - 1\right) = 0.25(\sqrt{1 + 275.6} - 1) = 0.25(16.63 - 1) = 3.908 \text{ m}$$

3. Basin Dimensions (IS: 4997 Type III):
   - **Basin Length:** $L_B = 2.7 y_2 = 2.7 \times 3.908 = 10.55 \text{ m}$ (A plain apron would require $6 \times 3.908 = 23.45 \text{ m}$—saving over $12 \text{ m}$ of heavy underwater concrete!).
   - **Chute Block Height:** $h_1 = y_1 = 0.50 \text{ m}$, width $w_1 = y_1 = 0.50 \text{ m}$, spacing $s_1 = 0.50 \text{ m}$.
   - **Baffle Pier Height:** $h_3 = 1.15 y_1 \approx 0.58 \text{ m}$, located at distance $x_p = 0.8 y_2 = 3.13 \text{ m}$ from basin start.
   - **End Sill Height:** $h_4 = 0.15 y_2 = 0.15 \times 3.908 = 0.586 \text{ m}$.

<!--tab:Interactive Workbench-->
### Stilling Basin Designer
Evaluate USBR basin geometry and energy loss:

::widget[hydraulicjump]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c17_1",
    "question": "For a USBR Type III basin with sequent depth y2 = 4.0 m, calculate the required basin length LB in meters.",
    "answer": 10.8,
    "tol": 0.1,
    "unit": "m",
    "hint": "LB = 2.7 * y2 for USBR Type III.",
    "solution": "LB = 2.7 * 4.0 = 10.8 m."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which hydraulic jump regime is notoriously dangerous to canals due to uncontrollable surface waves and should be strictly avoided in design?",
    "options": [
      "Undular jump (Fr1 = 1.2)",
      "Oscillating jump (2.5 < Fr1 < 4.5)",
      "Steady jump (4.5 < Fr1 < 9.0)",
      "Weak jump (1.7 < Fr1 < 2.5)"
    ],
    "answer": 1,
    "explanation": "In the oscillating jump regime (2.5 < Fr1 < 4.5), the jet periodically enters along the bottom and then flips to the surface, creating severe periodic waves that cause major embankment erosion."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Cavitation on Baffle Piers:**
   Baffle piers in USBR Type III basins must never be used when entrance velocity exceeds $V_1 = 18 \text{ m/s}$ ($60 \text{ ft/s}$). At higher velocities, local separation at the pier corners drops static pressure below vapor pressure, inducing catastrophic cavitation that shatters the concrete teeth. For $V_1 > 18 \text{ m/s}$, USBR Type II (no baffle piers) is legally required.
"""

# =========================================================================
# S18: Flumes & Introduction to Gradually Varied Flow (GVF) 12 Surface Profiles
# =========================================================================
s18 = r"""<!--tab:Theory & Derivations-->
> [!note] Critical Depth Flumes & GVF
> While uniform flow represents an idealized equilibrium, real river reaches and canals feature **Gradually Varied Flow (GVF)** where depth varies continuously along the channel length ($dy/dx \ne 0$) due to weirs, gates, and slope breaks.

## 1. Flow Measurement: Venturi and Parshall Flumes
By contracting the side walls or raising a hump, flow is forced to pass through critical depth ($Fr = 1$). Because critical flow creates a unique one-to-one relationship between discharge and depth ($q = \sqrt{g y_c^3}$), critical flumes act as precision flow meters:
$$Q = C_d \cdot B_t \cdot \sqrt{g} \left(\frac{2}{3}H\right)^{3/2}$$
Parshall flumes utilize a calibrated converging section, throat, and dipping bed to measure irrigation discharges with $< 3\%$ error without silting.

## 2. Dynamic Equation of Gradually Varied Flow (GVF)
Total energy head at any section: $H = z + y + \frac{\alpha V^2}{2g}$.
Differentiating with respect to longitudinal coordinate $x$:
$$\frac{dH}{dx} = \frac{dz}{dx} + \frac{dy}{dx} + \frac{d}{dx}\left(\frac{\alpha V^2}{2g}\right)$$
Recognizing that $\frac{dH}{dx} = -S_f$ (energy slope) and $\frac{dz}{dx} = -S_0$ (bed slope):
$$-S_f = -S_0 + \frac{dy}{dx} + \frac{d}{dy}\left(\frac{Q^2}{2g A^2}\right)\frac{dy}{dx}$$
$$\frac{d}{dy}\left(\frac{Q^2}{2g A^2}\right) = -\frac{Q^2 T}{g A^3} = -Fr^2$$
$$-S_f = -S_0 + \frac{dy}{dx}\left(1 - Fr^2\right)$$
Solving for the water surface slope $\frac{dy}{dx}$ yields the **Dynamic Equation of GVF**:
$$\frac{dy}{dx} = \frac{S_0 - S_f}{1 - Fr^2}$$
where friction slope $S_f = \frac{n^2 V^2}{R^{4/3}} = \frac{n^2 Q^2}{A^2 R^{4/3}}$.

## 3. The 12 Classical Surface Profiles
Channels are classified into 5 slope categories based on normal depth $y_0$ versus critical depth $y_c$:
1. **Mild Slope ($M$):** $S_0 < S_c \iff y_0 > y_c$. (M1 backwater, M2 drawdown, M3 hydraulic jump).
2. **Steep Slope ($S$):** $S_0 > S_c \iff y_0 < y_c$. (S1 backwater jump, S2 drawdown, S3 acceleration).
3. **Critical Slope ($C$):** $S_0 = S_c \iff y_0 = y_c$. (C1, C3).
4. **Horizontal Bed ($H$):** $S_0 = 0 \iff y_0 \to \infty$. (H2 drawdown, H3 jump).
5. **Adverse Slope ($A$):** $S_0 < 0$ (bed rises downstream). (A2 drawdown, A3 jump).

<!--tab:Worked Examples-->
### Example 18.1: Direct Step Method for an M1 Backwater Profile
**Problem:** A rectangular canal of width $B = 5.0 \text{ m}, n = 0.015, S_0 = 0.001$ conveys $Q = 10.0 \text{ m}^3/\text{s}$. A weir at the downstream end raises the depth to $y = 2.50 \text{ m}$. Normal depth is $y_0 = 1.15 \text{ m}$ and critical depth is $y_c = 0.74 \text{ m}$. Compute the distance upstream to where depth drops to $y = 2.20 \text{ m}$ in a single step ($\Delta y = -0.30 \text{ m}$).

**Solution:**
1. **Section 1 ($y_1 = 2.50 \text{ m}$):**
   - $A_1 = 5.0 \times 2.50 = 12.5 \text{ m}^2$
   - $V_1 = 10.0 / 12.5 = 0.80 \text{ m/s}$
   - $E_1 = 2.50 + \frac{0.80^2}{2(9.81)} = 2.50 + 0.0326 = 2.5326 \text{ m}$
   - $P_1 = 5.0 + 2(2.50) = 10.0 \text{ m} \implies R_1 = 1.25 \text{ m}$
   - $S_{f1} = \frac{n^2 V_1^2}{R_1^{4/3}} = \frac{0.015^2 \times 0.64}{(1.25)^{1.333}} = \frac{0.000144}{1.347} = 0.0001069$

2. **Section 2 ($y_2 = 2.20 \text{ m}$):**
   - $A_2 = 5.0 \times 2.20 = 11.0 \text{ m}^2$
   - $V_2 = 10.0 / 11.0 = 0.909 \text{ m/s}$
   - $E_2 = 2.20 + \frac{0.909^2}{2(9.81)} = 2.20 + 0.0421 = 2.2421 \text{ m}$
   - $P_2 = 5.0 + 2(2.20) = 9.40 \text{ m} \implies R_2 = 1.170 \text{ m}$
   - $S_{f2} = \frac{0.015^2 \times 0.826}{(1.170)^{1.333}} = \frac{0.0001859}{1.233} = 0.0001508$

3. **Direct Step Calculation:**
   $$\Delta E = E_1 - E_2 = 2.5326 - 2.2421 = +0.2905 \text{ m}$$
   $$\bar{S}_f = \frac{S_{f1} + S_{f2}}{2} = \frac{0.0001069 + 0.0001508}{2} = 0.0001288$$
   $$\Delta x = \frac{\Delta E}{S_0 - \bar{S}_f} = \frac{0.2905}{0.001 - 0.001288...} = \frac{0.2905}{0.001 - 0.0001288} = \frac{0.2905}{0.0008712} = 333.4 \text{ m}$$
   *Answer:* The depth drops to $2.20 \text{ m}$ at a distance of **$333.4 \text{ m}$ upstream** of the weir.

<!--tab:Interactive Workbench-->
### GVF Profile & Flume Simulator
Examine the 12 water surface profiles and solve backwater curves:

::widget[hydraulicjump]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c18_1",
    "question": "For a channel with y0 = 1.5 m and yc = 0.8 m, what slope category does it belong to?",
    "answer": 1,
    "tol": 0.01,
    "unit": "",
    "hint": "If y0 > yc, the slope is Mild (1), if y0 < yc it is Steep (2).",
    "solution": "Since y0 > yc (1.5 m > 0.8 m), it is a Mild slope (M)."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Which water surface profile is created upstream of a dam or barrage in a mild-sloped river canal?",
    "options": [
      "M1 profile (backwater curve)",
      "M2 profile (drawdown curve)",
      "S1 profile",
      "C1 profile"
    ],
    "answer": 0,
    "explanation": "Because a dam raises the water depth far above the normal depth (y > y0 > yc), the surface curve belongs to zone 1 of a mild slope, termed the classical M1 backwater curve."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Submerged Parshall Flume Correction (ASTM D1941):**
   When the downstream tailwater rises such that submergence ratio $S = H_b / H_a > 0.70$ (for $1\text{ to } 8\text{ ft}$ flumes), free flow is choked and submerged discharge reduction factors must be applied according to ASTM D1941 standards.
"""

write_session("S15", s15)
write_session("S16", s16)
write_session("S17", s17)
write_session("S18", s18)
print("Part 2 (S15-S18) generated successfully!")
