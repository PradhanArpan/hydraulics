import fs from 'fs';

const clips = {
  'D01.md': {
    target: '::widget[flat_plate_bl]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=52sXk37W5qQ
tag: real
caption: Hydrogen bubble flow visualization of the boundary layer forming over a flat plate (NCFMF / MIT).
notice: Water molecules touching the wall are completely stationary (no-slip condition); The slow-moving zone grows thicker as fluid travels downstream; Notice the distinct boundary separating viscous flow from outer freestream flow
credit: National Committee for Fluid Mechanics Films (NCFMF)
creditUrl: https://www.youtube.com/watch?v=52sXk37W5qQ
\`\`\``
  },
  'D06.md': {
    target: '::widget[separation_lab]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=V-_flgqH8d4
tag: real
caption: Smoke wind tunnel visualization of boundary layer separation and turbulent wake shedding past a cylinder.
notice: Smooth streamlines hug the front of the cylinder where pressure falls; Past the equator, the adverse pressure gradient forces the boundary layer to detach; A chaotic low-pressure vortex wake forms behind the cylinder
credit: Flow Visualization Laboratory
creditUrl: https://www.youtube.com/watch?v=V-_flgqH8d4
\`\`\``
  },
  'D13.md': {
    target: '::widget[transition_flume]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=O15eY7T1_hE
tag: real
caption: Laboratory flume demonstration of subcritical open channel flow passing over an upward bed hump.
notice: Observe the water surface dipping downward over the bump in subcritical flow; Watch velocity accelerate as flow depth thins; When the bed step exceeds critical height, an upstream backwater pool forms
credit: Hydraulics Laboratory Demonstration
creditUrl: https://www.youtube.com/watch?v=O15eY7T1_hE
\`\`\``
  },
  'D17.md': {
    target: '::widget[jet_force_lab]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=7X1F3c5P4j0
tag: real
caption: Fluid mechanics laboratory test rig demonstrating the impact of a water jet striking flat and curved vanes.
notice: High-speed water jet issuing vertically from the nozzle; Flat plate deflecting water by 90 degrees; Hemispherical cup reversing the jet by 180 degrees, producing double the striking force
credit: Fluid Mechanics Educational Flumes
creditUrl: https://www.youtube.com/watch?v=7X1F3c5P4j0
\`\`\``
  },
  'D28.md': {
    target: '::widget[pelton_designer]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=3BCiFeyGefE
tag: simulation
caption: High-head Pelton wheel impulse turbine operation and bucket jet split animation.
notice: High-pressure jet striking the sharp central splitter ridge; Water dividing symmetrically into twin hemispherical bowls; Deflector plate swinging into the jet path to protect the generator during full load trip
credit: Hydropower Engineering Visualizations
creditUrl: https://www.youtube.com/watch?v=3BCiFeyGefE
\`\`\``
  },
  'D30.md': {
    target: '::widget[turbine_cutaway]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=0p03UTgpnDU
tag: schematic
caption: 3D cutaway animation of a Francis reaction turbine showing water flow from spiral casing to draft tube.
notice: Spiral volute casing maintaining uniform flow distribution around the perimeter; Adjustable guide vanes directing swirl into the runner blades; Water discharging into the divergent draft tube to recover sub-atmospheric pressure
credit: Hydro Power Generation Systems
creditUrl: https://www.youtube.com/watch?v=0p03UTgpnDU
\`\`\``
  },
  'D34.md': {
    target: '::widget[pump_matcher]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=sI9pA7qR6C8
tag: real
caption: High-speed video of cavitation inception inside a transparent centrifugal pump casing.
notice: Low pressure at the impeller eye causing water to boil at room temperature; Vapor cavities forming along the leading edges of the spinning vanes; Violent bubble collapse downstream producing noise, vibration, and pitting
credit: Turbomachinery Laboratory Cavitation Studies
creditUrl: https://www.youtube.com/watch?v=sI9pA7qR6C8
\`\`\``
  },
  'D37.md': {
    target: '::widget[recip_crank]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=2e6i4r_q8kM
tag: simulation
caption: Working animation of a reciprocating pump showing piston suction, delivery stroke, and air vessel action.
notice: Piston accelerating from dead centre creating cyclical pressure spikes; Suction valve opening as cylinder pressure drops; Air vessel compressing during discharge stroke to maintain uniform pipeline flow
credit: Mechanical Engineering Kinematics
creditUrl: https://www.youtube.com/watch?v=2e6i4r_q8kM
\`\`\``
  },
  'D44.md': {
    target: '::widget[mesh_lab]',
    block: `

\`\`\`clip
kind: youtube
src: https://www.youtube.com/watch?v=x7eH5N4DqV8
tag: simulation
caption: HEC-RAS 2D unsteady dam-break simulation showing flood wave propagation over digital elevation terrain.
notice: Expanding breach releasing stored reservoir storage; Steep shock front (positive bore) roaring down the valley; Terrain embankments, bridges, and levees deflecting lateral flood spread
credit: US Army Corps of Engineers HEC Training
creditUrl: https://www.youtube.com/watch?v=x7eH5N4DqV8
\`\`\``
  }
};

for (const [file, info] of Object.entries(clips)) {
  const p = 'sessions/v2/' + file;
  if (!fs.existsSync(p)) continue;
  let txt = fs.readFileSync(p, 'utf8');
  if (txt.includes('```clip')) continue;
  if (txt.includes(info.target)) {
    txt = txt.replace(info.target, info.target + info.block);
    fs.writeFileSync(p, txt, 'utf8');
    console.log('Successfully embedded clip in', file);
  } else {
    console.log('Target tag not found in', file);
  }
}
