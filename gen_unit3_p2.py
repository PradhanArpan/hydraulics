import os, sys

sys.stdout.reconfigure(encoding='utf-8')

sessions_dir = r"C:\Users\HP\.gemini\antigravity\scratch\hydraulics\sessions"

def write_session(sid, content):
    path = os.path.join(sessions_dir, f"{sid}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated {sid}.md ({len(content)} bytes)")

# =========================================================================
# S24: Jet Striking a Series of Flat Vanes on a Wheel & Max Efficiency (50%)
# =========================================================================
s24 = r"""<!--tab:Theory & Derivations-->
> [!note] The Critical Transition: Single Vane vs Series of Vanes
> In a real hydraulic machine, vanes are mounted circumferentially around the rim of a rotating wheel. As each vane moves out of reach, the succeeding vane immediately enters the path of the jet. Consequently, **the entire mass flow rate discharged by the nozzle ($\dot{m} = \rho a V$) is intercepted by the wheel**!

## 1. Dynamic Force on a Series of Flat Radial Vanes
Let a wheel of radius $R$ fitted with radial flat vanes rotate at peripheral velocity $u$:
- Total mass flow rate intercepted per second: $\dot{m} = \rho a V$ (not $\rho a (V-u)$!).
- Initial velocity in jet direction: $V_{1x} = V$.
- Velocity of water leaving the flat plate (tangential to plate, moving at speed $u$): $V_{2x} = u$.
- Hydrodynamic force exerted on the wheel:
  $$F_x = \dot{m}(V_{1x} - V_{2x}) = \rho a V (V - u)$$
- Work done per second (Power developed):
  $$P = F_x \cdot u = \rho a V (V - u) u$$

## 2. Derivation of Maximum Efficiency ($\eta_{max} = 50\%$)
Total kinetic energy input from the nozzle per second:
$$E_{in} = \frac{1}{2}\rho a V^3$$
Mechanical efficiency:
$$\eta = \frac{P}{E_{in}} = \frac{\rho a V (V - u) u}{\frac{1}{2}\rho a V^3} = \frac{2 u (V - u)}{V^2} = 2\left[\frac{u}{V} - \left(\frac{u}{V}\right)^2\right]$$
To maximize efficiency with respect to peripheral velocity $u$:
$$\frac{d\eta}{du} = 0 \implies \frac{d}{du}(V u - u^2) = V - 2u = 0 \implies u = \frac{V}{2}$$
Substituting the optimum speed ratio $u/V = 0.5$:
$$\eta_{max} = 2\left[\frac{1}{2} - \frac{1}{4}\right] = 2\left(\frac{1}{4}\right) = \frac{1}{2} = \mathbf{50.0\%}$$

*Fundamental Comparison:*
- Single flat vane: $\dot{m} = \rho a (V-u)$, optimum $u = V/3$, $\eta_{max} = 29.6\%$.
- Series of flat vanes: $\dot{m} = \rho a V$, optimum $u = V/2$, $\eta_{max} = 50.0\%$.

<!--tab:Worked Examples-->
### Example 24.1: Power and Torque of a Wheel with Flat Vanes
**Problem:** A wheel of pitch diameter $D = 1.2 \text{ m}$ is fitted with a series of flat radial vanes. A water jet of diameter $d = 50 \text{ mm}$ moving at $V = 30 \text{ m/s}$ strikes the vanes tangentially.
1. Determine the wheel rotational speed $N$ (rpm) for maximum efficiency.
2. Calculate the maximum power developed and shaft torque.
3. Compute the energy carried away by the discharge.

**Solution:**
1. **Optimum Peripheral Velocity:**
   $$u = \frac{V}{2} = \frac{30}{2} = 15.0 \text{ m/s}$$
   $$u = \frac{\pi D N}{60} \implies N = \frac{60 u}{\pi D} = \frac{60 \times 15.0}{\pi \times 1.2} = \frac{900}{3.7699} = 238.7 \text{ rpm}$$

2. **Power and Torque:**
   $$a = \frac{\pi}{4}(0.050)^2 = 1.9635 \times 10^{-3} \text{ m}^2$$
   Discharge:
   $$Q = a V = (1.9635 \times 10^{-3}) \times 30 = 0.0589 \text{ m}^3/\text{s} = 58.9 \text{ L/s}$$
   Force:
   $$F_x = \rho a V (V - u) = 1000 \times (1.9635 \times 10^{-3}) \times 30 \times (30 - 15) = 58.905 \times 15 = 883.6 \text{ N}$$
   Power:
   $$P = F_x \cdot u = 883.6 \times 15.0 = 13,254 \text{ W} = \mathbf{13.25 \text{ kW}}$$
   Torque:
   $$T = F_x \cdot \frac{D}{2} = 883.6 \times 0.6 = 530.16 \text{ N}\cdot\text{m}$$

3. **Energy Balance:**
   Total input power:
   $$E_{in} = \frac{1}{2}\rho a V^3 = 0.5 \times 1000 \times (1.9635 \times 10^{-3}) \times (30)^3 = 0.98175 \times 27000 = 26,507 \text{ W} = 26.51 \text{ kW}$$
   Notice that $P / E_{in} = 13.254 / 26.507 = 0.500$ ($50.0\%$).
   The remaining $50\%$ ($13.25 \text{ kW}$) leaves the wheel as residual kinetic energy ($\frac{1}{2}\dot{m} u^2$).

<!--tab:Interactive Workbench-->
### Series of Vanes Simulator
Simulate wheel rotation and trace the parabolic efficiency curve peaking at $u = V/2$:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c24_1",
    "question": "For a series of flat vanes struck by a jet of kinetic energy 40 kW, what is the maximum power developed in kW?",
    "answer": 20.0,
    "tol": 0.1,
    "unit": "kW",
    "hint": "Maximum theoretical efficiency is 50%.",
    "solution": "P_max = 0.50 * 40 kW = 20.0 kW."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the mass flow rate for a series of vanes taken as ρ a V instead of ρ a (V - u)?",
    "options": [
      "The nozzle moves alongside the vanes",
      "As each vane moves away, the next vane continuously intercepts the incoming jet, absorbing the full nozzle output",
      "Pressure accumulates between successive blades",
      "Relative velocity is neglected in rotational flow"
    ],
    "answer": 1,
    "explanation": "Because multiple vanes pass through the jet stream consecutively, no fluid escapes without striking a blade, so the entire nozzle discharge ρ a V is intercepted."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Historical Paddle Wheels:**
   Ancient undershot waterwheels with flat radial paddles operated on this exact mechanism, never exceeding $25-35\%$ practical efficiency due to splash turbulence. Replacing flat blades with curved buckets revolutionized hydropower.
"""

# =========================================================================
# S25: Series of Radial Curved Vanes, Runner Torque & Euler Head
# =========================================================================
s25 = r"""<!--tab:Theory & Derivations-->
> [!note] Approaching 100% Hydraulic Efficiency
> By replacing flat vanes on a wheel with **double-curved hemispherical buckets** that reverse the jet by nearly $180^\circ$, the theoretical hydraulic efficiency can approach **$100\%$**! This is the governing principle of the Pelton impulse turbine.

## 1. Velocity Analysis on a Series of Curved Vanes
Consider a series of curved vanes moving tangentially at velocity $u$:
- Incoming jet velocity: $V_1$.
- Relative velocity at inlet: $V_{r1} = V_1 - u$.
- Fluid glides smoothly along the curved bucket surface and leaves at relative velocity $V_{r2} = k V_{r1} = k(V_1 - u)$, where $k \le 1$ accounts for surface friction.
- Let $\phi$ be the vane exit angle (angle between relative velocity $\vec{V}_{r2}$ and the reverse direction of blade motion). Typically $\phi \approx 10^\circ \text{ to } 15^\circ$ in Pelton buckets.

Component of absolute exit velocity in the direction of motion:
$$V_{2x} = u - V_{r2} \cos \phi = u - k(V_1 - u)\cos \phi$$
Whirl velocity change:
$$\Delta V_w = V_{1x} - V_{2x} = V_1 - [u - k(V_1 - u)\cos \phi] = (V_1 - u)(1 + k \cos \phi)$$

## 2. Dynamic Force, Power & Efficiency Formulations
Since the series of vanes intercepts the entire nozzle mass flow rate ($\dot{m} = \rho a V_1$):
$$F_x = \rho a V_1 (V_1 - u)(1 + k \cos \phi)$$
**Power Developed:**
$$P = F_x \cdot u = \rho a V_1 (V_1 - u) u (1 + k \cos \phi)$$
**Hydraulic Efficiency:**
$$\eta_h = \frac{P}{\frac{1}{2}\rho a V_1^3} = \frac{2 u (V_1 - u)(1 + k \cos \phi)}{V_1^2}$$
For maximum efficiency: $\frac{d\eta_h}{du} = 0 \implies u = \frac{V_1}{2}$.
Substituting $u = V_1 / 2$:
$$\eta_{max} = \frac{1 + k \cos \phi}{2}$$
- If vanes are completely smooth ($k = 1$) and the deflection is $180^\circ$ ($\phi = 0^\circ$):
  $$\eta_{max} = \frac{1 + 1}{2} = \mathbf{100.0\%}!$$
In practical Pelton buckets, $\phi \approx 15^\circ$ and $k \approx 0.95$:
$$\eta_{max} = \frac{1 + 0.95 \cos 15^\circ}{2} = \frac{1 + 0.9176}{2} = \mathbf{95.9\%}$$

<!--tab:Worked Examples-->
### Example 25.1: Pelton Runner Bucket Efficiency
**Problem:** A Pelton wheel runner of diameter $D = 0.90 \text{ m}$ is driven by a water jet of diameter $d = 45 \text{ mm}$ with velocity $V_1 = 50 \text{ m/s}$. The bucket deflecting angle is $165^\circ$ ($\phi = 15^\circ$), and blade friction reduces relative velocity by $8\%$ ($k = 0.92$). The wheel operates at optimal speed ($u = 0.46 V_1$).
Calculate:
1. Runner rotational speed $N$ (rpm).
2. Driving force $F_x$ on the runner.
3. Shaft power developed and hydraulic efficiency.

**Solution:**
1. **Runner Speed:**
   $$u = 0.46 \times 50 = 23.0 \text{ m/s}$$
   $$N = \frac{60 u}{\pi D} = \frac{60 \times 23.0}{\pi \times 0.90} = \frac{1380}{2.8274} = 488.1 \text{ rpm}$$

2. **Driving Force:**
   $$a = \frac{\pi}{4}(0.045)^2 = 1.5904 \times 10^{-3} \text{ m}^2$$
   Discharge:
   $$Q = a V_1 = (1.5904 \times 10^{-3}) \times 50 = 0.07952 \text{ m}^3/\text{s}$$
   Relative velocity:
   $$V_{r1} = V_1 - u = 50 - 23 = 27.0 \text{ m/s}$$
   Force:
   $$F_x = \rho Q (V_1 - u)(1 + k \cos 15^\circ) = 1000 \times 0.07952 \times 27.0 \times (1 + 0.92 \times 0.9659)$$
   $$F_x = 2147 \times (1 + 0.8886) = 2147 \times 1.8886 = 4054.8 \text{ N} \approx 4.055 \text{ kN}$$

3. **Power and Efficiency:**
   $$P = F_x \cdot u = 4054.8 \times 23.0 = 93,260 \text{ W} = \mathbf{93.26 \text{ kW}}$$
   Input Jet Kinetic Power:
   $$E_{in} = \frac{1}{2}\rho Q V_1^2 = 0.5 \times 1000 \times 0.07952 \times 50^2 = 39.76 \times 2500 = 99,400 \text{ W} = 99.40 \text{ kW}$$
   $$\eta_h = \frac{93.26}{99.40} = 0.9382 = \mathbf{93.82\%}$$

<!--tab:Interactive Workbench-->
### Curved Vane Runner Simulator
Simulate runner blade velocity ratio, deflection angle, and friction factor:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c25_1",
    "question": "If k = 1.0 and phi = 15°, what is the maximum theoretical efficiency eta_max in percent for a Pelton runner?",
    "answer": 98.3,
    "tol": 0.3,
    "unit": "%",
    "hint": "eta_max = 0.5 * (1 + cos 15°) with cos 15° = 0.9659.",
    "solution": "eta_max = 0.5 * (1 + 0.9659) = 0.98295 = 98.3%."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why is the bucket deflection angle in Pelton wheels limited to 165°-170° rather than 180°?",
    "options": [
      "To prevent water hammer in the penstock",
      "To prevent the discharged water from colliding with the back of the advancing bucket",
      "To maximize centrifugal force",
      "To reduce manufacturing cost"
    ],
    "answer": 1,
    "explanation": "If water deflected by exactly 180°, it would shoot directly into the back of the next approaching bucket, severely braking the runner and slashing efficiency."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Tygun's Number of Buckets Rule:**
   The number of buckets $Z$ on a Pelton runner is chosen to prevent jet water from passing unintercepted between buckets:
   $$Z = 15 + \frac{D}{2d} = 15 + 0.5 m$$
   where $m = D/d$ is the jet ratio (typically $m \approx 10 - 14$).
"""

# =========================================================================
# S26: Jet Propulsion of Ships
# =========================================================================
s26 = r"""<!--tab:Theory & Derivations-->
> [!note] Reaction Propulsion Principles
> In waterjet propulsion systems (used in high-speed ferries, patrol boats, and jet skis), water is inducted into a hull tunnel, energized by an internal impeller, and discharged through stern nozzles at high velocity $V_j$, propelling the vessel forward via **reaction thrust**.

## 1. Governing Equations of Waterjet Propulsion
Let a ship cruise forward at constant speed $u$ while ejecting water aft at relative jet velocity $V_r$:
- Absolute velocity of discharged jet relative to earth: $V_a = V_r - u$.
- Mass flow rate discharged through stern nozzles: $\dot{m} = \rho a V_r$.

1. **Reaction Propulsive Thrust:**
   $$F_T = \dot{m}(V_r - u) = \rho a V_r (V_r - u)$$
2. **Effective Propulsive Work Done per Second:**
   $$W = F_T \cdot u = \rho a V_r (V_r - u) u$$
3. **Kinetic Energy Imparted by Impeller to Water:**
   - Case A: **Orifices at Right Angles to Motion (Side Indraft):**
     Water enters with zero initial forward velocity. The pump must accelerate water from rest to $V_r$:
     $$E_{in} = W + \frac{1}{2}\dot{m}V_a^2 = \frac{1}{2}\rho a V_r [V_r^2 - u^2] \quad \text{or} \quad \frac{1}{2}\dot{m}V_r^2$$
     Propulsive efficiency:
     $$\eta_p = \frac{2 u (V_r - u)}{V_r^2} \implies \eta_{max} = 50.0\% \quad (\text{at } u = V_r/2)$$
   - Case B: **Ram Scoops Facing Direction of Motion (Inlet in line with ship motion):**
     Water enters with relative velocity $u$. The pump only needs to accelerate water from $u$ to $V_r$:
     $$E_{in} = \frac{1}{2}\dot{m}(V_r^2 - u^2)$$
     Propulsive efficiency:
     $$\eta_p = \frac{F_T \cdot u}{E_{in}} = \frac{\dot{m}(V_r - u)u}{\frac{1}{2}\dot{m}(V_r^2 - u^2)} = \frac{2u}{V_r + u}$$
     *Key Insight:* As vessel speed approaches jet speed ($u \to V_r$), propulsive efficiency approaches **$100\%$**!

<!--tab:Worked Examples-->
### Example 26.1: Waterjet Propulsion Performance of a Fast Patrol Boat
**Problem:** A waterjet-propelled patrol boat sails at $u = 15 \text{ m/s}$ (approx $30 \text{ knots}$). Two stern nozzles of diameter $d = 200 \text{ mm}$ each discharge water at relative velocity $V_r = 25 \text{ m/s}$. Water is inducted through forward-facing ram scoops. Calculate:
1. Total propulsive thrust developed.
2. Useful propulsive power in kilowatts.
3. Propulsive efficiency of the propulsion system.

**Solution:**
1. **Total Jet Area:**
   $$a_{total} = 2 \times \frac{\pi}{4}(0.200)^2 = 2 \times 0.031416 = 0.06283 \text{ m}^2$$
   Discharge:
   $$Q = a_{total} V_r = 0.06283 \times 25 = 1.5708 \text{ m}^3/\text{s}$$
   Mass flow rate (seawater $\rho = 1025 \text{ kg/m}^3$):
   $$\dot{m} = \rho Q = 1025 \times 1.5708 = 1610 \text{ kg/s}$$

2. **Thrust and Power:**
   $$F_T = \dot{m}(V_r - u) = 1610 \times (25 - 15) = 1610 \times 10 = 16,100 \text{ N} = \mathbf{16.10 \text{ kN}}$$
   Useful Power:
   $$P_u = F_T \cdot u = 16,100 \times 15 = 241,500 \text{ W} = \mathbf{241.5 \text{ kW}}$$

3. **Propulsive Efficiency:**
   For forward-facing scoops:
   $$\eta_p = \frac{2u}{V_r + u} = \frac{2(15)}{25 + 15} = \frac{30}{40} = 0.750 = \mathbf{75.0\%}$$

<!--tab:Interactive Workbench-->
### Waterjet Propulsion Simulator
Vary ship velocity, jet velocity, and intake scoop orientation to examine propulsive efficiency:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c26_1",
    "question": "For a vessel with forward-facing scoops cruising at u = 20 m/s with jet velocity Vr = 30 m/s, calculate the propulsive efficiency in percent.",
    "answer": 80.0,
    "tol": 0.5,
    "unit": "%",
    "hint": "eta_p = 2*u / (Vr + u) = 40 / 50.",
    "solution": "eta_p = 40 / 50 = 0.80 = 80.0%."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "Why do high-speed vessels (above 30 knots) prefer waterjets over conventional marine propellers?",
    "options": [
      "Waterjets eliminate propeller cavitation, provide shallow-draft operation, and deliver superior maneuverability via steerable deflector buckets",
      "Waterjets require no diesel fuel",
      "Waterjets have 100% efficiency at all speeds",
      "Waterjets do not experience skin friction drag"
    ],
    "answer": 0,
    "explanation": "At speeds above 30 knots, conventional propellers suffer severe blade cavitation and drag; enclosed waterjet impellers operate under controlled diffuser pressures, avoiding open-water cavitation."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Reversing Buckets:**
   Waterjets achieve rapid vessel braking without reversing the engine shaft. A hydraulic reversing bucket drops over the nozzle, vectoring the jet forward to generate full reverse thrust in seconds.
"""

# =========================================================================
# S27: Moment of Momentum Theorem & Rotating Sprinkler Dynamics
# =========================================================================
s27 = r"""<!--tab:Theory & Derivations-->
> [!note] The Foundation of Reaction Turbines
> The **Moment of Momentum Theorem** states that the resultant external torque acting on a rotating fluid system equals the net rate of efflux of angular momentum. This theorem governs lawn sprinklers, centrifugal pumps, and Francis/Kaplan reaction turbines.

## 1. Moment of Momentum Formulation
For a control volume with fluid entering at radius $r_1$ and leaving at radius $r_2$:
$$T = \dot{m}(r_2 V_{w2} - r_1 V_{w1})$$
where $V_w$ is the tangential component of absolute velocity (whirl velocity).

## 2. Rotating Lawn Sprinkler Analysis
Consider a two-armed symmetrical sprinkler rotating at angular speed $\omega$ ($u = \omega r$):
- Each arm has radius $R$ and nozzle area $a$, discharging water at relative velocity $V_r$.
- Total discharge through both nozzles: $Q = 2 a V_r$.
- Absolute velocity of discharged jet in tangential direction:
  $$V_a = V_r - u = V_r - \omega R$$
- Torque exerted on the sprinkler arms:
  $$T = \rho Q R (V_r - \omega R)$$
- If the sprinkler is free to rotate with zero resisting torque ($T = 0$, frictionless bearing):
  $$V_r - \omega R = 0 \implies \omega_{no-load} = \frac{V_r}{R}$$
- If a brake torque $T_b$ is applied, the power developed is:
  $$P = T \cdot \omega = \rho Q R (V_r - \omega R)\omega$$
  Maximum power occurs when $\omega = \frac{V_r}{2R} = \frac{\omega_{no-load}}{2}$.

<!--tab:Worked Examples-->
### Example 27.1: Speed and Torque of a Garden Sprinkler
**Problem:** A lawn sprinkler has two identical arms of length $R = 250 \text{ mm}$ with nozzle diameters $d = 8 \text{ mm}$. A total discharge of $Q = 1.2 \text{ L/s}$ is supplied.
1. Determine the no-load angular velocity $\omega$ in rpm.
2. If bearing friction exerts a resisting torque $T_f = 0.15 \text{ N}\cdot\text{m}$, calculate the actual steady running speed in rpm.

**Solution:**
1. **Discharge per nozzle and relative velocity:**
   $$q = \frac{Q}{2} = \frac{1.2 \times 10^{-3}}{2} = 0.60 \times 10^{-3} \text{ m}^3/\text{s}$$
   $$a = \frac{\pi}{4}(0.008)^2 = 5.0265 \times 10^{-5} \text{ m}^2$$
   $$V_r = \frac{q}{a} = \frac{0.60 \times 10^{-3}}{5.0265 \times 10^{-5}} = 11.937 \text{ m/s}$$

2. **No-Load Speed:**
   $$\omega_0 = \frac{V_r}{R} = \frac{11.937}{0.25} = 47.75 \text{ rad/s}$$
   $$N_0 = \frac{60 \omega_0}{2\pi} = \frac{60 \times 47.75}{6.2832} = \mathbf{456.0 \text{ rpm}}$$

3. **Steady Speed with Resisting Torque $T_f = 0.15 \text{ N}\cdot\text{m}$:**
   $$T_f = \rho Q R (V_r - \omega R)$$
   $$0.15 = 1000 \times (1.2 \times 10^{-3}) \times 0.25 \times (11.937 - 0.25\omega)$$
   $$0.15 = 0.30 \times (11.937 - 0.25\omega) \implies 0.50 = 11.937 - 0.25\omega$$
   $$0.25\omega = 11.937 - 0.50 = 11.437 \implies \omega = \frac{11.437}{0.25} = 45.75 \text{ rad/s}$$
   $$N = \frac{60 \times 45.75}{2\pi} = \mathbf{436.9 \text{ rpm}}$$

<!--tab:Interactive Workbench-->
### Sprinkler & Angular Momentum Simulator
Explore the torque-speed curve and determine runaway speed interactively:

::widget[jetimpact]

<!--tab:Interactive Practice-->
```check
[
  {
    "id": "c27_1",
    "question": "For a sprinkler with R = 0.2 m and relative jet velocity Vr = 10 m/s, what is the no-load angular velocity in rad/s?",
    "answer": 50.0,
    "tol": 0.5,
    "unit": "rad/s",
    "hint": "omega = Vr / R = 10 / 0.2.",
    "solution": "omega = 10 / 0.2 = 50.0 rad/s."
  }
]
```

<!--tab:Self-Assessment Quiz-->
```quiz
[
  {
    "question": "In the Euler turbine equation T = ṁ(r2 Vw2 - r1 Vw1), what does Vw represent physically?",
    "options": [
      "The axial flow velocity parallel to the shaft",
      "The tangential component of absolute fluid velocity perpendicular to the radius",
      "The radial velocity inward toward the hub",
      "The relative blade velocity"
    ],
    "answer": 1,
    "explanation": "Only the tangential component of velocity (the whirl velocity Vw) has a moment arm r about the axis of rotation, generating shaft torque T."
  }
]
```

<!--tab:Field Nuances & Standards-->
### Field Nuances & Standards
1. **Barker's Mill Heritage:**
   The rotating sprinkler is mathematically identical to Barker's reaction mill (1743), the direct ancestor of modern Hero-type reaction turbines and centrifugal pump impellers.
"""

write_session("S24", s24)
write_session("S25", s25)
write_session("S26", s26)
write_session("S27", s27)
print("Part 2 (S24-S27) generated successfully!")
