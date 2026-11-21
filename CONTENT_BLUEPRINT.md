# CE432P Hydraulic Engineering: Content Blueprint v2

**Audience:** the builder agent (Antigravity) and the instructor.
**Source of truth for topics and order:** `CE432P_Course_Plan_2026-27.docx` (section 17, Days 1-45). The site must follow it day for day.
**Status:** proposal. The instructor signs off on the pilot (Part 7) before the bulk build.

---

## Part 0. What is wrong with the current site (from the source in this repo)

| # | Finding | Evidence |
|---|---|---|
| 1 | Every session is the same six tabs, whatever the topic: Theory, Worked Examples, Interactive Workbench, Interactive Practice, Quiz, Field Nuances. The structure follows a template, not the idea being taught. | All 45 `sessions/S*.md` contain the same six `<!--tab:...-->` markers. |
| 2 | Widgets are recycled. 27 of 45 sessions embed one of five generic workbenches unchanged: `blprofile` on S01-S09, `jetimpact` on S19-S27, `peltondesign` on S28-S32, `pumpcharacteristics` on S33-S36, `cfdmesh` on S37-S45. Day 3 (laminar numerical) and Day 6 (separation) get the identical widget, so the widget cannot be teaching what the day is about. | `::widget[...]` per session. |
| 3 | Depth is uneven. S10 is 22 KB with 7 widgets and covers six forces, Weber number, alluvial degrees of freedom and IS 1192 in one sitting. S20-S45 are 3-6 KB with one derivation and one generic widget. Overloaded pages lose the student; thin pages say nothing. | File sizes and widget counts. |
| 4 | The "Field Nuances & Standards" tab is filler, for example "deflector plate erosion in slurry lines" under inclined plates. It is not tied to a learning outcome or to any syllabus item, and it carries specific numbers with no source. | S20 and others. |
| 5 | Session numbers have drifted from the course plan. S10 is the open-channel intro (plan Day 7), S17 is the hydraulic jump (plan Day 14), S20 is the inclined plate (plan Day 18). The offset is +1 to +3 and changes by unit. `sessions.json` unlocks by number, so what the instructor unlocks may not match what is taught that day. | Compare S10/S17/S20 content with plan section 17. |
| 6 | Pedagogy in the plan is ignored. The plan tags each day as Chalk-Blackboard, Slide Deck, Visualization, Video, Hands-on, Demonstration or Peer Discussion. The site delivers the same page for all of them. | Plan section 17. |
| 7 | Concepts that need motion are shown as text or static pictures: Froude number and wave propagation, the jet splitting, boundary-layer growth, cavitation. Relationships that need a slider are sometimes shown as a static figure. | S10 text, `illos.jsx`. |
| 8 | The shell is a client-rendered SPA. Fetching the URL returns only "CE432P Hydraulic Engineering", so link previews and search see nothing. I reviewed the site from source, not from a rendered browser view. | `index.html` is an empty `#root`. |

**Metadata conflicts to resolve first:** the course plan lists the instructor as Dr Shibu K. Mani and the site lists Dr Arpan Pradhan. Textbook editions also differ: plan has Modi & Seth 21st (2017), Bansal 9th (2018), Chow 1993; `sessions.json` has 22nd (2022), 10th (2021), 1959/2009. Decide which is authoritative.

**Keep these (they work):** the markdown + KaTeX pipeline; the `::widget[id]` directive; the `check` (numeric with tolerance) and `quiz` blocks; `sessions.json` unlocking; the 15 lab files in `labs/`; the numerically clean worked examples, such as the S30 Pelton design (Q = 3.861 m³/s, D = 1.204 m).

---

## Part 1. Design principles

1. **One session is one story, not six tabs.** Each page follows the beat sequence in Part 2. A beat is a short, scrollable section. Tabs are removed.
2. **Picture, then equation.** Never introduce an equation before the student has seen the behaviour it describes.
3. **One primary interactive per session, built for that day's idea.** Reusing a component on another day is allowed only with a different mode and a different learning objective. See the catalogue in Part 4.
4. **Real flow first.** Show real video of the phenomenon (Part 4b) before any schematic. A schematic animation or simulation is the second view that explains what the video showed. **Match the medium to the idea:**
   - *Animation* when the idea is about change in time or motion: boundary-layer growth, separation, the roller of a jump, ripples travelling upstream, jet splitting, crank-slider motion, cavitation bubbles.
   - *Interactive plot* when the idea is a relationship between parameters: E-y, H-Q, η-u/V, Cf-x.
   - *Static diagram* when the idea is classification or geometry. Do not animate for decoration.
5. **Respect the plan's pedagogy tag** (see "Page type by pedagogy" below).
6. **Predict, then reveal.** Before the key interactive, ask the student to commit to a prediction (one tap). The reveal shows right or wrong with a reason.
7. **Content budget.** Visible theory is at most about 700 words and one derivation. Everything beyond the syllabus goes in a collapsed "Go deeper" section. Anything not in the plan or syllabus is "Go deeper" or deleted.
8. **No unsourced facts.** Every number, code or standard needs a source (T1/T2/T3/R-ref) or the tag `[instructor to supply]`. Do not invent field anecdotes. If there is no real case, write nothing.
9. **Numbers are tested.** Widgets and worked examples share one `hydraulics-core` module with unit tests against known textbook values (Part 5).
10. **Cross-links over repetition.** Reference earlier days with a chip ("uses Day 12"). Do not restate the earlier derivation.

### Page type by pedagogy

| Plan tag | Page emphasis |
|---|---|
| Chalk-Blackboard | Derivation stepper plus worked example plus practice. The site is the after-class reference, so equations must be complete and checkable. Keep the animation short. |
| Slide Deck + Visualization | Animation first. Minimal derivation, derivation collapsed by default. |
| Video / Demonstration | Embedded video or annotated screenshot sequence with "pause and predict" checkpoints. |
| Hands-on | Task sheet: goal, dataset, numbered steps with checkpoint values the student must hit, downloadable template, common-errors list. |
| Peer Discussion | Case cards with think-pair-share prompts and a reveal-after-discussion answer. |

---

## Part 1b. Simplicity rules (highest priority; they override everything else)

The target reader is a third-year BTech student meeting the topic for the first time. If a page is impressive but not simple, it fails.

1. **Plain words first.** Say it in everyday language, then give the technical term. Example: "the water speeds up until the drag from the walls cancels the pull of gravity (this is *uniform flow*)".
2. **One idea per screen.** A screen is one idea, one picture, at most 3 short sentences of text. Scrolling moves to the next idea.
3. **Analogy before equation.** Each key equation gets a one-line everyday analogy (for example, the E-y curve as a "bank balance of energy" with two ways to pay the same bill).
4. **Short sentences, short words.** Aim for about 15 words per sentence. No paragraph longer than 4 lines. Any term the student has not met gets a hover/tap glossary tip and is defined at first use.
5. **Show the "why" in every step.** Each derivation step and worked-example step carries a one-line reason ("because the plate is smooth, there is no force along it").
6. **Every equation is read aloud.** Under each key equation, a "in words" line.
7. **Interactives guide, never dump.** Start with one slider and one outcome. Reveal more controls only when the student asks ("Show more controls"). Give a first instruction ("Move this slider and watch the red dot").
8. **Progressive depth.** Layer 1 *Simple* (default, everything above). Layer 2 *Full derivation* (collapsed). Layer 3 *Go deeper* (beyond syllabus, collapsed). Exam content lives in layers 1-2.
9. **Be consistent.** The same symbol, colour and icon mean the same thing on every day (water = blue, energy line = red, bed = brown, Fr < 1 = teal, Fr > 1 = orange).
10. **Readability check.** Each session's layer-1 text must be checked by the builder (plain-language pass, no unexplained jargon) and spot-checked by the instructor.

### Splitting sessions into short parts

The plan's 45 days remain the anchors. Where one day carries too much to stay simple, split it into **parts of at most about 15 minutes each**, labelled `Day N · Part a / b / c`. Parts share the day's Day number and one front-matter file with `parts: [...]`, or sit in sub-files `S03a.md`, `S03b.md`. The instructor can unlock a whole day or a single part. There is no limit on the number of parts per unit, as long as each part stays simple and has its own picture and small interactive.

Suggested splits (the builder may propose more):

| Day | Parts |
|---|---|
| 1 | a Why fluid sticks to walls (no-slip); b The boundary layer idea; c Course map |
| 2 | a The three "lost" things (mass, momentum, energy); b Shape factor H |
| 3 | a Laminar layer: how it grows; b Momentum integral in three steps; c Compare with Blasius; d Numerical |
| 4 | a Laminar vs turbulent (see it); b The thin sublayer; c Smooth vs rough |
| 5 | a Local friction coefficient; b Average and drag; c Mixed boundary layer; d Numerical |
| 6 | a Why flow separates; b Pressure drag vs friction drag; c How to delay separation |
| 7 | a Pipe vs channel; b Geometry elements; c Types of channel and flow |
| 9 | a Why the flow stops accelerating; b Chezy then Manning; c What changes n |
| 12 | a Two depths, one flow; b The critical point; c Fr and the pebble test |
| 14 | a See the jump; b Why momentum, not energy; c Sequent depth and loss; d Types and location |
| 16 | **a** Slopes and profile classes (lecture); **b** dy/dx and control direction; **c** Direct-step computation (self-paced hands-on module) |
| 20 | a One moving plate; b A series of plates; c Why u = V/2 |
| 21 | a Velocity triangle basics; b Moving curved vane |
| 28, 30 | a Parts and working; b Velocity triangles; c Efficiency |
| 36 | a Pump and system curves; b Series and parallel; c NPSH |
| 39, 40 | one part per idea (grid, error, CFL; boundary types, well-posedness, turbulence) |

---

## Part 2. The Lesson Flow v2 (session page template)

Beats appear in this order. Beats 1-4 are the story, 5-7 are practice, 8-9 are closure. Every beat has a fixed anchor id so it can be linked.

| Beat | Content | Rule |
|---|---|---|
| 0 Header | Day, unit, CO, three outcomes "By the end you can...", prerequisite chips, reading refs (T/R), plan pedagogy tag, estimated time. | Outcomes are verbs from the plan's RBT level. |
| 1 Hook | A real situation plus one question, a photo or a 15-second animation. | At most 60 words. |
| 2 See it | The behaviour, shown. **Real footage first** (flume, field, lab film), then a schematic animation or a simulation render of the same phenomenon. No equations. See Part 4b. | Every clip has a caption that says what to notice, and a start/end time. |
| 3 Name it | Terms and symbols introduced one at a time, with a sticky symbol legend. | Define before use. Units always. |
| 4 Derive it | Derivation stepper: one step per click, each step annotated. | One derivation per session. Extra proofs go in "Go deeper". |
| 5 Play | The one primary interactive. Includes 2-3 "Try this" prompts, each with an expected observation, and a Predict-Reveal gate. | Every control has units and a reset. A "show numbers" readout is always visible. |
| 6 Worked example | Given / Find / Sketch / Method / Steps / Check. The inputs can be edited and the solution recomputes (parametrised example). | One main example. A second only if it teaches a different trap. |
| 7 Check | 3-5 items: one concept MCQ with distractors built from real misconceptions, one numeric item with tolerance, one "spot the error" item. | Wrong answers give a feedback message that names the misconception. |
| 8 Connect | Lab experiment, mini-project topic, or later day that uses this. 1-3 lines. | Replaces "Field Nuances". Real cases only. |
| 9 Recap card | Five lines: key equations plus the one idea to keep. It accumulates into a printable course formula sheet. | Auto-collected per day. |

**Front matter schema** (replaces tab markers): `day, unit, co, rbt, pedagogy, refs, outcomes[], prereq[days], widgets[], lab[], miniproject[], next`.
Session files are keyed by the plan's Day number, so `S07.md` is plan Day 7. Renumber the existing files to remove the drift, and make `sessions.json` use the same key. A split day uses sub-keys (`S03a`, `S03b`); `sessions.json` can unlock the day or each part (Part 1b). Add `parts[]` and `part` to the front matter.

---

## Part 3. Course flow: unit arcs

| Unit | Days | The story in one line |
|---|---|---|
| I Boundary layer | 1-6 | Why does fluid stick to a wall, how thick is the affected layer, what does it cost in drag, and when does it detach? |
| II Open channel flow | 7-16 | A canal engineer's journey: classify, conserve, resist, size, find the control (critical depth), change the section, dissipate energy (jump), measure, predict the profile. |
| III Impact of jets | 17-26 | Newton's second law applied to a stream: force on fixed vanes, then moving vanes, then a wheel of vanes. That sets up the turbine. |
| IV Hydraulic machines | 27-37 | From jet to machine: impulse turbine, reaction turbines, scaling, curves and cavitation; then the same physics reversed as pumps. |
| V CFD | 38-45 | From equations you cannot solve by hand to a model you can trust: the verify-and-validate habit, applied to the mini-project. |

**Threads that run through the whole course** (build once, reuse via chips):
- **Fr and wave propagation:** Day 12 (introduced), Day 16 (control direction in GVF), Day 40 (boundary conditions for sub/supercritical).
- **Roughness:** Day 4 (k vs sublayer), Day 9 (Manning n), Days 40 and 43 (n and wall roughness in HEC-RAS).
- **Velocity triangle:** Days 21, 24, 25, 28, 30, 31, 35. It is one builder with growing options.
- **Mini-project spine:** Stage I (Day 7 allotment, delivered through Days 10-16), Stage II (lab flume data), Stage III (Days 41-45).
- **Lab:** Exp 1-6 and 7 map to Days 15 and 9-11; Exp 8 to Days 20-21; Exp 11 to Days 35-36; Exp 12 to Days 28-31; Exp 9-10 to Days 42-44.

---

## Part 4. Widget catalogue

Build these as small, purpose-built components. All are React + SVG/Canvas, keyboard-operable, with `prefers-reduced-motion` support and a visible "schematic, not to scale" tag where relevant. Generic engines first:

| Engine | Purpose |
|---|---|
| `DerivationStepper` | Step reveal with per-step note and highlighted term. |
| `PredictReveal` | Commit a prediction, then reveal with explanation. |
| `NumericalClinic` | Parametrised problems, hint ladder (hint 1 draw the control volume, hint 2 draw the triangle, hint 3 write the equation), detects a named common error (for example using V instead of V-u). |
| `QuizEngine` | MCQ, numeric with tolerance, spot-the-error. Misconception-specific feedback. |
| `FormulaSheet` | Collects each day's recap card. |

Topic widgets (each tied to the days listed):

| Widget | Days | What it does |
|---|---|---|
| `FlatPlateBL` | 1, 3, 4, 5 | Plate with growing δ(x). Modes: concept, laminar vs Blasius, laminar vs turbulent profile, Cf(x) with transition and drag area. |
| `ThicknessAreas` | 2 | Profile chooser with shaded deficit areas giving δ*, θ, H. |
| `WallZoom` | 4 | Sublayer vs roughness height, giving k/δ' classification. |
| `SeparationLab` | 6 | Pressure-gradient dial with wall-shear sign. Cylinder with Re slider and Cd. |
| `CrossSection` | 7, 10, 11 | Pick shape; y, b, m give A, P, R, T, D with each element highlighted. |
| `IsovelProbe` | 8 | Velocity contours with aspect-ratio slider; α, β, and 0.6y vs 0.2/0.8y averages. |
| `UniformBalance` | 9, 11 | Gravity vs friction balance on a slope; water accelerates until balanced. Cowan n builder. |
| `ShapeOptimizer` | 10 | Fixed area, vary shape; P and Q update live with the minimum highlighted. Circular Q/Qfull and V/Vfull curves. |
| `NormalDepthSolver` | 11 | f(y)=Q(y)-Q plotted; bisection and Newton iterations animated. Exports a spreadsheet template. |
| `SpecificEnergyFlume` | 12, 13 | Flume side view synced to E-y and M-y diagrams. Wave test (pebble) for Fr. Hump and contraction with choking. |
| `JumpLab` | 14 | Roller animation, Fr1 slider, M-y diagram, tailwater slider to place the jump. |
| `WeirFlumeRating` | 15 | Device picker, rating curve, upload lab readings, back-calculates Cd. |
| `GVFExplorer` | 16 | Choose slope class and starting zone, profile drawn with dy/dx sign. Profile-sorter game. Direct-step table. |
| `JetForceLab` | 17-20, 23 | Jet, control volume and momentum arrows; plate type and motion selectable; F, W, η readouts and curves. |
| `VelocityTriangle` | 21, 24, 25, 28, 30, 31, 35 | Draggable V, u, Vr, angles. Inlet and outlet. Optional radii. Vw, work, η. |
| `PeltonDesigner` | 28, 29 | Step wizard from P, H, N to Q, D, d, nj, Z with a scaled runner drawing. |
| `HydroSchematic` + `TurbineChooser` | 27, 32 | Scheme with gross/net head. Head-Q map and Ns strip highlight the turbine type for a site. Runner shape morph. |
| `TurbineCutaway` | 30, 31 | Flow path through casing, guide vanes, runner, draft tube. Guide-vane opening slider drives the inlet triangle. Kaplan blade-pitch. |
| `HillDiagram` | 33 | Operating-point explorer on the η hill. Cavitation bubble animation with local pressure vs vapour pressure. |
| `PumpMatcher` | 34-36 | Pump anatomy labelling; outlet triangle with β2; system curve vs pump curve for one pump, series and parallel; NPSH traffic light. Loads Exp 11 data. |
| `RecipCrank` | 37 | Crank angle scrubber, piston motion, discharge vs θ, single/double acting, air vessel. |
| `MeshLab` | 39 | 1D advection/shallow-wave on a grid; Δx and Δt sliders show numerical diffusion and instability at CFL > 1. Error vs Δx log-log slope. |
| `ValidationSheet` | 43-45 | Paste analytical, measured, 2D and 3D results to get % error, bar chart, mesh-convergence plot. |

---

## Part 4b. Media strategy: real flow video and animation

Students should see real water before they see a schematic. Use the sources below in this order of preference. The builder must **verify every link and licence itself**. No URL in this file has been checked.

| Priority | Source type | When to use | Delivery |
|---|---|---|---|
| 1 | **Instructor's own footage** (optional, if the instructor later films the lab flume, weirs, pumps, turbines or a Bengaluru drain) | Best match to the lab and recognisable to students. Not required for the first build; the web sources below fill the gap. | Self-host the mp4. |
| 2 | **Classic educational films and university flow-visualisation libraries.** Search for: the NCFMF "Illustrated Experiments in Fluid Mechanics" film series (boundary layers, flow visualisation, vorticity, turbulence, cavitation); Hunter Rouse's hydraulics films from Iowa (open channel flow, hydraulic jump, flow over weirs); university hydraulics lab channels and the Gallery of Fluid Motion (APS). | Boundary-layer growth and separation, laminar vs turbulent, hydraulic jump, cavitation, flow past a cylinder. | **Embed or link with start/end times.** Download only if the licence clearly allows it. |
| 3 | **Manufacturer and agency videos:** hydropower operators, turbine manufacturers, water boards, USBR and similar agencies | Real Pelton, Francis and Kaplan runners, draft tubes, Parshall flumes, spillway and stilling-basin operation. | Link or embed. These are usually not reusable offline. |
| 4 | **Simulation renders you produce:** HEC-RAS 2D and OpenFOAM/SimFlow outputs (free surface, velocity, vectors) exported as mp4 | Unit V, and also as the "second view" in Unit II (jump roller, flow over a weir, hump and contraction). It is the same tool the students will use. | Self-host. Record the case file so it can be re-run. |
| 5 | **Coded animation:** SVG/Canvas in the page, or rendered clips (for example Manim) | Things that cannot be filmed: control volumes with momentum arrows, velocity triangles, derivation steps, M-y and E-y diagrams. | In-page, or mp4 if heavy. |
| 6 | **AI-generated "realistic" video** | Only for non-technical hooks (a scene-setting opener). **Never** for physics: generated video routinely gets free surfaces, jumps, vortices and wave directions wrong, and a student would learn the wrong behaviour. If used, label it "illustration, not real flow". | Self-host with the label. |

### Media rules

1. **Sourcing (decided).** The builder finds the footage on the web; the instructor is not supplying it. Any video may be used, including unlicensed ones, because this is for the instructor's internal teaching use. The builder downloads (for example with `yt-dlp`) and trims (with `ffmpeg`) the clips, and records source URL, author and licence in the manifest.
   - **Caution on hosting.** GitHub Pages is public. If the repo and site are public, putting unlicensed clips in them is redistribution, not internal use. So keep downloaded unlicensed clips in a **local-only folder** (`media_local/`, listed in `.gitignore`) that plays from the instructor's laptop in class, and have the **public site embed the original link** instead. Only clips that are public domain, openly licensed, or generated by the instructor go into the public `media/` folder. If the instructor makes the repo private or password-protects the site, this rule can be relaxed. The manifest field `host` (`local-only | public | link`) controls it.
2. **Format.** H.264 mp4, at most about 10 MB per clip, 720p or lower, clips of 10-40 s with the key moment cut in. Muted autoplay loop for short phenomena; click-to-play with controls and captions for longer ones. Always add a poster image and a text caption. No clip is required for the lesson to make sense (the caption and a figure carry the idea if the video fails to load).
3. **Repo size.** GitHub Pages sites should stay small. Keep a media budget (for example under 300 MB total). Larger or unlicensed clips stay as links.
4. **Sync with the lesson.** Where possible, put the real clip and the schematic animation or the simulation side by side, with a "what to notice" caption, so the student maps the picture to the physics. Example: real jump (clip) beside `JumpLab` at the same Fr1.
5. **Honesty tags.** Each clip is marked *real*, *simulation* (with the tool and case) or *schematic*. The student must always know which.
6. **Accessibility.** Captions or a transcript; `prefers-reduced-motion` respected (no autoplay for these users); no flashing.

### Media manifest (`media/manifest.json`)

Every clip is an entry, so media can be audited and swapped without touching lesson text:

```json
{
  "id": "jump-real-01",
  "day": 14, "beat": "see-it",
  "kind": "real | simulation | schematic | generated",
  "delivery": "link | embed | local",
  "host": "local-only | public | link",
  "src": "URL or media/path.mp4",
  "start": 12, "end": 38,
  "caption": "Watch the roller and the sudden rise in level at the toe.",
  "notice": ["flow is fast and shallow upstream", "surface becomes rough and deeper downstream"],
  "licence": "own | public-domain | CC-BY | link-only",
  "credit": "source / author",
  "verified_by_builder": false
}
```

The builder sets `verified_by_builder` to true only after opening the link, confirming the content matches the caption, and recording the licence. The instructor reviews all entries with `kind: generated` or `licence: link-only`.

### Footage needed per phenomenon

| Day(s) | Phenomenon | Real footage to find or shoot | Second view |
|---|---|---|---|
| 1, 3 | Boundary-layer growth | Dye or smoke over a plate (flow-visualisation film) | `FlatPlateBL` |
| 4 | Laminar vs turbulent | Dye streak breaking into eddies; pipe or flume Reynolds-style demo | Side-by-side profile animation |
| 6 | Separation | Flow past a cylinder or diffuser; stalled wing; bridge pier wake in a river | `SeparationLab` |
| 7, 8 | Free surface, velocity dip | Instructor flume with dye or floats; river current-meter gauging | `IsovelProbe` |
| 9 | Uniform flow | Steady flow in a lined canal or the lab flume | `UniformBalance` |
| 12 | Subcritical vs supercritical (ripples) | Pebble or tapping test in the lab flume at Fr < 1 and Fr > 1 | `SpecificEnergyFlume` pebble test |
| 13 | Hump, contraction, choking | Lab flume with a bed hump or a narrowed section | `SpecificEnergyFlume` |
| 14 | Hydraulic jump | Jump below a sluice gate in the lab; a spillway stilling basin; the "kitchen-sink" jump as a light hook | `JumpLab` |
| 15 | Flumes and weirs | Parshall flume and broad-crested weir in operation | `WeirFlumeRating` |
| 16 | Backwater and drawdown | Flow upstream of a weir; drawdown at a free overfall | `GVFExplorer` |
| 17-21 | Jet on plates and vanes | High-speed or slow-motion jet hitting flat, inclined and curved plates | `JetForceLab` |
| 28-31 | Turbines | Pelton jet and runner (including slow-motion buckets), Francis runner and spiral casing, Kaplan blade adjustment | `TurbineCutaway` |
| 33 | Cavitation | Cavitating hydrofoil or propeller in a water tunnel; eroded runner photo | `HillDiagram` bubble animation |
| 34-37 | Pumps | Transparent-casing centrifugal pump; reciprocating pump piston and valves | `PumpMatcher`, `RecipCrank` |
| 38-45 | CFD | Exports from your own HEC-RAS 2D and SimFlow runs next to the flume clip of the same case | `ValidationSheet` |

---

## Part 5. Quality and testing rules

- One shared `hydraulics-core` module (pure functions, no UI). Worked examples, widgets and quiz keys all call it.
- Unit tests must pass against these known values before any session ships:
  - Parabolic profile u/U = 2(y/δ) - (y/δ)²: δ*/δ = 1/3, θ/δ = 2/15, H = 2.5. Linear profile: δ*/δ = 1/2, θ/δ = 1/6, H = 3.
  - Blasius: δ = 5.0x/√Re_x, Cf = 0.664/√Re_x, C_D = 1.328/√Re_L. Cubic profile: δ = 4.64x/√Re_x.
  - Economical rectangle b = 2y, R = y/2; economical trapezoid is a half-hexagon with R = y/2; circular section Q max at y/D = 0.938, V max at 0.81.
  - Rectangular critical flow: y_c = (q²/g)^(1/3), E_c = 1.5 y_c; q max at y = 2E/3.
  - Jump: Fr1 = 3 gives y2/y1 = 3.77; ΔE = (y2-y1)³/(4 y1 y2).
  - Broad-crested weir ideal: Q = 1.705 b H^(3/2).
  - Single moving plate: η max 8/27 at u = V/3. Series of vanes: η max 50% at u = V/2 (flat), 100% ideal at 180° deflection.
  - Pelton example (S30): P = 12 000 kW, H = 360 m, N = 600 rpm, η_o = 0.88 gives Q = 3.861 m³/s, D = 1.204 m.
- Textbook thresholds that vary between books (smooth/rough limits on k/δ' or on k·u*/ν, Ns ranges, jet-ratio range) are shown with the book cited, and the instructor confirms which book governs.
- Accessibility: contrast AA, all controls reachable by keyboard, animations pause on request, text alternatives for each figure.
- Mobile: layout works at 360 px, widgets stack, no horizontal scroll.
- A session is *done* only if: front matter complete, all nine beats present or intentionally omitted with a reason, the widget works on mobile, all tests pass, every external fact has a source or the instructor tag, and there is no leftover placeholder text.

---

## Part 6. Day-by-day content flow

Format: *Hook* is the opening question. *Flow* is the order of ideas (Name/Derive). *Animate* and *Interactive* are the visuals. *Example* and *Check* cover the practice. *Link* is the lab, mini-project or callback.

### UNIT I: Boundary layer theory (CO1)

**Day 1. Course orientation; concept of the boundary layer** (Slide Deck, T1/T2)
- Hook: Water is "thin", yet a ship hull or an aircraft wing feels strong drag. Where does that drag come from?
- Flow: no-slip at the wall → velocity gradient near the wall → Prandtl's idea (thin viscous layer + outside flow treated as inviscid) → definition δ at u = 0.99U → assumptions (δ ≪ L, pressure constant across the layer) → Re_x as the controlling number.
- Animate: flow over a plate, velocity vectors in the layer grow with x and δ(x) is traced.
- Interactive: `FlatPlateBL` (concept mode): U, ν, x sliders give δ and Re_x.
- Example: compute Re_x and see whether the layer is laminar for water over a canal lining and for air over a wing.
- Also on Day 1: a one-page **Course map** (five units, COs, assessment, mini-project, lab schedule). It is a separate page, not part of the lesson.

**Day 2. Displacement, momentum and energy thickness** (Slide + Chalk)
- Hook: how much flow is "lost" because of the wall?
- Flow: mass deficit → δ* (the wall displaces the streamlines) → momentum deficit → θ (links to drag) → energy deficit → δ_E → shape factor H = δ*/θ (preview: H grows near separation).
- Animate: the shaded area between U and u(y), with the streamline displaced upward by δ*.
- Interactive: `ThicknessAreas`: choose linear, parabolic, 1/7-power profile. Areas shade and δ*, θ, H update.
- Example: given a parabolic profile, find δ*, θ, H as fractions of δ (check against Part 5 values).
- Check: spot the error (student swaps the δ* and θ definitions).

**Day 3. Laminar boundary layer on a flat plate; numerical** (Chalk)
- Hook: can we predict δ(x) without solving the full equations?
- Flow: von Kármán momentum integral equation → assume a profile → get δ/x and Cf → compare with Blasius (δ = 5.0x/√Re_x, Cf = 0.664/√Re_x).
- Animate: derivation stepper only. No decorative animation.
- Interactive: `FlatPlateBL` (laminar mode): profile chooser (linear, parabolic, cubic, sine) with δ/x constant and % error vs Blasius.
- Example: air or water over a plate, find δ, τ0 and drag over a length (parametrised, `NumericalClinic`).

**Day 4. Turbulent boundary layer; laminar sub-layer; smooth and rough boundaries** (Slide + Visualization)
- Hook: why does a golf ball with dimples fly further, and why is a concrete canal rougher than a glass flume?
- Flow: laminar vs turbulent profile (turbulent is fuller, steeper at the wall) → 1/7-power law → δ and Cf for turbulent flow → shear velocity u* = √(τ0/ρ) → sublayer thickness δ' = 11.6 ν/u* → compare roughness height k with δ' → hydraulically smooth, transitional, rough.
- Animate: side-by-side dye streaks (laminar layers vs turbulent eddies) with their velocity profiles.
- Interactive: `WallZoom`: slider for k and u* shows whether roughness hides in the sublayer or pokes through, and classifies the wall. Link forward to Manning n on Day 9.
- Example: classify a boundary as smooth or rough for a given k, u*, ν.

**Day 5. Local and average friction coefficients; numerical** (Chalk)
- Hook: how much force does a canal gate or a ship hull take from friction?
- Flow: τ0 and Cf = τ0 / (½ρU²) → average C_D over length L → laminar C_D = 1.328/√Re_L → turbulent C_D ≈ 0.074/Re_L^(1/5) → mixed boundary layer (transition at Re_cr) → drag F = C_D · ½ρU² · (width × L), both sides if needed.
- Animate: Cf(x) curve drawn as the plate lengthens, with the transition point marked and the area under the curve shown as drag.
- Interactive: `FlatPlateBL` (drag mode): plate length slider, laminar-only, turbulent-only and mixed curves.
- Example: drag on a plate of given size in water, with transition included.

**Day 6. Separation and control** (Slide + Visualization)
- Hook: why does a bridge pier shed a wake, and why do aircraft wings stall?
- Flow: adverse pressure gradient → the layer slows near the wall → wall shear goes to zero (separation point) → reversed flow and wake → pressure drag vs friction drag → streamlined vs bluff bodies → control methods (streamlining, suction, vortex generators, tripping).
- Animate: flow over a diffuser or cylinder; as the pressure gradient dial moves from favourable to adverse the near-wall profile flattens, reverses, and a recirculation bubble forms.
- Interactive: `SeparationLab`: pressure-gradient dial with wall-shear sign; cylinder with a Re slider and Cd.
- Example: concept-based; no long numerical.
- Link: Mini-project 14 (bridge pier); foreshadows channel expansion separation (Day 13).
- End of unit: a short mixed checkpoint (6 items).

### UNIT II: Open channel flow (CO2)

**Day 7. Open-channel vs pipe flow; geometry; classification; mini-project topics (Stage I)** (Slide Deck)
- Hook: a pipe and a canal carry the same discharge. Why can't we use the pipe formulas as they are?
- Flow: free surface → gravity drives the flow → pressure is hydrostatic and HGL = water surface → geometric elements y, A, P, R, T, D for rectangle, trapezoid, triangle, circle → types of channel (prismatic or not) → types of flow (steady/unsteady, uniform/non-uniform, GVF vs RVF).
- Animate: pipe and channel side by side, EGL/HGL drawn along each.
- Interactive: `CrossSection`: pick a shape and enter y, b, m to get A, P, R, T, D with each highlighted. Classification sort: drag cases (backwater behind a dam, flood wave, steady canal) into the steady/uniform grid.
- Example: elements for a trapezoid and for a partly full circular pipe.
- Move to "Go deeper": the six forces, Weber number, alluvial degrees of freedom.
- Link: allot mini-project topics; download the Stage I template and rubric.

**Day 8. Velocity distribution; continuity, energy and momentum equations** (Slide + Chalk)
- Hook: where in the cross-section is the water fastest, and why is it not at the surface?
- Flow: no-slip at bed and banks → isovels → velocity dip and aspect ratio → mean velocity by 0.6y or by the average of 0.2y and 0.8y → continuity Q = AV → energy equation with α → momentum equation with β (sets up the jump).
- Animate: velocity contours with the aspect ratio changing from a narrow flume to a wide river.
- Interactive: `IsovelProbe` (reuse the existing α/β integrator if it passes the Part 5 checks).
- Example: given point velocities, compute Q, α, β and the 0.2/0.8 mean.

**Day 9. Uniform flow: Chezy and Manning; factors affecting n** (Chalk)
- Hook: a canal does not accelerate forever. What stops it?
- Flow: uniform flow is a force balance (gravity component = boundary shear) → τ0 = γRS → Chezy V = C√(RS) → Manning V = (1/n) R^(2/3) S^(1/2) → conveyance K → factors affecting n (surface roughness, vegetation, irregularity, alignment, silting/scouring, obstruction, stage and discharge) → Cowan's method.
- Animate: water released on a slope speeds up until friction equals the gravity component, then holds constant.
- Interactive: `UniformBalance`: S, n, b sliders show the depth at which the two forces balance. Cowan builder (set each factor, see n and resulting capacity). Composite roughness (keep existing logic).
- Example: Q for a concrete trapezoidal canal; then the same canal with weeds, to see the effect of n.
- Link: Day 4 roughness; flume tests for mini-project 10.

**Day 10. Most economical sections; numerical** (Chalk)
- Hook: for a given area, which shape carries the most for the least lining?
- Flow: fixed A, S, n: Q is largest when P is smallest → rectangle b = 2y (R = y/2) → trapezoid, the half-hexagon (R = y/2) → triangle best at 45° side slope → circular section (Q max at 0.938D, V max at 0.81D).
- Animate: none beyond the optimizer.
- Interactive: `ShapeOptimizer`: vary b/y at fixed area, watch P fall and Q rise to a peak. Circular Q/Qfull and V/Vfull vs y/D curve with the two markers.
- Example: design the economical trapezoid for given Q, S, n, side slope. Follow-up question "Is economical always best?" (velocity limits, freeboard, excavation depth).
- Link: mini-project 2.

**Day 11. Computation of uniform flow and normal depth; analytical and spreadsheet/software** (Hands-on)
- Hook: Manning's equation is implicit in y. How do we solve it?
- Flow: analysis problem (find Q) vs design problem (find y_n) → trial and error → AR^(2/3) = Qn/√S chart → Goal Seek or Newton in a spreadsheet → check in HEC-RAS 1D.
- Animate: bisection shrinking the bracket on the f(y) curve.
- Interactive: `NormalDepthSolver` plus a downloadable spreadsheet template with checkpoint cells the student must match.
- Task sheet: Goal Seek on a given section; compare spreadsheet vs solver vs HEC-RAS 1D.
- Link: mini-projects 1, 13 (real Bengaluru drain data `[instructor to supply]`).

**Day 12. Specific energy, critical flow, critical depth, discharge curve** (Slide + Chalk)
- Hook: one discharge, two possible depths. Which one does the river choose?
- Flow: E = y + Q²/(2gA²) → E-y curve → alternate depths → minimum E at critical depth → y_c = (q²/g)^(1/3), E_c = 1.5 y_c → Fr = V/√(gD) → subcritical, critical, supercritical → discharge curve (q max at y = 2E/3).
- Animate: the **pebble test**. A pebble dropped in a stream sends ripples that travel upstream when Fr < 1, stand still at Fr = 1, and are swept downstream when Fr > 1. This is what makes Fr matter.
- Interactive: `SpecificEnergyFlume`: a draggable point on the E-y curve at constant q, with a synced flume side view and readouts of y, V, Fr, E. Toggle to the q-y curve at constant E.
- Example: rectangular channel: y_c, E_c, and the alternate depth for a given E.
- Link: Exp 4 (broad-crested weir) preview; mini-projects 6, 15.

**Day 13. Specific force; channel transitions (hump, contraction); numerical** (Chalk)
- Hook: what does a raised bed or a narrower channel do to the water level? The answer is different for subcritical and supercritical flow.
- Flow: specific force M = Q²/(gA) + A·ȳ → conjugate depths have equal M (bridge to Day 14) → hump: ΔE = Δz → contraction: q increases → choking (Δz_max = E1 − E_c) → afflux upstream when choked.
- Animate: sliders for hump height or width; the water surface follows and the state point moves on the E-y diagram. At the choking limit the upstream depth rises.
- Interactive: `SpecificEnergyFlume` (transition mode) with a Predict-Reveal ("raise the hump: does the depth over it rise or fall?").
- Example: subcritical flow over a hump, find the depth over it and the largest Δz before choking.
- Link: mini-project 9; channel expansion separation from Day 6.

**Day 14. Hydraulic jump** (Slide + Visualization)
- Hook: why is there a standing wave of white water below every spillway or sluice?
- Flow: supercritical → subcritical → momentum conservation using the M-y diagram → y2/y1 = ½(√(1+8Fr1²) − 1) → energy loss ΔE = (y2−y1)³/(4 y1 y2) → length ≈ 6 y2 → types by Fr1 (undular 1-1.7, weak 1.7-2.5, oscillating 2.5-4.5, steady 4.5-9, strong > 9) → applications (energy dissipation, mixing, aeration, raising level) → jump location against tailwater (drowned, sweeping out, free).
- Animate: the roller as moving particles, changing as Fr1 changes.
- Interactive: `JumpLab`: Fr1 slider with M-y diagram synced; tailwater slider moves the jump upstream or downstream of the gate.
- Example: sequent depth, length, energy loss and power dissipated (γQΔE), shown as % of the incoming energy.
- Link: mini-projects 3 and 15; sluice gate in lab flume.

**Day 15. Measurement of discharge: venturi flume, standing-wave flume, Parshall flume, broad-crested weir** (Slide + Video)
- Hook: how do you measure a river's flow without stopping it?
- Flow: a critical-depth section fixes a one-to-one head-discharge relation → venturi and standing-wave flumes → Parshall flume (throat width sets the size, Q = C·H^n with coefficients from the standard) → broad-crested weir Q = 1.705 Cd b H^(3/2) → free vs submerged flow and the modular limit.
- Animate: flow through each device with the control section highlighted.
- Interactive: `WeirFlumeRating`: pick a device, enter geometry, see the rating curve; upload Exp 4 readings to back-calculate Cd.
- Video: Parshall flume in the field `[instructor to supply]`.
- Example: Q over a broad-crested weir for a measured head; free-flow check.
- Link: Exps 1-4 and 5-6 (notches, weirs, venturi and orifice); mini-projects 4, 6.

**Day 16. Gradually varied flow** (Chalk + Hands-on)
- Hook: build a weir in a canal. How far upstream does the pool reach?
- Flow: dy/dx = (S0 − Sf)/(1 − Fr²) and what each term means → slope classes M, S, C, H, A → three zones → twelve profiles, with M1 (backwater), M2 (drawdown to an overfall) and S2 as the core cases → control direction (subcritical from downstream, supercritical from upstream) → direct-step method Δx = (E2 − E1)/(S0 − S̄f).
- Animate: the profile builds from its control section along the channel, with the sign of dy/dx explained.
- Interactive: `GVFExplorer`: choose slope class and starting zone to get the profile. Profile-sorter game: given a channel sketch (break in grade, weir, sluice) pick the profile. Direct-step table with plot.
- Example: M1 backwater length behind a weir by the direct-step method; compare with HEC-RAS 1D.
- **Decided: split into three parts** (Part 1b). Parts a and b are the lecture (slopes and classes; dy/dx and control direction). Part c is a self-paced hands-on module for the direct-step computation.
- Link: mini-projects 7, 8, 13.
- End of unit: **Canal capstone**, one integrated case: design the canal (Day 10) → normal depth (Day 11) → drop structure and critical depth (Day 12) → jump basin (Day 14) → backwater (Day 16). It is the Stage I spine.

### UNIT III: Impact of jets (CO3)

**Day 17. Impulse-momentum principle; jet on a stationary vertical flat plate** (Slide + Chalk)
- Hook: a pressure washer or fire hose pushes back. How hard?
- Flow: choose a control volume → F = ρQ(V_out − V_in) as a vector → force on the fluid vs force on the plate (sign convention) → F = ρaV².
- Animate: jet hitting a plate with the control volume outlined and momentum arrows entering and leaving.
- Interactive: `JetForceLab` (stationary flat mode): V, d give Q and F, with a sign-convention toggle. Predict-Reveal ("double V: does F go ×2, ×4 or ×8?").
- Example: force of a jet of given diameter and speed.

**Day 18. Jet on a stationary inclined flat plate** (Chalk)
- Hook: how does the force change if the plate is tilted?
- Flow: smooth plate means no tangential force → F_n = ρaV² sin θ → components F_x, F_y → discharge division Q1 = (Q/2)(1 + cos θ), Q2 = (Q/2)(1 − cos θ).
- Animate: the jet splitting into two unequal streams as θ changes.
- Interactive: `JetForceLab` (inclined mode): θ slider shows the split bars and the force decomposition.
- Example: keep the existing one (d = 40 mm, V = 20 m/s, θ = 30°, F_n = 251.3 N).

**Day 19. Stationary curved plates (symmetrical and unsymmetrical)** (Chalk)
- Hook: why is a bucket worth twice a flat plate?
- Flow: the jet is turned through angle θ → symmetrical vane with jet at the centre → unsymmetrical vane with jet at one tip → hemispherical gives F = 2ρaV².
- Animate: momentum vectors reversing as the vane angle increases.
- Interactive: `JetForceLab` (curved mode): vane angle slider 0-180° plotting force ratio against the flat-plate force.
- Example: symmetrical vane (F in the jet direction); unsymmetrical vane (F_x and F_y).

**Day 20. Moving flat plates (vertical and inclined)** (Chalk)
- Hook: if the plate runs away from the jet, how much do you gain?
- Flow: relative velocity V − u → a single moving plate receives ρa(V − u) of mass per second → F = ρa(V − u)² → work F·u → η = 2u(V − u)²/V³, max 8/27 at u = V/3 → series of plates receives the whole ρaV → W = ρaV(V − u)u → η max 50% at u = V/2.
- Animate: moving plate with a toggle between ground frame and plate frame (this is the usual sticking point).
- Interactive: `JetForceLab` (moving mode): u/V slider; both efficiency curves on one plot with their peaks.
- Example: moving vertical plate: F, work, η. Moving inclined plate: normal force and its components.
- Link: Exp 8 (vane coefficient).

**Day 21. Moving curved vane; work done and efficiency** (Chalk + Visualization)
- Hook: how do you extract the most work from a jet?
- Flow: velocity triangles at inlet and outlet (V, u, Vr) → Vr and vane angle → work per second → efficiency → 100% ideal at 180° deflection with u = V/2 (series) → Pelton precursor.
- Animate: vane and jet seen from both frames.
- Interactive: `VelocityTriangle` (first appearance): drag u and vane angle, read Vw1, Vw2, work and η.
- Example: jet on a moving symmetrical curved vane.

**Day 22. Numerical on stationary and moving plates** (Chalk)
- Format: `NumericalClinic`, 6-8 graded problems (recall, apply, analyse), parametrised, hint ladder, and error detection (for example using V instead of V − u).
- Include a "spot the error" set on sign convention.

**Day 23. Series of flat radial vanes** (Slide + Chalk)
- Hook: how does a wheel use the whole jet?
- Flow: next vane always arrives so all of ρQ is used → torque = ρQ(V_w1 R1 ∓ V_w2 R2) → power = torque × ω → flat radial vanes.
- Animate: a wheel of vanes turning, with the single-plate vs wheel contrast.
- Interactive: `JetForceLab` (wheel mode): R, N sliders give torque, power, η.
- Example: flat vanes on a wheel for given R and N.

**Day 24. Series of curved radial vanes; velocity triangles** (Chalk)
- Flow: radial vanes with R1 and R2 → torque and work per unit weight (V_w1 u1 ± V_w2 u2)/g → sign convention for V_w2 → link to the Euler turbine equation.
- Interactive: `VelocityTriangle` (radial mode): inlet and outlet triangles side by side with radii.
- Example: curved radial vanes with a given jet and wheel speed.

**Day 25. Numerical on velocity triangles and efficiency** (Chalk)
- Format: `NumericalClinic` plus a to-scale triangle canvas. Students enter angles and velocities and the canvas checks their drawing. This trains the skill needed for CIA III Part A.

**Day 26. Applications to turbine runners; problem-solving session** (Peer Discussion)
- Format: case cards with think-pair-share prompts, answers revealed after discussion. Examples: "Why does a Pelton bucket have a splitter in the middle?" and "Why can't a real Pelton wheel reach 100%?" (the vane angle is less than 180° and there is friction).
- Close with a Unit III checkpoint and a bridge to Unit IV: the optimum u = V/2 becomes the Pelton speed ratio of about 0.45.

### UNIT IV: Hydraulic machines (CO4)

**Day 27. Introduction to hydraulic machines; classification of turbines; heads and efficiencies** (Slide Deck)
- Hook: a hydropower scheme map. Where does the head go?
- Flow: gross head, net head H = Hg − hf → power P = ρgQHη → impulse vs reaction → tangential, radial, axial flow → hydraulic, mechanical, volumetric and overall efficiency (η_o = η_h η_m η_v).
- Animate: none. Use a clickable schematic.
- Interactive: `HydroSchematic`: click reservoir, penstock, turbine, tailrace to see the heads and losses. `TurbineChooser`: place a site on a head-Q map to see the likely type (use approximate ranges from T2).
- Example: power available and overall efficiency at a small-hydro site.

**Day 28. Pelton wheel: components, working, velocity triangles** (Slide + Video)
- Flow: nozzle, spear, buckets with splitter, casing, breaking jet → V1 = Cv√(2gH) → inlet and outlet triangles (Vr2 = k·Vr1, angle φ) → work = ρQ(Vw1 + Vw2)u → η_h = 2u(V1 − u)(1 + k cos φ)/V1².
- Animate: runner turning under the jet with the triangle overlaid.
- Interactive: `VelocityTriangle` (Pelton mode) and an η_h vs u/V1 curve (peak at 0.5 ideal, about 0.45 in practice).
- Video: a real Pelton runner `[instructor to supply]`.
- Link: Exp 12.

**Day 29. Design features of the Pelton wheel; numerical** (Chalk)
- Flow: jet ratio m = D/d (about 12) → buckets Z = 15 + D/(2d) → bucket proportions in terms of d → number of jets → N from the synchronous speed.
- Interactive: `PeltonDesigner`, a step wizard with the equation shown at each step, reproducing the S30 example (Q = 3.861 m³/s, D = 1.204 m, six nozzles, Z = 21).
- Example: use S30 as the canonical example.

**Day 30. Francis turbine: working, triangles, design features** (Slide + Video)
- Flow: spiral casing → stay vanes → guide vanes → runner → draft tube → inlet triangle with guide-vane angle α → radial outlet (Vw2 = 0) so η_h = Vw1·u1/(gH) → speed ratio and flow ratio.
- Animate: cutaway with water travelling through; the guide-vane opening slider changes α and Q.
- Interactive: `TurbineCutaway` (Francis) with `VelocityTriangle` (Francis mode).
- Example: Francis runner from head, speed and ratios.

**Day 31. Kaplan and propeller turbines; draft tube** (Slide + Video)
- Flow: axial flow → adjustable blades (Kaplan, double regulation) vs fixed (propeller) → hub ratio → draft tube recovers kinetic energy and lowers the runner outlet pressure.
- Animate: blade pitch changing with load; EGL and HGL along the draft tube.
- Interactive: `TurbineCutaway` (Kaplan mode): outlet-area slider shows the head regained and the runner-outlet pressure.
- Example: Kaplan runner diameter and speed for a given head and discharge.

**Day 32. Specific speed and unit quantities; numerical** (Chalk)
- Flow: unit speed, discharge and power (N_u = N/√H and so on) → specific speed Ns = N√P/H^(5/4) → model-prototype scaling → selecting the turbine by Ns.
- Animate: the runner shape morphing from Pelton to Francis to Kaplan as Ns rises.
- Interactive: `TurbineChooser` (Ns mode). It must show every step, not only the final answer, because it feeds Assignment Part A.
- Example: scale a model test to a prototype.

**Day 33. Characteristic curves; cavitation** (Slide + Visualization)
- Flow: main curves (constant head), operating curves (constant speed), constant-efficiency (hill) curves → part-load behaviour of Kaplan, Francis and Pelton → cavitation: vapour pressure, Thoma σ = (Ha − Hv − Hs)/H.
- Animate: bubbles forming where local pressure falls below vapour pressure and collapsing against the blade.
- Interactive: `HillDiagram`: move the operating point and read η; overlay part-load curves of the turbine types.

**Day 34. Centrifugal pumps: classification, components, working** (Slide + Video)
- Flow: impeller, volute, casing, suction pipe with foot valve, delivery → priming → energy conversion → classification (single or multistage, single or double suction, radial, mixed, axial).
- Animate: particle path through a pump section with pressure colouring; toggle "air in the casing" to show why it will not pump.
- Interactive: `PumpMatcher` (anatomy mode): drag labels onto components, then run the flow.
- Link: Exp 11.

**Day 35. Heads, work done and efficiencies of centrifugal pumps; numerical** (Chalk)
- Flow: static, suction and delivery heads → manometric head Hm → Euler head Vw2·u2/g → manometric, mechanical and overall efficiency → outlet triangle with β2 (backward, radial, forward) → power = ρgQHm/η_o.
- Interactive: `PumpMatcher` (triangle mode) with a β2 slider: head and the pressure/kinetic split update, and the student sees why backward-curved vanes are used.
- Example: Hm and power from D, N, β2 and Q.

**Day 36. Pumps in series and parallel; characteristic curves; NPSH** (Slide + Chalk)
- Flow: H-Q, P-Q, η-Q curves and the best efficiency point → system curve H = Hs + KQ² → operating point as the intersection → series adds heads, parallel adds flows → NPSH_a vs NPSH_r.
- Interactive: `PumpMatcher` (system mode): sliders for static lift and pipe losses; one pump, two in series and two in parallel, with the operating point for each and an NPSH traffic light. It shows that two pumps in parallel do not double the flow when friction is high. Loads Exp 11 data as the pump curve.
- Link: CIA III Hydraulic Machines Assignment Part B.

**Day 37. Reciprocating pumps: working, discharge, slip, efficiency** (Slide + Chalk)
- Flow: piston, cylinder, valves → Q = ALN/60 (single acting) and 2ALN/60 (double acting) → slip and negative slip → air vessel.
- Animate: crank-slider motion with discharge vs crank angle; the air vessel smoothing the flow.
- Interactive: `RecipCrank`.
- Example: slip for a given pump.
- End of unit: **Small-hydro and lift-irrigation case** tying turbines and pumps together. The Hydraulic Machines Assignment is issued in Week 11.

### UNIT V: Computational fluid dynamics (CO5)

**Day 38. Introduction to CFD; governing equations** (Slide Deck)
- Hook: a HEC-RAS or OpenFOAM jump simulation shown beside a flume photo of the same jump.
- Flow: why CFD → continuity and momentum (Navier-Stokes) → workflow (geometry, mesh, physics and boundary conditions, solve, post-process, validate) → the model ladder 1D (Saint-Venant), 2D (shallow water), 3D (RANS + VOF) and when to use each.
- Interactive: model-ladder explorer (click each rung for cost vs fidelity); match questions to models (flood inundation → 2D, jump roller → 3D, canal GVF → 1D).
- Example: hand finite-volume balance on three cells.

**Day 39. Discretisation and grid generation; mesh quality** (Slide + Demonstration)
- Flow: finite difference and finite volume → forward vs central, truncation error and order → structured vs unstructured → cell size, aspect ratio, skewness → refinement where gradients are large → mesh independence → CFL = VΔt/Δx.
- Interactive: `MeshLab`: Δx and Δt sliders on a 1D wave or advection problem show numerical diffusion and instability at CFL > 1. Error vs Δx on log-log axes gives the order.
- Demonstration: screen recording of mesh generation in SimFlow and HEC-RAS.
- Example: compute CFL and pick Δt.

**Day 40. Initial and boundary conditions; basics of turbulence modelling** (Slide Deck)
- Flow: boundary types (inlet discharge, outlet stage or normal depth, wall with no-slip or roughness, symmetry) → initial conditions and spin-up → well-posedness: subcritical flow needs a downstream condition, supercritical needs an upstream one (callback to Day 12) → Reynolds averaging, eddy viscosity, k-ε and k-ω awareness, wall functions.
- Interactive: boundary-condition picker: choose which boundaries to specify for a sub- or supercritical case and see whether the problem is well posed. Roughness translator between k_s and Manning n (callback to Days 4 and 9).
- Example: set the boundary conditions for the flume mini-project.

**Day 41. OpenFOAM through SimFlow: meshing, interFoam (VOF)** (Demonstration)
- Format: annotated step sequence with "pause and predict" checkpoints (what happens if the inlet speed doubles?) and a downloadable sample case. First case: dam break, validated by checking the front speed against 2√(g h0) for the idealised dry-bed case.
- Flow: mesh → set the alpha field → boundary conditions → time step and max Courant number → run → post-process the free surface (alpha = 0.5).

**Day 42. ANSYS-Fluent workflow (demonstration); introduction to HEC-RAS 2D** (Demonstration + Hands-on)
- Fluent is shown, not hands-on (state the licence limit on the page); its steps mirror SimFlow.
- HEC-RAS 2D "Hello 2D" task sheet (about 20 min): terrain in RAS Mapper → 2D flow area → mesh and breaklines → boundary-condition lines → Manning n layer → unsteady run. Equation set choice: diffusion wave vs full momentum.
- Include a **common errors index** (model blows up, negative depths, bad BC, Courant).

**Day 43. Uniform flow in HEC-RAS 2D (3D comparison from SimFlow)** (Hands-on)
- Task: replicate mini-project 1. Compare simulated depth with the Manning normal depth from Day 11; run three meshes and record the % error.
- Interactive: `ValidationSheet`: paste results to get % error, a bar chart and a mesh-convergence plot.

**Day 44. Non-uniform flow (weir or hydraulic jump) in HEC-RAS 2D** (Hands-on)
- Task: broad-crested weir (mini-project 4) or sluice-gate jump (mini-project 3). Compare critical depth or Cd and the water-surface profile.
- Discuss the limit of a depth-averaged 2D model (cannot resolve the roller) and what a 3D model adds.
- Interactive: `ValidationSheet` profile overlay of analytical, measured, HEC-RAS and SimFlow results. This is the Stage III chart template.

**Day 45. Comparison of experimental data with 2D and 3D models; mini-project Stage III guidance** (Discussion)
- Format: Stage III clinic. A report skeleton that mirrors the rubric (structure 8, set-up 10, results 8, validation 10, interpretation 6, presentation and viva 6, AI-use log 2). Examples of weak and strong validation statements. AI-use log template.
- Close with a one-page course recap against the five COs.

---

## Part 7. How to build it (phases)

| Phase | Work | Gate |
|---|---|---|
| 0 | Fix numbering (key sessions by plan Day), settle metadata conflicts, set up `hydraulics-core` with the Part 5 tests, new front-matter schema and Lesson Flow v2 renderer. | Tests pass. |
| 1 | **Pilot: Day 12 and Day 14** (the best showcase of animation + interactive + derivation). Build `SpecificEnergyFlume`, `JumpLab`, `DerivationStepper`, `PredictReveal`, `QuizEngine`. | **Instructor sign-off before anything else is built.** |
| 2 | Unit II complete (Days 7-16) with the canal capstone. Highest weight: CO2, mini-project spine. | Instructor review. |
| 3 | Unit III (17-26) with `JetForceLab`, `VelocityTriangle`, `NumericalClinic`. | Review. |
| 4 | Unit IV (27-37) with `PeltonDesigner`, `TurbineCutaway`, `PumpMatcher`, `HillDiagram`, `RecipCrank`. | Review; Assignment Parts A and B working. |
| 5 | Unit I (1-6) and Unit V (38-45). | Review. |
| 6 | Polish: formula sheet, search, mobile, accessibility, static pre-render of session pages for link previews. | Part 5 "done" checklist on all 45. |

Build rules for the agent:
- Do not generate bulk theory text. Work from the plan row, the unit's own slide deck in `Sessions/` and the textbook refs, and mark anything uncertain `[instructor to verify]`.
- Do not copy the filler "Field Nuances" pattern forward.
- Never ship a session where the primary widget is unchanged from another session.
- After each phase, report which Part 5 checks passed and which items are marked `[instructor to supply]`.

---

## Part 8. Decisions and what is still open

**Decided by the instructor:**
1. Instructor is Dr Arpan Pradhan (update the course plan header or the site, whichever is stale).
2. Day 16 is split (lecture parts plus a self-paced computation module).
3. Footage is sourced from the web by the builder.
4. Any video may be used, licensed or not, for internal use. The builder follows the hosting caution in Part 4b so a public site does not redistribute unlicensed clips.
5. Units may have more sessions than the plan's days, provided each part is simple, interesting and interactive (Part 1b).

**Still open:**
- ~~Textbook editions~~ **Decided: use the newer editions** (as in `sessions.json`): Modi & Seth 22nd ed. 2022, Bansal 10th ed. 2021, Chow 1959 (2009 reprint). The builder uses these for every T1/T2/T3 citation and does not quote page or problem numbers from older editions. The course plan document still lists the older editions and should be updated to match.
- Which textbook governs thresholds that differ between books (smooth/rough limits, Ns ranges, jet ratio).
- ~~Is the repo or site public?~~ **Decided: the repo (github.com/PradhanArpan/hydraulics) is public.** So the Part 4b rule applies in full: unlicensed clips go only in the git-ignored `media_local/` and the public site embeds original links. Only public-domain, openly licensed or instructor-made clips may go in the public `media/` folder. Add `media_local/` to `.gitignore` in Phase 0 and check no unlicensed mp4 is committed before every push.

**Superseded (kept for history):**
1. Authoritative instructor name and textbook editions (plan vs site).
2. Day 16 is overloaded. Split into a lecture and a self-paced computation module?
3. Which textbook governs thresholds that differ between books (smooth/rough limits, Ns ranges, jet ratio).
4. Real photos, videos and field data to supply: Parshall flume, Pelton runner, Francis installation, Bengaluru drain section, lab flume data. Can you film the lab flume (jump, weir, hump, ripples at Fr < 1 and > 1)? That is the highest-value media for Unit II.
4b. Media licensing stance: link-only for anything not owned or clearly reusable (default), or are you comfortable with the builder downloading and hosting clips with a clear open licence?
5. Whether to keep the Unit I pages S01-S09 (nine pages) or reduce them to the plan's six days.
